import React from 'react';
import { fetchQueryResultsFromURL } from '../api';

const Preview = (props) => {

  const {
    setSearchResults,
    setFeaturedResult,
    setIsLoading,
    searchResults: {info,records}
  } = props;

  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  // const renderPreviewImage = (record) => {
  //   if (record.primaryimageurl) {
  //     return <img src={ record.primaryimageurl } alt={ record.description } />
  //   } 
  //     return;
  // }

  // const renderPreviewTitle = (record) => {
  //   if(record.title){
  //     return <h3>{ record.title }</h3>
  //   }else{
  //     return <h3>MISSING INFO</h3>
  //   }
  // };

  return (
  <aside id="preview">
    <header className="pagination">
      {
        <button 
        disabled={ !info.prev } 
        className="previous"
        onClick={()=>{fetchPage(info.prev)}}>Previous</button>
      }
      
      <button
        disabled={ !info.next }
        className="next"
        onClick={()=>{fetchPage(info.next)}}>Next</button>
    </header>
    <section className="results">
      {
        // Here we should map over the records, and render something like this for each one:
        records.map((record,index)=> 
          {return (
            <div  
              key={ index }
              className="object-preview"
              onClick={(event) => {
                // prevent the default
                event.preventDefault()
                // set the featured result to be this record, using setFeaturedResult
                setFeaturedResult(record)
              }}>
              
              {record.primaryimageurl ? <img src={ record.primaryimageurl } alt={ record.description } /> : null }
              {record.title ? <h3>{ record.title }</h3> : <h3>MISSING INFO</h3>}
            </div>
          )}
        )}
    </section>
  </aside>
  )
}

export default Preview;