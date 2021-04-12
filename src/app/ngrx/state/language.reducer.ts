import { createReducer, on } from '@ngrx/store';
import { changeLanguage } from './language.actions';
import { ILanguage } from './language.interface';

export const initialState: ILanguage = {
  activeLang: "EN",
};

const _reducer = createReducer(
  initialState,
  on(changeLanguage, (state,props) => {
    return {
      ...state,
      activeLang: props.newLang,
    };
  })
);

export const languageReducer=(state:any, action:any)=>_reducer(state,action);
