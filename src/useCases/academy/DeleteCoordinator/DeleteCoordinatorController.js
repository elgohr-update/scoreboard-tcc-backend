const DeleteCoordinatorUseCase = require('./DeleteCoordinatorUseCase');

class DeleteCoordinatorController {
  /**
   * DeleteCoordinatorController
   *
   * @class
   * @param {object} container - Container
   * @param {DeleteCoordinatorUseCase} container.deleteCoordinatorUseCase - DeleteCoordinatorUseCase
   */
  constructor({ deleteCoordinatorUseCase }) {
    this.deleteCoordinatorUseCase = deleteCoordinatorUseCase;
  }

  async handle(request, response) {
    const { id } = request.params;

    await this.deleteCoordinatorUseCase.execute(id);

    return response.status(200).send();
  }
}

module.exports = DeleteCoordinatorController;
