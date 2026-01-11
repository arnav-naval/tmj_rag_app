import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ChatRequest, ChatResponse } from '../models/chat_model';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root' 
})
export class ChatApi {
  private http = inject(HttpClient);

  chat(body: ChatRequest): Observable<ChatResponse> {
    return this.http.post<ChatResponse>('http://localhost:8000/chat', body);
  }
}