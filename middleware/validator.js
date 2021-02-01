var { body, validationResult } = require('express-validator');

 const UserValidationRules = () => [
    body('username', 'username is required').not().isEmpty(),
    body('email', 'email is required, make sure it is in the pattern yourmailname@domain.com').isEmail().not().isEmpty(),
    body('firstName', 'firstName is required').not().isEmpty(),
    body('lastName', 'lastName is required').not().isEmpty(),
    body('contact_number', 'contact_number is required').not().isEmpty(),
    body('gender', 'gender is required').not().isEmpty(),
    body('dob', 'dob is required').not().isEmpty(),
    body('country', 'country is required').not().isEmpty(),
    body('role', 'role is required').not().isEmpty(),
    body('password', 'password is required').not().isEmpty(),
    body('profile_pics').not().isEmpty()
];



 const loginValidationRules = () => [
    body('email', 'email is required, make sure it is in the pattern yourmailname@domain.com').isEmail().not().isEmpty(),
    body('password', 'password is required').not().isEmpty()
];


 const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }

    const extractedErrors = {};

    /* eslint-disable no-return-assign */
    errors.array().map((err) => (extractedErrors[err.param] = err.msg));

    return res.status(400).json({
        status: 'error',
        errors: extractedErrors
    });
};

 module.exports = { UserValidationRules, loginValidationRules, validate };

