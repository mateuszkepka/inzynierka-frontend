import { Team } from "../shared/interfaces/interfaces";

export class SetCurrentTeam {
    static readonly type = `[CurrentTeam] Set current team`;
    constructor(public team: Team) {}
}
