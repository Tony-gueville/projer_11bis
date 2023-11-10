import { combineReducers } from "redux";

import authReducer from "./authReducer";
import nameReducer from "./nameReducer";

// Création du rootReducer en combinant les réducteurs individuels
const rootReducer = combineReducers({
  auth: authReducer,
  name: nameReducer,
});

export default rootReducer;
