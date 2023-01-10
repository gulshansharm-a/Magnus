import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgForm } from '@angular/forms';
import { stringLength } from '@firebase/util';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
declare var $:any;
interface security_data {
  AdhaarF?: string;
  AdhaarB?: string;
  PanF?: string;
  PanB?: string;
  Bank?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  sec_data: security_data | undefined;
  sec_dic ={};
  AdhaarF: string = "";
  AdhaarB: string = "";
  PanF: string = "";
  PanB: string = "";
  Bank: string = "";
  firestore : AngularFirestore;
  arertdata :string = '';
   hi?:number = 0;
   alert = false;
   fileurl ?: string;
  constructor(fStore:AngularFirestore , public auth:AngularFireAuth,private storage:AngularFireStorage ,public route:Router ) {
    this.firestore = fStore;
    this.alert = false;
<<<<<<< HEAD
    this.auth.user.subscribe(user=>{
      this.firestore.collection('users').doc(user?.uid+"/otherInfo/nominee").get().subscribe(data=>{
        // if(data.exists) {
        //   this.route.navigate(['/profile-details']);
        // }
      });
=======
    // this.auth.user.subscribe(user=>{
    //   this.firestore.collection('users').doc(user?.uid+"/otherInfo/nominee").get().subscribe(data=>{
    //     if(data.exists) {
    //       this.route.navigate(['/profile-details']);
    //     }
    //   });
>>>>>>> 1da9bd4406925e9cee7ffc61d4db7eb6a63c4574

    //  });
   
   }

   async uploadFile(event:any,st:string) {
    const file = event.target.files[0];
    // console.log(file)
    const filePath = 'PersonalDataOfUser/'+this.firestore.createId();
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    this.arertdata = st;
    console.log(st, st)
    this.alert = true;
    task.percentageChanges().subscribe(data => {
       console.log(data);
       if (data == 100) {
         ref.getDownloadURL().subscribe(data => {
           console.log("Test Upload");
           if (st == "Adhar Front") {
            this.AdhaarF = data
           }
           if (st == "Adhar Back") {
            this.AdhaarB = data
          }
          if (st == "PAN Front") {
            this.PanF = data
          }
          if (st == "PAN Back") {
            this.PanF = data
          }
          if (st == "Bank passbook/Cross check") {
            this.Bank = data
            console.log(this.sec_data)
          }
          
         });
       }
     })

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
    // this.auth.user.subscribe(user=>{
    //   console.log("DETAILS DONE")
    //   this.firestore.collection('users').doc(user?.uid+"/otherInfo/SecuriteDetails").set(this.sec_data);

<<<<<<< HEAD
      this.firestore.collection('users').doc(user?.uid+"/otherInfo/SecuriteDetails").set(val);
      
     });
=======
    //  });
>>>>>>> 1da9bd4406925e9cee7ffc61d4db7eb6a63c4574
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
        if (id == 'c4') {
          this.sec_data = {AdhaarB: this.AdhaarB, AdhaarF: this.AdhaarF, PanF: this.PanF
        , PanB: this.PanB, Bank: this.Bank}
          console.log(this.sec_data);

          this.auth.user.subscribe(user=>{
            console.log("DETAILS DONE")
            this.firestore.collection('users').doc(user?.uid+"/otherInfo/SecuriteDetails").set(this.sec_data);
      
           });
        }
  }
}
