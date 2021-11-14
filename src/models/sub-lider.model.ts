import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Lider} from './lider.model';

@model()
export class SubLider extends Entity {
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
    type: 'string',
    required: true,
  })
  totalGrupos: string;

  @belongsTo(() => Lider)
  liderId: string;

  constructor(data?: Partial<SubLider>) {
    super(data);
  }
}

export interface SubLiderRelations {
  // describe navigational properties here
}

export type SubLiderWithRelations = SubLider & SubLiderRelations;
