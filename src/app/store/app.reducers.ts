import * as reducers from './reducers'
import { ActionReducerMap } from '@ngrx/store'

//===============================================
//                  INTERFACE
//===============================================
export interface AppState {
    user: reducers.UserState,
    currentRoom: reducers.CurrentRoomState,
    activeUsers: reducers.ActiveUsersState,
    rooms: reducers.RoomsState
}


export const APP_REDUCERS: ActionReducerMap<AppState> = {
    user: reducers.userReducer,
    currentRoom: reducers.currentRoomReducer,
    activeUsers: reducers.activeUsersReducer,
    rooms: reducers.roomsReducer
};