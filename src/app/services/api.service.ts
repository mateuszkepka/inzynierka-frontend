import { LogInInput, RegisterInput, User } from "../shared/interfaces/interfaces";

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
        const url = this.apiUrl + `/auth/log-in`;
        return this.httpClient.post(url, input, { withCredentials: true });
    }

    async refreshToken() {
        const url = this.apiUrl + `/auth/refresh`;
        return await this.httpClient.get(url, { withCredentials: true });
    }

    async logOut() {
        const url = this.apiUrl + `/auth/log-out`;
        return this.httpClient.post(url, {}, { withCredentials: true });
    }

    /* -------------------------------------------------------------------------- */
    /*                                    USER                                    */
    /* -------------------------------------------------------------------------- */
    async getUserById(userId: number) {
        const url = this.apiUrl + `/users/${userId}`;
        return this.httpClient.get<User>(url, { withCredentials: true }).toPromise();
    }
}
