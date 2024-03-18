import { Component, EventEmitter, Output } from '@angular/core';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AdminserviceService } from '../adminservice.service';
import { TwoFactorAuthÇodeDto } from '../appApiDto/TwoFactorAuthÇodeDto';
import { StaticData } from '../StaticData';
import Swal from 'sweetalert2';
import {  ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.css']
})

export class TwoFactorAuthComponent {

  @Output() compidToSend = new EventEmitter<any>()
  @Output() erpidToSend = new EventEmitter<any>()

  AcctId:string ="";
  bvn:string ="";
  code:string ="";
  crDate ="";
  expDate ="";
  gedDate:any ="";
  id:string ="";
  expired:boolean = false;
  TwoFactor:boolean = false;

  Code1:string = "";
  Code2:string = "";
  Code3:string = "";
  Code4:string = "";
  Code5:string = "";
  Code6:string = "";

  timeCount = "00:00";
  MaxtimeCount: any = 300;
  MintimeCount: any = 0;
  tim :any=0;
  IsStartTimer = false;
  TokenMessage:string="";
  ButtonCondition:any=false;
  BtnIsActive= false;
  SignInResponseData!: RespondMessageDto;
  CodeA1:any=false;
  CodeA2:any=false;
  CodeA3:any=false;
  CodeA4:any=false;
  CodeA5:any=false;
  CodeA6:any=false;

  BvnSend:boolean=false;
  IsProcessing:boolean=false;

  @ViewChild('input1') inputEl1: ElementRef | undefined;
  @ViewChild('input2') inputEl2: ElementRef | undefined;
  @ViewChild('input3') inputEl3: ElementRef | undefined;
  @ViewChild('input4') inputEl4: ElementRef | undefined;
  @ViewChild('input5') inputEl5: ElementRef | undefined;
  @ViewChild('input6') inputEl6: ElementRef | undefined;
   
    constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService) {

    }

    public onSignOut(event:any){
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack('/signin');
    }
    public clickEventHandler(event:any)
    {
        LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
         LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
         this.onNaviagateBack("\signin"); 
         return;
    }
    public CheckSession():boolean 
    {
            let IsTwoFact = LocalStorageService.getLoginSessionIdentity(StaticData.AdminTwoLoginKeySession);
                   
            //LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
            let SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
            console.log("Session Result " + SessionResult);
    
            try
            {
                      if(IsTwoFact != undefined && IsTwoFact != null && IsTwoFact != "" &&  IsTwoFact != StaticData.AdminTwoLoginKeySession && (SessionResult  != ""  && SessionResult  != undefined && SessionResult  != null && SessionResult  != StaticData.LoginKeySession))
                      {
                          StaticData.properties = StaticData.properties;
                          this.router.navigate(['/dashboard'], { queryParams: { AccountId : SessionResult }});
                          return true;
                      }

                      return false;
            }
            catch(e)
            {
                //console.log('Display: ' + e);
                this.onSignOut(null);
                return false;
            }
    }

    ngAfterViewInit(): void 
    {
      setTimeout(() => this.inputEl1?.nativeElement.focus()); 
    }

  public LoadSessionInit()
  {
                try
                {
                  let SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
                  // console.log("Session Result " + this.SessionResult );
                  let AppId = SessionResult;
                  if(SessionResult  === "" || SessionResult  === undefined || SessionResult  === null || SessionResult  === StaticData.LoginKeySession)
                  {
                      this.onSignOut('/signin');
                      return;
                  }

                  AppId = this.route.snapshot.queryParams["AcctId"];
                
                  if(AppId === "" || AppId === undefined || AppId === null)
                  {
                    this.onSignOut('/signin');
                      return;
                  }

                  StaticData.properties =  StaticData.properties ;
                  return;
          }
          catch(e){
              //console.log('Display: ' + e);
              this.onSignOut('/signin');
              return;
          }
  }

  ngOnInit(): void   
  {
       try
       {

            this.LoadSessionInit();

            let Sesslog =  this.CheckSession();
            if(Sesslog){
              return;
            }

              this.route.queryParams
              .subscribe(params => {
              //  console.log(params); 
                this.AcctId = params['AcctId'];
                this.bvn = params['bvn'];
                this.code = params['code'];
                this.crDate = params['crDate'];
                this. expDate  = params['expDate'];
                this. gedDate = params['gedDate'];
                this. id= params['id'];
                this. expired= params['expired'];
                this.TwoFactor= params['TwoFactor'];
                let page = params['page'];
        
                if(this.code == undefined ||  this.id == undefined || this.AcctId == undefined || this.code == '' ||  this.id == '' || this.AcctId == ''){
                  this.onNaviagateBack(page);
                }
        
              this.SendCode();
              
            }
      );

       }
       catch(e){
        //console.log('Display: ' + e);
        this.onNaviagateBack('/signin');
       }
  }

  private IsKeyPast:boolean = false;
  public onPasteHandlers(code:any): void
  {
      if(code.length == 6)
      {
          this.IsKeyPast = true;
          let x = code;

          // console.log(x.substring(0, 1));

          this.Code1 = "";
          this.Code2 = "";
          this.Code3 = "";
          this.Code4 = "";
          this.Code5 = "";
          this.Code6 = "";

         // console.log("Code", code);

          this.Code1 = x[0];
          this.Code2 = x[1];
          this.Code3 = x[2];
          this.Code4 = x[3];
          this.Code5 = x[4];
          this.Code6 = x[5];
          
          if(this.Code6.length >= 1 && this.IsKeyPast == true)
          {
            this.IsKeyPast = false;
            this.onContinue(event);
          }
          
         // console.log("Code Paste", this.Code1, this.Code2, this.Code3,  this.Code4,   this.Code5,    this.Code6 );
        
          return;
      }

    return;
  }


  public keyupEventInputEl1(event: any):void
  {
    let bvn = event.target.value;

    if(event.target.value.length == 6)
    {
       this.onPasteHandlers(event.target.value);
       return;
    }
    
    if(event.target.value.length >=1 && this.IsKeyPast == false)
    {
      setTimeout(() => this.inputEl2?.nativeElement.focus());
      this.Code2 = "";
      
    }

    if(event.target.value.length == 0)
    {
        this.Code1 = "";
        this.Code2 = "";
        this.Code3 = "";
        this.Code4 = "";
        this.Code5 = "";
        this.Code6 = "";
        return;
    }

    // console.log('keyup: '+ event.target.value);
  }

  public keyupEventInputEl2(event: any):void
  {
    let bvn = event.target.value;

    if(event.target.value.length >=1 && this.IsKeyPast == false)
    {
      setTimeout(() => this.inputEl3?.nativeElement.focus());
      this. Code3 = ""; 
    }
    
    // console.log('keyup: '+ event.target.value);
  }

  public keyupEventInputEl3(event: any):void
  {
    let bvn = event.target.value;

    if(event.target.value.length >= 1 && this.IsKeyPast == false)
    {
      setTimeout(() => this.inputEl4?.nativeElement.focus());
      this. Code4 = "";
     
    }
    
    // console.log('keyup: '+ event.target.value);
  }

  public keyupEventInputEl4(event: any):void
  {
    let bvn = event.target.value;

    if(event.target.value.length >=1 && this.IsKeyPast == false)
    {
      setTimeout(() => this.inputEl5?.nativeElement.focus());
      this. Code5 = "";
    }
    
    // console.log('keyup: '+ event.target.value);
  }

  public keyupEventInputEl5(event: any):void
  {
    let bvn = event.target.value;

    if(event.target.value.length >=1 && this.IsKeyPast == false)
    {
      setTimeout(() => this.inputEl6?.nativeElement.focus());
      this. Code6 = "";
    }
    
    // console.log('keyup: '+ event.target.value);
  }

  public keyupEventInputEl6(event: any):void
  {
    let bvn = event.target.value;
    this.IsKeyPast = false;
    if(event.target.value.length >=1 && this.IsKeyPast == false)
    {
       this.onContinue(event);
    }
    
    // console.log('keyup: '+ event.target.value);
  }


  onNaviagateBack(page:string){
    this.router.navigate([page]);
  }

  onStartTimeCountDown()
  {
    this.timeCount = "00:00";
   let countdown = setTimeout( () => {
      
      if(this.IsStartTimer){
        this.onTimeIncreased();
      }

      this.tim++;
     // console.log("poof!" + this.tim);

    }, 1000);

   window.setInterval(() => {
     
    if(this.IsStartTimer){
      this.onTimeIncreased();
    }

    this.tim++;
    //console.log("poof!" + this.tim);

    }, 1000);

  }

onTimeIncreased():void
{
  let RemainCount = this.MaxtimeCount - this.tim;
  this.timeCount = RemainCount.toString();
  if(RemainCount == this.MintimeCount){
    this.onStopCount();
  }
}

onStopCount():void 
{
  this.tim=0;
  this.timeCount = "00:00";
  this. IsStartTimer = false;
  this. ButtonCondition =false;
 this. BtnIsActive=true;
  this.TokenMessage="Your time for login auth has expired, Pleae click the resend button to resend the code";
  this.BvnSend=false;
}

onRestartCount():void {
  this.tim = 0;
  this.timeCount = "00:00";
  this. IsStartTimer = true;
  this.TokenMessage="";
  this. ButtonCondition =false;
  this. BtnIsActive=false;
  this.onStartTimeCountDown();
  this.BvnSend=true;
}

onTextChange1(Event:any):void
{
  if(Event.target.value==""){
    this.CodeA1 =false;
    this.ButtonCondition=false;
    
  }
  else{
    this.CodeA1 = true;
  }

  if( this.CodeA6 ==true && this.CodeA5 ==true && this.CodeA4 ==true && this.CodeA3 ==true && this.CodeA2 ==true
    && this.CodeA1 ==true){
      this.ButtonCondition=true;
    }
}

onTextChange2(Event:any):void
{
  if(Event.target.value==""){
    this.CodeA2 =false;
    this.ButtonCondition=false;
  }
  else {
    this.CodeA2 =true;
  }
  if( this.CodeA6 ==true && this.CodeA5 ==true && this.CodeA4 ==true && this.CodeA3 ==true && this.CodeA2 ==true
    && this.CodeA1 ==true){
      this.ButtonCondition=true;
    }
}
onTextChange3(Event:any):void
{
  if(Event.target.value==""){
    this.CodeA3 =false;
    this.ButtonCondition=false;
  }
  else {
    this.CodeA3 =true;
  }

  if( this.CodeA6 ==true && this.CodeA5 ==true && this.CodeA4 ==true && this.CodeA3 ==true && this.CodeA2 ==true
    && this.CodeA1 ==true){
      this.ButtonCondition=true;
    }
}

onTextChange4(Event:any):void
{
  if(Event.target.value==""){
    this.CodeA4 =false;
    this.ButtonCondition=false;
  }
  else {
    this.CodeA4 =true;
  }

  if( this.CodeA6 ==true && this.CodeA5 ==true && this.CodeA4 ==true && this.CodeA3 ==true && this.CodeA2 ==true
    && this.CodeA1 ==true){
      this.ButtonCondition=true;
    }
}

onTextChange5(Event:any):void
{
  if(Event.target.value==""){
    this.CodeA5 =false;
    this.ButtonCondition=false;
  }
  else {
    this.CodeA5 =true;
  }

  if( this.CodeA6 ==true && this.CodeA5 ==true && this.CodeA4 ==true && this.CodeA3 ==true && this.CodeA2 ==true
    && this.CodeA1 ==true){
      this.ButtonCondition=true;
    }
}

onTextChange6(event:any)
{
  if(event.target.value==""){
    this.CodeA6 =false;
    this.ButtonCondition=false;
  }
  else {
    
   this.CodeA6 =true;
 }

  if( this.CodeA6 ==true && this.CodeA5 ==true && this.CodeA4 ==true && this.CodeA3 ==true && this.CodeA2 ==true
    && this.CodeA1 ==true){
      this.ButtonCondition=true;
    }
}

  onInit(): void
  {
    // const navigationExtras: NavigationExtras = {
    //   state: {
    //     transd: 'TRANS001',
    //     workQueue: false,
    //     services: 10,
    //     code: '003'
    //   }
    // };
    // this.router.navigate(['newComponent'], navigationExtras);
  }

  getStateById(stateId :BigInteger) :any
  {
    return {"stateId": stateId} ;
  }

  onContinue(event:any)
  {
        try{
          this.loadingService.setLoading(true);
          if( this.Code6  != undefined && this.Code5  !=undefined && this.Code4  !=undefined && this.Code3  !=undefined && this.Code2  !=undefined
          && this.Code1 != undefined && this.Code6  !="" && this.Code5  !="" && this.Code4  !="" && this.Code3  !="" && this.Code2  !=""
          && this.Code1 !="")
          {
    
            let UserCode = this.Code1 + this.Code2 + this.Code3 + this.Code4 + this.Code5 + this.Code6;
    
            var userInputCode = new TwoFactorAuthÇodeDto();
            userInputCode.AccountId = this.AcctId;
            userInputCode.Code = UserCode;
    
            this.LapoLoanService.ConfirmTwoFactorAuthCodeConnector(userInputCode).subscribe({
              next:(res)=>{
              
                this.IsProcessing = false;
                this.loadingService.setLoading(false);
                //  console.log("poof! " + res);
                this.SignInResponseData = res;
                // console.log(this.SignInResponseData);
                this.Code1 = "";
                this.Code2 = "";
                this.Code3 = "";
                this.Code4 = "";
                this.Code5 = "";
                this. Code6 = "";
    
                if(this.SignInResponseData != undefined && this.SignInResponseData != null && this.SignInResponseData.isActive && this.SignInResponseData.dataLoad.success==true)
                {
                    LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession , this.AcctId);
                    LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, this.AcctId);
                    this.router.navigate(['/dashboard'], { queryParams: { AccountId : this.AcctId }});
                    return;
                }
                else{
                  this.Code1 = "";
                  this.Code2 = "";
                  this.Code3 = "";
                  this.Code4 = "";
                  this.Code5 = "";
                  this. Code6 = "";
                     Swal.fire({
                      title: 'Error!',
                      text: this.SignInResponseData.tryCatchMessage, icon: 'error', confirmButtonText: 'Ok' }); return;
                }
              },
              error:(err:any)=>
              {
                this.Code1 = "";
                this.Code2 = "";
                this.Code3 = "";
                this.Code4 = "";
                this.Code5 = "";
                this. Code6 = "";
                this.IsProcessing = false;
             //   console.log("no continue " + err);
                this.loadingService.setLoading(false);
                Swal.fire({
                  title: 'Error!',
                  text: "Service can't be reached at this time. You should try again.",
                  icon: 'error', confirmButtonText: 'Ok' })
                  .then((result) => { if (result.isConfirmed) {  this.clickEventHandler('/signin'); return; }});
                   return;
              }
            })
          }
          else{
    
            this.Code1 = "";
            this.Code2 = "";
            this.Code3 = "";
            this.Code4 = "";
            this.Code5 = "";
            this. Code6 = "";
            this.IsProcessing = false;
           // console.log("no continue ");
            this.loadingService.setLoading(false);
            Swal.fire({
              title: 'Warning!',
              text: "Enter the 6 digit code send to your email address or phone",
              icon: 'warning',  confirmButtonText: 'Ok' });
            return;
          }
        }
        catch(exmessage:any)
        {
          this.Code1 = "";
          this.Code2 = "";
          this.Code3 = "";
          this.Code4 = "";
          this.Code5 = "";
          this. Code6 = "";
          this.IsProcessing = false;
         // console.log("no continue ");
          this.loadingService.setLoading(false);
          Swal.fire({
            title: 'Warning!',
            text: "Enter the correct 6 digit code send to your email address or phone",
            icon: 'warning',  confirmButtonText: 'Ok' });
          return;
        }
  }

  onResendCode(event:any)
  {
    this.SendCode();
  }

public SendCode():void
{
      try
      {

        var message = "Your 6 digit login code is: " ;
        this.loadingService.setLoading(true);
        this.LapoLoanService.ResendTwofactorsmsConnector(message, parseInt( this.AcctId)).subscribe({
         next:(res)=>{
         
          this.loadingService.setLoading(false);
          // console.log("poof! " + res);
           this.SignInResponseData = res;
         //  console.log(this.SignInResponseData);
           
           if(this.SignInResponseData != null && this.SignInResponseData.isActive)
           {
                this.Code1 = "";
                this.Code2 = "";
                this.Code3 = "";
                this.Code4 = "";
                this.Code5 = "";
                this. Code6 = "";
                this.onRestartCount();
           }
           else{
                //console.log(this.SignInResponseData.tryCatchMessage);
                this.Code1 = "";
                this.Code2 = "";
                this.Code3 = "";
                this.Code4 = "";
                this.Code5 = "";
                this. Code6 = "";
                Swal.fire({title: 'Warning!', text: this.SignInResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok'
                }).then((result) => { if (result.isConfirmed) {  this.clickEventHandler('/signin'); return; }});
                return;
           }
      
         },
         error:(err)=>
         {
          this.Code1 = "";
          this.Code2 = "";
          this.Code3 = "";
          this.Code4 = "";
          this.Code5 = "";
          this. Code6 = "";
           // console.log("no continue " + err);
           this.loadingService.setLoading(false);
           Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
           .then((result) => { if (result.isConfirmed) {  this.clickEventHandler('/signin'); return; }});
             return;
         }
       })

      }
      catch(exmessage:any)
      {
        this.loadingService.setLoading(false);
        Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' }).then((result) => {
         if (result.isConfirmed) {  this.clickEventHandler('/signin'); return; }});
          return;
      }
}

public onPasteHandler(event:any): void
{
  // if(event.target.value.length == 6)
  // {
  //    this.onPasteHandlers(event.target.value);
  //    return;
  // }
}

}
