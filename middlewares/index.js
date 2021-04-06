const fieldValidation = require('../middlewares/fieldValidation');
const authToken = require('../middlewares/authToken');
const authRole = require('../middlewares/authRole');

module.exports={
    ...fieldValidation,
    ...authToken,
    ...authRole
}