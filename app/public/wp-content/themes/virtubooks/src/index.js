import "../css/style.scss";

/**
  1. Externalize React and ReactDOM in Your Build
    Tell your bundler (Webpack/@wordpress/scripts) not to bundle React and ReactDOM, but to use the ones already provided by WordPress. Ref: webpack.config.js
  2. Add the `react` and `react-dom` dependencies to the `wp_enqueue_script` function 
  3. Use the classic JSX transform by setting `runtime` to `classic` in the `babel.config.js` file
 */

import Notebook from "./modules/Notebook";

const notebook = new Notebook();
