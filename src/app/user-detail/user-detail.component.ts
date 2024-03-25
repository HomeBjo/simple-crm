import { Component, inject } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatMenuModule,MatFormFieldModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId: string ='';
  user: User = new User ();
  constructor(private route: ActivatedRoute,public dialog: MatDialog){
    
  }
  ngOnInit() {
   this.route.paramMap.subscribe(params => {
  const id = params.get('id');
  console.log('GOT ID',id)
  if (id !== null) {
    this.userId = id;
  } else {
    console.error('ID ist null');
    this.userId = ''; 
  }
  this.getUser()
});

}
getUser() {
  if (!this.userId) {
    console.error('UserID ist nicht gesetzt.');
    return;
  }

  const userDocRef = doc(this.firestore, 'users', this.userId);

  return onSnapshot(userDocRef, (doc) => {
    if (doc.exists()) {
      const userWithId: User = {
        ...doc.data(),
        id: doc.id,
      } as User;
      this.user = userWithId;
      console.log('User', this.user);
    } else {
      console.error('Dokument existiert nicht.');
      this.user = new User(); 
    }
  });
}
userEditMenu(){
  const dialog = this.dialog.open(DialogEditUserComponent);
  dialog.componentInstance.user = new User(this.user);
  dialog.componentInstance.userId =this.userId;

}
editMenu(){
  const dialog = this.dialog.open(DialogEditAdressComponent);
  dialog.componentInstance.user = new User(this.user);
  dialog.componentInstance.userId =this.userId;
}
}
