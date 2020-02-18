import { UserEffects } from './user.effects';
import { CurrentRoomEffects } from './current-room.effects';
import { ActiveUsersEffects } from './active-users.effects';
import { RoomsEffects } from './rooms.effects';


export const effectsArray: any[] = [ UserEffects, CurrentRoomEffects, ActiveUsersEffects, RoomsEffects ];


export * from './user.effects';
export * from './current-room.effects';
export * from './active-users.effects';
export * from './rooms.effects';