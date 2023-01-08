import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { stringLength } from '@firebase/util';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firestore : AngularFirestore;
  arertdata :string = '';
   hi?:number = 0;
   alert = false;
   fileurl ?: string;
  constructor(fStore:AngularFirestore , public auth:AngularFireAuth,private storage:AngularFireStorage ,public route:Router ) {
    this.firestore = fStore;
    this.alert = false;
    this.auth.user.subscribe(user=>{
      this.firestore.collection('users').doc(user?.uid+"/otherInfo/nominee").get().subscribe(data=>{
        if(data.exists) {
          this.route.navigate(['/profile-details']);
        }
      });

     });
   
   }

   uploadFile(event:any,st:string) {
    const file = event.target.files[0];
    const filePath = 'PersonalDataOfUser/'+this.firestore.createId();
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.arertdata = st;
    this.alert = true;
    task.percentageChanges().subscribe(data=> {
      this.hi = data;
    })

      // ref.getDownloadURL().subscribe(data=> {
      //   console.log(data)
      // });
   
    
  }

  ngOnInit(): void {
    $('#c1').show();
    $('#c2').hide();$('#c3').hide();$('#c4').hide();
  }
  getNomineeInfo(val: NgForm['value']) {
    this.auth.user.subscribe(user=>{

      this.firestore.collection('users').doc(user?.uid+"/otherInfo/nominee").set(val);

     });
   
  }

  getBankDetails(valBank :NgForm['value']) {
    this.auth.user.subscribe(user=>{

      this.firestore.collection('users').doc(user?.uid+"/otherInfo/bank").set(valBank);

     });
  }

  getAddress(val:NgForm['value']) {
    this.auth.user.subscribe(user=>{

      this.firestore.collection('users').doc(user?.uid+"/otherInfo/address").set(val);

     });
  }
  getSecuriteDetails(val:NgForm['value']) {
    this.auth.user.subscribe(user=>{

      this.firestore.collection('users').doc(user?.uid+"/otherInfo/SecuriteDetails").set(val);

     });
  }
  btnClick(id:any){
    if(id=='c1'){
    $('#c2').show();
    $('#c1').hide();$('#c3').hide();$('#c4').hide();
    }
    if(id=='c2'){
      $('#c3').show();
      $('#c2').hide();$('#c1').hide();$('#c4').hide();
      }
      if(id=='c3'){
        $('#c4').show();
        $('#c2').hide();$('#c3').hide();$('#c1').hide();
        }
  }
}
