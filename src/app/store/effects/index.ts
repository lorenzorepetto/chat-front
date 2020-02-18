import { UserEffects } from './user.effects';
import { CurrentRoomEffects } from './current-room.effects';
import { ActiveUsersEffects } from './active-users.effects';


export const effectsArray: any[] = [ UserEffects, CurrentRoomEffects, ActiveUsersEffects ];


export * from './user.effects';
export * from './current-room.effects';
export * from './active-users.effects';