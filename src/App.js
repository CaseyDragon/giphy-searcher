import './App.css';
import SearchForm from './Components/SearchForm';
import SearchResults from './Components/SearchResults';
import {useEffect, useState} from 'react';
import SearchHeader from './Components/SearchHeader'

function App() {
  const searchOptions = {
    key: process.env.REACT_APP_GIPHY_KEY,
    limit: 25,
    rating: 'G',
    api: 'https://api.giphy.com/v1/gifs',
    endpoint: '/search'
  };

  const [images, setImages] = useState([]);
  
  useEffect(() => {
    getImages(searchString);
  }, []);

const [searchString, setSearchString] = useState('');
const [lastSearch, setLastSearch] = useState('');
function handleChange(event) {
  setSearchString(event.target.value);
}


function getImages(searchString) {
    const url = `${searchOptions.api}${searchOptions.endpoint}?api_key=${searchOptions.key}&q=${searchString} &limit=${searchOptions.limit}&offset=${searchOptions.offset}&rating=${searchOptions.rating}&lang=en`;
  
    fetch(url)
      .then(response => response.json())
      .then(response => {
        setImages(response.data);
        setLastSearch(searchString);
        setSearchString('');
      })
      .catch(console.error);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getImages(searchString);
  }

  return (
   <div>
    <h1>Giphy Searcher</h1>
    <SearchForm   handleChange={handleChange} handleSubmit={handleSubmit} searchString={searchString}/>
    <SearchResults images={images}/>
    <SearchHeader lastSearch={lastSearch} />

   </div>
  );
}

export default App;
