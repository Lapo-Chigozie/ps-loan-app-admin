
// import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
// import { Subscription, finalize } from 'rxjs';
// import { FormBuilder } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import Swal from 'sweetalert2';
// import { RespondMessageDto } from 'src/app/appApiDto/RespondMessageDto';
// import { ClientDataTableService } from 'src/app/clientDataTable.service';
// import { SpinnerService } from 'src/app/spinner.service';
// import { FileUploadServiceService } from 'src/app/file-upload-service.service';
// import { AdminserviceService } from 'src/app/adminservice.service';
// import { StaticData } from 'src/app/StaticData';
// import { LocalStorageService } from 'src/app/local-storage.service';
// import { Component, OnInit } from '@angular/core';
// import { HubGroupsDataTableService } from '../HubTeam/DataTablePackage/HubGroupsDataTable.service';

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
import { HubGroupsDataTableService } from '../HubTeam/DataTablePackage/HubGroupsDataTable.service';

import { AppConfig } from '../../assets/images/defaultSettings';

@Component({
  selector: 'app-HubTeams',
  templateUrl: './HubTeams.component.html',
  styleUrls: ['./HubTeams.component.css']
})
export class HubTeamsComponent extends AppBasedComponent implements OnInit 
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
 
  message:any= ""; 
  override ResponseData!: RespondMessageDto;
  override AcctId:any = "";
  override  LoginUserPermission!:LoginUserPermissionModel;
  override ProfileDetails:any;
  ClientNetPays:any;

  // Inject service 
  // ClientNetPayDto

  public FirstName!:string;
  public Middle:string | undefined;
  public LastName:string | undefined;
  public EmailAddress:string| undefined;
  public PhoneNumber:string| undefined;
  public AltPhoneNumber:string| undefined;
  public CurrentAddress:string| undefined;
  public Age:string| undefined;
  public Gender:string| undefined;
  public urlhost:string| undefined;
  
  // constructor(public appDashboard: HubGroupsDataTableService,private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService,private fileUploadService: FileUploadServiceService) 
  // {

  // }

  constructor( @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService, public appDashboard: HubGroupsDataTableService, public appApiDtoken: AdminserviceService) 
  {
       super( locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }

  override ngOnInit(): void 
  {
      // console.log(" header ", header);
      this.ngOnLoanInit();
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      this.urlhost = Apphttpclienturl.GetHostUrl(0); 
     
      // this.appDashboard.IsAcceptId = true;
      // this.appDashboard.AppId =  this.AcctId;
      // this.appDashboard.onLoad(this.AcctId, this.urlhost);

      this.urlhost += AppConfig.AcctSecurity + '/AllOngoingAndCompletedLoanAppList';
      this.appDashboard.MaxStatusRetriever = "All";
      // this.appDashboard.OnDataTableFinished.subscribe((object:any) => 
      // {
      //      this.OnDataTableFinished(object.sender, object.object);  
      // });
  }

  public OnDataTableFinished(sender:any, object:any): void
  {
        // this.GetDashboardAllLoanApplys();   // this.GetAllLoanApplys1();
  }

  public override OnLoadedProfileFinished(sender:any, object:any): void
  {
      // this.appDashboard.AppId = 1;
      // this.appDashboard.IsAcceptId = true;
      // this.appDashboard.AppId = this.appDashboard.AppId;
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
          // this.appDashboard.SearchData.PermissionPage = new LoginUserPermissionModel();
          // this.appDashboard.SearchData.PermissionPage = object;
          this.SignOutApplication();
  }

  public SignOutApplication():void
  {
      try
      {
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
             
              if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
              {
                  this.onSignOut("/signin");
                  return;
              }

              this.GetUserProfileDetails();
              return;
      }
      catch(error:any)
      {
          this.onSignOut("/signin");
          return;
      }
  }

  public async GetUserProfileDetails(): Promise<void> 
  {
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        
        if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
        {
            this.onSignOut("/signin");
            return;
        }
        
        this.loadingService.setLoading(true);
        await this.LapoLoanService.GetUserProfileDetails(parseInt(this.AcctId)).subscribe({
        next:(res)=>
        {
              this.loadingService.setLoading(false);
              this.appDashboard.onLoad(this.AcctId);
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
                      
                  return;
              }
              else
              {
                    Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                    return;
              }
        },
        error:(err)=>
        {
          this.appDashboard.onLoad(this.AcctId);
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
      });
  }

  private reloadPage() :void
  {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
    return;
  }

  public onSignOut(event:any)
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }
  
  public override onNaviagateBack(page:string)
  {
      this.router.navigate([page]);
      return;
  }

  public onOpenActivateCustomer(id:string):void
  {
          Swal.fire({
            title: 'Warning?',
            text: 'Would you like to disable this hub and team members Or would you like to migrate the team members before disabling',
            icon: 'warning', 
            showCancelButton: true,
            confirmButtonColor: '#f97c00',
            cancelButtonColor: '#5b5b5b7f',
            confirmButtonText: 'Yes!',
            cancelButtonText: "No!"
          }).then((result) => {
            if (result.isConfirmed) {
                this.RemoveData(id);
            }
          });
  }

  public RemoveData(id:string):void
  {
      try
      {
        this.loadingService.setLoading(true);
        this.LapoLoanService.ActivateHubGroupPermission(id).subscribe({
        next:(res)=>
        {
              this.loadingService.setLoading(false);
              this.appDashboard.onLoad(this.AcctId);
              this.ResponseData = res;
              if(this.ResponseData != null && this.ResponseData.isActive)
              {
                    Swal.fire({  title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success',   confirmButtonText: 'Ok'  })
                    return;
              }
              else
              {
                    Swal.fire({  title: 'Warning!',  text: this.ResponseData.tryCatchMessage, icon: 'warning',   confirmButtonText: 'Ok'  })
                    return;
              }
        },
        error:(err:any)=>
        {
            this.appDashboard.onLoad(this.AcctId);
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
        });

        return;
      }
      catch(exi:any)
      { 
            this.appDashboard.onLoad(this.AcctId);
            Swal.fire({ title: 'Error!', text: "An error occurred: " + exi.message, icon: 'error', confirmButtonText: 'Ok' })
            return;
      }
  }

  public onNewGroup():void
  {
      try
      {
        this.router.navigate(['/newHubTeam']);
        return;
      }
      catch(exi:any)
      { 
            this.appDashboard.onLoad(this.AcctId);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
      }
  }

  public onViewTeamMembers(id:string):void
  {
    try
    {
          this.router.navigate(['/teamMembersByGroup'], { queryParams: { AppsId : id}});
          return;
    }
    catch(exi:any)
    { 
          this.appDashboard.onLoad(this.AcctId);
          Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
          return;
    }
  }
}

