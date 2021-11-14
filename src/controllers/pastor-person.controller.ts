import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pastor,
  Person,
} from '../models';
import {PastorRepository} from '../repositories';

export class PastorPersonController {
  constructor(
    @repository(PastorRepository)
    public pastorRepository: PastorRepository,
  ) { }

  @get('/pastors/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Pastor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.string('id') id: typeof Pastor.prototype.id,
  ): Promise<Person> {
    return this.pastorRepository.person(id);
  }
}
