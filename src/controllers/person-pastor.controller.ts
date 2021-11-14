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
  Person,
  Pastor,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonPastorController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/pastors', {
    responses: {
      '200': {
        description: 'Array of Person has many Pastor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pastor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pastor>,
  ): Promise<Pastor[]> {
    return this.personRepository.pastors(id).find(filter);
  }

  @post('/people/{id}/pastors', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pastor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastor, {
            title: 'NewPastorInPerson',
            exclude: ['id'],
            optional: ['personId']
          }),
        },
      },
    }) pastor: Omit<Pastor, 'id'>,
  ): Promise<Pastor> {
    return this.personRepository.pastors(id).create(pastor);
  }

  @patch('/people/{id}/pastors', {
    responses: {
      '200': {
        description: 'Person.Pastor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pastor, {partial: true}),
        },
      },
    })
    pastor: Partial<Pastor>,
    @param.query.object('where', getWhereSchemaFor(Pastor)) where?: Where<Pastor>,
  ): Promise<Count> {
    return this.personRepository.pastors(id).patch(pastor, where);
  }

  @del('/people/{id}/pastors', {
    responses: {
      '200': {
        description: 'Person.Pastor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pastor)) where?: Where<Pastor>,
  ): Promise<Count> {
    return this.personRepository.pastors(id).delete(where);
  }
}
