import React, { Component } from "react";

import PodcastGrid from "./PodcastGrid";
import PodcastDetail from "./PodcastDetail";
import EpisodeDetail from "./PodcastDetail";

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
			is_loading: false,
			podcasts: [],
			fetch_expiration: 86400,
			podcast_url: "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json",
			podcast_detail_url: "https://itunes.apple.com/lookup?id="
		};

	 }

	 componentDidMount(){
		this.fetchPodcasts();
	 }

	fetchPodcasts() {
		this.setState({
    		is_loading: true
    	});

		let now = Date.now();
        let elapsedTime = now - localStorage.getItem("last_podcast_fetch_timestamp");

    	if (elapsedTime > this.state.fetch_expiration) {
	        fetch(this.state.podcast_url)
			.then((response) => response.json())
			.then((json_response) => {

				this.setState({
		    		podcasts: json_response.feed.entry
		    	});

				localStorage.setItem("podcast_list", JSON.stringify(json_response.feed.entry));
				localStorage.setItem("last_podcast_fetch_timestamp", JSON.stringify(Date.now()));

				this.setState({
		    		is_loading: false
		    	});
			});

			setTimeout(() => this.fetchPodcasts(), (this.state.fetch_expiration + 1) * 1000)
	    }else{
	    	this.setState({
	    		podcasts: JSON.parse(localStorage.getItem("podcast_list"))
	    	});
	    }

		this.setState({
    		is_loading: false
    	});
	};

  render() {

	return (
		<div className="container">
			<BrowserRouter>
				<div className="row mt-5">
					<div className="col-10">
						<h1><Link to="/" className="text-decoration-none">Podcaster</Link></h1>
					</div>
					<div className="col-2">
						{this.state.is_loading && 
							<div className="text-end">
							  <div className="spinner-border" role="status">
							    <span className="sr-only"></span>
							  </div>
						  </div>
						  }
					</div>
					<hr></hr>
				</div>

				<Routes>
					<Route path="/" element={<PodcastGrid podcasts={this.state.podcasts}/>}/>
					<Route path="/podcast/:podcastId" element={<PodcastDetail podcast_detail_url={this.state.podcast_detail_url}/>}/>
					<Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetail podcast_detail_url={this.state.podcast_detail_url}/>}/>
				</Routes>

			</BrowserRouter>

		</div>
	);
  }
}

export default Main;


/*

La URL para obtener el listado de los 100 podcasts más populares es la siguiente:
https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json

La URL para obtener el detalle de un podcast es la siguiente:
https://itunes.apple.com/lookup?id={podcastId}

*/