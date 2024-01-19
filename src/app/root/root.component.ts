import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { Router, RoutesRecognized } from '@angular/router';
import { Layout } from '../layouts/types';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  currentLayout: Layout = Layout.Navbar;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        tap((event) => {
          if (event instanceof RoutesRecognized) {
            const data = event.state.root.firstChild?.data;
            if (data) {
              const layout = data['layout'];
              if (layout) this.currentLayout = layout;
            }
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

  protected readonly Layout = Layout;
}
