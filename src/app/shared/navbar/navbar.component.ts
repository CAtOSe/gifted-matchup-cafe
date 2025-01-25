import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { LayoutService } from '../../services/layout/layout.service';
import { LayoutSize } from '../../services/layout/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject<void>();

  constructor(private readonly layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.layoutChange$
      .pipe(
        tap((x) => {
          if (x !== LayoutSize.Large) {
            console.log('Hide drawer and show icon');
          } else {
            console.log('show draer and hide icon');
          }
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
