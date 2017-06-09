# My Public Apology

[![Build Status](https://travis-ci.org/TheConnMan/my-public-apology.svg?branch=master)](https://travis-ci.org/TheConnMan/my-public-apology) [![Docker Pulls](https://img.shields.io/docker/pulls/theconnman/my-public-apology.svg)](https://hub.docker.com/r/theconnman/my-public-apology/)

Publicly apologies so others know you really mean it - A forum to submit and read public apologies

## Local Development

To get started with local development follow these steps:

1. Clone this repo and `cd` into it
2. Install **My Public Apology** dependencies with `npm install` (make sure you're on npm v3+)
3. Get a Google API key using the setup steps below
4. Run **My Public Apology** with `GOOGLE_API_KEY=<your-API-key> GOOGLE_ID=<your-google-oauth-id> GOOGLE_SECRET=<your-google-oauth-secret> npm start` and go to <http://localhost:1337>


## Running with MySQL

The default database is on disk, so it is recommended to run **My Public Apology** with a MySQL DB in production. Use the following environment variables:

- MYSQL_HOST (MySQL will be used as the datastore if this is supplied)
- MYSQL_USER (default: sails)
- MYSQL_PASSWORD (default: sails)
- MYSQL_DB (default: sails)

The easiest way to run a MySQL instance is to run it in Docker using the following command:

```bash
docker run -d -p 3306:3306 -e MYSQL_DATABASE=sails -e MYSQL_USER=sails -e MYSQL_PASSWORD=sails -e MYSQL_RANDOM_ROOT_PASSWORD=true --name=mysql mysql
```

### Developing with MySQL

Using MySQL automatically sets the migration strategy to `safe`, so running with MySQL requires you to run `npm migrate` with the appropriate environment variables to bring the DB schema up to speed.

When developing a new migration script run `grunt db:migrate:create --name=<migration-name>` and implement the `up` and `down` steps once the migration is created.

## Environment Variables

- **GOOGLE_ID** - Google OAuth application ID (set up a [Google App](https://cloud.google.com/console#/project), create OAuth credentials, and enable the Google+ API)
- **GOOGLE_SECRET** - Google OAuth secret key
- **GOOGLE_ANALYTICS_ID** (Optional) - [Google Analytics](https://analytics.google.com/) Tracking ID for site analytics
- **TWITTER_CONSUMER_KEY** (Optional) - [Twitter Application](https://apps.twitter.com) consumer key for consuming tweets
- **TWITTER_CONSUMER_SECRET** (Optional) - [Twitter Application](https://apps.twitter.com) consumer secret for consuming tweets
- **TWITTER_ACCESS_TOKEN_KEY** (Optional) - [Twitter Application](https://apps.twitter.com) token key for consuming tweets
- **TWITTER_ACCESS_TOKEN_SECRET** (Optional) - [Twitter Application](https://apps.twitter.com) token secret for consuming tweets
- **TWITTER_TRACKER** (Optional) - Tracker (e.g. `#mypublicapology` or `@mypublicapology`) used to filter incoming tweets to consume
- **FLUENTD_HOST** (Optional) Fluent host for logging
- **FLUENTD_TAGS** (Optional) Add FluentD context tags (format is tag:value,tag2:value2)
