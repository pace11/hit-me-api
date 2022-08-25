const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
// adding Helmet to enhance your Rest API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
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
    url: `https://admCouch:Qz52S6tK3u@uat-tls.couch.efishery.com/leads_members/_find`,
    data: body,
    withCredentials: false,
    headers: {
      size: "100",
      skip: "0",
    },
  });
  const couchDBResponse = response.data.docs;
  res.send({ status: "200", message: "Ok", data: couchDBResponse });
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
