const express = require('express');
const { logger, validatePost, validateUser, validateUserId } = require('../middleware/middleware')
// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')
// The middleware functions also need to be required

const router = express.Router();
router.use(logger)

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(next);
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  await Users.update(req.params.id, req.body)
  try{
    const updatedUser = await Users.getById(req.params.id)
    res.status(200).json(updatedUser)
  } catch(err) {
    next(err)
  }

});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// Catches errors that happen in routes
router.use((err, req, res, next)=> { // eslint-disable-line
  res.status(err.status || 500).json({
    note: 'something went wrong in the users router',
    message: err.message,
    stack: err.stack,
  })
})

// do not forget to export the router
module.exports = router