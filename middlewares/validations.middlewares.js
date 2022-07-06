const { body, validationResult } = require('express-validator');

// Utils
const { AppError } = require('../utils/appError');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    // [msg, msg, msg] -> 'msg. msg. msg'
    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }

  next();
};

const createUserValidations = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  checkValidations,
];

const createTaskValidation = [
  body('title')
    .notEmpty()
    .withMessage("title cannot be empty")
    .isString()
    .withMessage("title must be a string"),
  body('userId')
    .notEmpty()
    .withMessage("UserId cannot be empty")
    .isNumeric()
    .withMessage("User id must be a number")
    .custom(val => val > 0)
    .withMessage("User id cannot be a negative value"),
    checkValidations
]

module.exports = {
  createUserValidations, createTaskValidation
};
