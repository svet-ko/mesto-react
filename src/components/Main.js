import React from 'react';
import {api} from '../utils/Api'
import Card from './Card'

function Main(props) {
    const [userName, setUserName] = React.useState('User');
    const [userDescription, setUserDescription] = React.useState('About');
    const [userAvatar, setUserAvatar] = React.useState('#');
    const [cards, setCards] = React.useState([]);

    function fetchUserInfo() {
        api.getUserInfo()
        .then((res) => {
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
        })
        .catch((err) => {
            console.warn(err);
          })
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
        fetchUserInfo();
        fetchCardsInfo();
    }, []);

    return(
      <main className="main">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__avatar-container">
              <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя"/>
              <button type="button" className="button profile__avatar-overlay" aria-label="Изменить аватар" onClick={props.onEditAvatar}></button>
            </div>
            <div className="profile__info">
              <div className="profile__user">
                <h1 className="profile__user-name">{userName}</h1>
                <button type="button" className="button profile__edit-button" aria-label="Редактировать" onClick={props.onEditProfile}></button>
              </div>
              <p className="profile__user-about">{userDescription}</p>
            </div>
          </div>
          <button type="button" className="button profile__add-button" aria-label="Добавить картинку" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements" aria-label="Список картинок пользователя">
          <ul className="list elements__list">
            {
                cards.map((card) => (
                  <Card
                    key={card._id}
                    card={card}
                    image={card.link}
                    name={card.name}
                    likesCount={card.likes.length}
                    onCardClick={props.onCardClick}
                    />
                ))
            }
          </ul>
        </section>
      </main>
    )
}

export default Main;