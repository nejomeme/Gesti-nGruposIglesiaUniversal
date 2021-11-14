import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Person, PersonRelations, Pastor} from '../models';
import {PastorRepository} from './pastor.repository';

export class PersonRepository extends DefaultCrudRepository<
  Person,
  typeof Person.prototype.id,
  PersonRelations
> {

  public readonly pastors: HasManyRepositoryFactory<Pastor, typeof Person.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PastorRepository') protected pastorRepositoryGetter: Getter<PastorRepository>,
  ) {
    super(Person, dataSource);
    this.pastors = this.createHasManyRepositoryFactoryFor('pastors', pastorRepositoryGetter,);
    this.registerInclusionResolver('pastors', this.pastors.inclusionResolver);
  }
}
