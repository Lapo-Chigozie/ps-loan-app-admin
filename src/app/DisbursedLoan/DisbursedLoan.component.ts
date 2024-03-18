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
import { AppConfig } from '../../assets/images/defaultSettings';

@Component({
  selector: 'app-DisbursedLoan',
  templateUrl: './DisbursedLoan.component.html',
  styleUrls: ['./DisbursedLoan.component.css']
})

export class DisbursedLoanComponent extends AppBasedComponent implements OnInit
{
  private AppId:any;
  private SessionResult:any;

  Username:string = "";
  ConfirmPassword:string = "";
  Password:string = "";
 
  message:string = "";
  BvnSend:any= false;
  BvnCodeTyped:any= false;
  BvnCode:string="";
  
  tot:any | undefined;

  bvn:string ="";
  code:string ="";
  crDate ="";
  expDate ="";
  gedDate:any ="";
  id:string ="";
  expired:boolean = false;
  TwoFactor:boolean = false;

  Code1:string = "";
  Code2:string = "";
  Code3:string = "";
  Code4:string = "";
  Code5:string = "";
  Code6:string = "";

  IsDisplayTimeCount:boolean = false;
  timeCount = "00:00";
  MaxtimeCount: any = 200;
  MintimeCount: any = 0;
  tim :any=0;
  IsStartTimer = false;
  TokenMessage:string="";
  ButtonCondition:any=false;
  BtnIsActive= false;

  CodeA1:any=false;
  CodeA2:any=false;
  CodeA3:any=false;
  CodeA4:any=false;
  CodeA5:any=false;
  CodeA6:any=false;

   override ResponseData!: RespondMessageDto;
   override  LoginUserPermission!:LoginUserPermissionModel;
   override AcctId:string ="";

  accountLogin!: LoanAppAccountModel;
  BvnResponds !:BvnRespondsDto;
  acctDetails !:AccountDetailsDto;
  bvnAuth!: BvnAuthDto 
  public   DashboardLoanApps: any;
  public expressionLoading:boolean=true;

  public LoanApps:any = [];
  public ExportLoans:Array<ExportLoanModel> = new Array<ExportLoanModel>();

  public urlhost:string ="";
 
  // constructor(public appDashboard: AppDashboardDtService, private loadingService: SpinnerService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService) { }
  constructor( @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService, public appDashboard: HubTeamMemberDataTableService, public appApiDtoken: AdminserviceService) 
  {
       super( locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }

  override ngOnInit(): void 
  {
        this.ngOnLoanInit();
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        this.urlhost = Apphttpclienturl.GetHostUrl(0); 
        this.urlhost +=  AppConfig.AcctSecurity + '/AllDisbursedLoanAppList';
        this.appDashboard.MaxStatusRetriever = "Disbursed";
        this.appDashboard.OnDataTableFinished.subscribe((object:any) => 
        {
            this.OnDataTableFinished(object.sender, object.object);  
        });
  }

  public OnDataTableFinished(sender:any, object:any): void
  {
     // this.GetDashboardAllLoanApplys();   // this.GetAllLoanApplys1();
  }

  public override OnLoadedProfileFinished(sender:any, object:any): void
  {
      this.appDashboard.AppId = 1;
  }

  ngAfterContentInit(): void 
  {
      
  }

  override ngAfterViewInit(): void 
  {
      
  }

  public override OnLoadedPermissionFinishedEvent(sender:any, object:LoginUserPermissionModel): void
  {
          this.appDashboard.SearchData.PermissionPage = new LoginUserPermissionModel();
          this.appDashboard.SearchData.PermissionPage = object;
          this.LoadSessionInit();
        
          // this.appDashboard.onLoad(this.AcctId);
  }

  public async CancelLoanApp(headerId: any, ippisNumber: any):Promise<void>
  {
        Swal.fire({
          title: 'Warning?',
          text:  'Are you sure that you want to cancel the loan request.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#f97c00',
          cancelButtonColor: '#5b5b5b7f',
          confirmButtonText: 'Yes!',
          cancelButtonText: "No!"
        }).then(async (result) => 
        {
              if (result.isConfirmed) 
              {
                    this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
                    this.loadingService.setLoading(true);
                
                    let AppData =   {  "AccountId" : this.AcctId, "Comment": "Cancel by Admin", "LoadHeaderId" : headerId  }
                
                    this.LapoLoanService.CancelLoanAppConnector(AppData).subscribe({
                  next: (res) => {

                    this.loadingService.setLoading(false);
                    this.ResponseData = res;

                    this.appDashboard.IsAcceptId = false;
                    this.appDashboard.AppId = 1;
                    this.appDashboard.onLoad(this.AcctId, this.urlhost);

                    if (this.ResponseData != null && this.ResponseData.isActive) {
                      Swal.fire({ title: 'Warning!', text: 'Loan request has been cancelled successfully.', icon: 'warning', confirmButtonText: 'Ok' });
                      return;
                    }

                    else {
                      Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' });
                      return;
                    }
                  },
                  error: (err): any => {
                    this.appDashboard.IsAcceptId = false;
                          this.appDashboard.AppId = 1;
                          this.appDashboard.onLoad(this.AcctId, this.urlhost);
                    this.loadingService.setLoading(false);
                    Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
                    return;
                  }
                });
                    return;
              }
        });

  }

  private async GetAllLoanApplys1(): Promise<void> 
  {
       try
       {
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        
              if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
              {
                  this.onSignOut("/signin");
                  return;
              }
          
              this.loadingService.setLoading(true);

              this.LapoLoanService.GetAllLoanAppDashboard(parseInt(this.AcctId)).subscribe({
           next: (res) => {

             this.loadingService.setLoading(false);
             this.ResponseData = res;
             if (this.ResponseData != null && this.ResponseData.isActive) {
               this.LoanApps = this.ResponseData.dataLoad;
               // console.log("Poof Loan Apps! " , this.LoanApps);
               return;
             }

             else {
               //console.log(this.ResponseData);
               // Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
               return;
             }

           },
           error: (err: any): any => {
             // console.log("no continue " + err);
             this.loadingService.setLoading(false);
             // Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
             return;
           }
         });


       }
       catch(ex09:any)
       {

       }
  }

  public LoadSessionInit(): void
  {
          try
          {
              
                this.SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
                //  console.log("Session Result Bend" , this.SessionResult );
                this.AppId = this.SessionResult;
           
                if(this.SessionResult  == "" || this.SessionResult  == undefined || this.SessionResult  == null || this.SessionResult  == StaticData.LoginKeySession)
                {
                    this.onSignOut(null);
                    return;
                }

                //  this.AppId = this.route.snapshot.queryParams["AccountId"];
              
                if(this.AppId == "" || this.AppId == undefined || this.AppId == null)
                {
                    this.onSignOut(null);
                    return;
                }
              
                this.appDashboard.IsAcceptId = false;
                this.appDashboard.AppId = 1;
                this.appDashboard.onLoad(this.AcctId, this.urlhost);
                return;
        }
        catch(e:any)
        {
            this.appDashboard.IsAcceptId = false;
            this.appDashboard.AppId = 1;
            this.appDashboard.onLoad(this.AcctId, this.urlhost);
            this.onSignOut(null);
            return;
        }
  }

  public onSignOut(event:any)
  {
    this.onNaviagateBack('/signin');
  }

  private async GetDashboardAllLoanApplys(): Promise<void> 
  {
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
        //  this.loadingService.setLoading(true);
        let AppData = {  "CustomerId" : this.AcctId, "PFNumber": ""};

        this.expressionLoading = true;
        this.LapoLoanService.GetAdminLoanDetailsConnector(AppData).subscribe({
        next: (res) => {
        this.ResponseData = res;
        if (this.ResponseData != null && this.ResponseData.isActive) {
          this.expressionLoading = false;
          this.loadingService.setLoading(false);
          this.DashboardLoanApps = this.ResponseData.dataLoad;
          // console.log("Dashboard Loan Apps! ", this.DashboardLoanApps);
          return;
        }
        else if (this.ResponseData != null && this.ResponseData.isActive == false) 
        {
            this.expressionLoading = false;
            this.loadingService.setLoading(false);
            // console.log(this.ResponseData);
            // Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
            return;
        }

      },
      error: (err): any => 
      {
              this.expressionLoading = false;
              this.loadingService.setLoading(false);
              // Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
              return;
      }
    })
  }

  public onMarkItem(item:any, event:any): void  
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
                 this.appDashboard.IsAcceptId = false;
                  this.appDashboard.AppId = 1;
                  this.appDashboard.onLoad(this.AcctId, this.urlhost);

                this.ExportLoans;
                this.ExportLoans = new Array<ExportLoanModel>();
                //this.ResponseData = res;
                if (res.type == HttpEventType.UploadProgress) 
                {
                   this.tot = res.total;
                   this.Progress = Math.round((100 * res.loaded) / parseInt(this.tot));
                }
                else if (res.type == HttpEventType.Response) {
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
              error: (err: any) => 
              {
                this.appDashboard.IsAcceptId = false;
                this.appDashboard.AppId = 1;
                this.appDashboard.onLoad(this.AcctId, this.urlhost);
                this.loadingService.setLoading(false);
                Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
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
                  this.appDashboard.IsAcceptId = false;
                  this.appDashboard.AppId = 1;
                  this.appDashboard.onLoad(this.AcctId, this.urlhost);
                 
                  this.ExportLoans = new Array<ExportLoanModel>();
                //this.ResponseData = res;
                if (res.type == HttpEventType.UploadProgress) 
                {
                    this.tot = res.total;
                    this.Progress = Math.round((100 * res.loaded) / parseInt(this.tot));
                }
                else if (res.type == HttpEventType.Response)
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
              error: (err: any) => 
              {
                this.appDashboard.IsAcceptId = false;
                this.appDashboard.AppId = 1;
                this.appDashboard.onLoad(this.AcctId, this.urlhost);
                this.loadingService.setLoading(false);
                Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
                return;
              }
            });

          }
   }

  public async UploadFile(files:any): Promise<void>
  {
        this.loadingService.setLoading(true);

        if (files.length == 0) 
        {
              this.loadingService.setLoading(false);
              Swal.fire({ title: 'Error!',  text: "Upload a file and try again", icon: 'error', confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) 
                {
                     this.ReloadPage(); return;
                }
              });
              return;
        }

        let totalSize: number = 0;
        for (let file of files) {
            totalSize = totalSize + file.size;
        }

        // console.log ("Total select file's size is " + totalSize)

         let fileToUpload = <File>files[0];
         var name = fileToUpload.name;
         var type = fileToUpload.type;
         var size = fileToUpload.size;
         var modifiedDate = fileToUpload.lastModified;

        // console.log ('Name: ' + name + "\n" +  'Type: ' + type + "\n" + 'Last-Modified-Date: ' + modifiedDate + "\n" +'Size: ' + Math.round(size / 1024) + " KB");
      
        try
        {
                  this.fileUploadService.UploadFile(files).subscribe({
                  next: (event) => 
                  {
                        this.loadingService.setLoading(false);
                        this.ResponseData = event;
                        if(this.ResponseData != null && this.ResponseData.isActive)
                        {
                            Swal.fire({ title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok'}).then((result) => {
                              if (result.isConfirmed) {
                                this.appDashboard.IsAcceptId = false;
                                this.appDashboard.AppId = 1;
                                this.appDashboard.onLoad(this.AcctId, this.urlhost);
                                this.ReloadPage();
                                return;
                              }});

                            return;
                        }
                        else
                        {
                            // this.alertify.error('Error saving Connection...')
                            Swal.fire({title: 'Error!', text: this.ResponseData.tryCatchMessage, icon: 'error',   confirmButtonText: 'Ok'}).then((result) => {
                              if (result.isConfirmed) {
                                this.appDashboard.IsAcceptId = false;
                                this.appDashboard.AppId = 1;
                                this.appDashboard.onLoad(this.AcctId, this.urlhost);
                                this.ReloadPage();
                                return;
                              }

                            });

                            return;
                        }

                  return;
                },
                error: (err: HttpErrorResponse) => 
                {
                      this.loadingService.setLoading(false);
                      Swal.fire({ title: 'Error!',  text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok'}).then((result) => {
                        if (result.isConfirmed) {
                          this.appDashboard.IsAcceptId = false;
                      this.appDashboard.AppId = 1;
                      this.appDashboard.onLoad(this.AcctId, this.urlhost);
                          this.ReloadPage();
                          return;
                        }
                      });
                      return;
                }
             });
        }
        catch(err:any)
        {
              this.loadingService.setLoading(false);

              Swal.fire({ title: 'Error!',  text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok'}).then((result) => {
                if (result.isConfirmed) 
                {
                      this.appDashboard.IsAcceptId = false;
                      this.appDashboard.AppId = 1;
                      this.appDashboard.onLoad(this.AcctId, this.urlhost);
                      this.ReloadPage();
                      return;
                }
              });

              return;
        }

        // if (event.type === HttpEventType.UploadProgress)
        // {
        //    this.total = event.total;
        //    this.progress = Math.round(100 * event.loaded / this.total);
        // }
        //  else if (event.type === HttpEventType.Response) 
          //{
        //    this.message = 'Upload success.';
        //    this.onUploadFinished.emit(event.body);
        // }
    }
}

