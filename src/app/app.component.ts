import { Component } from '@angular/core';
import { Track } from './types';
import { PlayerService } from './player.service';

/**
 * Application component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Component contractor.
   * 
   * @param playerService Player service.
   */
  public constructor(
    private playerService: PlayerService,
  ) {}


  /**
   * Handler that is triggered when a new track is added.
   * 
   * @param track newly added track.
   */
  onTrackAdded(track: Track) {
    this.playerService.add(track);
  }
}
