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

## Future Features

- The Login screen can be easily bypassed by changing the state. There is logic for session cookies in the server code, but ran out of time to implement a more robust solution
-
