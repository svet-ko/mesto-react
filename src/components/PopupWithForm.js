function PopupWithForm(props) {
    return(
      <section className={`popup popup_type_${props.name} ${(props.isOpen) ? 'popup_opened': ''}`}>
        <div className="popup__container">
          <button type="button" className="button popup__close-button" aria-label="Закрыть форму" onClick={props.onClose}></button>
          <h2 className="popup__heading">{props.heading}</h2>
          <form className={`form form_type_${props.formType}`} name={props.formName} noValidate>
            {props.children}
            <button type="submit" className="button form__submit-button" aria-label={props.ariaLabel}>{props.buttonTextContent}</button>
          </form>
        </div>
      </section>
    )
}

export default PopupWithForm;