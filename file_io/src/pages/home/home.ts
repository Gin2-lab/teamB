import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Storage } from '@ionic/storage';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage implements OnInit {

  appUserId = '';
  userMessage = '';
  onsei = '';
  text1: string;
  text2: string;

  systemText:{
    expression: string,
    utterance: string,
  }[]=[];

  constructor(
    private tts: TextToSpeech,
    public navCtrl: NavController,
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    private storage: Storage
  ) {};

ngOnInit(){
  this.text1 = '';
  this.text2 = '';
}

onSetClick(){
  console.log('onSetClick() called ' + this.text1);
  this.storage.set('key1', this.text1);
}

onGetClick(){
  console.log('onGetClick() called');
  this.storage.get('key1')
    .then((t)=>{
      this.text2 = t;
    })
    .catch((err)=>{
      this.text2 = `Error ${err}`;
    });
}

ionViewDidLoad(){
  let loading = this.loadingCtrl.create();
  loading.present();

  this.http
   .post('https://api.repl-ai.jp/v1/registration',{botId: 'sample'},
   {headers: new HttpHeaders({'Content-Type': 'application/json','x-api-key': 'V58GXyV9zyJTVKR9CdyAzTFA7gRAVZw7jixedn8w'})})
   .subscribe(data => {
     this.appUserId = data['appUserId'];
     loading.dismiss();
   })
}


public getInitData(){
  let loading = this.loadingCtrl.create();
  loading.present();

  this.http
  .post('https://api.repl-ai.jp/v1/dialogue',{
   appUserId: this.appUserId,
   botId: 'sample',
   voiceText: 'init',
   initTalkingFlag: 'true',
   initTopicId: 's4m2rozl6p6kgl1',
   },
  {headers: new HttpHeaders({'Content-Type': 'application/json','x-api-key': 'V58GXyV9zyJTVKR9CdyAzTFA7gRAVZw7jixedn8w'})})
  .subscribe(data => {
    this.systemText = data['systemText'];
    loading.dismiss();
  })

}

onClick(value: string){

  let loading = this.loadingCtrl.create();
  loading.present();
  this.userMessage = value;

  if (this.userMessage == 'init') {

  this.http
  .post('https://api.repl-ai.jp/v1/dialogue',{
   appUserId: this.appUserId,
   botId: 'sample',
   voiceText: this.userMessage,
   initTalkingFlag: 'true',
   initTopicId: 's4m2rozl6p6kgl1',
   },
  {headers: new HttpHeaders({'Content-Type': 'application/json','x-api-key': 'V58GXyV9zyJTVKR9CdyAzTFA7gRAVZw7jixedn8w'})})
  .subscribe(data => {
    this.systemText = data['systemText'];
    loading.dismiss();
  });
} else {

  this.http
  .post('https://api.repl-ai.jp/v1/dialogue',{
   appUserId: this.appUserId,
   botId: 'sample',
   voiceText: this.userMessage,
   initTalkingFlag: 'false',
   initTopicId: 's4m2rozl6p6kgl1',
   },
  {headers: new HttpHeaders({'Content-Type': 'application/json','x-api-key': 'V58GXyV9zyJTVKR9CdyAzTFA7gRAVZw7jixedn8w'})})
  .subscribe(data => {
    this.systemText = data['systemText'];
    this.tts.speak({text: this.systemText['utterance'], locale: 'ja-JP', rate: 1.5}).then(() => console.log('Success')) .catch((reason: any) => console.log(reason));
    loading.dismiss();
  });
  

}


}


}


