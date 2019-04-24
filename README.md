# hacktivoverflow

## Usage

It is recommended to have [nodemon](https://nodemon.io/) installed globally before you begin.

1. Setup your MongoDB database name on `app.js` inside `server` folder
2. Create a file named `.env` and set it up based on `.env.example` (Read [dotenv documentation](dotenv) for details)
3. Open a terminal. Launch your MongoDB server by running `mongod`. If it fails, try it again with `sudo` prefix (Linux).
4. Open a terminal. Get inside `server` directory. Run `npm install` to install dependencies and then run `npm run dev`.

You're all set, if you are only using the API with API testing app like [Postman](https://www.getpostman.com/). If you want to run the client side as well, install [Vue CLI](https://cli.vuejs.org/). Global install is recommended. The next step is:

5. Open a terminal. Get inside `client` directory.
6. Run `npm install`
7. Run `npm run serve`

## Routes

### Users

| Route | Method | Header(s) | Body | Description | Response |
| ----- | ------ | --------- | ---- | ----------- | -------- |
| `/users` | GET | `Authentication:token` | - | Get all users | Success<br />Code: 200<br/>body: [{object user}, {object user}, ... ]<br /><br />Error:<br />(500)<br />body: {object error} |
| `/users/login` | POST | - | `email:String` (**required**),`password:String` (**required**) | Log in and obtain a `JSON Web Token` | Success<br />Code: 200<br/>body: [{object user}, {object user}, ... ]<br /><br />Error (wrong email/password):<br />(401)<br />body: {object error}<br /><br />Error (email not found):<br />(404)<br />body: {object error}<br /><br />Error:<br />(500)<br />body: {object error} |
| `/users/register` | POST | - | `email:String` (**required**),`name:String` (**required**),`password:String` (**required**) | Register a user | Success<br />Code: 201<br/>body: {token:String}<br /><br />Error (blank required field(s)):<br />(400)<br />body: {object error}<br /><br />Error:<br />(500)<br />body: {object error} |

### Questions

| Route | Method | Header(s) | Body | Params | Query | Description | Response |
| ----- | ------ | --------- | ---- | ------ | ----- | ----------- | -------- |
| `/questions` | GET | - | - | - | - | Get all questions | Success<br />Code: 200<br/>body: [{object question}, {object question}, ... ]<br/><br/>Error:<br />(500)<br />body: {object error} |
| `/questions/:questionId` | GET | - | - | `questionId` | - | Get a question | Success<br />Code: 200<br/>body: {object question}<br/><br/>Error:<br/>(500)<br />body: {object error} |
| `/questions` | POST | `Authentication:token` | `title:String` (**required**), `description:String` (**required**) | - | - | Create a question | Success<br />Code: 201<br/>body: {object question}<br /><br />Error (blank required field(s)):<br />(400)<br />body: {object error}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/questions/:questionId` | PATCH | `Authentication:token` |  `title:String` (**required**), `description:String` (**required**) | `questionId` | - | Edit a question | Success<br />Code: 200<br/>body: { object updated question }<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login."<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/questions/:questionId` | DELETE | `Authentication:token` | - | `questionId` | - | Delete a product | Success<br />Code: 200<br/>body: { message: "delete success" }<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/questions/:questionId/upvote` | POST | `Authentication:token` | - | `questionId` | - | Upvote a question | Success<br />Code: 200<br/>body: {object updated question}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/questions/:questionId/upvote` | DELETE | `Authentication:token` | - | `questionId` | - | Remove upvote from a question | Success<br />Code: 200<br/>body: {object updated question}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/questions/:questionId/downvote` | POST | `Authentication:token` | - | `questionId` | - | Downvote a question | Success<br />Code: 200<br/>body: {object updated question}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/questions/:questionId/downvote` | DELETE | `Authentication:token` | - | `questionId` | - | Remove downvote from a question | Success<br />Code: 200<br/>body: {object updated question}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |

### Answers

| Route | Method | Header(s) | Body | Params | Description | Response |
| ----- | ------ | --------- | ---- | ------ | ----- | ----------- | -------- |
| `/answers` | GET | - | - | - | - | Get all answers | Success<br />Code: 200<br/>body: [{ object answer }, { object answer }, ... ]<br/><br/>Error:<br />(500)<br />body: {object error} |
| `/answers/:answerId` | GET | - | - | `answerId` | - | Get an answer | Success<br />Code: 200<br/>body: {object answer}<br/><br/>Error:<br/>(500)<br />body: { object error } |
| `/answers` | POST | `Authentication:token` | `title:String` (**required**), `description:String` (**required**) | - | - | Create an answer | Success<br />Code: 201<br/>body: {object answer}<br /><br />Error (blank required field(s)):<br />(400)<br />body: { object error }<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error:<br />(500)<br />body: { object error } |
| `/answers/:answerId` | PATCH | `Authentication:token` |  `title:String` (**required**), `description:String` (**required**) | `answerId` | - | Edit an answer | Success<br />Code: 200<br/>body: { object updated question }<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login."<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/answers/:answerId/upvote` | POST | `Authentication:token` | - | `questionId` | - | Upvote an answer | Success<br />Code: 200<br/>body: {object updated answer}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/answers/:answerId/upvote` | DELETE | `Authentication:token` | - | `questionId` | - | Remove upvote from an answer | Success<br />Code: 200<br/>body: {object updated answer}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/answers/:answerId/downvote` | POST | `Authentication:token` | - | `questionId` | - | Downvote an answer | Success<br />Code: 200<br/>body: {object updated answer}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |
| `/answers/:answerId/downvote` | DELETE | `Authentication:token` | - | `questionId` | - | Remove downvote from an answer | Success<br />Code: 200<br/>body: {object updated answer}<br /><br />Error (unauthenticated):<br />(401)<br />body: { message: "You are not authenticated. Please login." }<br /><br />Error (unauthorized):<br />(401)<br />body: { message: "You are not authorized to perform this action." }<br /><br />Error:<br />(500)<br />body: {object error} |