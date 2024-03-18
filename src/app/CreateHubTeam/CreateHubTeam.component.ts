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

@Component({
  selector: 'app-CreateHubTeam',
  templateUrl: './CreateHubTeam.component.html',
  styleUrls: ['./CreateHubTeam.component.css']
})
export class CreateHubTeamComponent extends AppBasedComponent implements OnInit 
{
      public  HubGroup :string = "";
      private SendSMSCustomerLoanApplicationSubmitted : boolean = false;
      public IsDefaultHub : boolean = false;

      public EnterPhoneNumber :string = "";
      public EnterEmailAddress:string = "";
    
      constructor(@Inject(LOCALE_ID)  override locale: string,  override location: Location,   override appRouter: AppRouterService,   override  loadingService: SpinnerService,  override  router: Router,  override  route: ActivatedRoute,  override  formBuilder: FormBuilder,  override  LapoLoanService: AdminserviceService,  override  fileUploadService: FileUploadServiceService) {
        super(locale, location, appRouter, loadingService,router, route, formBuilder, LapoLoanService, fileUploadService);
      }

      public override ngOnInit() :void
      {
        
      }

      public async onCreateHubGroup():Promise<void>
      {
          try
          {
                    this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);

                    if(this.HubGroup == null || this.HubGroup == undefined || this.HubGroup.length < 0)
                    {
                        Swal.fire({ title: 'Warning!', text: "Loan Tenure is required", icon: 'warning', confirmButtonText: 'Ok' })
                        return;
                    }

                    if(this.AcctId == null || this.AcctId == undefined)
                    {
                        Swal.fire({ title: 'Warning!', text: "Log out and login again", icon: 'warning', confirmButtonText: 'Ok' })
                        return;
                    }

                    if(this.IsDefaultHub == true)
                    {
                      if(this.EnterPhoneNumber == "" || this.EnterPhoneNumber == null || this.EnterPhoneNumber == undefined)
                      {
                          Swal.fire({ title: 'Warning!', text: "Phone Number is required", icon: 'warning', confirmButtonText: 'Ok' })
                          return;
                      }

                      if(this.EnterEmailAddress == "" || this.EnterEmailAddress == null || this.EnterEmailAddress == undefined)
                      {
                          Swal.fire({ title: 'Warning!', text: "Email Address is required", icon: 'warning', confirmButtonText: 'Ok' })
                          return;
                      }
                    }

                    // this. EnterPhoneNumber = "";
                    // this. EnterEmailAddress = "";
                    // this.IsDefaultHub = true;
                
                    this.loadingService.setLoading(true);
                    // this.NewLoanInterest
                    let AppData = { EnterEmailAddress:  this.EnterEmailAddress,  EnterPhoneNumber: this.EnterPhoneNumber, IsGroupHeadOffice: this.SendSMSCustomerLoanApplicationSubmitted, "GroupName": this.HubGroup, CreateAccountId: this.AcctId };
                
                    await this.LapoLoanService.CreateHubTeam(AppData).subscribe({
                    next:(res)=>
                    {
                      this.loadingService.setLoading(false);
                      this.ResponseData = res;
                      if(this.ResponseData != null && this.ResponseData.isActive)
                      {
                          this.HubGroup = "";
                          // console.log("Poof Loan Apps! " , this.LoanApps);
                          Swal.fire({ title: 'Success!', text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok' })
                          return;
                      }
                      else
                      {
                            Swal.fire({ title: 'Warning!', text: this.ResponseData.tryCatchMessage, icon: 'warning', confirmButtonText: 'Ok' })
                            return;
                      }
                  
                    },
                    error:(err):any=>
                    {
                        this.loadingService.setLoading(false);
                        Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
                        return;
                    }
                  });
          }
          catch(exx:any)
          {
            Swal.fire({ title: 'Error!', text: "Service can't be reached at this time. You should try again." , icon: 'error', confirmButtonText: 'Ok' })
            return;
          }
      }

      public onSendSMSCustomerLoanApplicationSubmitted(event:any): void
      {
          if(event.target.checked)
          {
              this. EnterPhoneNumber = "";
              this. EnterEmailAddress = "";
              this.IsDefaultHub = true;
              this.SendSMSCustomerLoanApplicationSubmitted = true;
              return;
          }
          else
          {
              this. EnterPhoneNumber = "lapomicro@lapo.org.ng";
              this. EnterEmailAddress = "08000000000";
              this.IsDefaultHub = false;
              this.SendSMSCustomerLoanApplicationSubmitted = false;
              return;
          }
      }
    }
