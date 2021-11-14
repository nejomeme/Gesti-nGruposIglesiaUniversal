import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Lider,
  Pastor,
} from '../models';
import {LiderRepository} from '../repositories';

export class LiderPastorController {
  constructor(
    @repository(LiderRepository)
    public liderRepository: LiderRepository,
  ) { }

  @get('/liders/{id}/pastor', {
    responses: {
      '200': {
        description: 'Pastor belonging to Lider',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pastor)},
          },
        },
      },
    },
  })
  async getPastor(
    @param.path.string('id') id: typeof Lider.prototype.id,
  ): Promise<Pastor> {
    return this.liderRepository.pastor(id);
  }
}
