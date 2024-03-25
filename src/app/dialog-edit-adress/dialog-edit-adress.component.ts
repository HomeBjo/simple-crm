import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { User } from '../models/user.class';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {
  MatNativeDateModule,
} from '@angular/material/core';

import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, doc, updateDoc  } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-adress',
  standalone: true,
  imports: [MatIconModule,MatCardModule,MatMenuModule,MatButtonModule,DialogAddUserComponent,MatDialogModule,
    FormsModule,MatInputModule,MatFormFieldModule,MatDatepickerModule,MatProgressBarModule,MatNativeDateModule,
  ],
  templateUrl: './dialog-edit-adress.component.html',
  styleUrl: './dialog-edit-adress.component.scss'
})
export class DialogEditAdressComponent {
  loading = false;
  user!: User;
  userId!:string;
  firestore: Firestore = inject(Firestore);
  constructor(public dialogRef: MatDialogRef<DialogEditAdressComponent>){}
 
  async saveUser(){
    const userData = doc(this.firestore, 'users', this.userId);
    if (this.user && this.userId) {
        this.loading = true;
      await updateDoc(userData, this.user.toJSON()) 
      .then(() => {
        this.loading = false;
        this.dialogRef.close();
      })
    }
  }
}
