const fieldValidation = require('../middlewares/fieldValidation');
const authToken = require('../middlewares/authToken');
const authRole = require('../middlewares/authRole');
const fileValidators = require('./fileValidators');

module.exports={
    ...fieldValidation,
    ...authToken,
    ...authRole,
    ...fileValidators
}