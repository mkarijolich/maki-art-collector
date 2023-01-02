import React, { useState } from 'react';
import ReactDOM from 'react-dom';


import {
  Feature,
  Loading,
  Preview,
  Search,
  Title
} from './components';

const App = () => {

  const [searchResults,setSearchResults] = useState( {info:{}, records:[]} );
  const [featuredResult,setFeaturedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(featuredResult)

  return <div className="app">
    <Title />
    <Search setIsLoading={setIsLoading} setSearchResults={setSearchResults} setFeaturedResult={setFeaturedResult}/>
    <Preview searchResults={searchResults} setIsLoading={setIsLoading} setSearchResults={setSearchResults} setFeaturedResult={setFeaturedResult} />
    <Feature featuredResult={featuredResult} setIsLoading={setIsLoading} setSearchResults={setSearchResults}/>
    
    {
      isLoading ? <Loading /> : null
    }
  </div>
}


 ReactDOM.render(
   <App />,
   document.getElementById('app')
 )
