import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Pastor} from './pastor.model';
import {SubLider} from './sub-lider.model';

@model()
export class Lider extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  grupo: string;

  @property({
    type: 'number',
    required: true,
  })
  totalGrupos: number;

  @property({
    type: 'number',
    required: true,
  })
  totalSublider: number;

  @belongsTo(() => Pastor)
  pastorId: string;

  @hasMany(() => SubLider)
  subLiders: SubLider[];

  constructor(data?: Partial<Lider>) {
    super(data);
  }
}

export interface LiderRelations {
  // describe navigational properties here
}

export type LiderWithRelations = Lider & LiderRelations;
