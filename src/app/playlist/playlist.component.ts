import { Component } from '@angular/core';
import { Playlist, Track } from '../types';
import { PlayerService } from '../player.service';

/**
 * Playlist component.
 */
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent {
  
  private currentTrack: Track | null = null;

  /**
   * @param playerService Player service.
   */
  public constructor(
    private playerService: PlayerService,
  ) {
    this.playerService.nowPlaying().subscribe(x => this.currentTrack = x);
  }

  /**
   * Tracks' list.
   */
  get tracks(): Playlist {
    return this.playerService.playlist;
  }

  /**
   * Play track at given index.
   * 
   * @param index track's index.
   */
  play(index: number) {
    this.playerService.play(index);
  }

  /**
   * Drop track at given index.
   * 
   * @param index track's index.
   */
  remove(index: number) {
      URL.revokeObjectURL(this.playerService.playlist[index].url);
      this.playerService.remove(index);
  }

  /**
   * Download track.
   * 
   * @param track track to download.
   */
  download(track: Track) {
    const a = document.createElement('a');
    a.href = track.url;
    a.click();
  }

  /**
   * Create style for track element.
   * 
   * @param track track for which to create style.
   * @returns style object.
   */
  trackStyle(track: Track) {
    return {
      'font-weight': this.isCurrent(track) ? 'bold' : undefined,
      'text-decoration': track.error ? 'line-through' : undefined,
    };
  }

  /**
   * @param track a given track.
   * 
   * @returns whether the given track is the one being played now.
   */
  private isCurrent(track: Track): boolean {
    return this.currentTrack === track;
  }
}
