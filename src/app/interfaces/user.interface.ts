export type validStates = 'ONLINE' | 'BUSY';


export interface IUser {
    email: string;
    name: string;
    picture: string;
    status?: validStates;
}


//===============================================
//                  SOCKET
//===============================================

export interface IUserSocket {
    email: string
    name: string;
    room_id: string;
    picture: string;
    status?: validStates;
}