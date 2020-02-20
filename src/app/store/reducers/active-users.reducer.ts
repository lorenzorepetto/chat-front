import * as fromUser from '../actions'
import { IUserSocket } from '../../interfaces/user.interface';

//===============================================
//                  INTERFACE
//===============================================
export interface ActiveUsersState {
    users: IUserSocket[];
}

//===============================================
//                  INITIAL
//===============================================
const initState: ActiveUsersState = {
    users: [],
}

//===============================================
//                  REDUCER
//===============================================
export function activeUsersReducer( state = initState, action: fromUser.activeUsersActions): ActiveUsersState {
    
    switch (action.type) {
    
        case fromUser.UPDATE_USERS:
            return {
                ...state,
                users: [ ...action.users ]
            }
        
        default:
            return state;
    }


}