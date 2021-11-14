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
import {Lider} from '../models';
import {LiderRepository} from '../repositories';

export class LiderController {
  constructor(
    @repository(LiderRepository)
    public liderRepository : LiderRepository,
  ) {}

  @post('/liders')
  @response(200, {
    description: 'Lider model instance',
    content: {'application/json': {schema: getModelSchemaRef(Lider)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lider, {
            title: 'NewLider',
            exclude: ['id'],
          }),
        },
      },
    })
    lider: Omit<Lider, 'id'>,
  ): Promise<Lider> {
    return this.liderRepository.create(lider);
  }

  @get('/liders/count')
  @response(200, {
    description: 'Lider model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Lider) where?: Where<Lider>,
  ): Promise<Count> {
    return this.liderRepository.count(where);
  }

  @get('/liders')
  @response(200, {
    description: 'Array of Lider model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Lider, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Lider) filter?: Filter<Lider>,
  ): Promise<Lider[]> {
    return this.liderRepository.find(filter);
  }

  @patch('/liders')
  @response(200, {
    description: 'Lider PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lider, {partial: true}),
        },
      },
    })
    lider: Lider,
    @param.where(Lider) where?: Where<Lider>,
  ): Promise<Count> {
    return this.liderRepository.updateAll(lider, where);
  }

  @get('/liders/{id}')
  @response(200, {
    description: 'Lider model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Lider, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Lider, {exclude: 'where'}) filter?: FilterExcludingWhere<Lider>
  ): Promise<Lider> {
    return this.liderRepository.findById(id, filter);
  }

  @patch('/liders/{id}')
  @response(204, {
    description: 'Lider PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Lider, {partial: true}),
        },
      },
    })
    lider: Lider,
  ): Promise<void> {
    await this.liderRepository.updateById(id, lider);
  }

  @put('/liders/{id}')
  @response(204, {
    description: 'Lider PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() lider: Lider,
  ): Promise<void> {
    await this.liderRepository.replaceById(id, lider);
  }

  @del('/liders/{id}')
  @response(204, {
    description: 'Lider DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.liderRepository.deleteById(id);
  }
}
