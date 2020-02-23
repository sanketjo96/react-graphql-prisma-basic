const jwt = require('jsonwebtoken')
const APP_SECRET = process.env.APP_SECRET
const INVALIDDATE = 'Invalid date'

function getUserId(context) {
  const Authorization = context.request.get('Authorization')
  if (Authorization) {
    const token = Authorization.replace('bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

function isLeaveDatesInValid(startDate, endDate ) {
  if (
    startDate.format() === INVALIDDATE 
    || endDate.format() === INVALIDDATE
    || endDate.isBefore(startDate)
  ) {
    return true
  } else {
    return false
  }
}

module.exports = {
  APP_SECRET,
  getUserId,
  isLeaveDatesInValid
}