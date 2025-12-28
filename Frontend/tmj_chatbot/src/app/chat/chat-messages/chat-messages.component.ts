import { Component, input } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-messages',
  imports: [ ChatMessageComponent],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent {
  messages = input(["not empty"]);
}
