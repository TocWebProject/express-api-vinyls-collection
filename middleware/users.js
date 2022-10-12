const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (request, response, next) => {
    let username = request.body.username;
    let password = request.body.password;
    let repeatPassword = request.body.repeat_password;

    // username min length 3
    if (!username || username.length < 3) {
      return response.status(400).send({
        msg: 'Please enter a username with min. 3 chars'
      });
    }
    // password min 10 chars
    if (!password || password.length < 10) {
      return response.status(400).send({
        msg: 'Please enter a password with min. 10 chars'
      });
    }
    // password (repeat) does not match
    if (
      !repeatPassword ||
      password != repeatPassword
    ) {
      return response.status(400).send({
        msg: 'Both passwords must match'
      });
    }
    next();
  },

  isLoggedIn: (request, response, next) => {
    try {
      const token = request.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(
        token,
        process.env.SECRET_JWT
      );
      request.userData = decoded;
      next();
    } catch (err) {
      return response.status(401).send({
        msg: "Your session is not valid !",
      });
    }
  }
};