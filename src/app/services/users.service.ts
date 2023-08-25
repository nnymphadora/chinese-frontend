import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = environment.API_URL;

  getAllUsernames() {
    return this.http.get<string[]>(`${this.apiUrl}/users`);
  }

  constructor(private http: HttpClient) {}
}
