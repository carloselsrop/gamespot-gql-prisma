import { BrandMutations, BrandQueries, BrandSubscriptions } from './brands'
import { UserMutations, UserQueries, UserSubscriptions } from './users'

export default {
  Query: {
    ...BrandQueries,
    ...UserQueries,
  },
  Mutation: {
    ...BrandMutations,
    ...UserMutations,
  },
  Subscription: {
    ...BrandSubscriptions,
    ...UserSubscriptions,
  },
}
