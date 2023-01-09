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



// This arrangement can be altered based on how we want the date's format to appear.


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

      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let curr_date = `${day}/${month}/${year}`;
      let exp_date = `${day}/${month}/${year}`;

      
      const user_doc = this.firestore.collection('users').doc(this.recp_id);
      const is_premium = { isPremium: true};
      user_doc.update(is_premium);
      const data = { amt: this.amount, 
        joined_date: curr_date, 
        expiry_date: exp_date, 
        course_name: this.course_n,
        recipient_name: this.recp_name
      };
      user_doc.update(data);


      const ref_doc = this.firestore.collection('users').doc(user?.uid).collection('referals');
      const ref_data = { transfer_date: curr_date, 
        transfer_amt : this.amount, 
        recipient_name: this.recp_name, 
        expiry_before_transfer: curr_date ,
        expiry_after_transfer: curr_date,
        e_pin : "12345"
      
      };
      ref_doc.add({ ...ref_data });

      


      });
    
    this.router.navigate(['/transfer-E-pin']);
  }


}


