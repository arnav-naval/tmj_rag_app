import { Component } from '@angular/core';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { ChatMessagesComponent } from '../chat-messages/chat-messages.component';

@Component({
  selector: 'app-chat-overview',
  imports: [ ChatHeaderComponent, ChatMessagesComponent ],
  templateUrl: './chat-overview.component.html',
  styleUrl: './chat-overview.component.css'
})
export class ChatOverviewComponent {

}
