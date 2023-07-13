import { Injectable } from '@angular/core';
import { Playlist, Track } from './types';
import { BehaviorSubject, Observable, debounce, interval, map, timer } from 'rxjs';

/**
 * Player service.
 */
@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  /**
   * Mutable playlist.
   */
  readonly thePlaylist: Track[] = [];

  /**
   * Audio player.
   */
  private readonly audio: HTMLAudioElement = new Audio();

  /**
   * Current track subject.
   */
  private nowPlayingSubject = new BehaviorSubject<Track | null>(null);

  /**
   * Track progress subject.
   */
  private progressSubject = new BehaviorSubject<void>(undefined);

  /**
   * Whether any track has been player yet.
   */
  private playing = false;

  /**
   * Constractor that sets event handlers.
   */
  constructor() {
    this.audio.onended = () => this.onTrackEnded();
    this.audio.ontimeupdate = () => this.progressSubject.next();
    this.audio.onerror = () => this.onTrackError();
  }

  /**
   * Playlist exposed as immutable list of tracks. The playlist is shared between application components.
   */
  get playlist(): Playlist {
    return this.thePlaylist;
  }

  /**
  * Indicates if the player is in playing mode.
  */
  get isPlaying() {
    return this.playing;
  }

  /**
   * Add new track to playlist.
   * 
   * @param track new track.
   */
  add(track: Track) {
    this.thePlaylist.push(track);
  }

  /**
   * Drop a track from the playlist.
   * 
   * @param index index of the track to be dorpped.
   */
  remove(index: number) {
    this.thePlaylist.splice(index);
  }

  /**
   * Play music. If a index is provided the track at that index will be played. Otherwise the last player track is resumed.
   * 
   * @param index index of the track to be play. 
   */
  play(index?: number) {
    if (index !== undefined) {
      const track = this.playlist[index];
      if (track.error) {
        return this.playNext();
      }
      this.audio.src = track.url;
      this.nowPlayingSubject.next(track);
    }
    if (!this.audio.src) {
      console.warn("Audio or audio source is not available.");
      return;
    }
    this.audio.play();
    this.playing = true;
  }

  /**
   * Pause music.
   */
  pause() {
    if (!this.audio?.src) {
      console.warn("Audio or audio source is not available.");
      return;
    }
    this.audio.pause();
    this.playing = false;
  }

  /**
   * Seek a particular position of the track.
   * 
   * @param position position expressed as a ration of track duration.
   */
  seek(position: number) {
    this.audio.currentTime = position * this.audio.duration;
  }

  /**
   * @returns Now-playing observer.
   */
  nowPlaying(): Observable<Track | null> {
    return this.nowPlayingSubject.asObservable();
  }

  /**
   * @returns Track progress rate observer.
   */
  progress(): Observable<number> {
    return this.progressSubject.asObservable().pipe(
      debounce(() => interval(10)),
      map(() => this.trackProgress()),
    );
  }

  private get canPlay(): boolean {
    return this.playlist.some(t => !t.error);
  }

  private get currentTrack() {
    return this.nowPlayingSubject.value;
  }

  private onTrackError() {
    if (!this.currentTrack) {
      return;
    }
    this.currentTrack.error = true;
    this.playNext();
  }

  private onTrackEnded() {
    this.playNext();
  }

  private playNext() {
    if (!this.currentTrack || !this.canPlay) {
      return;
    }
    const index = this.playlist.indexOf(this.currentTrack)
    const next = (index + 1) % this.playlist.length;
    this.play(next);
  }

  private trackProgress(): number {
    return this.audio.duration ? this.audio.currentTime / this.audio.duration : 0;
  }
}
