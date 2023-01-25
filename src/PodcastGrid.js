import React, { Component } from "react";
import PodcastCard from "./PodcastCard";

class PodcastGrid extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtered_podcasts: this.props.podcasts,
		};
	}
	render() {
    return (
		<div className="row" >
			{this.props.podcasts.map((podcast, i) => {
	           // Return the element. Also pass key
	           return (<PodcastCard podcast={podcast} key={podcast.id.attributes['im:id']}/>)
	        })}
		</div>
    );
  }
}

export default PodcastGrid;