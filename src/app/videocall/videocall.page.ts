import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Platform } from '@ionic/angular';
import { MiddlewareService } from '../shared/middleware.service';

@Component({
  selector: 'app-videocall',
  templateUrl: './videocall.page.html',
  styleUrls: ['./videocall.page.scss'],
})
export class VideocallPage implements OnInit {
  //private androidPermissions: AndroidPermissions
  //private platform : Platform

  constructor(
    private platform : Platform,
    private androidPermissions: AndroidPermissions,
    private mw : MiddlewareService
  ) { 
    platform.ready().then(() => {

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => {
        this.mw.presentToast('Has permission?'+result.hasPermission)
      },
        err => {
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    });
      

       this.androidPermissions.requestPermissions(
       [
           this.androidPermissions.PERMISSION.CAMERA, 
           this.androidPermissions.PERMISSION.CALL_PHONE, 
           this.androidPermissions.PERMISSION.GET_ACCOUNTS, 
           this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
           this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
           ]
           //this.mw.presentToast('')
       );
      
    }).then(
          () => {
            //alert('granted')
            //console.log('Granted')
            this.mw.presentToast('permission granted')
          },
          () => {
            //alert('deninded')
            this.mw.presentToast('permission denined')
            //console.log('Denied')
          }
        )

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    // );
    
    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    
      
      
  }

  ngOnInit() {
  }

  allandroidPermissions()
  {
    
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.CAMERA, 
      this.androidPermissions.PERMISSION.CALL_PHONE, 
      this.androidPermissions.PERMISSION.GET_ACCOUNTS, 
      this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      ])
    }   
    
  //   this.androidPermissions.hasPermission()
  //   .then((hasPermission: boolean) => console.log(hasPermission))

  //   this.androidPermissions.requestPermission()
  //   .then(
  //     () => {
  //       //alert('granted')
  //       //console.log('Granted')
  //       //this.mw.presentToast('permission granted')
  //     },
  //     () => {
  //       //alert('deninded')
  //       //this.mw.presentToast('permission denined')
  //       //console.log('Denied')
  //     }
  //   )
  // }

}
