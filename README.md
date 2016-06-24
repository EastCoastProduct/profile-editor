# Profile Editor

## Install

Pull repo, then run in terminal in project directory:

    npm install
    npm start

And open http://localhost:3000/

## Routes

/?webId - Profile View (add webId to see your profile)

/login - Authentication (not working)

/edit?webId - Profile Edit

/friends?webId - View / Add / Delete Friends

TODO:

- Deploy (to heroku)

- Validation (using redux-forms)

- Fix ongoing bugs (Auth, routing, etc.) and enable manual adding of webId instead of directly in URL (close to finish, unresolved issue is breaking it at the moment)

- use solid.js

- tests
