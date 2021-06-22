const Project = require("../models/project.model.js");
const path = require('path');

exports.project_page = (req, res) => {
    res.sendFile(path.join(__dirname,'../views/project.html'));
};

exports.getAll = (req, res) => {
    let offset = req.query.offset || 0;
    let sort = req.query.sort || '';
    Project.getAll(offset, sort, (err, data) => {
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
    } else { 
      res.send(data);
    }
  });
};