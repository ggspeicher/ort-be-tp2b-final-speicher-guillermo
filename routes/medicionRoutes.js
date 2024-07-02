import MedicionController from "../controllers/MedicionController.js";
import { Router } from "express";

const medicionController = new MedicionController();
const medicionRoutes = Router();

medicionRoutes.post("/", medicionController.registrarMedicion);
medicionRoutes.get("/", medicionController.listarMediciones);
medicionRoutes.get("/:idSonda", medicionController.listarMedicionesPorSonda);

export default medicionRoutes;
