import { Component, inject, input, signal } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { ChatMessage } from '../../models/chat_model';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-messages',
  imports: [ ChatMessageComponent ],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.css'
})
export class ChatMessagesComponent {
  chatService = inject(ChatService);
  
  messages = this.chatService.messages;
  // messages = input<ChatMessage[]>([{ content: 'Hello! How can I assist you today?', role: 'bot' },
  //                                  { content: 'I need help with my account.', role: 'user' }, 
  //                                  { content: 'Sure! What seems to be the issue?', role: 'bot' },
  //                                  { content: 'I forgot my password.', role: 'user' },
  //                                  { content: 'You can reset your password by clicking on "Forgot Password" on the login page.', role: 'bot' },
  //                                  { content: 'Thank you!', role: 'user' },
  //                                 { content: 'You\'re welcome! If you have any more questions, feel free to ask.', role: 'bot' },
  //                                 { content: 'Great, thanks for your help!', role: 'user' },
  //                                 { content: 'Anytime! Have a wonderful day!', role: 'bot' }]);
}
