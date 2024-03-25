import { Component, inject } from '@angular/core';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  firestore: Firestore = inject(Firestore);
  userId: string ='';
  user: User = new User ();
  constructor(private route: ActivatedRoute,){
    
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
}
