const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");
const { statusMessage } = require("../utils");

require("dotenv").config();
const app = express();
app.use(helmet()); // security api
app.use(bodyParser.json()); // body parser
app.use(cors()); // handing cors

app.get("/", async (req, res) => {
  res.send({ message: "Hello World" });
});

app.get("/lead_members/:id", async (req, res) => {
  const body = {
    selector: {
      _id: {
        $gt: null,
      },
      id: req.params.id,
    },
    execution_stats: false,
    limit: 1,
    skip: 0,
  };
  const response = await axios({
    method: "POST",
    url: `${process.env.API_MEMBER_KABAYAN_UAT_COUCHDB}`,
    data: body,
    withCredentials: false,
    headers: {
      size: "100",
      skip: "0",
    },
  });
  const couchDBResponse = response.data.docs;
  const statusCode = response.data.bookmark !== "nil" ? 200 : 404;
  res.send({
    status: statusCode,
    message: statusMessage[statusCode],
    data: statusCode === 200 ? couchDBResponse : null,
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});
