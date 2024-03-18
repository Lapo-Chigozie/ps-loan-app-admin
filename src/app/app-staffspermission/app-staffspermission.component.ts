
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
  selector: 'app-app-staffspermission',
  templateUrl: './app-staffspermission.component.html',
  styleUrls: ['./app-staffspermission.component.css']
})
export class AppStaffspermissionComponent extends AppBasedComponent implements OnInit
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  //appeditprofile
  message:any= ""; 
  override ResponseData!: RespondMessageDto;
  override AcctId:any = "";
  override ProfileDetails:any;

  headerId:any = undefined;
  IppisNumber:any = undefined;

  LoanDetails:any = undefined;

  AppNote!:string;
  statusButton:boolean = false;
  StaffList:any = undefined;

  StaffPermission:string | undefined;

  public IsStaffsCreatePermissionAccessRight:boolean = false;
  public IsStaffsActivatePermissionAccessRight:boolean = false;
  public IsStaffsLoanPermissionAccessRight:boolean = false;

  StaffAccessRight:any;
  EmailAddress:string | undefined;
  PhoneNumber:string | undefined;

  public IsStaffsLoanTenurePermissionAccessRight:boolean = false;
  public IsStaffsLoanSettingsPermissionAccessRight:boolean = false;
  public IsStaffsNetPaysPermissionAccessRight:boolean = false;
  public IsStaffsCompleteLoanRepaymentPermissionAccessRight:boolean = false;
  public IsStaffsBlockCustomerApplyLoanPermissionAccessRight:boolean = false;

  // constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService, private fileUploadService: FileUploadServiceService) 
  // {
  //     //headerId: item.headerId , IppisNumber: item.ippisNumber 
  // }

  public override LoginUserPermission!:LoginUserPermissionModel;

  constructor(public appDashboard: HubTeamMemberDataTableService, @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService) {
     super(locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
   }

  public  override ngOnInit(): void 
  {
       try
       {
          this.route.queryParams.subscribe(params => 
            { 
              this.headerId = params['headerId'];
              this.IppisNumber = params['ippisNumber'];
             
          });  

          if(this.IppisNumber == null ||  this.headerId == null || this.IppisNumber=="" ||  this.headerId=="" || this.IppisNumber==undefined ||  this.headerId==undefined){
            this.router.navigateByUrl("/appstaffs");
            return;
          }
       
          // alert("Faster than");
          this.ngOnLoanInit();
          this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
          this.appDashboard.OnDataTableFinished.subscribe((object:any) => 
          {
              this.OnDataTableFinished(object.sender, object.object);  
          });

       }
       catch(e:any)
       {
        //console.log('Display: ' + e);
        this.onSignOut('/signin');
       }
  }

  public override  OnLoadedProfileFinished(sender:any, object:any): void
  {
      // alert('this.LoginUserPermission.GroupName');
  }

  public override OnLoadedPermissionFinishedEvent(sender:any, object:LoginUserPermissionModel): void
  {
      this.SignOutApplication();
  }

  public OnDataTableFinished(sender:any, object:any): void
  {
      
  }

  public onNewLoanApp() : void
  {
      this.onNaviagateBack("/appaddstaff");
      return;
  }
  
  public async onAddStaffID():Promise<void>
  {
    this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);

    if(this.StaffPermission == undefined || this.StaffPermission.length < 0)
    {
      Swal.fire({ title: 'Warning!', text: "Staff ID is required", icon: 'warning', confirmButtonText: 'Ok' })
      return;
    }

    if(this.PhoneNumber == undefined || this.PhoneNumber.length < 11 ||  this.PhoneNumber.length > 11)
    {
      Swal.fire({ title: 'Warning!', text: "Phone Number is required and must be 11 digit number", icon: 'warning', confirmButtonText: 'Ok' })
      return;
    }

    if(this.EmailAddress==undefined || this.EmailAddress==null || this.EmailAddress==""){
      this.EmailAddress=""
    }

    this.loadingService.setLoading(true);
    
    let  AppData = {IsStaffsLoanPermissionAccessRight: this.IsStaffsLoanPermissionAccessRight, PhoneNumber : this.PhoneNumber, EmailAddress : this.EmailAddress , IsAccessRightActivatorPermission:  this.IsStaffsActivatePermissionAccessRight, IsAccessRightCreatePermission : this.IsStaffsCreatePermissionAccessRight , "IsActive" : true, "Staff_ID": this.StaffPermission , "CreatingStaff_ID" : this.AcctId };
  
    await this.LapoLoanService.AddRegisterStaffs(AppData).subscribe({
     next:(res)=>
     {
       this.loadingService.setLoading(false);
       this.ResponseData = res;
       if(this.ResponseData != null && this.ResponseData.isActive)
       {
           this.StaffPermission = "";
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
        Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
        return;
     }
   })
  }

  public onSignOut(event:any)
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }
  
  private SignOutApplication():void
  {
      try{
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
           
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
     next:(res:any) =>
     {
       this.loadingService.setLoading(false);
       this.GetProcessGetAllStaffAccessRight();
        // console.log("poof! " + res);
       this.ResponseData = res;
       if(this.ResponseData != null && this.ResponseData.isActive)
       {
           this.ProfileDetails = this.ResponseData.dataLoad;
           this.GetProcessGetAllStaffAccessRight();
           return;
       }
       else
       {
            //console.log(this.SignInResponseData.tryCatchMessage);
           // Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
           this.GetProcessGetAllStaffAccessRight();
           return;
       }
     },
     error:(err:any)=>
     {
       // console.log("no continue " + err);
       this.loadingService.setLoading(false);
      // Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
      this.GetProcessGetAllStaffAccessRight();
      return;
     }
   })
  }

  private async GetStaffAccessRight(): Promise<void> 
  {
      
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        this.loadingService.setLoading(true);
        this.AcctId = this.headerId;
        await this.LapoLoanService.GetStaffAccessRight(this.AcctId).subscribe({
        next:(res)=>
        {
        
          this.loadingService.setLoading(false);
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              this.StaffList = this.ResponseData.dataLoad;
              // console.log('console',  this.StaffList);
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
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
      })
  }

  public onStaffsCreatePermissionAccessRightChanged(event:any):void
  {
     this.IsStaffsCreatePermissionAccessRight = event.target.checked;
  }
  
  public onStaffsActivatePermissionAccessRightChanged(event:any):void
  {
     this.IsStaffsActivatePermissionAccessRight = event.target.checked;
  }

  public onStaffsLoanPermissionAccessRightChanged(event:any):void
  {
     this.IsStaffsLoanPermissionAccessRight = event.target.checked;
  }
  
  private async GetProcessGetAllStaffAccessRight(): Promise<void> 
  {
        // GetLoanAppDetails
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        this.loadingService.setLoading(true);
        await this.LapoLoanService.GetProcessGetAllStaffAccessRight(this.AcctId).subscribe({
        next:(res)=>{
        
          this.GetStaffAccessRight();
          this.loadingService.setLoading(false);
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              this.StaffAccessRight = this.ResponseData.dataLoad;
              this.GetStaffAccessRight();
              return;
          }
          else
          {
              this.GetStaffAccessRight();
              // Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
              return;
          }
        },
        error:(err:any):any=>
        {
            this.GetStaffAccessRight();
            this.loadingService.setLoading(false);
            // Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
      })
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
                this.GetStaffAccessRight();
                if(this.ResponseData != null && this.ResponseData.isActive)
                {
                    // console.log("Poof Loan Apps! " , this.LoanApps);
                    this.GetStaffAccessRight();
                    Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' }).then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
                    return;
                }
                else
                {  
                  this.GetStaffAccessRight();
                      // console.log(this.ResponseData);
                  Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                  .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
                      return;
                }
              },
              error:(err):any=>
              {
                  // console.log("no continue " + err);
                  this.loadingService.setLoading(false);
                  Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
                  .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
                  return;
              }
            })
        }
        catch(exp:any)
        {  this.GetStaffAccessRight();
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again. ", icon: 'error', confirmButtonText: 'Ok' })
          .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
          return;
        }
}

  public async HasPermissionToCreatedStaff(obj :any ,  ippisNumber:any):Promise<void>
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    });

    let comt = "";
    if(obj.target.checked){
      comt ="Activate";
    }
    else{
      comt ="De-Activate";
    }
    swalWithBootstrapButtons.fire({
      title: 'Warning?',
      text: "Are you sure that you want to " + comt + " add new staff permission to this user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: "No!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await  this.ProcessNewStaffAdd(this.headerId);
      } else if (
        /* Read more about handling dismissals below */
         result.dismiss === Swal.DismissReason.cancel ) {  } }); 
  }

  public async HasPermissionToDisableStaff(obj :any ,  ippisNumber:any):Promise<void>
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    });
    
    let comt = "";
    if(obj.target.checked){
      comt ="Activate";
    }
    else{
      comt ="De-Activate";
    }

    swalWithBootstrapButtons.fire({
      title: 'Warning?',
      text: "Are you sure that you want to " + comt + " staff acess right to this user?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: "No!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        await  this.ProcessStaffActivator(this.headerId);
      } else if (
        /* Read more about handling dismissals below */
         result.dismiss == Swal.DismissReason.cancel ) {  } });
        
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
          this.GetStaffAccessRight();
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
        { this.GetStaffAccessRight();
            // console.log("no continue " + err);
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
            return;
        }
        })
      }
      catch(exp:any)
      { this.GetStaffAccessRight();
        this.loadingService.setLoading(false);
        Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
        .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
        return;
      }
}

public async BlockStaffAccessRight(obj :any ,  ippisNumber:any):Promise<void>
{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  });
  
  let comt = "";
  if(obj.target.checked){
    comt ="Activate";
  }
  else{
    comt ="De-Activate";
  }
  swalWithBootstrapButtons.fire({
    title: 'Warning?',
    text: "Are you sure that you want to " + comt + " staff login?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes!',
    cancelButtonText: "No!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      await  this.ProcessStaffAct(this.headerId);
    } else if (result.dismiss === Swal.DismissReason.cancel ) {  } });
      
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
       this.GetStaffAccessRight();
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
        // console.log("no continue " + err);
        this.loadingService.setLoading(false);
        Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
        .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
        return;
     }
   })
  }
  catch(exp:any)
  {
    this.loadingService.setLoading(false);
    Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
    .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
    return;
  }
}

public async ProcessStaffLoanApprovalApp(obj :any ,  ippisNumber:any):Promise<void>
{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: true
  });
  
  let comt = "";
  if(obj.target.checked){
    comt ="Activate";
  }
  else{
    comt ="De-Activate";
  }
  swalWithBootstrapButtons.fire({
    title: 'Warning?',
    text: "Are you sure that you want to " + comt + " staff from (Approving, Cancelling and Completing) customer loan ?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes!',
    cancelButtonText: "No!",
    reverseButtons: true
  }).then(async (result) => {
    if (result.isConfirmed) {
      await  this.ProcessStaffLoanApproval(this.headerId);
    } else if (
      /* Read more about handling dismissals below */
       result.dismiss === Swal.DismissReason.cancel ) {  } });
      
}

private async ProcessStaffLoanApproval(headerId:any):Promise<void>
{
  try
  {
    this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
    this.loadingService.setLoading(true);

    let AppData =   { "CreatingStaff_ID" : this.AcctId,  "AccountId" : headerId, "Comment": "Cancel by staff", "LoadHeaderId" : headerId  }
 
    await this.LapoLoanService.ProcessAction1(AppData).subscribe({
     next:(res)=>{
     
       this.loadingService.setLoading(false);
       this.ResponseData = res;
       this.GetStaffAccessRight();
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
        // console.log("no continue " + err);
        this.loadingService.setLoading(false);
        Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
        .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
        return;
     }
   })
  }
  catch(exp:any)
  {
    this.loadingService.setLoading(false);
    Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
    .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
    return;
  }
}

public async onStaffsCompleteLoanRepaymentPermissionAccessRightChanged(event:any):Promise<void>
{
    try
    {
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      this.loadingService.setLoading(true);

      let AppData =   { "CreatingStaff_ID" : this.AcctId,  "AccountId" :  this.headerId, "Comment": "Cancel by staff", "LoadHeaderId" :  this.headerId  }
  
      await this.LapoLoanService.ProcessAction2(AppData).subscribe({
      next:(res)=>{
      
        this.loadingService.setLoading(false);
        this.ResponseData = res;
        this.GetStaffAccessRight();
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
          // console.log("no continue " + err);
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
          .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
          return;
      }
    })
    }
    catch(exp:any)
    {
      this.loadingService.setLoading(false);
      Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
      .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
      return;
    }
}

public async onStaffsNetPaysPermissionAccessRightChanged(event:any):Promise<void>
{
   //this.IsStaffsNetPaysPermissionAccessRight = event.target.checked;
   try
   {
     this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
     this.loadingService.setLoading(true);

     let AppData =   { "CreatingStaff_ID" : this.AcctId,  "AccountId" :  this.headerId, "Comment": "Cancel by staff", "LoadHeaderId" :  this.headerId  }
 
     await this.LapoLoanService.ProcessAction4(AppData).subscribe({
     next:(res)=>{
     
       this.loadingService.setLoading(false);
       this.ResponseData = res;
       this.GetStaffAccessRight();
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
         // console.log("no continue " + err);
         this.loadingService.setLoading(false);
         Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
         .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
         return;
     }
   })
   }
   catch(exp:any)
   {
     this.loadingService.setLoading(false);
     Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
     .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
     return;
   }
}

public async onStaffsLoanSettingsPermissionAccessRightChanged(event:any):Promise<void>
{
    // this.IsStaffsLoanSettingsPermissionAccessRight = event.target.checked;
    try
    {
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      this.loadingService.setLoading(true);
 
      let AppData =   { "CreatingStaff_ID" : this.AcctId,  "AccountId" :  this.headerId, "Comment": "Cancel by staff", "LoadHeaderId" :  this.headerId  }
  
      await this.LapoLoanService.ProcessAction5(AppData).subscribe({
      next:(res)=>{
      
        this.loadingService.setLoading(false);
        this.ResponseData = res;
        this.GetStaffAccessRight();
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
          // console.log("no continue " + err);
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
          .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
          return;
      }
    })
    }
    catch(exp:any)
    {
      this.loadingService.setLoading(false);
      Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
      .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
      return;
    }
}

public async onStaffsLoanTenurePermissionAccessRightChanged(event:any):Promise<void>
{
  // this.IsStaffsLoanTenurePermissionAccessRight = event.target.checked;
      try
      {
          this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
          this.loadingService.setLoading(true);

          let AppData =   { "CreatingStaff_ID" : this.AcctId,  "AccountId" :  this.headerId, "Comment": "Cancel by staff", "LoadHeaderId" :  this.headerId  }

          await this.LapoLoanService.ProcessAction6(AppData).subscribe({
          next:(res)=>{
          
            this.loadingService.setLoading(false);
            this.ResponseData = res;
            this.GetStaffAccessRight();
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
              // console.log("no continue " + err);
              this.loadingService.setLoading(false);
              Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again. " , icon: 'error', confirmButtonText: 'Ok' })
              .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
              return;
          }
        })
        }
        catch(exp:any)
        {
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
          .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
          return;
        }
}

public async onStaffsBlockCustomerApplyLoanPermissionAccessRightChanged(event:any):Promise<void>
{
  // this.IsStaffsBlockCustomerApplyLoanPermissionAccessRight = event.target.checked;

  try
    {
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      this.loadingService.setLoading(true);

      let AppData =   { "CreatingStaff_ID" : this.AcctId,  "AccountId" :  this.headerId, "Comment": "Cancel by staff", "LoadHeaderId" :  this.headerId  }
  
      await this.LapoLoanService.ProcessAction3(AppData).subscribe({
      next:(res)=>{
      
        this.loadingService.setLoading(false);
        this.ResponseData = res;
        this.GetStaffAccessRight();
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
          // console.log("no continue " + err);
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
          .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
          return;
      }
    })
    }
    catch(exp:any)
    {
      this.loadingService.setLoading(false);
      Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
      .then((result) => { if (result.isConfirmed) {  this.reloadPage(); return; }});
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
}


