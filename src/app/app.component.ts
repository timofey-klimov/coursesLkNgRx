import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUserAction } from './auth/store/actions/getUser.actions';
import { getUserAvatarAction } from './auth/store/actions/getUserAvatar.action';
import { isLoadingSelector, userSelector } from './auth/store/selector';

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
    this.store.dispatch(getUserAvatarAction());
    this.isLoading$ = this.store.select(isLoadingSelector);
  }
}
