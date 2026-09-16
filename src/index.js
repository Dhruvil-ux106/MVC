const express = require("express");

const logger = require("./middleware/logger");
const userRouter = require("./routers/userRouter");
const bookRouter = require("./routers/bookRouter");

const app = express();

app.use(express.json())

app.use(logger);

app.use("/", userRouter);
app.use("/", bookRouter);

const PORT = 3000;

app.listen(PORT, () => {
 console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;
