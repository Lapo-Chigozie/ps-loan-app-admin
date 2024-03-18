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
  selector: 'app-app-newloantenure',
  templateUrl: './app-newloantenure.component.html',
  styleUrls: ['./app-newloantenure.component.css']
})

export class AppNewloantenureComponent implements OnInit
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

  NewLoanTenure:string | undefined;
  NewLoanInterest:Number = 1.5;
  NewNameLoanTenure:string | undefined;
  // ClientNetPayDto
  
  constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService, private fileUploadService: FileUploadServiceService) 
  {
      //headerId: item.headerId , IppisNumber: item.ippisNumber 
  }

  ngOnInit(): void 
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

  public async onSaveLoanTenure():Promise<void>
  {
     this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);

      if(this.NewLoanTenure == undefined || this.NewLoanTenure.length < 0)
      {
        Swal.fire({ title: 'Warning!', text: "Loan Tenure is required", icon: 'warning', confirmButtonText: 'Ok' })
        return;
      }

      if(this.NewNameLoanTenure == 'Months' && this.NewLoanTenure=='1')
      {
         this.NewNameLoanTenure = 'Month';
      }

     this.loadingService.setLoading(true);
     // this.NewLoanInterest
     let AppData = { "NewNameLoanTenure": this.NewNameLoanTenure, "NewLoanInterest": '5.1' , "Date": '' , "Status" : 'Active', "Description" : this.NewLoanTenure, "Id" : this.AcctId, "Name": this.NewLoanTenure  };
 
    await this.LapoLoanService.AdminSaveLoanMethod(AppData).subscribe({
     next:(res)=>
     {
       this.loadingService.setLoading(false);
       this.ResponseData = res;
       if(this.ResponseData != null && this.ResponseData.isActive)
       {
           this.NewLoanTenure = "";
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
      try{
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
      catch(data:any)
      {
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
       Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
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


