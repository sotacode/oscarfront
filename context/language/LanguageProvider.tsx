import React, { useEffect, useReducer } from 'react'
import { LanguageContext, LanguageType } from './LanguageContext';
import { languageReducer } from './languageReducer';
import { getLocalStorageLanguage, setLocalStorageLanguage } from '@/utils/localStorage';

export interface LanguageState {
    language: LanguageType;
}

const LANGUAGE_INITIAL_STATE: LanguageState = {
    language: 'EN'
}


export default function LanguageProvider({ children }: { children: React.ReactNode}){
    const [state, dispatch] = useReducer(languageReducer, LANGUAGE_INITIAL_STATE)
    const changeLanguage = (language: LanguageType)=>{
        dispatch({type: language})
    }

    useEffect(() => {
        const currentLanguage= getLocalStorageLanguage();
        if(currentLanguage==null){
            setLocalStorageLanguage("EN")
            dispatch({type: 'EN'})
        }else{
            dispatch({type: currentLanguage})
        }
      }, [])
    
    return (
        <LanguageContext.Provider value={{
            ...state,
            changeLanguage,
        }}>
            {children}
        </LanguageContext.Provider>
    )
}