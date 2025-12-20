import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatHeaderComponent } from './chat/chat-header/chat-header.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'chat',
    component: ChatHeaderComponent
  },
];
