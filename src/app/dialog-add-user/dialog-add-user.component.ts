import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,
    MatProgressBarModule
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'], // corrected to styleUrls
})
export class DialogAddUserComponent {
  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<DialogAddUserComponent>
  ) {}
  birthDate = new Date();
  user: User = {
    firstName: '',
    lastName: '',
    birthDate: 0,
    street: '',
    zipCode: '',
    city: '',
    email: '',
    id: '',
  };
  loading = false;

  saveUser() {
    this.loading = true;

    // this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
    const usersCollectionRef = collection(this.firestore, 'users');
    addDoc(usersCollectionRef, this.user)
      .then((result) => {
        console.log('Document added with ID:', result.id);
      })
      .catch((error) => {
        console.error('Error adding document:', error);
      });
    setTimeout(() => {
      this.loading = false;
      this.dialogRef.close();
    }, 2000);
  }
}
