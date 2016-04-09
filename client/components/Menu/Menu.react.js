import React, { Component, PropTypes } from 'react'

export default class Menu extends Component {
  static propTypes = {
    viewer: PropTypes.object
  }

  renderMeals () {
    return this.props.viewer.meals.edges.map(({node: meal}) => (
            <div style={{flex: '1 1 100px'}} key={meal.id}>
            <div>{meal.name}</div>
            <div>{meal.price}</div>
            </div>
        )
    )
  }
  render () {
    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {this.renderMeals()}
      </div>
    )
  }
}

