

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
import { LoginUserPermissionModel } from '../PageNextModel/LoginUserPermissionModel';

import { AppConfig } from '../../assets/images/defaultSettings';
@Component({
  selector: 'app-app-TeamMemberPermissions',
  templateUrl: './app-TeamMemberPermissions.component.html',
  styleUrls: ['./app-TeamMemberPermissions.component.css']
})

export class AppTeamMemberPermissionsComponent  extends AppBasedComponent implements OnInit 
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
 
  message:any= ""; 
  override ResponseData!: RespondMessageDto;
  override AcctId:any = "";
  // Inject service 
  ClientNetPays:any;
  // ClientNetPayDto

  override ProfileDetails:any;
   
  public FirstName!:string;
  public Middle:string | undefined;
  public LastName:string | undefined;
  public EmailAddress:string| undefined;
  public PhoneNumber:string| undefined;
  public AltPhoneNumber:string| undefined;
  public CurrentAddress:string| undefined;
  public Age:string| undefined;
  public Gender:string| undefined;

  public override LoginUserPermission!:LoginUserPermissionModel

  public urlhost: string ="";

  constructor( @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService,public appDashboard: HubTeamMemberDataTableService, public appApiDtoken: AdminserviceService) 
  {
       super( locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }

  public override ngOnInit(): void 
  {
        this.ngOnLoanInit();

        this.urlhost = Apphttpclienturl.GetHostUrl(0); 
        this.urlhost += AppConfig.HubTeam +  '/HubTeamMembers';
        this.appDashboard. MaxStatusRetriever  = 'All'
        this.appDashboard. MaxDataRetriever = 5;
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
      this.appDashboard.AppId = 1;
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
              this.appDashboard.onLoad(this.AcctId, this.urlhost);
             /// Swal.fire({  title: 'Success!',  text: "Good Load", icon: 'success',   confirmButtonText: 'Ok'  })
              return;
              
      }
      catch(error:any)
      {
          this.appDashboard.AppId = 1;
          this.appDashboard.onLoad(this.AcctId, this.urlhost);
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
}
