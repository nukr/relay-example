import React, { Component, PropTypes } from 'react'
import Menu from '../Menu'
import Login from '../Login'

export default class App extends Component {
  static propTypes = {
    viewer: PropTypes.object.isRequired
  }

  renderApp() {
    return (
      <div>
        <div>
        </div>
        <div style={{display: 'flex'}}>
          <div style={{flex: 1}}>
          </div>
          <div style={{flex: 3}}>
          <Menu viewer={this.props.viewer} />
          </div>
        </div>
      </div>
    )
  }

  render () {
    return this.props.viewer === null ? <Login /> : this.renderApp()
  }
}
