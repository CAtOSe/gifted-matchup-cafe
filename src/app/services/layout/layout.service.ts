import { Injectable, OnDestroy } from '@angular/core';
import { debounceTime, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { LayoutSize } from './types';

@Injectable({
  providedIn: 'root',
})
export class LayoutService implements OnDestroy {
  private destroy$ = new Subject<void>();
  layoutChange$ = new Subject<LayoutSize>();

  constructor() {
    console.log('Layoutserviceislive');
    this.setupResizeListener();
  }

  private setupResizeListener(): void {
    const innerObservable = new Observable<UIEvent>((subscriber) => {
      const handleResize = ($event: UIEvent) => subscriber.next($event);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    });

    innerObservable
      .pipe(
        debounceTime(100),
        map(($event: UIEvent) => ({
          width: ($event.target as Window).innerWidth,
          height: ($event.target as Window).innerHeight,
        })),
        tap(console.log),
        takeUntil(this.destroy$),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    console.log('Layoutserviceisdeads');
    this.layoutChange$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
