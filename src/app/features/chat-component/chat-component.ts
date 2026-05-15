import { Component, inject, signal } from '@angular/core';
import { AiService } from '../../core/services/ai-service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { marked } from 'marked';

@Component({
  selector: 'app-chat-component',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './chat-component.html',
  styleUrl: './chat-component.scss',
})
export class ChatComponent {

  private aiSer = inject(AiService);

  public chatData = new FormControl('');

  public chat = signal('');
  public chatResponse = signal('');

  chatHistoryData = signal<{ user: 'bot' | 'user', res: string | null }[]>([]);



  submit() {
    if (this.chatData.value) {

      this.chatHistoryData.update((item) => [...item, { user: 'user', res: this.chatData.value }])
      this.aiSer.getAiResponse(this.chatData.value).subscribe({
        next: (res: any) => {
          this.chatHistoryData.update((item) => [...item, { user: 'bot', res: marked(res.resp) as string }])
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.chatData.reset();
    }
  }

  autoResize(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    const maxHeight = 150;
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }


  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }



}
