require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const { UserRoute } = require("./User");

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use("/", UserRoute);

app.use("*", (req, res) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
	console.log(error);
	res.status(500).json({ message: "Internal server error" });
});

app.listen(8000, () => {
	console.log("Server is running on port 3000");
});
