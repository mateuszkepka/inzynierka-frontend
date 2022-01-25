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
    numberOfMaps: number;
    registerStartDate: Date;
    registerEndDate: Date;
    tournamentStartDate: Date;
    endingHour?: number;
    endingMinutes?: number;
    description: string;
    prize?: {
        currency?: string;
        distribution?: string;
    };
    gamesPreset?: any;
    gameId: number;
}

export interface UpdateTournamentInput {
    name: string;
    numberOfPlayers: number;
    numberOfTeams: number;
    numberOfMaps: number;
    registerStartDate: Date;
    registerEndDate: Date;
    tournamentStartDate: Date;
    endingHour: number;
    endingMinutes: number;
    description: string;
    gameId: number;
    format?: string;
}

export interface CreatePlayerInput {
    summonerName: string;
    gameId: number;
    region: string;
}

export interface CreateTeamInput {
    name: string;
    playerId: number;
}

export interface AddPrizeInput {
    currency: string;
    distribution: string;
    tournamentId?: number;
}
export interface UpdatePrizeInput {
    currency: string;
    distribution: string;
}

export interface RegisterForTournamentInput {
    tournamentId?: number;
    teamId?: number;
    roster: string[];
    subs: string[];
}

export interface InvitePlayerInput {
    playerId: number;
    teamId: number;
}

export interface UpdateTeamInput {
    name?: string;
    captainId?: number;
}

export interface GetReportsFilteredInput {
    status?: string;
    reportedId?: number;
    reportingId?: number;
}

export interface CreateSuspensionInput {
    userId?: number;
    reason?: string;
    endDate?: string;
}

export interface UpdateSuspensionInput {
    endDate: Date | string;
    reason: string;
    suspensionId?: number;
}

export interface UpdateMatchInput {
    tournamentId?: number;
    matchStartDate?: Date;
    matchEndDate?: Date;
    winner?: number;
    matchStatus?: string;
    firstRosterId?: number;
    secondRosterId?: number;
    numberOfMaps?: number;
}

/* -------------------------------------------------------------------------- */
/*                               REQUEST PARAMS                               */
/* -------------------------------------------------------------------------- */
export interface PendingInvitationsParams {
    status: string;
}

export interface GetUserTournamentsParams {
    role?: string;
    status?: string;
}

export interface GetUserSuspensionsParams {
    userId: number;
    status: string;
}

export interface GetSuspensionsParams {
    userId?: number;
    status?: string;
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
    backgroundPicture?: string;
    profilePicture?: string;
    roles?: string[];
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
    organizer: User;
    checkedIn?: number;
    formatId?: string;
    checkInOpenDate?: Date;
    checkInCloseDate?: Date;
    endingHour?: number;
    endingMinutes?: number;
    backgroundPicture?: string;
    profilePicture?: string;
    numberOfMaps?: number;
    numberOfGroups?: number;
}

export interface Suspension {
    suspensionId: number;
    startDate: Date;
    endDate: Date;
    reason: string;
    userId: number;
    adminId: number;
    username?: string;
}

export interface Player {
    playerId: number;
    summonerName: string;
    PUUID: string;
    accountId: string;
    summonerId: string;
    region: string;
    user: User;
    ownedTeams: Team[];
}

export interface TournamentAdmin {
    tournamentAdminId: number;
    tournament: Tournament;
    isAccepted: boolean;
    user?: User;
}

export interface Team {
    teamId: number;
    teamName: string;
    creationDate: Date;
    captain: Player;
    captainId?: number;
    profilePicture: string;
    backgroundPicture: string;
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

export interface Invitation {
    status: string;
    teamId: number;
    invitationId: number;
    playerId: InvitationPlayer;
    summonerName?: string;
}

export interface Match {
    matchId: number;
    matchStartDate: string;
    matchEndDate: string;
    status: string;
    winner: number;
    numberOfMaps: number;
    firstRoster: Roster;
    secondRoster: Roster;
    tournamentId: number;
    groupId?: number;
    maps: Map[];
}

export interface Map {
    mapId: number;
    mapWinner: number;
    time: string;
    performances: MapPerformance[];
}

export interface MapPerformance {
    kills: number;
    deaths: number;
    assists: number;
    creepScore: number;
    gold: number;
    playerId: number;
}

export interface Roster {
    participatingTeamId: number;
    team: {
        teamId: number;
        teamName: string;
    };
    roster: RosterPlayer[];
}

export interface RosterPlayer {
    username: string;
    playerId: number;
    performances?: MapPerformance[];
}

export interface Report {
    reportId?: number;
    status?: string;
    reportDate?: Date;
    description?: string;
    responseDate?: Date;
    reportingUser?: User;
    reportedUser?: User;
}

export interface Format {
    formatId: number;
    name: string;
    description: string;
}
export interface Group {
    groupId: number;
    name: string;
    standings: GroupStanding[];
}
export interface GroupStanding {
    groupStandingId: number;
    place: number;
    points: number;
    team: {
        teamId: number;
        teamName: string;
    };
}

/* -------------------------------------------------------------------------- */
/*                              HELPER INTERFACES                             */
/* -------------------------------------------------------------------------- */
export interface InvitationPlayer {
    playerId: number;
    region: string;
    summonerName: string;
    user: User;
}

export interface TeamPlayer {
    playerId: number;
    username: string;
}

export interface TournamentTeamData {
    teamId: number;
    teamName: string;
}
export interface TournamentTeam {
    checkInDate: Date;
    participatingTeamId: number;
    roster: TeamPlayer[];
    signDate: Date;
    status: string;
    subs: TeamPlayer[];
    team: TournamentTeamData;
    verificationDate: Date;
}

/* -------------------------------------------------------------------------- */
/*                                    ENUM                                    */
/* -------------------------------------------------------------------------- */
export enum InvitationStatus {
    Pending = `pending`,
    Refused = `refused`,
    Accepted = `accepted`,
}

export enum ResponseStatus {
    Refused = `refused`,
    Accepted = `accepted`,
}

export enum RegionsLoL {
    BR = `BR`,
    EUNE = `EUNE`,
    EUW = `EUW`,
    LAN = `LAN`,
    LAS = `LAS`,
    NA = `NA`,
    OCE = `OCE`,
    RU = `RU`,
    TR = `TR`,
    JP = `JP`,
    KR = `KR`,
}

export enum TournamentStatus {
    FINISHED = `finished`,
    ONGOING = `ongoing`,
    UPCOMING = `upcoming`,
}

export enum TournamentRoles {
    TOURNAMENT_ADMIN = `tournament-admin`,
    PLAYER = `player`,
    ORGANIZER = `organizer`,
}

export enum SuspensionStatus {
    ACTIVE = `active`,
    PAST = `past`,
}

export enum ReportStatus {
    UNSEEN = `unseen`,
    REVIEWED = `reviewed`,
    RESOLVED = `resolved`,
}

export enum MatchStatus {
    SCHEDULED = `scheduled`,
    POSTPONED = `postponed`,
    RESOLVING = `resolving`,
    UNRESOLVED = `unresolved`,
    FINISHED = `finished`,
    CANCELLED = `cancelled`,
}

export enum ParticipationStatus {
    SIGNED = `signed`,
    VERIFIED = `verified`,
    UNVERIFIED = `unverified`,
    CHECKED_IN = `checked`,
}
