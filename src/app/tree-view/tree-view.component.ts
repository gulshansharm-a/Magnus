import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as $ from 'jquery'
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {
   myid?:string='';
    stack:string[] = new Array<string>();
   left:string='';
    left_left:string='';
    left_right:string='';
     left_left_left:string='';
     left_left_right:string='';
     left_right_left:string='';
     left_right_right:string='';
     left_?:boolean;
     left_left_?:boolean;
    left_right_?:boolean;
     left_left_left_?:boolean;
     left_left_right_?:boolean;
     left_right_left_?:boolean;
     left_right_right_?:boolean;

   right:string = ''
    right_left:string='';
    right_right:string='';
      right_left_left:string='';
      right_left_right:string='';
      right_right_left:string='';
      right_right_right:string='';
      
      right_?:boolean
      right_left_?:boolean;
      right_right_?:boolean;
      right_left_left_?:boolean;
      right_left_right_?:boolean;
      right_right_left_?:boolean;
      right_right_right_?:boolean;

  constructor(public fauth:AngularFireAuth, public fdb:AngularFirestore) {

    fauth.user.subscribe(user=>{
      this.myid = user?.uid
     this.addDataToTree(user?.uid!);
    })
   
   

   }

   
   
  ngOnInit(): void {

    }

    public addDataToTree(user:string):void {
      this.myid = user;
      this.stack.push(user)
      this.fdb.collection('users').doc(user).collection('tree').doc('childs').valueChanges().subscribe(data=>{
        console.log(data!['left']);
        this.left = data!['left'];
        this.right = data!['right'];
        this.fdb.collection<User>('users').doc(this.left).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.left_=true
          }else this.left_ =false
        })

        this.fdb.collection<User>('users').doc(this.right).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.right_=true
          }else this.right_ = false
        })
        

      // left_left and left_right
      this.fdb.collection('users').doc(this.left).collection('tree').doc('childs').valueChanges().subscribe(data=>{
        console.log(data!['left']);
        this.left_left = data!['left'];
        this.left_right = data!['right'];

        this.fdb.collection<User>('users').doc(this.left_right).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.left_right_=true
            console.log('true')
          }else{
            this.left_right_=false
          }
          
        })
        this.fdb.collection<User>('users').doc(this.left_left).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.left_left_=true
            console.log('true')
          }else{
            this.left_left_=false
          }
          
        })

        this.fdb.collection('users').doc(this.left_left).collection('tree').doc('childs').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.left_left_left = data!['left'];
          this.left_left_right = data!['right'];

          this.fdb.collection<User>('users').doc(this.left_left_right).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.left_left_right_=true
              console.log('true')
            }else this.left_left_right_=false
            
          })
          this.fdb.collection<User>('users').doc(this.left_left_left).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.left_left_left_=true
              console.log('true')
            }else this.left_left_left_=false
          })
  
        });

        this.fdb.collection('users').doc(this.left_right).collection('tree').doc('childs').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.left_right_left = data!['left'];
          this.left_right_right = data!['right'];
  
        });


      });

      // right_left right_right
      this.fdb.collection('users').doc(this.right).collection('tree').doc('childs').valueChanges().subscribe(data=>{
        console.log(data!['left']);
        this.right_left = data!['left'];
        this.right_right = data!['right'];
        this.fdb.collection<User>('users').doc(this.right_right).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.right_right_=true
            console.log('true')
          }else this.right_right_ = false
          
        })
        this.fdb.collection<User>('users').doc(this.right_left).valueChanges().subscribe(data=>{
          if(data?.invitationid==this.myid)  {
            this.right_left_=true
            console.log('true')
          }else this.right_left_=false
          
        })
        this.fdb.collection('users').doc(this.right_left).collection('tree').doc('childs').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.right_left_left = data!['left'];
          this.right_left_right = data!['right'];

          this.fdb.collection<User>('users').doc(this.right_left_right).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.right_left_right_=true
              console.log('true')
            } else   this.right_left_right_=false
            
          })
          this.fdb.collection<User>('users').doc(this.right_left_left).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.right_left_left_=true
              console.log('true')
            }
            else this.right_left_left_=false
            
          })
  
        });

        this.fdb.collection('users').doc(this.right_right).collection('tree').doc('childs').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.right_right_left = data!['left'];
          this.right_right_right = data!['right'];
          this.fdb.collection<User>('users').doc(this.right_right_right).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.right_right_right_=true
              console.log('true')
            }
            else this.right_right_right_=false
            
          })
          this.fdb.collection<User>('users').doc(this.right_right_left).valueChanges().subscribe(data=>{
            if(data?.invitationid==this.myid)  {
              this.right_right_left_=true
              console.log('true')
            }
            else this.right_right_left_=false
            
          })
  
        });

      });


      });
    }



}
interface User{
  email:string;
  invitationid:string;
  fullName:string;
  nobNum:string;
  uID?:string;
}