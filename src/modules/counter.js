import {
  SELECT_USER,
  REQUEST_USERDATA,
  RECEIVE_USERDATA,
  RECEIVE_USERDATA_ERROR,
  REQUEST_REPOS,
  RECEIVE_REPOS,
  RECEIVE_REPOS_ERROR,
  LOAD_DOCUMENT_LIST,
} from './ActionTypes';

const initialState = {
  docList:[
  ]
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DOCUMENT_LIST:
      console.log(" action.payload", action);
      return {
        ...state,
        docList: action.userData.documents
      }
      
    default:
      return state
  }
}

// export const increment = () => {
//   return dispatch => {
//     dispatch({
//       type: INCREMENT_REQUESTED
//     })

//     dispatch({
//       type: INCREMENT
//     })
//   }
// }


// export const getDocumentList = () => {
//   return dispatch => {
//     dispatch({
//       type: DOCUMENT_LIST
//     });
    
//     const url = 'http://localhost/laravel/public/api/getalldocuments';
//     fetch(url).then(response => response.json()).then((jsonData) => {
//       // this.props.docList=jsonData.documents;
//       // this.setState('docList')=jsonData.documents;
      
//     })
//     .catch((error) => {
//       console.error(error)
//     });
    
//   }
// }

// export const getDocumentList = () =>{
//   return dispatch => {
//       return fetch(`http://localhost/laravel/public/api/getalldocuments`)
//           .then(res => res.json())
//           .then(json => dispatch({
//             type: "SELECT_USER",
//             userData: json,
//         }))
//           .catch(err => dispatch({
//             type: "SELECT_USER",
//             userData: json,
//         }));
//   };
// }

export function requestUserData() {
  return {
      type: REQUEST_USERDATA,
  };
}

function receiveUserData(json) {
  return {
      type: LOAD_DOCUMENT_LIST,
      userData: json,
  };
}

function receiveUserDataErr(error) {
  return {
      type: RECEIVE_USERDATA_ERROR,
      error,
  };
}


export function getDocumentList() {
  return dispatch => {
      dispatch(requestUserData());
      return fetch(`http://localhost/laravel/public/api/getalldocuments`)
          .then(res => res.json())
          .then(json => dispatch(receiveUserData(json)))
          .catch(err => dispatch(receiveUserDataErr(err)));
  };
}