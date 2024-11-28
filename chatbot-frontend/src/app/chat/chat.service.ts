import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = environment.rasaApiUrl;

  constructor(private http: HttpClient) {}

  sendMessage(sender: string, message: string): Observable<any> {
    const body = { sender, message };
    return this.http.post<any>(this.apiUrl, body);
  }
}
