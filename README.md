Getir Express Mongo Fetch API
==================================

## Related modules

* express - web application framework for node
* mongoose - nodejs orm for mongodb

## Prerequisites

* Node.js `http://nodejs.org`

## Project Structure
```sh
.
├── app/
│   └── controllers           # contains controller files
│   └── models                # contains model files
│   └── views                 # contains express view (pug) files
│   └── routes.js             # routes config file
├── config/
│   ├── index.js              # environment config file
│   └── db.js                 # db config
├── public/                   # contains static assets
│   ├── components            # bower components folder
├── test/
│   └── spec.js               # unit & func tests
├── .Procfile                 # process file for heroku implementation
├── .gitignore                # specifies intentionally untracked files to ignore
├── .editorconfig.js          # editor config
├── .gulpfile.js              # gulp config
├── .eslintrc.yml             # eslint config
├── .eslintignore             # eslint ignore specific files and directories config file
├── .travis.yml               # travis ci config
├── app.js                    # app setup file
└── package.json              # build scripts and dependencies

```

## Getting Started

The easiest way to get started is to clone the repository:

```sh
# Get the latest snapshot
$ git clone https://github.com/sahilbathla/fetch_data_mongo
$ cd fetch_data_mongo

# Install dependencies
$ npm install
$ npm start
```

## Working curl

```
curl --location --request POST 'http://localhost:3000' \
--header 'Content-Type: application/json' \
--data-raw '{
"startDate": "2016-01-26",
"endDate": "2018-02-02",
"minCount": 2700,
"maxCount": 3000
}
'
```

## Test

    npm test

## Lint (Add to pre commmit hook if needed)

    npm run lint

## Docker Support(If needed - not tested)

* Docker `https://docs.docker.com/engine/installation/`

```
# Build the project
docker-compose build

# Start the application
docker-compose up
```

## Deploy

Make sure you have the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed.

```
heroku create
git push heroku master
heroku open
```

## License

MIT
