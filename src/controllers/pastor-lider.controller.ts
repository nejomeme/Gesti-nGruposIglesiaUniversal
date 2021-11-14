import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Pastor,
  Lider,
} from '../models';
import {PastorRepository} from '../repositories';

export class PastorLiderController {
  constructor(
    @repository(PastorRepository) protected pastorRepository: PastorRepository,
  ) { }

  @get('/pastors/{id}/liders', {
    responses: {
      '200': {
        description: 'Array of Pastor has many Lider',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Lider)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Lider>,
  ): Promise<Lider[]> {
    return this.pastorRepository.liders(id).find(filter);
  }

  @post('/pastors/{id}/liders', {
    responses: {
      '200': {
        description: 'Pastor model instance',
        content: {'application/json': {schema: getModelSchemaRef(Lider)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Pastor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lider, {
            title: 'NewLiderInPastor',
            exclude: ['id'],
            optional: ['pastorId']
          }),
        },
      },
    }) lider: Omit<Lider, 'id'>,
  ): Promise<Lider> {
    return this.pastorRepository.liders(id).create(lider);
  }

  @patch('/pastors/{id}/liders', {
    responses: {
      '200': {
        description: 'Pastor.Lider PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lider, {partial: true}),
        },
      },
    })
    lider: Partial<Lider>,
    @param.query.object('where', getWhereSchemaFor(Lider)) where?: Where<Lider>,
  ): Promise<Count> {
    return this.pastorRepository.liders(id).patch(lider, where);
  }

  @del('/pastors/{id}/liders', {
    responses: {
      '200': {
        description: 'Pastor.Lider DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Lider)) where?: Where<Lider>,
  ): Promise<Count> {
    return this.pastorRepository.liders(id).delete(where);
  }
}
