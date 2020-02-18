import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as roomsActions from '../actions';

import { of } from "rxjs";
import { map, switchMap, catchError, filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { IMessage } from '../../interfaces/message.interface';
import { ChatService } from '../../services/chat.service';

@Injectable()
export class RoomsEffects {
    
    constructor(
        private actions$: Actions,
        public chatService: ChatService
    ) { }

    @Effect()
    loadRooms$ = this.actions$.pipe(
        ofType( roomsActions.LOAD_ROOMS ),
        switchMap( () => {
            return this.chatService.getRooms()
                .pipe(
                    map( data => new roomsActions.LoadRoomsSuccessAction(data['rooms'])),
                    catchError(error => of( new roomsActions.LoadRoomsFailAction(error)))
                )
        }),
    )

}