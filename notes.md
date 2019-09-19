- npm init --y
- npm install --save-dev nodemon
- npm i express
- npm i bcryptjs
- npm i cors
- npm i helmet
- npm i jsonwebtoken
- npm i knex
- npm i sqlite3
- change scripts

- knex init (makes knexfile)
- knex migrate:make bootstrap
- knex migrate:latest (makes auth.db3 file)

- get the token on insomnia back when you login and copy it without the quotes
- then go to insomnia and for the get request on users, go to headers, type in authorization then copy the token in the value

- added "Department" field in schema table
- knex migrate:rollback
- knex migrate:latest

# TESTING

- add depdencies:
  - npm i
- add test script to package.json
