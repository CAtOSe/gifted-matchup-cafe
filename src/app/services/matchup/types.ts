export interface Matchup {
  student1: string;
  student2: string;
  student1Id: number;
  student2Id: number;
}

export interface MatchupDefinition {
  id: number;
  date: Date;
  matchups: Matchup[];
}

export interface MatchupDefinitionOverview {
  id: number;
  date: Date;
}
