import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { projects } from '../stores/projects_store';
import { skillCategories } from '../stores/skills_store';
import { experiences } from '../stores/experience_store';

export interface ChatMessage {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

import { marked } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private messages: ChatMessage[] = [];
  private http = inject(HttpClient);

  constructor() {
    // Configure marked for safe, simple rendering
    marked.setOptions({
      breaks: true,
      gfm: true
    });
  }

  getMessages() {
    return this.messages;
  }

  addBotMessage(text: string) {
    this.messages.push({ text, isBot: true, timestamp: new Date() });
  }

  addUserMessage(text: string) {
    this.messages.push({ text, isBot: false, timestamp: new Date() });
  }

  async mockResponse(userMessage: string): Promise<string> {
    const API_KEY = 'AIzaSyDhvhHLoDYhQltvbPNJrgpBR1RjjZj7dP0';
    
    // Dynamically list the real projects from the store for the AI's context
    const projectList = projects.slice(0, 5).map((p: any) => `- **${p.title}**: ${p.description}`).join('\n');
    const skillsList = skillCategories.map((c: any) => `* **${c.name}**: ${c.skills.map((s: any) => s.name).join(', ')}`).join('\n');

    const systemInstruction = `You are a highly intelligent AI assistant for Arshdeep Singh's interactive portfolio. 
Use this REAL data to answer:

PROJECTS:
${projectList}

SKILLS:
${skillsList}

GUIDELINES:
- **FORMATTING IS KEY**: Use standard Markdown (e.g., **bold**, *italic*, - lists). 
- Keep responses concise and friendly.
- Use bullet points for lists to keep things readable.
- If they ask for contact/hire info, ALWAYS include this exact link:
"You can connect with Arshdeep via his [Official Links Page!](https://links.arshdeepgrover.dev)"`;

    try {
      // Direct REST API Call to Gemini 2.5 Flash
      const response = await firstValueFrom(
        this.http.post<any>(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
          {
            system_instruction: {
              parts: [{ text: systemInstruction }]
            },
            contents: [{ parts: [{ text: userMessage }] }]
          }
        )
      );
      
      const rawText = response.candidates[0].content.parts[0].text;
      
      // Convert Markdown to HTML for beautiful rendering
      return marked.parse(rawText) as string;
    } catch (error: any) {
      console.warn("Direct Gemini API call failed. Falling back to local JS matching.", error.message);
      return this.executeFallbackLogic(userMessage);
    }
  }

  private executeFallbackLogic(userMessage: string): Promise<string> {
    const query = userMessage.toLowerCase();
    
    return new Promise(resolve => {
      setTimeout(() => {
        if (query.includes('project')) {
            const projectNames = projects.map(p => p.title).join(', ');
            resolve(`Arshdeep has worked on some amazing projects including: ${projectNames}. You can check them out in the Projects section!`);
        } else if (query.includes('skill') || query.includes('tech') || query.includes('angular') || query.includes('react')) {
            const frontendCat = skillCategories.find((s: any) => s.name === 'Frontend Development');
            const frontendSkills = frontendCat?.skills.map((i: any) => i.name).join(', ');
            if (frontendSkills) {
              resolve(`Arshdeep is highly skilled in frontend development, especially with ${frontendSkills}. He's a master of styling and interactive web apps.`);
            } else {
              resolve(`Arshdeep is highly skilled in frontend development! Check out the skills section for more.`);
            }
        } else if (query.includes('experience') || query.includes('work') || query.includes('job')) {
            const jobs = experiences.map(e => `${e.role} at ${e.company}`).join(' and ');
            resolve(`Arshdeep has awesome experience working as a ${jobs}.`);
        } else if (query.includes('contact') || query.includes('hire') || query.includes('email') || query.includes('connect')) {
            resolve(`You can connect with Arshdeep via his <a href="https://links.arshdeepgrover.dev" target="_blank" class="text-orange-500 font-bold underline hover:text-orange-600">Contact Page!</a>`);
        } else {
            resolve(`I am the local fallback! The Gemini API call failed for some reason.`);
        }
      }, 1000); 
    });
  }
}
