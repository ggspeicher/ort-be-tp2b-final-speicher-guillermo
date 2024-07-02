import MedicionService from "../services/MedicionService.js";

class MedicionController {
  medicionService = new MedicionService();

  registrarMedicion = async (req, res, next) => {
    try {
      const { id, temperatura } = req.body;
      const data = await this.medicionService.registrarMedicionService(
        id,
        temperatura
      );
      res.status(201).send({ Msg: data });
    } catch (error) {
      next(error);
    }
  };

  listarMediciones = async (req, res, next) => {
    try {
      const data = await this.medicionService.listarMedicionesService();
      res.status(200).send({ Msg: data });
    } catch (error) {
      next(error);
    }
  };
  listarMedicionesPorSonda = async (req, res, next) => {
    try {
      const { idSonda } = req.params;
      const data = await this.medicionService.listarMedicionesPorSondaService(
        idSonda
      );
      res.status(200).send({ Msg: data });
    } catch (error) {
      next(error);
    }
  };
}

export default MedicionController;
