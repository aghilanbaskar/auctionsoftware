module.exports = app => {
  const auth = require("../controllers/auth.controller.js");

  app.get("/auth/login", auth.login_page);
  
  // Create a new Customer
  app.get("/auth/login/:username/:password", auth.login);
};
