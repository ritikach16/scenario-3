import React, { useState, useEffect } from "react";
import axios from "../Axios/axios";
import "./Row.css";
import Youtube from "react-youtube";
import { useNavigate } from "react-router-dom";

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // Options for react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

   const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      const data = await request.data.results; // added by me +
      
      setMovies(data);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
       
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=fb34530271b349314af0de263d16ab5a`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

  const handleData = async (content) => {
    navigate('/detail', {state: {isLargeRow : isLargeRow, data: movies, title: title}})
  }

  return (
    <div className="row">
      <div style={{"display" : "flex", "justifyContent" : "space-between"}}>
      <h2>{title}</h2>
      <span style={{"textDecoration":"none", "color": "white", "marginRight": "20px", "cursor":"pointer"}} onClick = {handleData}>See more</span>
      </div>
      <div className="row_posters">
        {movies.slice(10).map(
          (movie) =>
            movie.backdrop_path !== null && (
              <img
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                src={`${baseImgUrl}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                key={movie.id}
                onClick={() => handleClick(movie)}
              />
            )
        )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
