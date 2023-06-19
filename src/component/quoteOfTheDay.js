async function getQuoteOfTheDay() {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      const data = await response.json();
      const quote = data[0];
      return quote;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  export default async function displayQuoteOfTheDay() {
    const quote = await getQuoteOfTheDay();
    if (quote) {
      const quoteText = `"${quote.text}" - ${quote.author}`;
      window.alert(quoteText);
    } else {
      window.alert('Failed to fetch the quote of the day.');
    }
  }
  