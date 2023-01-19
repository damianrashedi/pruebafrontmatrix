import React, { Component } from "react";

import { useParams } from 'react-router-dom';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class PodcastDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      podcast_detail: null,
      fetch_expiration: 86400,
    };
  }

  componentDidMount(){
    this.getPodcastDetail();
   }

  getPodcastDetail() {
    this.setState({
      is_loading: true
    });

    let existing_podcasts = JSON.parse(localStorage.getItem("podcast_detail_list"));
    console.log(existing_podcasts);

    if(existing_podcasts && existing_podcasts[this.props.params.podcastId] !== undefined){

      let elapsedTime = Date.now() - existing_podcasts[this.props.params.podcastId].fetch_date;
      if (elapsedTime > this.state.fetch_expiration) {
        this.fetchPodcastDetail();
      }else{
        this.setState({
          podcast_detail: existing_podcasts[this.props.params.podcastId].podcast_detail
        });

      }

    }else{
      this.fetchPodcastDetail();
    }
  }

  fetchPodcastDetail(){
    fetch(`https://api.allorigins.win/get?url=` + this.props.podcast_detail_url + this.props.params.podcastId)
      .then((response) => response.json())
      .then((json_response) => {
        setTimeout(() => this.getPodcastDetail(), (this.state.fetch_expiration + 1) * 1000)

        let detail = JSON.parse(json_response.contents).results[0];

        this.setState({
          podcast_detail: detail
        });

        let existing_podcasts = JSON.parse(localStorage.getItem("podcast_detail_list"));
        if(existing_podcasts){
          existing_podcasts[this.props.params.podcastId] = {
            fetch_date: Date.now(),
            podcast_detail: detail
          }
        }else{
          existing_podcasts = {};
          existing_podcasts[this.props.params.podcastId] = {
            fetch_date: Date.now(),
            podcast_detail: detail
          }
        }

        localStorage.setItem("podcast_detail_list", JSON.stringify(existing_podcasts));

        this.setState({
          is_loading: false
        });
      });
  }

  render() {
    console.log(this.state.podcast_detail);
    return (
      <div>
        {this.state.podcast_detail && 
          <div className="row">
            <div className="col-3">
              <div className="card text-center text-decoration-none p-2 shadow p-3 mb-5 bg-white rounded">
                <img className="card-img-top border rounded mx-auto"  src={this.state.podcast_detail.artworkUrl600} alt="Caratula del podcast"></img>
                <div className="card-body">
                  <p className="text-dark text-uppercase"><strong>{this.state.podcast_detail.collectionName}</strong></p>
                  <p className="text-muted">Author: {this.state.podcast_detail.artistName}</p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withParams(PodcastDetail);