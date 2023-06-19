import React, { useState, useEffect } from "react";
import { Typography, Button, Card, CardContent, Grid } from "@mui/material";
import "./BookLibrary.css";

const BookLibrary = () => {
  const [books, setBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);
  const [quoteContainerVisible, setQuoteContainerVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/books.json");
        const data = await response.json();
        setBooks(data.books);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchQuoteOfTheDay = async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        const quote = data[0];
        setQuoteOfTheDay(quote);
      } catch (error) {
        console.error("Error fetching quote of the day:", error);
        setQuoteOfTheDay(null);
      }
    };

    fetchQuoteOfTheDay();
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setSelectedBook(null);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedBook(null);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleGetQuote = () => {
    setQuoteContainerVisible(true);
  };

  const handleCloseQuote = () => {
    setQuoteContainerVisible(false);
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.genre.toLowerCase().includes(selectedGenre.toLowerCase()) &&
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div>
        <Typography className="book" variant="h2" gutterBottom>
          Book Library
        </Typography>
      </div>
      <div>
        <Typography className="genres" variant="h3" gutterBottom>
          Genres
        </Typography>
        <Button className={`button ${selectedGenre === "" ? "selected" : ""}`} variant="contained" onClick={() => handleGenreSelect("")}>
          All
        </Button>
        <Button className={`button ${selectedGenre === "Trending" ? "selected" : ""}`} variant="contained" onClick={() => handleGenreSelect("Trending")}>
          Trending
        </Button>
        <Button className={`button ${selectedGenre === "Classic" ? "selected" : ""}`} variant="contained" onClick={() => handleGenreSelect("Classic")}>
          Classic
        </Button>
        <Button className={`button ${selectedGenre === "Motivational" ? "selected" : ""}`} variant="contained" onClick={() => handleGenreSelect("Motivational")}>
          Motivational
        </Button>
        <Button className={`button ${selectedGenre === "Self-help" ? "selected" : ""}`} variant="contained" onClick={() => handleGenreSelect("Self-help")}>
          Self-help
        </Button>
        <Button className={`button ${selectedGenre === "Romantic" ? "selected" : ""}`} variant="contained" onClick={() => handleGenreSelect("Romantic")}>
          Romantic
        </Button>
        <Button className={`button ${selectedGenre === "Kids" ? "selected" : ""}`} variant="contained" onClick={() => handleGenreSelect("Kids")}>
          Kids
        </Button>
      </div>
      <div>
        <Typography className="bok" variant="h3" gutterBottom>
          Books
        </Typography>
        {filteredBooks.length === 0 ? (
          <Typography variant="body1">No books found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredBooks.map((book, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card onClick={() => handleBookClick(book)}>
                  <CardContent>
                    <Typography variant="h6" component="h4">
                      {book.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Author: {book.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Genre: {book.genre}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
      {selectedBook && (
        <div>
          <Typography variant="h3" gutterBottom>
            Selected Book:
          </Typography>
          <Typography variant="h6" component="h4">
            {selectedBook.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Author: {selectedBook.author}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Description: {selectedBook.description}
          </Typography>
        </div>
      )}
      <div className="quote-container">
        <Button className="quote-button" variant="contained" onClick={handleGetQuote}>
          Get Quote
        </Button>
        {quoteContainerVisible && quoteOfTheDay && (
          <Card className="quote-card">
            <CardContent>
              <Typography variant="h6" component="h4">
                Quote of the Day
              </Typography>
              <Typography variant="body1" className="quote-text">
                "{quoteOfTheDay.text}"
              </Typography>
              <Typography variant="body2" color="textSecondary" className="quote-author">
                Author: {quoteOfTheDay.author}
              </Typography>
              <Button className="quote-close-button" variant="outlined" onClick={handleCloseQuote}>
                Close
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default BookLibrary;
