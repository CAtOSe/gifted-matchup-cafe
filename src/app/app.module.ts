import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RootComponent } from './root/root.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NavbarLayoutComponent } from './layouts/navbar-layout/navbar-layout.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { TextInputComponent } from './shared/form-components/text-input/text-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextareaInputComponent } from './shared/form-components/textarea-input/textarea-input.component';
import { NavbarCardLayoutComponent } from './layouts/navbar-card-layout/navbar-card-layout.component';
import { SelectInputComponent } from './shared/form-components/select-input/select-input.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateTimeInputComponent } from './shared/form-components/date-time-input/date-time-input.component';
import { lt } from 'date-fns/locale';
import { DialogComponent } from './shared/dialog/dialog.component';
import { BackButtonComponent } from './shared/back-button/back-button.component';
import { EntryComponent } from './layouts/entry/entry.component';
import { NumberInputComponent } from './shared/form-components/number-input/number-input.component';
import { AutocompleteInputComponent } from './shared/form-components/autocomplete-input/autocomplete-input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StudentsComponent } from './pages/students/students.component';
import { HistoryComponent } from './pages/history/history.component';
import { MatchupComponent } from './pages/matchup/matchup.component';
import { MatTableModule } from '@angular/material/table';
import { MatchupTableComponent } from './shared/matchup-table/matchup-table.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { SingleMatchupComponent } from './pages/single-matchup/single-matchup.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

@NgModule({
  declarations: [
    RootComponent,
    NavbarComponent,
    NavbarLayoutComponent,
    SidenavComponent,
    TextInputComponent,
    TextareaInputComponent,
    NavbarCardLayoutComponent,
    SelectInputComponent,
    DateTimeInputComponent,
    DialogComponent,
    BackButtonComponent,
    EntryComponent,
    NumberInputComponent,
    AutocompleteInputComponent,
    StudentsComponent,
    HistoryComponent,
    MatchupComponent,
    MatchupTableComponent,
    LoaderComponent,
    SingleMatchupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDateFnsModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: lt },
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { locale: 'lt-LT' } },
  ],
  bootstrap: [RootComponent],
})
export class AppModule {}
