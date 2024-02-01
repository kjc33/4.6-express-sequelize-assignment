require("dotenv").config();
const express = require("express");
const categoryRoutes = require("./routes/categoryRoutes");

const app = express();
const PORT = 8080;
app.use(express.json());

app.use("/categories", categoryRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
