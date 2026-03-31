import express from "express";
import logMiddleware from '../middlewares/log.middleware.js';
import validateRequest from '../middlewares/validate.middleware.js';
import getData from '../data/data.js';

let posts = [];
let users = [];

getData('posts').then(data => {
  posts = data;
});

getData('users').then(data => {
  users = data;
})

const router = express.Router()

router.delete('/api/v1/deleteTitle', logMiddleware, validateRequest, (req, res) => {
  console.log('test')
});

router.get('/api/v1/postWithLongestTitle', logMiddleware, validateRequest, (req, res) => {
  let postLongest = null;
  posts.forEach((post) => {
    if (!postLongest || post.title.length > postLongest.title.length) {
      postLongest = post;
    }
  });
  return res.status(200).send(postLongest);
});

router.get('/api/v1/userWithLongestName', logMiddleware, validateRequest, (req, res) => {
  let userLongest = null;
  users.forEach((user) => {
    if (!userLongest || user.name.length > userLongest.name.length) {
      userLongest = user;
    }
  });
  return res.status(200).send(userLongest);
});

export default router;