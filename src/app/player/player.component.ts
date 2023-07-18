import { Component } from '@angular/core';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  constructor(
    private playerService: PlayerService,
  ) {}

  get currentTrack() {
    return this.playerService.currentTrack;
  }

  get isPaused() {
    return this.playerService.isPaused;
  }

  get progress(): number {
    return this.playerService.progress || 0;
  }

  togglePlay() {
    this.isPaused ? this.playerService.resume() : this.playerService.pause();
  }

  onProgressClick(event: MouseEvent) {
    if (!(event.target instanceof HTMLElement)) {
      console.error(`${event.target} is not html element`);
      return;
    }
    const rect = event.target.getBoundingClientRect();
    const ratio = (event.x - rect.left) / rect.width;
    this.playerService.seek(ratio);
  }

}
