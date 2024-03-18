



import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
import { StaticData } from '../StaticData';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, ActivationEnd, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { LoanAppAccountModel } from '../appApiDto/LoanAppAccountModel';
import { BvnRespondsDto } from '../appApiDto/BvnRespondsDto';
import { AccountDetailsDto } from '../appApiDto/AccountInfoDto';
import { BvnAuthDto } from '../appApiDto/BvnAuthDto';
import Swal from 'sweetalert2';
import { AppBasedComponent } from '../app-based/app-based.component';
import { HubTeamMemberDataTableService } from '../HubTeamMemberDataTable.service';
import { AppRouterService } from '../AppRouter.service';
import { FileUploadServiceService } from '../file-upload-service.service';
import { DecimalPipe, Location, formatNumber } from '@angular/common';
import { AppDashboardDtService } from '../AppDashboardDt.service';
import { LoginUserPermissionModel } from '../PageNextModel/LoginUserPermissionModel';

@Component({
  selector: 'app-app-loan-review',
  templateUrl: './app-loan-review.component.html',
  styleUrls: ['./app-loan-review.component.css']
})
export class AppLoanReviewComponent extends AppBasedComponent implements OnInit
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  //appeditprofile
  message:any= ""; 
  override ResponseData!: RespondMessageDto;
  override AcctId:any = "";
  override ProfileDetails:any;
  override LoginUserPermission!:LoginUserPermissionModel;
  headerId:any = undefined;
  IppisNumber:any = undefined;

  LoanDetails:any = undefined;

  AppNote!:string;
  statusButton:boolean = false;

  LoanScheduleData:any=undefined;
  // ClientNetPayDto
  
  // constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService, private fileUploadService: FileUploadServiceService) 
  // {
  //     //headerId: item.headerId , IppisNumber: item.ippisNumber 
  // }

  public IsLoadingData:boolean = true;

  constructor(public appDashboard: AppDashboardDtService, @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService) {
    super(locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }

  override ngOnInit(): void 
  {
       try
       {
                this.ngOnLoanInit();
              
                this.route.queryParams.subscribe(params => {
                this.headerId = params['headerId'];
                this.IppisNumber = params['IppisNumber'];
               
                if(this.IppisNumber == undefined ||  this.IppisNumber == undefined || this.IppisNumber == undefined || this.IppisNumber == '' ||  this.IppisNumber == null || this.IppisNumber == null || this.headerId == undefined ||  this.headerId == undefined || this.headerId == undefined || this.headerId == '' ||  this.headerId == null || this.headerId == null)
                {
                      this.onSignOut('/signin');
                }});

                // this.route.queryParams.subscribe(params => {
                //   //  console.log(params); 
                //     this.headerId = params['headerId'];
                //     this.IppisNumber = params['IppisNumber'];
            
                //       if(this.headerId == undefined ||  this.headerId == undefined || this.IppisNumber ==undefined || this.IppisNumber == '' ||  this.headerId == '' || this.headerId == ''){
                //         this.onSignOut('/signin');
                //       }
                //      // console.log('Data Load', this.IppisNumber);
                //   }
                // );
       }
       catch(e:any)
       {
            //console.log('Display: ' + e);
            this.onSignOut('/signin');
       }
  }

  public OnDataTableFinished(sender:any, object:any): void
  {
    
  }

  public override OnLoadedProfileFinished(sender:any, object:any): void
  {
    this.SignOutApplication();
    this.Getloanappdetails();  
  }

  public async onApproveLoanApp(headerId :any):Promise<void>
  {
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
    
      // if(this.AppNote == undefined || this.AppNote.length < 0)
      // {
      //   Swal.fire({ title: 'Warning!', text: "Write a note about this loan approval", icon: 'warning', confirmButtonText: 'Ok' })
      //   return;
      // }

      if(this.AppNote==undefined ||  this.AppNote == "")
      {
           this.AppNote ="";
      }

    
      let AppData =   {  "AccountId" : this.AcctId, "Comment": this.AppNote, "LoadHeaderId" : headerId  };
      this.loadingService.setLoading(true);

      await this.LapoLoanService.AdminApprovedLoanAppRequest(AppData).subscribe({
      next:(res)=>{
      
        this.loadingService.setLoading(false);
        this.ResponseData = res;
        this.Getloanappdetails();
        if(this.ResponseData != null && this.ResponseData.isActive)
        {
            // console.log("Poof Loan Apps! " , this.LoanApps);
            Swal.fire({ title: 'Success!', text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok' })
            return;
        }
        else
        {
              // console.log(this.ResponseData);
              Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
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

  public async onCancelLoanApp(headerId :any):Promise<void>
  {
        Swal.fire({
          title: 'Warning?',
          text:  'Are you sure that you want to cancel the loan request.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#f97c00',
          cancelButtonColor: '#5b5b5b7f',
          confirmButtonText: 'Yes!',
          cancelButtonText: "No!"
        }).then( (result) => 
        {
              if (result.isConfirmed) 
              {
                    this.CancelLoanApp(headerId);
                    return;
              }
        });
  }

  private async CancelLoanApp(headerId :any) : Promise<void>
  {
         try
         {

                    this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
            
                    if(this.AcctId == "" || this.AcctId == undefined || this.AcctId.length < 0)
                    {
                      Swal.fire({ title: 'Warning!', text: "Write a note about this loan approval", icon: 'warning', confirmButtonText: 'Ok' })
                      return;
                    }

                    if(this.AppNote == "" || this.AppNote == undefined || this.AppNote.length < 0)
                    {
                      Swal.fire({ title: 'Warning!', text: "Write a note about this loan approval", icon: 'warning', confirmButtonText: 'Ok' })
                      return;
                    }
                
                    this.loadingService.setLoading(true);
                    let AppData =   {  "AccountId" : this.AcctId, "Comment": this.AppNote, "LoadHeaderId" : headerId  };
                
                    await this.LapoLoanService.AdminCancelLoanAppRequest(AppData).subscribe({
                    next:(res)=>{
                    
                      this.loadingService.setLoading(false);
                      this.ResponseData = res;
                      this.Getloanappdetails();
                      if(this.ResponseData != null && this.ResponseData.isActive)
                      {
                          Swal.fire({ title: 'Success!', text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok' })
                          return;
                      }
                      else
                      {
                            Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                            return;
                      }
                  
                    },
                    error:(err:any):any=>
                    {
                        this.loadingService.setLoading(false);
                        Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
                        return;
                    }
                  });
         }
         catch(exx:any)
         {
              Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
              return;
         }
  }

  public onSignOut(event:any)
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }
  
  public SignOutApplication():void
  {
      try{
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
              console.log("Session Result " + this.AcctId );

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

  public async Getloanappdetails(): Promise<void> 
  {
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        /// console.log("Session Result " + this.AcctId );

        if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
        {
            this.onSignOut("/signin");
            return;
        }
       
        this.IsLoadingData = true;
        // this.loadingService.setLoading(true);
        await this.LapoLoanService.GetLoanAppDetails(this.headerId, this.AcctId).subscribe({
        next:(res:any)=>{
        
          this.loadingService.setLoading(false);
          this.IsLoadingData = false;
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              this.LoanDetails = this.ResponseData.dataLoad;
              this.onLoanTenureChanged();
            
              if(this.LoanDetails.loanAppReviewStatus.status==='Pending')
              {
                  this.statusButton = true; 
              }
              else{
                this.statusButton = false; 
              }
            
            // console.log('Data Load', this.ResponseData.dataLoad);
            // Swal.fire({ title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok'
             // }).then((result) => { if (result.isConfirmed) {  return; } })
              return;
          }
          else
          {
                this.IsLoadingData = false;
                Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                return;
          }
      
        },
        error:(err:any)=>
        {
          this.IsLoadingData = false;
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
        return;
        }
      })
  }

  public async onLoanTenureChanged() : Promise<void>
  { 
  
    
    try
    {
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
              
              if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
              {
                  this.onSignOut("/signin");
                  return;
              }

              var selectedTenured = this.LoanDetails.loanDetailsData.ternor;

              this.loadingService.setLoading(true);
              let DataChange = {'IPPISNumber': this.LoanDetails.clientDetail.pfNumber, 'AccountId': this.AcctId, 'Amount': this.LoanDetails.loanDetailsData.loanAmount , 'Tenure': selectedTenured };

             this.LapoLoanService.CalculateScheduledLoanAmount(DataChange).subscribe({
              next:(res) => 
              {
              
                this.loadingService.setLoading(false);
                this.ResponseData = res;
                if(this.ResponseData != null && this.ResponseData.isActive)
                {
                    this.LoanScheduleData = this.ResponseData.dataLoad;
                    // console.log('Loan Schedule Data ', this.LoanScheduleData);
                  
                    return;
                }
                else
                {
                  this.loadingService.setLoading(false);
                  Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                  return;
                }
              },
              error:(err:any):any=>
              {
                  this.loadingService.setLoading(false);
                  Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
                  return;
              }
            })
    }
    catch(errx:any)
    {
        this.loadingService.setLoading(false);
        Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
        return;
    }
  } 

  private reloadPage() :void
  {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
    return;
  }

  private prevUrl!:any;
  private prevUrl2!:any;
  public onBackWard(event:any):void
  {
    this.GoBackPreviousPage();
    // this.router.navigateByUrl("/appmonthlynetpays");
     // this.prevUrl = this.router.getCurrentNavigation()?.previousNavigation?.initialUrl.toString();
    // this.prevUrl2 = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
    // this.router.navigateByUrl(this.prevUrl2);
    // this.GoBackPreviousPage1();
  }
}


