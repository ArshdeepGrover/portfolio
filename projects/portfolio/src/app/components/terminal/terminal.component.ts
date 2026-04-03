import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss']
})
export class TerminalComponent implements OnInit {
  @ViewChild('termInput') termInput!: ElementRef;
  
  isOpen = false;
  history: string[] = [
    'Welcome to ArshOS v1.0.0',
    'Type "help" for a list of commands.'
  ];
  currentInput = '';
  
  private availableCommands = ['help', 'whoami', 'ls', 'pwd', 'date', 'clear', 'exit', 'sudo', 'echo', 'cd'];
  private availableDirs = ['hero', 'experience', 'skills', 'projects', 'certificates', 'blogs', 'contact'];

  constructor(private router: Router) {}

  ngOnInit() {}

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // CMD+K or backtick to toggle terminal
    if ((event.metaKey && event.key === 'k') || event.key === '`') {
      event.preventDefault();
      this.toggleTerminal();
    } else if (event.key === 'Escape' && this.isOpen) {
      event.preventDefault();
      this.toggleTerminal();
    }
  }

  toggleTerminal() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      setTimeout(() => this.termInput?.nativeElement.focus(), 100);
    }
  }

  onInputKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault(); // Prevent shifting focus away from input
      this.handleAutoComplete();
    } else if ((event.metaKey || event.ctrlKey) && event.key === 'l') {
      event.preventDefault(); // Prevent browser default (e.g., focusing URL bar)
      this.history.length = 0; // Clear history
    }
  }

  handleAutoComplete() {
    const input = this.currentInput.toLowerCase();
    if (!input) return;

    if (input.startsWith('cd ')) {
      const dirInput = input.substring(3);
      const matches = this.availableDirs.filter(d => d.startsWith(dirInput));
      if (matches.length === 1) {
        this.currentInput = 'cd ' + matches[0];
      } else if (matches.length > 1) {
        // Output options if multiple matches exist, just like real terminal
        this.history.push(`guest@arshdeep:~$ ${this.currentInput}`);
        this.history.push(matches.join('  '));
      }
    } else {
      const matches = this.availableCommands.filter(c => c.startsWith(input));
      if (matches.length === 1) {
        const needsSpace = ['cd', 'echo', 'sudo'].includes(matches[0]);
        this.currentInput = matches[0] + (needsSpace ? ' ' : '');
      } else if (matches.length > 1) {
        this.history.push(`guest@arshdeep:~$ ${this.currentInput}`);
        this.history.push(matches.join('  '));
      }
    }
    
    // Auto-scroll to bottom if autocomplete printed options
    setTimeout(() => {
        const termWindow = document.getElementById('terminal-window');
        if (termWindow) termWindow.scrollTop = termWindow.scrollHeight;
    }, 50);
  }

  executeCommand() {
    const cmd = this.currentInput.trim();
    if (!cmd) return;
    
    this.history.push(`guest@arshdeep:~$ ${cmd}`);
    this.processCommand(cmd.toLowerCase());
    this.currentInput = '';
    
    // Auto-scroll to bottom
    setTimeout(() => {
        const termWindow = document.getElementById('terminal-window');
        if (termWindow) termWindow.scrollTop = termWindow.scrollHeight;
    }, 50);
  }

  private processCommand(cmd: string) {
    switch (cmd) {
      case 'help':
        this.history.push('Available commands:');
        this.history.push('  whoami     - displays current user info');
        this.history.push('  ls         - lists portfolio sections');
        this.history.push('  pwd        - print working directory');
        this.history.push('  cd <dir>   - navigate to a section (e.g. cd projects)');
        this.history.push('  echo <txt> - write arguments to the standard output');
        this.history.push('  date       - display current date and time');
        this.history.push('  sudo       - execute a command as superuser');
        this.history.push('  clear      - clear terminal output');
        this.history.push('  exit       - close the terminal');
        break;
      case 'whoami':
        this.history.push('guest_user');
        break;
      case 'ls':
        this.history.push('hero/  experience/  skills/  projects/  certificates/  blogs/  contact.js');
        break;
      case 'pwd':
        this.history.push('/Users/guest/portfolio');
        break;
      case 'date':
        this.history.push(new Date().toString());
        break;
      case 'clear':
        this.history.length = 0;
        break;
      case 'exit':
        this.toggleTerminal();
        break;
      default:
        if (cmd.startsWith('sudo ')) {
          this.history.push('arshdeep is not in the sudoers file. This incident will be reported.');
        } else if (cmd.startsWith('echo ')) {
          this.history.push(cmd.substring(5));
        } else if (cmd.startsWith('cd ')) {
          const dir = cmd.split(' ')[1];
          const validDirs = ['hero', 'experience', 'skills', 'projects', 'certificates', 'blogs'];
          if (validDirs.includes(dir)) {
            this.history.push(`Navigating to /${dir}...`);
            this.router.navigate(['/']).then(() => {
                setTimeout(() => {
                    const el = document.getElementById(dir);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    this.toggleTerminal();
                }, 100);
            });
          } else if (dir === 'contact' || dir === 'contact.js') {
            this.history.push('Navigating to /contact...');
            this.router.navigate(['/contact']);
            this.toggleTerminal();
          } else {
             this.history.push(`cd: no such file or directory: ${dir}`);
          }
        } else {
          this.history.push(`command not found: ${cmd}`);
        }
    }
  }
}
