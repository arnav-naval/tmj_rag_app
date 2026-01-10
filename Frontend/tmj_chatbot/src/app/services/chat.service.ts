import { Injectable, signal, inject } from '@angular/core';
import { UiChatMessage } from '../models/chat_model';
import { ChatApi } from '../api/chat.api';
import type { ChatRequest, ChatResponse } from '../models/chat_model';
import { finalize } from 'rxjs';    

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //Messages global state is kept in this service
  private api = inject(ChatApi);

  readonly messages = signal<UiChatMessage[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  
  chatWithAssistant(text: string): void {
    this.error.set(null);
    this.loading.set(true);

    const userMsg: UiChatMessage = {
      id: crypto.randomUUID(),
      content: text,
      role: 'user',
    };

    this.messages.update(msgs => [...msgs, userMsg]);

    const req: ChatRequest = {
      messages: this.messages().map(({ id, ...msg }) => msg)
    };

    this.api.chat(req)
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({
        next: (res: ChatResponse) => {
          this.messages.update(msgs => [...msgs, res.answer]);
        },
        error: err => {
          this.error.set(err.message ?? 'An error occured in chat request.');
        }
    });
  } 


  resetMessages() {
    this.messages.set([]);
  }
}
