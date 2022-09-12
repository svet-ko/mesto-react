import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  checkInputValidity
}){
  const avatar = useRef();
  const [isInputValid, setIsInputValid] = React.useState(false);
  const [avatarChangeValidationMessage, setAvatarChangeValidationMessage] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  function onInputChange(e) {
    checkInputValidity(e, isInputValid, setIsInputValid, setAvatarChangeValidationMessage, setIsFormValid);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  React.useEffect(() => {
    if (!isOpen) {
      avatar.current.value = '';
      setAvatarChangeValidationMessage('');
      setIsFormValid(false);
    }
}, [isOpen]);

  return(
    <PopupWithForm
      name="edit-avatar"
      heading="Обновить аватар"
      formType="edit"
      formName="edit"
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
            type="url"
            className="form__input form__input_type_url"
            ref={avatar}
            onChange={onInputChange}
            id="url-avatar"
            name="avatar"
            placeholder="Ссылка на новый аватар"
            required
          />
          <span className={`form__input-error ${isInputValid ? '' : 'form__input-error_visible'}`}>{avatarChangeValidationMessage}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;