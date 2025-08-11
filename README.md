
# Kanban Project - Trello

Welcome to the Kanban Project — a streamlined and intuitive tool inspired by Trello, designed to help you organize, collaborate, and track your projects efficiently.

The Kanban Project is a full-stack application developed to simplify project management.
It provides a visually organized workspace to manage your projects,
track tasks, collaborate with team members, and store notes.
Whether you’re planning a new product launch or tracking daily tasks,
the Kanban Project keeps you in control.
## Badges

[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?logo=mongodb&logoColor=white)](https://www.mongodb.com/) 
[![Node.js](https://img.shields.io/badge/Node.js-849931?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![JWT Auth](https://img.shields.io/badge/JWT-Auth-orange?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-green)](https://nodemailer.com/about/)
[![Mailgen](https://img.shields.io/badge/Mailgen-Dynamic--Emails-orange)](https://www.npmjs.com/package/mailgen)
[![Env Variables](https://img.shields.io/badge/.env-Environment%20Variables-blue)](https://www.npmjs.com/package/dotenv)

## Tech Stack

**Server:** 

- Node.js: The backbone of the server-side application.
    
- Express.js: A lightweight framework for building robust APIs.
    
- MongoDB: A scalable NoSQL database for storing data efficiently.
    
- Cloudinary: For seamless media storage and management.

### Frontend


- JavaScript: The heart of the application.
    
- React (Vite): For a fast and reactive user interface.
    
- TailwindCSS: To build beautiful and modern designs effortlessly.
    
- Redux: For centralized state management.

## Features

### Project Management
 
- Create, update, and delete projects.
      
- Add and manage team members for each project.
      
- Collaborate seamlessly with your team.

### Notes Management

- Store important notes for quick access.

- CRUD functionality to add , edit and delete notes.

### Task Management

- Organize tasks into three categories:
    
- To-Do: Plan and list upcoming tasks.
    
- In-Progress: Track ongoing tasks.
    
- Done: Celebrate completed tasks


## API Reference


### Authentication

- User registration and login with secure credentials.

#### HealthCheck Route
```http
  GET /api/v1/healthcheck/
```
#### Register User
```http
  POST /api/v1/users/register
```

| Parameter   | Type     | Description                                                                 |
| :---------- | :------- | :-------------------------------------------------------------------------- |
| `fullname`  | `string` | *Required*. The full name of the user                                        |
| `email`     | `string` | *Required*. The email address of the user (must be unique)                   |
| `username`  | `string` | *Required*. The desired username (must be unique)                            |
| `password`  | `string` | *Required*. The password for the account                                     |
| `avatar`    | `file`   | *Required*. Profile image of the user, uploaded via multipart/form-data      |


#### Verify User
```http
  GET /api/v1/users/verify/:token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | *Required*. The email verification token |

#### login User
```http
  POST /api/v1/users/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email` | `string` | *Required*. The name of the email |
| `password` | `string` | *Required*. The name of the password |

#### Resend Mail
```http
  GET /api/v1/users/resend-mail
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | *Required*. User's email address |

#### Refresh Token
```http
  POST /api/v1/users/refresh-token
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `refreshToken`      | `string` | *Required*. The refresh token issued during login |

#### Forgot password
```http
  POST /api/v1/users/forgot-password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | *Required*. User's email address |

#### Change password
```http
  POST /api/v1/users/change-password
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `oldPassword`      | `string` | *Required*. Old Password is required |
| `newPassword`      | `string` | *Required*. New Password is required |

#### Profile
```http
  GET /api/v1/users/profile
```

#### Logout
```http
  POST /api/v1/users/logout
```



### Project Management

- Create, update, and delete projects.

- Manage team members by adding and removing them.


#### get projects
```http
  GET /api/v1/project/projects/
```

| Parameter | Type     | Description                                                                 |
| :-------- | :------- | :-------------------------------------------------------------------------- |
| `userId`  | `string` | *Required*. Automatically extracted from authentication token (`req.user`). |

#### get project by id
```http
  GET /api/v1/project/projects/:projectId
```


| Parameter   | Type     | Description                               |
| :---------- | :------- | :---------------------------------------- |
| `projectId` | `string` | *Required*. The ID of the project to fetch |


#### create project
```http
  POST /api/v1/project/projects/
```

| Parameter     | Type     | Description                                             |
| :------------ | :------- | :------------------------------------------------------ |
| `title`       | `string` | *Required*. Title of the project                         |
| `description` | `string` | *Required*. Detailed description of the project         |
| `createdBy`   | `string` | *Required*. ID of the user creating the project          |


#### update project
```http
  POST /api/v1/project/update/:projectId
```

| Parameter     | Type     | Description                                             |
| :------------ | :------- | :------------------------------------------------------ |
| `projectId`   | `string` | *Required*. ID of the project to update (in URL params) |
| `title`       | `string` | *Required*. Updated title of the project                |
| `description` | `string` | *Required*. Updated description of the project         |
| `createdBy`   | `string` | *Required*. ID of the user updating the project         |


#### delete project
```http
  DELETE /api/v1/project/delete/:projectId
```

| Parameter   | Type     | Description                                          |
| :---------- | :------- | :--------------------------------------------------- |
| `projectId` | `string` | *Required*. ID of the project to delete (URL params) |



#### add member to project
```http
  POST /api/v1/project/projects/:projectId/members
```

| Parameter   | Type     | Description                                                  |
| :---------- | :------- | :----------------------------------------------------------- |
| `projectId` | `string` | *Required*. ID of the project to which the member is added (URL params) |
| `userId`    | `string` | *Required*. ID of the user to add as a project member (Body) |
| `role`      | `string` | *Required*. Role of the member in the project (Body)         |



####  project member
```http
  GET /api/v1/project/projects/:projectId/members
```

| Parameter   | Type     | Description                                                |
| :---------- | :------- | :--------------------------------------------------------- |
| `projectId` | `string` | *Required*. ID of the project to fetch members from (URL params) |

####  remove member from project
```http
  DELETE /api/v1/project/projects/:projectId/remove/:memberId
```
| Parameter   | Type     | Description                                                |
| :---------- | :------- | :--------------------------------------------------------- |
| `projectId` | `string` | *Required*. ID of the project from which to remove member  |
| `memberId`  | `string` | *Required*. ID of the member to be removed (URL params)    |

####  update member from project
```http
  DELETE /api/v1/project/projects/:projectId/members/:memberId/role
```

| Parameter   | Type     | Description                                                   |
| :---------- | :------- | :------------------------------------------------------------ |
| `projectId` | `string` | *Required*. ID of the project containing the member (URL param)|
| `memberId`  | `string` | *Required*. ID of the member whose role is to be updated       |
| `role`      | `string` | *Required*. New role to assign to the member (Request body)    |


### Notes Management

- Create, read, update, and delete notes effortlessly.

####  create Notes
```http
  POST /api/v1/note/create
```

| Parameter    | Type     | Description                                                  |
| :----------- | :------- | :----------------------------------------------------------- |
| `projectId`  | `string` | *Required*. ID of the project to which the note is added (URL params) |
| `content`    | `string` | *Required*. The text content of the note (Body)              |

####  get Notes by Id
```http
  GET /api/v1/note/:notesId
```

| Parameter   | Type     | Description                                                      |
| :---------- | :------- | :--------------------------------------------------------------- |
| `projectId` | `string` | *Required*. ID of the project to fetch notes for (URL parameter) |

####  get Notes
```http
  GET /api/v1/note/
```


####  update Notes
```http
  PUT /api/v1/note/update/:notesId
```

| Parameter | Type     | Description                                                       |
| :-------- | :------- | :---------------------------------------------------------------- |
| `noteId`  | `string` | *Required*. ID of the note to update (URL parameter)              |
| `content` | `string` | *Required*. New content for the note (passed in the request body) |


####  delete Notes
```http
  DELETE /api/v1/note/:notesId
```
| Parameter | Type     | Description                                             |
| :-------- | :------- | :------------------------------------------------------ |
| `noteId`  | `string` | *Required*. ID of the note to delete (URL parameter)    |


### Task Management

- Manage tasks across three categories: To-Do, In-Progress, and Done.

####  create task
```http
  POST /api/v1/task/create
```

| Parameter       | Type       | Description                                                        |
| :-------------- | :--------- | :----------------------------------------------------------------- |
| `projectId`     | `string`   | *Required*. ID of the project to which the task will be added (URL param) |
| `title`         | `string`   | *Required*. Title of the task                                      |
| `description`   | `string`   | *Optional*. Detailed description of the task                       |
| `assignedTo`    | `string`   | *Required*. User ID of the person assigned to this task            |
| `assignedBy`    | `string`   | *Required*. User ID of the person who is assigning the task        |
| `status`        | `string`   | *Optional*. Current status of the task (e.g., pending, in-progress, completed) |
| `attachments`   | `array`    | *Optional*. List of attachment URLs or file references             |

####  get task
```http
  GET /api/v1/task/:projectId
```

| Parameter   | Type     | Description                                                        |
| :---------- | :------- | :----------------------------------------------------------------- |
| `projectId` | `string` | *Required*. ID of the project whose tasks you want to retrieve (URL param) |

####  update task
```http
  PUT /api/v1/task/update/:taskId
```

| Parameter   | Type     | Description                                                        |
| :---------- | :------- | :----------------------------------------------------------------- |
| `taskId`    | `string` | *Required*. ID of the task to update (URL param)                    |
| `title`     | `string` | *Optional*. Updated title of the task                               |
| `description` | `string` | *Optional*. Updated description of the task                      |
| `assignedTo` | `string` | *Optional*. ID of the user to assign the task to                   |
| `assignedBy` | `string` | *Optional*. ID of the user assigning the task                      |
| `status`    | `string` | *Optional*. Updated status of the task                              |
| `attachments` | `array`  | *Optional*. Updated attachments for the task                      |


####  delete task
```http
  DELETE /api/v1/task/remove/:taskId
```

| Parameter | Type     | Description                                         |
| :-------- | :------- | :-------------------------------------------------- |
| `taskId`  | `string` | *Required*. ID of the task to delete (URL parameter) |



####  create subtask
```http
  POST /api/v1/task/create-subtask
```


| Parameter       | Type     | Description                                            |
| :-------------- | :------- | :----------------------------------------------------- |
| `taskId`        | `string` | *Required*. ID of the parent task (URL parameter)      |
| `title`         | `string` | *Required*. Title of the subtask                        |
| `description`   | `string` | Optional. Detailed description of the subtask          |
| `assignedTo`    | `string` | Optional. ID of the user to assign the subtask to       |
| `status`        | `string` | Optional. Current status of the subtask (e.g., pending) |
| `attachments`   | `array`  | Optional. List of file URLs or references               |

####  update subtask
```http
  PUT /api/v1/task/update/:subTaskId
```

| Parameter       | Type     | Description                                            |
| :-------------- | :------- | :----------------------------------------------------- |
| `subTaskId`     | `string` | *Required*. ID of the subtask to update (URL parameter) |
| `title`         | `string` | Optional. New title for the subtask                     |
| `description`   | `string` | Optional. Updated description of the subtask            |
| `assignedTo`    | `string` | Optional. ID of the user to reassign the subtask to      |
| `status`        | `string` | Optional. Updated status of the subtask                  |
| `attachments`   | `array`  | Optional. Updated list of file URLs or references        |

####  delete subtask
```http
  DELETE /api/v1/task/remove/:subTaskId
```

| Parameter    | Type     | Description                                               |
| :----------- | :------- | :-------------------------------------------------------- |
| `subTaskId`  | `string` | *Required*. ID of the subtask to delete (URL parameter)    |

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT = `

`MONGO_URI = `

`BASE_URL = `

`CORS_ORIGIN = `

`ACCESS_TOKEN_SECRET = `

`ACCESS_TOKEN_EXPIRY = `

`REFRESH_TOKEN_SECRET = `

`REFRESH_TOKEN_EXPIRY = `

`JWT_SECRET = `

`MAILTRAP_SMTP_HOST = `

`MAILTRAP_SMTP_PORT = `

`MAILTRAP_SMTP_USER = `

`MAILTRAP_SMTP_PASS = `

`MAILTRAP_SENDERMAIL = `

`NODE_ENV = `

`CLOUDINARY_CLOUD_NAME = `

`CLOUDINARY_API_KEY = `

`CLOUDINARY_API_SECRET = `

`FORGOT_PASSWORD_REDIRECT_URL = `

## Installation

Install my-project with npm

```bash
  npm install 
```
```bash
  npm install express
```
```bash
  npm i dotenv
```
```bash
  npm i express-validator
```
```bash
  npm i bcryptjs
```
```bash
  npm i crypto
```
```bash
  npm i cookie-parser
```
```bash
  npm i jsonwebtoken
```
```bash
  npm i mongoose 
```
```bash
  npm i cors 
```
```bash
  npm i mailgen
```
```bash
  npm i nodemailer
```
```bash
  npm i multer
```
```bash
  npm i cloudinary
```
```bash
  npm i cloudinary-build-url
```
```bash
  npm i -D nodemon
```
```bash
  npm i -D prettier
```


## Running Tests

To run tests, run the following command

```bash
  npm run start
```


## Run Locally

Clone the project

```bash
  git clone https://github.com/i-himanshu29/Kanban-Project.git
```

Go to the project directory

```bash
  cd KanbanBackend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

### 📁 Project Structure - Kanban Project Backend
```
KanbanBackend/
├── src/
│   ├── db/
│   │   ├── dbconnect.js
│   │   
│
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── notes.controller.js
│   │   ├── task.controller.js
│   │   ├── project.controller.js
│   │   ├── healthcheck.controller.js

│   ├── middlewares/
│   │   ├── multer.middleware.js        # verifyJWT, checkAdmin
│   │   ├── verifyJWT.middleware.js      # multer config
│   │   ├── validator.middleware.js
│
│   ├── models/
│   │   ├── note.model.js
│   │   ├── project.model.js
│   │   ├── task.model.js
│   │   ├── projectmember.model.js
│   │   ├── subtask.model.js
│   │   └── user.model.js
│
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── note.routes.js
│   │   ├── project.routes.js
│   │   ├── task.routes.js
│   │   └── healthcheck.routes.js
│
│   ├── utils/
│   │   ├── async-handler.util.js
│   │   ├── api-error.util.js
│   │   └── api-response.util.js
│   │   └── mail.util.js
│   │   └── constant.js
│   │   └── cloudinary.js
│
│   ├── validators/
│   │   ├── auth.validator.js
│   │   ├── notes.validator.js
│   │   ├── project.validator.js
│   │   ├── task.validator.js
│
│   ├── app.js       # Express app setup (middlewares, routes)
│   └── index.js    # Entry point (connect DB and start server)
│
├── public/          # for local image storage before upload
├── .env
├── .gitignore
├── package.json
└── README.md
└── .prettierrc
└── .prettierignore
```

# Hi, I'm Himanshu Maurya! 👋


## 🚀 About Me
Hello, I'm Himanshu Maurya, a passionate Software Developer who loves building innovative and efficient software.


## 🛠 Skills
JavaScript , React.js , Tailwindcss , Next.js , Node.js , Express.js , MongoDB , PostgreSql , Redis , Kafka , Deployment , Docker , WebSocket , Testing , Git/GitHub , AWS , etc.


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.himanshumaurya.in/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ihimanshu29/)

[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/ihimanshu29)


## Acknowledgements

- Thanks to [Hitesh Choudhary](https://x.com/Hiteshdotcom) and [Piyush Garg](https://x.com/piyushgarg_dev) sir for the inspiration and guidance for his in-depth backend knowledge and support.
