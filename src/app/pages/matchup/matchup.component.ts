import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatchupService } from '../../services/matchup/matchup.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatchupDefinition } from '../../services/matchup/types';
import { format } from 'date-fns';
import { lt } from 'date-fns/locale';

@Component({
  selector: 'app-matchup',
  templateUrl: './matchup.component.html',
  styleUrl: './matchup.component.scss',
})
export class MatchupComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  currentMatchup?: MatchupDefinition;
  loading = false;
  newMatchup = false;
  formattedDate?: string;

  constructor(private readonly matchupService: MatchupService) {}

  ngOnInit() {
    this.loading = true;
    this.matchupService
      .getLatestMatchup()
      .pipe(
        tap((x) => {
          this.loading = false;
          this.currentMatchup = x;
          if (x?.date) {
            this.formattedDate = format(x.date, 'y MMMM d', {
              locale: lt,
            });
          }
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  generate() {
    this.newMatchup = true;
    this.loading = true;
    this.matchupService
      .generateNewMatchup()
      .pipe(
        tap((x) => {
          this.loading = false;
          this.currentMatchup = x;
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  cancel() {
    this.loading = true;
    this.matchupService
      .clearNewMatchup()
      .pipe(
        tap((x) => {
          this.currentMatchup = x;
          this.newMatchup = false;
          this.loading = false;
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  confirm() {
    this.loading = true;
    this.matchupService
      .storeNewMatchup()
      .pipe(
        tap((x) => {
          this.currentMatchup = x;
          this.newMatchup = false;
          this.loading = false;
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
