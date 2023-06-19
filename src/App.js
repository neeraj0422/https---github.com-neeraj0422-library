import React from "react";
import backgroundImage from './seven-shooter-hPKTYwJ4FUo-unsplash.jpg';
import BookLibrary from "./component/BookLibrary";
import displayQuoteOfTheDay from "./component/quoteOfTheDay";

const App = () => {
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    height: '100vh', // Set the height to fill the viewport vertically
  };

  const handleGetQuote = () => {
    displayQuoteOfTheDay();
  };

  return (
    <div style={appStyle}>
      <BookLibrary />
    </div>
  );
};

export default App;
