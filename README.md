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

/friends?webId - Paginated View / Add / Delete Friends

## TODO

- errors (errors from requests are not showing up, spinners have issues in that case)

- tests (some tests are written, not fully covered)

## NOTES

- warrings in console due to React 15, to fix them we are waiting for redux-form version 6 to get out and radium to fix it and relese new version

- sometimes buttons stay hovered although they shouldn't, this is radium bug

- for some users friends will never show up, this is due to multiple errors while trying to fetch users friends, it will be changed in the future how it works

## ISSUES

- Authentications isn't working, User header is always empty (apparently it's a Chrome bug)
