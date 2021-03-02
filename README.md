# DevMap App
*(Currently going through CSS revamp)*

The DevMap App is directed for developers who wish to maintain a simple log of their projects and issues, and even share them with their team! The app looks to facilitate the sharing of essential project health information among peers for a simpler collaboration dynamic.

---

### Working Prototype
#### Client Live:
https://devmap.vercel.app

#### API URL (Landing):
https://afternoon-dawn-05389.herokuapp.com

#### API GitHub:
https://github.com/dionisggr/devmap-api

---

### User Stories
- As a prospective user:
  - I want to land in the Welcome Page with more instructions
  - I want to browse all projects
  - I want to browse all project issues
  - I want to sign up for an account
- As a registered user:
  - I want to be able to log out
  - I want to browse all projects
  - I want to browse all project issues
  - I want to create a new project/issue and establish details
  - I want to be able to edit only projects/issues that I created
  - I want to be able to delete only projects/issues that I created
  - I want to be able to edit my account details
  - I want to be able to delete my account
- As an administrator
  - I want to view all user accounts/projects/issues
  - I want to be able to edit all user accounts/projects/issues
  - I want to be able to delete all accounts/projects/issues

---

### Technology
* **Front-End:** React.js, CSS3, HTML5, Javascript, API fetch
* **Back-End:** Javascript, Node.js, Express.js, Knex.js, PostgreSQL, Mocha, Chai, Supertest, Nodemon, Postgrator, Dotenv, JWT, Bcrypt, Morgan, XSS, CORS, Helmet, HTML5, CI scripts
* **Development Environment:** Vercel, Heroku, DBeaver, Postman

---

### Functionality
The app's functionality includes:
* Every User
  * May create an account
  * May browse projects and issues
* Registered User
  * May manage their account
  * May manage their projects and issues
* Admin
  * May manage the list of all users
  * May manage any project and issue
    
---

### Front-End Structure
* __Index.js__ - (stateless)
    * __App.js__ - (stateful)
      * __Header.js__ - (stateless)
        * __Menu.js__ - (stateful)
      * __Home.js__ - (stateless)
        * __List.js__ - (stateless)
          * __Item.js__ - (stateless)
          * __ProjectPage.js__ - (stateless)
          * __ProjectEdit.js__ - (stateless)
          * __IssuePage.js__ - (stateless)
          * __IssueEdit.js__ - (stateless)
        * __UserList.js__ - (stateful)
          * __User.js__ - (stateless)
          * __UserPage.js__ - (stateful)
          * __UserEdit.js__ - (stateful)
      * __NoProjects.js__ - (stateless)
      * __Signup.js__ - (stateless)
      * __Login.js__ - (stateless)
      * __Logout.js__ - (stateless)

---

### Back-End Structure
- Users (database table)
  - user_id (integer, auto-generated)
  - username (text, unique not null)
  - password (text, hashednot null)
  - first_name (text, not null)
  - last_name (text, not null)
  - email (text, unique not null)
  - tools (text, not null)
  - start_date (timestamp, default now)
  - role (enum_role, default 'user')
  - github (text)
- Projects (database table)
  - project_id (integer, auto-generated)
  - name (text, not null)
  - description (text, not null)
  - tools (text, not null)
  - phase (enum_phase, not null)
  - status (enum_status, not null)
  - start_date (timestamp, default now)
  - owner_id (integer, foreign key [users.user_id])
  - owner (integer, foreign key [users.username])
  - collaboration (boolean, default true)
  - github (text)
- Issues (database table)
  - issue_id (integer, auto-generated)
  - name (text, not null)
  - description (text, maximum 150 characters)
  - project_id (integer, not date)
  - tools (numeric, decimal)
  - phase (enum_phase, pnot null)
  - status (enum_status, pnot null)
  - start_date (integer)
  - owner_id (integer, foreign key [users.user_id])
  - owner (integer, foreign key [users.username])
  - collaboration (boolean, default true)
  - github (text)
- ENUMS
  - Phase
  - Status
  - Role

---

## API Documentation

### Endpoints that require Authentication
Closed endpoints that require a valid username and password to be included in the header body of the request.

#### Login

- Step 1: *(Generate JSON Web Token)*
  - `POST /login`
    - 'Admin' credentials
      - Username: `admin`
      - Password: `password`
- Step 2: &lt;*Use generated JSON Web Token (3 hrs)*&gt;
- Step 3 *(Optional): Refresh JSON Web Token*
  -  `GET /refresh`

### Endpoints that require Authorization
Closed endpoints that require a valid JSON Web Token to be inlcuded in the header 'Authorization' of the request.
```
// Add to request header
headers: {'Authorization': 'Bearer <JSON Web Token>'}
```
If sending content through request body (`POST`), don't forget to add the following in the headers:
```
// Add to request header
headers" {'Content-Type': 'application/json'}
```

### User related
Each endpoint manipulates information related to users.
- [Get Users](Users): `GET /users`
- [Create User (Register)](): `POST /users`
- [Get Users](Users): `GET /users/:user`
- [Edit User](Users): `PATCH /users/:user`
- [Delete User](Users): `DELETE /users/:user`

---

### Get Users
**URL:** `/users` \
**Method:** `GET` \
**Auth required:** Yes
- `Bearer my-secret-key`

#### Success Reponse
**Code:** `200 OK` \
**Content example**
```
[
  {
    "id": "1",
    "username": "username",
    "firstName": "Name",
    "lastName": "Last Name",
    "email": "email@gmail.com",
    "tools": "Languages/Tools",
    "startDate": "Wed Dec 23 2020 00:00:00 GMT-0700",
    "github": "github.com/username",
    "role": "User"
  },

  [...]
]
```

---

### Add User *(Signup)*
**URL:** `/users` \
**Method:** `POST` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

#### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
  {
    "username": "username",
    "password": "password",
    "firstName": "Name",
    "lastName": "Last Name",
    "email": "email@gmail.com",
    "tools": "Languages/Tools",
    "github": "github.com/username",
  }
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `username`      | string  | header | Unique username           |
| `password`      | string  | header | Hashed (bcrypt) password  |
| `firstName`     | string  | header | First name of user        |
| `lastName`      | string  | header | Last name of user         |
| `email`         | string  | header | User email                |
| `tools`         | string  | header | Languages/Tools used      |
| `github`        | string  | header | GitHub Profile            |

#### Success Reponse
**Code:** `201 Created` \
**Content example**
```
[
  {
    "id": "1",
    "username": "username",
    "password": "password",
    "firstName": "Name",
    "lastName": "Last Name",
    "email": "email@gmail.com",
    "tools": "Languages/Tools",
    "github": "github.com/username",
    "role": "User"
  },
  
  [...]
]
```

---

### Edit User
**URL:** `/users/:userID` \
**Method:** `PATCH` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

#### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
{
  "username": "newUserName",
  "firstName": "Name",
  "lastName": "Last Name",
  "email": "newEmail@gmail.com",
  "tools": "Updated Tools",
  "startDate": "12/23/2020",
  "github": "github.com/username",
}
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `userID`        | integer | path   | User ID (Primary Key)     |
| `username`      | string  | header | Unique username           |
| `firstName`     | string  | header | First name of user        |
| `lastName`      | string  | header | Last name of user         |
| `email`         | string  | header | User email                |
| `tools`         | string  | header | Languages/Tools used      |
| `startDate`     | string  | header | Date created              |
| `github`        | string  | header | GitHub Profile            |

#### Success Reponse
**Code:** `201 Created` *(Resource updated successfully, and refreshes.)* \
**Content example**
```
[
  {
    "id": "1",
    "username": "newUserName",
    "firstName": "Name",
    "lastName": "Last Name",
    "email": "newEmail@gmail.com",
    "tools": "Updated Tools",
    "startDate": "Wed Dec 23 2020 00:00:00 GMT-0700",
    "github": "github.com/username",
    "role": "User"
  },

  [...]
]
```
#### Notes
All values will be necessary in Update due to previous empty field validation

---

### Delete User
**URL:** `/users/:userID` \
**Method:** `DELETE` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `userID`        | integer | path   | User ID (Primary Key)     |

#### Success Reponse
**Code:** `301 Moved Permanently` \
**Content example**

&lt;*No Content*&gt;

---

### Project related
Each endpoint manipulates information of projects.
- [Get Projects](https://github.com/dionisggr/devmap-api/wiki/Projects): `GET /projects` \
- [Create Project](https://github.com/dionisggr/devmap-api/wiki/Projects): `POST /projects`
- [Get Project](https://github.com/dionisggr/devmap-api/wiki/Projects): `GET /projects/:project`
- [Edit Project](https://github.com/dionisggr/devmap-api/wiki/Projects): `PATCH /projects/:project`
- [Delete Project](https://github.com/dionisggr/devmap-api/wiki/Projects): `DELETE /projects/:project`

---

### Get Projects
**URL:** `/projects` \
**Method:** `GET` \
**Auth required:** No

#### Success Reponse
**Code:** `200 OK` \
**Content example**
```
[
  {
    "id": "1",
    "name": "Project 1",
    "description": "First description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "Tue Dec 22 2020 00:00:00 GMT-0700",
    "collaboration": true,
    "github": "github.com/username/project"
  },

  [...]
]
```

---

### Add Project
**URL:** `/projects` \
**Method:** `POST` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

#### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
{
  "name": "Project 1",
  "description": "First description",
  "tools": "HTML/CSS",
  "phase": "Design",
  "status": "Delayed",
  "owner": "username",
  "startDate": "12/22/2020",
  "collaboration": true,
  "github": "github.com/username/project"
}
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `name`          | string  | header | Name of project           |
| `description`   | string  | header | Description of project    |
| `tools`         | string  | header | Languages/Tools required  |
| `phase`         | string  | header | Project Phase             |
| `status`        | string  | header | Project Phase status      |
| `owner`         | string  | header | Creator of project        |
| `startDate`     | string  | header | Date created              |
| `collaboration` | boolean | header | Accepts collaboration     |
| `github`        | string  | header | GitHub project link       |

#### Success Reponse
**Code:** `201 Created` \
**Content example**
```
{
  "id": "1",
  "name": "Project 1",
  "description": "First description",
  "tools": "HTML/CSS",
  "phase": "Design",
  "status": "Delayed",
  "owner": "username",
  "startDate": "Tue Dec 22 2020 00:00:00 GMT-0700",
  "collaboration": true,
  "github": "github.com/username/project"
}
```

---

### Edit Project
**URL:** `/projects/:projectID` \
**Method:** `PATCH` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

#### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
{
  "name": "New Name",
  "description": "New Description",
  "tools": "HTML/CSS",
  "phase": "Design",
  "status": "Delayed",
  "owner": "username",
  "startDate": "12/22/2020",
  "collaboration": true,
  "github": "github.com/username/project"
}
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `projectID`     | integer | path   | Project ID (Primary Key)  |
| `name`          | string  | header | Name of project           |
| `description`   | string  | header | Description of project    |
| `tools`         | string  | header | Languages/Tools required  |
| `phase`         | string  | header | Project Phase             |
| `status`        | string  | header | Project Phase status      |
| `owner`         | string  | header | Creator of project        |
| `startDate`     | string  | header | Date created              |
| `collaboration` | boolean | header | Accepts collaboration     |
| `github`        | string  | header | GitHub project link       |

#### Success Reponse
**Code:** `201 Created` *(Resource updated successfully, and refreshes.)* \
**Content example**
```
{
  "id": "1",
  "name": "New Name",
  "description": "New Description",
  "tools": "HTML/CSS",
  "phase": "Design",
  "status": "Delayed",
  "owner": "username",
  "startDate": "Tue Dec 22 2020 00:00:00 GMT-0700",
  "collaboration": true,
  "github": "github.com/username/project"
}
```
#### Notes
All values will be necessary in Update due to previous empty field validation

---

### Delete Project
**URL:** `/projects/:projectID` \
**Method:** `DELETE` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `projectID`     | integer | path   | Project ID (Primary Key)  |

#### Success Reponse
**Code:** `301 Moved Permanently` \
**Content example**

&lt;*No Content*&gt;

---

### Issues related
Each endpoint manipulates information related to project issues.
- [Get Issues](https://github.com/dionisggr/devmap-api/wiki/Issues): `GET /issues`
- [Create Issue](https://github.com/dionisggr/devmap-api/wiki/Issues): `POST /issues`
- [Get Issues](https://github.com/dionisggr/devmap-api/wiki/Issues): `GET /issues/:issue`
- [Edit Issue](https://github.com/dionisggr/devmap-api/wiki/Issues): `PATCH /issues/:issue`
- [Delete Issue](https://github.com/dionisggr/devmap-api/wiki/Issues): `DELETE /issues/:issue`

---

### Get Issues
**URL:** `/issues` \
**Method:** `GET` \
**Auth required:** No

#### Success Reponse
**Code:** `200 OK` \
**Content example**
```
[
  {
    "id": "1",
    "name": "Project 1",
    "description": "First description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "Tue Dec 22 2020 00:00:00 GMT-0700",
    "collaboration": true,
    "github": "github.com/username/project",
    "projectID": "1"
  },

  [...]
]
```

---

### Add Issue
**URL:** `/issues` \
**Method:** `POST` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

#### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
{
    "name": "Issue 1",
    "description": "First description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "12/22/2020",
    "collaboration": true,
    "github": "github.com/username/project",
    "projectID": "1"
  }
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `name`          | string  | header | Name of project           |
| `description`   | string  | header | Description of project    |
| `tools`         | string  | header | Languages/Tools required  |
| `phase`         | string  | header | Project Phase             |
| `status`        | string  | header | Project Phase status      |
| `owner`         | string  | header | Creator of project        |
| `startDate`     | string  | header | Date created              |
| `collaboration` | boolean | header | Accepts collaboration     |
| `github`        | string  | header | GitHub project link       |
| `projectID`     | integer | header | Project ID (Primary Key)  |


#### Success Reponse
**Code:** `201 Created` \
**Content example**
```
[
  {
    "id": "1",
    "name": "Issue 1",
    "description": "First description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "Tue Dec 22 2020 00:00:00 GMT-0700",
    "collaboration": true,
    "github": "github.com/username/project",
    "projectID": "1"
  },

  [...]
]
```

---

### Edit Issue
**URL:** `/issue/:issueID` \
**Method:** `PATCH` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

#### Request Body
*Requires `headers: {'Content-Type': 'application/json'}`*
```
{
    "name": "New Name",
    "description": "New Description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "12/22/2020",
    "collaboration": true,
    "github": "github.com/username/project",
    "projectID": "1"
  }
```
| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `issueID `      | integer | path   | Issue ID (Primary Key)    |
| `projectID`     | integer | header | Project ID (Primary Key)  |
| `name`          | string  | header | Name of project           |
| `description`   | string  | header | Description of project    |
| `tools`         | string  | header | Languages/Tools required  |
| `phase`         | string  | header | Project Phase             |
| `status`        | string  | header | Project Phase status      |
| `owner`         | string  | header | Creator of project        |
| `startDate`     | string  | header | Date created              |
| `collaboration` | boolean | header | Accepts collaboration     |
| `github`        | string  | header | GitHub project link       |

#### Success Reponse
**Code:** `201 Created` *(Resource updated successfully, and refreshes.)* \
**Content example**
```
[
  {
    "id": "1",
    "name": "New Name",
    "description": "New Description",
    "tools": "HTML/CSS",
    "phase": "Design",
    "status": "Delayed",
    "owner": "username",
    "startDate": "Tue Dec 22 2020 00:00:00 GMT-0700",
    "collaboration": true,
    "github": "github.com/username/project",
    "projectID": "1"
  },

  [...]
]
```
#### Notes
All values will be necessary in Update due to previous empty field validation

---

### Delete Issue
**URL:** `/issues/:issueID` \
**Method:** `DELETE` \
**Auth required:** Yes
- `Bearer <JSON Web Token>`

| Name            | Type    | In     | Description               |
| ----------------| ------- | ------ | ------------------------- |
| `issueID`       | integer | path   | Project ID (Primary Key)  |

#### Success Reponse
**Code:** `301 Moved Permanently` \
**Content example**

&lt;*No Content*&gt;

---

### Landing Page
**URL:** `/` \
**Method:** `GET` \
**Auth required:** No

#### Success Reponse
**Code:** `200 OK` \
**Content example**

--

### Screenshots

Home Page
![HomePage]()

Main Page
![Projects Page]()

Signup Page
![Signup Page]()

Login Page
![Login Page]()
  
Project Page
![Project Page]()

Project New Page
![Project New Page]()

Project Edit Page
![Project Edit Page]()

Issue Page
![Issue Page]()

Issue New Page
![Issue New Page]()

Issue Edit Page
![Issue Edit Page]()

User List
![User List]()

User Page
![User Page]()

User Edit Page
![User Edit Page]()

---

## Development Roadmap
This is v1.0 of the app, but future enhancements are expected to include:
- Implementation of project and issue forums
- Sending messages between project collaborators and owner
- Option to make projects private and visible only to collaborators
- Project filtering by date, user and status

---

## Local Dev Set Up
Complete the following steps to clone a local copy of the server:

1. Clone this repository to your local machine `git clone REPO-URL NEW-PROJECT-NAME`.
2. `cd` into the cloned repository.
3. Make a fresh start of the git history for this project with `rm -rf .git && git init`.
4. Install the node dependencies `npm install`.
5. Move the `example.env` environment file to `.env`, which will be ignored by git .but read by the express server: `mv example.env .env`.
6. If you changed the project name, edit the contents of the `package.json` to use NEW-PROJECT-NAME.

### Scripts
1. Start a database server with `pg_ctl start`.
2. Create an user with Superuser permission, with `createuser -sPE admin` (if different name, make sure to update it in `.env`, `config.js`, `postgrator-config.js` files).
3. Create a database with any name, ideally `devmap` (if different name, make sure to update it in `.env`, `config.js`, `postgrator-config.js` files).
4. Run 'postgrator' with `npm run migrate` to migrate the tables to highest available version. To migrate tables to the lowest version, use `npm run migrate -- 0`.
5. Seed the tables with `psql -U admin -d devmap -f ./seeds/seed.devmap.sql` with preset data.
6. Start the application `npm start`. Tests will run automatically.
7. Alternatively, you may start the application with nodemon `npm run dev`; tests will not run unless manually set to.

### Configuring Postgres
For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

---