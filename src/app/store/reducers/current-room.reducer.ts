import * as fromCurrentRoom from '../actions'
import { IRoom } from '../../interfaces/room.interface';
import { IMessage } from '../../interfaces/message.interface';

//===============================================
//                  INTERFACE
//===============================================
export interface CurrentRoomState {
    room: IRoom;
    messages: IMessage[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

//===============================================
//                  INITIAL
//===============================================
const initState: CurrentRoomState = {
    room: null,
    messages: [],
    loaded: false,
    loading: false,
    error: null
}

//===============================================
//                  REDUCER
//===============================================
export function currentRoomReducer( state = initState, action: fromCurrentRoom.currentRoomActions): CurrentRoomState {
    
    switch (action.type) {
        case fromCurrentRoom.LOAD_ROOM:
            return {
                ...state,
                loading: true,
                error: null
            }
    
        case fromCurrentRoom.LOAD_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                room: { ... action.room},
                messages: [ ...action.messages ]
            }
        
        case fromCurrentRoom.LOAD_ROOM_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: action.payload
            }
        
        case fromCurrentRoom.LISTEN_TO_MESSAGES:
            return state;
        
        case fromCurrentRoom.UPDATE_MESSAGES:
            return {
                ...state,
                messages: [...action.messages]
            }

        default:
            return state;
    }


}