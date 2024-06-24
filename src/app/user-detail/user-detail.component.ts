import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, doc, getDoc } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  userId: string | null = '';
  firestore: Firestore = inject(Firestore);
  userdata: User = {
    firstName: '',
    lastName: '',
    birthDate: 0,
    street: '',
    zipCode: '',
    city: '',
    email: '',
    id: '',
  };

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      console.log(this.userId);
      this.getUser(this.userId);
    });
  }

  async getUser(id: string | null) {
    if (id) {
      let docRef = this.getSingleDocRef('users', id);
      const items$ = await getDoc(docRef);
      const data = items$.data();
      if (data) {
        this.userdata = items$.data() as User;
        console.log(this.userdata);
      } else {
        console.error('User data not found');
      }
    }
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = this.userdata;
        dialog.componentInstance.userUpdated.subscribe(() => {
          this.getUser(this.userId);
        });
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.userdata;
    dialog.componentInstance.userUpdated.subscribe(() => {
      this.getUser(this.userId);
    });
  }
}
