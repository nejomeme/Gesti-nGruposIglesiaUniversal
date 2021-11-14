import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Lider, LiderRelations, Pastor, SubLider} from '../models';
import {PastorRepository} from './pastor.repository';
import {SubLiderRepository} from './sub-lider.repository';

export class LiderRepository extends DefaultCrudRepository<
  Lider,
  typeof Lider.prototype.id,
  LiderRelations
> {

  public readonly pastor: BelongsToAccessor<Pastor, typeof Lider.prototype.id>;

  public readonly subLiders: HasManyRepositoryFactory<SubLider, typeof Lider.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PastorRepository') protected pastorRepositoryGetter: Getter<PastorRepository>, @repository.getter('SubLiderRepository') protected subLiderRepositoryGetter: Getter<SubLiderRepository>,
  ) {
    super(Lider, dataSource);
    this.subLiders = this.createHasManyRepositoryFactoryFor('subLiders', subLiderRepositoryGetter,);
    this.registerInclusionResolver('subLiders', this.subLiders.inclusionResolver);
    this.pastor = this.createBelongsToAccessorFor('pastor', pastorRepositoryGetter,);
    this.registerInclusionResolver('pastor', this.pastor.inclusionResolver);
  }
}
