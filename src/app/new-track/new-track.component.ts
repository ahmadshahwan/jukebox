import { Component } from '@angular/core';
import { PlayerService } from '../player.service';
import { Track } from '../types';

@Component({
  selector: 'app-new-track',
  templateUrl: './new-track.component.html',
  styleUrls: ['./new-track.component.scss']
})
export class NewTrackComponent {

  trackOption: 'local' | 'url' = 'url';
  trackUrl?: string;
  trackFile?: File;

  constructor(
    private playerService: PlayerService,
  ) {}

  onFileChange({ target }: Event): void {
    if (!(target instanceof HTMLInputElement)) {
      console.error(`${target} is not HTMLInputElement`);
      return;
    }
    this.trackFile = target.files?.[0];
  }

  addUrl() {
    if (!this.trackUrl) {
      console.log("No ULR");
      return;
    }
    const track: Track = {
      title: this.trackUrl.split("/").pop()!,
      url: this.trackUrl,
    }
    this.playerService.add(track);
    this.trackUrl = "";
  }

  addFile(fileInput: HTMLInputElement) {
    if (!this.trackFile) {
      console.log("No file");
      return;
    }
    const track: Track = {
      title: this.trackFile.name,
      url: URL.createObjectURL(this.trackFile),
    }
    this.playerService.add(track);
    fileInput.value = "";
    this.trackFile = undefined;
  }
}
