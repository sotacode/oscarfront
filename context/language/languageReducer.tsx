import { LanguageState } from './LanguageProvider';


type LanguageActionType =
    | { type: 'ES' }
    | { type: 'EN' }


export const languageReducer = (state: LanguageState, action: LanguageActionType): LanguageState => {
    switch (action.type) {
        case 'ES':
            return {
                ...state,
                language: 'ES'
            }
        case 'EN':
            return {
                ...state,
                language: 'EN'
            }
        default: 
            return state;
    }
}