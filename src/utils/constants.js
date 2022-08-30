const host = 'https://mesto.nomoreparties.co/v1/cohort-47';
const headers = {
  authorization: 'c90390ff-d2c8-4a08-89e0-57975fd0d0b1',
  'Content-Type': 'application/json'
};

const validationStates = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_visible'
}

const cardsContainer = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImageContainer = document.querySelector('.popup_type_photo');
const popupConfirm = document.querySelector('.popup_type_remove-confirm');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

const profileForm = popupEdit.querySelector('.form');
const nameInput = profileForm.querySelector('.form__input_type_name');
const aboutInput = profileForm.querySelector('.form__input_type_about');

const userEditButton = document.querySelector('.profile__edit-button');
const plusButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-overlay');

export {
        validationStates,
        cardsContainer,
        elementTemplate,
        popupAddPlace,
        popupEdit,
        popupImageContainer,
        popupConfirm,
        popupEditAvatar,
        userEditButton,
        plusButton,
        avatarEditButton,
        profileForm,
        nameInput,
        aboutInput,
        host,
        headers
      }
