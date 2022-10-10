const jwt = require("jsonwebtoken");
module.exports = {
  validateRegister: (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let repeatPassword = req.body.repeat_password;

    // username min length 3
    if (!username || username.length < 3) {
      return res.status(400).send({
        msg: 'Please enter a username with min. 3 chars'
      });
    }
    // password min 10 chars
    if (!password || password.length < 10) {
      return res.status(400).send({
        msg: 'Please enter a password with min. 10 chars'
      });
    }
    // password (repeat) does not match
    if (
      !repeatPassword ||
      password != repeatPassword
    ) {
      return res.status(400).send({
        msg: 'Both passwords must match'
      });
    }
    next();
  }
};