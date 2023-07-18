import { Component } from '@angular/core';
import { PlayerService } from '../player.service';
import { Track } from '../types';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {

  constructor(
    private playerService: PlayerService,
  ) {}

  get tracks() {
    return this.playerService.playlist;
  }

  remove(index: number) {
    this.playerService.remove(index);
  }

  play(index: number) {
    this.playerService.play(index);
  }

  isCurrentTrack(track: Track) {
    return this.playerService.currentTrack === track;
  }
}
