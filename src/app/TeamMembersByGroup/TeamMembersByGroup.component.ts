
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
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
import { HubTeamMemberDataTableService } from '../HubTeamMemberDataTable.service';
import { Apphttpclienturl } from '../apphttpclienturl';
import { LoginUserPermissionModel } from '../PageNextModel/LoginUserPermissionModel';
import { AppConfig } from '../../assets/images/defaultSettings';


@Component({
  selector: 'app-TeamMembersByGroup',
  templateUrl: './TeamMembersByGroup.component.html',
  styleUrls: ['./TeamMembersByGroup.component.css']
})

export class TeamMembersByGroupComponent  extends AppBasedComponent implements OnInit 
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
 
  message:any= ""; 
  override ResponseData!: RespondMessageDto;
  override AcctId:any = "";
  override ProfileDetails:any;
  override  LoginUserPermission!:LoginUserPermissionModel;
  // Inject service 
  ClientNetPays:any;

  public FirstName!:string;
  public Middle:string | undefined;
  public LastName:string | undefined;
  public EmailAddress:string| undefined;
  public PhoneNumber:string| undefined;
  public AltPhoneNumber:string| undefined;
  public CurrentAddress:string| undefined;
  public Age:string| undefined;
  public Gender:string| undefined;

  public urlhost: string ="";
  public AppsId: string ="";
  
  constructor( @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService,public appDashboard: HubTeamMemberDataTableService, public appApiDtoken: AdminserviceService) 
  {
       super( locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }

  // this.router.navigate(['/teamMembersByGroup'], { queryParams: { AppId : id}});
  // return;

  public  override ngOnInit(): void 
  {
       
        this.route.queryParams
        .subscribe(params => {
      
          this.AppsId = params['AppsId'];

          if(this.AppsId == null || this.AppsId == undefined ||  this.AppsId == '')
          {
               this.onNaviagateBack("/hubTeams");
          }

          });

          this.ngOnLoanInit();

          this.urlhost = Apphttpclienturl.GetHostUrl(0); 
          this.urlhost += AppConfig.HubTeam + '/HubTeamMembersByGroupId';
        
          
          this.appDashboard.AppId = this.AppsId;

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
      this.SignOutApplication();
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

              this.appDashboard.IsAcceptId = true;
              this.appDashboard.AppId = this.AppsId
              this.appDashboard.onLoad(this.AppsId, this.urlhost);

              /// Swal.fire({  title: 'Success!',  text: "Good Load", icon: 'success',   confirmButtonText: 'Ok'  })
              return; 
      }
      catch(error:any)
      {
          this.appDashboard.AppId = this.AppsId
          this.appDashboard.onLoad(this.AppsId, this.urlhost);
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
  
  public onSetAsTeamLead(id:string):void
  {
          Swal.fire({
            title: 'Warning?',
            text: 'Are you sure that you want to proceed this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f97c00',
            cancelButtonColor: '#5b5b5b7f',
            confirmButtonText: 'Yes!',
            cancelButtonText: "No!"
          }).then((result) => {
            if (result.isConfirmed) {
                this.SetAsTeamLeadData(id);
            }
          });
  }

  public onSetAsReconciliationOfficer(id:string):void
  {
          Swal.fire({
            title: 'Warning?',
            text: 'Are you sure that you want to proceed this task!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f97c00',
            cancelButtonColor: '#5b5b5b7f',
            confirmButtonText: 'Yes!',
            cancelButtonText: "No!"
          }).then((result) => {
            if (result.isConfirmed) {
                this.SetAsReconciliationOfficerData(id);
            }
          });
  }
 
  public SetAsTeamLeadData(id:string):void
  {
      try
      {
        this.loadingService.setLoading(true);
        this.LapoLoanService.ActivateTeamLeadPermission(id, this.AcctId).subscribe({
        next:(res)=>
        {
              this.appDashboard.AppId = this.AppsId
              this.appDashboard.onLoad(this.AppsId, this.urlhost);
              this.ResponseData = res;
              
              if(this.ResponseData != null && this.ResponseData.isActive)
              {
                    Swal.fire({  title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success',   confirmButtonText: 'Ok'  })
                    return;
              }
              else
              {
                    Swal.fire({  title: 'Warning!',  text: this.ResponseData.tryCatchMessage, icon: 'warning',   confirmButtonText: 'Ok'  })
                    return;
              }
        },
        error:(err:any)=>
        { 
            this.appDashboard.AppId = this.AppsId
            this.appDashboard.onLoad(this.AppsId, this.urlhost);
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
        });

        return;
      }
      catch(exi:any)
      { 
              this.appDashboard.AppId = this.AppsId
              this.appDashboard.onLoad(this.AppsId, this.urlhost);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
      }
  }

  public SetAsReconciliationOfficerData(id:string):void
  {
      try
      {
        this.loadingService.setLoading(true);
        this.LapoLoanService.ActivateReconciliationOfficerMemberPermission(id, this.AcctId).subscribe({
        next:(res)=>
        {
              this.appDashboard.AppId = this.AppsId
              this.appDashboard.onLoad(this.AppsId, this.urlhost);
              this.ResponseData = res;

              if(this.ResponseData != null && this.ResponseData.isActive)
              {
                    Swal.fire({  title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success',   confirmButtonText: 'Ok'  })
                    return;
              }
              else
              {
                    Swal.fire({  title: 'Warning!',  text: this.ResponseData.tryCatchMessage, icon: 'warning',   confirmButtonText: 'Ok'  })
                    return;
              }
        },
        error:(err:any)=>
        { 
            this.appDashboard.AppId = this.AppsId
            this.appDashboard.onLoad(this.AppsId, this.urlhost);
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
        });

        return;
      }
      catch(exi:any)
      { 
              this.appDashboard.AppId = this.AppsId
              this.appDashboard.onLoad(this.AppsId, this.urlhost);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
      }
  }

  public onNewGroup():void
  {
      try
      {
        this.router.navigate(['/CreateHubTeamMember']);
        return;
      }
      catch(exi:any)
      { 
        this.appDashboard.AppId = this.AppsId;
        this.appDashboard.onLoad(this.AppsId, this.urlhost);
        Swal.fire({ title: 'Error!', text: "An error occurred: " + exi.message, icon: 'error', confirmButtonText: 'Ok' })
        return;
      }
  }

  private prevUrl!:any;
  private prevUrl2!:any;
  public onBackWard(event:any):void
  {
    this.GoBackPreviousPage();
    // this.router.navigateByUrl("/appmonthlynetpays");
     // this.prevUrl = this.router.getCurrentNavigation()?.previousNavigation?.initialUrl.toString();
    // this.prevUrl2 = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
    // this.router.navigateByUrl(this.prevUrl2);
    // this.GoBackPreviousPage1();
  }
}
