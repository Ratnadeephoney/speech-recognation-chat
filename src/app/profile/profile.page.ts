import { Component, OnInit } from '@angular/core';
import { MiddlewareService } from '../shared/middleware.service';
import { NavController } from '@ionic/angular';
import { Interface } from 'readline';
declare const runSpeechRecognition:any


export interface profile_to_chat {
      name:string,
      side:string,
      frommsg:string,
      tomsg:string,
      profile:string,
      datetime:string,
      message:string,
      from_id:string,
      to_id:string,
      status:string
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  getuserId:string = localStorage.getItem('send_profile_id_fron_mainpage_to_profilePage')
  userProfileInfo:any = []
  onetooneRelationCount:number



  constructor(
    private mw:MiddlewareService,
    private nv:NavController
  ) { }

  ngOnInit() {
    console.log(this.getuserId)
    this.profileDetails()
    this.mw.get_one_toone_relation_count().subscribe((r) =>{
      let response:any = r
      this.onetooneRelationCount = response[0]
      //this.onetooneRelationCount = this.onetooneRelationCount + 1
      console.log(this.onetooneRelationCount)
    })
    //console.log(this.reverseString(12345))
  }

  reverseString(str) 
  {
    let s:string = `${str}`
    return s.split("").reverse().join("");  
    //return s.reverse()
  }

  profileDetails()
  {
    this.mw.loginDetails('').subscribe(val =>{
      // this.allusersgetdatadeepu = JSON.stringify(val)
      // console.log(this.allusersgetdatadeepu)
      let pro = val
      pro.map( (profile) =>{
        let pid:any = profile
        if(pid.id == this.getuserId)
        {
          let profile_info = {
            name:pid.name,
            phone:pid.phone,
            email:pid.email,
            dob:pid.dob,
            bio:pid.bio,
            status:pid.status,
            proffission:pid.proffission,
            password:'',
            nickname:pid.nickname,
            profile:pid.profile,
            id:pid.id,
            
          }
        //console.log(profile_info)
        this.userProfileInfo[0] = profile_info

        }
      })
      //this.allfriendRequests = val
     // this.friendsinterfaceinfo  = this.allfriendRequests
     // console.log(val)
      
      
    })
    
  }

  async de()
  {
   //await runSpeechRecognition()
   this.mw.speechRecognation((r) =>{
     console.log(r)
   })
  }

  viewFollowers()
  {
    //testdeepu(1,1,1)
    this.nv.navigateForward('followers')
  }

  viewFollowing()
  {
    this.nv.navigateForward('following')
  }

  viewchat(id:string,name:string,profile:string,ctco:string,message_sender:string)
  {
    let one_to_one_id:string = "bydefaultemptystring"
    one_to_one_id = ctco
    let d:string = `tcejorprawsdrthbdfokdg${0}${0}gdkofdbhtrdswarproject`
    let o_t_o_cid:string
    if(one_to_one_id == '' || one_to_one_id == undefined || one_to_one_id == 'bydefaultemptystring' || one_to_one_id.slice(0,5) != d.slice(0,5))
    {
      this.onetooneRelationCount = this.onetooneRelationCount + 1
      o_t_o_cid = `tcejorprawsdrthbdfokdg${this.onetooneRelationCount}${this.reverseString(this.onetooneRelationCount)}gdkofdbhtrdswarproject`
      let senv = `${this.onetooneRelationCount}`
      localStorage.setItem('onttoonecount',senv)
      // setTimeout(() => {
        
      // }, 2000);
    }
    else if(one_to_one_id.slice(0,5) == d.slice(0,5))
    {
      localStorage.setItem('onttoonecount','notallowed')
      o_t_o_cid = one_to_one_id
    }

    console.log("from id : ",localStorage.getItem("RegisterSignInPhoneIdVasaviTpg"))
    let profile_to_chat = { 
      message_sender:message_sender,
      one_to_one_cid:o_t_o_cid,
      name:name,
      side:"",
      frommsg:'',
      tomsg:'',
      profile:profile,
      datetime:this.mw.timedate(),
      message:'',
      from_id:localStorage.getItem("RegisterSignInPhoneIdVasaviTpg"),
      to_id:id,//localStorage.getItem("RegisterSignInPhoneIdVasaviTpg"),
      status:''
     };
     console.log(profile_to_chat)
     localStorage.setItem('onetoonerelationshipvideocallingpeertopeer',o_t_o_cid)


    // console.log("profile link : "+profile)
    // localStorage.setItem('send_chat_profile_id_fromprofilepage_to_chatpage',id)
    localStorage.setItem('send_chat_profile_name_fromprofilepage_to_chatpage',name)
    localStorage.setItem('send_chat_profile_profile_fromprofilepage_to_chatpage',profile)
    //this.nv.navigateForward(['chat',{p_t_c:profile_to_chat}])
    this.nv.navigateForward(['/chat',{
      p_t_c:JSON.stringify(profile_to_chat)
    }]);
    // this.nv.navigate(['namepage',JSON.stringify(data)]);
    
  }
}
