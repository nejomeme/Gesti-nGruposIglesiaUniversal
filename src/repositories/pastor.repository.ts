import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pastor, PastorRelations, Person, Lider} from '../models';
import {PersonRepository} from './person.repository';
import {LiderRepository} from './lider.repository';

export class PastorRepository extends DefaultCrudRepository<
  Pastor,
  typeof Pastor.prototype.id,
  PastorRelations
> {

  public readonly person: BelongsToAccessor<Person, typeof Pastor.prototype.id>;

  public readonly liders: HasManyRepositoryFactory<Lider, typeof Pastor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonRepository') protected personRepositoryGetter: Getter<PersonRepository>, @repository.getter('LiderRepository') protected liderRepositoryGetter: Getter<LiderRepository>,
  ) {
    super(Pastor, dataSource);
    this.liders = this.createHasManyRepositoryFactoryFor('liders', liderRepositoryGetter,);
    this.registerInclusionResolver('liders', this.liders.inclusionResolver);
    this.person = this.createBelongsToAccessorFor('person', personRepositoryGetter,);
    this.registerInclusionResolver('person', this.person.inclusionResolver);
  }
}
