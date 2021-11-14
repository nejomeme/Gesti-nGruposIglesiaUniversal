import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pastor} from './pastor.model';

@model()
export class Person extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_documento: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type:  'string',
    required: true,
  })
  rol: string;

  @property({
    type: 'string',
    required: true,
  })
  grupo: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    default:"",
  })
  email?: string;

  @property({
    type: 'string',
    default:"",
  })
  foto?: string;

  @hasMany(() => Pastor)
  pastors: Pastor[];

  constructor(data?: Partial<Person>) {
    super(data);
  }
}

export interface PersonRelations {
  // describe navigational properties here
}

export type PersonWithRelations = Person & PersonRelations;
