import { Compiler, Component, OnInit } from '@angular/core';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AdminserviceService } from '../adminservice.service';
import { StaticData } from '../StaticData';
import { LocalStorageService } from '../local-storage.service';
import Swal from 'sweetalert2';
import { AccountDetailsDto } from '../appApiDto/AccountInfoDto';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { LoanAppAccountModel } from '../appApiDto/LoanAppAccountModel';
import { BvnRespondsDto } from '../appApiDto/BvnRespondsDto';
import { BvnAuthDto } from '../appApiDto/BvnAuthDto';

@Component({
  selector: 'app-admin-top',
  templateUrl: './admin-top.component.html',
  styleUrls: ['./admin-top.component.css']
})
export class AdminTopComponent implements OnInit {
 
  public title = 'LapoLoan Clients';
  public href: string = "";
  public ShowRouteLet: boolean = false;
  public ShowAdminRouteLet: boolean = false;
  private AppId:any;
 //private _compiler: Compiler,
  constructor(private _compiler: Compiler, private loadingService: SpinnerService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService) { }

  Username:string = "";
  ConfirmPassword:string = "";
  Password:string = "";
 
  message:string = "";
  BvnSend:any= false;
  BvnCodeTyped:any= false;
  BvnCode:string="";
  
  AcctId:string ="";
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

  ResponseData!: RespondMessageDto;
  accountLogin!: LoanAppAccountModel;
  BvnResponds !:BvnRespondsDto;
  acctDetails !:AccountDetailsDto ;
  bvnAuth!: BvnAuthDto ;
  SessionResult!:string ;

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    this.showUp();
  }

  ngAfterViewInit(): void 
  {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  
  public ngOnInit() 
  {
       this.SignOutApplication();
  }

  private showUp(): void 
  {
   // this.contentPage2?.nativeElement.scrollTo( -0, -0 );
     // this.contentPage?.nativeElement.scrollIntoView();
     window.scroll(0,0);
  }

  public onSignOut(event:any) : void
  {
       if(this._compiler!=null)
       {
        this._compiler.clearCache();
      }

      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }
  
  private onNaviagateBack(page:string)
  {
      this.router.navigate([page]);
  }

  public SignOut(): void 
  {
          LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
          LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
          this.SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
          let AdminTwoLoginKey = LocalStorageService.getLoginSessionIdentity(StaticData.AdminTwoLoginKeySession);
          // console.log("Session Result " + this.SessionResult);

          try
          {
                    if(this.SessionResult  == "" || this.SessionResult  == undefined || this.SessionResult  == null || this.SessionResult  == StaticData.LoginKeySession)
                    {
                        this.onSignOut('/signin');
                        return;
                    }

                    return;
          }
          catch(e:any)
          {
              //console.log('Display: ' + e);
              this.onSignOut('/signin');
              return;
          }
  }

  public SignOutApplication():void
    {
        try
        {
          
          this.SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
         // console.log("Session Result " + this.SessionResult );
    
          if(this.SessionResult  == "" || this.SessionResult  == undefined || this.SessionResult  == null || this.SessionResult  == StaticData.LoginKeySession)
          {
              this.showUp();
              this.onSignOut("/signin");
              return;
          }
                
                this.FetchUserDetails(this.SessionResult);
                return;
        }
        catch(error:any)
        {
            this.onSignOut("/signin");
            return;
        }
    }

    private async FetchUserDetails(AccountId:string):Promise<void>
    {
          this.SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
          // console.log("Session Result " + this.SessionResult );

          if(this.SessionResult  == "" || this.SessionResult  == undefined || this.SessionResult  == null || this.SessionResult  == StaticData.LoginKeySession)
          {
              this.showUp();
              this.onSignOut("/signin");
              return;
          }

          AccountId = this.SessionResult;
          this.Username = '';
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
                if(this.ResponseData.dataLoad == undefined || this.ResponseData.dataLoad == null){
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

                this.acctDetails.Role = this.ResponseData.dataLoad.roleType;
                return;
              }
              else
              {
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
}
