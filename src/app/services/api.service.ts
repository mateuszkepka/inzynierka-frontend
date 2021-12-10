import {
    AddPrizeInput,
    CreatePlayerInput,
    CreateTeamInput,
    CreateTournamentInput,
    Invitation,
    InvitePlayerInput,
    LogInInput,
    ParticipatingTeam,
    PendingInvitationsParams,
    Player,
    Prize,
    RegisterForTournamentInput,
    RegisterInput,
    ResponseStatus,
    Team,
    Tournament,
    TournamentAdmin,
    User
} from "../shared/interfaces/interfaces";

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: `root`,
})
export class ApiService {
    apiUrl = `http://localhost:3000`;

    constructor(private readonly httpClient: HttpClient) {}

    /* -------------------------------------------------------------------------- */
    /*                                    AUTH                                    */
    /* -------------------------------------------------------------------------- */
    async register(input: RegisterInput) {
        const url = this.apiUrl + `/auth/register`;
        return this.httpClient.post(url, input);
    }

    async login(input: LogInInput) {
        const url = this.apiUrl + `/auth/login`;
        return this.httpClient.post(url, input, { withCredentials: true });
    }

    async refreshToken() {
        const url = this.apiUrl + `/auth/refresh`;
        return await this.httpClient.get<User>(url, { withCredentials: true }).toPromise();
    }

    async logOut() {
        const url = this.apiUrl + `/auth/logout`;
        return this.httpClient.post(url, {}, { withCredentials: true });
    }

    /* -------------------------------------------------------------------------- */
    /*                                    USER                                    */
    /* -------------------------------------------------------------------------- */
    async getUserById(userId: number) {
        const url = this.apiUrl + `/users/${userId}`;
        return this.httpClient.get<User>(url, { withCredentials: true }).toPromise();
    }

    async patchUser(user: User) {
        const url = this.apiUrl + `/users/${user.userId}`;
        return this.httpClient.put<User>(url, user).toPromise();
    }

    async getMe() {
        const url = this.apiUrl + `/users/whoami`;
        return this.httpClient.get<User>(url, { withCredentials: true }).toPromise();
    }

    async getUserAccounts(userId: number) {
        const url = this.apiUrl + `/users/${userId}/accounts`;
        return this.httpClient.get<Player[]>(url, { withCredentials: true }).toPromise();
    }

    async getUserTeams(userId: number) {
        const url = this.apiUrl + `/users/${userId}/teams`;
        return this.httpClient.get<Team[]>(url, { withCredentials: true }).toPromise();
    }

    /* -------------------------------------------------------------------------- */
    /*                                   PLAYER                                   */
    /* -------------------------------------------------------------------------- */
    async getAllPlayers() {
        const url = this.apiUrl + `/players`;
        return this.httpClient.get<Player[]>(url, { withCredentials: true }).toPromise();
    }

    async createPlayer(player: CreatePlayerInput) {
        const url = this.apiUrl + `/players/create`;
        return this.httpClient.post(url, player, { withCredentials: true }).toPromise();
    }

    async getPlayerById(id: number) {
        const url = this.apiUrl + `/players/${id}`;
        return this.httpClient.get<Player>(url, { withCredentials: true }).toPromise();
    }


    /* -------------------------------------------------------------------------- */
    /*                                 TOURNAMENTS                                */
    /* -------------------------------------------------------------------------- */
    async getAllTournaments() {
        const url = this.apiUrl + `/tournaments`;
        return this.httpClient.get<Tournament[]>(url).toPromise();
    }

    async getTournamentById(id: number) {
        const url = this.apiUrl + `/tournaments/${id}`;
        return this.httpClient.get<Tournament>(url, { withCredentials: true }).toPromise();
    }

    async createTournament(input: CreateTournamentInput) {
        const url = this.apiUrl + `/tournaments`;
        return this.httpClient.post<Tournament>(url, input, { withCredentials: true }).toPromise();
    }

    async addPrize(input: AddPrizeInput) {
        const url = this.apiUrl + `/tournaments/prizes`;
        return this.httpClient.post<Prize>(url, input, { withCredentials: true }).toPromise();
    }

    async registerTeamForTournament(input: RegisterForTournamentInput) {
        const url = this.apiUrl + `/tournaments/add-team`;
        return this.httpClient.post<ParticipatingTeam>(url, input, { withCredentials: true }).toPromise();
    }

    async getManagedTournaments() {
        const url = this.apiUrl + `/tournaments/managed-tournaments`;
        return this.httpClient.get<TournamentAdmin[]>(url, { withCredentials: true }).toPromise();
    }

    async getPendingParticipatingTeams(tournamentId: number) {
        const url = this.apiUrl + `/tournaments/pending-teams/${tournamentId}`;
        return this.httpClient.get<ParticipatingTeam[]>(url, { withCredentials: true }).toPromise();
    }

    async acceptTeam(participatingTeamId: number) {
        const url = this.apiUrl + `/tournaments/accept-team`;
        return this.httpClient.post<ParticipatingTeam>(url, { participatingTeamId } ,{ withCredentials: true }).toPromise();
    }

    /* -------------------------------------------------------------------------- */
    /*                                    TEAM                                    */
    /* -------------------------------------------------------------------------- */
    async createTeam(input: CreateTeamInput) {
        const url = this.apiUrl + `/teams`;
        return this.httpClient.post<Team>(url, input, { withCredentials: true, observe: `response` }).toPromise();
    }

    async getTeamById(teamId: number) {
        const url = this.apiUrl + `/teams/${teamId}`;
        return this.httpClient.get<Team>(url, { withCredentials: true }).toPromise();
    }

    async getPlayersToInvite(teamId: number) {
        const url = this.apiUrl + `/teams/${teamId}/players/available`;
        return this.httpClient.get<Player[]>(url, { withCredentials: true }).toPromise();
    }

    async getTeamMembers(teamId: number) {
        const url = this.apiUrl + `/teams/${teamId}/members`;
        return this.httpClient.get<Invitation[]>(url, { withCredentials: true }).toPromise();
    }

    /* -------------------------------------------------------------------------- */
    /*                                 INVITATIONS                                */
    /* -------------------------------------------------------------------------- */
    async invitePlayer(input: InvitePlayerInput) {
        const url = this.apiUrl + `/invitations`;
        return this.httpClient.post<InvitePlayerInput>(url, input, { withCredentials: true }).toPromise();
    }

    async getPendingInvitations(params: PendingInvitationsParams) {
        const url = this.apiUrl + `/invitations`;
        const requestOptions = {
            withCredentials: true,
            params: {
                status: params.status
            }
        };
        return this.httpClient.get<Invitation[]>(url, requestOptions).toPromise();
    }

    async acceptPlayerInvitation(invitationId: number, status: ResponseStatus) {
        const url = this.apiUrl + `/invitations/${invitationId}`;
        return this.httpClient.patch(url, { status }, { withCredentials: true }).toPromise();
    }
}
