import * as reducers from './reducers'
import { ActionReducerMap } from '@ngrx/store'

//===============================================
//                  INTERFACE
//===============================================
export interface AppState {
    user: reducers.UserState,
    currentRoom: reducers.CurrentRoomState,
    activeUsers: reducers.ActiveUsersState
}


export const APP_REDUCERS: ActionReducerMap<AppState> = {
    user: reducers.userReducer,
    currentRoom: reducers.currentRoomReducer,
    activeUsers: reducers.activeUsersReducer
};