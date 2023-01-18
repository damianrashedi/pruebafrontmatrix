import React, { Component } from "react";

import PodcastGrid from "./PodcastGrid";
import PodcastDetail from "./PodcastDetail";

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
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
			});

			setTimeout(() => this.fetchPodcasts(), (this.state.fetch_expiration + 1) * 1000)
	    }else{
	    	this.setState({
	    		podcasts: JSON.parse(localStorage.getItem("podcast_list"))
	    	});
	    }
	};

  render() {
	return (
		<div>
			<BrowserRouter>
				<h1><Link to="/">Podcaster</Link></h1>
				<Routes>
					<Route path="/" element={<PodcastGrid podcasts={this.state.podcasts}/>}/>
					<Route path="/podcast/:id" element={<PodcastDetail podcast_detail_url={this.state.podcast_detail_url}/>}/>
				</Routes>
			</BrowserRouter>

		</div>
	);
  }
}

export default Main;


/*
<li><Link to="/stuff">Stuff</Link></li>
<li><Link to="/contact">Contact</Link></li>

<Route path="/stuff" element={<Stuff/>}/>
<Route path="/contact" element={<Contact/>}/>


La URL para obtener el listado de los 100 podcasts más populares es la siguiente:
https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json

La URL para obtener el detalle de un podcast es la siguiente:
https://itunes.apple.com/lookup?id={podcastId}

*/