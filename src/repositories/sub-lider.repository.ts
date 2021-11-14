import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SubLider, SubLiderRelations, Lider} from '../models';
import {LiderRepository} from './lider.repository';

export class SubLiderRepository extends DefaultCrudRepository<
  SubLider,
  typeof SubLider.prototype.id,
  SubLiderRelations
> {

  public readonly lider: BelongsToAccessor<Lider, typeof SubLider.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LiderRepository') protected liderRepositoryGetter: Getter<LiderRepository>,
  ) {
    super(SubLider, dataSource);
    this.lider = this.createBelongsToAccessorFor('lider', liderRepositoryGetter,);
    this.registerInclusionResolver('lider', this.lider.inclusionResolver);
  }
}
