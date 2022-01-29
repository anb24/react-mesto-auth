import React from "react";
import {useState, useEffect} from "react";
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import api from "../utils/api";
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupImage from "./PopupImage";
import PopupAddCard from "./PopupAddCard";
import PopupEditAvatar from "./PopupEditAvatar";
import PopupEditProfile from "./PopupEditProfile";
import PopupDeleteCard from "./PopupDeleteCard";
import {userContext} from "../contexts/CurrentUserContext.js";
import {Spinner} from "./Spinner.js"

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({});
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [cardId, setCardId] = React.useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
    const history = useHistory();

    useEffect(() => {
        tokenCheck();
    }, [loggedIn]);
    useEffect(() => {
        api
            .getUserInfo()
            .then((currentUserData) => {
                setCurrentUser(currentUserData);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        setIsLoading(true);
        api
            .getCards()
            .then((cards) => {
                setCards(cards);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }
    function handleAddCardClick() {
        setAddPlacePopupOpen(true);
    }
    function handleCardClick(card) {
        setSelectedCard(card);
    }
    function handleDeleteCardClick(card) {
        setDeletePopupOpen(true);
        setCardId(card._id);
    }
    //закрытие попапов
    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({});
        setDeletePopupOpen(false);
    }
    // function closePopupsEsc(e) {
    //     if (e.keyCode === 27) {
    //         closeAllPopups()
    //     }
    // }

    function tokenCheck() {

    }

    function handleLogin({email, password}) {

    }

    function handleRegister() {

    }

    function handleUpdateUser(data) {
        api
            .setUser(data)
            .then((currentUserData) => {
                setCurrentUser(currentUserData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(data) {
        api
            .setAvatar(data)
            .then((currentUserData) => {
                setCurrentUser(currentUserData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleAddPlaceSubmit(data) {
        api
            .setNewCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api
            .changeCardLike(card._id, isLiked)
            .then((newCardSomeLike) => {
                setCards((state) => state.map((c) => (c._id === card._id ? newCardSomeLike : c)));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api
            .deleteCard(cardId)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== cardId));
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return isLoading ? (<Spinner/>) : (
        <userContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header
                        loggedIn={loggedIn}
                        userData={userData}
                    />
                    <Switch>
                        <ProtectedRoute
                            exact path="/"

                        />
                        <Route path="/sign-in">
                            <Login
                                name="login"
                                onLogin={handleLogin}
                            />
                        </Route>
                        <Route path="/sign-up">
                            <Register

                            />
                        </Route>
                        <Route>
                            {loggedIn ? <Redirect to="/"/> : <Redirect to="/sign-in"/>}
                        </Route>
                    </Switch>
                    <Main
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddCardClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteCardClick}
                    />
                    <Footer/>
                    <PopupEditProfile
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />
                    <PopupAddCard
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />
                    <PopupEditAvatar
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />
                    <PopupImage
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                    <PopupDeleteCard
                        isOpen={isDeletePopupOpen}
                        onClose={closeAllPopups}
                        onDeleteCard={handleCardDelete}
                    />
                    <InfoTooltip

                    />
                </div>
            </div>
        </userContext.Provider>
    );
}

export default App;
