import React, { Component } from 'react'
import Relay from 'react-relay'
import App from './App'
import AppRoute from '../routes/AppRoute'

export default class Root extends Component {
  render () {
    return (
      <Relay.RootContainer
        Component={ App }
        route={ new AppRoute() }
      />
    )
  }
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://localhost:8000/graphql', {
    credentials: 'include'
  })
)

