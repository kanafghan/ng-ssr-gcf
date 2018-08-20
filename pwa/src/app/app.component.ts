import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  metaBottles$: Observable<any>;

  constructor(private afDb: AngularFireDatabase) {}

  ngOnInit() {
    try {
      this.metaBottles$ = this.afDb.list('meta_bottles').valueChanges();
    } catch (error) {
      console.error('AppComponent Failed to Init:', error);
    }
  }
}
