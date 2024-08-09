import { registerDecorator, ValidationOptions } from "class-validator"
import { IsUniqueConstraint } from "./is-unique.constraint"

export type IsUniqueInterface = {
  tableName: string,
  column: string
}

export function IsUnique(options: IsUniqueInterface, validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
      registerDecorator({
          name: 'IsUnique',
          target: object.constructor,
          propertyName: propertyName,
          options: validationOptions,
          constraints: [options],
          validator: IsUniqueConstraint,
      })
  }
}