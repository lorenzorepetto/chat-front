import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as currentRoomActions from '../actions';

import { of } from "rxjs";
import { map, switchMap, catchError, filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { IMessage } from '../../interfaces/message.interface';
import { ChatService } from '../../services/chat.service';

@Injectable()
export class CurrentRoomEffects {
    
    constructor(
        private actions$: Actions,
        public chatService: ChatService
    ) { }

    @Effect()
    loadCurrentRoom$ = this.actions$.pipe(
        ofType( currentRoomActions.LOAD_ROOM ),
        switchMap( () => {
            return this.chatService.getCurrentRoom()
                .pipe(
                    map( data => new currentRoomActions.LoadRoomSuccessAction(data['currentRoom'], data['messages'])),
                    catchError(error => of( new currentRoomActions.LoadRoomFailAction(error)))
                )
        }),
    )

    @Effect()
    listenToMessages$ = this.actions$.pipe(
        ofType( currentRoomActions.LISTEN_TO_MESSAGES ),
        switchMap( () => {
            return this.chatService.getMessages()
                .pipe(
                    map( (data: IMessage[]) => new currentRoomActions.UpdateMessagesAction(data)),
                )
        }),
    )

}