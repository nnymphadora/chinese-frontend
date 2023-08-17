import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsletterSub } from '../models/NewsletterSub';

@Injectable({
  providedIn: 'root',
})
export class NewsletterSubService {
  getAllSubscribedEmails() {
    return this.http.get<NewsletterSub[]>('http://localhost:3000/newsletter');
  }
  insertSubscribedEmail(sub: NewsletterSub) {
    return this.http.post<NewsletterSub>(
      'http://localhost:3000/newsletter',
      sub
    );
  }
  constructor(private http: HttpClient) {}
}
