const fieldValidation = require('../middlewares/fieldValidation');
const authToken = require('../middlewares/authToken');
const authRole = require('../middlewares/authRole');
const fileValidation = require('../middlewares/fileValidation');

module.exports={
    ...fieldValidation,
    ...authToken,
    ...authRole,
    ...fileValidation
}