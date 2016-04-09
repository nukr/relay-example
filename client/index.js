import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'

const rootNode = document.createElement('div')
document.body.appendChild(rootNode)

ReactDOM.render(<Root />, rootNode)
