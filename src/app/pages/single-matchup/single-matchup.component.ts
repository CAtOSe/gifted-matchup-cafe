import { Component, OnInit } from '@angular/core';
import { MatchupService } from '../../services/matchup/matchup.service';
import { MatchupDefinition } from '../../services/matchup/types';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';
import { format, parseISO } from 'date-fns';
import { lt } from 'date-fns/locale';

@Component({
  selector: 'app-single-matchup',
  templateUrl: './single-matchup.component.html',
  styleUrl: './single-matchup.component.scss',
})
export class SingleMatchupComponent implements OnInit {
  currentMatchup?: MatchupDefinition;
  formattedDate?: string;
  constructor(
    private readonly matchupService: MatchupService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        tap((x) => this.loadMatchup(x)),
      )
      .subscribe();
  }

  private loadMatchup(id: number) {
    this.matchupService
      .getMatchupById(id)
      .pipe(
        tap((x) => {
          this.currentMatchup = x;
          if (x?.date) {
            console.log(typeof x.date);
            this.formattedDate = format(x.date, 'y MMMM d', {
              locale: lt,
            });
          }
        }),
      )
      .subscribe();
  }
}
