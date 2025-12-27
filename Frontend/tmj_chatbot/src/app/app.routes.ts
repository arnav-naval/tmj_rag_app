import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatOverviewComponent } from './chat/chat-overview/chat-overview.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'chat',
    component: ChatOverviewComponent
  },
];
