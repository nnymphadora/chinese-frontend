import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.API_URL;

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: User) {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  isLoggedIn() {
    const token = localStorage.getItem('chinese-token');
    if (token) return true;
    return false;
  }

  getTokenData() {
    const token = localStorage.getItem('chinese-token');

    if (!token) return null;
    const tokenParts = token.split('.');
    const userDataPart = JSON.parse(window.atob(tokenParts[1]));

    return userDataPart;
  }
  constructor(private http: HttpClient) {}
}
