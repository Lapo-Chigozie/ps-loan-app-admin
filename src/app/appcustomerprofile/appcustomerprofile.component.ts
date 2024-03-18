import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AdminserviceService } from '../adminservice.service';
import { FileUploadServiceService } from '../file-upload-service.service';
import { LocalStorageService } from '../local-storage.service';
import { StaticData } from '../StaticData';

@Component({
  selector: 'app-appcustomerprofile',
  templateUrl: './appcustomerprofile.component.html',
  styleUrls: ['./appcustomerprofile.component.css']
})
export class AppcustomerprofileComponent implements OnInit {

// Variable to store shortLink from api response
shortLink: string = "";
loading: boolean = false; // Flag variable
//appeditprofile
message:any= ""; 
ResponseData!: RespondMessageDto;
AcctId:any = "";
ProfileDetails:any;

CustomerAcctId:any;
// ClientNetPayDto
constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService,private fileUploadService: FileUploadServiceService) {

 }

public ngOnInit(): void 
{
  try
  {
         this.route.queryParams
         .subscribe(params => {
         //  console.log(params); 
           this.CustomerAcctId = params['AcctId'];
        
           if(this.CustomerAcctId==null || this.CustomerAcctId == '' || this.CustomerAcctId==undefined){
            this.onNaviagateBack('/signin');
           }
   
           this.SignOutApplication();
         
       }
 );

  }
  catch(e){
   //console.log('Display: ' + e);
   this.onNaviagateBack('/signin');
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
    try
    {
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
  await this.LapoLoanService.GetUserProfileDetails(parseInt(this.CustomerAcctId)).subscribe({
   next:(res)=>{
   
     this.loadingService.setLoading(false);
      // console.log("poof! " + res);
     this.ResponseData = res;
     if(this.ResponseData != null && this.ResponseData.isActive)
     {
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
   error:(err)=>
   {
     // console.log("no continue " + err);
     this.loadingService.setLoading(false);
     Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
          return;
   }
 })
}

public editProfileDetails(event:any):void
{
    this.onNaviagateBack("/appeditprofile");
    return;
}

public async TwoFactorActivator(event:any): Promise<void> 
{
  this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
 
    if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
    {
        this.onSignOut("/signin");
        return;
    }

      this.loadingService.setLoading(true);
      await this.LapoLoanService.UserTwoFactorActivatorConnector(this.AcctId).subscribe({
      next:(res)=>{
      
        this.loadingService.setLoading(false);
          // console.log("poof! " + res);
        this.ResponseData = res;
        if(this.ResponseData != null && this.ResponseData.isActive)
        {
            Swal.fire({ title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok'
            }).then((result) => { if (result.isConfirmed) { this.reloadPage(); return; } })
            return;
        }
        else
        {
              //console.log(this.SignInResponseData.tryCatchMessage);
              Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
              return;
        }
    
      },
      error:(err)=>
      {
        // console.log("no continue " + err);
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
}
