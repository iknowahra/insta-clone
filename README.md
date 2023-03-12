# insta-clone

clone instagram using **grqphql-yoga, prisma 2, mysql**

## You can do...

- [x] See the feed
- [x] Like / Unlike a photo
- [x] Comment on a photo
- [x] Search by user
- [x] Search by location
- [x] See user profile
- [x] See My profile
- [x] See the full post
- [x] Follow / unfollow user
- [x] Edit my profile
- [x] Create account
- [x] Log in with passport-jwt
- [x] Upload a photo
- [x] Edit the post (delete)
- [x] Create Account
- [x] Request Secret
- [x] Confirm Secret (login)
- [x] See User like the post or not
- [x] See one of user follow other user
- [x] Send private DM
- [x] Receive DM in realtime using subscription
- [x] See room
- [x] see room list
- [x] Search rooms with terms

## Before Start ...

1. You should make `.env` file and then copy & paste and fill the blank fill in the blank

```javascript
PORT=
MAILGUN_API=
MAILGUN_DOMAIN=
JWT_SECRET=
SALT_ROUNDS=
S3_BUCKET=
AWS_ACCESSKEY=
AWS_SECRET=
AWS_REGION=
// when it comes to Mailgun api&domain, you can get this api at https://mailgun.com
```

2. commend `$ npx prisma init`

3. You can see another `.env` file at `prisma/` folder after executing no.2

   you should copy & paste and fill the blank after reading the annex on that file

4. `npm run prima` for migrating db and generating prisma client

## Start

`npm run build`

`npm start`
