import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NewTrackComponent } from './new-track/new-track.component';
import { FormsModule } from '@angular/forms';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    NewTrackComponent,
    PlaylistComponent,
    PlayerComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
