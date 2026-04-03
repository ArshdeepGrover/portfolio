import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../services/chat.service';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  
  isOpen = false;
  messages: ChatMessage[] = [];
  newMessage = '';
  isTyping = false;

  suggestions = [
    'What are your top skills?',
    'Tell me about your projects',
    'How to connect?'
  ];

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.messages = this.chatService.getMessages();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      // Initialize with greeting
      this.chatService.addBotMessage("Hi! I'm Arshdeep's AI assistant. You can ask me anything about his experience, skills, or projects!");
    }
  }

  sendSuggestion(suggestion: string) {
    this.newMessage = suggestion;
    this.sendMessage();
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    
    const userMsg = this.newMessage;
    this.chatService.addUserMessage(userMsg);
    this.newMessage = '';
    
    this.isTyping = true;
    
    this.chatService.mockResponse(userMsg).then(response => {
      this.isTyping = false;
      this.chatService.addBotMessage(response);
    });
  }
}
