import { Action } from '@ngrx/store';
import { IRoom } from '../../interfaces/room.interface';
import { IMessage } from '../../interfaces/message.interface';

//===============================================
//                  ACTIONS
//===============================================
export const LOAD_ROOM = '[Current Room] Load Room';
export const LOAD_ROOM_FAIL = '[Current Room] Load Room FAIL';
export const LOAD_ROOM_SUCCESS = '[Current Room] Load Room SUCCESS';
export const LISTEN_TO_MESSAGES = '[Current Room] Listening to Update-Messages'
export const UPDATE_MESSAGES = '[Current Room] Update Messages'

//===============================================
//                  CLASSES
//===============================================
export class LoadRoomAction implements Action {
    readonly type = LOAD_ROOM
}

export class LoadRoomFailAction implements Action {
    readonly type = LOAD_ROOM_FAIL;

    constructor( public payload: any) {}
}

export class LoadRoomSuccessAction implements Action {
    readonly type = LOAD_ROOM_SUCCESS;

    constructor( public room: IRoom, public messages: IMessage[] ) {}
}

export class ListenToMessagesAction implements Action {
    readonly type = LISTEN_TO_MESSAGES;
}

export class UpdateMessagesAction implements Action {
    readonly type = UPDATE_MESSAGES;

    constructor( public messages: IMessage[] ) {}
}

//===============================================
//                  EXPORTS
//===============================================
export type currentRoomActions =  LoadRoomAction |
                                  LoadRoomFailAction | 
                                  LoadRoomSuccessAction |
                                  ListenToMessagesAction |
                                  UpdateMessagesAction;