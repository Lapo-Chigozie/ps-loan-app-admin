import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { AppBasedComponent } from '../app-based/app-based.component';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../local-storage.service';
import { StaticData } from '../StaticData';
import { FileUploadServiceService } from '../file-upload-service.service';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';
import { AppRouterService } from '../AppRouter.service';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe, Location, formatNumber } from '@angular/common';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { HubGroupsDataTableService } from '../HubTeam/DataTablePackage/HubGroupsDataTable.service';
import { HubTeamMemberDataTableService } from '../HubTeamMemberDataTable.service';
import { Apphttpclienturl } from '../apphttpclienturl';
import { AppConfig } from '../../assets/images/defaultSettings';

@Component({
  selector: 'app-TeamMemberPermissionEdit',
  templateUrl: './TeamMemberPermissionEdit.component.html',
  styleUrls: ['./TeamMemberPermissionEdit.component.css']
})
export class TeamMemberPermissionEditComponent extends AppBasedComponent implements OnInit 
{
      public Id:any;
      public SelectHubGroupId:any;
      public SelectHubGroupIdd:any;
      public permissionInfo:any | undefined;

      public EnterTeamMemberID:any | undefined;
      public UserType:any | undefined;
      
      public AccessRightToEditTeamMemberPermissions:boolean = false; 
      public AccessRightToViewDisbursementLoan:boolean = false; 
      public AccessRightToViewUploadBackRepaymentLoan :boolean = false;
      public AccessRightToExportDISBURSEMENTLoan:boolean = false;
      public AccessRightToAnonymousLoanApplication:boolean = false; 
      public AccessRightToUploadBackDISBURSEMENTLoan :boolean = false;
      public AccessRightToUploadBackRepaymentLoan:boolean = false;
      public AccessRightToPrintLoan:boolean = false; 
      public AccessRightToProceedLoan :boolean = false;
      public ViewLoanNarration:boolean = false;
      public CreateLoanNarration:boolean = false; 
      public AccessRighttodisablecustomerstoapplyforaloan :boolean = false;
      public AccessRighttoviewcustomers:boolean = false;
      public AccessRighttodisablehubs:boolean = false; 
      public AccessRighttoviewtenure :boolean = false;
      public AccessRighttocreatetenure:boolean = false;
      public AccessRighttoloansettings:boolean = false; 
      public AccessRighttoteamsAndpermissions :boolean = false;
      public AccessRighttorejectaloan:boolean = false;
      public AccessRighttoviewcustomersloans:boolean = false; 
      public AccessRighttoapprovecustomerloan :boolean = false;
      public AccessRighttoviewveammembers:boolean = false;
      public AccessRighttocreateateammember:boolean = false; 
      public AccessRighttoviewhubs :boolean = false;
      public AccessRighttocreateahub:boolean = false;
      public AccessRighttoviewloandetails:boolean = false;

      public urlhost:string | undefined;
      public AllPermissions:boolean = false;
      
  constructor( @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService,public appDashboard: HubTeamMemberDataTableService, public appApiDtoken: AdminserviceService) 
  {
       super( locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }

  public override ngOnInit() :void
  {
    try
    {             
                   this.ngOnLoanInit();
                   this.route.queryParams.subscribe(params => {
                   this.Id = params['id'];
                   if(this.Id == undefined ||  this.Id == undefined || this.Id == undefined || this.Id == '' ||  this.Id == '' || this.Id == null)
                   {
                         this.onSignOut('/signin');
                   }});

                    //    this.urlhost = Apphttpclienturl.GetHostUrl(0); 
                    //    this.urlhost += '/api/HubTeam/HubTeamMembers';
                    //    this.appDashboard. MaxStatusRetriever  = 'All'
                    //    this.appDashboard.OnDataTableFinished.subscribe((object:any) => 
                    //    {
                    //        this.OnDataTableFinished(object.sender, object.object);  
                    //    });

                   this.appDashboard.MaxDataRetriever  = 0;
                   this.appDashboard.MaxStatusRetriever = "Active";
       
                   this.urlhost = Apphttpclienturl.GetHostUrl(0); 
                   this.urlhost += AppConfig.HubTeam + '/HubTeamListByNameMember';
       
                   this.appDashboard.IsAcceptId = false;
                   this.appDashboard.onLoad(this.AcctId, this.urlhost);
       
                   this.appDashboard.OnDataTableFinished.subscribe((object:any) => 
                   {
                       this.OnDataTableFinished(object.sender, object.object);  
                   });
    }
    catch(e:any)
    {
         this.onSignOut('/signin');
    }
  }

  public onhangeUserRole(event:any):void
  {
      if(event.target.value == "GROUP HEAD")
      {
                      this. AccessRightToEditTeamMemberPermissions = true; 
                      this. AccessRightToViewDisbursementLoan= false; 
                      this. AccessRightToViewUploadBackRepaymentLoan  = true;
                      this. AccessRightToExportDISBURSEMENTLoan = false;
                      this. AccessRightToAnonymousLoanApplication = true; 
                      this. AccessRightToUploadBackDISBURSEMENTLoan  = false;
                      this. AccessRightToUploadBackRepaymentLoan = false;
                      this. AccessRightToPrintLoan = true; 
                      this. AccessRightToProceedLoan  = true;
                      this. ViewLoanNarration = true;
                      this. CreateLoanNarration = true; 
                      this. AccessRighttodisablecustomerstoapplyforaloan  = true;
                      this. AccessRighttoviewcustomers = true;
                      this. AccessRighttodisablehubs = true; 
                      this. AccessRighttoviewtenure  = true;
                      this. AccessRighttocreatetenure = true;
                      this. AccessRighttoloansettings = true; 
                      this. AccessRighttoteamsAndpermissions  = true;
                      this. AccessRighttorejectaloan = false;
                      this. AccessRighttoviewcustomersloans = false; 
                      this. AccessRighttoapprovecustomerloan  = false;
                      this. AccessRighttoviewveammembers = true;
                      this. AccessRighttocreateateammember = true; 
                      this. AccessRighttoviewhubs  = true;
                      this. AccessRighttocreateahub = true;
                      this. AccessRighttoviewloandetails = true;  return;

      }

      if(event.target.value == "RELATIONSHIP OFFICER")
      {
          this. AccessRightToEditTeamMemberPermissions = false; 
          this. AccessRightToViewDisbursementLoan = true; 
          this. AccessRightToViewUploadBackRepaymentLoan  = false;
          this. AccessRightToExportDISBURSEMENTLoan = true;
          this. AccessRightToAnonymousLoanApplication = false; 
          this. AccessRightToUploadBackDISBURSEMENTLoan  = false;
          this. AccessRightToUploadBackRepaymentLoan = false;
          this. AccessRightToPrintLoan = false; 
          this. AccessRightToProceedLoan  = false;
          this. ViewLoanNarration = false;
          this. CreateLoanNarration = false; 
          this. AccessRighttodisablecustomerstoapplyforaloan  = false;
          this. AccessRighttoviewcustomers = true;
          this. AccessRighttodisablehubs = false; 
          this. AccessRighttoviewtenure  = false;
          this. AccessRighttocreatetenure = false;
          this. AccessRighttoloansettings = false; 
          this. AccessRighttoteamsAndpermissions  = false;
          this. AccessRighttorejectaloan = false;
          this. AccessRighttoviewcustomersloans = true; 
          this. AccessRighttoapprovecustomerloan  = false;
          this. AccessRighttoviewveammembers = false;
          this. AccessRighttocreateateammember = false; 
          this. AccessRighttoviewhubs  = false;
          this. AccessRighttocreateahub = false;
          this. AccessRighttoviewloandetails = false; 
           return;
      }

      if(event.target.value == "TEAM LEADS")
      {
        //   this. AccessRightToEditTeamMemberPermissions = false; 
        //   this. AccessRightToViewDisbursementLoan= true; 
        //   this. AccessRightToViewUploadBackRepaymentLoan  = false;
        //   this. AccessRightToExportDISBURSEMENTLoan = true;
        //   this. AccessRightToAnonymousLoanApplication = true; 
        //   this. AccessRightToUploadBackDISBURSEMENTLoan  = true;
        //   this. AccessRightToUploadBackRepaymentLoan = false;
        //   this. AccessRightToPrintLoan = true; 
        //   this. AccessRightToProceedLoan  = false;
        //   this. ViewLoanNarration = true;
        //   this. CreateLoanNarration = false; 
        //   this. AccessRighttodisablecustomerstoapplyforaloan  = false;
        //   this. AccessRighttoviewcustomers = true;
        //   this. AccessRighttodisablehubs = false; 
        //   this. AccessRighttoviewtenure  = false;
        //   this. AccessRighttocreatetenure = false;
        //   this. AccessRighttoloansettings = false; 
        //   this. AccessRighttoteamsAndpermissions  = false;
        //   this. AccessRighttorejectaloan = false;
        //   this. AccessRighttoviewcustomersloans = true; 
        //   this. AccessRighttoapprovecustomerloan  = false;
        //   this. AccessRighttoviewveammembers = true;
        //   this. AccessRighttocreateateammember = false; 
        //   this. AccessRighttoviewhubs  = false;
        //   this. AccessRighttocreateahub = false;
        //   this. AccessRighttoviewloandetails = true;  
        //   return;

                this. AccessRightToEditTeamMemberPermissions = false; 
                this. AccessRightToViewDisbursementLoan= true; 
                this. AccessRightToViewUploadBackRepaymentLoan = false;
                this. AccessRightToExportDISBURSEMENTLoan = true;
                this. AccessRightToAnonymousLoanApplication = false; 
                this. AccessRightToUploadBackDISBURSEMENTLoan  = false;
                this. AccessRightToUploadBackRepaymentLoan = false;
                this. AccessRightToPrintLoan = false; 
                this. AccessRightToProceedLoan  = false;
                this. ViewLoanNarration = true;
                this. CreateLoanNarration = false; 
                this. AccessRighttodisablecustomerstoapplyforaloan  = false;
                this. AccessRighttoviewcustomers = true;
                this. AccessRighttodisablehubs = false; 
                this. AccessRighttoviewtenure  = false;
                this. AccessRighttocreatetenure = false;
                this. AccessRighttoloansettings = false; 
                this. AccessRighttoteamsAndpermissions  = false;
                this. AccessRighttorejectaloan = false;
                this. AccessRighttoviewcustomersloans = true; 
                this. AccessRighttoapprovecustomerloan  = false;
                this. AccessRighttoviewveammembers = false;
                this. AccessRighttocreateateammember = false; 
                this. AccessRighttoviewhubs  = false;
                this. AccessRighttocreateahub = false;
                this. AccessRighttoviewloandetails = true; 
                return;
      }

      if(event.target.value == "RECONCILIATION AND ACCOUNT OFFICER")
      {
          this. AccessRightToEditTeamMemberPermissions = false; 
          this. AccessRightToViewDisbursementLoan= false; 
          this. AccessRightToViewUploadBackRepaymentLoan  = false;
          this. AccessRightToExportDISBURSEMENTLoan = false;
          this. AccessRightToAnonymousLoanApplication = false; 
          this. AccessRightToUploadBackDISBURSEMENTLoan  = false;
          this. AccessRightToUploadBackRepaymentLoan = false;
          this. AccessRightToPrintLoan = true; 
          this. AccessRightToProceedLoan  = true;
          this. ViewLoanNarration = true;
          this. CreateLoanNarration = false; 
          this. AccessRighttodisablecustomerstoapplyforaloan  = false;
          this. AccessRighttoviewcustomers = true;
          this. AccessRighttodisablehubs = false; 
          this. AccessRighttoviewtenure  = false;
          this. AccessRighttocreatetenure = false;
          this. AccessRighttoloansettings = false; 
          this. AccessRighttoteamsAndpermissions  = false;
          this. AccessRighttorejectaloan = true;
          this. AccessRighttoviewcustomersloans = true; 
          this. AccessRighttoapprovecustomerloan  = true;
          this. AccessRighttoviewveammembers = true;
          this. AccessRighttocreateateammember = false; 
          this. AccessRighttoviewhubs  = false;
          this. AccessRighttocreateahub = false;
          this. AccessRighttoviewloandetails = false;  return;
      }

      if(event.target.value == "ASSISTANT HEAD OF OPERATION")
      {
          this. AccessRightToEditTeamMemberPermissions = false; 
          this. AccessRightToViewDisbursementLoan= false; 
          this. AccessRightToViewUploadBackRepaymentLoan  = true;
          this. AccessRightToExportDISBURSEMENTLoan = false;
          this. AccessRightToAnonymousLoanApplication = false; 
          this. AccessRightToUploadBackDISBURSEMENTLoan  = false;
          this. AccessRightToUploadBackRepaymentLoan = true;
          this. AccessRightToPrintLoan = true; 
          this. AccessRightToProceedLoan  = false;
          this. ViewLoanNarration = true;
          this. CreateLoanNarration = true; 
          this. AccessRighttodisablecustomerstoapplyforaloan  = true;
          this. AccessRighttoviewcustomers = true;
          this. AccessRighttodisablehubs = true; 
          this. AccessRighttoviewtenure  = true;
          this. AccessRighttocreatetenure = true;
          this. AccessRighttoloansettings = true; 
          this. AccessRighttoteamsAndpermissions  = false;
          this. AccessRighttorejectaloan = false;
          this. AccessRighttoviewcustomersloans = false; 
          this. AccessRighttoapprovecustomerloan  = false;
          this. AccessRighttoviewveammembers = true;
          this. AccessRighttocreateateammember = false; 
          this. AccessRighttoviewhubs  = true;
          this. AccessRighttocreateahub = false;
          this. AccessRighttoviewloandetails = false;  return;
      }

      if(event.target.value == "HEAD OF OPERATIONS")
      {
          this. AccessRightToEditTeamMemberPermissions = false; 
          this. AccessRightToViewDisbursementLoan= false; 
          this. AccessRightToViewUploadBackRepaymentLoan  = false;
          this. AccessRightToExportDISBURSEMENTLoan = false;
          this. AccessRightToAnonymousLoanApplication = false; 
          this. AccessRightToUploadBackDISBURSEMENTLoan  = false;
          this. AccessRightToUploadBackRepaymentLoan = false;
          this. AccessRightToPrintLoan = false; 
          this. AccessRightToProceedLoan  = false;
          this. ViewLoanNarration = true;
          this. CreateLoanNarration = false; 
          this. AccessRighttodisablecustomerstoapplyforaloan  = false;
          this. AccessRighttoviewcustomers = true;
          this. AccessRighttodisablehubs = false; 
          this. AccessRighttoviewtenure  = true;
          this. AccessRighttocreatetenure = false;
          this. AccessRighttoloansettings = false; 
          this. AccessRighttoteamsAndpermissions  = false;
          this. AccessRighttorejectaloan = false;
          this. AccessRighttoviewcustomersloans = false; 
          this. AccessRighttoapprovecustomerloan  = false;
          this. AccessRighttoviewveammembers = true;
          this. AccessRighttocreateateammember = false; 
          this. AccessRighttoviewhubs  = true;
          this. AccessRighttocreateahub = false;
          this. AccessRighttoviewloandetails = false;  return;
      }

      if(event.target.value == "DISBURSEMENT OFFICER")
      {
          this. AccessRightToEditTeamMemberPermissions = false; 
          this. AccessRightToViewDisbursementLoan= true; 
          this. AccessRightToViewUploadBackRepaymentLoan  = false;
          this. AccessRightToExportDISBURSEMENTLoan = true;
          this. AccessRightToAnonymousLoanApplication = false; 
          this. AccessRightToUploadBackDISBURSEMENTLoan  = true;
          this. AccessRightToUploadBackRepaymentLoan = false;
          this. AccessRightToPrintLoan = true; 
          this. AccessRightToProceedLoan  = false;
          this. ViewLoanNarration = false;
          this. CreateLoanNarration = false; 
          this. AccessRighttodisablecustomerstoapplyforaloan  = false;
          this. AccessRighttoviewcustomers = true;
          this. AccessRighttodisablehubs = false; 
          this. AccessRighttoviewtenure  = false;
          this. AccessRighttocreatetenure = false;
          this. AccessRighttoloansettings = false; 
          this. AccessRighttoteamsAndpermissions  = false;
          this. AccessRighttorejectaloan = false;
          this. AccessRighttoviewcustomersloans = false; 
          this. AccessRighttoapprovecustomerloan  = false;
          this. AccessRighttoviewveammembers = false;
          this. AccessRighttocreateateammember = false; 
          this. AccessRighttoviewhubs  = false;
          this. AccessRighttocreateahub = false;
          this. AccessRighttoviewloandetails = false;

return;
      }
  }

  public OnDataTableFinished(sender:any, object:any): void
  {
    
  }

  public override OnLoadedProfileFinished(sender:any, object:any): void
  {
      this.Getloanappdetails();
      /// this.SignOutApplication();
      this.appDashboard.AppId = 1;
  }

  public async onEditTeamMember():Promise<void>
  {
      try
      {
                this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);

                if(this.SelectHubGroupId == undefined || this.SelectHubGroupId == null)
                {
                    Swal.fire({ title: 'Warning!', text: "Team Member Id is required", icon: 'warning', confirmButtonText: 'Ok' })
                    return;
                }

                this.loadingService.setLoading(true);
                
                let AppData = { SelectHubGroupIdd:this.SelectHubGroupIdd, UserType:this.UserType, AccessRightToEditTeamMemberPermissions: this.AccessRightToEditTeamMemberPermissions,
                    AccessRightToViewDisbursementLoan: this.AccessRightToViewDisbursementLoan,
                    AccessRightToViewUploadBackRepaymentLoan : this.AccessRightToViewUploadBackRepaymentLoan,
                    AccessRightToExportDISBURSEMENTLoan: this.AccessRightToExportDISBURSEMENTLoan,
                    AccessRightToAnonymousLoanApplication: this.AccessRightToAnonymousLoanApplication,
                    AccessRightToUploadBackDISBURSEMENTLoan : this.AccessRightToUploadBackDISBURSEMENTLoan,
                    AccessRightToUploadBackRepaymentLoan: this.AccessRightToUploadBackRepaymentLoan,
                    AccessRightToPrintLoan: this.AccessRightToPrintLoan, 
                    AccessRightToProceedLoan : this.AccessRightToProceedLoan,
                    ViewLoanNarration: this.ViewLoanNarration,
                    CreateLoanNarration: this.CreateLoanNarration,
                    AccessRighttoviewcustomers: this.AccessRighttoviewcustomers,
                    AccessRighttodisablehubs: this.AccessRighttodisablehubs,
                    AccessRighttoviewtenure : this.AccessRighttoviewtenure,
                    AccessRighttocreatetenure: this.AccessRighttocreatetenure,
                    AccessRighttoloansettings: this.AccessRighttoloansettings,
                    AccessRighttoteamsAndpermissions : this.AccessRighttoteamsAndpermissions,
                    AccessRighttorejectaloan: this.AccessRighttorejectaloan,
                    AccessRighttoviewcustomersloans: this.AccessRighttoviewcustomersloans,
                    AccessRighttoapprovecustomerloan : this.AccessRighttoapprovecustomerloan,
                    AccessRighttoviewveammembers: this.AccessRighttoviewveammembers,
                    AccessRighttocreateateammember: this.AccessRighttocreateateammember ,
                    AccessRighttoviewhubs : this.AccessRighttoviewhubs,
                    AccessRighttocreateahub: this.AccessRighttocreateahub,
                    AccessRighttoviewloandetails: this.AccessRighttoviewloandetails,
                    AccessRighttodisablecustomerstoapplyforaloan: this.AccessRighttodisablecustomerstoapplyforaloan, 
                    SelectHubGroupId: this.SelectHubGroupId };
            
                    await this.LapoLoanService.ExitNewHubTeamMember(AppData).subscribe({
                    next:(res) =>
                    {
                      this.loadingService.setLoading(false);
                      this.ResponseData = res;
                      this.Getloanappdetails();
                      if(this.ResponseData != null && this.ResponseData.isActive)
                      {
                          Swal.fire({ title: 'Success!', text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok' }).then((result) => {
                            if (result.isConfirmed) {
                              this.reloadPage(); return;
                            }
                          });
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

  public SignOutApplication(): void
  {
      try
      {
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
             
              if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
              {
                  this.onSignOut("/signin");
                  return;
              }

              this.appDashboard.IsAcceptId = false;
              this.appDashboard.AppId = 1;
              this.appDashboard.onLoad(this.AcctId,"");
              /// Swal.fire({  title: 'Success!',  text: "Good Load", icon: 'success',   confirmButtonText: 'Ok'  })
              return;
              
      }
      catch(error:any)
      {
          this.appDashboard.AppId = 1;
          this.appDashboard.onLoad(this.AcctId, "");
          this.onSignOut("/signin");
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

  public onSignOut(event:any)
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }

  public async Getloanappdetails(): Promise<void> 
  {
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
      
        if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
        {
            this.onSignOut("/signin");
            return;
        }
       
        this.loadingService.setLoading(true);

        await this.LapoLoanService.GetHubTeamAppDetail(this.Id).subscribe({
        next:(res:any)=>
        {
            this.loadingService.setLoading(false);
            
            this.ResponseData = res;
            if(this.ResponseData != undefined && this.ResponseData != null && this.ResponseData.isActive)
            {
                  this.permissionInfo = this.ResponseData.dataLoad;
                   // console.log(this.permissionInfo);
                   this.SelectHubGroupId = this.permissionInfo.teamMemberOfficeAddress;
                   this. AccessRightToEditTeamMemberPermissions = this.ResponseData.dataLoad.accessRightToEditTeamMemberPermissions ;
                   this. AccessRightToViewDisbursementLoan = this.ResponseData.dataLoad.accessRightToViewDisbursementLoan ;
                   this. AccessRightToViewUploadBackRepaymentLoan = this.ResponseData.dataLoad.accessRightToViewUploadBackRepaymentLoan;
                   this. AccessRightToExportDISBURSEMENTLoan = this.ResponseData.dataLoad.accessRightToExportDISBURSEMENTLoan;
                   this. AccessRightToAnonymousLoanApplication = this.ResponseData.dataLoad.accessRightToAnonymousLoanApplication;
                   this. AccessRightToUploadBackDISBURSEMENTLoan = this.ResponseData.dataLoad.accessRightToUploadBackDISBURSEMENTLoan;
                   this. AccessRightToUploadBackRepaymentLoan = this.ResponseData.dataLoad.accessRightToUploadBackRepaymentLoan;
                   this. AccessRightToPrintLoan = this.ResponseData.dataLoad.accessRightToPrintLoan;
                   this. AccessRightToProceedLoan = this.ResponseData.dataLoad.accessRightToProceedLoan;
                   this. ViewLoanNarration = this.ResponseData.dataLoad.viewLoanNarration;
                   this. CreateLoanNarration=this.ResponseData.dataLoad.createLoanNarration;
                   this. AccessRighttodisablecustomerstoapplyforaloan =this.ResponseData.dataLoad.accessRighttodisablecustomerstoapplyforaloan;
                   this. AccessRighttoviewcustomers=this.ResponseData.dataLoad.accessRighttoviewcustomers;
                   this. AccessRighttodisablehubs=this.ResponseData.dataLoad.accessRighttodisablehubs;
                   this. AccessRighttoviewtenure =this.ResponseData.dataLoad.accessRighttoviewtenure;
                   this. AccessRighttocreatetenure=this.ResponseData.dataLoad.accessRighttocreatetenure;
                   this. AccessRighttoloansettings=this.ResponseData.dataLoad.accessRighttoloansettings;
                   this. AccessRighttoteamsAndpermissions =this.ResponseData.dataLoad.accessRighttoteamsAndpermissions;
                   this. AccessRighttorejectaloan=this.ResponseData.dataLoad.accessRighttorejectaloan;
                   this. AccessRighttoviewcustomersloans=this.ResponseData.dataLoad.accessRighttoviewcustomersloans;
                   this. AccessRighttoapprovecustomerloan=this.ResponseData.dataLoad.accessRighttoapprovecustomerloan;
                   this. AccessRighttoviewveammembers=this.ResponseData.dataLoad.accessRighttoviewveammembers;
                   this. AccessRighttocreateateammember=this.ResponseData.dataLoad.accessRighttocreateateammember;
                   this. AccessRighttoviewhubs =this.ResponseData.dataLoad.accessRighttoviewhubs;
                   this. AccessRighttocreateahub=this.ResponseData.dataLoad.accessRighttocreateahub;
                   this. AccessRighttoviewloandetails=this.ResponseData.dataLoad.accessRighttoviewloandetails;
                 
                   this.UserType = this.ResponseData.dataLoad.userType;
                   this.SelectHubGroupIdd = this.ResponseData.dataLoad.selectHubGroupIdd;
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
                this.loadingService.setLoading(false);
                Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
                return;
        }
      })
   }

   public onAccessRighttocreateahub(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttocreateahub = event.target.checked;
           this.AccessRighttoviewhubs = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewhubs = event.target.checked;
           this.AccessRighttocreateahub = event.target.checked;
       }
   }

   public onAccessRighttoviewhubs(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewhubs = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewhubs = event.target.checked;
       }
   }

   public onAccessRighttodisablehubs(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewhubs = event.target.checked;
           this.AccessRighttodisablehubs = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewhubs = event.target.checked;
           this.AccessRighttodisablehubs = event.target.checked;
       }
   }

   public onAccessRighttocreateateammember(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewveammembers = event.target.checked;
           this.AccessRighttocreateateammember = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewveammembers = event.target.checked;
           this.AccessRighttocreateateammember = event.target.checked;
       }
   }

   public onAccessRighttoapprovecustomerloan(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRighttoapprovecustomerloan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;

           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToProceedLoan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRighttoapprovecustomerloan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;

           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToProceedLoan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
   }

   public onAccessRighttoviewcustomersloans(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
   }

   public onAccessRighttorejectaloan(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRighttorejectaloan = event.target.checked;
           this. AccessRighttoviewcustomersloans= event.target.checked;

           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToProceedLoan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRighttorejectaloan = event.target.checked;
           this. AccessRighttoviewcustomersloans= event.target.checked;

           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToProceedLoan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
   }

   public onAccessRighttoteamsAndpermissions(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoteamsAndpermissions = event.target.checked;
       }
       else
       {
           this.AccessRighttoteamsAndpermissions = event.target.checked;
       }
   }

   public onAccessRighttoloansettings(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoloansettings = event.target.checked;
       }
       else
       {
           this.AccessRighttoloansettings = event.target.checked;
       }
   }

   public onAccessRighttocreatetenure(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewtenure = event.target.checked;
           this.AccessRighttocreatetenure = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewtenure = event.target.checked;
           this.AccessRighttocreatetenure = event.target.checked;
       }
   }

   public onAccessRighttoviewtenure(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewtenure = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewtenure = event.target.checked;
       }
   }

   public onAccessRighttoviewcustomers(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewcustomers = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewcustomers = event.target.checked;
       }
   }

   public onAccessRighttodisablecustomerstoapplyforaloan(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewcustomers = event.target.checked;
           this.AccessRighttodisablecustomerstoapplyforaloan = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewcustomers = event.target.checked;
           this.AccessRighttodisablecustomerstoapplyforaloan = event.target.checked;
       }
   }

   public onCreateLoanNarration(event: any): void
   {
       if(event.target.checked)
       {
           this.CreateLoanNarration = event.target.checked;
           this.ViewLoanNarration = event.target.checked;
       }
       else
       {
           this.CreateLoanNarration = event.target.checked;
           this.ViewLoanNarration = event.target.checked;
       }
   }

   public onViewLoanNarration(event: any): void
   {
       if(event.target.checked)
       {
           this.ViewLoanNarration = event.target.checked;
       }
       else
       {
           this.ViewLoanNarration = event.target.checked;
       }
   }

   public onAccessRightToProceedLoan(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToProceedLoan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToProceedLoan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
   }

   public onAccessRightToPrintLoan(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToPrintLoan = event.target.checked;

           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToPrintLoan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
   }

   public onAccessRightToAnonymousLoanApplication(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewcustomersloans = event.target.checked;
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToAnonymousLoanApplication = event.target.checked;

           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToProceedLoan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewcustomersloans = event.target.checked;
           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToAnonymousLoanApplication = event.target.checked;

           this.AccessRighttoviewloandetails = event.target.checked;
           this.AccessRightToProceedLoan = event.target.checked;
           this.AccessRighttoviewcustomersloans = event.target.checked;
       }
   }

   public onAccessRightToViewUploadBackRepaymentLoan(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRightToViewUploadBackRepaymentLoan = event.target.checked;
       }
       else
       {
           this.AccessRightToViewUploadBackRepaymentLoan = event.target.checked;
       }
   }

   public onAccessRightToUploadBackRepaymentLoan(event: any): void
   {
       if(event.target.checked)
       {  this.AccessRightToViewUploadBackRepaymentLoan = event.target.checked;
           this.AccessRightToUploadBackRepaymentLoan = event.target.checked;
       }
       else
       {  this.AccessRightToViewUploadBackRepaymentLoan = event.target.checked;
           this.AccessRightToUploadBackRepaymentLoan = event.target.checked;
       }
   }

   public onAccessRightToViewDisbursementLoan(event: any): void
   {
           if(event.target.checked)
           {
               this.AccessRightToViewDisbursementLoan = event.target.checked;
           }
           else
           {
               this.AccessRightToViewDisbursementLoan = event.target.checked;
           }
   }

   public onAccessRightToUploadBackDISBURSEMENTLoan(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRightToViewDisbursementLoan = event.target.checked;
           this.AccessRightToUploadBackDISBURSEMENTLoan = event.target.checked;
       }
       else
       {
           this.AccessRightToViewDisbursementLoan = event.target.checked;
           this.AccessRightToUploadBackDISBURSEMENTLoan = event.target.checked;
       }
   }

   public onAccessRightToExportDISBURSEMENTLoan(event: any): void
   {
       if(event.target.checked)
       {  
           this.AccessRighttoviewcustomersloans = event.target.checked;
           this.AccessRightToExportDISBURSEMENTLoan = event.target.checked;
       }
       else
       {   
           this.AccessRighttoviewcustomersloans = event.target.checked;
           this.AccessRightToExportDISBURSEMENTLoan = event.target.checked;
       }
   }

   public onAccessRighttoviewloandetails(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewloandetails = event.target.checked;
       }
       else
       {
           
           this.AccessRighttoviewloandetails = event.target.checked;
       }
   }

   public onAccessRighttoviewveammembers(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRighttoviewveammembers = event.target.checked;
       }
       else
       {
           this.AccessRighttoviewveammembers = event.target.checked;
       }
   }

   public onAccessRightToEditTeamMemberPermissions(event: any): void
   {
       if(event.target.checked)
       {
           this.AccessRightToEditTeamMemberPermissions = event.target.checked;
       }
       else
       {
           this.AccessRightToEditTeamMemberPermissions = event.target.checked;
       }
   }

   public onAllPermissions(event: any): void
   {
       if(event.target.checked)
       {
           this.AllPermissions = event.target.checked;

            this.AccessRightToEditTeamMemberPermissions= this.AllPermissions ;
            this. AccessRightToViewDisbursementLoan= this.AllPermissions ;
            this. AccessRightToViewUploadBackRepaymentLoan= this.AllPermissions ;
            this. AccessRightToExportDISBURSEMENTLoan= this.AllPermissions ;
            this. AccessRightToAnonymousLoanApplication= this.AllPermissions ;
            this. AccessRightToUploadBackDISBURSEMENTLoan = this.AllPermissions ;
            this. AccessRightToUploadBackRepaymentLoan= this.AllPermissions ;
            this. AccessRightToPrintLoan= this.AllPermissions ;
            this. AccessRightToProceedLoan = this.AllPermissions ;
            this. ViewLoanNarration= this.AllPermissions ;
            this. CreateLoanNarration= this.AllPermissions ;
            this. AccessRighttodisablecustomerstoapplyforaloan = this.AllPermissions ;
            this. AccessRighttoviewcustomers= this.AllPermissions ;
            this. AccessRighttodisablehubs= this.AllPermissions ;
            this. AccessRighttoviewtenure = this.AllPermissions ;
            this. AccessRighttocreatetenure= this.AllPermissions ;
            this. AccessRighttoloansettings= this.AllPermissions ;
            this. AccessRighttoteamsAndpermissions = this.AllPermissions ;
            this. AccessRighttorejectaloan= this.AllPermissions ;
            this. AccessRighttoviewcustomersloans= this.AllPermissions ;
            this. AccessRighttoapprovecustomerloan= this.AllPermissions ;
            this. AccessRighttoviewveammembers= this.AllPermissions ;
            this. AccessRighttocreateateammember= this.AllPermissions ; 
            this. AccessRighttoviewhubs = this.AllPermissions ;
            this. AccessRighttocreateahub= this.AllPermissions ;
            this. AccessRighttoviewloandetails= this.AllPermissions ;
       }
       else
       {
           this.AllPermissions = event.target.checked;

           
           this.AccessRightToEditTeamMemberPermissions= this.AllPermissions ;
           this. AccessRightToViewDisbursementLoan= this.AllPermissions ;
           this. AccessRightToViewUploadBackRepaymentLoan= this.AllPermissions ;
           this. AccessRightToExportDISBURSEMENTLoan= this.AllPermissions ;
           this. AccessRightToAnonymousLoanApplication= this.AllPermissions ;
           this. AccessRightToUploadBackDISBURSEMENTLoan = this.AllPermissions ;
           this. AccessRightToUploadBackRepaymentLoan= this.AllPermissions ;
           this. AccessRightToPrintLoan= this.AllPermissions ;
           this. AccessRightToProceedLoan = this.AllPermissions ;
           this. ViewLoanNarration= this.AllPermissions ;
           this. CreateLoanNarration= this.AllPermissions ;
           this. AccessRighttodisablecustomerstoapplyforaloan = this.AllPermissions ;
           this. AccessRighttoviewcustomers= this.AllPermissions ;
           this. AccessRighttodisablehubs= this.AllPermissions ;
           this. AccessRighttoviewtenure = this.AllPermissions ;
           this. AccessRighttocreatetenure= this.AllPermissions ;
           this. AccessRighttoloansettings= this.AllPermissions ;
           this. AccessRighttoteamsAndpermissions = this.AllPermissions ;
           this. AccessRighttorejectaloan= this.AllPermissions ;
           this. AccessRighttoviewcustomersloans= this.AllPermissions ;
           this. AccessRighttoapprovecustomerloan= this.AllPermissions ;
           this. AccessRighttoviewveammembers= this.AllPermissions ;
           this. AccessRighttocreateateammember= this.AllPermissions ; 
           this. AccessRighttoviewhubs = this.AllPermissions ;
           this. AccessRighttocreateahub= this.AllPermissions ;
           this. AccessRighttoviewloandetails= this.AllPermissions ;
       }
   }

   public onBackWard(event:any):void
   {
       this.GoBackPreviousPage();
   }
}
