import { Injectable, signal } from '@angular/core';
import { ChatMessage } from '../models/chat_model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //Messages global state is kept in this service
  messages = signal<ChatMessage[]>([]);

  sendMessage(text: string) {
    const newMsg: ChatMessage = {
      id: crypto.randomUUID(),
      content: text,
      role: 'user',
    };

    this.messages.update(msgs => [...msgs, newMsg]);
    console.log(this.messages());
  }

  resetMessages() {
    this.messages.set([]);
  }
}
