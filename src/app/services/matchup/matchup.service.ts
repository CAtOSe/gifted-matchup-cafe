import { Injectable } from '@angular/core';
import { map, Observable, of, Subject, take, tap, throwError } from 'rxjs';
import { Matchup, MatchupDefinition, MatchupDefinitionOverview } from './types';
import { STORE_KEY_MATCHUPS, STORE_KEY_NEW_MATCHUP } from './constants';
import { Student } from '../student/types';
import { STORE_KEY_STUDENTS } from '../student/constants';

@Injectable({
  providedIn: 'root',
})
export class MatchupService {
  private worker?: Worker;
  private workerResults$ = new Subject<Matchup[]>();

  constructor() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker(new URL('./matchup.worker', import.meta.url));
      console.log('Worker registered');
      this.worker.onmessage = ({ data }) => {
        this.workerResults$.next(data);
      };
    } else {
      console.error('Web Workers are not supported in this environment.');
      // You should add a fallback so that your program still executes correctly.
    }
  }

  getLatestMatchup(): Observable<MatchupDefinition | undefined> {
    const matchupData = this.loadFromStorage();
    if (matchupData.length === 0) return of(undefined);

    const latestId = matchupData.reduce((prev, curr, i, arr) => {
      if (arr[prev].date < arr[i].date) return i;
      else return prev;
    }, 0);
    const matchupDef = matchupData[latestId];

    return of(matchupDef);
  }

  getMatchupList(): Observable<MatchupDefinitionOverview[]> {
    const matchupData = this.loadFromStorage();
    const list: MatchupDefinitionOverview[] = matchupData.map((x) => ({
      id: x.id,
      date: x.date,
    }));
    return of(list);
  }

  getMatchupById(id: number): Observable<MatchupDefinition | undefined> {
    const matchupData = this.loadFromStorage();
    const matchupDef = matchupData.find((x) => x.id === id);
    return of(matchupDef);
  }

  generateNewMatchup(): Observable<MatchupDefinition> {
    const matchupData = this.loadFromStorage();
    const studentData = this.loadStudentsFromStorage();

    const latestIndex = matchupData.reduce((prev, curr, i) => {
      if (i > prev) return i;
      else return prev;
    }, -1);
    const latestId = latestIndex !== -1 ? matchupData[latestIndex].id : 0;

    this.worker?.postMessage({ studentData, matchupData });
    return this.workerResults$.pipe(
      take(1),
      // catch error if array is empty
      map((x) => {
        return {
          id: latestId + 1,
          date: new Date(),
          matchups: x,
        };
      }),
      tap((x) => {
        window.localStorage.setItem(STORE_KEY_NEW_MATCHUP, JSON.stringify(x));
      }),
    );
  }

  storeNewMatchup(): Observable<MatchupDefinition> {
    const savedMatchup = window.localStorage.getItem(STORE_KEY_NEW_MATCHUP);
    if (!savedMatchup) {
      return throwError(
        () =>
          new Error('Nepavyko išsaugoti naujo sąrašo. Sugeneruokite iš naujo.'),
      );
    }
    const newMatchupDef: MatchupDefinition = JSON.parse(savedMatchup);
    newMatchupDef.date = new Date(newMatchupDef.date);
    const matchupData = this.loadFromStorage();
    window.localStorage.setItem(
      STORE_KEY_MATCHUPS,
      JSON.stringify([...matchupData, newMatchupDef]),
    );

    return of(newMatchupDef);
  }

  clearNewMatchup(): Observable<MatchupDefinition | undefined> {
    window.localStorage.removeItem(STORE_KEY_NEW_MATCHUP);
    return this.getLatestMatchup();
  }

  private loadFromStorage(): MatchupDefinition[] {
    const matchupDataString = window.localStorage.getItem(STORE_KEY_MATCHUPS);
    const matchupData = matchupDataString ? JSON.parse(matchupDataString) : [];
    return matchupData.map((x: MatchupDefinition) => ({
      ...x,
      date: new Date(x.date),
    }));
  }

  private loadStudentsFromStorage(): Student[] {
    const studentsString = window.localStorage.getItem(STORE_KEY_STUDENTS);
    return studentsString ? JSON.parse(studentsString) : [];
  }

  deleteMatchup(id: number) {
    const matchupData = this.loadFromStorage();
    const filteredData = matchupData.filter((x) => x.id !== id);
    window.localStorage.setItem(
      STORE_KEY_MATCHUPS,
      JSON.stringify(filteredData),
    );
  }
}
