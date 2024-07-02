import Medicion from "../Models/Medicion.js";
import FunctionalError from "../utils/FunctionalError.js";
import { SONDAS_CONFIG, TEMPERATURA_CONFIG } from "../config/config.js";
import appMessages from "../utils/mensajes.js";
class MedicionService {
  medicionModel = new Medicion(SONDAS_CONFIG.SONDAS_CANTIDAD);

  registrarMedicionService = async (idSonda, temperatura) => {
    if (
      !this.esSondaValida(idSonda) ||
      !this.esTemperaturaValida(temperatura)
    ) {
      throw new FunctionalError(400, appMessages.INVALID_PARAMETERS);
    }

    const nuevoRegistro = await this.medicionModel.create(
      idSonda,
      temperatura,
      new Date(Date.now())
    );

    //Mostramos la fecha en formato ISO
    nuevoRegistro.date = nuevoRegistro.date.toISOString();

    return nuevoRegistro;
  };

  listarMedicionesService = async () => {
    try {
      const data = await this.medicionModel.getAll();
      return data;
    } catch (error) {
      throw error;
    }
  };

  listarMedicionesPorSondaService = async (idSonda) => {
    try {
      //convertimos previamente, si es posible, al parametro en un numero. Caso contrario la sonda es invalida.
      if (idSonda === null || isNaN(idSonda)) {
        throw new FunctionalError(404, appMessages.SONDA_INVALIDA);
      }

      //Obtenemos el Id numérico de Sonda
      const idSondaNumerico = idSonda * 1;

      //Validamos contra el modelo si la sonda es válida
      if (!this.esSondaValida(idSondaNumerico)) {
        throw new FunctionalError(404, appMessages.SONDA_INVALIDA);
      }
      const data = await this.medicionModel.getById(idSondaNumerico);
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * Valida si la sonda es apta
   * @param {Number} idSonda Identificador único de la sonda
   * @returns
   */
  esSondaValida = (idSonda) => {
    return (
      typeof idSonda === "number" &&
      /^[1-9]+[0-9]*$/g.test(idSonda + "") &&
      1 <= idSonda &&
      idSonda <= SONDAS_CONFIG.SONDAS_CANTIDAD
    );
  };

  /**
   * Valida si la temperatura ingresada es apta.
   * @param {Number} temperatura Numero de hasta dos digitos decimales separados por punto (los decimales opcionales), que esté entre la temperatura
   * mínima y máxima permitida.
   *
   * @returns True si la temperatura es apta
   */
  esTemperaturaValida = (temperatura) => {
    return (
      typeof temperatura === "number" &&
      /^\-?(\d+)(\.\d\d?)?$/g.test(temperatura + "") &&
      TEMPERATURA_CONFIG.TEMPERATURA_MIN <= temperatura &&
      temperatura <= TEMPERATURA_CONFIG.TEMPERATURA_MAX
    );
  };
}

export default MedicionService;
