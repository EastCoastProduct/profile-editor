# Profile Editor

React/Redux application that enables viewing and editing of your profile using [Solid.js](https://github.com/solid/solid), a proposed technology to decentralize the web (to learn more follow Solid.js link). A basic principle is to have a profile stored on remote online storage and access same data through multiple applications instead of having to create an account for each application individually, as you have to do now using facebook, twitter, linkedin... That way applications would be able to share same user data that is stored somewhere remotely and user keeps ownership of his own data and decides which information is available to which application and which is private. Although, modern applications do provide integration with other applications that is not the principle this technology proposes, the main problem would arise if one application gets shut down user would lose all the information and effort dedicated while collecting that data, also it can be very problematic to export wanted data or there's even no option to do that in certain applications.

## INSTALL

Pull repo, open terminal and go to project directory to run next commands:

    npm install
    npm start

And open http://localhost:3000/ in Chrome browser (other browsers could have issues, especially older browsers).

If you don't have your Solid Profile and thus WebId we would suggest creating one on this link:

https://databox.me/

Go through all 3 steps. You are only obliged to enter a valid username, everything else through these 3 steps that is optional can be skipped as our application gives the option to edit that information afterward. Going through 3 steps should give you your WebId at the end which you can copy to our application to view/edit your profile. Also, going through all steps should install certificates to your browser for that profile and allow you to edit data in future.

## DEPLOYED APPLICATION

To test application online it is currently deployed on:

https://profile-editor.herokuapp.com/

## ROUTES

- **/login**
 - Authentication (not working, always unsuccessful login, Chrome bug, see Issues for more info)

- **/?webId**
 - Profile View (if WebId isn't in URL as query string user will get input shown to type it in before viewing profile, same goes for every other route)

- **/edit?webId**
 - Profile Edit (you can edit your profile information, you can only do that for WebId that you have certificates installed in your browser)

- **/friends?webId**
 - Cached Paginated View / Add / Delete Friends

- **/setWebId**
 - if you want to change WebId of the profile you are currently looking at so you don't have to manually change query string in URL and reload the page.

## ABOUT

This application allows to view and edit profiles by typing WebId of the designated profile. Run application online or locally (see Install and Deployed sections) and go through the creation of your profile if you don't have any. Login doesn't work in Chrome due to a bug that Chrome possesses which makes login always fail. But in case someone has successful login everything should work afterward and the user should get redirected to the home route which is profile view screen and have it's own WebId set in a query string. Also, login can only work for users that have their profile created following Install section, only profiles stored on https://databox.me/ could possibly have successful login as our login is hard coded to do request to mentioned link. If Login would work then WebId gets stored into local storage permanently (some expiration date might get set as an advanced feature) and the user is logged in permanently until a decision to log out of the application. Logging out just clears WebId from local storage and user needs to log in again.

Because you are able to see any profile that you have WebId of you are free to skip login and go to any route directly using menu. Whichever route user goes to it will have the option to insert WebId of the profile wanted to see. Any WebId will work, but if a user wants to edit that profile than it needs to have certificates installed in a browser which would happen while creating a profile to not get 401 Unauthorized response. Read *Install* section to see how to create a profile which will automatically install everything needed to your browser and give you your WebId.

In profile view section of the application, a user will either get input to type in WebId if it's currently missing in URL as query string or it will have an overview of the profile data for the given WebId. In case a user is missing background or profile image, default images will be shown, also any other data that is missing will not be shown. Data that can be viewed and therefore edited on edit page is profile and background picture with full name and WebId, other basic information, and the list of phones, emails, blogs, homepages and workpages. In profile view mode all items in Phones are clickable so if you're seeing a page on a mobile phone, clicking a phone link would start a call, similar to OSX where it would propose user to open Facetime app and make a call. Same goes for email list where it would open native Email service and add clicked email as a recipient. All other lists are just normal clickable links that open a separate tab.

To edit any of the possible data a user should switch to *Edit Profile* route using menu. A user is able to upload, edit or delete both images. We don't store multiple profile nor background images, so every updated image deletes the previous image if there was any. To update any basic information all that is needed is to type in information and then just click away from the input which will trigger a request to user storage. Deleting information is done by erasing data from the input and again clicking away. While the request is being handled certain input is disabled and spinners are shown to have a better UX. Other listed information like phones, emails, etc. have a listed overview of previously entered items. A user is able to delete any of the previous items from the list or add any number of additional items to the corresponding list. All inputs for these lists have validation so you are not able to save invalid format for the telephone number, email nor URL and you can't save duplicated item either. Spinners are also part of UX in these lists so you can't add another item until the previous item is already added to a certain list. It is not possible to edit any of the data unless it's your own profile that you have certificates installed in your browser.

To see cached paginated list of all your friends, a user should switch to *People you know* page using menu. On this page user can see a paginated list of all friends for given WebId. For every friend that user has we are doing a request to get friend's profile. A paginated list is capped to 5 items per page. If a user has more than 5 friends we only fetch those users that are needed for given page of pagination. If a user goes to next page of the pagination we will fetch new 5 friends, but going back to the previous page doesn't need new fetching, those friends are already cached and will stay that way until we change WebId of the profile or reload the page. In the end, going through all pages of the pagination will cache the whole pagination and no new fetches will be needed until we add more friends to the list. While fetching profiles of certain friends it is possible that some profiles don't exist anymore or we end up with an error trying to retrieve data, in that case, we will have this friend's item shown in red color in a paginated list with the option to re-fetch that certain profile again. Also, we will show error describing why that profile isn't shown. Besides browsing through the list it is also possible to delete any friend from a list at any point in time. Adding new friends or re-adding deleted ones is also possible. Below list we have input where we need to add valid WebId of a friend we would like to add to the list. Friend will be added at the end of a paginated list, but in case page gets reloaded it might not be at the end because the list isn't ordered by the date someone has been added to the list. Also, when we add a new friend to the list and we go to the last page (or are already there), we will also trigger fetching of friends profile. Adding a friend to the list just updates our own profile adding friend's WebId as a person we know, but to show friend's basic data we have to fetch it's profile first. Besides basic validation we don't allow adding duplicate friends to the list, every WebId needs to be unique. Basic information that we show for friends are full name, first email in the list if one exists and WebId which is a clickable link so you can view a profile of a certain friend if wanted.

There's also one more option in the menu besides Login/Logout and it's called *Set WebId* which allows a user to change currently chosen WebId to some other if needed. This page just shows input to type in WebId which gets transferred to the query string and stays there. This option allows a user to change WebId at any point in time without having to manually manipulate query string in URL which, by the way, needs to be encoded and would make user's job much more difficult.

Last page user can end up is page 404. For manual manipulation of URL and entering invalid route you get 404 page which lets you know there's nothing to see on that route with options to go back to home (View Profile) or login page.

## DEVELOPMENT

Once you start your application in local setup using commands defined in Install section you will automatically have hot reloading enabled. That means anytime you change any file and save it webpack will bundle files again and push changes to your page without having to reload page yourself. Also, it will lint through all your JS files and show errors in a browser which have to be fixed before changes get pushed to the browser (in big applications it might be beneficial to move linting as a separate command as it slows down bundling). Bundled files are not seen anywhere in project directory as they're just cached and served by hot reloading middlewares from Express, but if you would like to build those files to deploy for production or just test production setup you should run these commands:

    npm build
    npm prod.js

First command bundles files for production and puts them to dist folder, those js files will be hashed and minified (minification is not fully enabled, see Notes). The second command starts production based Express server and serves minified bundled files. This way it is possible to test production setup on your local machine before deploying up to the server.

## STRUCTURE

    .
    ├── src                      # contains all JS React/Redux code for the SPA app
    │   ├── actions              # synchronous and asynchronous actions and action creators from Redux ecosystem
    │   ├── components           # dumb reusable React components
    │   ├── constants            # action and app constants are held in separate folder for clarity
    │   ├── containers           # smart connected React components, these are components that are connected to store and are part of Redux ecosystem
    │   ├── reducers             # root reducer setup and individual reducers that manipulate app's state, part of Redux ecosystem
    │   ├── routes               # React Router setup which contains all the routes and is child component of Redux's Provider
    │   ├── store                # store setup, part of Redux ecosystem
    │   ├── styles               # Radium.js inline styles
    │   ├── utils                # validator for Redux Form and uniqueId generator but any other JS files that don't fall into upper folders should go here
    │   ├── index.js             # entry point for our React/Redux application
    │   └── index.tpl.html       # template html from which html-webpack-plugin creates output html file including hashed JS files
    ├── .babelrc                 # babel configuration including some ES7 experimental syntax
    ├── .eslintrc                # eslint configuration based on airbnb setup
    ├── .gitignore               # ignore setup for git
    ├── .setup.test.js           # setup file to run mocha tests
    ├── package.json             # list of all dependencies
    ├── Procfile                 # heroku deploy setup
    ├── prod.js                  # express server for production setup
    ├── README.md                # Readme file
    ├── server.js                # express server for development setup including hot reloading
    ├── webpack.config.js        # webpack setup for development, used when running development
    └── webpack.prod.config.js   # webpack setup for production, used when building dist folder

Most important part of the structure is the src folder which contains all the code for our application. We used Redux to hold and manage our application state and React as view part to render dynamic HTML. We use heavily ES6 and experimental ES7 JS code and write our components as classes.

Redux Form gives an easy and intuitive way to validate our forms and inputs. Mostly, we try to make as many reusable dumb components (stateless) as possible and share them across application, also it makes it easier to test components that get values passed through props and that have no direct way of changing app state. To connect our routes with a state in store we write smart components (containers folder) where we have one container component for designated route which gets access to part of the state and dispatches actions to change the state. After state gets changed all components inside container get re-rendered if needed.

Routing is handled using React Router and we have all our routes in one file inside routes folder for simplicity. All constants for the application and all actions are held in constants folder. Changing any application constant to a new one should be enough to let your application work with a new configuration without the need for further code changes.

React gives  the option to use inline styling, as a matter of fact, it actually proposes usage of inline styles. We use Radium.js to write our inline styles, also Radium gives some features to inline styles that React doesn't like responsive media queries, keyframes, few pseudo classes, etc. All styles are written inside style folder as JS object structures.

A store has been set up as a development store to allow for dev tools and hot reloading and as a production store where we removed previous development features.

Reducers are all listed in reducers folder where we also have a root reducer set up. Reducers are the only place in the application where we change application state and then return new state without mutating current state which gives undo and redo functionality in Redux out of the box.

Actions are a place where we trigger our HTTP requests for which we use a solid-client module (see Solid technology for more info) which internally uses rdflib to parse and serialize data passed to and from an external store. We can differentiate between synchronous actions that trigger changes in store through reducers in real time and asynchronous actions where we wait for the end of HTTP request before we dispatch synchronous action to change data in the store.

Other files outside src folder in root directory hold other configuration to our project. We use webpack to bundle files and we use babel to transpile ES6 and ES7 code to ES5 to allow us to use latest modern syntax and still write code which would work in older browsers. We also lint our code using airbnb rules to hold to a certain standard in code structure and syntax. We also have 2 express files one to run a project in development mode and other to run it in production and serve minified bundled files. While in development mode it is possible to install redux dev tools extension for Chrome to be able to track state changes and actions dispatched.

## TESTS

We have few tests for the application, just as a show point on how to test certain parts of the React/Redux ecosystem. Redux application generally comprises of actions, dumb and smart components, reducers, routes and store. Tests cover some of the basic parts of the application to show how different parts could be tested using mocha and chai. To run tests all that is needed is to run command:

    npm test

At the moment we have 8 passing tests in total. We tested one action, one smart component (container) and one reducer.

## TODO

- errors (errors from requests are not showing up, spinners have issues in that case)

- tests (some tests are written, not fully covered)

## ISSUES

- Authentication isn't working, User header is always empty (apparently it's a Chrome bug)

- Warnings in console due to React 15, to fix them we are waiting for redux-form version 6 to get out to fix it

- Sometimes buttons stay hovered although they shouldn't, this is Radium.js bug that is fixed but we are waiting for the new version to be released to remove existing bug

- In a menu when you hover over *View Profile* option it will not get hover effect, once again this is an issue due to Radium.js and IndexLink component from React Router, a new version of Radium.js might fix the issue

- For some users friends will never show up, this is due to multiple origin errors that could happen while trying to fetch users friends (seems to be an issue in rdflib), it will be changed how it works in the future

- Minification of JS files when running command *npm build* isn't working as expected, we had to turn off mangle option which changes the names of variables and makes minified files even smaller, issue is suspected to be due to rdflib which breaks when mangle option is turned on

- When running *npm start* deprecation note will pop up in the terminal. This is due to eslint-config-airbnb module that hasn't yet fixed this issue https://github.com/airbnb/javascript/issues/978
