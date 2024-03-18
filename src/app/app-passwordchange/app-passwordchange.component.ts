import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';
import { EmailAcctDto } from '../appApiDto/EmailAcctDto';
import { StaticData } from '../StaticData';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-app-passwordchange',
  templateUrl: './app-passwordchange.component.html',
  styleUrls: ['./app-passwordchange.component.css']
})

export class AppPasswordchangeComponent implements OnInit {

  Username:string ="";
  ResponseData!: RespondMessageDto;
  IsAcctActive:boolean = false;
  constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private LapoLoanService: AdminserviceService) { }

  public ngAfterContentInit(): void 
  {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }

  public  ngAfterViewInit(): void 
  {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  
  public ngOnInit(): void 
  {
      this.SignOut();
  }

  public onSignOut(event:any): void 
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      // this.onNaviagateBack('/forgetpwrd');
      return;
  }

  public SignOut(): void 
  {
            let SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
            let AdminTwoLoginKey = LocalStorageService.getLoginSessionIdentity(StaticData.AdminTwoLoginKeySession);
          
            try
            {
                      if(SessionResult  != "" || SessionResult  != undefined || SessionResult  != null || SessionResult  != StaticData.LoginKeySession)
                      {
                          LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
                          LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
                          this.IsAcctActive = false;
                          this.router.navigate(['/signin']);
                          return;
                      }
                      else
                      {
                        this.IsAcctActive = false;
                      }

                      return;
            }
            catch(e:any)
            {
              LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
              LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
              this.IsAcctActive = false;
              this.router.navigate(['/signin']);
              return;
            }
  }

  public onNaviagateBack(page:string) : void
  {
      this.router.navigate([page]);
  }

  public onContinueLoading(event:any): void 
  {
      try
      {
          this.loadingService.setLoading(true);
          if(this.Username == "" || this.Username == undefined)
          {
              // this.alertify.error('Error saving Connection...')
              this.loadingService.setLoading(false);
              Swal.fire({title: 'Warning!', text: "Username or Email is required", icon: 'warning', confirmButtonText: 'Ok' })
              return;
          }
          else{

                let emailAcct =  new EmailAcctDto();
                emailAcct.EmailAddress = this.Username;
                this.LapoLoanService.CheckIfEmailExitConnector(emailAcct).subscribe({
                  next:(res)=>
                  {
                        // console.log(res);
                        // this.sweetalert.timedNofication('Connection Saved Successfully...')
                        this.loadingService.setLoading(false);
                        this.ResponseData = res;
                        // console.log(this.ResponseData);
                        if(this.ResponseData != null && this.ResponseData.isActive){

                          StaticData.properties = StaticData.properties;
                          let messageTitle = "Your account was successful";
                          let statusMessge = this.ResponseData.tryCatchMessage;
                          let imageName = "messageSuccessImage.png";
                          this.router.navigate(['/apppasswordreststatus'], { queryParams: { messageTitle : messageTitle, statusMessge : statusMessge, imageName : imageName, SiginLink: ""  }});
                          // this.route.navigate(['/forgetpwrd2'],  { queryParams: { Username : emailAcct.EmailAddress}});
                          return;
                        }
                        else{
                        
                            StaticData.properties = StaticData.properties;
                            let messageTitle = "An error has occur";
                            let statusMessge = this.ResponseData.tryCatchMessage;
                            let imageName = "messageErrorImage.png";
                            this.router.navigate(['/apppasswordreststatus'], { queryParams: { messageTitle : messageTitle, statusMessge : statusMessge, imageName : imageName, SiginLink: "" }});
                            return;
                        }
                      
                        return;
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
      catch(ex:any)
      {
        this.loadingService.setLoading(false);
      }
      
  }
}
