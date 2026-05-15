import { Routes } from "@angular/router";
import { ChatComponent } from "./chat-component/chat-component";
import { ImageGeneratorComponent } from "./image-generator-component/image-generator-component";
import { AudioToTextComponent } from "./audio-to-text-component/audio-to-text-component";
import { DashboardComponent } from "./dashboard-component/dashboard-component";

export const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: '', redirectTo: 'chat', pathMatch: 'full'
      },
      {
        path: 'chat', component: ChatComponent
      },
      {
        path: 'image-generator', component: ImageGeneratorComponent
      },
      {
        path: 'speech-to-text', component: AudioToTextComponent
      }

    ]
  }

]
