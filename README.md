# projeto20-RepoProvas
A Typescript designed project to manage tests, you can check their periods, who is lessioning and it's description such as test name and category.


<p align="center">
  <img  src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4dd.svg">
</p>
<h1 align="center">
  RepoProvas
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-316192?style=for-the-badge&logo=prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Jest-316192?style=for-the-badge&logo=jest&logoColor=white" height="30px"/>
  
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

RepoProvas is a back-end application, it simulates an API that manages tests.

</br>

## Features

-   User sign-up and sign-in
-   Create tests.
-   View tests ordered by disciplines.
-   View tests ordered by teachers.

</br>

## API Reference

### User Sign Up

```
https://ryan-repoprovas.herokuapp.com
POST /sign-up
```

#### Request:

| Body            | Type     | Description                     |
| :-------------- | :------- | :------------------------------ |
| `email`         | `string` | **Required**. user email        |
| `password`      | `string` | **Required**. user password     |
| `confirmPass`   | `string` | **Required**. user confirmpass  |

#### Response:

```json
{
  "message": "User successfully registered!"
}
```
`confirmPass must match password`

#

### User Sign In

```
https://ryan-repoprovas.herokuapp.com
POST /sign-in
```

#### Request:

| Body            | Type     | Description                     |
| :-------------- | :------- | :------------------------------ |
| `email`         | `string` | **Required**. user email        |
| `password`      | `string` | **Required**. user password     |
| `confirmPass`   | `string` | **Required**. user confirmpass  |

#### Response:

```json
{
  "token": "jwt authorization token"
}
```

#

### Create a new test

```
https://ryan-repoprovas.herokuapp.com
POST /test/new
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token | 

####

| Body                     | Type      | Description                             |
| :----------------------- | :-------- | :-------------------------------------- |
| `name`                   | `string`  | **Required**. test name                 |
| `pdfUrl`                 | `string`  | **Required**. pdf's url                 |
| `categoryId`             | `integer` | **Required**. test category id          |
| `teacherDisciplineId`    | `integer` | **Required**. teacher discipline id     |

####

</br>

#### Response:

```json
{
  "message": "Test added!"
}
```

`Can't create tests with same name`
`pdfUrl must be a valid pdf url`

#

### View tests ordered by disciplines.

```
https://ryan-repoprovas.herokuapp.com
GET /disciplines/tests
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

#### Response:

```json
[
  {
    "id": 4,
    "name": "Humildade",
    "termId": 1,
    "TeachersDisciplines": [
       {
         "id": 4,
         "teacherId": 2,
         "disciplineId": 4,
         "Tests": [
           {
             "id": 1,
              "name": "Prova 5",
              "pdfUrl": "https://www.doraci.com.br/downloads/matematica/fund-mat-elem_01.pdf",
              "categoryId": 1,
              "teacherDisciplineId": 4,
              "categories": {
              "name": "Projeto"
             }
           }
          ],
          "teachers": {
            "id": 2,
            "name": "Bruna Hamori"
          }
        }
     ]
  },
  ...
]
```
#

### View tests ordered by teachers.

```
https://ryan-repoprovas.herokuapp.com
GET /teachers/tests
```

#### Request:

| Headers          | Type    | Description                        |
| :--------------- | :-------| :--------------------------------- |
| `x-access-token` | `string`| **Required**. authentication token |

#### Response:

```json
[
 {
    "id": 4,
    "teacherId": 2,
    "disciplineId": 4,
    "Tests": [
      {
        "name": "Prova 5",
        "pdfUrl": "https://www.doraci.com.br/downloads/matematica/fund-mat-elem_01.pdf"
      }
    ],
    "disciplines": {
      "id": 4,
      "name": "Humildade",
      "termId": 1,
      "terms": {
        "number": 1
      }
    },
    "teachers": {
      "name": "Bruna Hamori"
    }
  },
  ...
 ]
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`JWT_SECRET= string ` 

</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/FKnight-cyber/projeto20-repoprovas
```

Go to the project directory

```bash
  cd projeto19-drivenpass/backend
```

Install dependencies

```bash
  npm install
```

Create database

The application is currently deployed on Heroku, but if you want to run it locally...

cd ../../projeto19-drivenpass/backend

check your .env and inform your DATABASE_URL

```bash
  run npx prisma migrate dev 
```

and prisma will build the postgress database.

Start the server

```bash
  npm run dev
```

Run tests

```bash
  npm test
```

prisma will build another postgress database for test purposes, also will populate with needed data, you can check it on seed.ts folder.
</br>

## Lessons Learned

In this project i've worked with tests for the first time, i had to use jest and supertest to implement it, also learnt new prisma functions like
seeding database.

</br>

## Acknowledgements

-   [Awesome Badges](https://github.com/Envoy-VC/awesome-badges)

</br>

## Authors

-   Ryan Nicholas is a student at Driven Education and is putting effort into it to become a Dev.
<br/>

#
