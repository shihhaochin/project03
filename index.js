const express = require("express");
const app = express();
const cors = require("cors");
const ApiRoute = require("./routes");

app.use(express.json());
app.use(cors());

app.use("/api/user", ApiRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Express Server started on port${port}`);
});
