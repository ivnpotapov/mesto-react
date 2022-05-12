import React, { Component } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import PopupWithForm from './PopupWithForm/PopupWithForm';
import ImagePopup from './ImagePopup/ImagePopup';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      currentUser: {},
      isEditAvatarPopupOpen: false,
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isDeletePopupOpen: false,
      selectedCard: {
        isOpen: false,
        link: '',
        name: '',
      },
    };
  }

  componentDidMount() {
    Promise.all([api.getUserInfoApi(), api.getInitialCardsApi()])
      .then(([resUser, resCard]) => {
        this.setState({
          currentUser: resUser,
          cards: resCard,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleEditAvatarClick = () => {
    this.setState({ isEditAvatarPopupOpen: true });
  };

  handleEditProfileClick = () => {
    this.setState({ isEditProfilePopupOpen: true });
  };

  handleAddPlaceClick = () => {
    this.setState({ isAddPlacePopupOpen: true });
  };

  handleDeleteClick = () => {
    this.setState({ isDeletePopupOpen: true });
  };

  handleUpdateUser = (inputsValue) => {
    api
      .setUserInfoApi(inputsValue)
      .then((res) => {
        this.setState({
          currentUser: res,
        });
      })
      .then(() => {
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleUpdateAvatar = (inputsValue) => {
    api
      .setAvatarApi(inputsValue)
      .then((res) => {
        this.setState({
          currentUser: res,
        });
      })
      .then(() => {
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddPlace = (inputsValue) => {
    api
      .addNewCardApi(inputsValue)
      .then((res) => {
        this.setState({
          cards: [res, ...this.state.cards],
        });
      })
      .then(() => {
        this.closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardLike = (card) => {
    const isLiked = card.likes.some(
      (like) => like._id === this.state.currentUser._id,
    );
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const stateWithNewCard = this.state.cards.map((stateCard) =>
          stateCard._id === card._id ? newCard : stateCard,
        );
        this.setState({
          cards: stateWithNewCard,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardDelete = (card) => {
    api
      .deleteCardApi(card._id)
      .then((res) => {
        const stateWithoutCard = this.state.cards.filter((stateCard) => {
          return !(stateCard._id === card._id);
        });
        this.setState({
          cards: stateWithoutCard,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCardClick = (card) => {
    this.setState({
      selectedCard: {
        isOpen: true,
        link: card.link,
        name: card.name,
      },
    });
  };

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
    });
  };

  render() {
    return (
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <div className='page__container'>
          <Header />
          <Main
            cards={this.state.cards}
            onCardLike={this.handleCardLike}
            onCardDelete={this.handleCardDelete}
            onEditAvatar={this.handleEditAvatarClick}
            onEditProfile={this.handleEditProfileClick}
            onAddPlace={this.handleAddPlaceClick}
            onCardClick={this.handleCardClick}
            onDelete={this.handleDeleteClick}
          />
          <Footer />

          {/*  popups */}
          <EditAvatarPopup
            isOpen={this.state.isEditAvatarPopupOpen}
            onClose={this.closeAllPopups}
            onUpdateAvatar={this.handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={this.state.isEditProfilePopupOpen}
            onClose={this.closeAllPopups}
            onUpdateUser={this.handleUpdateUser}
          />

          <AddPlacePopup
            onClose={this.closeAllPopups}
            isOpen={this.state.isAddPlacePopupOpen}
            onAddPlace={this.handleAddPlace}
          />

          <PopupWithForm
            title={'Вы уверены?'}
            name={'delete'}
            onClose={this.closeAllPopups}
            isOpen={this.state.isDeletePopupOpen}></PopupWithForm>

          <ImagePopup
            name={'img'}
            onClose={this.closeAllPopups}
            card={this.state.selectedCard}
          />
        </div>
      </CurrentUserContext.Provider>
    );
  }
}

export default App;
