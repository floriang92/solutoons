import React from 'react'

const ChildContext = React.createContext();
const localState = JSON.parse(localStorage.getItem('childState'));

const initialState ={
    currentChild:{
        availableTokens: 1,
    }
}

function childReducer(state,action){
    switch(action.type){
        case 'UpdateToken': {
            return{
                ...state,
                currentChild:{...state.currentChild, availableTokens: action.payload}
            }
        }

        default:{
            return state;
        }
    }
}

function ChildProvider({children}) {
    const [childState, childDispatch] = React.useReducer(childReducer, localState || initialState)
    
    React.useEffect(() => {
    localStorage.setItem('childState', JSON.stringify(childState))
    }, [childState])
    
    return (
    <ChildContext.Provider value={{childState, childDispatch}}>
    {children}
    </ChildContext.Provider>
    )
   }
    
   export { ChildProvider, ChildContext }