import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Episode } from '../models/episode';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(public http: HttpService) { }

  public getAllEpisodes() {
    let url = `https://api.got.show/api/episodes/`;
    return this.http.get(url).pipe(map(res => <Episode[]>res));
  }
}
