import React from "react";
import { Link } from 'react-router-dom';
import PodcastDetail from "./PodcastDetail";

function PodcastCard(podcast) {
  let podcast_id = podcast.podcast.id.attributes['im:id'];
  return (
    <div>
      <Link to={`/podcast/${podcast_id}`} element={<PodcastDetail podcast={podcast}/>}>
        <h2>{podcast.podcast.title.label}</h2>
        <h3>{podcast.podcast["im:artist"].label}</h3>
      </Link>
    </div>
  );
}

export default PodcastCard;