module.exports = app => {
  const project = require("../controllers/project.controller.js");

  app.get("/project", project.project_page);
  // get projects
  app.get("/project/getAll", project.getAll);
};