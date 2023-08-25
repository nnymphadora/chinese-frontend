import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsletterSub } from '../models/NewsletterSub';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class NewsletterSubService {
  apiUrl = environment.API_URL;
  getAllSubscribedEmails() {
    return this.http.get<NewsletterSub[]>(`${this.apiUrl}/newsletter`);
  }
  insertSubscribedEmail(sub: NewsletterSub) {
    return this.http.post<NewsletterSub>(`${this.apiUrl}/newsletter`, sub);
  }
  constructor(private http: HttpClient) {}
}
