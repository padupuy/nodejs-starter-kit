# NodeJS starter kit
Setup a NodeJS application with REST API, NoSQL Database, WebSocket and code quality tools.

## Techno
- `express` is used as main web framework
 * a lot of middlewares are also used (see `src/config/express.js`)
- `nodemon` is used to restart server everytime a file changed and save a lot of time
- `gulp` is used as task runner
- `mocha` is used as test runner with :  
  * `chai` for expect
  * `supertest` for request
  * `sinon` for stubbing  
  * `nock` for simulating http calls
  * `istanbul` for code coverage
- `mongodb` is used as database
 * `mongoose` as ORM
- `socket.io` is used as websocket
- `eslint` is used as linter

## Let's get started

install dependencies
```
$ npm install
```

run dev mode
```
$ npm run dev
```

## API

### Public

Serve public folder to the root path
[GET http://localhost:3001/](http://localhost:3001/)

### Modules

Get all modules
[GET http://localhost:3001/modules](http://localhost:3001/modules)

### Alive

Get alive module
[GET http://localhost:3001/alive](http://localhost:3001/alive)


## TESTS

Run tests
```
$ npm test
```

Run coverage.  
HTML reports are available in the `target` folder.
```
$ npm run coverage
```

## Production

Run production mode
```
$ npm install --production
$ npm start
```

Run continuous integration command to get project health.  
It will check :
- lint status
- tests status
- coverage status

Xml reports are available in the `target` folder.
```
$ npm run ci
```

## Code quality

The `.editorconfig` file helps you to write code with same indent syle (space FTW), encoding and line ending format for every developer.  

The `.eslintrc` file helps you to define coding rules.
