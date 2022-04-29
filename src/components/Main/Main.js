import React, { Component } from 'react'

import Card from '../Card/Card'
import api from '../../utils/api'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: '',
      userDescription: '',
      userAvatar: '',
      cards: [],
    }
  }

  componentDidMount() {
    Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
      .then(([resUser, resCard]) => {
        this.setState({
          userName: resUser.name,
          userDescription: resUser.about,
          userAvatar: resUser.avatar,
          cards: resCard,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <main className='main'>
        <section className='profile'>
          <div className='profile__avatar-wrap' onClick={this.props.onEditAvatar}>
            <img src={`${this.state.userAvatar}`} alt={`${this.state.userName}`} className='profile__avatar' />
          </div>
          <div className='profile__info'>
            <div className='profile__name'>
              <h1 className='profile__name-text'>{this.state.userName}</h1>
              <button
                type='button'
                className='profile__button-edit'
                aria-label='Редактировать'
                onClick={this.props.onEditProfile}></button>
            </div>
            <p className='profile__job'>{this.state.userDescription}</p>
          </div>
          <button
            type='button'
            className='profile__button-plus'
            aria-label='добавить'
            onClick={this.props.onAddPlace}></button>
        </section>

        <section className='elements'>
          {this.state.cards.map((card) => {
            return (
              <Card card={card} key={card._id} onCardClick={this.props.onCardClick} onDelete={this.props.onDelete} />
            )
          })}
        </section>
      </main>
    )
  }
}

export default Main
