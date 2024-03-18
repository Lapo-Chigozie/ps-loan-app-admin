import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StaticData } from '../StaticData';
import { LocalStorageService } from '../local-storage.service';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';
import { FileUploadServiceService } from '../file-upload-service.service';

@Component({
  selector: 'app-app-editprofile',
  templateUrl: './app-editprofile.component.html',
  styleUrls: ['./app-editprofile.component.css']
})
export class AppEditprofileComponent implements OnInit
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  //appeditprofile
  message:any= ""; 
  ResponseData!: RespondMessageDto;
  AcctId:any = "";
  ProfileDetails:any;
  
  public FirstName!:string;
  public Middle:string | undefined;
  public LastName:string | undefined;
  public EmailAddress:string| undefined;
  public PhoneNumber:string| undefined;
  public AltPhoneNumber:string = "";
  public CurrentAddress:string = "";
  public Age:string = "30";
  public Gender:string| undefined;
  public MarrintalStatus:string| undefined;

  constructor(private loadingService: SpinnerService,private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private LapoLoanService: AdminserviceService, private fileUploadService: FileUploadServiceService) 
  {

  }

  ngOnInit(): void 
  {
      this.SignOutApplication();
  }

  public onSignOut(event:any)
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }
  
  private onNaviagateBack(page:string)
  {
      this.router.navigate([page]);
      return;
  }

  public SignOutApplication():void
  {
      try{
        this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
   
        if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
        {
            this.onSignOut("/signin");
            return;
        }

              if(this.AcctId  === "" || this.AcctId  === undefined || this.AcctId  === null || this.AcctId  === StaticData.LoginKeySession)
              {
                  this.onSignOut("/signin");
                  return;
              }
              
              this.GetUserProfileDetails();
              return;
      }
      catch(error){
        this.onSignOut("/signin");
        return;
      }
  }

  public async GetUserProfileDetails(): Promise<void> 
  {
    this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
   
    if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
    {
        this.onSignOut("/signin");
        return;
    }
    this.loadingService.setLoading(true);
    await this.LapoLoanService.GetUserProfileDetails(parseInt(this.AcctId)).subscribe({
     next:(res)=>{
     
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
           this.MarrintalStatus = this.ProfileDetails.userProfileDetails.marrintalStatus;
           // this.Gender == this.ProfileDetails.userProfileDetails.gender;
           return;
       }
       else
       {
            Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
            return;
       }
  
     },
     error:(err)=>
     {
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' })
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

  public ViewProfileDetails(event:any) : void
  {
      this.onNaviagateBack("/appprofile");
      return;
  }

  public async SaveProfileDetails(event:any): Promise<void>
  {
        try
        {

          this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
   
          if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
          {
              this.onSignOut("/signin");
              return;
          }
              this.loadingService.setLoading(true);
              // if(this.FirstName == undefined || this.Middle == undefined || this.LastName == undefined || this.EmailAddress == undefined  || this.PhoneNumber == undefined || this.CurrentAddress == undefined || this.Age == undefined || this.Gender == undefined || this.FirstName =="" || this.Middle =="" || this.LastName =="" || this.EmailAddress ==""  || this.PhoneNumber == "" || this.CurrentAddress == "" || this.Age == "" || this.Gender == "")
              //   this.loadingService.setLoading(false);
              //   Swal.fire({ title: 'Warning!', text: "Fill the blank space properly and try again.", icon: 'warning', confirmButtonText: 'Ok' })
              //   return;
              // }
              // else if(this.AltPhoneNumber?.length > 0)
              // {
              //     if(this.AltPhoneNumber?.length != 11){
              //       this.loadingService.setLoading(false);
              //       Swal.fire({ title: 'Warning!', text: "Phone number must be 11 digit", icon: 'warning', confirmButtonText: 'Ok' })
              //       return;
              //     }
              // }
              // else if(this.PhoneNumber?.length != 11)
              // {
              //   this.loadingService.setLoading(false);
              //   Swal.fire({ title: 'Warning!', text: "Alternative Phone number must be 11 digit", icon: 'warning', confirmButtonText: 'Ok' })
              //   return;
              // }
              // else if(this.Age?.length > 0){

              //   try{
              //     if(parseInt(this.Age?.length) >= 25 && parseInt(this.Age?.length) <= 65){

              //     }
              //     else{
              //       this.loadingService.setLoading(false);
              //       Swal.fire({ title: 'Warning!', text: "Age must be between 25 to 65 years", icon: 'warning', confirmButtonText: 'Ok' })
              //       return;
              //     }
              //   }
              //   catch(edd){
              //     this.loadingService.setLoading(false);
              //     Swal.fire({ title: 'Warning!', text: "Age must be between 25 to 65 years", icon: 'warning', confirmButtonText: 'Ok' })
              //     return;
              //   }
                
              // }
             
                // if(this.Age?.length <=0)
                // {
                //     this.Age = "65"
                // }
                
                let data:any = {
                  'FirstName': this.FirstName,
                  'Middle': this.Middle,
                  'LastName': this.LastName,
                  'EmailAddress': this.EmailAddress,
                  'PhoneNumber': this.PhoneNumber,
                  'AltPhoneNumber': this.AltPhoneNumber,
                  'CurrentAddress': this.CurrentAddress,
                  'Age': '30',
                  'Gender': this.Gender,
                  'AcctId': this.AcctId,
                  'MarrintalStatus': this.MarrintalStatus
                }

                // this.Age?.toString()
                await this.LapoLoanService.ChangeProfileDetailsConnector(data).subscribe({
                  next:(res)=>{
                  
                    this.ResponseData = res;
                    this.loadingService.setLoading(false);
                     // console.log("poof! " + res);
                 
                    if(this.ResponseData != null && this.ResponseData.isActive)
                    {
                        this.ProfileDetails = this.ResponseData.dataLoad;
                        console.log(this.ProfileDetails);
                        Swal.fire({
                          title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok'
                        }).then((result) => {
                          if (result.isConfirmed) {
                            this.onNaviagateBack("/appprofile");
                            return;
                          }
                        })
                        return;
                    }
                    else
                    {
                         //console.log(this.SignInResponseData.tryCatchMessage);
                         Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                         return;
                    }
               
                  },
                  error:(err)=>
                  {
                    // console.log("no continue " + err);
                    this.loadingService.setLoading(false);
                    Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
                    return;
                  }
                })

              return;
        }
        catch(error){
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
          return;
        }
      }

}


