import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser,
    checkInputValidity
}){
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [isNameInputValid, setIsNameInputValid] = React.useState(false);
  const [nameChangeValidationMessage, setNameChangeValidationMessage] = React.useState('');

  const [isAboutInputValid, setIsAboutInputValid] = React.useState(false);
  const [aboutChangeValidationMessage, setAboutChangeValidationMessage] = React.useState('');

  const [isFormValid, setIsFormValid] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]); 

  function onNameChange(e) {
    setName(e.target.value);
    checkInputValidity(e, isNameInputValid, setIsNameInputValid, setNameChangeValidationMessage, setIsFormValid);
  }

  function onDescriptionChange(e) {
    setDescription(e.target.value);
    checkInputValidity(e, isAboutInputValid, setIsAboutInputValid, setAboutChangeValidationMessage, setIsFormValid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return(
    <PopupWithForm 
      name="edit"
      heading="Редактировать профиль"
      formType="edit"
      formName="form-edit"
      ariaLabel="Сохранить изменения"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
        <fieldset className="form__set">
          <label className="form__field">
            <input
              type="text"
              className="form__input form__input_type_name"
              onChange={onNameChange}
              value={name || ''}
              id="name" name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className={`form__input-error ${isNameInputValid ? '' : 'form__input-error_visible'}`}>{nameChangeValidationMessage}</span>
          </label>
          <label className="form__field">
            <input
              type="text"
              className="form__input form__input_type_about"
              value={description || ''}
              onChange={onDescriptionChange}
              id="about" name="about"
              placeholder="О себе"
              minLength="2"
              maxLength="200"
              required
            />
            <span className={`form__input-error ${isAboutInputValid ? '' : 'form__input-error_visible'}`}>{aboutChangeValidationMessage}</span>
          </label>
        </fieldset>
  </PopupWithForm>
  )
}

export default EditProfilePopup;