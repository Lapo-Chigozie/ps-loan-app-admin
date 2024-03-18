import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { PwrdChangeDto } from '../appApiDto/PwrdChangeDto';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';
import { StaticData } from '../StaticData';

@Component({
  selector: 'app-app-passwordchange1',
  templateUrl: './app-passwordchange1.component.html',
  styleUrls: ['./app-passwordchange1.component.css']
})
export class AppPasswordchange1Component implements OnInit
{
  Username:string = "";
  ConfirmPassword:string = "";
  Password:string = "";
  ResponseData!: RespondMessageDto;
  message:string = "";

  constructor(private loadingService: SpinnerService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private LapoLoanService: AdminserviceService) { }

  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
  }
  
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }

  ngOnInit(): void 
  {
      try
      {
        // this.onSignOut("");
        
        this.route.queryParams
        .subscribe(params => {
        //  console.log(params); 
          this.Username = params['Username'];
  
          if(this.Username == undefined ||  this.Username == '' || this.Username == null){
            this.onNaviagateBack('/signin');
          }
        }
      );

       }
       catch(e:any){
        //console.log('Display: ' + e);
          this.onNaviagateBack('/signin');
       }
  }

  public onSignOut(event:any):void
  {
    LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
    return;
  }

  public onNaviagateBack(page:string):void{
    this.router.navigate([page]);
  }

  public onContinue(event:any):void
  {
        this.loadingService.setLoading(true);
        if(this.Username == undefined  || this.Username == undefined || this.Username == null  || this.Username == ""){
          // this.alertify.error('Error saving Connection...')
          this.loadingService.setLoading(false);
          this.onNaviagateBack('/signin');
          return;
        }
       else if(this.Password == undefined || this.ConfirmPassword == undefined || this.Password == "" || this.ConfirmPassword == ""){

          // this.alertify.error('Error saving Connection...')
          this.message = "Your Password or Confirm Password is required";
          this.loadingService.setLoading(false);
          Swal.fire({
            title: 'Warning!',
            text:  this.message,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
          return;
        }
        else if(this.Password != this.ConfirmPassword){
          this.loadingService.setLoading(false);
          // this.alertify.error('Error saving Connection...')
          this.message = "Confirm Password don't match Password";
          Swal.fire({
            title: 'Warning!',
            text:  this.message,
            icon: 'warning',
            confirmButtonText: 'Ok'
          })
          return;
        }
        else{

          this.loadingService.setLoading(false);
          StaticData.properties = StaticData.properties;
          let emailAcct =  new PwrdChangeDto();
          emailAcct.Username = this.Username;
          emailAcct.Password = this.Password;
          emailAcct.ConfirmPassword = this.ConfirmPassword;
          this.LapoLoanService.ChangePasswordConnector(emailAcct).subscribe({
            next:(res)=>{

           this.loadingService.setLoading(false);
             // console.log(res);
            // this.sweetalert.timedNofication('Connection Saved Successfully...')
            StaticData.properties = StaticData.properties;
            this.ResponseData = res;
            console.log(this.ResponseData);
            //this.onNaviagateBack('/signin');
            if(this.ResponseData!=null && this.ResponseData.isActive)
            {
                this.Username="";
                this.Password = "";
                let message = this.ResponseData.tryCatchMessage;
                StaticData.properties = StaticData.properties;
                let messageTitle = "Success!";
                let statusMessge = message;
                let imageName = "messageSuccessImage.png";
                this.router.navigate(['/apppasswordreststatus'], { queryParams: { messageTitle : messageTitle, statusMessge : statusMessge, imageName : imageName, SiginLink:  StaticData.SiginLink  }});
                // this.route.navigate(['/forgetpwrd2'],  { queryParams: { Username : emailAcct.EmailAddress}});
                return;
            }
            else{
             
              let message = this.ResponseData.tryCatchMessage;
              StaticData.properties = StaticData.properties;
              let messageTitle = "An error has occur!";
              let statusMessge = message;
              let imageName = "messageErrorImage.png";
              this.router.navigate(['/apppasswordreststatus'], { queryParams: { messageTitle : messageTitle, statusMessge : statusMessge, imageName : imageName, SiginLink: "" }});
              return;
            }

            },
            error:(err) => {
    
                this.loadingService.setLoading(false);
                StaticData.properties = StaticData.properties;
                this.message = "An error has occur " + err.message ;
                Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
                return;
            }
          })
        }
  }
}
