import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  private apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(private http: HttpClient) {}

  generateResponse(prompt: string): Observable<string> {
    const apiKey = environment.geminiApiKey;

    if (!apiKey) {
      console.error('Gemini API key is missing');
      return of('Sorry, I cannot process your request at the moment.');
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const payload = {
      contents: [
        {
          parts: [
            {
              text: `You are a helpful assistant for Arshdeep Singh's portfolio website. 
                 Answer questions about Arshdeep's skills, experience, and projects based on the portfolio content.
                 Keep responses concise and friendly. If you don't know something specific, suggest checking relevant portfolio sections.
                 
                 User question: ${prompt}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 150,
      },
    };

    return this.http
      .post(`${this.apiUrl}?key=${apiKey}`, payload, { headers })
      .pipe(
        map((response: any) => {
          if (response.candidates && response.candidates.length > 0) {
            return response.candidates[0].content.parts[0].text;
          }
          return "I apologize, but I couldn't generate a response. Please try again.";
        }),
        catchError((error) => {
          console.error('Error calling Gemini API:', error);
          return of(
            'Sorry, I encountered an error processing your request. Please try again later.'
          );
        })
      );
  }
}
