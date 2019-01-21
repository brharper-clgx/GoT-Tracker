import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { Episode } from 'src/app/models/episode';
import { TrackerService } from 'src/app/services/tracker.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let routerSpy: any;
  let mockTrackerService: any;
  let episodes = [
    {
      name: 'BLOOD!',
      season: 5,
      nr: 3,
      totalNr: 123,
    } as Episode
  ];

  let mockStorageService: any;

  beforeEach(async(() => {

    mockTrackerService = jasmine.createSpyObj("TrackerService", ['getAllEpisodes']);
    mockTrackerService.getAllEpisodes.and.returnValue(of(episodes));

    mockStorageService = jasmine.createSpyObj("StorageService", ['retrieveEpisodesSeen', 'storeEpisodesSeen']);
    mockStorageService.retrieveEpisodesSeen.and.returnValue(of(['one', 'two']));
    TestBed.overrideTemplate(
      HomeComponent,
      "<html>HTML for the component requires all dependent components to be loaded. Differ this to Feature test.</html>");

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: TrackerService, useValue: mockTrackerService },
        { provide: StorageService, useValue: mockStorageService },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('hasBeenSeen', () => {
    it('should return true if episode id is in list', () => {
      // arrange
      component.episodesSeen = [];
      component.episodesSeen.push(1, 2);

      // act 
      let result = component.hasBeenSeen(1);

      // assert
      expect(result).toBeTruthy();
    });

    it('should return false if episode id is not in list', () => {
      // arrange
      component.episodesSeen = [];
      component.episodesSeen.push(1, 2);

      // act 
      let result = component.hasBeenSeen(3);

      // assert
      expect(result).toBeFalsy();
    });
  });

  describe('addToSeen', () => {
    it('should add passed value to list', () => {
      // arrange
      component.episodesSeen = [];
      let number = 123;

      // act 
      component.addToSeen(number);

      // assert
      expect(component.episodesSeen.includes(number)).toBeTruthy();
    });

    it('should save changes', () => {
      // arrange
      component.episodesSeen = [];
      let number = 123;

      // act 
      component.addToSeen(number);

      // assert 
      expect(mockStorageService.storeEpisodesSeen).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('removeFromSeen', () => {
    it('should remove passed value from list', () => {
      // arrange
      component.episodesSeen = [];
      let number = 123;
      component.episodesSeen.push(1, 2, number);
      
      // act 
      component.removeFromSeen(number);
      
      // assert
      expect(component.episodesSeen.includes(number)).toBeFalsy();
    });
    
    it('should save changes', () => {
      // arrange
      component.episodesSeen = [];
      let number = 123;
      component.episodesSeen.push(1, 2, number);
      
      // act 
      component.removeFromSeen(number);
      
      // assert
      expect(mockStorageService.storeEpisodesSeen).toHaveBeenCalledTimes(1);
    });
  });

  describe('getEpisodesBySeason', () => {
    it('should limit result to members of season', () => {
      // arrange 
      component.episodes = [
        { season: 1 } as Episode,
        { season: 1 } as Episode,
        { season: 2 } as Episode,
        { season: 2 } as Episode,
      ];

      // act
      let result = component.getEpisodesBySeason(2);

      // assert
      expect(result.length).toBe(2);
    });
  });
});
