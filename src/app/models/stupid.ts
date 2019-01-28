import { Episode } from './episode';

export class Stupid {
    private additionalEpisodes: Episode[];

    constructor() {
        this.additionalEpisodes = [
            // SEASON  6  
            {
                totalNr: 51,
                nr: 1,
                name: 'The Red Woman',
                season: 6,
            } as Episode,
            {
                totalNr: 52,
                nr: 2,
                name: 'Home',
                season: 6,
            } as Episode,
            {
                totalNr: 53,
                nr: 3,
                name: 'Oathbreaker',
                season: 6,
            } as Episode,
            {
                totalNr: 54,
                nr: 4,
                name: 'Book of the Stranger',
                season: 6,
            } as Episode,
            {
                totalNr: 55,
                nr: 5,
                name: 'The Door',
                season: 6,
            } as Episode,
            {
                totalNr: 56,
                nr: 6,
                name: 'Blood of My Blood',
                season: 6,
            } as Episode,
            {
                totalNr: 57,
                nr: 7,
                name: 'The Broken Man',
                season: 6,
            } as Episode,
            {
                totalNr: 58,
                nr: 8,
                name: 'No One',
                season: 6,
            } as Episode,
            {
                totalNr: 59,
                nr: 9,
                name: 'Battle of the Bastards',
                season: 6,
            } as Episode,
            {
                totalNr: 60,
                nr: 10,
                name: 'The Winds of Winter',
                season: 6,
            } as Episode,

            // SEASON 7  
            {
                totalNr: 61,
                nr: 1,
                name: 'Dragonstone',
                season: 7,
            } as Episode,
            {
                totalNr: 62,
                nr: 2,
                name: 'Stormborn',
                season: 7,
            } as Episode,
            {
                totalNr: 63,
                nr: 3,
                name: 'The Queen\s Justice',
                season: 7,
            } as Episode,
            {
                totalNr: 64,
                nr: 4,
                name: 'The Spoils of War',
                season: 7,
            } as Episode,
            {
                totalNr: 65,
                nr: 5,
                name: 'Eastwatch',
                season: 7,
            } as Episode,
            {
                totalNr: 66,
                nr: 6,
                name: 'Beyond the Wall',
                season: 7,
            } as Episode,
            {
                totalNr: 67,
                nr: 7,
                name: 'The Dragon and the Wolf',
                season: 7,
            } as Episode,
        ];
    }

    getAdditionalEpisodes(): Episode[] {
        return this.additionalEpisodes;
    }
}
