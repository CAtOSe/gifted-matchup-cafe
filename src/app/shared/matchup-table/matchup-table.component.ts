import { Component, Input } from '@angular/core';
import { Matchup } from '../../services/matchup/types';

@Component({
  selector: 'app-matchup-table',
  templateUrl: './matchup-table.component.html',
  styleUrl: './matchup-table.component.scss',
})
export class MatchupTableComponent {
  @Input({ required: true }) matchupData!: Matchup[];
  columnsToDisplay = ['student1', 'student2'];
}
