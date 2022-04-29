import React, { Component } from 'react'

class Card extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.props.onCardClick(this.props.card)
  }

  render() {
    return (
      <article className='element' onClick={this.handleClick}>
        <img className='element__image' src={this.props.card.link} alt={this.props.card.name} />
        <button type='button' className='element__trash' aria-label='Удалить'></button>
        <div className='element__caption-area'>
          <h2 className='element__name'>{this.props.card.name}</h2>
          <div className='element__likes'>
            <button type='button' className='element__button-like' aria-label='лайк'></button>
            <span className='element__like-counter'> {this.props.card.likes.length}</span>
          </div>
        </div>
      </article>
    )
  }
}

export default Card
