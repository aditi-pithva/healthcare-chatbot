import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent {
  messages: { sender: string; text: string; timestamp: Date }[] = [];
  userInput: string = '';
  isTyping: boolean = false; // To show a "Bot is typing..." indicator

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    const userMessage = { sender: 'user', text: this.userInput, timestamp: new Date() };
    this.messages.push(userMessage);

    this.isTyping = true; // Show typing indicator

    this.chatService.sendMessage('test_user', this.userInput).subscribe(
      (responses) => {
        this.isTyping = false;
        responses.forEach((response: any) => {
          this.messages.push({
            sender: 'bot',
            text: response.text,
            timestamp: new Date(),
          });
        });
      },
      (error) => {
        this.isTyping = false;
        console.error('Error sending message:', error);
      }
    );

    this.userInput = ''; // Clear input field
  }
}