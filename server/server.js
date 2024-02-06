require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const bookRoutes = require("./routes/bookRoute");


app.use("/api/books", bookRoutes);

app.listen(port, () => console.log(`Sever is running on port ${port}`));
