import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setcurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
    .then((res) => {
      setcurrentUser(res);
    })
    .catch((err) => {
        console.warn(err);
      })
}, []);

function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
}

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function fetchCardsInfo() {
      api.getInitialCards()
      .then((initialCards) => {
          setCards(initialCards);
      })
      .catch((err) => {
          console.warn(err);
        })
  }

  React.useEffect(() => {
      fetchCardsInfo();
  }, []); 

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.warn(err);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(
      setCards((state) => state.filter((c) => {
        return c._id !== card._id
      }))
    )
    .catch((err) => {
        console.warn(err);
      })
  }

  function handleUpdateUser({name, about}) {
    api.applyUserInfo({name, about})
    .then((res) => {
      setcurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.warn(err);
    })
  }

  function handleAvatarUpdate({avatar}) {
    api.updateUserAvatar(avatar)
    .then((res)=> {
      setcurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.warn(err);
    })
  }

  function handleAddPlace({name, link}) {
    api.sendCreatedCard({name, link})
    .then((res) => {
      setCards([res, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.warn(err);
    })
  }

  function checkInputValidity(e, isInputValid, setValidity, setValidityMessage, setFormValidity) {
    setValidity(e.target.validity.valid);
    if (isInputValid) {
      setValidityMessage('');
      setFormValidity(true);
    } else {
      setValidityMessage(e.target.validationMessage);
      setFormValidity(false);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            cards={cards}
            onCardClick={handleCardClick}
            onLikeClick={handleCardLike}
            onTrashClick={handleCardDelete}
          />
          <Footer />

          <EditProfilePopup 
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            checkInputValidity={checkInputValidity}
          /> 

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            checkInputValidity={checkInputValidity}
          />
          
          <PopupWithForm
            name="remove-confirm"
            heading="Вы уверены?"
            formType="remove-confirm"
            formName="remove"
            ariaLabel="Согласие"
            buttonText="Да"
          ></PopupWithForm>

          <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleAvatarUpdate}
            checkInputValidity={checkInputValidity}
          /> 

          <ImagePopup isOpen={isImagePopupOpen} selectedCard={selectedCard} onClose={closeAllPopups}/>
        </div>
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
