/* eslint-disable @typescript-eslint/naming-convention */
/* -------------------------------------------------------------------------- */
/*                               REQUEST INPUTS                               */
/* -------------------------------------------------------------------------- */
export interface RegisterInput {
    email: string;
    password: string;
    username: string;
    country: string;
    university: string;
    studentId: string;
}

export interface LogInInput {
    email: string;
    password: string;
}

export interface CreateTournamentInput {
    name: string;
    numberOfPlayers: number;
    numberOfTeams: number;
    registerStartDate: Date;
    registerEndDate: Date;
    tournamentStartDate: Date;
    tournamentEndDate: Date;
    description: string;
}

export interface CreatePlayerInput {
    PUUID: string;
    accountId: string;
    summonerId: string;
    region: string;
}

export interface CreateTeamInput {
    name: string;
    playerId: number;
}

/* -------------------------------------------------------------------------- */
/*                                NOTIFICATION                                */
/* -------------------------------------------------------------------------- */
export interface Notification {
    severity: string;
    summary?: string;
    detail?: string;
    life?: number;
}

/* -------------------------------------------------------------------------- */
/*                                DB INTERFACES                               */
/* -------------------------------------------------------------------------- */
export interface User {
    userId: number;
    email: string;
    username: string;
    country: string;
    university: string;
    studentId: string;
    organizedTournaments: Tournament[];
    suspensions: Suspension[];
    accounts: Player[];
    tournamentAdmins: TournamentAdmin[];
}

export interface Tournament {
    tournamentId: number;
    name: string;
    numberOfPlayers: number;
    numberOfTeams: number;
    registerStartDate: Date;
    registerEndDate: Date;
    tournamentStartDate: Date;
    tournamentEndDate: Date;
    description: string;
    // prize: Prize;
    // games: Game[];
    // groups: Group[];
    // ladders: Ladder[];
    // matches: Match[];
    // tournamentAdmins: TournamentAdmin[];
    // preset: Preset;
    organizer: User;
}

export interface Suspension {
    suspensionId: number;
    suspensionStartDate: Date;
    suspensionEndDate: Date;
    reason: string;
    user: User;
}

export interface Player {
    playerId: number;
    PUUID: string;
    accountId: string;
    summonerId: string;
    region: string;
    user: User;
    ownedTeams: Team[];
    // activeRosters: ActiveRoster[];
    // performances: Performance[];
    // games: Game[];
    // teams: Team[];
}

export interface TournamentAdmin {
    tournament: Tournament;
    user: User;
}

export interface Team {
    teamId: number;
    name: string;
    creationDate: Date;
    captain: Player;
}
