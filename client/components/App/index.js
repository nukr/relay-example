import Relay from 'react-relay'
import App from './App'
import Menu from '../Menu'
import Login from '../Login'

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
    fragment on User {
      ${Menu.getFragment('viewer')}
      ${Login.getFragment('viewer')}
    }
    `
  }
})
