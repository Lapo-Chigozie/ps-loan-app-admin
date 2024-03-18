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
  selector: 'app-HubTeamMembers',
  templateUrl: './HubTeamMembers.component.html',
  styleUrls: ['./HubTeamMembers.component.css']
})

export class HubTeamMembersComponent  extends AppBasedComponent implements OnInit 
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

  public urlhost: string ="";

  constructor( @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService,public appDashboard: HubTeamMemberDataTableService, public appApiDtoken: AdminserviceService) 
  {
       super( locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }

  public override ngOnInit(): void 
  {
        this.ngOnLoanInit();

        this.urlhost = Apphttpclienturl.GetHostUrl(0);
        this.urlhost += AppConfig.HubTeam + '/HubTeamMembers';
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
  
  public onOpenActivateCustomer(id:string):void
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
                this.RemoveData(id);
            }
          });
  }

  public RemoveData(id:string):void
  {
      try
      {
        this.loadingService.setLoading(true);
        this.LapoLoanService.ActivateHubTeamMemberPermission(id).subscribe({
        next:(res)=>
        {
              this.appDashboard.onLoad(this.AcctId, this.urlhost);
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
            

            this.appDashboard.onLoad(this.AcctId, this.urlhost);
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
        }
        });

        return;
      }
      catch(exi:any)
      { 
           this.appDashboard.onLoad(this.AcctId, this.urlhost);
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
            this.appDashboard.onLoad(this.AcctId, this.urlhost);
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
            return;
      }
  }

  public onOpenEdit(id: any):void
  {
      try
      {
          this.router.navigate(['/editteammemberpermission'], { queryParams: { id : id }});
          return;
      }
      catch(ex:any)
      { 
            
        Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
        return;
      }
  }
}
