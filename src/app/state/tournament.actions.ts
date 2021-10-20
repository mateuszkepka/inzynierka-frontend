import { Tournament } from "../shared/interfaces/interfaces";

export class SetTournament {
    static readonly type = `[Tournament] Set tournament`;
    constructor(public tournament: Tournament) {}
}
