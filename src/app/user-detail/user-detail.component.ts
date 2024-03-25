import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  userId: string ='';
  constructor(private route: ActivatedRoute){
    
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
});

}}
