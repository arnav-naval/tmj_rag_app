import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chat-messages',
  imports: [],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent {
  messages = input([]);
}
