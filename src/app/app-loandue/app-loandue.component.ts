import { Component, OnInit } from '@angular/core';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';
import { FileUploadServiceService } from '../file-upload-service.service';
import { StaticData } from '../StaticData';
import { LocalStorageService } from '../local-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-app-loandue',
  templateUrl: './app-loandue.component.html',
  styleUrls: ['./app-loandue.component.css']
})
export class AppLoandueComponent implements OnInit
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
  LoanScheduleData:any = undefined;

  constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService, private fileUploadService: FileUploadServiceService) 
  {
      //headerId: item.headerId , IppisNumber: item.ippisNumber 
  }

  ngOnInit(): void 
  {
       try
       {
              
                this.SignOutApplication();
                this.route.queryParams.subscribe(params => {
                  //  console.log(params); 
                    this.headerId = params['headerId'];
                    this.IppisNumber = params['IppisNumber'];
            
                      if(this.headerId == undefined ||  this.headerId == undefined || this.IppisNumber ==undefined || this.IppisNumber == '' ||  this.headerId == '' || this.headerId == ''){
                        this.onSignOut('/signin');
                      }
                   //  console.log('Data Load', this.IppisNumber);
                     this.Getloanappdetails();  
                  }
                );

               
       }
       catch(e:any)
       {
        //console.log('Display: ' + e);
        this.onSignOut('/signin');
       }
  }

  public async onApproveLoanApp(headerId :any):Promise<void>
  {
      this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
    
      // if(this.AppNote == undefined || this.AppNote.length < 0)
      // {
      //   Swal.fire({ title: 'Warning!', text: "Write a note about this loan approval", icon: 'warning', confirmButtonText: 'Ok' })
      //   return;
      // }

      if(this.AppNote==undefined ||  this.AppNote == "")
      {
           this.AppNote ="";
      }

      this.loadingService.setLoading(true);
      let AppData =   {  "AccountId" : this.AcctId, "Comment": this.AppNote, "LoadHeaderId" : headerId  };
  
      await this.LapoLoanService.AdminApprovedLoanAppRequest(AppData).subscribe({
      next:(res)=>{
      
        this.loadingService.setLoading(false);
        this.ResponseData = res;
        this.Getloanappdetails();
        if(this.ResponseData != null && this.ResponseData.isActive)
        {
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

  public async onCancelLoanApp(headerId :any):Promise<void>
  {
    this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
   

    if(this.AppNote == undefined || this.AppNote.length < 0)
    {
      Swal.fire({ title: 'Warning!', text: "Write a note about this loan approval", icon: 'warning', confirmButtonText: 'Ok' })
      return;
    }

    this.loadingService.setLoading(true);
    let AppData =   {  "AccountId" : this.AcctId, "Comment": this.AppNote, "LoadHeaderId" : headerId  };
 
    await this.LapoLoanService.AdminCancelLoanAppRequest(AppData).subscribe({
     next:(res)=>{
     
       this.loadingService.setLoading(false);
       this.ResponseData = res;
       this.Getloanappdetails();
       if(this.ResponseData != null && this.ResponseData.isActive)
       {
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
       Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
       return;
     }
   })
  }

  public async Getloanappdetails(): Promise<void> 
  {
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
       /// console.log("Session Result " + this.AcctId );

        if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
        {
            this.onSignOut("/signin");
            return;
        }
       
        this.loadingService.setLoading(true);
        await this.LapoLoanService.GetLoanAppDetails(this.headerId, this.AcctId).subscribe({
        next:(res:any)=>{
        
          this.loadingService.setLoading(false);
            // console.log("poof! " + res);
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              this.LoanDetails = this.ResponseData.dataLoad;
              this.onLoanTenureChanged();
            
              if(this.LoanDetails.loanAppReviewStatus.status==='Pending')
              {
                this.statusButton = true; 
              }
              else
              {
                this.statusButton = false; 
              }
            
            // console.log('Data Load', this.ResponseData.dataLoad);
            // Swal.fire({ title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok'
             // }).then((result) => { if (result.isConfirmed) {  return; } })
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

  public async onLoanTenureChanged() : Promise<void>
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

  private reloadPage() :void
  {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
    return;
  }
}


