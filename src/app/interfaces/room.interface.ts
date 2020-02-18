import { IUser } from '../../../../chat-back/models/user.model';

export interface IRoom {
    _id: string;
    name: string;
    description?: string;
    owner?: IUser;
}