import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Track } from '../types';

/**
 * Add track component.
 */
@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.scss']
})
export class AddTrackComponent {
  /**
   * Track source type.
   */
  trackSourceSelector: 'URL' | 'Local' = 'URL';

  /**
   * Track's URL.
   */
  trackURL: string = "";

  /**
   * Track's file.
   */
  trackFile?: File;

  /**
   * Track added event emitter.
   */
  @Output()
  trackAdded = new EventEmitter<Track>();

  /**
   * Handler of file upload.
   * 
   * @param event File upload event.
   */
  onTrackFileChanged({ target }: Event) {
    if (target instanceof HTMLInputElement) {
      this.trackFile = target.files?.[0];
    }
  }

  /**
   * Add file to the playlist.
   */
  addFile() {
    if (!!this.trackFile) {
      const title = this.trackFile.name;
      const url = URL.createObjectURL(this.trackFile);
      this.trackAdded.emit({ title, url });
    }
  }

  /**
   * Add URL to the playlist.
   */
  addURL() {
    if (!!this.trackURL) {
      const title = this.trackURL;
      const url = this.trackURL;
      this.trackAdded.emit({ title, url });
    }
  }
}
