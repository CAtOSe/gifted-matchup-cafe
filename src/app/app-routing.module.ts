import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Layout } from './layouts/types';
import { MatchupComponent } from './pages/matchup/matchup.component';
import { StudentsComponent } from './pages/students/students.component';
import { HistoryComponent } from './pages/history/history.component';
import { SingleMatchupComponent } from './pages/single-matchup/single-matchup.component';

const routes: Routes = [
  {
    path: '',
    component: MatchupComponent,
    data: {
      layout: Layout.NavbarCard,
    },
  },
  {
    path: 'students',
    component: StudentsComponent,
    data: {
      layout: Layout.NavbarCard,
    },
  },
  {
    path: 'history',
    component: HistoryComponent,
    data: {
      layout: Layout.NavbarCard,
    },
  },
  {
    path: 'matchup/:id',
    component: SingleMatchupComponent,
    data: {
      layout: Layout.NavbarCard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
