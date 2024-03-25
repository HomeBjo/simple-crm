import { Component } from '@angular/core';
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

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatIconModule,MatCardModule,MatMenuModule,MatButtonModule,DialogAddUserComponent,MatDialogModule,
    FormsModule,MatInputModule,MatFormFieldModule,MatDatepickerModule,MatProgressBarModule,MatNativeDateModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  loading = false;
  user!: User;
  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){

  }
  saveUser(){}

}
