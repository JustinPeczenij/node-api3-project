const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`
    \n ${req.method} request to ${req.baseUrl} \
    \n @[${new Date().toString()}] \
  `)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const user = await Users.getById(req.params.id)
    if (!user) {
      next({ status: 404, message: `user with ${req.params.id} does not exist`})
    } else {
      req.user = user
      next()
    }
  }
  catch(err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}