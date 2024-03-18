import { Compiler, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignInPostDto } from '../appApiDto/SignInPostDto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { SpinnerService } from '../spinner.service';
import { StaticData } from '../StaticData';
import Swal from 'sweetalert2';
import { LocalStorageService } from '../local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileUploadServiceService } from '../file-upload-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit 
{
  @Output() compidToSend = new EventEmitter<any>()
  @Output() erpidToSend = new EventEmitter<any>()
 //  @ViewChild('UsernameInput') usernameInput!: ElementRef;
 //  @ViewChild('passwordInput') passwordInput!: ElementRef;
 //  @ViewChild('myCheckbox') myCheckbox: any;

  checkBoxValue: any = false;
  @Input() itm: SignInPostDto | undefined;
  @Input() itms: SignInPostDto[] = []; 
  list: any[] = [];

  public  Password: string = '';
  public  Username: string = '';
  public  Rememberme: boolean = false;
  testForm!: FormGroup;
  AcctLogDetails!: SignInPostDto;
  ResponseData!: RespondMessageDto;
  public login = new Login();
  public signin = new SignInPostDto();
  public typeSelected: string;
  public href: string = "";
 //  private spinnerService: NgxSpinnerService,
 //private _compiler: Compiler,
  constructor(private _compiler: Compiler,private fileUploadService: FileUploadServiceService, private loadingService: SpinnerService,private router: ActivatedRoute,  private route:Router, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService) {
     this.typeSelected = "ball-fussion";
  }

  public onSignOut(event:any)
  {
    LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
    this.onNaviagateBack('/signin');
  }
  
  private onNaviagateBack(page:string){
    this.route.navigate([page]);
  }
  
  public CheckSession():boolean 
  {
          //LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
          let SessionResult = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
          // console.log("Session Result " + SessionResult);
  
          try
          {
                    if(SessionResult != ""  && SessionResult  != undefined && SessionResult  != null && SessionResult  != StaticData.LoginKeySession)
                    {
                        StaticData.properties = StaticData.properties;
                        LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession)
                        // this.route.navigate(['/dashboard'], { queryParams: { AccountId : SessionResult }});
                        this.onSignOut(null);
                        return true;
                    }

                    return false;
          }
          catch(e)
          {
              //console.log('Display: ' + e);
              this.onSignOut(null);
              return false;
          }
  }

  public  async LoadProgressBarType()
  {
       //LoadSpinnerRound
       await this.LapoLoanService.GetLoadSpinnerLoadingConnector(StaticData.SpriningListStype.length - 1).subscribe({
         next:(res)=>{
          
               this.ResponseData = res;
               if( this.ResponseData != null && this.ResponseData.isActive){
                 this.typeSelected = this.ResponseData.dataLoad;
               }
               else{

                 Swal.fire({
                   title: 'Error!',
                   text: this.ResponseData.tryCatchMessage,
                   icon: 'error',
                   confirmButtonText: 'Ok'
                 });

               }
         },
         error:(err)=>{
   
           Swal.fire({
             title: 'Error!',
             text: "Error creating connection " + err.message,
             icon: 'error',
             confirmButtonText: 'Ok'
           });
   
         }
       })
  }

   public  ngOnInit(): void 
   {
        // this.href = this.route.url;
        // console.log(this.route.url);

        if(this._compiler != null)
        {
            this._compiler.clearCache();
         }

        let Sesslog =  this.CheckSession();
        if(Sesslog)
        {
          return;
        }
      
        StaticData.IsRoutingPage = true;
        
        let appresult =   this.router.snapshot.paramMap.get('IsLoanApp');

        if(appresult == "false")
        {
            StaticData.properties =false;
        }

        //  this.ngOnInitCreateAccount();
         // this.LoadProgressBarType();
   }

public async ngOnInitCreateAccount(): Promise<void> 
 {
      this.Username = '';
        
      await this.LapoLoanService.AutoCreateAccountConnector("sihsaihosaklsasskjsnsasasasas").subscribe({
        next:(res)=>
        {

        // console.log(res)
          // this.sweetalert.timedNofication('Connection Saved Successfully...')
        // this.SignInResponseData = res
        // this.route.navigate(['/login']);
        
        //  this.compidToSend.emit(this.quickBooksAuthRequestId);
        //  this.erpidToSend.emit(this.erpcompanyId);
        
        //  console.log('Showed Response')
        //  console.log(this.compidToSend)
        //  console.log(this.erpidToSend)
          
        // saves the incoming details from quick books and api to storage
        //  localStorage.setItem('compId', this.compid);
        //  localStorage.setItem('erpId', this.erpid)
        // this.cookieService.set( 'compId', this.quickBooksAuthRequestId );
        // this.cookieService.set( 'erpId', this.erpcompanyId );

        },
        error:(err)=>{

          // this.alertify.error('Error saving Connection...')
          Swal.fire({title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error',  confirmButtonText: 'Ok' })

        }
      })
 }

 public pushAllData()
 {
   this.list = [
     {
       id: 1,
       country: 'India',
       checked: true,
     },
     {
       id: 2,
       country: 'France',
       checked: false,
     },
     {
       id: 3,
       country: 'USA',
       checked: true,
     },
     {
       id: 4,
       country: 'Germany',
       checked: false,
     },
   ]
 }

 get result() {
   return this.list.filter(item => item.checked);
 }

public async Submit(event: any)
{
     // return event.target.player.value;
    // console.log('This signin api was called');
     const name=this.login.userName;
     const password=this.login.password;
    
     this.loadingService.setLoading(true);

     if(this.Username == undefined || this.Username == '' || this.Username == null) 
     {
        this.loadingService.setLoading(false);
        Swal.fire({
        title: '',
          text: 'Staff ID is required',
        icon: 'warning',
          confirmButtonText: 'Ok'
        })

       return;
     }

     if(this.Password == undefined  || this.Password == '' || this.Password == null) 
     {
          this.loadingService.setLoading(false);
          Swal.fire({
            title: '',
            text: 'Password is required',
            icon: 'warning',
            confirmButtonText: 'Ok'
          })

        return;
     }

     if(this.Rememberme)
     {
      
     }

     StaticData.properties = StaticData.properties;

     this.signin = new SignInPostDto();
     this.signin.EmailAddress = this.Username;
     this.signin.Password = this.Password;
     this.signin.RememberMe = this.Rememberme;

      this.LapoLoanService.SignInConnector(this.signin).subscribe({
       next:(res)=>
       {
            this.loadingService.setLoading(false);
            this.ResponseData = res;
            console.log('Response Data Helper',  this.ResponseData);

            if(this.ResponseData != undefined && this.ResponseData != null && this.ResponseData.isActive)
            {
                    let today = new Date();
                    let DateSet = today.getMonth() + "/" + today.getDay() + "/" + today.getFullYear();
                    // let TimeSet = "12/31/" + today.getFullYear() + " 11:59:00 PM";
                    LocalStorageService.setLoginSessionIdentity(StaticData.DateLoginKeySession, DateSet);

                    if(this.ResponseData.dataLoad.isTwoFactorAuth != undefined  && this.ResponseData.dataLoad.isTwoFactorAuth != null  && this.ResponseData.dataLoad.isTwoFactorAuth)
                    {
                          // LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession,res.dataLoad.accountId);
                          LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, res.dataLoad.accountId);
                          
                          
                          // let PastYear:number = today.getFullYear();
                          // let PastTime:number = today.getTime();
                          // let EnterYear:number = PastYear;

                         
                          
                          //DateLoginKeySession
                          //TimeLoginKeySession
                          
                          // console.log( res.dataLoad.id);
                          // console.log( res.dataLoad.accountId);
                          // this.router.navigate(['/structure/profile']);
                          // this.route.navigate(['/structure/profile', res.dataLoad.accountId],{ state: { example: 'emp_no' } });
                            StaticData.properties = StaticData.properties;
                            this.route.navigate(['/twofactorauth'],  { queryParams: {
                            AcctId:res.dataLoad.accountId, 
                            bvn:res.dataLoad.bvnVerification,
                            code:"SDARERTWW",
                            crDate:res.dataLoad.createdDate,
                            expDate:res.dataLoad.expiredDateTime,
                            gedDate:res.dataLoad.genaratedDateTime,
                            id:res.dataLoad.id,
                            expired:res.dataLoad.isActivexpired,
                            TwoFactor:res.dataLoad.isTwoFactorAuth , page: '/signin'}} );
                            return;
                    
                          //res.dataLoad.code
                          // this.route.navigate( ['twofactorauth'], {queryParams:{order:’popular’,’price-range’:’expensive’’}} );  }
                      
                        //const { redirect } = window.history.state;
                        // this.route.navigateByUrl(redirect || '/');
      
                        //this.route.navigate(['twofactorauth']);
                      // this.route.navigateByUrl('/twofactorauth', { state: { redirect: url } });
                    }
                    else
                    {
                        //  LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
                          LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, res.dataLoad.id);
                          StaticData.properties = StaticData.properties;
                          this.route.navigate(['/dashboard'], { queryParams: { AccountId :res.dataLoad.id}});
                          return;
                    }
            }
            else
            {
                  StaticData.properties = StaticData.properties;
                  Swal.fire({
                    title: 'Warning!',
                    text: this.ResponseData.tryCatchMessage,
                    icon: 'warning',
                    confirmButtonText: 'Ok'
                  }).then((result) => { if (result.isConfirmed) {  this.onSignOut('/signin'); return; }});
                    return;
            }
            
       //  this.compidToSend.emit(this.quickBooksAuthRequestId);
       //  this.erpidToSend.emit(this.erpcompanyId);
        
       },
       error:(err:any)=>
       {
            this.loadingService.setLoading(false);
              Swal.fire({
                title: 'Warning!',
                text: "Service can't be reached at this time. You should try again.",
                icon: 'warning',
                confirmButtonText: 'Ok'
              }).then((result) => {if (result.isConfirmed) {  this.onSignOut('/signin'); return; }});
                return;
              // this.alertify.error('Error saving Connection...')
       }
     })
}

public changeCheckbox(event: any) {
 console.log(event.target);
 if (event.target.checked) {
     this.Rememberme = true;
     event.value = 'true';
   //   // selectedCountries.push(new FormControl(event.target.value));
    } else {
     this.Rememberme = false;
      event.value = 'false';
   }
}

public onCheckboxChange(event: any) {
   
 //  const selectedCountries = (this.form.controls['selectedCountries'] as FormArray);
 //  if (event.target.checked) {
 // //   // selectedCountries.push(new FormControl(event.target.value));
 //  } else {
 //   const index = selectedCountries.controls
 //    .findIndex(x => x.value === event.target.value);
 //    selectedCountries.removeAt(index);
 // }
}

public onChange(optionValue : any)
{
   // console.log(`selected`, optionValue.value)
}

public change(event: any) 
{
   console.log(event.target.value);
}

onchecked(event: any){
 console.log(event.target.checked)
}

blurEvent(event: any)
{
 // this.myusername = event.target.value;
}

//  public showSpinner(): void {
//   this.spinnerService.show();

// }

// public hideSpinner(): void {
//   setTimeout(() => {
//     this.spinnerService.hide();
//   }, 5000); // 5 seconds
// }

public async UploadFile(files:any): Promise<void>
{
      this.loadingService.setLoading(true);

      if (files.length == 0) 
      {
            this.loadingService.setLoading(false);
            Swal.fire({ title: 'Error!',  text: "Upload a file and try again", icon: 'error', confirmButtonText: 'Ok'
            }).then((result) => {
              if (result.isConfirmed) 
              {
                   return;
              }
            });
            return;
      }

      let totalSize: number = 0;
      for (let file of files) {
          totalSize = totalSize + file.size;
      }

      // console.log ("Total select file's size is " + totalSize)

       let fileToUpload = <File>files[0];
       var name = fileToUpload.name;
       var type = fileToUpload.type;
       var size = fileToUpload.size;
       var modifiedDate = fileToUpload.lastModified;

      // console.log ('Name: ' + name + "\n" +  'Type: ' + type + "\n" + 'Last-Modified-Date: ' + modifiedDate + "\n" +'Size: ' + Math.round(size / 1024) + " KB");
    
      try
      {
                this.fileUploadService.UploadFile(files).subscribe({
                next: (event) => 
                {
                      this.loadingService.setLoading(false);
                      this.ResponseData = event;
                      if(this.ResponseData != null && this.ResponseData.isActive)
                      {
                          Swal.fire({ title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok'}).then((result) => {
                            if (result.isConfirmed) {
                              return;
                            }});

                          return;
                      }
                      else
                      {
                          // this.alertify.error('Error saving Connection...')
                          Swal.fire({title: 'Error!', text: this.ResponseData.tryCatchMessage, icon: 'error',   confirmButtonText: 'Ok'}).then((result) => {
                            if (result.isConfirmed) {
                              return;
                            }

                          });

                          return;
                      }

                return;
              },
              error: (err: HttpErrorResponse) => 
              {
                    this.loadingService.setLoading(false);
                    Swal.fire({ title: 'Error!',  text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok'}).then((result) => {
                      if (result.isConfirmed) {
                        return;
                      }
                    });
                    return;
              }
           });
      }
      catch(err:any)
      {
            this.loadingService.setLoading(false);

            Swal.fire({ title: 'Error!',  text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok'}).then((result) => {
              if (result.isConfirmed) 
              {
                    return;
              }
            });

            return;
      }

      // if (event.type === HttpEventType.UploadProgress)
      // {
      //    this.total = event.total;
      //    this.progress = Math.round(100 * event.loaded / this.total);
      // }
      //  else if (event.type === HttpEventType.Response) 
        //{
      //    this.message = 'Upload success.';
      //    this.onUploadFinished.emit(event.body);
      // }
  }

}

export class Login 
{
  public userName: string="";
  public password: string="";
}