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
import { HubGroupsDataTableService } from '../HubTeam/DataTablePackage/HubGroupsDataTable.service';
import { PagenationFilterModel } from '../PageNextModel/PagenationFilterModel';
import { PageNextSelection } from '../PageNextModel/PageNextSelection';
import { HubTeamMemberDataTableService } from '../HubTeamMemberDataTable.service';
import { Apphttpclienturl } from '../apphttpclienturl';

import { AppConfig } from '../../assets/images/defaultSettings';

@Component({
  selector: 'app-CreateHubTeamMember',
  templateUrl: './CreateHubTeamMember.component.html',
  styleUrls: ['./CreateHubTeamMember.component.css']
})

export class CreateHubTeamMemberComponent extends AppBasedComponent implements OnInit 
{
      private parentNode:any;
      public EnterTeamMemberID :string = "";
      public EnterLastName :string = "";
      public EnterMiddleName :string = "";
      public EnterFirstName:string = "";

      public UserType:string = "";
      
      public SelectHubGroupId:string = "";

      public EnterPhoneNumber :string = "";
      public EnterEmailAddress:string = "";

      public TeamMemberOfficeAddress:string = "40, Okporo Road, Opposite Ecobank, Rumuodara, Port-Harcourt, Rivers State";

      public urlhost:string = "";

      public IsSearchBar:boolean = false;
      private SearchData = new PagenationFilterModel();

      public listDivisionTeamList:any =[];

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

      public IsProgressBarShowing:boolean = false;
      public IsErrorHappen:boolean = false;

      public SystemRole:string = "System Admin Role";
      public SystemRef:string = "System Admin Ref";
      public IsSystemRef: boolean = false;

        constructor(public appDashboard: HubTeamMemberDataTableService, @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService, public appApiDtoken: AdminserviceService) {
            super(locale, location, appRouter, loadingService, router, route, formBuilder, LapoLoanService, fileUploadService);
        }
        
        public  override ngOnInit() :void
        {
            this.ngOnLoanInit();
            this.appDashboard.MaxDataRetriever  = 0;
            this.appDashboard.MaxStatusRetriever = "Active";

            this.urlhost = Apphttpclienturl.GetHostUrl(0); 
            this.urlhost +=  AppConfig.HubTeam + '/HubTeamListByNameMember';

            this.appDashboard.IsAcceptId = false;
            this.appDashboard.onLoad(this.AcctId, this.urlhost);

            this.appDashboard.OnDataTableFinished.subscribe((object:any) => 
            {
                this.OnDataTableFinished(object.sender, object.object);  
            });
        }
    
        public OnDataTableFinished(sender:any, object:any): void
        {
            
        }
    
        public override OnLoadedProfileFinished(sender:any, object:any): void
        {
            // userProfileDetails.emailAddress
            this.appDashboard.AppId = 1;
            if(object != null && (object.dataLoad.username == 'SN0001' || object.dataLoad.username == '0001'))
            {
                 this.IsSystemRef = true;
                 return;
            }

            this.IsSystemRef = false;
            return;
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
                this. AccessRightToViewDisbursementLoan= false; 
                this. AccessRightToViewUploadBackRepaymentLoan  = false;
                this. AccessRightToExportDISBURSEMENTLoan = false;
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
                this. AccessRighttoviewloandetails = false;  return;
            }

            if(event.target.value == "TEAM LEADS")
            {
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

        public async onCreateTeamMember():Promise<void>
        {
            try
            {
                        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);

                        if(this.SelectHubGroupId == undefined)
                        {
                            Swal.fire({ title: 'Warning!', text: "Hub Group is required", icon: 'warning', confirmButtonText: 'Ok' })
                            return;
                        }

                        if(this.EnterFirstName == undefined)
                        {
                            Swal.fire({ title: 'Warning!', text: "First Name is required", icon: 'warning', confirmButtonText: 'Ok' })
                            return;
                        }

                        // if(this.EnterMiddleName == undefined)
                        // {
                        //     Swal.fire({ title: 'Warning!', text: "Middle Name is required", icon: 'warning', confirmButtonText: 'Ok' })
                        //     return;
                        // }

                        if(this.EnterLastName == undefined)
                        {
                            Swal.fire({ title: 'Warning!', text: "Last Name is required", icon: 'warning', confirmButtonText: 'Ok' })
                            return;
                        }

                        if(this.UserType == undefined)
                        {
                            Swal.fire({ title: 'Warning!', text: "User Role is required", icon: 'warning', confirmButtonText: 'Ok' })
                            return;
                        }
                    
                        this.loadingService.setLoading(true);
                        
                        let AppData = {AccessRightToEditTeamMemberPermissions:this.AccessRightToEditTeamMemberPermissions,
                            AccessRightToViewDisbursementLoan:this.AccessRightToViewDisbursementLoan,
                            AccessRightToViewUploadBackRepaymentLoan :this.AccessRightToViewUploadBackRepaymentLoan,
                            AccessRightToExportDISBURSEMENTLoan: this.AccessRightToExportDISBURSEMENTLoan,
                            AccessRightToAnonymousLoanApplication:this.AccessRightToAnonymousLoanApplication,
                            AccessRightToUploadBackDISBURSEMENTLoan :this.AccessRightToUploadBackDISBURSEMENTLoan,
                            AccessRightToUploadBackRepaymentLoan:this.AccessRightToUploadBackRepaymentLoan,
                            AccessRightToPrintLoan: this.AccessRightToPrintLoan, 
                            AccessRightToProceedLoan : this.AccessRightToProceedLoan,
                            ViewLoanNarration: this.ViewLoanNarration,
                            CreateLoanNarration: this.CreateLoanNarration,
                            AccessRighttoviewcustomers:this.AccessRighttoviewcustomers,
                            AccessRighttodisablehubs:this.AccessRighttodisablehubs,
                            AccessRighttoviewtenure :this.AccessRighttoviewtenure,
                            AccessRighttocreatetenure:this.AccessRighttocreatetenure,
                            AccessRighttoloansettings:this.AccessRighttoloansettings,
                            AccessRighttoteamsAndpermissions :this.AccessRighttoteamsAndpermissions,
                            AccessRighttorejectaloan:this.AccessRighttorejectaloan,
                            AccessRighttoviewcustomersloans:this.AccessRighttoviewcustomersloans,
                            AccessRighttoapprovecustomerloan :this.AccessRighttoapprovecustomerloan,
                            AccessRighttoviewveammembers:this.AccessRighttoviewveammembers,
                            AccessRighttocreateateammember:this.AccessRighttocreateateammember,
                            AccessRighttoviewhubs :this.AccessRighttoviewhubs,
                            AccessRighttocreateahub:this.AccessRighttocreateahub,
                            AccessRighttoviewloandetails:this.AccessRighttoviewloandetails,
                            AccessRighttodisablecustomerstoapplyforaloan:this.AccessRighttodisablecustomerstoapplyforaloan, UserType :this.UserType, TeamMemberOfficeAddress : this.TeamMemberOfficeAddress, CreatedByAccountId: this.AcctId, EnterEmailAddress: this.EnterEmailAddress, EnterPhoneNumber: this.EnterPhoneNumber,  SelectHubGroupId : this.SelectHubGroupId, EnterFirstName :this.EnterFirstName, EnterMiddleName : this.EnterMiddleName, EnterTeamMemberID: this.EnterTeamMemberID, EnterLastName: this.EnterLastName , SelectHubGroupIdd :""};
                    
                        await this.LapoLoanService.CreateNewHubTeamMember(AppData).subscribe({
                        next:(res)=>
                        {
                            this.loadingService.setLoading(false);
                            this.ResponseData = res;
                            if(this.ResponseData != null && this.ResponseData.isActive)
                            {
                                this.EnterTeamMemberID = "";
                                this.EnterLastName  = "";
                                this.EnterMiddleName = "";
                                this.EnterFirstName = "";
                                this.EnterPhoneNumber = "";
                                this.EnterEmailAddress= "";
                                // this.  TeamMemberOfficeAddress= "";
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
                            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
                            return;
                        }
                    });
            }
            catch(exx:any)
            {
                    this.loadingService.setLoading(false);
                    Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
                    return;
            }
        }

        public async onTeamMemberChange(event:any, eventTarget:any):Promise<void>
        {
            try
            {
                        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);

                        this.listDivisionTeamList = null;
                        var inputUser = event.target.value;

                        this.EnterLastName = "";
                        this.EnterMiddleName = "";
                         // this.EnterFirstName = "";
                        this.EnterTeamMemberID = "";
                        
                        // this.loadingService.setLoading(true);
                        this.IsErrorHappen = false;
                        this.IsProgressBarShowing = true;
                        
                      
                        await this.LapoLoanService.GetE360UsersByTeamMember(this.AcctId, inputUser, this.SystemRole,
                        this.SystemRef).subscribe({
                        next:(res)=>
                        {
                            this.loadingService.setLoading(false);
                            this.ResponseData = res;
                            this.IsErrorHappen = false;
                            this.IsProgressBarShowing = false;
                            if(this.ResponseData != null && this.ResponseData.isActive)
                            {
                                this.listDivisionTeamList = this.ResponseData.dataLoad;

                                if(this.parentNode != undefined && this.parentNode.style.display == null)
                                {
                                    this.parentNode.style.display = "block";
                                }
                                
                                // Swal.fire({ title: 'Success!', text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok' })
                                return;
                            }
                            else
                            {
                                this.IsErrorHappen = true;
                                this.IsProgressBarShowing = false;
                                    // Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                                    return;
                            }
                        },
                        error:(err):any=>
                        {
                            this.IsErrorHappen = true;
                            this.IsProgressBarShowing = false;
                            this.loadingService.setLoading(false);
                            // Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
                            return;
                        }
                    });
            }
            catch(exx:any)
            {
                this.IsErrorHappen = true;
                     this.IsProgressBarShowing = false;
                    this.loadingService.setLoading(false);
                    //  Swal.fire({ title: 'Error!', text: "An error occurred: " + exx.message, icon: 'error', confirmButtonText: 'Ok' })
                    return;
            }
        }

        public onClickDivisionTeamEventHandler(event:any, item:any):void
        {
            try
            {
                    //  console.log("Child:", e.target);
                    //  console.log("Parent:", e.target.parentNode); 
                    //  console.log("Parents parent sibling:", e.target.parentNode.parentNode.nextSibling);
                 
                    // e.target.parent()[0].style.display="none";

                    this.EnterLastName = item.lastName;
                    this.EnterMiddleName = item.otherName;
                    this.EnterFirstName = item.firstName;
                    this.EnterTeamMemberID = item.itemCode;

                    this.IsProgressBarShowing = false;
                    event.target.parentNode.style.display ="none";
                    // this.parentNode =  event.target.parentNode;

                    //  if (event.key === "Enter") 
                    //  {
                       
                    //  }

                    // FirstName = splitNames[0] == null ? "" : splitNames[0],
                    // LastName = splitNames[1] == null ? "" : splitNames[1],
                    // OtnherName = splitNames[2] == null ? "" : splitNames[2],

                    //  console.log("Console Log ", event.target.parentNode);
            }
            catch(ex:any)
            {

            }
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
            }
            else
            {
                this.AccessRighttoviewloandetails = event.target.checked;
                this.AccessRighttoapprovecustomerloan = event.target.checked;
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
            }
            else
            {
                this.AccessRighttoviewloandetails = event.target.checked;
                this.AccessRighttorejectaloan = event.target.checked;
                this. AccessRighttoviewcustomersloans= event.target.checked;
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
            }
            else
            {
                this.AccessRighttoviewcustomersloans = event.target.checked;
                this.AccessRighttoviewloandetails = event.target.checked;
                this.AccessRightToAnonymousLoanApplication = event.target.checked;
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
    }

