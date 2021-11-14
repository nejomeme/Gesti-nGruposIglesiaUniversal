import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Pastor} from '../models';
import {PastorRepository} from '../repositories';

export class PastorController {
  constructor(
    @repository(PastorRepository)
    public pastorRepository : PastorRepository,
  ) {}

  @post('/pastors')
  @response(200, {
    description: 'Pastor model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pastor)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastor, {
            title: 'NewPastor',
            exclude: ['id'],
          }),
        },
      },
    })
    pastor: Omit<Pastor, 'id'>,
  ): Promise<Pastor> {
    return this.pastorRepository.create(pastor);
  }

  @get('/pastors/count')
  @response(200, {
    description: 'Pastor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pastor) where?: Where<Pastor>,
  ): Promise<Count> {
    return this.pastorRepository.count(where);
  }

  @get('/pastors')
  @response(200, {
    description: 'Array of Pastor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pastor, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pastor) filter?: Filter<Pastor>,
  ): Promise<Pastor[]> {
    return this.pastorRepository.find(filter);
  }

  @patch('/pastors')
  @response(200, {
    description: 'Pastor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastor, {partial: true}),
        },
      },
    })
    pastor: Pastor,
    @param.where(Pastor) where?: Where<Pastor>,
  ): Promise<Count> {
    return this.pastorRepository.updateAll(pastor, where);
  }

  @get('/pastors/{id}')
  @response(200, {
    description: 'Pastor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pastor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pastor, {exclude: 'where'}) filter?: FilterExcludingWhere<Pastor>
  ): Promise<Pastor> {
    return this.pastorRepository.findById(id, filter);
  }

  @patch('/pastors/{id}')
  @response(204, {
    description: 'Pastor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastor, {partial: true}),
        },
      },
    })
    pastor: Pastor,
  ): Promise<void> {
    await this.pastorRepository.updateById(id, pastor);
  }

  @put('/pastors/{id}')
  @response(204, {
    description: 'Pastor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pastor: Pastor,
  ): Promise<void> {
    await this.pastorRepository.replaceById(id, pastor);
  }

  @del('/pastors/{id}')
  @response(204, {
    description: 'Pastor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pastorRepository.deleteById(id);
  }
}
