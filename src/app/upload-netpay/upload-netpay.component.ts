import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, Inject, Input, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { Subscription, finalize } from 'rxjs';
import { FileUploadServiceService } from '../file-upload-service.service';
import { AdminserviceService } from '../adminservice.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../spinner.service';
import Swal from 'sweetalert2';
import { RespondMessageDto } from '../appApiDto/RespondMessageDto';
import { ClientNetPayDto } from '../appApiDto/ClientNetPayDto';
import { LocalStorageService } from '../local-storage.service';
import { StaticData } from '../StaticData';
import { __await } from 'tslib';
import { AppBasedComponent } from '../app-based/app-based.component';
import { DecimalPipe, Location, formatNumber } from '@angular/common';
import { AppRouterService } from '../AppRouter.service';
import { AppMonthlyNetPaysServicesService } from '../AppMonthlyNetPaysServices.service';

@Component({
  selector: 'app-upload-netpay',
  templateUrl: './upload-netpay.component.html',
  styleUrls: ['./upload-netpay.component.css']
})
export class UploadNetpayComponent extends AppBasedComponent  implements OnInit
{
  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: any = ""; // Variable to store file
  message:any= ""; 
  override ResponseData!: RespondMessageDto;
  override AcctId:any = "";
  // Inject service 
  ClientNetPays:any;
  AppId: string  = "";
  // LoadingExpression:boolean = false;
  // ClientNetPayDto
  constructor(public appDashboard: AppMonthlyNetPaysServicesService, @Inject(LOCALE_ID) public override locale: string, public override location: Location,  public override appRouter: AppRouterService, public override loadingService: SpinnerService, public override router: Router, public override route: ActivatedRoute, public override formBuilder: FormBuilder, public override LapoLoanService: AdminserviceService, public override  fileUploadService: FileUploadServiceService)
  { 
       super( locale, location, appRouter,  loadingService,  router,  route,  formBuilder, LapoLoanService,   fileUploadService);
  }
  
  override ngOnInit(): void 
  {
      try
      {

        this.SignOutApplication();
        this.route.queryParams.subscribe(params => 
          {
            //  console.log(params); 
            this.AppId = params['AppId'];

            if(this.AppId == undefined ||  this.AppId == null || this.AppId == undefined || this.AppId == '' ||  this.AppId == '' || this.AppId == '')
            {
              this.onNaviagateBack('/signin');
            }

            this.appDashboard.onLoad(this.AppId);
        });  
      }
      catch(error:any)
      {
        this.onNaviagateBack('/signin');
      }
  }

  public SignOutApplication():void
  {
      try
      {
              this.AcctId = LocalStorageService.getLoginSessionIdentity(StaticData.LoginKeySession);
              // console.log("Session Result " + this.AcctId );

              if(this.AcctId  == "" || this.AcctId  == undefined || this.AcctId  == null || this.AcctId  == StaticData.LoginKeySession)
              {
                  this.onSignOut("/signin");
                  return;
              }
             
              // this.LoadClientNetPayHeader();
              return;
      }
      catch(error:any)
      {
        this.onSignOut("/signin");
        return;
      }
  }
  
  public onSignOut(event:any)
  {
      LocalStorageService.setLoginSessionIdentity(StaticData.AdminTwoLoginKeySession, StaticData.AdminTwoLoginKeySession);
      LocalStorageService.setLoginSessionIdentity(StaticData.LoginKeySession, StaticData.LoginKeySession);
      this.onNaviagateBack(event);
      return;
  }
  
  // On file Select
  onChange(event: any) 
  {
      console.log(event.target.files[0]);
      this.file = event.target.files[0];
  }

  // OnClick of button Upload
  async onUpload() {

    if (this.file) {

      this.loading = !this.loading;
      console.log(this.file);

     await this.fileUploadService.upload(this.file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {

                  // Short link via api response
                  this.shortLink = event.link;
                  this.loading = false; // Flag variable 
                  Swal.fire({
                    title: 'Error!',
                    text: "Please select a file first",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            
                  return;
              }
              else{
                Swal.fire({
                  title: 'Error!',
                  text: "Please select a file first",
                  icon: 'error',
                  confirmButtonText: 'Ok'
                })
          
                return;
              }
          }
      );

    } else {
     
      Swal.fire({
        title: 'Error!',
        text: "Please select a file first",
        icon: 'error',
        confirmButtonText: 'Ok'
      })

      return;
    }
  }

  public async uploadFile(files:any): Promise<void>
  {
        this.loadingService.setLoading(true);
        if (files.length === 0) {
          this.loadingService.setLoading(false);
          Swal.fire({ title: 'Error!',  text: "Upload a file and try again", icon: 'error', confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.reloadPage(); return;
            }
          });
          return;
        }

        let totalSize: number = 0;
        for (let file of files) {
            totalSize = totalSize + file.size;
        }
        console.log ("Total select file's size is " + totalSize)

         let fileToUpload = <File>files[0];
         var name = fileToUpload.name;
         var type = fileToUpload.type;
         var size = fileToUpload.size;
         var modifiedDate = fileToUpload.lastModified;

        console.log ('Name: ' + name + "\n" +  'Type: ' + type + "\n" + 'Last-Modified-Date: ' + modifiedDate + "\n" +'Size: ' + Math.round(size / 1024) + " KB");
       
        // for (var i = 0; i < event.target.files.length; i++) 
       // {  }

      //  if(Math.round(size / 1024) > StaticData.FileMaxSize) {
      //   this.loadingService.setLoading(false);
      //   Swal.fire({ title: 'Error!',  text: "The file size is much: choose a file mininum of " + StaticData.FileSize, icon: 'error', confirmButtonText: 'Ok'}).then((result) => {
      //     if (result.isConfirmed) {
      //       this.reloadPage();
      //       return;
      //     }
      //   });
      //   return;
      //  }

        try{
          
                this.fileUploadService.uploadFile(files).subscribe({
                  next: (event) => 
                  {
                    this.loadingService.setLoading(false);
                    this.ResponseData = event;
                    if(this.ResponseData!=null && this.ResponseData.isActive)
                    {
                       Swal.fire({ title: 'Success!',  text: this.ResponseData.tryCatchMessage, icon: 'success', confirmButtonText: 'Ok'}).then((result) => {
                        if (result.isConfirmed) {
                          this.appDashboard.onLoad(this.AppId );
                          this.reloadPage();
                          return;
                        }});
                       return;
                    }
                    else
                    {
                         // this.alertify.error('Error saving Connection...')
                        Swal.fire({title: 'Error!', text: this.ResponseData.tryCatchMessage, icon: 'error',   confirmButtonText: 'Ok'}).then((result) => {
                          if (result.isConfirmed) {
                            this.appDashboard.onLoad(this.AppId );
                            this.reloadPage();
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
                      this.appDashboard.onLoad(this.AppId );
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
              this.appDashboard.onLoad(this.AppId );
              this.reloadPage();
                      return;
            }
          });
          return;
        };

    // if (event.type === HttpEventType.UploadProgress)
    // {
    //    this.total = event.total;
    //    this.progress = Math.round(100 * event.loaded / this.total);
    // }
    //  else if (event.type === HttpEventType.Response) {
    //    this.message = 'Upload success.';
    //    this.onUploadFinished.emit(event.body);
    //  }

  }

  private reloadPage() :void
  {
    setTimeout(()=>{
      window.location.reload();
    }, 100);
    return;
  }

  private prevUrl!:any;
  private prevUrl2!:any;
  public onBackWard(event:any):void
  {
    this.GoBackPreviousPage();
    // this.router.navigateByUrl("/appmonthlynetpays");
     // this.prevUrl = this.router.getCurrentNavigation()?.previousNavigation?.initialUrl.toString();
    // this.prevUrl2 = this.router.getCurrentNavigation()?.previousNavigation?.finalUrl?.toString();
    // this.router.navigateByUrl(this.prevUrl2);
    // this.GoBackPreviousPage1();
  }
}
