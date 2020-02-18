import { IUserSocket } from '../../interfaces/user.interface';
import { Action } from '@ngrx/store';

//===============================================
//                  ACTIONS
//===============================================
export const LISTEN_TO_USERS = '[Active Users] Listening to active users';
export const UPDATE_USERS = '[Active Users] Update active users';



//===============================================
//                  CLASSES
//===============================================
export class ListenToUsersAction implements Action {
    readonly type = LISTEN_TO_USERS;

    constructor( public room_id: string ) {}
}

export class UpdateUsersAction implements Action {
    readonly type = UPDATE_USERS;

    constructor( public users: IUserSocket[] ) {}
}


//===============================================
//                  EXPORTS
//===============================================
export type activeUsersActions = ListenToUsersAction |
                                 UpdateUsersAction;