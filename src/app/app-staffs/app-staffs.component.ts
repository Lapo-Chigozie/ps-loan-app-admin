
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
import { AppStaffPermissionDtService } from '../AppStaffPermissionDt.service';

@Component({
  selector: 'app-app-staffs',
  templateUrl: './app-staffs.component.html',
  styleUrls: ['./app-staffs.component.css']
})

export class AppStaffsComponent extends AppBasedComponent implements OnInit
{
      // Variable to store shortLink from api response
      shortLink: string = "";
      loading: boolean = false; // Flag variable
      //appeditprofile
      message:any= ""; 
      override ResponseData!: RespondMessageDto;
      override AcctId:string = "";
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

      public StaffList:any = [];

      public StaffAccessRight : any;

  // constructor(public appDashboard: AppStaffPermissionDtService, private loadingService: SpinnerService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService) 
  // {

  // }

  public override LoginUserPermission!:LoginUserPermissionModel;

  constructor(public appDashboard: AppStaffPermissionDtService, @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService) 
  {
     super(locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }
  
  public override ngOnInit(): void 
  {
      this.ngOnLoanInit();
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      this.appDashboard.OnDataTableFinished.subscribe((object:any) => 
      {
          this.OnDataTableFinished(object.sender, object.object);  
      });
  }

  public override  OnLoadedProfileFinished(sender:any, object:any): void
  {
        
  }

  public override OnLoadedPermissionFinishedEvent(sender:any, object:LoginUserPermissionModel): void
  {
          this.appDashboard.SearchData.PermissionPage = new LoginUserPermissionModel();
          this.appDashboard.SearchData.PermissionPage = object;
          this.SignOutApplication();
        
         // this.appDashboard.onLoad(this.AcctId);
  }

  public OnDataTableFinished(sender:any, object:any): void
  {
        
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
      this.onNaviagateBack("/appaddstaff");
      return;
  }
  
  public ViewPermissions(headerId :any ,  ippisNumber:any) : void
  {
      this.router.navigateByUrl("/appstaffspermission?headerId="+ headerId + "&ippisNumber="+ ippisNumber);
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
              // console.log("Session Result " + this.AcctId );

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
          this.loadingService.setLoading(true);
          await this.LapoLoanService.GetUserProfileDetails(parseInt(this.AcctId)).subscribe({
          next:(res)=>{
          
            this.loadingService.setLoading(false);
              // console.log("poof! " + res);
            this.ResponseData = res;
            this.GetProcessGetAllStaffAccessRight();
            this.appDashboard.onLoad(this.AcctId);
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
                 
                return;
            }
            else
            { 
                 this.GetProcessGetAllStaffAccessRight();
                 this.appDashboard.onLoad(this.AcctId);
                  //console.log(this.SignInResponseData.tryCatchMessage);
                  Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                  return;
            }
        
          },
          error:(err:any)=>
          {

                this.GetProcessGetAllStaffAccessRight();
                this.appDashboard.onLoad(this.AcctId);
                this.loadingService.setLoading(false);
                Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
                return;
          }
          });
  }

  private async GetProcessGetAllStaffAccessRight(): Promise<void> 
  {
        // GetLoanAppDetails
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        this.loadingService.setLoading(true);
        await this.LapoLoanService.GetProcessGetAllStaffAccessRight(this.AcctId).subscribe({
        next:(res) =>
        {
          this.loadingService.setLoading(false);
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              this.StaffAccessRight = this.ResponseData.dataLoad;
            
              return;
          }
          else
          {
              //Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
              return;
          }
        },
        error:(err:any):any=>
        {
            // console.log("no continue " + err);
            this.loadingService.setLoading(false);
           // Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
      });
  }

  // private async GetAllLoanApplys(): Promise<void> 
  // {
  //       // GetLoanAppDetails
  //       this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        
  //       this.loadingService.setLoading(true);
  //       await this.LapoLoanService.GetAllStaffList(parseInt(this.AcctId)).subscribe({
  //       next:(res)=>{
        
  //         this.loadingService.setLoading(false);
  //         this.ResponseData = res;
  //         this.GetProcessGetAllStaffAccessRight();
  //         if(this.ResponseData != null && this.ResponseData.isActive)
  //         {
  //             this.StaffList = this.ResponseData.dataLoad;
            
  //             // console.log('StaffList', this.StaffList);
  //             this.GetProcessGetAllStaffAccessRight();
  //             return;
  //         }
  //         else
  //         {
  //             this.GetProcessGetAllStaffAccessRight();
  //             Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
  //             return;
  //         }
  //       },
  //       error:(err:any):any=>
  //       {
  //           this.GetProcessGetAllStaffAccessRight();
  //           this.loadingService.setLoading(false);
  //           Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
  //           return;
  //       }
  //     });
  // }

  public async CancelLoanApp(headerId :any ,  ippisNumber:any):Promise<void>
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    });
    
    swalWithBootstrapButtons.fire({
      title: 'Warning?',
      text: "Are you sure that you want to " + ippisNumber + " staff login?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: "No!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await  this.ProcessStaffAct(headerId);
      } else if (
        /* Read more about handling dismissals below */
         result.dismiss === Swal.DismissReason.cancel ) {  } });
        
  }

  private async ProcessStaffAct(headerId:any):Promise<void>{
    try
    {
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      this.loadingService.setLoading(true);
  
      let AppData =   { "CreatingStaff_ID" : this.AcctId,  "AccountId" : headerId, "Comment": "Cancel by staff", "LoadHeaderId" : headerId  }
   
      await this.LapoLoanService.ProcessAction(AppData).subscribe({
       next:(res)=>{
       
         this.loadingService.setLoading(false);
         this.ResponseData = res;
         this.GetProcessGetAllStaffAccessRight();
         this.appDashboard.onLoad(this.AcctId);
         if(this.ResponseData != null && this.ResponseData.isActive)
         {
            // console.log("Poof Loan Apps! " , this.LoanApps);
             Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
             .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
             return;
         }
         else
         {
          this.GetProcessGetAllStaffAccessRight();
          this.appDashboard.onLoad(this.AcctId);
              Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
              .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
              return;
         }
       },
       error:(err):any=>
       {
        this.GetProcessGetAllStaffAccessRight();
           this.appDashboard.onLoad(this.AcctId);
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
          .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
          return;
       }
     })
    }
    catch(exp:any)
    {

      this.GetProcessGetAllStaffAccessRight();
      this.appDashboard.onLoad(this.AcctId);
      this.loadingService.setLoading(false);
      Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
      .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
      return;
    }
}

  public async HasPermissionToDisableStaff(headerId :any ,  ippisNumber:any):Promise<void>
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    });
    
    swalWithBootstrapButtons.fire({
      title: 'Warning?',
      text: "Are you sure that you want to " + ippisNumber + " staff acess right to this user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: "No!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await  this.ProcessStaffActivator(headerId);
      } else if (
        /* Read more about handling dismissals below */
         result.dismiss === Swal.DismissReason.cancel ) {  } });
        
  }

  private async ProcessStaffActivator(headerId:any):Promise<void>
  {
      try
      {
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        this.loadingService.setLoading(true);
    
        let AppData =   { "CreatingStaff_ID" : this.AcctId,  "AccountId" : headerId, "Comment": "Cancel by staff", "LoadHeaderId" : headerId  }
    
        await this.LapoLoanService.ProcessActionActivatorStaff(AppData).subscribe({
        next:(res)=>{
        
          this.loadingService.setLoading(false);
          this.ResponseData = res;
          this.GetProcessGetAllStaffAccessRight();
          this.appDashboard.onLoad(this.AcctId);
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              // console.log("Poof Loan Apps! " , this.LoanApps);
              Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
              .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
              return;
          }
          else
          {
                // console.log(this.ResponseData);
                Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
                return;
          }
        },
        error:(err):any=>
        {
          this.GetProcessGetAllStaffAccessRight();
          this.appDashboard.onLoad(this.AcctId);
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
            .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
            return;
        }
        })
      }
      catch(exp:any)
      {
        this.GetProcessGetAllStaffAccessRight();
           this.appDashboard.onLoad(this.AcctId);
        this.loadingService.setLoading(false);
        Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
        .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
        return;
      }
}

  private async ProcessNewStaffAdd(headerId:any):Promise<void>
  {
            try
            {
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
              this.loadingService.setLoading(true);
          
              let AppData =   { "CreatingStaff_ID" : this.AcctId,  "AccountId" : headerId, "Comment": "Cancel by staff", "LoadHeaderId" : headerId  }
          
              await this.LapoLoanService.ProcessActionAddStaff(AppData).subscribe({
              next:(res)=>{
              
                this.loadingService.setLoading(false);
                this.ResponseData = res;
                this.GetProcessGetAllStaffAccessRight();
                this.appDashboard.onLoad(this.AcctId);
                if(this.ResponseData != null && this.ResponseData.isActive)
                {
                    // console.log("Poof Loan Apps! " , this.LoanApps);
                  
                    Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' }).then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
                    return;
                }
                else
                {  
                  this.GetProcessGetAllStaffAccessRight();
                  this.appDashboard.onLoad(this.AcctId);
                  Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                  .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
                      return;
                }
              },
              error:(err):any=>
              {
                this.GetProcessGetAllStaffAccessRight();
                this.appDashboard.onLoad(this.AcctId);
                  this.loadingService.setLoading(false);
                  Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
                  .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
                  return;
              }
            })
        }
        catch(exp:any)
        {  
          this.GetProcessGetAllStaffAccessRight();
          this.appDashboard.onLoad(this.AcctId);
                this.loadingService.setLoading(false);
                Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
                .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
                return;
        }
}

  public async HasPermissionToCreatedStaff(headerId :any ,  ippisNumber:any):Promise<void>
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    });
    
    swalWithBootstrapButtons.fire({
      title: 'Warning?',
      text: "Are you sure that you want to " + ippisNumber + " add new staff permission to this user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: "No!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await  this.ProcessNewStaffAdd(headerId);
      } else if (
        /* Read more about handling dismissals below */
         result.dismiss == Swal.DismissReason.cancel ) {  } }); 
  }

  private reloadPage() :  void
  {
    setTimeout(()=>{  window.location.reload(); }, 100);
    return;
  }
}