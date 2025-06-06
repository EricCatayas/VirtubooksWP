<?php
add_action('rest_api_init', function () {
  register_rest_route('virtubooks/v1', '/auth', array(
    'methods' => 'POST',
    'callback' => 'virtubooks_authenticate_user',
    'permission_callback' => '__return_true',
  ));
});

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
