import React, { Component } from "react";

import { useParams } from 'react-router-dom';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class PodcastDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      podcast_detail: {}
    };
  }
  componentDidMount(){
    this.fetchDetail();
   }

  fetchDetail() {
    fetch(`https://api.allorigins.win/get?url=` + this.props.podcast_detail_url + this.props.params.id)
      .then((response) => response.json())
      .then((json_response) => {
        this.setState({
          podcast_detail: JSON.parse(json_response.contents).results[0]
        });
      });
  };

  render() {
    return (
      <div>
        <h3>{this.state.podcast_detail.collectionCensoredName}</h3>
      </div>
    );
  }
}

export default withParams(PodcastDetail);