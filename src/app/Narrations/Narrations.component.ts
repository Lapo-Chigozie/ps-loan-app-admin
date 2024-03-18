import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../local-storage.service';
import { StaticData } from '../StaticData';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../spinner.service';
import { FileUploadServiceService } from '../file-upload-service.service';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-Narrations',
  templateUrl: './Narrations.component.html',
  styleUrls: ['./Narrations.component.css']
})
export class NarrationsComponent implements OnInit {

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

  NewNarrations:string | undefined;
  
  constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService, private fileUploadService: FileUploadServiceService) 
  {
      //headerId: item.headerId , IppisNumber: item.ippisNumber 
  }

  ngOnInit(): void 
  {
       try
       {
          //narrations
          this.SignOutApplication();
       }
       catch(e:any)
       {
          this.onSignOut('/signin');
       }
  }

  public async onSave():Promise<void>
  {
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);

      if(this.NewNarrations == undefined || this.NewNarrations.length < 0)
      {
          Swal.fire({ title: 'Warning!', text: "Loan Tenure is required", icon: 'warning', confirmButtonText: 'Ok' })
          return;
      }

       this.loadingService.setLoading(true);
      // this.NewLoanInterest
        let AppData = { "NewNarration": this.NewNarrations,  "Id" : this.AcctId };
    
        await this.LapoLoanService.AdminSaveNewNarration(AppData).subscribe({
        next:(res)=>
        {
          this.loadingService.setLoading(false);
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              this.NewNarrations = "";
              // console.log("Poof Loan Apps! " , this.LoanApps);
              Swal.fire({ title: 'Success!', text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok' })
              return;
          }
          else
          {
                this.NewNarrations = "";
                // console.log(this.ResponseData);
                Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                return;
          }
      
        },
        error:(err):any=>
        {
            this.NewNarrations = "";
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
  
  private onNaviagateBack(page:string)
  {
      this.router.navigate([page]);
  }
  
  public SignOutApplication():void
  {
      try
      {
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
       Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
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
