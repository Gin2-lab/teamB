import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  appUserId = '';
  userMessage = '';

  systemText:{
    expression: string,
    utterance: string,
  }[]=[];

  systemText2:{
    expression: string,
    utterance: string,
  }[]=[];

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public loadingCtrl: LoadingController
  ) {};

ionViewDidLoad(){
  let loading = this.loadingCtrl.create();
  loading.present();

  this.systemText2 = [
    {expression: 'test1', utterance: 'test2'}
  ];

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

  this.systemText2 = [
    {expression: 'test3', utterance: 'test4'}
  ];

  this.http
  .post('https://api.repl-ai.jp/v1/dialogue',{
   appUserId: this.appUserId,
   botId: 'sample',
   voiceText: 'init',
   initTalkingFlag: 'true',
   initTopicId: 'aisatsu',
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
   initTopicId: 'aisatsu',
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
   initTopicId: 'aisatsu',
   },
  {headers: new HttpHeaders({'Content-Type': 'application/json','x-api-key': 'V58GXyV9zyJTVKR9CdyAzTFA7gRAVZw7jixedn8w'})})
  .subscribe(data => {
    this.systemText = data['systemText'];
    loading.dismiss();
  });

}

//    // AudioContextを作成
//    var AudioContext = window.AudioContext || window.webkitAudioContext;
//    var audioCtx = new AudioContext();

//   // AnalyserNodeを作成
//    var analyser = audioCtx.createAnalyser();
//    analyser.fftSize = 2048;
    
//  this.http
//  .post('https://api.apigw.smt.docomo.ne.jp/crayon/v1/textToSpeech',{
//   Command: 'AP_Synth',
//   SpeakerID: '1',
//   StyleID: '1',
//   AudioFileFormat: '2',
//   TextData: 'おはようございます。栗林さん。',
//   },
//  {headers: new HttpHeaders({'Content-Type': 'application/json','APIKEY': '756743322f615041302f6c38437636676d692f61722f2f4b6c4c5271584c76694a316d6636744a44484737'})})
//  .subscribe(data => {
//    this.systemText = data['systemText'];
//    loading.dismiss();
//  })

}

}


