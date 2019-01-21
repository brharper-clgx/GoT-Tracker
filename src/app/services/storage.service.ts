import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {

    public storeEpisodesSeen(episodes: number[]) {
      window.localStorage.setItem('episodes', JSON.stringify(episodes));
    }

    public retrieveEpisodesSeen(): number[] {
      let episodesSeen = JSON.parse(window.localStorage.getItem('episodes'));
      if(!episodesSeen) episodesSeen = [];
      return episodesSeen;
    }
}