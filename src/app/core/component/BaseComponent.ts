import { OnInit, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export class BaseComponent implements OnInit, OnChanges, OnDestroy {

  public ngOnChange$: Subject<SimpleChanges> = new Subject();
  public ngOnInit$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public ngOnDestroy$: Subject<boolean> = new Subject();

  public ngOnChanges(changes: SimpleChanges): void {
    this.ngOnChange$.next(changes);
  }

  public ngOnInit(): void {
    this.ngOnInit$.next(true);
  }

  public ngOnDestroy(): void {
    this.ngOnDestroy$.next(true);
  }
  
}
