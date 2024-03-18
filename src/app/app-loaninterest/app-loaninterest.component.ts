import { DecimalPipe, formatNumber } from '@angular/common';
import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnInit, Output } from '@angular/core';
import { AppBasedComponent } from '../app-based/app-based.component';
import { SpinnerService } from '../spinner.service';
import { FileUploadServiceService } from '../file-upload-service.service';
import { AdminserviceService } from '../adminservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { StaticData } from '../StaticData';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-app-loaninterest',
  templateUrl: './app-loaninterest.component.html',
  styleUrls: ['./app-loaninterest.component.css']
})
export class AppLoaninterestComponent  implements OnInit  
{



  public ShortLink: string = "";
  public Loading: boolean = false; // Flag variable
  //appeditprofile
  public Message:any= ""; 
  protected ResponseData!: RespondMessageDto;
  protected AcctId:any = "";
  public ProfileDetails:any;
  protected InfiniteSubscriptions!: Array<Subscription>;

  protected  Subscriptions: Subscription[] = [];

  @Input() public someInput: any = 'something';
  @Output() public someOutput: EventEmitter<void> = new EventEmitter<void>();

  @Input()  RoundRules = '1.0-2' ?? '1.2-2';


  public LoanInterest:Number = 0
  public MinLoanAmount:Number = 0
  public MaxLoanAmount:Number = 0
  public message!:string;

  public LoanScheduled:boolean = false
  public LoanInterestCalculation = false;
  public IsBlockLoanPortal:boolean = false;
  private LoanSetting:any = undefined;
  constructor(@Inject(LOCALE_ID) protected  locale: string, protected  DecimalPipe: DecimalPipe , protected   loadingService: SpinnerService,protected   router: Router, protected   route: ActivatedRoute, protected   formBuilder: FormBuilder,protected   LapoLoanService: AdminserviceService, protected   fileUploadService: FileUploadServiceService) 
  {
      //  super(locale, DecimalPipe,  loadingService, router,  route,  formBuilder, LapoLoanService,  fileUploadService);
  }

   ngOnInit(): void 
   {
         try
         {
           // this.SignOutApplication();
            this.GetLoanSettings();
         }
         catch(e:any)
         {
          //console.log('Display: ' + e);
          this.onSignOut('/signin');
         }
   }
  
    public onLoanInterestCalculation(event:any): void
    {
        if(event.target.checked)
        {
          this.LoanInterest =0;
          this.LoanInterestCalculation = true;
          return;
        }
        else
        {
          this.LoanInterest = 0;
          this.LoanInterestCalculation = false;
          return;
        }
    }

    private TransformDecimal(num:any):any | number
    {
      return this.DecimalPipe.transform(num, this.RoundRules) ?? '0';
    }
  
    public GetTransformDecimal(num:any):any 
    {
      return (this.TransformDecimal(num));
    }
  
    public GetFormatNumber(num:any):any 
    {
       try{
  
          var formarttedNumber = formatNumber(num, this.locale, this.RoundRules);
          return formarttedNumber;
       }
       catch(ex:any)
       {
            return false;
       }
    }
  
    public onSignOut(event:any)
    {
        LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
        this.onNaviagateBack(event);
        return;
    }
    
    private onNaviagateBack(page:string)
    {
        this.router.navigate([page]);
    }
    
    public SignOutApplication():void
    {
        try{
                this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
                //  console.log("Session Result " + this.AcctId );
  
                if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
                {
                    this.onSignOut("/signin");
                    return;
                }
                
                this.GetUserProfileDetails();
                return;
        }
        catch(data:any){
          this.onSignOut("/signin");
          return;
        }
    }
  
    public async GetUserProfileDetails(): Promise<void> 
    {
          try
          {
             this.loadingService.setLoading(true);
             await this.LapoLoanService.GetUserProfileDetails(parseInt(this.AcctId)).subscribe({
             next:(res:any) =>
             {
               this.loadingService.setLoading(false);
               
                // console.log("poof! " + res);
               this.ResponseData = res;
               if(this.ResponseData != null && this.ResponseData.isActive){
                   this.ProfileDetails = this.ResponseData.dataLoad;
                   // console.log(this.ProfileDetails);
                   return;
               }
               else
               {
                    //console.log(this.SignInResponseData.tryCatchMessage);
                    Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                    return;
               }
          
             },
             error:(err:any)=>
             {
               // console.log("no continue " + err);
               this.loadingService.setLoading(false);
               Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
        return;
             }
           })
          }
          catch(error:any){
            Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
            return;
          }
    }
  
    public reloadPage() :void
    {
      setTimeout(()=>{
        window.location.reload();
      }, 100);
      return;
    }
    
    public openPageByUrl(routename: string): void {
      this.router.navigateByUrl(`/${routename}`);
      return;
    }
  
    public ngOnDestroy() 
    {
      try
      {
        this.InfiniteSubscriptions.forEach((subscription) => 
        { subscription.unsubscribe(); });
        this.InfiniteSubscriptions.length = 0; // release memory
    
        this.Subscriptions.forEach(x => x.unsubscribe());
        this.Subscriptions.length = 0; // release memory
      }
      catch(ex:any)
      {
  
      }
    }
  
    public RegisterSubscription(sub: Subscription) :any
    {
       try
       {
          this.InfiniteSubscriptions.push(sub);
  
          this.Subscriptions.push(sub);
       }
       catch(ex:any){
  
       }
    }
  
    public GetSessinId():any
    {
        try{
                this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
               
                if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
                {
                    this.onSignOut("/signin");
                    return;
                }
                
                this.SignOutApplication();
  
                return this.AcctId;
                
        }
        catch(data:any)
        {
          this.onSignOut("/signin");
          return this.AcctId;
        }
  
        this.AcctId
    }

    public onBlockLoanPortal(event:any):void
    {
          try
          {

            if(event.target.checked)
            {
                this.IsBlockLoanPortal = true;
            }
            else{

              this.IsBlockLoanPortal = false;
            }

          }
          catch(exp:any){

          }
    }

    public onNetPaysCalculation(event:any): void
    {
        if(event.target.checked)
        {
          this.MaxLoanAmount = 0;
          this.LoanScheduled = true;
          return;
        }
        else
        {
          this.MaxLoanAmount = 0;
          this.LoanScheduled = false;
          return;
        }
    }

    public  onSaveSettings():void
    {
      this.AcctId = this.GetSessinId();

        try
        {
              parseFloat(this.LoanInterest.toString());
        }
        catch(exxx:any)
        {
          Swal.fire({ title: 'Warning!', text: "Enter a valid Interest Rate and try again.", icon: 'warning', confirmButtonText: 'Ok' })
          return;
        }

        //this.LoanInterestCalculation == false &&
        if((this.LoanInterest.toString() == '' || this.LoanInterest == 0 || this.LoanInterest == undefined || this.LoanInterest.toString.length < 0 || this.GetTransformDecimal(this.LoanInterest) <= 0))
        {
          Swal.fire({ title: 'Warning!', text: "Loan Interest is required", icon: 'warning', confirmButtonText: 'Ok' })
          return;
        }
    
        if(this.LoanScheduled && (this.MaxLoanAmount == undefined || this.MaxLoanAmount.toString.length < 0 || this.GetTransformDecimal(this.MaxLoanAmount) <= 0))
        {
          Swal.fire({ title: 'Warning!', text: "Maximum Loan Amount is required", icon: 'warning', confirmButtonText: 'Ok' })
          return;
        }

        if((this.MinLoanAmount == undefined || this.MinLoanAmount.toString.length < 0 || this.GetTransformDecimal(this.MinLoanAmount) <= 0))
        {
          Swal.fire({ title: 'Warning!', text: "Minimum Loan Amount is required", icon: 'warning', confirmButtonText: 'Ok' })
          return;
        }

        if(this.IsBlockLoanPortal && (this.message == undefined || this.message.toString.length < 0 || this.message == "" || this.message == null))
        {
          Swal.fire({ title: 'Warning!', text: "Note the reason for blocking customer's not to apply a loan from Lapo Loan Portal", icon: 'warning', confirmButtonText: 'Ok' })
          return;
        }
    
        let AppData = {"AcctId": this.AcctId, "IsBlockLoanPortal":this.IsBlockLoanPortal, "message":this.message , "LoanInterestCalculation": this.LoanInterestCalculation, "LoanInterest": this.LoanInterest , "LoanScheduled": this.LoanScheduled , "MaxLoanAmount" : this.MaxLoanAmount, "MinLoanAmount" : this.MinLoanAmount  };
    
        this.loadingService.setLoading(true);
      
       try
       {
          this.LapoLoanService.SaveLoanSettings(AppData).subscribe({
          next:(res)=>
          {
            this.loadingService.setLoading(false);
            this. GetLoanSettings();
            this.ResponseData = res;
            if(this.ResponseData != null && this.ResponseData.isActive)
            {
               
                Swal.fire({ title: 'Success!', text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok' })
                return;
            }
            else
            {
                 // console.log(this.ResponseData);
                 Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage + " Or  Enter a valid Interest Rate and try again.", icon: 'warning', confirmButtonText: 'Ok' })
                 return;
            }
          },
          error:(err):any=>
          {
             // console.log("no continue " + err);
             this.loadingService.setLoading(false);
             Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
             return;
          }
        })
       }
       catch(expection:any)
       {
              this.loadingService.setLoading(false);
              Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
              return;
       }
    }
  
    public  GetLoanSettings() : void
    {
          try
          {
               this.AcctId = this.GetSessinId();

               this.loadingService.setLoading(true);
               this.LapoLoanService.GetLoanSettings(parseInt(this.AcctId)).subscribe({
                next:(res:any) =>
                {
                  this.loadingService.setLoading(false);
                    // console.log("poof! " + res);
                  this.ResponseData = res;
                  
                  if(this.ResponseData != null && this.ResponseData.isActive){
                      this.LoanSetting = this.ResponseData.dataLoad;
                       console.log(this.LoanSetting);
                      return;
                  }
                  else
                  {
                        //console.log(this.SignInResponseData.tryCatchMessage);
                        Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                        return;
                  }
              
                },
                error:(err:any)=>
                {
                    // console.log("no continue " + err);
                    this.loadingService.setLoading(false);
                    Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
        return;
                }
              })
          }
          catch(error:any)
          {
              this.loadingService.setLoading(false);
              Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
              return;
          }
    }
}
