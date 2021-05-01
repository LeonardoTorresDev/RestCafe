const {generateJWT} = require('../../helpers/helpers');

const renovateToken = async(req, res) => {
    const {user} = req;
    const token  = await generateJWT(user._id);
    res.json({
        user,
        token
    });
}

module.exports = renovateToken;