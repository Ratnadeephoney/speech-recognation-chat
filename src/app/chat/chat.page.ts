import { Component, OnInit,ViewChildren,ViewChild,QueryList,ElementRef } from '@angular/core';
import { MiddlewareService } from '../shared/middleware.service';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

export interface Item {
  name:string,
  side:string,
  profile:string,
  datetime:string,
  message:string,
  from_id:string,
  to_id:string,
  status:string
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  @ViewChildren('messages') messages: QueryList<any>;
  @ViewChild('content') content: ElementRef;


  sr:any = SpeechRecognition
  loggedInuserId:any = localStorage.getItem("RegisterSignInPhoneIdVasaviTpg")
  to_chatUserId:string = localStorage.getItem('send_chat_profile_id_fromprofilepage_to_chatpage')
  from_chatUserId:string = localStorage.getItem("RegisterSignInPhoneIdVasaviTpg")
  userName:string = localStorage.getItem('send_chat_profile_name_fromprofilepage_to_chatpage')
  profileImg:string = localStorage.getItem('send_chat_profile_profile_fromprofilepage_to_chatpage')
  chatDataDisplay:any = []

  items: Item[] = [];
   newItem: Item = <Item>{};
  // @ViewChild('mylist')mylist: IonList
  listData = []
  from_p_t_c:any = []
  onetooneRelationCount:number
  get_allChat_messages:any = []

  constructor(
    private mw:MiddlewareService,
   // private ars:ActivatedRouteSnapshot,
    private ar:ActivatedRoute,
    private nv:NavController
  ) {
    //this.loadData()
    let ptc:any = this.ar.snapshot.params['p_t_c']
    this.from_p_t_c[0] = JSON.parse(ptc)
    //console.log("profile id")
    //console.log(this.from_p_t_c[0])
    //console.log(JSON.parse(this.from_p_t_c))
   }

  ngOnInit() {
    this.mw.get_one_toone_relation_count().subscribe((r) =>{
      let response:any = r
      this.onetooneRelationCount = response[0]
      //this.onetooneRelationCount = this.onetooneRelationCount + 1
      console.log(this.onetooneRelationCount)
    })
    this.getChat()
    //console.log(this.from_p_t_c[0].name)
    //this.from_p_t_c = this.ar.snapshot.paramMap.get("p_t_c")
    
    //console.log(JSON.parse(this.from_p_t_c.id))
    //this.test()
    // this.mw.getData('deepuu').then((r) =>{
    //   this.chatDataDisplay = r
    //   console.log(r)
    // })
    //this.mw.clearData('deepuu')
  }


  

ngAfterViewInit() {
  this.scrollToBottom();
  this.messages.changes.subscribe(this.scrollToBottom);
}

scrollToBottom = () => {
  try {
    this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
  } catch (err) {}
}

  listDataa:any = [] 
  // async loadData()
  // {
  //   //this.chatDataDisplay = await this.mw.getData('deepuu')
  //   this.mw.getData(this.to_chatUserId).then((r) =>{
  //     this.chatDataDisplay = r
  //     console.log(r)
  //   })
  // }

  //speech recognation
  SpeechRecognationMethod(s_s:number)
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
        this.sendMessages(rs[0])
        }

      },
      (onerror) => {
        console.log('error:', onerror)
        //alert(onerror)
        this.mw.presentToast(onerror)
    }
    )
  }

  sendMessages(inp_message:string)
  {
    let one_to_one_id:string = "bydefaultemptystring"
    let from_message_payload = {
      message_sender:this.loggedInuserId,//this.from_p_t_c[0].from_id,
      one_to_one_cid:this.from_p_t_c[0].one_to_one_cid,
      name:this.from_p_t_c[0].name,
      side:"",
      frommsg:'',
      tomsg:'',
      profile:this.from_p_t_c[0].profile,
      datetime:this.mw.timedate(),
      message:inp_message,
      from_id:this.from_p_t_c[0].from_id,
      to_id:this.from_p_t_c[0].to_id,
      status:''
    }
    
    let to_message_payload = {
      message_sender:this.loggedInuserId,//this.from_p_t_c[0].from_id,
      one_to_one_cid:this.from_p_t_c[0].one_to_one_cid,
      name:localStorage.getItem('registerLoggedInuserName'),
      side:"",
      frommsg:'',
      tomsg:'',
      profile:localStorage.getItem('registerLoggedInuserProfile'),
      datetime:this.mw.timedate(),
      message:inp_message,
      from_id:this.from_p_t_c[0].from_id,
      to_id:this.from_p_t_c[0].to_id,
      status:''
    }
    //console.log(from_message_payload)
    //this.test(message_payload)

    //self
    if(inp_message == '')
    {
      this.mw.presentToast('write something')
    }
    else{
      this.mw.senduserChatmessages(this.from_p_t_c[0].from_id,this.from_p_t_c[0].to_id,from_message_payload)
    this.mw.senduserChatmessages(this.from_p_t_c[0].to_id,this.from_p_t_c[0].from_id,to_message_payload)

    this.mw.twowaysenduserChatmessages(this.from_p_t_c[0].one_to_one_cid,from_message_payload)
    //this.mw.tosenduserChatmessages(this.from_p_t_c[0].to_id,this.from_p_t_c[0].from_id,from_message_payload)
    setTimeout(() => {
     // console.log('count : ',this.onetooneRelationCount)
      this.onetooneRelationCount = this.onetooneRelationCount + 1
      let match = `${this.onetooneRelationCount}`
      //console.log(localStorage.getItem('onttoonecount')+"=="+match)
      if(localStorage.getItem('onttoonecount') == match)
      {
        console.log('value changes in firebase')
        this.mw.one_toone_relation_count(this.onetooneRelationCount)
      }
      
    }, 2000);
  
    }
  }

  getChat()
  {
    this.mw.getChatMessages(this.from_p_t_c[0].one_to_one_cid).subscribe((m) =>{
      this.get_allChat_messages = m
      //console.log(this.get_allChat_messages)
    })
  }

  // delChat()
  // {
  //   this.mw.clearData(this.to_chatUserId)
  // }

  // test(payload:any)
  // {

  //   //this.newItem.modified = Date.now();
  //   //this.newItem.id = Date.now();
  
  //   // this.mw.createdata('hello',payload)
  //   // this.mw.retrivedata('hello').then((r) =>{
  //   //   console.log(r)
  //   // })

  //   this.mw.addData(this.to_chatUserId,payload)
  //   // this.mw.getData('deepuu').then((r) =>{
  //   //   this.chatDataDisplay = r
  //   //   console.log(r)
  //   // })
  //   this.loadData()
    
  // }


  videoCall()
  {
    this.nv.navigateForward('videocall')
  }

  voiceCall()
  {
    this.nv.navigateForward('audiocall')
  }
  //CREATE
  // addItem()
  // {
  //   this.newItem.modified = Date.now();
  //   this.newItem.id = Date.now();

  //   this.firebaseService.addItem(this.newItem,'deeputest').then(item =>{
  //     this.newItem = <Item>{};
  //     this.showToast('item added')
  //     this.loadItems();
  //   })
  // }

  // //READ
  // loadItems()
  // {
  //    this.firebaseService.getItems().then(items => {
  //     this.items = items;
  //   })
  // }

  // //UPDATE
  // updateItem(item:Item)
  // {
  //   item.title = `UPDATED: ${item.title}`;
  //   item.modified = Date.now();
  //   this.firebaseService.updateItem(item).then(item => {
  //     this.showToast('item Updated');
  //     this.mylist.closeSlidingItems();
  //     this.loadItems();
  //   })
    
  // }

  // //DELETE
  // deleteItem(item: Item)
  // {
  //   this.firebaseService.deleteItem(item.id).then(item => {
  //     this.showToast('Item removed');
  //     this.mylist.closeSlidingItems();
  //     this.loadItems();
  //   })
  // }

  // async showToast(msg)
  // {
  //   const toast = await this.toastController.create({
  //     message: msg,
  //     duration: 2000
  //   });
  //   toast.present();
  // }


}
