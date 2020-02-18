import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as activeUsersActions from '../actions';

import { of } from "rxjs";
import { map, switchMap, catchError, filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { IMessage } from '../../interfaces/message.interface';
import { ChatService } from '../../services/chat.service';
import { IUserSocket } from '../../interfaces/user.interface';

@Injectable()
export class ActiveUsersEffects {
    
    constructor(
        private actions$: Actions,
        public chatService: ChatService
    ) { }

    @Effect()
    listenToUsers$ = this.actions$.pipe(
        ofType( activeUsersActions.LISTEN_TO_MESSAGES ),
        switchMap( () => {
            return this.chatService.getActiveUsers()
                .pipe(
                    map( (data: IUserSocket[]) => new activeUsersActions.UpdateUsersAction(data)),
                )
        }),
    )

}