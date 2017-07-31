import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { Button } from 'reactstrap'

const tstArray = ["a", "b", "c"]

class API extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const query = queryString.parse(this.props.location.hash);

    if (query && query.access_token) {
      const now = new Date();
      const authToken = query.access_token;
      const expiresAt = now.setSeconds(now.getSeconds() + query.expires_in);
      this.props.updateCurrentSpotifyUser(authToken, expiresAt);
    }
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.props.authorization()}>Teste</Button>
        <Button onClick={() => this.props.playlist()}>Get Playlists</Button>
        <ul>
          {tstArray.map((val, index) => { return <li key={index}>{val}</li> })}
        </ul>
        <ul>
          {this.props.api.playlist.items.map((item, index) => { return <li key={index}>{item.name}</li> })}
        </ul>

      </div>
    );
  }
}

API.propTypes = {
  api: PropTypes.object.isRequired,
  authorization: PropTypes.func.isRequired
}

export default API
