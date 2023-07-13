/**
 * Music track.
 */
export interface Track {
    /**
     * Track title.
     */
    title: string;

    /**
     * Track URL.
     */
    url: string;

    /**
     * Whether the track is in error.
     */
    error?: boolean;
}

/**
 * Music playlist.
 */
export type Playlist = readonly Track[];