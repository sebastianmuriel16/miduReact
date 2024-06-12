import { type SUPPORTED_LANGUAGES, type AUTO_LANGUAGE } from "./constants";

export type Languaje = keyof typeof SUPPORTED_LANGUAGES;
export type AutoLanguage = typeof AUTO_LANGUAGE;
export type FromLanguaje = Languaje | AutoLanguage;

export interface State {
  fromLanguaje: FromLanguaje;
  toLanguage: Languaje;
  fromText: string;
  result: string;
  loading: boolean;
}

export type Action =
  | { type: "INTERCHANGE_LANGUAGES" }
  | { type: "SET_FROM_LANGUAGE"; payload: FromLanguaje }
  | { type: "SET_TO_LANGUAGE"; payload: Languaje }
  | { type: "SET_FROM_TEXT"; payload: string }
  | { type: "SET_RESULT"; payload: string };

export enum SectionType {
  From = "from",
  To = "to",
}
