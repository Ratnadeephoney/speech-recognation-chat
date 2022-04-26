import { Component, OnInit } from '@angular/core';
import { MiddlewareService } from '../shared/middleware.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

declare const runSpeechRecognition:any

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  sr:any = SpeechRecognition


  loginuserId:string = localStorage.getItem("RegisterSignInPhoneIdVasaviTpg")
  get_all_chat_users:any = []
  get_all_followers:any = []
  get_all_following:any = []
  get_all_info:any = []
  get_all_status:any = []
  get_all_videocalls:any = []
  allSearchRegisteredUsers:any = []
  touctoutsideandemptysearch:boolean = false
  userProfileInfo:any = []
  lhsArray:any = []
  filePath:any = []
  filename:any
  profile_img:any
  profileImg:boolean = false
  progressBar:any
  srSearch:string = ''
  chat_tab:boolean = true
  onetooneRelationCount:number

  constructor( 
    private mw:MiddlewareService,
    private nv:NavController
  ) { }

  ngOnInit() {
    this.getAllUserData()
    //this.mw.one_toone_relation_count(0)
    this.mw.get_one_toone_relation_count().subscribe((r) =>{
      let response:any = r
      this.onetooneRelationCount = response[0]
      //this.onetooneRelationCount = this.onetooneRelationCount + 1
      console.log(this.onetooneRelationCount)
    })
    
  }

  statusTab()
  {
    this.chat_tab = false
  }
  videocallTab()
  {
    this.chat_tab = false
  }
  profileTab()
  {
    this.chat_tab = false
  }

  getAllUserData()
  {

    //search users 

    //chats
    this.mw.chat_status_followers_following_info_videocalls(this.loginuserId,'chats').subscribe((r) =>{
    this.get_all_chat_users = r
    //console.log(this.get_all_chat_users)
    })
    //followers
    this.mw.chat_status_followers_following_info_videocalls(this.loginuserId,'followers').subscribe((r) =>{
      this.get_all_followers = r
    })

    //following
    this.mw.chat_status_followers_following_info_videocalls(this.loginuserId,'following').subscribe((r) =>{
      this.get_all_following = r

    })

    //info
    this.mw.chat_status_followers_following_info_videocalls(this.loginuserId,'info').subscribe((r) =>{
      this.get_all_info = r
    })

    //status
    this.mw.chat_status_followers_following_info_videocalls(this.loginuserId,'status').subscribe((r) =>{
      //this.get_all_status = r
    })

    //video calls
    this.mw.chat_status_followers_following_info_videocalls(this.loginuserId,'videocalls').subscribe((r) =>{
      this.get_all_videocalls = r
    })


    //login usercetails
    this.mw.loginDetails('').subscribe(val =>{
      // this.allusersgetdatadeepu = JSON.stringify(val)
      // console.log(this.allusersgetdatadeepu)
      let pro = val
      pro.map( (profile) =>{
        let pid:any = profile
        if(pid.id == this.loginuserId)
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
            requeststatus: 'follow',
            id:pid.id,
            //connectid: pid.connectid
          }
          localStorage.setItem('registerLoggedInuserName',pid.name)
          localStorage.setItem('registerLoggedInuserProfile',pid.profile)
        //console.log(profile_info)
        this.userProfileInfo[0] = profile_info

        //console.log(this.userProfileInfo[0].id,this.userProfileInfo[0].name,this.userProfileInfo[0].phone,this.userProfileInfo[0].profile)
        }
      })
      //this.allfriendRequests = val
     // this.friendsinterfaceinfo  = this.allfriendRequests
     // console.log(val)
      
     this.mw.gettimeslot().subscribe((r) =>{
       this.get_all_status = r
       console.log(this.get_all_status)
     })
      
    })
    

    // this.result = this.firebaseService.readFunctionality()
    // console.log(this.result)
    
  //}



  }


  searchKeyupItems(value)
  {
    //console.log(value)
    let results = []
    let result = []
    let input = value//this.searchInput.value
    if(value == '')
      {
        this.touctoutsideandemptysearch = false
        this.allSearchRegisteredUsers = []
      }
      else
      {
        this.touctoutsideandemptysearch = true
     
    this.mw.searchFriends('').subscribe((s) =>{
      let search:any = s
      console.log(s)
      search.filter((m) =>{
        this.l_h_s(this.loginuserId,m.id)
        this.l_h_s(m.id,this.loginuserId)
        let jso = {
          name:m.name,
          id:m.id,
          phone:m.phone,
          profile:m.profile,
          nickname:m.nickname,
          regid:this.loginuserId,
          left:true,//localStorage.getItem(m.id),this.l_h_s(this.noselfFriend,m.id)
          right:'',
          status:'follow'
        }
        
          results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          // results.push(jso)
          
          if(!result.includes(m.id))
          {
            result.push(m.id)
            if(input.length)
            { //this.searchable
             
                this.allSearchRegisteredUsers = results.filter((item) =>{
                  
                    return item.name.toString().toLowerCase().includes(input.toString().toLowerCase()) 
                   
              })
              
              
            }
          }
          
        
        //console.log(jso)
        //console.log(results)
       

      })
    })
  }
  }

  
  l_h_s(self:string,id:string)
  {
    this.mw.following_followers(self,id).subscribe((d) =>{
      let search:any = d
      this.lhsArray[self+id] = search[0]
      //console.log(this.lhsArray)
    })
  }

  //sendFriendRequest
  frms:any
  sendRequest(status:number,v2:string)
  {
    // this.ifsendRequest = false;
    // this.ifrequested = true;
    // this.iffollowing = false;
    //let create_cid = `${this.noselfFriend}s${v2}` 
    //console.log(v2)
    //this.firebaseService.follow(v2,this.noselfFriend)
   
    //following
      if(status == 1)
      {
        // this.ffs.follow(this.noselfFriend,v2).set({status:true}).then(res =>{
        //   console.log(this.lhsArray)
        // })
        this.mw.follow(this.loginuserId,v2).remove().then(() =>{
          this.l_h_s(this.loginuserId,v2)
        })
      }
      else{

      }
      //follow
      if(status == 2)
      {
        this.mw.follow(this.loginuserId,v2).set({status:true}).then(res =>{
          this.l_h_s(this.loginuserId,v2)
          //console.log(this.lhsArray)
        })
      }
      else{

      }
      //requested
      if(status == 3)
      {
        // this.ffs.follow(this.noselfFriend,v2).set({status:true}).then(res =>{
        // //this.lhsArray[v2+this.noselfFriend] = true
        // console.log(this.lhsArray)
        // })
        this.mw.follow(this.loginuserId,v2).remove().then(() =>{
          this.l_h_s(this.loginuserId,v2)
        })
      }
      else{

      }
    
    
    //this.firebaseService.unFollow(this.noselfFriend, v2,this.noselfFriend)
  //   this.firebaseService.sendRequest('RegisteationLoginchatstatusvideocallfriends',v2,create_cid,{id:v2,fromstatus:'requested',tostatus:'accept'})
  //  setTimeout(() => {
  //   // this.firebaseService.getallsendRequestData('RegisteationLoginchatstatusvideocallfriends',v2,create_cid,).subscribe((r) =>{
  //   //   this.allRequested  = r
  //   //   console.log(this.allRequested)
  //   // })
  //   this.firebaseService.getsendRequestData('RegisteationLoginchatstatusvideocallfriends',v2,create_cid,).get().then((r) =>{
  //     this.frms = r.toJSON()
  //     this.allfollowing
  //     console.log(this.frms)
  //   })
  //  }, 1000);
  }


  updateprofileDetails(name_value,nickname_value,dateofbirth_value,bio_value,profission_value,status_value,phone_value,email_value,profilevalue,id)
  {
    //localStorage.setItem(this.loginuserId+'download_profile_url_for_vasavi_tpg',profilevalue)
    // let profileImg
    // if(profilevalue == localStorage.getItem(this.loginuserId+'download_profile_url_for_vasavi_tpg'))
    // {
    //   profileImg = profilevalue
    // }
    // else{
    //   profileImg = localStorage.getItem(this.loginuserId+'download_profile_url_for_vasavi_tpg')
    // }
    let profileImage = profilevalue
    if(this.profileImg)
    {
      profileImage = localStorage.getItem(this.loginuserId+'download_profile_url_for_vasavi_tpg')
      console.log(profileImage)
    } 
   
    let profile_info = {
      name:name_value,
      phone:phone_value,
      email:email_value,
      dob:dateofbirth_value,
      bio:bio_value,
      proffission:profission_value,
      status:status_value,
      password:'',
      nickname:nickname_value,
      profile:profileImage,
      id:id,
     
    }
    console.log(profile_info)
    setTimeout(() => {
      this.mw.userDatabaseRegistration(id,profile_info)
    }, 1000);
    
  }

  updateProfileImage(e)
  {
    const file = (e.target as HTMLInputElement).files[0];
    //console.log(file)
    //this.myForm.get('img').updateValueAndValidity()
    let d_url = ''
    this.filename = file.name
    const reader = new FileReader();
    //console.log(reader)
    const promise = new Promise((resolve, reject) => {
    reader.onload = () => {
      this.filePath = reader.result as string;
      //this.addProfileInput.src = this.filePath
      
        let uploadTask =  this.mw.uploadProfile(this.loginuserId,this.filename).put((e.target as HTMLInputElement).files[0])
        uploadTask.on('state_changed', (sc) =>{
          this.progressBar = sc.bytesTransferred / sc.totalBytes * 100;
          sc.ref.getDownloadURL().then((d) =>{
            d_url = d
            this.profileImg = true
            localStorage.setItem(this.loginuserId+'download_profile_url_for_vasavi_tpg',d)
           // this.profile_img_.src = d
                console.log(d)
              })
        })

    }
    reader.readAsDataURL(file)
    })
    setTimeout(() => {
      console.log("called")
      //this.addprofile()
      }, 3000);
  }

  viewProfile(id)
  {
    localStorage.setItem('send_profile_id_fron_mainpage_to_profilePage',id)
    console.log(localStorage.getItem('send_profile_id_fron_mainpage_to_profilePage'))
    this.nv.navigateForward('profile')
  }

  
  viewFollowers()
  {
    this.nv.navigateForward('followers')
  }

  viewFollowing()
  {
    this.nv.navigateForward('following')
  }

  viewchat(id:string,name:string,profile:string)
  {
    let one_to_one_id:string = "bydefaultemptystring"
    let main_to_chat = { 
      message_sender:'',
      one_to_one_cid:'',
      name:name,
      side:"",
      frommsg:'',
      tomsg:'',
      profile:profile,
      datetime:this.mw.timedate(),
      message:'',
      from_id:localStorage.getItem("RegisterSignInPhoneIdVasaviTpg"),
      to_id:id,
      status:''
     };
    console.log(id)
    console.log(name)
    console.log(profile)
    localStorage.setItem('send_chat_profile_id_fromprofilepage_to_chatpage',id)
    localStorage.setItem('send_chat_profile_name_fromprofilepage_to_chatpage',name)
    localStorage.setItem('send_chat_profile_profile_fromprofilepage_to_chatpage',profile)
    //this.nv.navigateForward('chat')
    this.nv.navigateForward(['/chat',{
      p_t_c:JSON.stringify(main_to_chat)
    }]);
  }

  viewChatting(from_id:string,to_id:string,name:string,profile:string,one_to_one_cid)
  {
    let one_to_one_id:string = "bydefaultemptystring"
    let main_to_chat = { 
      message_sender:'',
      one_to_one_cid:one_to_one_cid,
      name:name,
      side:"",
      frommsg:'',
      tomsg:'',
      profile:profile,
      datetime:this.mw.timedate(),
      message:'',
      from_id:from_id,//localStorage.getItem("RegisterSignInPhoneIdVasaviTpg"),
      to_id:to_id,
      status:''
     };
    // console.log(from_id)
    // console.log(name)
    // localStorage.setItem('send_chat_profile_id_fromprofilepage_to_chatpage',id)
    localStorage.setItem('send_chat_profile_name_fromprofilepage_to_chatpage',name)
    localStorage.setItem('send_chat_profile_profile_fromprofilepage_to_chatpage',profile)
    //this.nv.navigateForward('chat')
    //console.log(main_to_chat)
    this.nv.navigateForward(['/chat',{
      p_t_c:JSON.stringify(main_to_chat)
    }]);
  }

  
  SpeechRecognationMethod(s_s:number,from_id:string,to_id:string,name:string,profile:string,one_to_one_cid)
  {
    this.sr.hasPermission()
    .then((hasPermission: boolean) => console.log(hasPermission))

    this.sr.requestPermission()
    .then(
      () => {
        //alert('granted')
        //console.log('Granted')
        //this.mw.presentToast('permission granted')
      },
      () => {
        //alert('deninded')
        //this.mw.presentToast('permission denined')
        //console.log('Denied')
      }
    )

    this.sr.isRecognitionAvailable().then((available: boolean) => {
      //console.log(available)
      //this.mw.presentToast(available.toString())
      //alert(available)
    })
    this.sr.startListening('')
    .subscribe(
      (matches: Array<string>) => {
        let rs:any = []
        rs = matches
        //let sst_search:any = s_s
        if(s_s == 1)
        {
          if(rs[0] == 'open chat' || rs[0] == 'show chat')
          {
            this.viewchat(this.userProfileInfo[0].id,this.userProfileInfo[0].name,this.userProfileInfo[0].profile)
          }
          else if(rs[0] == 'open followers' || rs[0] == 'show followers')
          {
            this.viewFollowers()
          }
          else if(rs[0] == 'open following' || rs[0] == 'show following')
          {
            this.viewFollowing()
          }
          else{
            this.searchKeyupItems(rs[0])
            this.srSearch = rs[0]
          }
          
        }
        else if(s_s == 2)
        {
          this.sendMessages(rs[0],from_id,to_id,name,profile,one_to_one_cid)
        }

      },
      (onerror) => {
        console.log('error:', onerror)
        //alert(onerror)
        this.mw.presentToast(onerror)
    }
    )
  }


  sendMessages(inp_message:string,from_id:string,to_id:string,name:string,profile:string,one_to_one_cid:string)
  {
    let one_to_one_id:string = "bydefaultemptystring"
    let voice_chat = { 
      message_sender:from_id,
      name:name,
      one_to_one_cid:one_to_one_cid,
      side:"",
      frommsg:'',
      tomsg:'',
      profile:profile,
      datetime:this.mw.timedate(),
      message:inp_message,
      from_id:from_id,//localStorage.getItem("RegisterSignInPhoneIdVasaviTpg"),
      to_id:to_id,
      status:''
     };

     let to_message_payload = {
      message_sender:from_id,
      name:localStorage.getItem('registerLoggedInuserName'),
      one_to_one_cid:one_to_one_cid,
      side:"",
      frommsg:'',
      tomsg:'',
      profile:localStorage.getItem('registerLoggedInuserProfile'),
      datetime:this.mw.timedate(),
      message:inp_message,
      from_id:from_id,//localStorage.getItem("RegisterSignInPhoneIdVasaviTpg"),
      to_id:to_id,
      status:''
    }
    this.mw.senduserChatmessages(from_id,to_id,voice_chat)
    this.mw.senduserChatmessages(to_id,from_id,to_message_payload)

    this.mw.twowaysenduserChatmessages(from_id+to_id,voice_chat)
    //this.mw.tosenduserChatmessages(to_id,from_id,voice_chat)
  
  }

  logout()
  {
    localStorage.setItem('user_login_logout','0')
    this.nv.navigateForward('regnlogin')
  }




  inserttimeslot(id:string,type:string,slottime:string)
  {
    let payload = {
      id:id,
      type:type,
      value:this.mw.datetime,
      status:true,
      slottime:slottime
    }
    this.mw.inserttimeslot(payload,id)
  }

  modifiedtimeslot(id:string,type:string,slottime:string)
  {
    let payload = {
      id:id,
      type:type,
      value:this.mw.datetime,
      status:false,
      slottime:slottime
    }
    this.mw.inserttimeslot(payload,id)
  }
}
