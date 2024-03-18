
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { StaticData } from '../StaticData';
import { LocalStorageService } from '../local-storage.service';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AdminserviceService } from '../adminservice.service';
import { FileUploadServiceService } from '../file-upload-service.service';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';

@Component({
  selector: 'app-app-addnewsfaff',
  templateUrl: './app-addnewsfaff.component.html',
  styleUrls: ['./app-addnewsfaff.component.css']
})
export class AppAddnewsfaffComponent implements OnInit
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  //appeditprofile
  message:any= ""; 
  ResponseData!: RespondMessageDto;
  AcctId:any = "";
  ProfileDetails:any;

  headerId:any = undefined;
  IppisNumber:any = undefined;

  LoanDetails:any = undefined;

  AppNote!:string;
  statusButton:boolean = false;

  StaffPermission:string | undefined;

  public IsStaffsCreatePermissionAccessRight:boolean = false;
  public IsStaffsActivatePermissionAccessRight:boolean = false;
  public IsStaffsLoanPermissionAccessRight:boolean = false;

  public IsStaffsLoanTenurePermissionAccessRight:boolean = false;
  public IsStaffsLoanSettingsPermissionAccessRight:boolean = false;
  public IsStaffsNetPaysPermissionAccessRight:boolean = false;
  public IsStaffsCompleteLoanRepaymentPermissionAccessRight:boolean = false;
  public IsStaffsBlockCustomerApplyLoanPermissionAccessRight:boolean = false;
  
  StaffAccessRight:any;

  EmailAddress:string | undefined;
  PhoneNumber:string | undefined;

  constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService, private fileUploadService: FileUploadServiceService) 
  {
      //headerId: item.headerId , IppisNumber: item.ippisNumber 
  }

  public ngOnInit(): void 
  {
       try
       {
          this.SignOutApplication();
       }
       catch(e:any)
       {
            //console.log('Display: ' + e);
            this.onSignOut('/signin');
       }
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
      
      let  AppData = { IsStaffsBlockCustomerApplyLoanPermissionAccessRight:this.IsStaffsBlockCustomerApplyLoanPermissionAccessRight,IsStaffsCompleteLoanRepaymentPermissionAccessRight:this.IsStaffsCompleteLoanRepaymentPermissionAccessRight,  IsStaffsNetPaysPermissionAccessRight:this.IsStaffsNetPaysPermissionAccessRight, IsStaffsLoanSettingsPermissionAccessRight: this.IsStaffsLoanSettingsPermissionAccessRight, IsStaffsLoanTenurePermissionAccessRight: this.IsStaffsLoanTenurePermissionAccessRight,   IsStaffsLoanPermissionAccessRight: this.IsStaffsLoanPermissionAccessRight, PhoneNumber : this.PhoneNumber, EmailAddress : this.EmailAddress , IsAccessRightActivatorPermission:  this.IsStaffsActivatePermissionAccessRight, IsAccessRightCreatePermission : this.IsStaffsCreatePermissionAccessRight , "IsActive" : true, "Staff_ID": this.StaffPermission , "CreatingStaff_ID" : this.AcctId };
    
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
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
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
  
  private onNaviagateBack(page:string)
  {
      this.router.navigate([page]);
  }
  
  private SignOutApplication():void
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

  private async GetUserProfileDetails(): Promise<void> 
  {
    this.loadingService.setLoading(true);
    await this.LapoLoanService.GetUserProfileDetails(parseInt(this.AcctId)).subscribe({
     next:(res:any) =>
     {
       this.loadingService.setLoading(false);
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
        
          this.loadingService.setLoading(false);
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              this.StaffAccessRight = this.ResponseData.dataLoad;
              console.log(this.StaffAccessRight);
              return;
          }
          else
          {
              // Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
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
      })
  }

  private reloadPage() :void
  {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
    return;
  }

  public onStaffsCompleteLoanRepaymentPermissionAccessRightChanged(event:any):void
  {
     this.IsStaffsCompleteLoanRepaymentPermissionAccessRight = event.target.checked;
  }
 
  public onStaffsNetPaysPermissionAccessRightChanged(event:any):void
  {
     this.IsStaffsNetPaysPermissionAccessRight = event.target.checked;
  }

  public onStaffsLoanSettingsPermissionAccessRightChanged(event:any):void
  {
     this.IsStaffsLoanSettingsPermissionAccessRight = event.target.checked;
  }

  public onStaffsLoanTenurePermissionAccessRightChanged(event:any):void
  {
     this.IsStaffsLoanTenurePermissionAccessRight = event.target.checked;
  }

  public onStaffsBlockCustomerApplyLoanPermissionAccessRightChanged(event:any):void
  {
     this.IsStaffsBlockCustomerApplyLoanPermissionAccessRight = event.target.checked;
  }

}


