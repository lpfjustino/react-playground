import Spotify from 'spotify-web-api-js';
import store from '../../../store/createStore';
export const spotifyApi = new Spotify();

// ------------------------------------
// Constants
// ------------------------------------

export const SPOTIFY_TOKEN = 'SPOTIFY_TOKEN';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';
export const SPOTIFY_LOGOUT = 'SPOTIFY_LOGOUT';

export const SPOTIFY_AUTHENTICATION_SUCCESS = 'SPOTIFY_AUTHENTICATION_SUCCESS';
export const SPOTIFY_AUTHENTICATION_FAILURE = 'SPOTIFY_AUTHENTICATION_FAILURE';

export const SPOTIFY_PLAYLIST = 'SPOTIFY_PLAYLIST'

const spotifyConfig = {
    "clientId": '91a84a82e4e34192a860659488ce3ecf',
    "clientSecret": '90bc01ab41404528aea3bcabf458e750',
    "redirectUri": encodeURIComponent('http://localhost:3000/api'),
    "stateKey": 'spotify_auth_state',
    "scopes": ['user-read-private', 'user-read-email']
};

// ------------------------------------
// Actions
// ------------------------------------

function setToken(accessToken, expiresAt) {
  return {
    "type": SPOTIFY_TOKEN,
    accessToken,
    expiresAt
  };
}

function beginUserFetch() {
  return {
    "type": SPOTIFY_ME_BEGIN
  };
}

function userFetchSuccess(data) {
  return {
    "type": SPOTIFY_ME_SUCCESS,
    data
  };
}

function userFetchFailure(exception) {
  return {
    "type": SPOTIFY_ME_FAILURE,
    "error": exception
  };
}

export function logout(){
  return {
    "type": SPOTIFY_LOGOUT
  };
}

export const authorization = () => {
  let query = 'https://accounts.spotify.com/authorize?';
  query += `client_id=${spotifyConfig.clientId}&response_type=token`;
  query += `&redirect_uri=${spotifyConfig.redirectUri}`;

  window.location.href = query;
};

export const playlist = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      spotifyApi.getUserPlaylists('jmperezperez').
      then(data => {
        console.log(data)
        dispatch({
          "type": SPOTIFY_PLAYLIST,
          "payload": data
        })
        resolve()
      })
    })
  }

}

export function updateCurrentSpotifyUser(accessToken, expiresAt) {
  return dispatch => {
    dispatch(setToken(accessToken, expiresAt));
    dispatch(beginUserFetch());
    spotifyApi.getMe().then(user => {
      dispatch(userFetchSuccess(user));
    }).
    catch(exception => {
      dispatch(userFetchFailure(exception));
    });
  };
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SPOTIFY_TOKEN]         : (state, action) => {
    const {accessToken, expiresAt} = action
    const newState = {...state, accessToken, expiresAt}
    newState.api.setAccessToken(accessToken)
    return newState
  },

  [SPOTIFY_ME_BEGIN]      : (state, action) => (
    {
      ...state,
      "user": {
        ...state.user,
        "loading": true
      }
    }
  ),

  [SPOTIFY_ME_SUCCESS]    : (state, action) => (
    {
      ...state,
      "user": {
        ...state.user,
        ...action.data,
        "loading": false
      }
    }
  ),

  [SPOTIFY_ME_FAILURE]    : (state, action) => ({state}),

  [SPOTIFY_LOGOUT]        : (state, action) => (
    {
      ...state,
      'accessToken': null,
      'expiresAt': null,
      'user': {
        ...state.user,
        ...spotifyInitialState.user
      }
    }),

  [SPOTIFY_AUTHENTICATION_SUCCESS]  : (state, action) => {
      const {accessToken, refreshToken} = action.data;

      return Object.assign({}, state, {accessToken,
          refreshToken});
    },

  [SPOTIFY_AUTHENTICATION_FAILURE]  : (state, action) => ({state}),

  [SPOTIFY_PLAYLIST] : (state, action) => ({...state, playlist: action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  'api': new Spotify(),
  'accessToken': null,
  'expiresAt': null,
  'user': {
        "loading": false,
        "birthdate": null,
        "country": null,
        "display_name": null,
        "email": null,
        "external_urls": {},
        "followers": {},
        "href": null,
        "id": null,
        "images": [],
        "product": null,
        "type": null,
        "uri": null,
  },
  'playlist': {items:[]}
}

export default function apiReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
