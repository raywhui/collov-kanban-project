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
   ![login]("./images/applicant.png")

## Future Features

- LOGIN PAGE SECURITY - The Login screen can be easily bypassed by changing the state. There is logic for session cookies in the server code, but ran out of time to implement a more robust solution
- PERSISTENT LOGIN - Persistent login is not yet implemented. Refreshing the page will bring the user back to the login page. This can be resolved with the session cookies as stated above.
- RATING SYSTEM - Applicant rating system was not implemented. Ideally, rating would be displayed under the email section with filled in stars out of 5. Database would house an array of ratings and the controller would average out the values in that array, giving us the average applicant rating. Rating the applicant would be in the MORE INFO drop down and would not show other user's ratings.
