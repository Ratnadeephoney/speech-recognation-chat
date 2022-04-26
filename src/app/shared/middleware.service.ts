import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
//import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
//import { Storage } from '@ionic/storage'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { SpeechRecognition } from '@ionic-native/speech-recognition';
//import { Storage } from '@ionic/storage-angular';
declare const runSpeechRecognition:any

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

@Injectable({
  providedIn: 'root'
})
export class MiddlewareService {
  sr:any = SpeechRecognition
  //private _storage: Storage | null = null;

  constructor(
    public toastController: ToastController,
    public angulardb: AngularFireDatabase,
    public auth: AngularFireAuth,
    public storage:AngularFireStorage,
    //private s: Storage
  ) {
    this.init();
   }
   async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    //const storage = await this.s.create();
    //this._storage = storage;
  }


  //date time
  currentdate = new Date(); 
  datetime:any = this.currentdate.getDate() + "/"
                + (this.currentdate.getMonth()+1)  + "/" 
                + this.currentdate.getFullYear() + " "  
                + this.currentdate.getHours() + ":"  
                + this.currentdate.getMinutes() + ":" 
                + this.currentdate.getSeconds();
  
timedate()
{
  let currentdate1 = new Date(); 
  let datetime1:any = currentdate1.getDate() + "/"
                + (currentdate1.getMonth()+1)  + "/" 
                + currentdate1.getFullYear() + " "  
                + currentdate1.getHours() + ":"  
                + currentdate1.getMinutes() + ":" 
                + currentdate1.getSeconds();
  return datetime1
}

  //toast service
  async presentToast(message: string) {
    const toast = await this
            .toastController
            .create({'position': 'top', 'duration': 2000, 'message': message, 'cssClass': 'my-custom-toast'});
    toast.present();
  }

  //signUp
    signUp(email:string,password:string)
    {
      return this.auth.createUserWithEmailAndPassword(email,password)
    }

    //signIn
    signIn(email:string,password:string)
    {
      return this.auth.signInWithEmailAndPassword(email,password)
    }

    //store login info and id
    loginDetails(uid:string)
    {
      //return this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG').child('userregistrationandLoginforfinalyearproject').child(uid)
      return this.angulardb.list(`finalYearProjectForVasaviCollegeTPG/userregistrationandLoginforfinalyearproject`).valueChanges()
    }

    userDatabaseRegistration(id:string,payload:any)
    {
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('userregistrationandLoginforfinalyearproject').child(id)//.child('chats')
      dataRef.set(payload).then(res =>{
       
      }) 
    }

    userDatabaseInfo(id:string,payload:any)
    {
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('chatstatusvideocallfollowfollowingforfinalyearproject').child(id).child('info')
      dataRef.set(payload).then(res =>{
        
      }) 
    }

    userDatabaseChat(id:string,payload:any)
    {
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('chatstatusvideocallfollowfollowingforfinalyearproject').child(id).child('chats')
      dataRef.set(payload).then(res =>{
        
      }) 
    }

    userDatabaseStatus(id:string,payload:any)
    {
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('chatstatusvideocallfollowfollowingforfinalyearproject').child(id).child('statuss')
      dataRef.set(payload).then(res =>{
        
      }) 
    }

    userDatabaseVideocall(id:string,payload:any)
    {
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('chatstatusvideocallfollowfollowingforfinalyearproject').child(id).child('videocalls')
      dataRef.set(payload).then(res =>{
        
      }) 
    }

    userDatabaseFollowers(id:string,payload:any)
    {
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('chatstatusvideocallfollowfollowingforfinalyearproject').child(id).child('followers')
      dataRef.set(payload).then(res =>{
        
      }) 
    }

    userDatabaseFollowing(id:string,payload:any)
    {
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('chatstatusvideocallfollowfollowingforfinalyearproject').child(id).child('following')
      dataRef.set(payload).then(res =>{
        
      }) 
    }

    userDatabasemanytomanyfollowersfollowing(id:string,payload:any)
    {///finalYearProjectForVasaviCollegeTPG/manytomanyfollowersfollowing
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('manytomanyfollowersfollowing').child(id)
      dataRef.set(payload).then(res =>{
        
      }) 
    }

    userDatabaseManytoManyRelationship(id:string,payload:any)
    {
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('manytomanyfollowersfollowing').child(id)//.child('info')
      dataRef.set(payload).then(res =>{
        
      }) 
    }

    follow(self:string,id:string)
    {
      return this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG').child('manytomanyfollowersfollowing').child(self).child(id)
    }
 
    searchFriends(sval:string)
    {
      return this.angulardb.list(`/finalYearProjectForVasaviCollegeTPG/userregistrationandLoginforfinalyearproject`).valueChanges()
    }

    chat_status_followers_following_info_videocalls(id:string,related_data:string)
    {
      return this.angulardb.list(`/finalYearProjectForVasaviCollegeTPG/chatstatusvideocallfollowfollowingforfinalyearproject/${id}/${related_data}`).valueChanges()
    }

    following_followers(self:string,id:string)
    {
      //console.log("left followers")
      //return this.angulardb.database.ref('/finalYearProjectForSrkr').child('followers').child(self)//.child(id)
      return this.angulardb.list(`/finalYearProjectForVasaviCollegeTPG/manytomanyfollowersfollowing/${self}/${id}`).valueChanges()
    }

    uploadProfile(id:string,imageName:string)
    {
      //this.fbs.storage().ref("Images/"+ImgName+".png").put(files[0]);
      return this.storage.storage.ref(`/finalYearProjectForVasaviCollegeTPG`).child(`${id}/`+imageName+'.png')
    }

    speechRecognation(v:any)
    {
      return runSpeechRecognition(v)
    }

    senduserChatmessages(from_id:string,to_id:string,payload:any)
    {
      var dataRef = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG')
      .child('chatstatusvideocallfollowfollowingforfinalyearproject').child(from_id).child('chats').child(to_id)//.push()
      dataRef.set(payload).then(res =>{
        
      }) 
    }

    twowaysenduserChatmessages(id:string,payload:any)
    {
      var dataRef1 = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG').child('chats').child(id).push()
      dataRef1.set(payload).then(res =>{
        
      }) 
    }

    one_toone_relation_count(value:number)
    {
      var dataRef1 = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG').child('onetoonereletion')
      dataRef1.set({value:value}).then(res =>{
        
      }) 
    }
    get_one_toone_relation_count()
    {
     return this.angulardb.list('/finalYearProjectForVasaviCollegeTPG/onetoonereletion').valueChanges()
    }

    getChatMessages(id:string)
    {
      return this.angulardb.list(`/finalYearProjectForVasaviCollegeTPG/chats/${id}`).valueChanges()
    }

    inserttimeslot(payload:any,id:string)
    {
      var dataRef1 = this.angulardb.database.ref('/finalYearProjectForVasaviCollegeTPG').child('timeslot').child(id)
      dataRef1.set(payload).then(res =>{
        
      }) 
    }

    gettimeslot()
    {
      return this.angulardb.list(`/finalYearProjectForVasaviCollegeTPG/timeslot`).valueChanges()
    }

    modefiedtimeslot()
    {
      
    }
    
      //create
  // addItem(item: Item,key:string): Promise<any> 
  // {
  //   return this.storage.get(key).then((items: Item[])=>{
  //     if(items)
  //     {
  //       return this.storage.set(key, items)
  //     }
  //     else{
  //       return this.storage.set(key, [item])
  //     }
  //   })
  // }

   // //Read
  // getItems(): Promise<Item[]>
  // {
  //   return this.storage.get(ITEMS_KEY)
  // }

    //ionic storage
    // async createdata(key: string, item: Item) : Promise<any>
    // {

    //   return this._storage.get(key).then((items: Item[])=>{
    //         if(items)
    //         {
    //           return this._storage.set(key, items)
    //         }
    //         else{
    //           return this._storage.set(key, [item])
    //         }
    //       })

    //   //this._storage?.set(key, value);
    //   //this._storage.set(key, value);
    //   // await this.s.create();
    // }

    // async retrivedata(key: string): Promise<Item[]>
    // {
    //   //console.log(this._storage?.get(key))
    //   //return this._storage?.get(key);
    //   return this._storage.get(key);
    //   // await this.s.create();
    // }

    // createindexdata(key, value: any)
    // {
    //   this._storage.forEach((key, value, index) => {
    //   });
    // }

    // async registerLoginDetails(key:string,value:any)
    // {
    //   return await this._storage.set(key,value);
    // }

    // getregisterLoginDetails(key:string)
    // {
    //   return this._storage.get(key)
    // }

    // async addData(key:string,item:any)
    // {
    //   const storedData = await this._storage.get(key) || []
    //   storedData.push(item);
    //   return this._storage.set(key,storedData);
    // }

    // getData(key:string)
    // {
    //   //return this._storage.get(key) || []
    //   return this._storage.get(key) 
    // }

    // clearData(key:string)
    // {
    //   //return this._storage.get(key) || []
    //   return this._storage.clear() 
    // }


    
}
