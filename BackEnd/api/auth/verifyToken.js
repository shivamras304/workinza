const jwt = require('jsonwebtoken');
const config = require('../../config.json');

module.exports = function(req, res, next) {
  const token = req.headers['x-access-token'];
  if(!token) {
    res.status(403).send({
      auth: false,
      message: "No authentication token provided"
    });
  }

  jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate token.'
      });
    }

    // If there's no error, save the decoded user id in the request object
    req.userId = decoded.id;
    next();
  });
}