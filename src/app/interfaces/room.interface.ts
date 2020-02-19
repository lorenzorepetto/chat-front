import { IUser } from './user.interface';

export interface IRoom {
    _id: string;
    name: string;
    description?: string;
    owner?: IUser;
}