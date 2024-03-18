import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SpinnerService } from '../spinner.service';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';
import { FileUploadServiceService } from '../file-upload-service.service';
import { LocalStorageService } from '../local-storage.service';
import { StaticData } from '../StaticData';
import { HttpErrorResponse } from '@angular/common/http';
import { AppMonthlyNetPayDtService } from '../AppMonthlyNetPayDt.service';

@Component({
  selector: 'app-appMonthlyNetPay',
  templateUrl: './appMonthlyNetPay.component.html',
  styleUrls: ['./appMonthlyNetPay.component.css']
})

export class AppMonthlyNetPayComponent implements OnInit
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
 
  message:any= ""; 
  ResponseData!: RespondMessageDto;
  AcctId:any = "";
  // Inject service 
  ClientNetPays:any;
  // ClientNetPayDto
  //appmonthlynetpays

   ProfileDetails:any;
   
   public FirstName!:string;
   public Middle:string | undefined;
   public LastName:string | undefined;
   public EmailAddress:string| undefined;
   public PhoneNumber:string| undefined;
   public AltPhoneNumber:string| undefined;
   public CurrentAddress:string| undefined;
   public Age:string| undefined;
   public Gender:string| undefined;
  constructor(public appDashboard: AppMonthlyNetPayDtService,private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService,private fileUploadService: FileUploadServiceService) 
  {

  }

  ngOnInit(): void 
  {
     this.SignOutApplication(); 
  }

  public SignOutApplication():void
  {
      try{
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
              console.log("Session Result " + this.AcctId );

              if(this.AcctId  === "" || this.AcctId  === undefined || this.AcctId  === null || this.AcctId  === StaticData.LoginKeySession)
              {
                  this.onSignOut("/signin");
                  return;
              }
             
              this.GetUserProfileDetails();
              return;
      }
      catch(error:any){
        this.onSignOut("/signin");
        return;
      }
  }

  public async GetUserProfileDetails(): Promise<void> 
  {
     this.loadingService.setLoading(true);
     await this.LapoLoanService.GetUserProfileDetails(parseInt(this.AcctId)).subscribe({
     next:(res)=>{
     
      this.appDashboard.onLoad(this.AcctId);
       this.loadingService.setLoading(false);
        // console.log("poof! " + res);
       this.ResponseData = res;
       if(this.ResponseData != null && this.ResponseData.isActive)
       {
           this.ProfileDetails = this.ResponseData.dataLoad;
           this.Gender = this.ProfileDetails.userProfileDetails.gender;
           this.FirstName = this.ProfileDetails.userProfileDetails.firstName;
           this.Middle = this.ProfileDetails.userProfileDetails.middleName;
            this.LastName = this.ProfileDetails.userProfileDetails.lastName;
             this.EmailAddress = this.ProfileDetails.userProfileDetails.emailAddress; 
              this.PhoneNumber = this.ProfileDetails.userProfileDetails.phoneNumber; 
               this.AltPhoneNumber = this.ProfileDetails.userProfileDetails.altPhoneNumber;
              this.CurrentAddress = this.ProfileDetails.userProfileDetails.currentAddress; 
               this.Age = this.ProfileDetails.userProfileDetails.age; 
               // this.Gender == this.ProfileDetails.userProfileDetails.gender;
             
           console.log(this.FirstName);
           return;
       }
       else
       {
            //console.log(this.SignInResponseData.tryCatchMessage);
            Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
            return;
       }
  
     },
     error:(err:any)=>
     {
       // console.log("no continue " + err);
       this.loadingService.setLoading(false);
       Swal.fire({ title: 'Error!', text: "An error occurred: " + err.message, icon: 'error', confirmButtonText: 'Ok' })
       return;
     }
   })
  }

  private reloadPage() :void
  {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
    return;
  }

  public onSignOut(event:any):void
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }
  
  private onNaviagateBack(page:string):void
  {
      this.router.navigate([page]);
      return;
  }

  public async uploadFile(event:any): Promise<void>
  {
        const files: FileList = event.target.files;

        if (files == undefined || files == null || files[0] == undefined ||  files[0] == null)
        {
           event.target.value = null;
           event.target.files = undefined;
           Swal.fire({ title: 'Warning!',  text: "Select excel file and try again", icon: 'warning', confirmButtonText: 'Ok'
           }).then((result) => {
             if (result.isConfirmed) 
             {
              event.target.value = null;
              event.target.files = undefined;
                return;
             }
             else{
              event.target.value = null;
              event.target.files = undefined;
              return;
             }
           });

           return;
         }

        Swal.fire({
          title: 'Upload Monthly Net-Pays?',
          text: "Before uploanding excel file, \n \n Make sure all this columns (Staff_Id, Full_Name, Bank_Name, Account_Number, Net_Pay, Grade, Grade_Step, Pay_Group, Command, NPF_Date) are exiting and well renamed as it is here in each excel file sheets. \n \n Maximum file upload size is must be at least 21886237 KB.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#f97c00',
          cancelButtonColor: '#5b5b5b7f',
          confirmButtonText: 'Yes, Upload!',
          cancelButtonText: "No, Don't Upload!"
        }).then((result) => {
          if (result.isConfirmed) 
          {
         
          
            if (files.length === 0) {
              this.loadingService.setLoading(false);
              Swal.fire({ title: 'Error!',  text: "Upload a file and try again", icon: 'error', confirmButtonText: 'Ok'
              }).then((result) => {
                if (result.isConfirmed) {
                  event.target.value = null;
                  event.target.files = undefined;
                    return;
                }
                else{
                  event.target.value = null;
                  event.target.files = undefined;
                    return;
                }
              });
              return;
            }
    
            let totalSize: number = 0;
            // for (let file of files) {
            //     totalSize = totalSize + file.size;
            // }
            console.log ("Total select file's size is " + totalSize)
    
             let fileToUpload = <File>files[0];
             var name = fileToUpload.name;
             var type = fileToUpload.type;
             var size = fileToUpload.size;
             var modifiedDate = fileToUpload.lastModified;
             console.log ('size: ', size);
             console.log ('Name: ' + name + "\n" +  'Type: ' + type + "\n" + 'Last-Modified-Date: ' + modifiedDate + "\n" +'Size: ' + Math.round(size / 1024) + " KB");
               
             if(size >= 21886238)
             {
                  event.target.value = null;
                  event.target.files = undefined;
                  Swal.fire({ title: 'Warning!',  text: "Maximum file upload size is must be at least 21886237 KB", icon: 'warning', confirmButtonText: 'Ok'
                  }).then((result) => {
                    if (result.isConfirmed) 
                    {
                    event.target.value = null;
                    event.target.files = undefined;
                      return;
                    }
                    else{
                    event.target.value = null;
                    event.target.files = undefined;
                    return;
                    }
                  });
      
                  return;
             }
             
            try
            { 
              this.loadingService.setLoading(true);
                    this.fileUploadService.uploadFile(files).subscribe({
                      next: (eventData) => {
                        this.loadingService.setLoading(false);
                        this.ResponseData = eventData;
                        if(this.ResponseData!=null && this.ResponseData.isActive)
                        {
                          this.loadingService.setLoading(false);
                           Swal.fire({ title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok'}).then((result) => {
                            if (result.isConfirmed) {
                              this.appDashboard.onLoad(this.AcctId);
                              event.target.value = null;
                              event.target.files = undefined;
                                return;
                            }
                          });
                           return;
                        }
                        else{
                             // this.alertify.error('Error saving Connection...')
                            Swal.fire({title: 'Error!', text: this.ResponseData.tryCatchMessage, icon: 'error',   confirmButtonText: 'Ok'}).then((result) => {
                              if (result.isConfirmed) {
                                this.appDashboard.onLoad(this.AcctId);
                                event.target.value = null;
                                event.target.files = undefined;
                                  return;
                              }
                            });
                            return;
                        }
                      return;
                    },
                    error: (err: HttpErrorResponse) => {
                      this.loadingService.setLoading(false);
                      Swal.fire({ title: 'Error!',  text: err.message, icon: 'error', confirmButtonText: 'Ok'}).then((result) => {
                        if (result.isConfirmed) {
                          this.appDashboard.onLoad(this.AcctId);
                          this.reloadPage();
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
              Swal.fire({ title: 'Error!',  text: err.message, icon: 'error', confirmButtonText: 'Ok'}).then((result) => {
                if (result.isConfirmed) {
                  this.appDashboard.onLoad(this.AcctId);
                  event.target.value = null;
                  event.target.files = undefined;
                   return;
                }
                else{
                  event.target.value = null;
                  event.target.files = undefined;
                    return;
                }
              });
              return;
            }
          }
          else
          {
            event.target.value = null;
            event.target.files = undefined;
            return;
          }
    });
  }
}
