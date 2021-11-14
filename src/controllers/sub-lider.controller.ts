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
import {SubLider} from '../models';
import {SubLiderRepository} from '../repositories';

export class SubLiderController {
  constructor(
    @repository(SubLiderRepository)
    public subLiderRepository : SubLiderRepository,
  ) {}

  @post('/sub-liders')
  @response(200, {
    description: 'SubLider model instance',
    content: {'application/json': {schema: getModelSchemaRef(SubLider)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubLider, {
            title: 'NewSubLider',
            exclude: ['id'],
          }),
        },
      },
    })
    subLider: Omit<SubLider, 'id'>,
  ): Promise<SubLider> {
    return this.subLiderRepository.create(subLider);
  }

  @get('/sub-liders/count')
  @response(200, {
    description: 'SubLider model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SubLider) where?: Where<SubLider>,
  ): Promise<Count> {
    return this.subLiderRepository.count(where);
  }

  @get('/sub-liders')
  @response(200, {
    description: 'Array of SubLider model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SubLider, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SubLider) filter?: Filter<SubLider>,
  ): Promise<SubLider[]> {
    return this.subLiderRepository.find(filter);
  }

  @patch('/sub-liders')
  @response(200, {
    description: 'SubLider PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubLider, {partial: true}),
        },
      },
    })
    subLider: SubLider,
    @param.where(SubLider) where?: Where<SubLider>,
  ): Promise<Count> {
    return this.subLiderRepository.updateAll(subLider, where);
  }

  @get('/sub-liders/{id}')
  @response(200, {
    description: 'SubLider model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SubLider, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SubLider, {exclude: 'where'}) filter?: FilterExcludingWhere<SubLider>
  ): Promise<SubLider> {
    return this.subLiderRepository.findById(id, filter);
  }

  @patch('/sub-liders/{id}')
  @response(204, {
    description: 'SubLider PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SubLider, {partial: true}),
        },
      },
    })
    subLider: SubLider,
  ): Promise<void> {
    await this.subLiderRepository.updateById(id, subLider);
  }

  @put('/sub-liders/{id}')
  @response(204, {
    description: 'SubLider PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() subLider: SubLider,
  ): Promise<void> {
    await this.subLiderRepository.replaceById(id, subLider);
  }

  @del('/sub-liders/{id}')
  @response(204, {
    description: 'SubLider DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.subLiderRepository.deleteById(id);
  }
}
