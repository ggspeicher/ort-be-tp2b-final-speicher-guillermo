import express from "express";
import customErrorHandler from "./middlewares/customErrorHandler.js";
import notFoundError from "./middlewares/notFoundError.js";
import routes from "./routes/routes.js";
import { SERVER_PORT } from "./config/config.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(customErrorHandler);
app.use(notFoundError);

app.listen(SERVER_PORT, () => {
  console.log(`🚀 listen  ${SERVER_PORT}`);
});
