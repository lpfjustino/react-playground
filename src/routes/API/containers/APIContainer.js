import { connect } from 'react-redux'
import SpotifyWebApi from 'spotify-web-api-js';
import * as Spotify from '../modules/api'; 

import API from '../components/API'

const mapDispatchToProps = {
  ...Spotify
}

const mapStateToProps = (state) => ({
  api : state.api
})

export default connect(mapStateToProps, mapDispatchToProps)(API)
