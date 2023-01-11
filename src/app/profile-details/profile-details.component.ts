import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  joining_date?:string;
  expiry_date_:boolean = true;
  expiry_date:string = '10/2/2023'
  constructor(public auth:AngularFireAuth) { 
    auth.user.subscribe(user=>{
      this.joining_date = user?.metadata.creationTime;
    })
  }

  ngOnInit(): void {

  }

}
