import { AUTO_LANGUAGE } from "../constants";
import { type State, type Action, FromLanguaje, Languaje } from "../types.d";
import { useReducer } from "react";

// 1 create a initial state
const initialState = {
  fromLanguaje: "auto",
  toLanguage: "en",
  fromText: "",
  result: "",
  loading: false,
};

// 2 create a reducer
function reducer(state: State, action: Action) {
  const { type } = action;

  if (type === "INTERCHANGE_LANGUAGES") {
    // logica del estado dentro del reducer
    //porque lo evitamos en los compoentes
    if (state.fromLanguaje === AUTO_LANGUAGE) return state;
    return {
      ...state,
      fromLanguaje: state.toLanguage,
      toLanguage: state.fromLanguaje,
    };
  }

  if (type === "SET_FROM_LANGUAGE") {
    return {
      ...state,
      fromLanguaje: action.payload,
    };
  }

  if (type === "SET_TO_LANGUAGE") {
    return {
      ...state,
      toLanguage: action.payload,
    };
  }

  if (type === "SET_FROM_TEXT") {
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: "",
    };
  }

  if (type === "SET_RESULT") {
    return {
      ...state,
      loading: false,
      result: action.payload,
    };
  }

  return state;
}

export function useStore() {
  // 3. usar el hook useReducer
  const [{ fromLanguaje, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState);

  // 4. exportar el hook
  const interchangeLanguages = () => {
    dispatch({ type: "INTERCHANGE_LANGUAGES" });
  };

  const setFromLanguage = (payload: FromLanguaje) => {
    dispatch({ type: "SET_FROM_LANGUAGE", payload });
  };

  const setToLanguage = (payload: Languaje) => {
    dispatch({ type: "SET_TO_LANGUAGE", payload });
  };

  const setFromText = (payload: string) => {
    dispatch({ type: "SET_FROM_TEXT", payload });
  };

  const setResult = (payload: string) => {
    dispatch({ type: "SET_RESULT", payload });
  };

  return {
    fromLanguaje,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  };
}
