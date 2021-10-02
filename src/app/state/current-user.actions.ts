import { User } from "../shared/interfaces/interfaces";

export class SetCurrentUser {
    static readonly type = `[CurrentUser] Set current user`;
    constructor(public currentUser: User) {}
}
