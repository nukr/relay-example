import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

import {
  nodeDefinitions,
  fromGlobalId,
  globalIdField,
  connectionDefinitions,
  connectionFromArray,
  connectionArgs
} from 'graphql-relay'

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId) => {
    let {type, id} = fromGlobalId(globalId)
    if (type === 'Meal') {
      return require('../utils/r').default.db('taipei_steak').table('meals').get(id)
    }
    return null
  },
  () => {}
)

const mealType = new GraphQLObjectType({
  name: 'Meal',
  description: 'A meal that want to be ordered',
  fields: () => ({
    id: globalIdField('Meal'),
    name: {
      type: GraphQLString
    },
    price: {
      type: GraphQLInt
    },
    category: {
      type: GraphQLString
    },
    remark: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString
    },
    updatedAt: {
      type: GraphQLString
    }
  }),
  interfaces: [nodeInterface]
})

const { connectionType: mealConnection } = connectionDefinitions({ name: 'Meal', nodeType: mealType })

const userType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    meals: {
      type: mealConnection,
      args: connectionArgs,
      resolve: async (_, args, { rootValue: { r } }) => {
        return connectionFromArray(await r.db('taipei_steak').table('meals'), args)
      }
    },
    username: {
      type: GraphQLString
    }
  })
})

const rootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'The root query',
  fields: () => ({
    node: nodeField,
    viewer: {
      type: userType,
      resolve: async (_, args, { rootValue: { credentials, redis } }) => {
        console.log('credentials', credentials)
        if (credentials) {
          return 'gggggg'
        } else {
          return null
        }
      }
    }
  })
})

export default new GraphQLSchema({
  query: rootQuery
})

