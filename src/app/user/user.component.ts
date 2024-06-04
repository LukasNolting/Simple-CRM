import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../interfaces';
import { MatCardModule } from '@angular/material/card';
import {
  Firestore,
  collection,
  doc,
  collectionData,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  orderBy,
} from '@angular/fire/firestore';

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
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {}
  ngOnInit(): void {

    this.firestore
      .collection('users')
      .valueChanges()
      .subscribe((data: User[]) => {
        this.users = data as User[];
        console.log(this.users);
      });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
