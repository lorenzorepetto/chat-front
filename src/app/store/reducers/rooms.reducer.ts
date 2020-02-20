import * as fromRooms from '../actions'
import { IRoom } from '../../interfaces/room.interface';

//===============================================
//                  INTERFACE
//===============================================
export interface RoomsState {
    rooms: IRoom[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

//===============================================
//                  INITIAL
//===============================================
const initState: RoomsState = {
    rooms: [],
    loaded: false,
    loading: false,
    error: null
}

//===============================================
//                  REDUCER
//===============================================
export function roomsReducer( state = initState, action: fromRooms.roomsActions): RoomsState {
    
    switch (action.type) {
        case fromRooms.LOAD_ROOMS:
            return {
                ...state,
                loading: true,
                error: null
            }
    
        case fromRooms.LOAD_ROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                rooms: [ ... action.rooms ]
            }
        
        case fromRooms.LOAD_ROOMS_FAIL:
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

        default:
            return state;
    }


}