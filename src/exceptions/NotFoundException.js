const BusinessException = require('./BusinessException');

class NotFoundException extends BusinessException {
  constructor(resource, field, id) {
    super(`Não existe um(a) ${resource} com o ${field} ${id}.`);
  }
}

module.exports = NotFoundException;
