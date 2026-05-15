import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AiService {

  private http = inject(HttpClient);

  public getAiResponse(prompt: string) {
    return this.http.get(`${environment.apiUrl}ask-ai?prompt=${prompt}`);
  }


}
