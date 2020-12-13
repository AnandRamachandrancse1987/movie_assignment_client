import React from 'react'
import "./App.css";

const MovieSearchResults = (props) => {
  
  const imdbLink = "https://www.imdb.com/title/tt0"
  const tmdbLink = "https://www.themoviedb.org/movie/"

  const thStyle = { border: '1px solid black'}
  const trHead = {backgroundColor: 'yellow'}
  const trBody = {backgroundColor: 'white'}
  const trStyle = { border: '1px solid black'}
  const options = (
    <table className="movieTable"> 
      <tr style={trHead}>
        <th style={thStyle}>MovieId</th> 
        <th style={thStyle}>Title</th>
        <th style={thStyle}>Genres</th>
        <th style={thStyle}>Links</th>
        <th style={thStyle}>Average Ratings</th>
        <th style={thStyle}>Tags</th> 
      </tr>
      <tr style={trBody}>
        <td style={trStyle}>{props.searchResult.movie.movieid}</td>
        <td style={trStyle}>{props.searchResult.movie.title}</td>
        <td style={trStyle}>{props.searchResult.movie.genres}</td>
        <td style={trStyle}>
          IMDB: {imdbLink}{props.searchResult.imdbLink}<br/>
          TMDB: {tmdbLink}{props.searchResult.tmdbLink}
        </td>
        <td style={trStyle}>{props.searchResult.avgRatings}</td>
        <td style={trStyle}>
          {props.searchResult.tags.map((i) =>
            <span>
            {i} <br/>
            </span>
          )
          }
        </td>
      </tr>

    </table>
    
  )
  return options
}

export default MovieSearchResults