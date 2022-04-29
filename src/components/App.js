import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import PopupWithForm from './PopupWithForm/PopupWithForm'
import ImagePopup from './ImagePopup/ImagePopup'

import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isDeletePopupOpen: false,
      selectedCard: {
        isOpen: false,
        link: '',
        name: '',
      },
    }
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true })
  }

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true })
  }

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true })
  }

  handleDeleteClick = () => {
    this.setState({ isDeletePopupOpen: true })
  }

  handleCardClick = (card) => {
    this.setState({
      selectedCard: {
        isOpen: true,
        link: card.link,
        name: card.name,
      },
    })
  }

  closeAllPopups = () => {
    this.setState({
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isDeletePopupOpen: false,
      selectedCard: {
        isOpen: false,
        link: '',
        name: '',
      },
    })
  }

  render() {
    return (
      <div className='page__container'>
        <Header />
        <Main
          onEditAvatar={this.handleEditAvatarClick}
          onEditProfile={this.handleEditProfileClick}
          onAddPlace={this.handleAddPlaceClick}
          onCardClick={this.handleCardClick}
          onDelete={this.handleDeleteClick}
        />
        <Footer />

        {/*  popups */}
        <PopupWithForm
          title={'Обновить аватар'}
          name={'avatar'}
          onClose={this.closeAllPopups}
          isOpen={this.state.isEditAvatarPopupOpen}>
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
          onClose={this.closeAllPopups}
          isOpen={this.state.isEditProfilePopupOpen}>
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
          onClose={this.closeAllPopups}
          isOpen={this.state.isAddPlacePopupOpen}>
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

        <PopupWithForm
          title={'Вы уверены?'}
          name={'delete'}
          onClose={this.closeAllPopups}
          isOpen={this.state.isDeletePopupOpen}></PopupWithForm>

        <ImagePopup name={'img'} onClose={this.closeAllPopups} card={this.state.selectedCard} />
      </div>
    )
  }
}

export default App
