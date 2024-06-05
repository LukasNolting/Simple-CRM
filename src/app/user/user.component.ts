import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../interfaces';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, query } from '@angular/fire/firestore';
import { onSnapshot } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  users: User[] = [];
  allUsers: User[] = [];
  unsubUsers;
  firestore: Firestore = inject(Firestore);

  constructor(public dialog: MatDialog) {
    this.unsubUsers = this.subUsersList();
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  subUsersList() {
    const q = query(this.getUsersRef());
    return onSnapshot(q, (list) => {
      this.allUsers = [];
      list.forEach((element) => {
        this.allUsers.push(this.setUserObject(element.data(), element.id));
      });
      console.log("allUsers",this.allUsers);
    });
    
  }

  setUserObject(obj: any, id: string): User {
    return {
      firstName: obj.firstName,
      lastName: obj.lastName,
      birthDate: obj.birthDate,
      street: obj.street,
      zipCode: obj.zipCode,
      city: obj.city,
      email: obj.email,
      id: id
    };
  }
}
