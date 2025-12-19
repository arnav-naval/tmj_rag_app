import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent {
  messages = signal<Message[]>([
    {
      text: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  inputText = signal('');

  sendMessage(): void {
    const text = this.inputText().trim();
    if (!text) return;

    // Add user message
    this.messages.update(msgs => [
      ...msgs,
      {
        text,
        sender: 'user',
        timestamp: new Date()
      }
    ]);

    // Clear input
    this.inputText.set('');

    // TODO: Add bot response logic here when API is integrated
  }

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputText.set(target.value);
  }
}

