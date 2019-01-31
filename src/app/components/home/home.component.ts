import { Component, OnInit } from '@angular/core';
import { TrackerService } from 'src/app/services/tracker.service';
import { Episode } from 'src/app/models/episode';
import { StorageService } from 'src/app/services/storage.service';
import { Stupid } from 'src/app/models/stupid';
import { send } from 'q';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public episodes: Episode[];
  public seasonPremier: Date;
  public totalEpisodes: number;
  public episodesSeen: number[];

  public seasonCollapse: boolean[];


  constructor(private tracker: TrackerService, private storage: StorageService) {
    this.seasonPremier = new Date('April 14, 2019 00:00:00');
    this.episodesSeen = [];
    this.seasonCollapse = [true, true, true, true, true, true, true]
  }

  ngOnInit() {
    this.tracker.getAllEpisodes()
      .subscribe(result => {
        this.episodes = result; // Get Season 1-5 from api
        let stupid = new Stupid();
        stupid.getAdditionalEpisodes() // Add season 6 & 7 manually cause the api out of date.
          .forEach(e => this.episodes.push(e));
        this.episodes = this.episodes.sort((a, b) => a.totalNr - b.totalNr); // Sort

        this.totalEpisodes = this.episodes.length;
      });

    this.episodesSeen = this.storage.retrieveEpisodesSeen();
  }

  public getDaysRemaining(): number {
    let timeDiff: number = Math.abs(this.seasonPremier.getTime() - this.getNow().getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  public getNow(): Date {
    return new Date(Date.now());
  }

  public getEpisodesRemainingCount(): number {
    return this.totalEpisodes - this.episodesSeen.length;
  }

  public getEpisodesPerDay(): number {
    return this.getEpisodesRemainingCount() / this.getDaysRemaining();
  }

  public getEpisodesPerWeek(): number {
    return this.getEpisodesPerDay() * 7.0;
  }

  public getEpisodesBySeason(season: number): Episode[] {
    return this.episodes.filter(e => e.season == season);
  }

  public episodeHasBeenSeen(number: number): boolean {
    return this.episodesSeen.includes(number);
  }

  public addToSeen(number: number) {
    this.episodesSeen.push(number);
    this.saveChanges();
  }

  public removeFromSeen(id: number) {
    this.episodesSeen = this.episodesSeen.filter(e => e !== id);
    this.saveChanges();
  }

  public seasonHasBeenSeen(seasonNumber: number): boolean {
    let seasonIds = this.getEpisodesBySeason(seasonNumber)
      .map(e => e.totalNr);
    return this.episodesSeen.some(e => seasonIds.includes(e));
  }

  public addSeasonToSeen(seasonNumber: number) {
    this.getEpisodesBySeason(seasonNumber)
      .map(e => e.totalNr)
      .forEach(id => {
        if (!this.episodesSeen.includes(id))
          this.episodesSeen.push(id);
      });
    this.saveChanges();
  }


  public removeSeasonFromSeen(seasonNumber: number) {
    this.episodesSeen = this.episodesSeen
      .filter(e => this.getEpisodesBySeason(seasonNumber)
          .map(e => e.totalNr)
          .includes(e)
      );
    this.saveChanges();
  }

  private saveChanges() {
    this.storage.storeEpisodesSeen(this.episodesSeen);
  }

}
