import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'home', component: ChatComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect root to /home
  { path: '**', redirectTo: '/home' }, // Redirect unknown paths to /home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
