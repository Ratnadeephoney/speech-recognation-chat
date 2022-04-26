import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
//import * as $ from 'jquery'
import { HomePage } from '../home/home.page';
import { HomePageModule } from '../home/home.module';
import { Subscription } from 'rxjs';
//import { HomePage } from '../home/home.page';
import { NavController, ModalController, AlertController } from '@ionic/angular';
//import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { MiddlewareService } from '../shared/middleware.service';
import { TouchSequence } from 'selenium-webdriver';
@Component({
  selector: 'app-regnlogin',
  templateUrl: './regnlogin.page.html',
  styleUrls: ['./regnlogin.page.scss'],
})
export class RegnloginPage implements OnInit {
  //sr:any = SpeechRecognition
  getAllRegUsers:any = []
  getAllRegUsersPhone:any = []
  getAllRegUsersMail:any = []
  getAllRegUsersPassword:any = []
  reglog:boolean = true
  heading:any = 'Registration'
  hp:any
  response:any
  LoginDetailsArray:any = []
  

  

  //clickEventSubscription:Subscription;
  // @ViewChild('appDashboard', { static: false }) appDashboard: HomePage;

  // callSendWeatherResult(): void {
  // this.appDashboard.testrl()
  // }
  
  // registerationform = this.formbuilder.group({
  //   name: [],
  //   email: [],
  //   password: []
  // })

  constructor(
    //public formbuilder: FormBuilder,
    public nc:NavController,
    public mw:MiddlewareService
  ) { }

  ngOnInit() {
    console.log(this.mw.timedate())
    this.getRegloginDetails()
  }

  //toggle registration and signin
  signin()
  {
    this.reglog = false 
    this.heading = 'Sign In'
  }

  reg()
  {
    this.reglog = true
    this.heading = 'Registration'
  } 

  //registration
  signUp_registration(name_value:string,phone_value:string,email_value:string,password_value:string)
  {
    let t1,t2,t3,t4,t5,t6,t7:boolean = false
    //let payload:any
    let userId = `userregistrationandLoginforfinalyearproject${name_value}deepuiloveyou${phone_value}chatstatusvideocallfollowfollowingforfinalyearproject`
    localStorage.setItem("RegisterSignInPhoneIdVasaviTpg",userId)


    let registration_payload = {
      datetime:this.mw.timedate(),	
      name:name_value,
      phone:phone_value,
      email:email_value,
      dob:"",
      bio:"",
      status:"",
      proffission:"",
      nickname:"",
      profile:'https://firebasestorage.googleapis.com/v0/b/sproudknowledgechat.appspot.com/o/finalyearproject%2Fbaselineperson.jpeg.png?alt=media&token=26e286ce-618b-4ba9-98f6-dee3ec170e95',
      id: userId//payload.id,
    }

    //this.mw.registerLoginDetails('userregistrationandLoginDetails',registration_payload)

    let registration_info_payload = {
      datetime:this.mw.timedate(),	
      name:name_value,
      phone:phone_value,
      email:email_value,
      password:password_value,
      dob:"",
      bio:"",
      status:"",
      proffission:"",
      nickname:"",
      profile:'https://firebasestorage.googleapis.com/v0/b/sproudknowledgechat.appspot.com/o/finalyearproject%2Fbaselineperson.jpeg.png?alt=media&token=26e286ce-618b-4ba9-98f6-dee3ec170e95',
      id:userId//payload.id,
    }

  
    //signUp
    this.mw.signUp(email_value,password_value).then((res) =>{
      //payload = res.key
      //console.log(payload.id)
      this.mw.presentToast('registration succussfully')
    })
    .catch((e) =>{
      this.mw.presentToast('registration failed'+e)
    })

    //console.log(registration_payload)
    this.mw.userDatabaseRegistration(userId,registration_payload)
    {
      t1 = true
      
    }

   // console.log(registration_info_payload)

    this.mw.userDatabaseInfo(userId,registration_info_payload)
    {
      t2 = true 
    }

    // this.mw.userDatabaseChat(userId,{status:true})
    // {
    //   t3 = true
    // }

    // this.mw.userDatabaseStatus(userId,{status:true})
    // {
    //   t4 = true
    // }

    // this.mw.userDatabaseVideocall(userId,{status:true})
    // {
    //   t5 = true
    // }

    // this.mw.userDatabaseFollowers(userId,{status:true})
    // {
    //   t6 = true
    // }

    // this.mw.userDatabaseFollowing(userId,{status:true})
    // {
    //   t7 = true
    // }

    this.mw.userDatabasemanytomanyfollowersfollowing(userId,{status:true})

    if(t1 && t2)//&& t3 && t4 && t5 && t6 && t7 
    {
      //console.log("all is true")
      localStorage.setItem('user_login_logout','1')
      this.nc.navigateForward(['/main'], {});
    }
    // this.mw.userDatabaseManytoManyRelationship(phone_value,{status:true})
    // {
      
    // }


  }

  
  //sign in log in
  signIn(email_value,password_value)
  {
    //let userId = `userregistrationandLoginforfinalyearproject${phone_value}chatstatusvideocallfollowfollowingforfinalyearproject`
    
    this.mw.signIn(email_value,password_value).then(() =>{
      //localStorage.setItem("RegisterSignInPhoneIdVasaviTpg",phone_value)
      this.mw.presentToast('login succussfully')
      
    })
    .catch((e) =>{
      this.mw.presentToast('login failed'+e)
    })

    this.mw.loginDetails('').subscribe((r) =>{
      let res:any = r
      //console.log(r)
      res.map(f =>{
        //console.log(f.email)
        if(f.email == email_value)
        {
          //console.log(f.id)
          let registration_payload = {
            datetime:this.mw.timedate(),	
            name:f.name,
            phone:f.phone,
            email:f.email,
            dob:"",
            bio:"",
            password:password_value,
            status:"",
            proffission:"",
            nickname:"",
            profile:'https://firebasestorage.googleapis.com/v0/b/sproudknowledgechat.appspot.com/o/finalyearproject%2Fbaselineperson.jpeg.png?alt=media&token=26e286ce-618b-4ba9-98f6-dee3ec170e95',
            id:f.id//payload.id,
          }
          localStorage.setItem('user_login_logout','1')
          localStorage.setItem("RegisterSignInPhoneIdVasaviTpg",f.id)
          //this.mw.registerLoginDetails('userregistrationandLoginDetails',registration_payload)
          //console.log(localStorage.getItem("RegisterSignInPhoneIdVasaviTpg"))
          this.nc.navigateForward('main')
        }
      })
    })
  }

  getRegloginDetails()
  {
    //localStorage.setItem('user_login_logout','0')
    if(localStorage.getItem('user_login_logout') == '1')
    {
      this.nc.navigateForward('main')
      console.log('login navigate to main page')
    }
  }
}
