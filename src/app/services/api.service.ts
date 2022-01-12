import {
    AddPrizeInput,
    CreatePlayerInput,
    CreateSuspensionInput,
    CreateTeamInput,
    CreateTournamentInput,
    Format,
    GetReportsFilteredInput,
    GetSuspensionsParams,
    GetUserTournamentsParams,
    Invitation,
    InvitePlayerInput,
    LogInInput,
    Match,
    ParticipatingTeam,
    PendingInvitationsParams,
    Player,
    Prize,
    RegisterForTournamentInput,
    RegisterInput,
    Report,
    ResponseStatus,
    Suspension,
    Team,
    Tournament,
    TournamentAdmin,
    TournamentTeam,
    UpdateSuspensionInput,
    UpdateTeamInput,
    User
} from "../shared/interfaces/interfaces";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { omit } from "lodash";

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
        return this.httpClient.post(url, input).toPromise();
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

    async getUserTournaments(userId: number, params: GetUserTournamentsParams) {
        const url = this.apiUrl + `/users/${userId}/tournaments`;
        return this.httpClient.get<Tournament[]>(url, { withCredentials: true, params: {
            role: params?.role,
            status: params?.status
        } }).toPromise();
    }

    async getUserMatches(userId: number, status: string) {
        const url = this.apiUrl + `/users/${userId}/matches`;
        return this.httpClient.get<Match[]>(url, { withCredentials: true, params: {
            status
        } }).toPromise();
    }

    async uploadUserAvatar(data: FormData, user: User) {
        const url = this.apiUrl + `/users/${user.userId}/upload-user-image`;
        return this.httpClient.post(url, data, {
            observe: `response`
        }).toPromise();
    }

    async uploadUserBackground(data: FormData, user: User) {
        const url = this.apiUrl + `/users/${user.userId}/upload-user-background`;
        return this.httpClient.post(url, data, {
            observe: `response`,
        }).toPromise();
    }

    getUploadedAvatar(imagePath: string): Observable<Blob> {
        const url = this.apiUrl + `/users/avatar/${imagePath}`;
        return this.httpClient.get(url, { responseType: `blob` });
    }

    getUploadedBackground(imagePath: string): Observable<Blob> {
        const url = this.apiUrl + `/users/background/${imagePath}`;
        return this.httpClient.get(url, { responseType: `blob` });
    }

    /* -------------------------------------------------------------------------- */
    /*                                   PLAYER                                   */
    /* -------------------------------------------------------------------------- */
    async getAllPlayers() {
        const url = this.apiUrl + `/players`;
        return this.httpClient.get<Player[]>(url, { withCredentials: true }).toPromise();
    }

    async createPlayer(player: CreatePlayerInput) {
        const url = this.apiUrl + `/players`;
        return this.httpClient.post(url, player, { withCredentials: true }).toPromise();
    }

    async getPlayerById(id: number) {
        const url = this.apiUrl + `/players/${id}`;
        return this.httpClient.get<Player>(url, { withCredentials: true }).toPromise();
    }


    /* -------------------------------------------------------------------------- */
    /*                                 TOURNAMENTS                                */
    /* -------------------------------------------------------------------------- */
    async getAllTournaments(status: string) {
        const url = this.apiUrl + `/tournaments`;
        return this.httpClient.get<Tournament[]>(url, { params: { status }}).toPromise();
    }

    async getTournamentById(id: number) {
        const url = this.apiUrl + `/tournaments/${id}`;
        return this.httpClient.get<Tournament>(url, { withCredentials: true }).toPromise();
    }

    async createTournament(input: CreateTournamentInput) {
        const url = this.apiUrl + `/tournaments`;
        input = omit(input, [`prize`, `gamesPreset`]);
        return this.httpClient.post<Tournament>(url, input, { withCredentials: true }).toPromise();
    }

    async addPrize(input: AddPrizeInput) {
        const url = this.apiUrl + `/tournaments/${input.tournamentId}/prizes`;
        input = omit(input, [`tournamentId`]);
        return this.httpClient.post<Prize>(url, input, { withCredentials: true }).toPromise();
    }

    async registerTeamForTournament(input: RegisterForTournamentInput, tournamentId: number) {
        const url = this.apiUrl + `/tournaments/${tournamentId}/teams`;
        input = omit(input, [`tournamentId`]);
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

    async getTournamentTeams(tournamentId: number) {
        const url = this.apiUrl + `/tournaments/${tournamentId}/teams`;
        return this.httpClient.get<TournamentTeam[]>(url, { withCredentials: true }).toPromise();
    }

    async getTournamentAdmins(tournamentId: number) {
        const url = this.apiUrl + `/tournaments/${tournamentId}/admins`;
        return this.httpClient.get<User[]>(url, { withCredentials: true }).toPromise();
    }

    async createTournamentAdmin(tournamentId: number, userId: number) {
        const url = this.apiUrl + `/tournaments/${tournamentId}/admins`;
        return this.httpClient.post<TournamentAdmin>(url, { userId }, { withCredentials: true }).toPromise();
    }

    async getAdminsToInvite(tournamentId: number) {
        const url = this.apiUrl + `/tournaments/${tournamentId}/admins/available`;
        return this.httpClient.get<User[]>(url, { withCredentials: true }).toPromise();
    }

    async getTournamentMatches(tournamentId: number, status: string) {
        const url = this.apiUrl + `/tournaments/${tournamentId}/matches`;
        return this.httpClient.get<Match[]>(url, { withCredentials: true, params: { status } }).toPromise();
    }

    async checkInTorunament(tournamentId: number, teamId: number) {
        const url = this.apiUrl + `/tournaments/${tournamentId}/teams/${teamId}`;
        return this.httpClient.post(url, {}, { withCredentials: true, observe: `response` }).toPromise();
    }

    async uploadTournamentAvatar(data: FormData, tournamentId: number) {
        const url = this.apiUrl + `/tournaments/upload-tournament-image/${tournamentId}`;
        return this.httpClient.post(url, data, {
            observe: `response`,
            withCredentials: true,
        }).toPromise();
    }

    async uploadTournamentBackground(data: FormData, tournamentId: number) {
        const url = this.apiUrl + `/tournaments/upload-tournament-background/${tournamentId}`;
        return this.httpClient.post(url, data, {
            observe: `response`,
            withCredentials: true,
        }).toPromise();
    }

    getUploadedTournamentAvatar(imagePath: string): Observable<Blob> {
        const url = this.apiUrl + `/tournaments/tournament-profile/${imagePath}`;
        return this.httpClient.get(url, { responseType: `blob` });
    }

    getUploadedTournamentBackground(imagePath: string): Observable<Blob> {
        const url = this.apiUrl + `/tournaments/tournament-background/${imagePath}`;
        return this.httpClient.get(url, { responseType: `blob` });
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

    async updateTeam(teamId: number ,input: UpdateTeamInput) {
        const url = this.apiUrl + `/teams/${teamId}`;
        return this.httpClient.patch<Team>(url, input, { observe: `response`, withCredentials: true }).toPromise();
    }

    async deleteTeam(teamId: number) {
        const url = this.apiUrl + `/teams/${teamId}`;
        return this.httpClient.delete<Team>(url, { observe: `response` }).toPromise();
    }

    async uploadTeamAvatar(data: FormData, teamId: number) {
        const url = this.apiUrl + `/teams/upload-team-image/${teamId}`;
        return this.httpClient.post(url, data, {
            observe: `response`,
            withCredentials: true,
        }).toPromise();
    }

    async uploadTeamBackground(data: FormData, teamId: number) {
        const url = this.apiUrl + `/teams/upload-team-background/${teamId}`;
        return this.httpClient.post(url, data, {
            observe: `response`,
            withCredentials: true,
        }).toPromise();
    }

    getUploadedTeamAvatar(imagePath: string): Observable<Blob> {
        const url = this.apiUrl + `/teams/team-profile/${imagePath}`;
        return this.httpClient.get(url, { responseType: `blob` });
    }

    getUploadedTeamBackground(imagePath: string): Observable<Blob> {
        const url = this.apiUrl + `/teams/team-background/${imagePath}`;
        return this.httpClient.get(url, { responseType: `blob` });
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

    /* -------------------------------------------------------------------------- */
    /*                                 SUSPENSIONS                                */
    /* -------------------------------------------------------------------------- */
    async getSuspensionsFiltered(params: GetSuspensionsParams) {
        const url = this.apiUrl + `/suspensions`;
        return this.httpClient.get<Suspension[]>(url, { withCredentials: true, params: { ...params }}).toPromise();
    }

    async createSuspension(input: CreateSuspensionInput) {
        const url = this.apiUrl + `/suspensions`;
        return this.httpClient.post<Suspension>(url, input, { withCredentials: true }).toPromise();
    }

    async updateSuspension(input: UpdateSuspensionInput, suspensionId: number) {
        const url = this.apiUrl + `/suspensions/${suspensionId}`;
        return this.httpClient.patch<Suspension>(url, input, { withCredentials: true }).toPromise();
    }

    /* -------------------------------------------------------------------------- */
    /*                                   REPORTS                                  */
    /* -------------------------------------------------------------------------- */
    async createReport(userId: number, description: string) {
        const url = this.apiUrl + `/reports`;
        return this.httpClient.post<Report[]>(url, { userId, description }, { withCredentials: true }).toPromise();
    }

    async getReportsFiltered(input: GetReportsFilteredInput) {
        const url = this.apiUrl + `/reports`;
        return this.httpClient.get<Report[]>(url, { withCredentials: true, params: { ...input }}).toPromise();
    }

    async getReportById(reportId: number) {
        const url = this.apiUrl + `/reports/${reportId}`;
        return this.httpClient.get<Report>(url, { withCredentials: true }).toPromise();
    }

    async updateReport(status: string, reportId: number) {
        const url = this.apiUrl + `/reports/${reportId}`;
        return this.httpClient.patch<Report>(url, { status } ,{ withCredentials: true }).toPromise();
    }

    /* -------------------------------------------------------------------------- */
    /*                                   FORMAT                                   */
    /* -------------------------------------------------------------------------- */
    async getFormats() {
        const url = this.apiUrl + `/formats`;
        return this.httpClient.get<Format[]>(url, { withCredentials: true }).toPromise();
    }


}
