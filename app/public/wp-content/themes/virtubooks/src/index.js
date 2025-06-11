import "../css/style.scss";

/**
  1. Externalize React and ReactDOM in Your Build 
    WordPress already provides these packages as global variables
    You should not use your own bundled versions of react and react-dom in production for WordPress in order to avoid version conflicts. 
    Create webpack.config.js
  2. Add the `react` and `react-dom` dependencies to the `wp_enqueue_script` function 
  3. Use the classic JSX transform by setting `runtime` to `classic` in the `babel.config.js` file
 */

import Notebook from "./modules/Notebook";
import Login from "./modules/Login";
import ImageUploads from "./modules/ImageUploads";
import Billboard from "./modules/Billboard";
import CreateNotebook from "./modules/CreateNotebook";

const notebook = new Notebook();
const login = new Login();
const imageUploads = new ImageUploads();
const billboard = new Billboard();
const createNotebook = new CreateNotebook();
