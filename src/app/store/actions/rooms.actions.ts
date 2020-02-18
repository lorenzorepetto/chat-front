import { Action } from '@ngrx/store';
import { IRoom } from '../../interfaces/room.interface';

//===============================================
//                  ACTIONS
//===============================================
export const LOAD_ROOMS = '[Rooms] Load Room';
export const LOAD_ROOMS_FAIL = '[Rooms] Load Room FAIL';
export const LOAD_ROOMS_SUCCESS = '[Rooms] Load Room SUCCESS';

//===============================================
//                  CLASSES
//===============================================
export class LoadRoomsAction implements Action {
    readonly type = LOAD_ROOMS
}

export class LoadRoomsFailAction implements Action {
    readonly type = LOAD_ROOMS_FAIL;

    constructor( public payload: any) {}
}

export class LoadRoomsSuccessAction implements Action {
    readonly type = LOAD_ROOMS_SUCCESS;

    constructor( public rooms: IRoom[] ) {}
}


//===============================================
//                  EXPORTS
//===============================================
export type roomsActions =  LoadRoomsAction |
                            LoadRoomsFailAction | 
                            LoadRoomsSuccessAction;
