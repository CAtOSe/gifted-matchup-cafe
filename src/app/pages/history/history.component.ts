import { Component, OnInit } from '@angular/core';
import { MatchupDefinitionOverview } from '../../services/matchup/types';
import { MatchupService } from '../../services/matchup/matchup.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  matchups?: MatchupDefinitionOverview[];
  loading = false;
  constructor(private readonly matchupService: MatchupService) {}

  ngOnInit() {
    this.loadHistory();
  }

  delete(id: number) {
    this.matchupService.deleteMatchup(id);
    this.loadHistory();
  }

  private loadHistory() {
    this.loading = true;
    this.matchupService
      .getMatchupList()
      .pipe(
        tap((x) => {
          this.matchups = x;
          this.loading = false;
        }),
      )
      .subscribe();
  }
}
