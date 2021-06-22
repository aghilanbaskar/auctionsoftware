const Auth = require("../models/auth.model.js");
const md5 = require('md5');
const path = require('path');

exports.login_page = (req, res) => {
  res.sendFile(path.join(__dirname,'../views/login.html'));
};

exports.login = (req, res) => {
  Auth.check(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found Customer with id ${req.params.username}.`
        });
      } else {
        res.status(500).json({
          message: "Error retrieving Customer with id " + req.params.username
        });
      }
    } else { // username exist
      if (md5(`${md5(req.params.password)}`+`${data.salt}`) != data.password_hash) {
        return res.status(401).json({
          message: "Not able to authorize, Please check credential"
        });
      }

      
      res.json({
        message: "User Authenticated sucessfully"
      });
    };
  });
};
