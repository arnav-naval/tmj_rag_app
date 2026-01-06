import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-input',
  imports: [ ReactiveFormsModule],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css'
})
export class ChatInputComponent {
  chatService = inject(ChatService);
  
  messageControl = new FormControl('', [Validators.required]);

  send() {
    if (this.messageControl.invalid) return;

    const text = this.messageControl.value!;
    console.log('Sending via reactive form:', text);
    this.chatService.sendMessage(text.trim());
    this.messageControl.reset();
  }

}
