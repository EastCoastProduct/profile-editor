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

- pagination (half way finished, needed for friends page to fetch less data if user has many friends and organize it with pagination)

- Validation (using redux-forms)

- use solid.js

- tests
