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
    currency?: string;
    distribution?: string;
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

export interface AddPrizeInput {
    currency: string;
    distribution: string;
    tournamentId: number;
}

export interface RegisterForTournamentInput {
    tournamentId: number;
    teamId: number;
}

export interface InvitePlayerInput {
    playerId: number;
    teamId: number;
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
    prize: Prize;
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
    tournamentAdminId: number;
    tournament: Tournament;
    isAccepted: boolean;
    user?: User;
}

export interface Team {
    teamId: number;
    name: string;
    creationDate: Date;
    captain: Player;
}

export interface Prize {
    prizeId: number;
    currency: string;
    distribution: string;
}

export interface ParticipatingTeam {
    participatingTeamId: number;
    tournament: Tournament;
    team?: Team;
    signDate?: Date;
    isApproved: boolean;
}

export interface PlayerTeam {
    isAccepted: boolean;
    playerTeamId: number;
    team: Team;
    player: Player;
}
