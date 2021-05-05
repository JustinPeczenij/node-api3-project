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
      next({ status: 404, message: `not found`})
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
  if(!req.body.name) {
    next({ status: 400, message: 'missing required name field' })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  if(!text || !text.trim()) {
    next({ status: 400, message: "missing required text field" })
  } else {
    req.text = text
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}