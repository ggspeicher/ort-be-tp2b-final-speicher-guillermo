import appMensajes from "../utils/mensajes.js";

const notFoundError = (req, res, next) => {
  res.status(404).send({ errorMsg: appMensajes.APP_NOT_FOUND });
};

export default notFoundError;
