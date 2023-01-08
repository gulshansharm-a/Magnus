import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email : string = '';
  password : string = '';
  name : string = '';
  mobileNo : string = '';
  invitationCode : string = '';
  id:string = '';
  branch:string = '';
  myid?:string='';
  constructor(public rout:ActivatedRoute,private auth : AuthService, fauth:AngularFireAuth,private fdb:AngularFirestore) {
    this.id = rout.snapshot.params['id'];
    this.branch = rout.snapshot.params['branch'];
    this.setLocationInTree(this.id);
    fauth.user.subscribe(user=>{
     

      this.myid = user?.uid
    })
    }
  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }

    if(this.name == '') {
      alert('Please enter name');
      return;
    }

    if(this.mobileNo == '') {
      alert('Please enter mobileNo');
      return;
    }

    if(this.invitationCode == '') {
      alert('Please enter invitationCode');
      return;
    }
    
    
    
    this.auth.register(this.email,this.password , this.name , this.mobileNo , this.id);
    if(this.myid!=''|| this.myid == undefined) {
      alert('registration not accepted');
    }
    this.email = '';
    this.password = '';
    this.name = '';
    this.invitationCode = '';
    this.mobileNo = '';
   
    this.setLocationInTree(this.id);
  }

  setLocationInTree(id:string) {
    this.fdb.collection('users').doc(this.id).collection('network').snapshotChanges().subscribe(data=>{
      if(data.length != 0) {
        this.fdb.collection('users').doc(this.id).collection('network').doc('tree').valueChanges().subscribe(data=>{
        if(data![this.branch] != (null ||undefined ) ) {
          console.log(data![this.branch])
          this.id = data![this.branch];
          this.setLocationInTree(data![this.branch]);
        }else {
          if(this.branch=='left') {
            this.fdb.collection('users').doc(this.id).collection('network').doc('tree').set(  {'left':this.myid}, {merge:true});
          }else{
            this.fdb.collection('users').doc(this.id).collection('network').doc('tree').set( {'right':this.myid}, {merge:true});
          }
        }
      })
      }else {
        if(this.branch=='left') {
          this.fdb.collection('users').doc(this.id).collection('network').doc('tree').set(  {'left':this.myid}, {merge:true});

        }else{
          this.fdb.collection('users').doc(this.id).collection('network').doc('tree').set( {'right':this.myid}, {merge:true});

        }
       }
    })

    // this.fdb.collection('users').doc(this.id).collection('network').doc('tree').valueChanges().subscribe(data=>{
    //   if(data![this.branch] != (null ||undefined ) ) {
    //     console.log(data![this.branch])
    //     this.setLocationInTree(data![this.branch]);
    //   }else {
    //     this.fdb.collection('users').doc(this.id).collection('network').doc('tree').set([{'left':this.myid}]);
    //   }
    // })
  }

}
