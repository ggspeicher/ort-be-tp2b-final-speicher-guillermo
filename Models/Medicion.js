class Medicion {
  registros = [];

  create = async (idSonda, temperatura, fechaHora) => {
    const registro = { id: idSonda, temperatura, date: fechaHora };
    this.registros.push(registro);
    return Object.assign({}, registro);
  };

  getAll = async () => {
    return this.registros.slice();
  };

  getById = async (idSonda) => {
    return this.registros.filter((registro) => registro.id === idSonda);
  };
}

export default Medicion;
