import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  checkInputValidity
}){

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const [isNameInputValid, setIsNameInputValid] = React.useState(false);
  const [nameChangeValidationMessage, setNameChangeValidationMessage] = React.useState('');

  const [isLinkInputValid, setIsLinkInputValid] = React.useState(false);
  const [linkChangeValidationMessage, setLinkChangeValidationMessage] = React.useState('');

  const [isFormValid, setIsFormValid] = React.useState(false);

  function onNameChange(e) {
    setName(e.target.value);
    checkInputValidity(e, isNameInputValid, setIsNameInputValid, setNameChangeValidationMessage, setIsFormValid);
  }

  function onLinkChange(e) {
    setLink(e.target.value);
    checkInputValidity(e, isLinkInputValid, setIsLinkInputValid, setLinkChangeValidationMessage, setIsFormValid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
  }

  return(
    <PopupWithForm
      name="add-place"
      heading="Новое место"
      formType="place"
      formName="place"
      ariaLabel="Создать новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <fieldset className="form__set">
        <label className="form__field">
          <input
            type="text"
            className="form__input form__input_type_place"
            onChange={onNameChange}
            id="place" name="place"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className={`form__input-error ${isNameInputValid ? '' : 'form__input-error_visible'}`}>{nameChangeValidationMessage}</span>
        </label>
        <label className="form__field">
          <input
            type="url"
            className="form__input form__input_type_url"
            onChange={onLinkChange}
            id="url"
            name="url"
            placeholder="Ссылка на картинку"
            required
          />
          <span className={`form__input-error ${isLinkInputValid ? '' : 'form__input-error_visible'}`}>{linkChangeValidationMessage}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;