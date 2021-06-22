const sql = require("./db.js");

// constructor
const Auth = function(customer) {
};


Auth.check = (username, result) => {
  sql.query(`SELECT username, password_hash, salt FROM users WHERE username = '${username}'`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};


module.exports = Auth;
