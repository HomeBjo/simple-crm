
import { Component,inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { User } from '../models/user.class';
import { Firestore, collection, collectionData, addDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  
   user = new User();
   birthDate!: Date;
   
    firestore: Firestore = inject(Firestore);
    items$: Observable<any[]>;
  
    constructor() {
      const aCollection = collection(this.firestore, 'items')
      this.items$ = collectionData(aCollection);
    }

    async saveUser(){
      this.user.birthDate = this.birthDate.getTime();
      console.log('CURRENT user is',this.user)

       await addDoc(this.getUserRef(),this.user.toJSON())
        console.log('adding user')
      };


   

    getUserRef(){
      return collection(this.firestore,'users')
    }

     
    // addNote(item:{}){
    //   return addDoc(this.getUserRef(),item)
    //   }
   
}






// saveUser(){
//   this.user.birthDate = this.birthDate.getTime();
//   console.log('CURRENT user is',this.user)
//   this.firestore.collection('users').add(this.user.toJSON()).then((result:any)=>{
//     console.log('adding user',result)
//   });
// }