import { Injectable } from '@angular/core';
import { Track } from './types';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private readonly _playlist: Track[] = [];
  private readonly audio: HTMLAudioElement = new Audio();
  
  public currentTrack?: Track;
  public progress: number = 0;

  constructor() {
    this.audio.onended = () => this.playNext();
    this.audio.ontimeupdate = () => this.progress = this.audio.currentTime / this.audio.duration;
  }

  get playlist(): readonly Track[] {
    return this._playlist;
  }

  get isPaused(): boolean {
    return this.audio.paused;
  }

  add(track: Track) {
    this._playlist.push(track);
  }

  remove(index: number) {
    this._playlist.splice(index, 1);
  }

  play(index: number) {
    this.currentTrack = this.playlist[index];
    this.audio.src = this.currentTrack.url;
    this.audio.play().catch(() => this.handleError());
  }

  handleError() {
    if (this.currentTrack) {
      this.currentTrack.hasError = true;
    }
    this.playNext();
  }

  private stop() {
    this.currentTrack = undefined;
    this.progress = 0;
  }

  playNext() {
    if (this.playlist.every(t => t.hasError)) {
      return this.stop();
    }
    if (!this.currentTrack) {
      return;
    }
    const currentIndex = this.playlist.indexOf(this.currentTrack);
    if (currentIndex == -1) {
      return this.stop();
    }
    const nextIndex = (currentIndex + 1) % this.playlist.length;
    this.play(nextIndex);
  }

  pause() {
    this.audio.pause();
  }

  resume() {
    this.audio.play();
  }

  seek(position: number) {
    this.audio.currentTime = this.audio.duration * position;
  }
}
