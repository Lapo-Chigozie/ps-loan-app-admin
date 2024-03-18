
import { AppDashboardDtService } from '../AppDashboardDt.service';
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
import { ExportLoanModel, ExportedLoanModel } from '../HubTeam/HubModel/ExportLoanModel';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-loanHistory',
  templateUrl: './loanHistory.component.html',
  styleUrls: ['./loanHistory.component.css']
})
export class LoanHistoryComponent extends AppBasedComponent implements OnInit
{

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  //appeditprofile
  message:any= ""; 
  override ResponseData!: RespondMessageDto;
  override AcctId:string = "";
  override ProfileDetails:any;

  override LoginUserPermission!:LoginUserPermissionModel;
  
  tot:any | undefined;
  
  public FirstName!:string;
  public Middle:string | undefined;
  public LastName:string | undefined;
  public EmailAddress:string| undefined;
  public PhoneNumber:string| undefined;
  public AltPhoneNumber:string| undefined;
  public CurrentAddress:string| undefined;
  public Age:string| undefined;
  public Gender:string| undefined;

  public LoanApps:any = [];

  public ExportLoans:Array<ExportLoanModel> = new Array<ExportLoanModel>();

  // constructor(public appDashboard: AppDashboardDtService,private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService) 
  // {
            // loanHistory
  // }
                  
  constructor(public appDashboard: AppDashboardDtService, @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService) {
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
        this.GetAllLoanApplys1();
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

  public onSignOut(event:any):void
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }
  
  public onApplyLoan():void
  {
 
      LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack('/loanbvnapp');
      return;
  }

  private SignOutApplication() : void
  {
      try
      {
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
              //  console.log("Session Result " + this.AcctId );

              if(this.AcctId  === "" || this.AcctId  === undefined || this.AcctId  === null || this.AcctId  === StaticData.LoginKeySession)
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

  private async GetUserProfileDetails(): Promise<void> 
  {
    this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
    this.loadingService.setLoading(true);
    await this.LapoLoanService.GetUserProfileDetails(parseInt(this.AcctId)).subscribe({
     next:(res)=>{
     
       this.loadingService.setLoading(false);
       this.appDashboard.onLoad(this.AcctId);
       // this.GetAllLoanApplys();
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
       this.appDashboard.onLoad(this.AcctId);
       this.loadingService.setLoading(false);
       Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
       return;
     }
   })
  }

  private async GetAllLoanApplys1(): Promise<void> 
  {
        //   GetLoanAppDetails
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        this.loadingService.setLoading(true);
        await this.LapoLoanService.GetAllLoanApp(parseInt(this.AcctId)).subscribe({
        next:(res)=>{
        
          this.loadingService.setLoading(false);
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive)
          {
              this.LoanApps = this.ResponseData.dataLoad;
              //  console.log("Poof Loan Apps! " , this.LoanApps);
              return;
          }
          else
          {
                //console.log(this.ResponseData);
                Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                return;
          }
      
        },
        error:(err:any):any=>
        {
            // console.log("no continue " + err);
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
      })
  }

  public async CancelLoanApp(headerId :any ,  ippisNumber:any):Promise<void>
  {
      Swal.fire({ title: 'Warning?', text: 'Are you sure that you want to reject the loan request!',
      icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#f97c00', cancelButtonColor: '#5b5b5b7f',
      confirmButtonText: 'Yes!', cancelButtonText: "No!"}).then(async (result) => {
      if (result.isConfirmed) {
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        this.loadingService.setLoading(true);
    
        let AppData =   {  "AccountId" : this.AcctId, "Comment": "Cancel by Admin", "LoadHeaderId" : headerId  }
     
        await this.LapoLoanService.CancelLoanAppConnector(AppData).subscribe({
         next:(res)=>{
         
          this.appDashboard.onLoad(this.AcctId);
           this.loadingService.setLoading(false);
           this.ResponseData = res;
          // this.GetAllLoanApplys();
           if(this.ResponseData != null && this.ResponseData.isActive)
           {
              // console.log("Poof Loan Apps! " , this.LoanApps);
               Swal.fire({ title: 'Warning!', text: 'Loan request was cancelled successful', icon: 'warning', confirmButtonText: 'Ok' })
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
            this.appDashboard.onLoad(this.AcctId);
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
            return;
         }
       })
      }
    });

   
  }

  private reloadPage() :  void
  {
    setTimeout(()=>{  window.location.reload(); }, 100);
    return;
  }

  public onMarkItem(item:any, event:any):void  
  {
      if(event.target.checked)
      {
          let data = new ExportLoanModel();
          data.ExportedBy =  this.AcctId;
          data.LoanId = item.headerId;
          this.ExportLoans?.push(data);
      }
      else
      {
          this.ExportLoans = this.ExportLoans?.filter(exp => exp.LoanId != item.headerId);
      }

        //  console.log("Export Loans",  this.ExportLoans.length);
  }

   private body:any | undefined;
   private DownloadFile = (data: HttpResponse<Blob>) => 
   {
 
       this.body = data.body
       const DownloadedFile = new Blob([this.body], { type: data.body?.type });
       
       const a = document.createElement('a');
       a.setAttribute('style', 'display:none;');
       document.body.appendChild(a);
 
       // a.download = this.fileUrl;
       a.href = URL.createObjectURL(DownloadedFile);
       a.target = '_blank';
       a.click();
       document.body.removeChild(a);
   }
 
   public Progress = 0;
 
   public async onExport(item:any): Promise<void>  
   {
          if(this.appDashboard.LoanApps!==undefined && this.appDashboard.LoanApps!=null && this.appDashboard.LoanApps.length > 0)
          {
                if(this.ExportLoans != null && this.ExportLoans.length > 0)
                {
                          let loanExport =  new ExportedLoanModel();
                          loanExport.MarkedExportLoans = this.ExportLoans ;
                          loanExport.LoanId = this.AcctId;
                          loanExport.EndDate =  this.appDashboard.ToDate;
                          loanExport.StartDate =  this.appDashboard.FromDate;
                          loanExport.Status = this.appDashboard.MaxStatusRetriever;
                        
                          loanExport.ExportedBy = this.AcctId;
                          loanExport.HasMarkedExportLoans = true;
      
                          this.loadingService.setLoading(true);
                          this.LapoLoanService.Download(loanExport).subscribe({
                    next: (res) => {
                      this.loadingService.setLoading(false);
                      this.appDashboard.onLoad(this.AcctId);
                      this.ExportLoans;
                      this.ExportLoans = new Array<ExportLoanModel>();
    
                      //this.ResponseData = res;
                      if (res.type === HttpEventType.UploadProgress) 
                      {
                        this.tot = res.total;
                        this.Progress = Math.round((100 * res.loaded) / parseInt(this.tot));
                      }
                      else if (res.type === HttpEventType.Response) {
                        this.message = 'Download success.';
                        this.DownloadFile(res);
                      }
      
                      // if(this.ResponseData != null && this.ResponseData.isActive)
                      // {
                      //       return;
                      // }
                      // else
                      // {
                      //       this.loadingService.setLoading(false);
                      //       Swal.fire({ title: 'Error!', text:  this.ResponseData.tryCatchMessage,  icon: 'error', confirmButtonText: 'Ok' });
                      //       return;
                      // }
                    },
                    error: (err: any) => {
                      this.appDashboard.onLoad(this.AcctId);
                      this.loadingService.setLoading(false);
                      Swal.fire({ title: 'Error!', text: "An error occurred " + err.message, icon: 'error', confirmButtonText: 'Ok' });
                      return;
                    }
                  });
                }
                else
                {
                  
                            let loanExport =  new ExportedLoanModel();
                            loanExport.MarkedExportLoans = this.ExportLoans;
                            loanExport.LoanId = this.AcctId;
                            loanExport.EndDate =  this.appDashboard.ToDate;
                            loanExport.StartDate =  this.appDashboard.FromDate;
                            loanExport.Status = this.appDashboard.MaxStatusRetriever;
                          
                            loanExport.ExportedBy = this.AcctId;
                            loanExport.HasMarkedExportLoans = false;
      
                            this.loadingService.setLoading(true);
                          this.LapoLoanService.Download(loanExport).subscribe({
                    next: (res) => 
                    {
                        this.loadingService.setLoading(false);
                        this.appDashboard.onLoad(this.AcctId);
                      
                        this.ExportLoans = new Array<ExportLoanModel>();
                      //this.ResponseData = res;
                      if (res.type === HttpEventType.UploadProgress) 
                      {
                          this.tot = res.total;
                          this.Progress = Math.round((100 * res.loaded) / parseInt(this.tot));
                      }
                      else if (res.type === HttpEventType.Response)
                      {
                          this.message = 'Download success.';
                          this.DownloadFile(res);
                      }
                    
                      // if(this.ResponseData != null && this.ResponseData.isActive)
                      // {
                      //       return;
                      // }
                      // else
                      // {
                      //       this.loadingService.setLoading(false);
                      //       Swal.fire({ title: 'Error!', text:  this.ResponseData.tryCatchMessage,  icon: 'error', confirmButtonText: 'Ok' });
                      //       return;
                      // }
                    },
                    error: (err: any) => {
                      this.appDashboard.onLoad(this.AcctId);
                      this.loadingService.setLoading(false);
                      Swal.fire({ title: 'Error!', text: "An error occurred " + err.message, icon: 'error', confirmButtonText: 'Ok' });
                      return;
                    }
                  });
                }
          }
    }

    public async ViewRepayments(headerId: any, IPPSNumber: any):Promise<void>
    {
        try
        {
            this.router.navigate(['/repayments'], { queryParams: { headerId : headerId, IPPSNumber:IPPSNumber }});
            return;
        }
        catch(ex:any)
        { 
              
              Swal.fire({ title: 'Error!', text: "An error occurred: " + ex.message, icon: 'error', confirmButtonText: 'Ok' })
              return;
        }
    }

}




