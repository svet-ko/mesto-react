function PopupWithForm({name, heading, formType, formName, ariaLabel, buttonText, isOpen, onClose, children}) {
    return(
      <section className={`popup popup_type_${name} ${(isOpen) ? 'popup_opened': ''}`}>
        <div className="popup__container">
          <button type="button" className="button popup__close-button" aria-label="Закрыть форму" onClick={onClose}></button>
          <h2 className="popup__heading">{heading}</h2>
          <form className={`form form_type_${formType}`} name={formName}>
            {children}
            <button type="submit" className="button form__submit-button" aria-label={ariaLabel}>{buttonText}</button>
          </form>
        </div>
      </section>
    )
}

export default PopupWithForm;