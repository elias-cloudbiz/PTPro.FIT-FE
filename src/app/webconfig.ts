import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class WebConfig {
    public prod = 'https://api.ptpro.fit/api/';
    public local = 'http://localhost:8000/api/';
    public env = this.local;
    public token = '';
    public CSRF = null;

    public getPublicHttpHeaders(): HttpHeaders {
        const headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', 'Bearer ' + this.token);
        return headers;
    }

    public getAuthHttpHeaders(): HttpHeaders {
        let user = localStorage.getItem('JWT');
        if (user) {
            user = JSON.parse(user);
            const access_token = user['api_token'];
            const headers = new HttpHeaders().set('content-type', 'application/json').set('Authorization', 'Bearer ' + access_token);
            return headers;
        }
    }

}
