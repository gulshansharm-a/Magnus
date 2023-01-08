import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { getAuth } from '@firebase/auth';
import { addDoc } from '@firebase/firestore';
import { collection } from '@angular/fire/firestore';
import { data } from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  
  constructor(private fireauth : AngularFireAuth, private router : Router  , private afs : AngularFirestore) { }

  // login method
  login(email : string, password : string) {
    console.log(email , password)
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        
        if(res.user?.emailVerified == true) {
          this.router.navigate(['dashboard']);
        } 
        
    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

  
  // register method
  register(email : string, password : string  , name : string , mobileNo : string , invitationCode :string) {
    console.log('hello')
    // console.log(email , password)
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
     console.log('djfkjaksdl');
       this.afs.collection('users').add({
        email : email , fullName : name ,
        mobNum : mobileNo , invitationid : invitationCode
      })
      
      
      alert('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/registration']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      // this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgotPassword(email : string) {
      this.fireauth.sendPasswordResetEmail(email).then(() => {
        this.router.navigate(['/varify-email']);
      }, err => {
        alert('Something went wrong');
      })
  }
  
}
interface Udata{
    email :string;
    fullName:string;
    mobNum:string;
    invitationid:string;
}
