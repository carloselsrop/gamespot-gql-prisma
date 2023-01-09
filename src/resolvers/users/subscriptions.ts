import { PubSub } from 'graphql-subscriptions'

const pubsub = new PubSub()

export default {
  createdUser: {
    subscribe: () => pubsub.asyncIterator(['CREATED_BRAND']),
  },
}
