import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SubLider,
  Lider,
} from '../models';
import {SubLiderRepository} from '../repositories';

export class SubLiderLiderController {
  constructor(
    @repository(SubLiderRepository)
    public subLiderRepository: SubLiderRepository,
  ) { }

  @get('/sub-liders/{id}/lider', {
    responses: {
      '200': {
        description: 'Lider belonging to SubLider',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lider)},
          },
        },
      },
    },
  })
  async getLider(
    @param.path.string('id') id: typeof SubLider.prototype.id,
  ): Promise<Lider> {
    return this.subLiderRepository.lider(id);
  }
}
