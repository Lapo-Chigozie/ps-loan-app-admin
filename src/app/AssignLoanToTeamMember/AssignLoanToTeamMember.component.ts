import { Component, EventEmitter, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { AppBasedComponent } from '../app-based/app-based.component';
import { LoginUserPermissionModel } from '../PageNextModel/LoginUserPermissionModel';
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
import { HubTeamMemberDataTableService } from '../HubTeamMemberDataTable.service';
import { AppRouterService } from '../AppRouter.service';
import { FileUploadServiceService } from '../file-upload-service.service';
import { DecimalPipe, Location, formatNumber } from '@angular/common';

@Component({
  selector: 'app-AssignLoanToTeamMember',
  templateUrl: './AssignLoanToTeamMember.component.html',
  styleUrls: ['./AssignLoanToTeamMember.component.css']
})
export class AssignLoanToTeamMemberComponent extends AppBasedComponent implements OnInit {

  override LoginUserPermission!:LoginUserPermissionModel;

  override ResponseData!: RespondMessageDto;
  override AcctId:string ="";

  accountLogin!: LoanAppAccountModel;
  BvnResponds !:BvnRespondsDto;
  acctDetails !:AccountDetailsDto;
  bvnAuth!: BvnAuthDto 
  public   DashboardLoanApps: any;
  public expressionLoading:boolean=true;

  private ItemId:string ="";
  private AccountId:string ="";
  public ReconData:any;

  public ReconciliationOfficer:any;

  constructor(public appDashboard: HubTeamMemberDataTableService, @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService) {
     super(locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
   }
  
  override ngOnInit(): void 
  {
       try
       {   
                this.ngOnLoanInit();
                this.route.queryParams.subscribe(params => {
                  
                  this.ItemId = params['ItemId'];
                  this.AccountId = params['AccountId'];
          
                    if(this.AccountId == undefined ||  this.ItemId == undefined || this.ItemId == "" || this.AccountId == "" || this.ItemId == null || this.AccountId == null){
                      this.onFastSignOut();
                    }
                  
                    this.GetAssignLoanTeamMember();
                }
              );
       }
       catch(e:any)
       {
           this.onFastSignOut();
       }
  }

  public override OnLoadedProfileFinished(sender: any, object: any): void 
  {
    
  }

  public override OnLoadedPermissionFinishedEvent(sender: any, object: LoginUserPermissionModel): void 
  {
    this.loadingService.setLoading(false);
      this.GetAssignLoanTeamMember();
  }

  public onSignOut(event:any):void
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onFastSignOut();
      return;
  }

  private  GetAssignLoanTeamMember():void
  {
        try
        {
             this.AcctId = this.AccountId;

             //this.loadingService.setLoading(true);
               this.LapoLoanService.GetAssignLoanToTeamMembers(parseInt(this.AcctId), this.ItemId).subscribe({
              next:(res:any) =>
              {
                    this.loadingService.setLoading(false);
                    this.ResponseData = res;
                    if(this.ResponseData != null && this.ResponseData.isActive)
                    {
                          this.ReconData = this.ResponseData.dataLoad;

                          // console.log(this.ReconData);
                          return;
                    }
                    else
                    {
                          Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                          return;
                    }
              },
              error:(err:any)=>
              {
                  // console.log("no continue " + err);
                 // this.loadingService.setLoading(false);
                  Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
                  return;
              }
            })
        }
        catch(error:any)
        {
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
  }

  public async onAssignLoan(event:any): Promise<void>
  {
        try
        {
                  this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);

                  if(this.ReconciliationOfficer == undefined || this.ReconciliationOfficer == "")
                  {
                        Swal.fire({ title: 'Error!', text: "Select a Reconciliation Officer and try again", icon: 'error', confirmButtonText: 'Ok' })
                        return;
                  }
                 
                  this.loadingService.setLoading(true);
                  
                  let AppData = { ItemId: this.ItemId, ReconciliationOfficer : this.ReconciliationOfficer };
              
                  await this.LapoLoanService.OfficerStandardLoan(AppData).subscribe({
                  next:(res)=>
                  {
                        this.loadingService.setLoading(false);
                        this.ResponseData = res;
                        if(this.ResponseData != null && this.ResponseData.isActive)
                        {
                          
                            Swal.fire({ title: 'Success!', text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok' })
                            return;
                        }
                        else
                        {
                              Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                              return;
                        }
                  },
                  error:(err):any=>
                  {
                      this.loadingService.setLoading(false);
                      Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
                      return;
                  }
                });
        }
        catch(exx:any)
        {
              this.loadingService.setLoading(false);
              Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
              return;
        }

  }
}
