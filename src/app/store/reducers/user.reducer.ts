import * as fromUser from '../actions'
import { IUser } from '../../interfaces/user.interface';

//===============================================
//                  INTERFACE
//===============================================
export interface UserState {
    user: IUser;
    loaded: boolean;
    loading: boolean;
    error: any;
}

//===============================================
//                  INITIAL
//===============================================
const initState: UserState = {
    user: null,
    loaded: false,
    loading: false,
    error: null
}

//===============================================
//                  REDUCER
//===============================================
export function userReducer( state = initState, action: fromUser.userActions): UserState {
    
    switch (action.type) {
        case fromUser.LOAD_USER:
            return {
                ...state,
                loading: true,
                error: null
            }
    
        case fromUser.LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                user: { ... action.user}
            }
        
        case fromUser.LOAD_USER_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.payload
            }
        

        default:
            return state;
    }


}