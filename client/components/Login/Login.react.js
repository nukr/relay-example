import React, { Component, PropTypes } from 'react'
import fetch from 'isomorphic-fetch'

export default class Login extends Component {
  constructor () {
    super()
    this.state = {
      sent: false,
      username: '',
      password: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    let username = this.refs.username.value
    let password = this.refs.password.value

    this.setState({
      sent: true,
      username,
      password
    })
    // trying logging in
    fetch('http://localhost:8000/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ username, password })
    }).then((response) => {
      return response.text()
    }).then((data) => {
      console.log(data)
      if (data === 'hihihi') {
        this.props.login()
      }
    })
  }

  render () {
    return (
      <div>
      <div>Login</div>
      <div><label>Username</label><input ref='username' type='text' defaultValue='abc' /></div>
      <div><label>Password</label><input ref='password' type='password' defaultValue='gggg' /></div>
      <div><button onClick={this.handleClick}>submit</button></div>
      <div>{this.state.sent && 'Sent'}</div>
      <div>{this.state.username}</div>
      <div>{this.state.password}</div>
      </div>
    )
  }
}
