import React from 'react'

const AuthContext = React.createContext();
const localState = JSON.parse(localStorage.getItem('authState'));

/////////////////////////////////////////////////////////////////////// Etat initial de la variable ///////////////////////////////////////////////////////////////////////
const initialState ={
    id:null,
    name:null,
    email:null,
    token:null,
    availableTokens:null,
}

function authReducer(state,action){
    switch(action.type){
        /////////////////////////////////////////////////////////////////////// Mise à jour des infos lors du login ///////////////////////////////////////////////////////////////////////
        case'login':{
            return{
                ...state,
                id:action.payload.user._id,
                firstname:action.payload.user.firstname,
                email:action.payload.user.email,
                token:action.payload.token,
                availableTokens:action.payload.user.availableTokens,
            }
        }

        /////////////////////////////////////////////////////////////////////// Mise à jour du nombre de tokens ///////////////////////////////////////////////////////////////////////
        case'updateToken':{
            return{
                ...state,
                availableTokens:action.payload
            }
        }

        default:{
            return state;
        }
    }
}

function AuthProvider({children}) {
    const [authState, authDispatch] = React.useReducer(authReducer, localState || initialState)
    
    React.useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(authState))
    }, [authState])
    
    return (
    <AuthContext.Provider value={{authState, authDispatch}}>
    {children}
    </AuthContext.Provider>
    )
   }
    
   export { AuthProvider, AuthContext }