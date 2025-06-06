<?php
/*
  URLs:
    http://localhost:10004/notebooks/
    http://localhost:10004/notebooks/create
    http://localhost:10004/notebooks/da394bee-e960-4520-8b3f-916657e1731a
    http://localhost:10004/notebooks/5a39665e-7710-4f54-a350-acb8bd2b605c


  TODO:

  BACK END
    [ ] Virtubooks API
      [ ] Create REST API endpoints for notebooks
        [x] Create Notebook
        [x] Get Notebooks
        [x] Update Notebook
        [x] Delete Notebook
        [ ] Search Notebooks
      
      [ ] Auth API
        [ ] Auth middleware using JWT
        [ ] Create REST API endpoints for user authentication
          [ ] Login User
          [ ] Logout User

      [x] Create Image Uploads API
        [x] Create REST API endpoint for image uploads
        [x] Handle image uploads in the backend
    

  FRONT END
    [ ] Update Notebook 
      [ ] Page Content
        [x] heading
        [x] paragraph
        [ ] image   

    [ ] Authorization
      [ ] login
      [ ] logout
      [ ] register
      [ ] demo account

    [ ] Notebooks Page
      [ ] route /notebooks/user/{userId}
      [ ] route /notebooks/{notebookId}
      [ ] route /notebooks/my-notebooks
      [ ] reusable list for notebooks
      [ ] display my notebooks
      [ ] display other user's notebooks
      [ ] delete notebook

    [ ] Navigation
      [ ] Header
        [ ] Logo
        [ ] Search bar
        [ ] User profile dropdown
        [ ] Notifications dropdown
        [ ] Create Notebook button
      [ ] Footer
        [ ] Links to About, Contact, Privacy Policy, Terms of Service
        
    [ ] Home page
      [ ] logo
      [ ] reusable list for notebooks
      [ ] My notebooks carousel
      [ ] search notebooks
      [ ] blog posts

    [ ] Web Responsive
      [ ] Desktop
      [ ] Mobile

    [ ] Blog page
      [ ] Create blog posts
      [ ] Display blog posts
      [ ] Documentation of Virtubooks creation
  
  MISCELLANEOUS
    [ ] Populate notebooks with sample data
    [ ] Refactor
      [ ] Move php scripts to separate files

  DEPLOYMENT
    [ ] Deploy Frontend
    [ ] Deploy Backend

  COMPLETED
    [x] Notebook Page Structure
      [x] fetch notebook data from the backend
      [x] display notebook content
      [x] page flip logic
      [x] page number Query
    [x] Create Notebook Page
      [x] title, description, tags, visibility, aspect ratio
      [x] number of pages
    [x] Image Uploads Page
      [x] upload image
      [x] display uploaded images
      [x] delete image
          Notebook base
    [x] use React
      [x] page flip logic 
      [x] design data structure
    [x] State management store
      [x] setup redux
      [x] notebook reducer
    [x] Page Toolbar
      [x] Insert page
      [x] Delete page
      [x] Start page number
      [x] Set background image
        - Open image uploads modal
        
    [x] Settings Page 
      [x] title, description, tags, author, visibility, aspect ratio
      [x] styles (e.g., background color, padding, font size, font family)
      [x] delete notebook

    [x] Save Notebook
    [x] Delete Notebook


  Virtubooks v2.0 (If you have time)
    [ ] New Content Types
      [ ] link
      [ ] code block
      [ ] table
      [ ] list
        - ordered, unordered, checkboxes
      [ ] quote
      [ ] divider
      [ ] header
      [ ] footer
      [ ] graph/chart
    [ ] Create Notebook Page
      [ ] front cover image    
    [x] Styling
      [x] Notebook level
      [x] Page level
      [x] Content level
    [ ] Improve UI/UX
      [ ] Better animations for page flips
      [ ] Improve Notebook cover design
    [ ] Undo/Redo
    [ ] Bookmarks

Q&A:

  Question: should the parent component #file:notebook-page.component.js be responsible for managing CRUD operations in the data? Or should child components invoking the requests (e.g., #file:content-toolbar.component.js ) perform the CRUD operations via redux store?
  Answer: The parent component should manage the CRUD operations in the page.content array. This keeps the state management centralized and makes it easier to track changes and updates to the content. Child components can dispatch actions to update the state, but the parent should handle the actual data structure and logic for adding, updating, or deleting content.
  
  Question: Should a reducer contain business logic to some degree like this duplicatePage() for duplicating a page? Or should it only concern state management logic?
  Answer: In Redux, reducers should only contain state management logic—that is, logic for updating the state in response to actions. However, it is normal and acceptable for reducers to include simple business logic that is directly related to how the state should be updated, such as duplicating an item, toggling a flag, or sorting an array.
          What reducers should NOT do:
            Make API calls or perform asynchronous operations.
            Access browser APIs, local storage, or anything outside the state.
            Contain complex business logic that is not directly about updating state.

  Question: What is Composer and why is it used in PHP projects?
  Answer: Composer is a dependency manager for PHP that allows you to manage libraries and packages your project depends on. It helps you install, update, and autoload these dependencies easily. In the context of a WordPress theme or plugin, Composer can be used to manage third-party libraries, ensuring that your project has the correct versions of those libraries without manually downloading and including them.
 
  Question: How did you generate the JWT access token for the Virtubooks API?
  Answer: using the terminal, I ran the following command:
    node
    require('crypto').randomBytes(64).toString('hex');
    
Notes:
  - To install the Composer dependencies, run `composer install` in the terminal.
  - To install the Composer dependencies in production, rurn `composer install --no-dev --optimize-autoloader` in the server terminal.
 */