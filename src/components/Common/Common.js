import React, { useState, useEffect } from "react";
import axios from "../Axios/axios";
import "./Common.css";
import Youtube from "react-youtube";
import {useLocation} from 'react-router-dom';
   
const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Common() {
  const [trailerUrl, setTrailerUrl] = useState("");
  const location = useLocation();
  // Options for react-youtube
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };


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

  return (
      <>

    <div className="row">

      <h2>{location.state.title}</h2>
  
      <div className="common_posters">
        {location.state.data.map(
            (movie) =>
            movie.backdrop_path !== null && (
                <div>
              <img
                className={`row_poster ${location.state.isLargeRow && "row_posterLarge"}`}
                src={`${baseImgUrl}${
                    location.state.isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                key={movie.id}
                onClick={() => handleClick(movie)}
                />
              </div>
            )
            )}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
    </>
  );
}

export default Common;
