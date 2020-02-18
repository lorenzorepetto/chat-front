import { Action } from '@ngrx/store';
import { IUser } from '../../interfaces/user.interface';

//===============================================
//                  ACTIONS
//===============================================
export const LOAD_USER = '[User] Load user';
export const LOAD_USER_FAIL = '[User] Load user FAIL';
export const LOAD_USER_SUCCESS = '[User] Load user SUCCESS';


//===============================================
//                  CLASSES
//===============================================
export class LoadUserAction implements Action {
    readonly type = LOAD_USER
}

export class LoadUserFailAction implements Action {
    readonly type = LOAD_USER_FAIL;

    constructor( public payload: any) {}
}

export class LoadUserSuccessAction implements Action {
    readonly type = LOAD_USER_SUCCESS;

    constructor( public user: IUser ) {}
}


//===============================================
//                  EXPORTS
//===============================================
export type userActions = LoadUserAction |
                      LoadUserFailAction | 
                      LoadUserSuccessAction;