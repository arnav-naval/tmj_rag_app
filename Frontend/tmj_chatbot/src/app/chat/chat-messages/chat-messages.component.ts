import { Component, input } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

export interface ChatMessage {
  content: string;
  role: 'user' | 'bot';
}

@Component({
  selector: 'app-chat-messages',
  imports: [ ChatMessageComponent],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent {
  messages = input<ChatMessage[]>([{ content: 'Hello! How can I assist you today?', role: 'bot' }, { content: 'I need help with my account.', role: 'user' }, { content: 'Sure! What seems to be the issue?', role: 'bot' }]);
}
