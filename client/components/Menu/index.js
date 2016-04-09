import Relay from 'react-relay'
import Menu from './Menu'

export default Relay.createContainer(Menu, {
  fragments: {
    viewer: () => Relay.QL`
    fragment on User {
      meals(first: 1000) {
        edges {
          node {
            id
            name
            price
          }
        }
      }
    }
    `
  }
})
