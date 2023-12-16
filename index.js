

const express = require("express");
const userRoutes = require("./src/routes/user_routes.js");
const middleware = require("./src/middleware/middleware.js");

const app = express();

app.use(express.json());

const port = process.env.port || 3000;

app.use(express.urlencoded({extended : false}));

app.use(middleware);

app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Application runnig on port ${port}`));
