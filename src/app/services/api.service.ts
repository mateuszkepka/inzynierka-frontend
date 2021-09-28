import { LogInInput, RegisterInput } from "../shared/interfaces/register-input.interface";

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
        return this.httpClient.post(url, input, {withCredentials: true});
    }
}
