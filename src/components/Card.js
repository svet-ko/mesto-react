function Card({card, image, name, likesCount, onCardClick}){
    return(
        <li className="element">
          <button type="button" className="button element__delete-button"/>
          <img src={image} alt={name} className="element__image" onClick={() => onCardClick(card)}/>
          <div className="element__content">
            <h2 className="element__name">{name}</h2>
            <div className="element__like">
              <button type="button" className="button element__like-button" aria-label="Поставить оценку нравится"></button>
              <p className="element__like-counter">{likesCount}</p>
            </div>
          </div>
        </li>
    )
}

export default Card;