
import { PrintService } from '../Print.service';
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
import { LoginUserPermissionModel } from '../PageNextModel/LoginUserPermissionModel';

@Component({
  selector: 'app-app-loan-app-review',
  templateUrl: './app-loan-app-review.component.html',
  styleUrls: ['./app-loan-app-review.component.css']
})

/// <a href="/apploandetails?headerId={{item.headerId}}&IppisNumber={{item.ippisNumber}}" routerLinkActive=" router-link-active ">View More</a>

export class AppLoanAppReviewComponent extends AppBasedComponent implements OnInit
{
  shortLink: string = "";
  loading: boolean = false; 
  message:any= ""; 
  override ResponseData!: RespondMessageDto;
  override AcctId:any = "";
  override ProfileDetails:any;
  override LoginUserPermission!:LoginUserPermissionModel;

  headerId:any = undefined;
  IppisNumber:any = undefined;
  LoanDetails:any = undefined;

  public IsLoadingData:boolean = true;

  public LoanScheduleData:any = undefined;
 
  // constructor(private printService: PrintService ,private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService, private fileUploadService: FileUploadServiceService) 
  // {
  //     //headerId: item.headerId , IppisNumber: item.ippisNumber 
  // }

  constructor(private printService: PrintService ,public appDashboard: HubTeamMemberDataTableService, @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService) {
    super(locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }

  public override ngOnInit(): void 
  {
       try
       {
                this.ngOnLoanInit();
               
                this.route.queryParams.subscribe(params => {
                  this.headerId = params['headerId'];
                  this.IppisNumber = params['IppisNumber'];
                    if(this.headerId == undefined ||  this.headerId == undefined ||  this.headerId == null || this.headerId == null ||  this.headerId == '' || this.headerId == '')
                    {
                       this.onSignOut('/signin');
                    }
                }
              );
       }
       catch(e:any)
       {
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

  public onSignOut(event:any):void
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }
  
  public async onApproveLoanApp(headerId :any):Promise<void>
  {
      // alert(headerId);
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      this.router.navigateByUrl("/apploanprocess?headerId=" + headerId  + "&IppisNumber=" + this.IppisNumber); 
  }
 
  public async onCompletedLoanApp(headerId :any):Promise<void>
  {
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      this.router.navigateByUrl("/apploandue?headerId=" + headerId  + "&IppisNumber=" + this.IppisNumber); 
  }
   
  private SignOutApplication():void
  {
      try{
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
              // console.log("Session Result " + this.AcctId );

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

  private async GetUserProfileDetails(): Promise<void> 
  {
    this.loadingService.setLoading(true);
    await this.LapoLoanService.GetUserProfileDetails(parseInt(this.AcctId)).subscribe({
     next:(res:any)=>{
     
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

  private async Getloanappdetails(): Promise<void> 
  {
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        /// console.log("Session Result " + this.AcctId );

        if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
        {
            this.onSignOut("/signin");
            return;
        }
        
        this.IsLoadingData = true;
        this.loadingService.setLoading(true);
        await this.LapoLoanService.GetLoanAppDetails(this.headerId, this.AcctId).subscribe({
        next:(res:any)=>{
        
          this.loadingService.setLoading(false);
          this.IsLoadingData = false;
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
             this.LoanDetails = this.ResponseData.dataLoad;
             this.onLoanTenureChanged() ;
             // console.log('Data Load', this.ResponseData.dataLoad);
            // Swal.fire({ title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok'
             // }).then((result) => { if (result.isConfirmed) {  return; } })
              return;
          }
          else
          {
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

  private reloadPage() :void
  {
      setTimeout(()=>{
        window.location.reload();
      }, 100);
      return;
  }

  private async onLoanTenureChanged() : Promise<void>
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

              await this.LapoLoanService.CalculateScheduledLoanAmount(DataChange).subscribe({
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

  public onPrintLoanData(LoanDetail:any): void
  {
      LoanDetail.loanAppReviewStatus.approvedBy = "Pending";
      LoanDetail.loanAppReviewStatus.comment = "Pending";
      this.printService.GetPrintServiceConnector(LoanDetail);
  }

  public onAssignLoanToTeamMember(LoanDetail:any): void
  {
      LoanDetail.loanAppReviewStatus.approvedBy = "Pending";
      LoanDetail.loanAppReviewStatus.comment = "Pending";

      // console.log('Assign Loan To TeamMember', LoanDetail.loanDetailsData.appId);
     
      try
      {
            this.router.navigate(['/assignLoanToTeamMember'], { queryParams: { ItemId : LoanDetail.loanDetailsData.appId, AccountId: this.AcctId }});
            return;
      }
      catch(exi:any)
      { 
            Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
            return;
      }
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


