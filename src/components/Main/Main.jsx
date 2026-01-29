import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, handleCardClick, clothingItems }) {
  return (
    <main className="main">
      <section className="weather">
        <WeatherCard weatherData={weatherData} />

        <section className="cards">
          <p className="cards__text">
            Today is {Math.round(weatherData.temp.F)} &deg; F / You may want to
            wear:
          </p>

          <ul className="cards__list">
            {clothingItems
              .filter((item) => item.weather === weatherData.type)
              .map((item) => (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              ))}
          </ul>
        </section>
      </section>
    </main>
  );
}

export default Main;
