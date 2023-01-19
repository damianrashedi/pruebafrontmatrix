import React from "react";
import { Link } from 'react-router-dom';
import PodcastDetail from "./PodcastDetail";

function PodcastCard(podcast) {
  let podcast_id = podcast.podcast.id.attributes['im:id'];
  return (
    <div className="col-3" style={{ paddingTop: '10rem' }} >
      <Link to={`/podcast/${podcast_id}`} element={<PodcastDetail podcast={podcast}/>} className="card text-center text-decoration-none p-2 shadow p-3 mb-5 bg-white rounded">
        <img className="card-img-top border rounded-circle w-50 mx-auto" style={{ position: 'absolute', top : -80, left: 75 }} src={podcast.podcast["im:image"][2].label} alt="Caratula del podcast"></img>
        <div className="card-body" style={{ paddingTop: '5rem' }}>
          <p className="text-dark text-uppercase"><strong>{podcast.podcast.title.label}</strong></p>
          <p className="text-muted">Author: {podcast.podcast["im:artist"].label}</p>
        </div>
      </Link>
    </div>
  );
}

export default PodcastCard;


