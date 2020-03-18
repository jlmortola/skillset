import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { ensureSignedIn } from '../utils/auth'
console.log("ensureSignedIn", ensureSignedIn)

class Auth extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = function(...args) {
      const [, , context] = args
      
      ensureSignedIn(context.req)

      return resolve.apply(this, args)
    }
  }
}

export default Auth