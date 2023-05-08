const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const port = 3004;

const route = require("./routes/route");
app.use(bodyParser.json());
//swagger
const swaggerui = require("swagger-ui-express");
const swaggerdocs = require("./swagger.json");

app.use("/api-docs", swaggerui.serve, swaggerui.setup(swaggerdocs));

try {
  app.use("/", route);
  app.use("/pst", route);
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
} catch (err) {
  throw err;
}
