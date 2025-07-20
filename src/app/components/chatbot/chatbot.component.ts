import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from 'app/services/gemini.service';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {
  isChatOpen = false;
  messages: Message[] = [];
  newMessage = '';
  isTyping = false;

  // Local responses based on portfolio content
  localResponses = {
    greeting: [
      "Hi there! I'm Arshdeep's AI assistant. How can I help you today?",
      "Hello! I'm here to answer questions about Arshdeep. What would you like to know?",
    ],
    skills: [
      'Arshdeep is skilled in Angular, TypeScript, JavaScript, HTML5 & CSS3, Tailwind CSS, and SASS/SCSS for frontend development.',
      "For backend, Arshdeep works with Ruby on Rails and Node.js. He's also experienced with PostgreSQL, MySQL, MongoDB, and Firebase.",
      "Arshdeep uses tools like Git, GitLab, Postman, and Ubuntu. He's also proficient with Google Analytics, Google Tag Manager, and Schema.org.",
    ],
    frontend: [
      "Arshdeep's frontend skills include Angular, TypeScript, JavaScript (ES6+), HTML5 & CSS3, Tailwind CSS, and SASS/SCSS.",
    ],
    backend: [
      "Arshdeep's backend skills include Ruby on Rails (advanced) and Node.js.",
    ],
    database: [
      'Arshdeep works with PostgreSQL, MySQL, MongoDB, RDBMS concepts, AWS, and Firebase for database and cloud solutions.',
    ],
    tools: [
      'Arshdeep uses Git & GitHub, GitLab, Postman, and Ubuntu for development and DevOps.',
    ],
    analytics: [
      'Arshdeep is experienced with Google Analytics, Google Tag Manager, Schema.org, and Sentry for analytics and marketing.',
    ],
    experience: [
      'Arshdeep has experience in full-stack web development, focusing on Angular and Ruby on Rails. Check out the Experience section for details.',
    ],
    contact: [
      'You can contact Arshdeep through the contact form on this site. Just scroll to the Contact section!',
    ],
    projects: [
      'Arshdeep has worked on various web applications using Angular, Ruby on Rails, and other technologies. Check out the Projects section to see them!',
    ],
    default: [
      "That's an interesting question! You might find more information in the relevant section of the portfolio.",
      "I'd be happy to help with that. Could you check the portfolio sections for more details?",
      'Great question! Arshdeep has expertise in that area. Check out the portfolio for specifics.',
    ],
  };

  // Fallback responses when API is not available
  fallbackResponses = {
    greeting: [
      "Hi there! I'm Arshdeep's AI assistant powered by Gemini. How can I help you today?",
      "Hello! I'm here to answer questions about Arshdeep using AI. What would you like to know?",
    ],
    default: [
      "I'm having trouble connecting to my AI brain. Please try again later.",
      'Sorry, my AI capabilities are limited at the moment. Please check the portfolio sections for information.',
    ],
  };

  constructor(private geminiService: GeminiService) {}

  ngOnInit() {
    // Add initial greeting message with slight delay to simulate bot typing
    setTimeout(() => {
      this.addBotMessage(this.localResponses.greeting[0]);
    }, 500);
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;

    // If opening chat and no messages, add greeting
    if (this.isChatOpen && this.messages.length === 0) {
      setTimeout(() => {
        this.addBotMessage(this.localResponses.greeting[0]);
      }, 500);
    }
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    // Add user message
    this.messages.push({
      text: this.newMessage,
      isBot: false,
      timestamp: new Date(),
    });

    const userMessage = this.newMessage.toLowerCase();
    this.newMessage = '';

    // Show typing indicator
    this.isTyping = true;

    // Process message and respond with delay to simulate typing
    setTimeout(() => {
      this.isTyping = false;
      this.respondToMessage(userMessage);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  }

  respondToMessage(message: string) {
    // For development/demo purposes, use local responses instead of API
    // Remove this condition and use only the API in production
    const useLocalResponses = false;

    if (useLocalResponses) {
      this.handleLocalResponse(message);
      return;
    }

    // Use Gemini AI to generate a response
    this.geminiService.generateResponse(message).subscribe(
      (response) => {
        this.isTyping = false;
        this.addBotMessage(response);
      },
      (error) => {
        console.error('Error getting AI response:', error);
        this.isTyping = false;
        this.handleLocalResponse(message);
      }
    );
  }

  addBotMessage(text: string) {
    this.messages.push({
      text: text,
      isBot: true,
      timestamp: new Date(),
    });
  }

  handleLocalResponse(message: string) {
    let responseType = 'default';
    message = message.toLowerCase();

    // Keyword matching based on portfolio content
    if (
      message.includes('hi') ||
      message.includes('hello') ||
      message.includes('hey')
    ) {
      responseType = 'greeting';
    } else if (
      message.includes('skill') ||
      message.includes('know') ||
      message.includes('tech') ||
      message.includes('stack')
    ) {
      responseType = 'skills';
    } else if (
      message.includes('frontend') ||
      message.includes('angular') ||
      message.includes('typescript') ||
      message.includes('javascript') ||
      message.includes('html') ||
      message.includes('css') ||
      message.includes('tailwind') ||
      message.includes('sass')
    ) {
      responseType = 'frontend';
    } else if (
      message.includes('backend') ||
      message.includes('ruby') ||
      message.includes('rails') ||
      message.includes('node')
    ) {
      responseType = 'backend';
    } else if (
      message.includes('database') ||
      message.includes('sql') ||
      message.includes('postgres') ||
      message.includes('mysql') ||
      message.includes('mongo') ||
      message.includes('firebase')
    ) {
      responseType = 'database';
    } else if (
      message.includes('tool') ||
      message.includes('git') ||
      message.includes('github') ||
      message.includes('gitlab') ||
      message.includes('postman') ||
      message.includes('ubuntu')
    ) {
      responseType = 'tools';
    } else if (
      message.includes('analytics') ||
      message.includes('google') ||
      message.includes('tag') ||
      message.includes('schema') ||
      message.includes('sentry')
    ) {
      responseType = 'analytics';
    } else if (
      message.includes('experience') ||
      message.includes('work') ||
      message.includes('job')
    ) {
      responseType = 'experience';
    } else if (
      message.includes('contact') ||
      message.includes('email') ||
      message.includes('reach')
    ) {
      responseType = 'contact';
    } else if (
      message.includes('project') ||
      message.includes('portfolio') ||
      message.includes('built')
    ) {
      responseType = 'projects';
    }

    this.addBotMessage(this.getLocalResponse(responseType));
  }

  getLocalResponse(type: string): string {
    const responses =
      this.localResponses[type as keyof typeof this.localResponses] ||
      this.localResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getFallbackResponse(type: string): string {
    const responses =
      this.fallbackResponses[type as keyof typeof this.fallbackResponses] ||
      this.fallbackResponses.default;
    return responses[Math.floor(Math.random() * responses.length)];
  }
}
