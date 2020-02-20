import * as fromCurrentRoom from '../actions'
import { IRoom } from '../../interfaces/room.interface';
import { IMessage } from '../../interfaces/message.interface';

//===============================================
//                  INTERFACE
//===============================================
export interface CurrentRoomState {
    room: IRoom;
    messages: IMessage[];
    total: number;
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
    total: null,
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
                messages: [ ...action.messages ],
                total: action.total
            }
        
        case fromCurrentRoom.LOAD_ROOM_FAIL:
            return {
                ...state,
                loaded: true,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url,
                    ok: action.payload.ok
                }
            }
        

        case fromCurrentRoom.LISTEN_TO_MESSAGES:
            return state;
        
        case fromCurrentRoom.UPDATE_MESSAGES:
            return {
                ...state,
                messages: [...action.messages],
                total: action.total
            }

        default:
            return state;
    }


}