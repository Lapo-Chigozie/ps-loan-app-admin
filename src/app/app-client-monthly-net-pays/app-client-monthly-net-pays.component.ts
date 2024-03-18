import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { SpinnerService } from '../spinner.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { FileUploadServiceService } from '../file-upload-service.service';
import { AdminserviceService } from '../adminservice.service';
import Swal from 'sweetalert2';
import { AppBasedComponent } from '../app-based/app-based.component';
import { AppRouterService } from '../AppRouter.service';
import { DecimalPipe, Location, formatNumber } from '@angular/common';

@Component({
  selector: 'app-app-client-monthly-net-pays',
  templateUrl: './app-client-monthly-net-pays.component.html',
  styleUrls: ['./app-client-monthly-net-pays.component.css']
})
export class AppClientMonthlyNetPaysComponent extends AppBasedComponent  implements OnInit
{
    // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: any = ""; // Variable to store file
    message:any= ""; 
    override ResponseData!: RespondMessageDto;
    override AcctId:any = "";
    // Inject service 
    ClientNetPayDetails:any;
    previousUrl:string ="";
    // ClientNetPayDto
    constructor(@Inject(LOCALE_ID) public override locale: string, public override location: Location,  public override appRouter: AppRouterService, public override loadingService: SpinnerService, public override router: Router, public override route: ActivatedRoute, public override formBuilder: FormBuilder, public override LapoLoanService: AdminserviceService, public override  fileUploadService: FileUploadServiceService)
    { 
       super( locale, location, appRouter,  loadingService,  router,  route,  formBuilder, LapoLoanService,   fileUploadService);
    }

    AccountId:any = "";
    PFNumber:any = "";

   override  ngOnInit(): void 
   {

      try
      {
        this.AccountId = this.route.snapshot.queryParams["AccountId"];
        this.PFNumber = this.route.snapshot.queryParams["PFNumber"];
        if(this.PFNumber == undefined || this.PFNumber == "" || this.PFNumber == null)
        {
            this.onNaviagateBack('/uploadnetpay');
            return;
        }
        console.log(this.PFNumber);
        this.LoadClientNetPayDetails(this.PFNumber, this.AccountId);
    }
    catch(e){
     
         //console.log('Display: ' + e);
         this.onNaviagateBack('/uploadnetpay');
         return;
    }

    }

  
  
    public async LoadClientNetPayDetails(PFNumber:string, AcctId:string): Promise<void> 
    {
      this.loadingService.setLoading(true);
      this.LapoLoanService.GetClientNetPaysConnector(PFNumber, this.AcctId).subscribe({
       next:(res)=>{
       
         this.loadingService.setLoading(false);
          // console.log("poof! " + res);
         this.ResponseData = res;
         if(this.ResponseData != null && this.ResponseData.isActive){
             this.ClientNetPayDetails = this.ResponseData.dataLoad;
            // console.log(this.ClientNetPayDetails);
             return;
         }
         else
         {
              Swal.fire({
                title: 'Warning!',
                text: this.ResponseData.tryCatchMessage,
                icon: 'warning',
                confirmButtonText: 'Ok'
              })
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
    }
  
     public DeleteMonthlyNetPay(id:string, PFNumber:string)
     {
          Swal.fire({
            title: 'Warning?',
            text:  'Are you sure that you want to delete this customers net-pays.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f97c00',
            cancelButtonColor: '#5b5b5b7f',
            confirmButtonText: 'Yes!',
            cancelButtonText: "No!"
          }).then((result) => {
            if (result.isConfirmed) {
              this.RemoveData(id, PFNumber);
              return;
            }
          });
     }

  public RemoveData(id:string, PFNumber:string):void
  {
      try
      {
        this.loadingService.setLoading(true);
        this.LapoLoanService.DeleteClientNetPayConnector(id, PFNumber).subscribe({
        next:(res)=>{
        
          this.LoadClientNetPayDetails(this.PFNumber, this.AccountId);
          this.loadingService.setLoading(false);
            // console.log("poof! " + res);
          this.ResponseData = res;
          if(this.ResponseData != null && this.ResponseData.isActive){
            Swal.fire({ title: 'Success!',  text: 'Net-Pay has been deleted successfully', icon: 'success', confirmButtonText: 'Ok'}).then((result) => {
              if (result.isConfirmed) {
                this.LoadClientNetPayDetails(this.PFNumber, this.AccountId);
                return;
              }
            });
            return;
          }
          else
          {
                Swal.fire({
                  title: 'Warning!',
                  text: this.ResponseData.tryCatchMessage,
                  icon: 'warning',
                  confirmButtonText: 'Ok'
                }).then((result) => {
                  if (result.isConfirmed) {
                    
                    this.LoadClientNetPayDetails(this.PFNumber, this.AccountId);
                    return;
                  }
                });
                return;
          }
      
        },
        error:(err)=>
        {
          // console.log("no continue " + err);
          this.loadingService.setLoading(false);
         

          Swal.fire({ title: 'Uh-oh!',  text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok'}).then((result) => {
            if (result.isConfirmed) {    this.LoadClientNetPayDetails(this.PFNumber, this.AccountId);
              return; } });
          return;



        }
        });

      }
      catch(exi:any)
      { 
        this.LoadClientNetPayDetails(this.PFNumber, this.AccountId);
        Swal.fire({ title: 'Uh-oh!', text: "Service can't be reached at this time. You should try again.", icon: 'error', confirmButtonText: 'Ok' });
        return;
      }
  }



     private prevUrl!:any;
     private prevUrl2!:any;
     public onBackWard(event:any):void
     {
       // this.router.navigateByUrl(this.GetPreviousUrl());
       this.GoBackPreviousPage();
       // this.prevUrl = this.router.getCurrentNavigation()?.previousNavigation?.initialUrl.toString();
       // this.prevUrl2 = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
       // this.router.navigateByUrl(this.prevUrl2);
       // this.GoBackPreviousPage1();
     }
  }
  