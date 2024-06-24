import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { User } from '../interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    CommonModule,
    MatProgressBarModule,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss'],
})
export class DialogEditAddressComponent implements OnInit {
  @Output() userUpdated = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private firestore: Firestore
  ) {}

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

  objClone: Partial<User> = {};

  loading = false;

  ngOnInit(): void {
    this.objClone = Object.assign({}, this.user);
  }

  async saveUser() {
    this.loading = true;
    const usersCollectionRef = collection(this.firestore, 'users');
    const userDocRef = doc(usersCollectionRef, this.user.id);

    try {
      await updateDoc(userDocRef, this.objClone);
      this.loading = false;
      this.userUpdated.emit();
      this.dialogRef.close();
    } catch (error) {
      console.error('Fehler beim Aktualisieren des Dokuments: ', error);
      this.loading = false;
    }
  }
}
