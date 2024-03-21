import { Component,inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../models/user.class';
import {MatCardModule} from '@angular/material/card';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,onSnapshot,doc
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatTooltipModule,MatDialogModule,MatCardModule,CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  allUsers: User[] = [];
  unsubUser;
  
  firestore: Firestore = inject(Firestore);

   user: User = new User();
   
  constructor(public dialog: MatDialog) { 
    this.unsubUser = this.getAllUsers();
    
  }
 

  openDialog() {
    this.dialog.open(DialogAddUserComponent);

}

getAllUsers() {
  return onSnapshot(this.getUserRef(), (list) => {
    this.allUsers = [];
    list.forEach(element => {
      this.allUsers.push(element.data() as User);
    });
  });
}


getUserRef() {
  return collection(this.firestore, 'users');
}
ngOnDestroy(){
 this.unsubUser();
}



// setUsersObject(obj: any, id: string): any {
//   return {
//     test:false,
//     id: id,
//     firstName: obj.firstName || "",
//     lastName: obj.lastName || "",
//     birthDate: obj.birthDate || "",
//     street: obj.street || "",
//     zipCode: obj.zipCode || "",
//     city: obj.city || "",
//   };
// }



}




