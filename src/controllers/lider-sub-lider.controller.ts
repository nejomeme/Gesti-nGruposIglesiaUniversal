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
  Lider,
  SubLider,
} from '../models';
import {LiderRepository} from '../repositories';

export class LiderSubLiderController {
  constructor(
    @repository(LiderRepository) protected liderRepository: LiderRepository,
  ) { }

  @get('/liders/{id}/sub-liders', {
    responses: {
      '200': {
        description: 'Array of Lider has many SubLider',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SubLider)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SubLider>,
  ): Promise<SubLider[]> {
    return this.liderRepository.subLiders(id).find(filter);
  }

  @post('/liders/{id}/sub-liders', {
    responses: {
      '200': {
        description: 'Lider model instance',
        content: {'application/json': {schema: getModelSchemaRef(SubLider)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Lider.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubLider, {
            title: 'NewSubLiderInLider',
            exclude: ['id'],
            optional: ['liderId']
          }),
        },
      },
    }) subLider: Omit<SubLider, 'id'>,
  ): Promise<SubLider> {
    return this.liderRepository.subLiders(id).create(subLider);
  }

  @patch('/liders/{id}/sub-liders', {
    responses: {
      '200': {
        description: 'Lider.SubLider PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubLider, {partial: true}),
        },
      },
    })
    subLider: Partial<SubLider>,
    @param.query.object('where', getWhereSchemaFor(SubLider)) where?: Where<SubLider>,
  ): Promise<Count> {
    return this.liderRepository.subLiders(id).patch(subLider, where);
  }

  @del('/liders/{id}/sub-liders', {
    responses: {
      '200': {
        description: 'Lider.SubLider DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SubLider)) where?: Where<SubLider>,
  ): Promise<Count> {
    return this.liderRepository.subLiders(id).delete(where);
  }
}
