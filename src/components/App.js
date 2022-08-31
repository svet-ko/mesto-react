import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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

  return (
    <div className="page">
      <div className="content">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer />

        <PopupWithForm 
          name="edit"
          heading="Редактировать профиль"
          formType="edit"
          formName="form-edit"
          ariaLabel="Сохранить изменения"
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
              <fieldset className="form__set">
                <label className="form__field">
                  <input
                    type="text"
                    className="form__input form__input_type_name"
                    id="name" name="name"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    required
                  />
                  <span className="form__input-error form__input-error_type_name"></span>
                </label>
                <label className="form__field">
                  <input
                    type="text"
                    className="form__input form__input_type_about"
                    id="about" name="about"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    required
                  />
                  <span className="form__input-error form__input-error_type_about"></span>
                </label>
              </fieldset>
        </PopupWithForm>

        <PopupWithForm
          name="add-place"
          heading="Новое место"
          formType="place"
          formName="place"
          ariaLabel="Создать новое место"
          buttonTextContent="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="form__set">
            <label className="form__field">
                <input
                type="text"
                className="form__input form__input_type_place"
                id="place" name="place"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                />
                <span className="form__input-error form__input-error_type_place"></span>
            </label>
            <label className="form__field">
                <input
                type="url"
                className="form__input form__input_type_url"
                id="url"
                name="url"
                placeholder="Ссылка на картинку"
                required
                />
                <span className="form__input-error form__input-error_type_url"></span>
            </label>
          </fieldset>
        </PopupWithForm>
        
        <PopupWithForm
          name="remove-confirm"
          heading="Вы уверены?"
          formType="remove-confirm"
          formName="remove"
          ariaLabel="Согласие"
          buttonTextContent="Да"
        ></PopupWithForm>

        <PopupWithForm
          name="edit-avatar"
          heading="Обновить аватар"
          formType="edit"
          formName="edit"
          ariaLabel="Сохранить изменения"
          buttonTextContent="Сохранить"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <fieldset className="form__set">
            <label className="form__field">
              <input
                type="url"
                className="form__input form__input_type_url"
                id="url-avatar"
                name="avatar"
                placeholder="Ссылка на новый аватар"
                required
              />
              <span className="form__input-error form__input-error_type_url-avatar"></span>
            </label>
          </fieldset>
        </PopupWithForm>

        <ImagePopup isOpen={isImagePopupOpen} selectedCard={selectedCard} onClose={closeAllPopups}/>
      </div>
    </div>
  );
}

export default App;
