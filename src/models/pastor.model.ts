import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Person} from './person.model';
import {Lider} from './lider.model';

@model()
export class Pastor extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  totalLideres: number;

  @belongsTo(() => Person)
  personId: string;

  @hasMany(() => Lider)
  liders: Lider[];

  constructor(data?: Partial<Pastor>) {
    super(data);
  }
}

export interface PastorRelations {
  // describe navigational properties here
}

export type PastorWithRelations = Pastor & PastorRelations;
