import Header from './Header/Header'
import Main from './Main/Main'
import Footer from './Footer/Footer'

import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      selectedCard: {
        isOpen: false,
        link: '123',
        name: '456',
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
          onClose={this.closeAllPopups}
          onCardClick={this.handleCardClick}
          isEditAvatarPopupOpen={this.state.isEditAvatarPopupOpen}
          isEditProfilePopupOpen={this.state.isEditProfilePopupOpen}
          isAddPlacePopupOpen={this.state.isAddPlacePopupOpen}
          card={this.state.selectedCard}
        />
        <Footer />
      </div>
    )
  }
}

export default App
