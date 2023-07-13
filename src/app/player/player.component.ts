import { Component } from '@angular/core';
import { PlayerService } from '../player.service';

/**
 * Player component.
 */
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {
  
  /**
   * Currently playing title.
   */
  title?: string;

  /**
   * Track progress.
   */
  progress = 0;

  /**
   * @param playerService Player service.
   */
  public constructor(
    private playerService: PlayerService,
  ) {
    this.playerService.nowPlaying().subscribe(track => this.title = track?.title);
    this.playerService.progress().subscribe(x => this.progress = x);
  }

  /**
   * Toggle play/pause.
   */
  toggle() {
    this.isPlaying ? this.pause() : this.play();
  }

  /**
   * Denote if music has started.
   */
  get isPlaying(): boolean {
    return this.playerService.isPlaying;
  }

  /**
   * Handler of click on porgress bar.
   * @param event click event.
   */
  onProgressClick(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      const rect = event.target.getBoundingClientRect();
      const ratio = (event.clientX - rect.x) / rect.width;
      this.playerService.seek(ratio);
    }
  }

  private pause() {
    this.playerService.pause();
  }

  private play() {
    this.playerService.play();
  }
}
