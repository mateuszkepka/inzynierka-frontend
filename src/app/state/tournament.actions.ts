import { Tournament } from "../shared/interfaces/interfaces";

export class SetTournament {
    static readonly type = `[Tournament] Set current tournament`;
    constructor(public tournament: Tournament) {}
}
