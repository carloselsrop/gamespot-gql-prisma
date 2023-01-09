import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

export default {
  createdBrand: {
    subscribe: () => pubsub.asyncIterator(['CREATED_BRAND']),
  },
}
