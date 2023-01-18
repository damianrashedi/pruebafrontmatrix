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
		<div>
			{this.props.podcasts.map((podcast, i) => {
           // Return the element. Also pass key
           return (<PodcastCard podcast={podcast}/>)
        })}
		</div>
    );
  }
}

export default PodcastGrid;