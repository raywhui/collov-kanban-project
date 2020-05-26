# Collov Interview Project

This is a kanban clone for the Collov Software Engineering Test.

## Technologies Used

- Frontend: React
- Backend: Node.js v10.13.0
- Database: mongoDB
- npm v6.14.4

## Setup

1. Clone the repo:

```bash
git clone git@github.com:raywhui/collov-kanban-project.git
```

2. CD into the repo and install relevant packets

```bash
cd collov-kanban-project
npm install
```

3. Spin up your mongoDB database instance and add the database URI to the `.env` file. If you prefer to use a premade, cloud mongoDB instance, use `mongodb://heroku_5m1lf8wv:lqfa282u36e5e8ctlvr2dlost5@ds163377.mlab.com:63377/heroku_5m1lf8wv` as your URI.

```
# .env
MONGODB_URI=<mongodb-uri>

# OR
MONGODB_URI=mongodb://heroku_5m1lf8wv:lqfa282u36e5e8ctlvr2dlost5@ds163377.mlab.com:63377/heroku_5m1lf8wv
```

4. Run the applicant using `npm run start`, which will run both the server and React application at once.

```bash
npm run start
```

5. Navigate to `http://localhost:3000`, where you will be able to sign up and generate an account. If using the premade cloud database, `USER: admin` and `PW: admin` are already provided.

## Features Implemented

- Kanban board styling similar to Trello
- Homebrewed card drag and drop
- Applicant status updates database on swimlane changes
- Commenting system on cards
- Uploadable/Downloadable Resumes (.doc, .docx, .pdf enforced both on frontend and backend)
- User Authentication and Sign up
- Logout feature
- Full MVC Framework

## Example Images

Login Page:
![login](./images/login.png)

Homepage:
![homepage](./images/homepage.png)

More Info:
![more info](./images/moreinfo.png)

Applicant Signup
![applicant signup](./images/applicant.png)

## Future Features

- LOGIN PAGE SECURITY - The Login screen can be easily bypassed by changing the state. There is logic for session cookies in the server code, but ran out of time to implement a more robust solution
- PERSISTENT LOGIN - Persistent login is not yet implemented. Refreshing the page will bring the user back to the login page. This can be resolved with the session cookies as stated above.
- RATING SYSTEM - Applicant rating system was not implemented. Ideally, rating would be displayed under the email section with filled in stars out of 5. Database would house an array of ratings and the controller would average out the values in that array, giving us the average applicant rating. Rating the applicant would be in the MORE INFO drop down and would not show other user's ratings.
- LIVE DEPLOYMENT - There were issues getting the app to run on a live Heroku instance. The issue mainly stemmed from the use of `nodemon` rather than `node`. This can be resolved using `rimraf` to compile the serverside code back into modules.
