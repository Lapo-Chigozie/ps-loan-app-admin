// import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2';
// import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
// import { SpinnerService } from '../spinner.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AdminserviceService } from '../adminservice.service';
// import { FormBuilder } from '@angular/forms';
// import { StaticData } from '../StaticData';
// import { LocalStorageService } from '../local-storage.service';
// import { LoginUserPermissionModel } from '../PageNextModel/LoginUserPermissionModel';

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
import { ExportLoanModel, ExportedLoanModel } from '../HubTeam/HubModel/ExportLoanModel';
import { HttpErrorResponse, HttpEventType, HttpResponse } from '@angular/common/http';
import { Apphttpclienturl } from '../apphttpclienturl';

import { AppConfig } from '../../assets/images/defaultSettings';
@Component({
  selector: 'app-app-loan-tenures',
  templateUrl: './app-loan-tenures.component.html',
  styleUrls: ['./app-loan-tenures.component.css']
})
export class AppLoanTenuresComponent extends AppBasedComponent implements OnInit 
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  //appeditprofile
  message:any= ""; 
 

  override ResponseData!: RespondMessageDto;
  override AcctId:string = "";
  override ProfileDetails:any;
  override  LoginUserPermission!:LoginUserPermissionModel;

  
  public FirstName!:string;
  public Middle:string | undefined;
  public LastName:string | undefined;
  public EmailAddress:string| undefined;
  public PhoneNumber:string| undefined;
  public AltPhoneNumber:string| undefined;
  public CurrentAddress:string| undefined;
  public Age:string| undefined;
  public Gender:string| undefined;

  public urlhost:string | undefined;

  public LoanApps:any = [];

  // constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService) 
  // {

  // }

  constructor( @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService, public appDashboard: HubTeamMemberDataTableService) 
  {
       super( locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }


  override ngOnInit(): void 
  {
     
      // console.log(" header ", header);
      this.ngOnLoanInit();
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      this.urlhost = Apphttpclienturl.GetHostUrl(0); 

      this.appDashboard.IsAcceptId = true;
      this.appDashboard.AppId =  this.AcctId;
      // this.appDashboard.onLoad(this.AcctId, this.urlhost);

      this.urlhost += AppConfig.AcctSecurity + '/AllOngoingAndCompletedLoanAppList';
      this.appDashboard.MaxStatusRetriever = "All";
      this.appDashboard.OnDataTableFinished.subscribe((object:any) => 
      {
           this.OnDataTableFinished(object.sender, object.object);  
      });

  }

  public OnDataTableFinished(sender:any, object:any): void
  {
        // this.GetDashboardAllLoanApplys();   // this.GetAllLoanApplys1();
  }

  public override OnLoadedProfileFinished(sender:any, object:any): void
  {
      // this.appDashboard.AppId = 1;

      this.appDashboard.IsAcceptId = true;
      this.appDashboard.AppId = this.appDashboard.AppId;
      // this.appDashboard.onLoad(this.AcctId, this.urlhost);
  }

  ngAfterContentInit(): void 
  {
      
  }

  override ngAfterViewInit(): void 
  {
      
  }

  public override OnLoadedPermissionFinishedEvent(sender:any, object:LoginUserPermissionModel): void
  {
          this.appDashboard.SearchData.PermissionPage = new LoginUserPermissionModel();
          this.appDashboard.SearchData.PermissionPage = object;
          this.SignOutApplication();
        
          // this.appDashboard.onLoad(this.AcctId);
  }

  public onSignOut(event:any)
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }

  public onNewLoanApp() : void
  {
      this.onNaviagateBack("/apploantenure");
      return;
  }
  
  public override onNaviagateBack(page:string)
  {
      this.router.navigate([page]);
      return;
  }

  public onApplyLoan():void
  {
 
      LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack('/loanbvnapp');
      return;
  }
  // AdminLoanMethodList
  public SignOutApplication() : void
  {
      try{
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
              console.log("Session Result " + this.AcctId );

              if(this.AcctId  === "" || this.AcctId  === undefined || this.AcctId  === null || this.AcctId  === StaticData.LoginKeySession)
              {
                  this.onSignOut("/signin");
                  return;
              }
              
              this.GetUserProfileDetails();
              return;
      }
      catch(error){
        this.onSignOut("/signin");
        return;
      }
  }

  public async GetUserProfileDetails(): Promise<void> 
  {
    this.loadingService.setLoading(true);
    await this.LapoLoanService.GetUserProfileDetails(parseInt(this.AcctId)).subscribe({
     next:(res)=>{
     
       this.loadingService.setLoading(false);
        // console.log("poof! " + res);
       this.ResponseData = res;
       if(this.ResponseData != null && this.ResponseData.isActive)
       {
           this.ProfileDetails = this.ResponseData.dataLoad;
           this.Gender = this.ProfileDetails.userProfileDetails.gender;
           this.FirstName = this.ProfileDetails.userProfileDetails.firstName;
           this.Middle = this.ProfileDetails.userProfileDetails.middleName;
            this.LastName = this.ProfileDetails.userProfileDetails.lastName;
             this.EmailAddress = this.ProfileDetails.userProfileDetails.emailAddress; 
              this.PhoneNumber = this.ProfileDetails.userProfileDetails.phoneNumber; 
               this.AltPhoneNumber = this.ProfileDetails.userProfileDetails.altPhoneNumber;
              this.CurrentAddress = this.ProfileDetails.userProfileDetails.currentAddress; 
               this.Age = this.ProfileDetails.userProfileDetails.age; 
               // this.Gender == this.ProfileDetails.userProfileDetails.gender;
               this.GetAllLoanApplys();
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

  private async GetAllLoanApplys(): Promise<void> 
  {
        // GetLoanAppDetails
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        this.loadingService.setLoading(true);
        await this.LapoLoanService.GetAdminLoanMethodList(parseInt(this.AcctId)).subscribe({
        next:(res)=>
        {
          this.loadingService.setLoading(false);
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              this.LoanApps = this.ResponseData.dataLoad;
              // console.log("Poof Loan Tenurs! " , this.LoanApps);
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
            // console.log("no continue " + err);
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
            return;
        }
      })
  }

  public async CancelLoanApp(headerId :any ,  ippisNumber:any):Promise<void>
  {
    this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
    this.loadingService.setLoading(true);

    let AppData =   {  "AccountId" : headerId, "Comment": "Cancel by customer", "LoadHeaderId" : headerId  }
 
    await this.LapoLoanService.AdminActivateLoanMethod(AppData).subscribe({
     next:(res)=>{
     
       this.loadingService.setLoading(false);
       this.ResponseData = res;
       this.GetAllLoanApplys();
       if(this.ResponseData != null && this.ResponseData.isActive)
       {
          // console.log("Poof Loan Apps! " , this.LoanApps);
           Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
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

  private reloadPage() :  void
  {
    setTimeout(()=>{  window.location.reload(); }, 100);
    return;
  }
}