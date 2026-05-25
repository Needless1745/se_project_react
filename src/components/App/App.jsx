//REACT imports
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

//Styling import
import "./App.css";

//Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { apiKey, coordinates } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { addItem, deleteItem, getItems } from "../../utils/api";
import { signin, signup, checkToken } from "../../utils/auth";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = (card) => {
    setSelectedCard(card);
  };

  const onAddItem = (inputValues) => {
    const token = localStorage.getItem("jwt");

    addItem(inputValues, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (item = selectedCard) => {
    const token = localStorage.getItem("jwt");
    const id = item?._id ?? item?.id;

    if (!id) {
      return;
    }
    deleteItem(id)
      .then(() => {
        setClothingItems(
          clothingItems.filter(
            (existingItem) => (existingItem._id ?? existingItem.id) !== id,
          ),
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    signup({ name, avatar, email, password })
      .then(() => {
        return handleLogin({ email, password });
      })
      .catch(console.error);
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLogin = ({ email, password }) => {
    return signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        closeActiveModal();
        return checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
        setCurrentUser(null);
      });
  };

  const loginModalSwitch = () => {
    setActiveModal("login");
  };

  const registerModalSwitch = () => {
    setActiveModal("register");
  };

  const closeActiveModal = () => setActiveModal("");

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        const normalizedItems = data
          .map((item) => ({
            ...item,
            imageUrl: item.imageUrl ?? item.link,
          }))
          .reverse();
        setClothingItems(normalizedItems);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            registerModalSwitch={registerModalSwitch}
          />
          <AddItemModal
            buttonText="Add garment"
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            loginModalSwitch={loginModalSwitch}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={handleDeleteItem}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
