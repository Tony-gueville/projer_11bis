const initialState = {
  username: "",
  firstname: "",
  lastname: "",
};

// Définition du réducteur pour gérer l'état de l'information sur le nom d'utilisateur
const nameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        username: action.payload.username,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default nameReducer;
