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

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent extends AppBasedComponent implements OnInit 
{
  Username:string = "";
  ConfirmPassword:string = "";
  Password:string = "";
 
  message:string = "";
  BvnSend:any= false;
  BvnCodeTyped:any= false;
  BvnCode:string="";
  
  override AcctId:string ="";
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
  accountLogin!: LoanAppAccountModel;
  BvnResponds !:BvnRespondsDto;
  acctDetails !:AccountDetailsDto;
  bvnAuth!: BvnAuthDto ;
  SessionResult!:string ;

  HyperActive1:string="none";
  HyperActive2:string="none";
  HyperActive3:string="none";
  HyperActive4:string="none";
  HyperActive5:string="none";
  HyperActive6:string="none";
  HyperActive7:string="none";

  public override LoginUserPermission!: LoginUserPermissionModel; 

  constructor(public appDashboard: HubTeamMemberDataTableService, @Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService) {
    super(locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
  }
 
  // constructor(private loadingService: SpinnerService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private LapoLoanService: AdminserviceService) 
  // {

  // }

  public override ngOnInit() :void
  {
      
        // this.persons =  this.personService.getPersons().find(x => x.id == this.personId);
        // this.persons =  this.personService.getPersons().filter(x => x.id == this.personId)[0];
        // var skinName = skins.find(x=>x.Id == "1").Name;
        // const result = inventory.find( ({ name }) => name === 'cherries' );
       // this.HyperActive1 = "active";

     
        // this.router.events.forEach((event) => 
        // {
        //     // let event1 = event as NavigationStart
        //     this. router.events.subscribe((val) => {
        //       if (val instanceof ActivationEnd || val instanceof ActivatedRoute) {
                
        //         this.HyperActive1 = "active";
        //         // console.log('componentName', val.snapshot.component['name'].toString);
        //       }
        //       });
          
        //         if (  event instanceof NavigationStart || event instanceof NavigationEnd) 
        //         {
        //               // console.log(event.url); 
        //               if(event.url.includes('/dashboard') || event.url.indexOf('/dashboard'))
        //               {
        //                   this.HyperActive1 = "active";
        //               }    
        //         }
        //   });

        // this.HyperActive1="none";  
        // this.HyperActive2="none";
        // this.HyperActive3="none";
        // this.HyperActive4="none";
        // this.HyperActive5="none";
        // this.HyperActive6="none";
        // this.HyperActive7="none";

          // if(this.router.url.toString().includes('dashboard') || this.router.url.toString().indexOf('/dashboard'))
          // {
          //     console.log(this.router.url);
          //     this.HyperActive1 = "active";  
          //     // this.HyperActive2="none";
          //     // this.HyperActive3="none";
          //     // this.HyperActive4="none";
          //     // this.HyperActive5="none";
          //     // this.HyperActive6="none";
          //     // this.HyperActive7="none";
          //     return;
          // }
          // else if(this.router.url.toString().includes('appeditprofile') || this.router.url.toString().indexOf('/appeditprofile'))
          // {
          //    console.log(this.router.url);
          //   this.HyperActive7 = "active";  
          //   // this.HyperActive2="none";
          //   // this.HyperActive3="none";
          //   // this.HyperActive4="none";
          //   // this.HyperActive5="none";
          //   // this.HyperActive6="none";
          //   // this.HyperActive1="none";
          //      return;
          // }
          // else  if(this.router.url.includes('/appclients') || this.router.url.indexOf('/appclients'))
          // {
          //      this.HyperActive2="active";
          //     //  this.HyperActive1 = "none";  
          //     //  this.HyperActive3="none";
          //     //  this.HyperActive4="none";
          //     //  this.HyperActive5="none";
          //     //  this.HyperActive6="none";
          //     //  this.HyperActive7="none";
          //         return;
          // }
          // else  if(this.router.url.includes('/appprofile') || this.router.url.indexOf('/appprofile'))
          // {
          //   this.HyperActive6="active";
          //     //  this.HyperActive1 = "none";  
          //     //  this.HyperActive2="none";
          //     //  this.HyperActive3="none";
          //     //  this.HyperActive4="none";
          //     //  this.HyperActive5="none";
              
          //     //  this.HyperActive7="none";
          //         return;
          // }
          // else if(this.router.url.includes('/appclientmonthlynetpays') || this.router.url.indexOf('/appclientmonthlynetpays'))
          // {
          //   this.HyperActive4="active";
          //     //  this.HyperActive1 = "none";  
          //     //  this.HyperActive2="none";
          //     //  this.HyperActive3="none";
              
          //     //  this.HyperActive5="none";
          //     //  this.HyperActive6="none";
          //     //  this.HyperActive7="none";
          //         return;
          // }
          // else if(this.router.url.includes('/uploadnetpay') || this.router.url.indexOf('/uploadnetpay'))
          // {
          //   this.HyperActive4="active";
          //   // this.HyperActive1 = "none";  
          //   // this.HyperActive2="none";
          //   // this.HyperActive3="none";
       
          //   // this.HyperActive5="none";
          //   // this.HyperActive6="none";
          //   // this.HyperActive7="none";
          //      return;
          // }
          // else if(this.router.url.includes('/appclientrequest') || this.router.url.indexOf('/appclientrequest'))
          // {
          //     this.HyperActive3="active";
          //     //  this.HyperActive1 = "none";  
          //     //  this.HyperActive2 = "none";
               
          //     //  this.HyperActive4="none";
          //     //  this.HyperActive5="none";
          //     //  this.HyperActive6="none";
          //     //  this.HyperActive7="none";
          //         return;
          // }
         

        this.ngOnLoanInit();
        this.SignOutApplication();
        StaticData.properties = true;
       
       //  console.log("console 12345"+this.router.url); 

        // just the fragment of the current route. i.e. CurrentRoute
        //  this.router.url.value[0].path
      
        // same as above with urlSegment[]
        //  this.router.url.subscribe((url: urlSegment[])=> console.log(url[0].path))
      
        // same as above
        // this.router.snapshot.url[0].path
      
        // the url fragment from the parent route i.e. Root
        // since the parent is an ActivatedRoute object, you can get the same using 
        // this.route.parent?.url.forEach[0].path

        return;
  }

  private reloadPage() :void
  {
    setTimeout(() => { window.location.reload(); }, 100);
    return;
  }

  public SignOutApplication():void
  {
       try
       {
             
        this. SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
              // console.log("Session Result " + this.SessionResult );

              if(this.SessionResult  == "" || this.SessionResult  == undefined || this.SessionResult  == null || this.SessionResult  == StaticData.LoginKeySession)
              {
                  this.onChanagePasword(null);
                  return;
              }

              this.FetchUserDetails(this.SessionResult);
              return;
       }
       catch(error:any)
       {
        return;
       }
  }

  public onChanagePasword(event:any):void
  {
      this.onNaviagateBack('/appdashboardpassword');
      return;
  }

  private async FetchUserDetails(AccountId:string):Promise<void>
  {
        this.Username = '';

        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
   
        if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
        {
            this.onNaviagateBack("/signin");
            return;
        }

        AccountId = this.AcctId;

        this.loadingService.setLoading(true);
        await this.LapoLoanService.FetchAccountDetailsConnector(AccountId).subscribe({
          next:(res)=>
          {
            this.loadingService.setLoading(false);
            // console.log(res);
            this.ResponseData = res;
            // console.log( this.ResponseData);

            if(this.ResponseData != null && this.ResponseData.isActive)
            {

              if(this.ResponseData.dataLoad==undefined || this.ResponseData.dataLoad == null){
                return;
              }

              StaticData.properties = true;
              this.acctDetails = new AccountDetailsDto();
              this.acctDetails.AccountId = this.ResponseData.dataLoad.accountId;
              this.acctDetails.AccountType = this.ResponseData.dataLoad.accountType;
              this.acctDetails.Address = this.ResponseData.dataLoad.address;
              
              this.acctDetails.Age = this.ResponseData.dataLoad.age;
              this.acctDetails.AltPhone = this.ResponseData.dataLoad.altPhone;
              this.acctDetails.CurrentAddress = this.ResponseData.dataLoad.currentAddress;
  
              this.acctDetails.Email = this.ResponseData.dataLoad.email;
              this.acctDetails.FirstName = this.ResponseData.dataLoad.firstName;
              this.acctDetails.Gender = this.ResponseData.dataLoad.gender;
  
              this.acctDetails.LastName = this.ResponseData.dataLoad.lastName;
              this.acctDetails.MiddleName = this.ResponseData.dataLoad.middleName;
              this.acctDetails.Phone = this.ResponseData.dataLoad.phone;
              return;
            }
            else{
              this.loadingService.setLoading(false);
              Swal.fire({ title: 'Error!', text:  this.ResponseData.tryCatchMessage,  icon: 'error', confirmButtonText: 'Ok' });
              return;
            }
          },
          error:(err:any)=>
          {
            // this.alertify.error('Error saving Connection...')
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
            return;
          }
        })
  }

  public currentChoice: string = "home";
  public GetActive(choice: string) : string
  {
      if(this.currentChoice == choice)
          return "active";
      else
          return "not";
  }

  public SetActive(choice: string): void
  {
        this.currentChoice = choice;
  }
}