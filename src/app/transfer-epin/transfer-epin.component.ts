import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-epin',
  templateUrl: './transfer-epin.component.html',
  styleUrls: ['./transfer-epin.component.css']
})
export class TransferEpinComponent implements OnInit {
  firestore : AngularFirestore;

  recp_id : string = '';
  recp_name : string = '';
  course_n : string = '';
  amount : string = '';

  constructor(private auth : AuthService,fStore:AngularFirestore , public auths:AngularFireAuth,private storage:AngularFireStorage ,private router:Router ) {
    this.firestore = fStore;
  
  }


  ngOnInit(): void {
  }


  transfer_epin(){

    this.auths.user.subscribe(user=>{

      if(this.recp_id == '') {
        alert('Please enter recepient_id');
        return;
      }

      if(this.recp_name == '') {
        alert('Please enter recepient_name');
        return;
      }

      switch (this.course_n) {
        case "Forex Market":
          this.amount = "15000";
          break;

          case "Indian Stock":
          this.amount = "15000";
          break;

          case "Combo Course":
          this.amount = "25000";
          break;
      
        default:
          break;
      }
      
      const user_doc = this.firestore.collection('users').doc(this.recp_id);
      const is_premium = { isPremium: true};
      user_doc.update(is_premium);
      const amt = { amt: this.amount};
      user_doc.update(amt);
      const course = { course_name: this.course_n};
      user_doc.update(course);


      });
    
    this.router.navigate(['/transfer-E-pin']);
  }
}
