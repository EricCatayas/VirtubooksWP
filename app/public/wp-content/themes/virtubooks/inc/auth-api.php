<?php
add_action('rest_api_init', 'register_api_hooks');

// API custom endpoints for WP-REST API
function register_api_hooks()
{
  register_rest_route('virtubooks/v1', '/auth', array(
    'methods' => 'POST',
    'callback' => 'virtubooks_authenticate_user',
    'permission_callback' => '__return_true',
  ));

  register_rest_route('virtubooks/v1', '/users', array(
    'methods' => 'GET',
    'callback' => 'virtubooks_get_users',
    'permission_callback' => '__return_true',
  ));

  register_rest_route('virtubooks/v1', '/users/(?P<id>\d+)', array(
    'methods' => 'GET',
    'callback' => 'virtubooks_get_user',
    'permission_callback' => '__return_true',
  ));

  register_rest_route(
    'virtubooks/v1',
    '/login',
    array(
      'methods'  => 'POST',
      'callback' => 'login',
    )
  );

  register_rest_route(
    'virtubooks/v1',
    '/logout',
    array(
      'methods'  => 'POST',
      'callback' => function () {
        wp_logout();
        return new WP_REST_Response(['message' => 'Logged out successfully'], 200);
      },
    )
  );
}

function virtubooks_authenticate_user($request)
{
  $params = $request->get_json_params();
  $username_or_email = isset($params['username']) ? sanitize_text_field($params['username']) : '';
  $password = isset($params['password']) ? $params['password'] : '';

  if (empty($username_or_email) || empty($password)) {
    return new WP_REST_Response([
      'message' => 'Username/email and password are required.',
      'user' => null,
      'is_registered' => false
    ], 200);
  }

  if (is_email($username_or_email)) {
    $user = get_user_by('email', $username_or_email);
  } else {
    $user = get_user_by('login', $username_or_email);
  }

  if (!$user) {
    return new WP_REST_Response([
      'message' => 'User not found.',
      'user' => null,
      'is_registered' => false
    ], 200);
  }

  if (wp_check_password($password, $user->user_pass, $user->ID)) {
    return new WP_REST_Response([
      'message' => 'Authentication successful.',
      'user' => [
        'id' => $user->ID,
        'username' => $user->user_login,
        'email' => $user->user_email,
      ],
      'is_registered' => true
    ], 200);
  }

  return new WP_REST_Response([
    'message' => 'Invalid password.',
    'user' => null,
    'is_registered' => false
  ], 200);
}

function virtubooks_get_user($request)
{
  $user_id = (int) $request['id'];

  // Only allow requests from the authorized backend server
  $allowed_origin = getenv('API_BASE_URL') ?: ($_ENV['API_BASE_URL'] ?? '');
  $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

  if (empty($allowed_origin) || $origin !== $allowed_origin) {
    return new WP_REST_Response(['message' => 'Unauthorized'], 401);
  }

  $user = get_user_by('ID', $user_id);

  if (!$user) {
    return new WP_REST_Response(['message' => 'User not found'], 404);
  }

  return new WP_REST_Response([
    'id' => $user->ID,
    'username' => $user->user_login,
    'email' => $user->user_email,
  ], 200);
}

function virtubooks_get_users($request)
{
  // Only allow requests from the authorized backend server
  $allowed_origin = getenv('API_BASE_URL') ?: ($_ENV['API_BASE_URL'] ?? '');
  $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

  if (empty($allowed_origin) || $origin !== $allowed_origin) {
    return new WP_REST_Response(['message' => 'Unauthorized'], 401);
  }

  $users = get_users(array(
    'fields' => array('ID', 'user_login', 'user_email')
  ));

  $user_data = array_map(function ($user) {
    return array(
      'id' => $user->ID,
      'username' => $user->user_login,
      'email' => $user->user_email,
    );
  }, $users);

  return new WP_REST_Response(['users' => $user_data], 200);
}

function login($request)
{
  // Call get_json_params() to retrieve the JSON body of the request
  $params = $request->get_json_params();
  $user_login = isset($params['user_login']) ? $params['user_login'] : '';
  $user_password = isset($params['user_password']) ? $params['user_password'] : '';
  $remember = isset($params['remember']) ? $params['remember'] : false;

  return wp_signon(array(
    'user_login'    => $user_login,
    'user_password' => $user_password,
    'remember'      => $remember
  ), false);
}
