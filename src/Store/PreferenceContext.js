import React from 'react'

const PreferenceContext = React.createContext();
const localState = JSON.parse(localStorage.getItem('preferenceState'));

const initialState ={
    selectedPreference:{
        open: false,
    }
}

function preferenceReducer(state,action){
    switch(action.type){
        case 'toggleDrawer': {
            return{
                ...state,
                selectedPreference:action.payload
            }
        }

        default:{
            return state;
        }
    }
}

function PreferenceProvider({children}) {
    const [preferenceState, preferenceDispatch] = React.useReducer(preferenceReducer, localState || initialState)
    
    React.useEffect(() => {
    localStorage.setItem('preferenceState', JSON.stringify(preferenceState))
    }, [preferenceState])
    
    return (
    <PreferenceContext.Provider value={{preferenceState, preferenceDispatch}}>
    {children}
    </PreferenceContext.Provider>
    )
   }
    
   export { PreferenceProvider, PreferenceContext }