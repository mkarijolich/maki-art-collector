import React, { Fragment } from 'react';
import { fetchQueryResultsFromTermAndValue } from '../api';

const Searchable = (props) => {

    const {
        searchTerm,
        searchValue,
        setIsLoading,
        setSearchResults
    } = props;


    return (
        <span className="content">
            <a href="#" onClick={
                async (event) => {
                    event.preventDefault();
                    setIsLoading(true);
                    try {
                        const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue)
                        setSearchResults(results);
                        
                    }
                    catch (error) {
                        console.log(error);
                    }
                    finally {
                        setIsLoading(false);
                    }
                }}>{searchValue}</a>
        </span>

    )
}


const Feature = (props) => {

    const { featuredResult, searchTerm } = props;

    if (!featuredResult) {
        return <main id="feature"></main>
    }
    else {

        const {
            title, dated, images, primaryimageurl, description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline
        } = featuredResult;

        return (
            <main id="feature">
                <div className="object-feature">
                    <header>
                        <h3>{title}</h3>
                        <h4>{dated}</h4>
                    </header>
                    <section className="facts">
                        {description ?
                            <Fragment>
                                <span className="title">Description</span>
                                <span className="content">{description}</span>
                            </Fragment>
                            : ''}
                        {culture ?
                            <Fragment>
                                <span className="title">Culture</span>
                                <Searchable searchTerm='culture' searchValue={culture} {...props} />
                            </Fragment>
                            : ''}
                        {style ?
                            <Fragment>
                                <span className="title">Style</span>
                                <span className="content">{style}</span>
                            </Fragment>
                            : ''}
                        {technique ?
                            <Fragment>
                                <span className="title">Technique</span>
                                <Searchable searchTerm='technique' searchValue={technique} {...props} />
                            </Fragment>
                            : ''}
                        {medium ?
                            <Fragment>
                                <span className="title">Medium</span>
                                <Searchable searchTerm='medium' searchValue={medium} {...props} />
                            </Fragment>
                            : ''}
                        {dimensions ?
                            <Fragment>
                                <span className="title">Dimensions</span>
                                <span className="content">{dimensions}</span>
                            </Fragment>
                            : ''}
                        {
                            people ?
                                people.map(person =>
                                    <Fragment>
                                        <span className="title">Person</span>
                                        <Searchable searchTerm="person" searchValue={person.displayname} {...props} />
                                    </Fragment>
                                )
                                : null
                        }

                        {department ?
                            <Fragment>
                                <span className="title">Department</span>
                                <span className="content">{department}</span>
                            </Fragment>
                            : ''}
                        {division ?
                            <Fragment>
                                <span className="title">Division</span>
                                <span className="content">{division}</span>
                            </Fragment>
                            : ''}
                        {contact ?
                            <Fragment>
                                <span className="title">Contact</span>
                                <span className="content"><a href={contact}>{contact}</a></span>
                            </Fragment>
                            : ''}
                        {creditline ?
                            <Fragment>
                                <span className="title">Creditline</span>
                                <span className="content">{creditline}</span>
                            </Fragment>
                            : ''}
                    </section>
                    <section className="photos">
                {
                    images ?
                    images.map((image) => {
                    return <img key={image.baseimageurl} src={image.baseimageurl} alt={image.baseimageurl}/>
                })
                    : primaryimageurl ? <img src={primaryimageurl} alt={primaryimageurl }/> : null
                        }

                    </section>
                </div>
            </main>
        )
    }





}


export default Feature;