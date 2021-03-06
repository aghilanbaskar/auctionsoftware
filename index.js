const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Task application." });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/project.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
