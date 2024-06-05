import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../interfaces';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  users: User[] = [];
  item$: Observable<any>;
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {
    const itemCollection = collection(this.firestore, 'items');
    this.item$ = collectionData<any>(itemCollection);
    setTimeout(() => {
      console.log(this.item$);
    }, 5000);
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
