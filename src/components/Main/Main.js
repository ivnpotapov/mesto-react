import React, { Component } from 'react'
import PopupWithForm from '../PopupWithForm/PopupWithForm'
import ImagePopup from '../ImagePopup/ImagePopup'
import Card from '../Card/Card'
import api from '../../utils/api'

class Main extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userName: false,
      userDescription: false,
      userAvatar: false,
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
            return <Card card={card} key={card._id} onCardClick={this.props.onCardClick} />
          })}
        </section>

        {/*  popups */}
        <PopupWithForm
          title={'Обновить аватар'}
          name={'avatar'}
          onClose={this.props.onClose}
          isOpen={this.props.isEditAvatarPopupOpen}>
          <label className='popup__label-input'>
            <input
              type='url'
              className='popup__input'
              defaultValue=''
              name='avatar'
              placeholder='Ссылка на аватар'
              required
            />
            <span className='popup__error popup__avatar-error'></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          title={'Редактировать профиль'}
          name={'profile'}
          onClose={this.props.onClose}
          isOpen={this.props.isEditProfilePopupOpen}>
          <label className='popup__label-input'>
            <input
              type='text'
              className='popup__input'
              defaultValue=''
              name='username'
              minLength='2'
              maxLength='40'
              required
            />
            <span className='popup__error popup__username-error'></span>
          </label>
          <label className='popup__label-input'>
            <input
              type='text'
              className='popup__input'
              defaultValue=''
              name='about'
              minLength='2'
              maxLength='200'
              required
            />
            <span className='popup__error popup__about-error'></span>
          </label>
        </PopupWithForm>

        <PopupWithForm
          title={'Новое место'}
          name={'add'}
          onClose={this.props.onClose}
          isOpen={this.props.isAddPlacePopupOpen}>
          <label className='popup__label-input'>
            <input
              type='text'
              className='popup__input'
              defaultValue=''
              name='title'
              placeholder='Название'
              minLength='2'
              maxLength='30'
              required
            />
            <span className='popup__error popup__title-error'></span>
          </label>
          <label className='popup__label-input'>
            <input
              type='url'
              className='popup__input'
              defaultValue=''
              name='link'
              placeholder='Ссылка на картинку'
              required
            />
            <span className='popup__error popup__link-error'></span>
          </label>
        </PopupWithForm>

        <ImagePopup name={'img'} onClose={this.props.onClose} card={this.props.card} />

        <section className='popup popup_name_delete'>
          <div className='popup__container'>
            <button type='button' className='popup__close-icon' aria-label='Закрыть'></button>
            <h2 className='popup__title'>Вы уверены?</h2>
            <form className='popup__form' name='delete'>
              <button type='submit' className='popup__button' aria-label='Создать'>
                Да
              </button>
            </form>
          </div>
        </section>
      </main>
    )
  }
}

export default Main
