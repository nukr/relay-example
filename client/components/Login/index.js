import Relay from 'react-relay'
import Login from './Login'

export default Relay.createContainer(Login, {
  fragments: {
    viewer: () => Relay.QL`
    fragment on User {
      username
    }
    `
  }
})
