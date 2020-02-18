import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';

import * as userActions from '../actions';

import { of } from "rxjs";
import { map, switchMap, catchError, filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/user.interface';

@Injectable()
export class UserEffects {
    
    constructor(
        private actions$: Actions,
        public authService: AuthService
    ) { }

    @Effect()
    loadUser$ = this.actions$.pipe(
        ofType( userActions.LOAD_USER ),
        switchMap( () => {
            return this.authService.getUser$().pipe(
                filter( userLogged => userLogged !== null),
                map( userLogged => {
                    const user: IUser = {
                        name: userLogged.name,
                        email: userLogged.email,
                        picture: userLogged.picture,
                        status: 'ONLINE'
                      }
                    return new userActions.LoadUserSuccessAction(user)
                }),
                catchError( error => of( new userActions.LoadUserFailAction(error) ))
            )
        })
    )

}