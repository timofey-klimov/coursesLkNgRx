import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserAction } from './auth/store/actions/getUser.actions';
import { isLoadingSelector, userSelector } from './auth/store/selector';
import { ICurrentUser } from './shared/types/currentUser.interface';
import { UserState } from './shared/types/userState.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 

  isLoading$: Observable<boolean>;
  
  constructor(private store: Store, private router: Router) {

  }

  ngOnInit(): void {
    this.store.dispatch(getUserAction());
    this.isLoading$ = this.store.select(isLoadingSelector);
  }
}
