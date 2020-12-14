import React, { Component } from "react";
import Suggestions from "./Suggestions";
import MovieSearchResults from "./MovieSearchResults"
import { Button } from "react-bootstrap"

import "./App.css";


const API_URL = "http://127.0.0.1:8080/api/movie/"


class Search extends Component {
  state = {
    query: "",
    movieName: "",
    results: [],
    movies: [],
    defaultSuggestionValue: '',
    searchMovie: null
  };

  searchReasults = () => {
    fetch(`${API_URL}${this.state.query}/search`,{
      'Accept': 'application/json',
  'Content-Type': 'application/json'
    })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        const fetchedData = json;
        let suggestions = [];
        fetchedData.forEach(element => {
          suggestions.push(element.title);
        });
        this.setState({
          results: [...suggestions]
        });
      })
      .catch(function(ex) {
        console.log("parsing failed", ex);
      });
  };

  fetchReasults = () => {
    fetch(`${API_URL}${this.state.query}`,{
      'Accept': 'application/json',
  'Content-Type': 'application/json'
    })
      .then(function(response) {
        return response.json();
      })
      .then(json => {
        const fetchedData = json;
        this.setState({
          searchMovie: fetchedData
        });
      })
      .catch(function(ex) {
        console.log(ex);
      });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          this.searchReasults();
        }
      }
    );
  };

  handleClear  = () => {
    this.setState(
      {
        query:"",
        searchMovie: null  
      }
    )
  }

  handleFetch(query)  {
    this.fetchReasults(query)
  };

render() {
    
    return (
      <form>
        <div className="">
          <input
            className="searchbar"
            placeholder="Enter Movie Name"
            ref={input => (this.search = input)}
            onChange={this.handleInputChange}
            value={this.state.query}
            list="datalist"
          />
          <datalist id="datalist">
              <Suggestions results={this.state.results}/>
          </datalist>
          <Button className="btnSearch" onClick={e => this.handleFetch(this.state.query)}>Search</Button>
          <Button className="btnSearch" onClick={e => this.handleClear()}>Clear</Button>

          { (this.state.searchMovie) && 
            <div>
              <MovieSearchResults searchResult={this.state.searchMovie}/>
            </div>
          }

          
          </div>
      </form>
    );
  }
}



export default Search;
