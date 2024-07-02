import { Router } from "express";
import medicionRoutes from "./medicionRoutes.js";

const routes = Router();

routes.use("/medicion", medicionRoutes);

export default routes;
