function checkInputValidity(e, isInputValid, setValidity, setValidityMessage) {
    setValidity(e.target.validity.valid);
    if (isInputValid) {
      setValidityMessage('');
    } else {
      setValidityMessage(e.target.validationMessage);
    }
}

export {checkInputValidity}