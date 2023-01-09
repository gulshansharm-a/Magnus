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

   left:string='';
    left_left:string='';
    left_right:string='';
     left_left_left:string='';
     left_left_right:string='';
     left_right_left:string='';
     left_right_right:string='';


   right:string = ''
    right_left:string='';
    right_right:string='';
      right_left_left:string='';
      right_left_right:string='';
      right_right_left:string='';
      right_right_right:string='';

   
  constructor(public fauth:AngularFireAuth, public fdb:AngularFirestore) {

    fauth.user.subscribe(user=>{
      this.myid = user?.uid
      // left and right logic
     this.addDataToTree(user?.uid!);
  
    })
   
   

   }

   

  ngOnInit(): void {
    }

    public addDataToTree(user:string):void {
      this.fdb.collection('users').doc(user).collection('network').doc('tree').valueChanges().subscribe(data=>{
        console.log(data!['left']);
        this.left = data!['left'];
        this.right = data!['right'];

      // left_left and left_right
      this.fdb.collection('users').doc(this.left).collection('network').doc('tree').valueChanges().subscribe(data=>{
        console.log(data!['left']);
        this.left_left = data!['left'];
        this.left_right = data!['right'];

        this.fdb.collection('users').doc(this.left_left).collection('network').doc('tree').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.left_left_left = data!['left'];
          this.left_left_right = data!['right'];
  
        });

        this.fdb.collection('users').doc(this.left_right).collection('network').doc('tree').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.left_right_left = data!['left'];
          this.left_right_right = data!['right'];
  
        });


      });

      // right_left right_right
      this.fdb.collection('users').doc(this.right).collection('network').doc('tree').valueChanges().subscribe(data=>{
        console.log(data!['left']);
        this.right_left = data!['left'];
        this.right_right = data!['right'];

        this.fdb.collection('users').doc(this.right_left).collection('network').doc('tree').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.right_left_left = data!['left'];
          this.right_left_right = data!['right'];
  
        });

        this.fdb.collection('users').doc(this.right_right).collection('network').doc('tree').valueChanges().subscribe(data=>{
          console.log(data!['left']);
          this.right_right_left = data!['left'];
          this.right_right_right = data!['right'];
  
        });

      });


      });
    }



}
