import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';

import { LoginUserPermissionModel } from '../PageNextModel/LoginUserPermissionModel';

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
import { ClientDataTableService } from '../clientDataTable.service';


@Component({
  selector: 'app-app-clients',
  templateUrl: './app-clients.component.html',
  styleUrls: ['./app-clients.component.css']
})

export class AppClientsComponent extends AppBasedComponent implements OnInit
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
 
  message:any= ""; 
  override ResponseData!: RespondMessageDto;
  override AcctId:any = "";
  // Inject service 
  ClientNetPays:any;
  // ClientNetPayDto
  
  override ProfileDetails:any;
  
  public FirstName!:string;
  public Middle:string | undefined;
  public LastName:string | undefined;
  public EmailAddress:string| undefined;
  public PhoneNumber:string| undefined;
  public AltPhoneNumber:string| undefined;
  public CurrentAddress:string| undefined;
  public Age:string| undefined;
  public Gender:string| undefined;

  override LoginUserPermission!:LoginUserPermissionModel;

  constructor(public appDashboard: ClientDataTableService, @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService) {
     super(locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
   }

  // constructor(public appDashboard: ClientDataTableService,private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService,private fileUploadService: FileUploadServiceService) 
  // {
  // }

  public override ngOnInit() : void 
  {
       this.ngOnLoanInit();
       this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);

       this.appDashboard.MaxStatusRetriever  = 'All';
       this.appDashboard.OnDataTableFinished.subscribe((object:any) => 
       {
           this.OnDataTableFinished(object.sender, object.object);  
       });
  }

  public override  OnLoadedProfileFinished(sender:any, object:any): void
  {
          // alert('this.LoginUserPermission.GroupName');
  }

  public override OnLoadedPermissionFinishedEvent(sender:any, object:LoginUserPermissionModel): void
  {
          this.appDashboard.SearchData.PermissionPage = new LoginUserPermissionModel();
          this.appDashboard.SearchData.PermissionPage = object;
          this.SignOutApplication();
  }

  public OnDataTableFinished(sender:any, object:any): void
  {
       
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

              this.appDashboard.onLoad(this.AcctId);
              return;
      }
      catch(error)
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
            Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
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
  
  public onOpenActivateCustomer(pfNumber:string):void
  {
          Swal.fire({
            title: 'Warning?',
            text: 'Are you sure that you want to proceed this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f97c00',
            cancelButtonColor: '#5b5b5b7f',
            confirmButtonText: 'Yes!',
            cancelButtonText: "No!"
          }).then((result) => {
            if (result.isConfirmed) {
                this.RemoveData(pfNumber);
            }
          });
  }

  public RemoveData(pfNumber:string):void
  {
      try
      {
              this.loadingService.setLoading(true);
              this.LapoLoanService.ActivateCustomerLoanPermission(pfNumber).subscribe({
              next:(res)=>
              {
                    this.loadingService.setLoading(false);
                    this.appDashboard.onLoad(this.AcctId);
                    this.ResponseData = res;
                    if(this.ResponseData != null && this.ResponseData.isActive)
                    {
                        Swal.fire({ title: '',  text:  this.ResponseData.tryCatchMessage, icon: 'error', confirmButtonText: 'Ok'}).then((result) => {
                          if (result.isConfirmed) {  this.reloadPage(); return; } });
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
                  Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
                  return;
              }
              });

              return;
      }
      catch(exi:any)
      { 
            this.appDashboard.onLoad(this.AcctId);
            Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
            return;
      }
  }

  public  ViewCustomerProfile(id:any):void
  {
        this.router.navigate(['/appcustomerprofile'],  { queryParams: { AcctId:id }} );
        return;
  }
}

