import { IUser } from './user.interface';


export interface IMessage {
    _id: string;
    text: string;
    date: Date;
    user: IUser;
}


export interface IMessageSend {
    text: string;
    user: IUser;
    room: string
}