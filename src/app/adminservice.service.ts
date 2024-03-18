import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { TwoFactorAuthÇodeDto } from './appApiDto/TwoFactorAuthÇodeDto';
import { Apphttpclienturl } from './apphttpclienturl';
import { RespondMessageDto } from './appApiDto/RespondMessageDto';
import { SignInPostDto } from './appApiDto/SignInPostDto';
import { AppConfig } from '../assets/images/defaultSettings';

// import { AppConfig } from 'src/assets/images/defaultSettings';

@Injectable({
  providedIn: 'root'
})

export class AdminserviceService 
{
  private HostServerUrl:any = Apphttpclienturl.IsLive;
  private TimeOutHttp:any = AppConfig.TimeOutHttp;
  public  controllerName = AppConfig.AcctSecurity;
  
  constructor(private http: HttpClient) 
  {  
      this.HostServerUrl = Apphttpclienturl.IsLive;
      this.controllerName = AppConfig.AcctSecurity;
      // private AppHost: ApiHostComponent
  }

  public CalculateScheduledLoanAmount(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.LoanScheduled + '/CalculateScheduledLoanAmount', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public GetAllLoanAppDashboard(PagenationFilter: any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/AllDashboardLoanAppList', PagenationFilter, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
    // return this.http.get<RespondMessageDto>(urlhost + '/api/AcctSecurity/AllLoanApp?AccountId=' + accountId);
  }

  public GetAllHubTeamMembers(PagenationFilter: any, urlhost:string):Observable<RespondMessageDto>
  {
      return this.http.post<RespondMessageDto>(urlhost , PagenationFilter, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
      // return this.http.get<RespondMessageDto>(urlhost + '/api/AcctSecurity/AllLoanApp?AccountId=' + accountId);
  }

  public GetHubTeamList(PagenationFilter: any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.HubTeam + '/HubTeamList', PagenationFilter, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
    // return this.http.get<RespondMessageDto>(urlhost + '/api/AcctSecurity/AllLoanApp?AccountId=' + accountId);
  }
  
  public GetPrintServiceConnector(data:any):Observable<RespondMessageDto>
  {
        let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
       // console.log("urlhost", data);
        return this.http.post<RespondMessageDto>(urlhost + AppConfig.PrintService + '/SetLoanPrinterArrangement', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public GetAdminLoanDetailsConnector(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/AdmindashboardLoanApp', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public GetAllLoanApp(accountId: number):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/AllLoanAppList?AccountId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  public GetAdminLoanMethodList(accountId: number):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/AdminLoanMethodList?AcctId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public GetListOfNarrationListList(accountId: number):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/ListOfNarrationList?AcctId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public GetAllStaffList(PagenationFilter: any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.StaffService + '/AllStaffList', PagenationFilter, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
 
  public GetStaffAccessRight(accountId: number):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.StaffService + '/StaffAccessRight?AcctId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  public  GetLoanAppDetails(AppHeaderId: string, AcctId: string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/LoanAppDetails?AppHeaderId=' + AppHeaderId + "&AcctId=" + AcctId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public GetHubTeamAppDetail(AppHeaderId: string):Observable<RespondMessageDto>
  {
      let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
      return this.http.get<RespondMessageDto>(urlhost + AppConfig.HubTeam + '/GetHubTeam?Id=' + AppHeaderId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public ExitNewHubTeamMember(data: any):Observable<RespondMessageDto>
  {
      let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
      return this.http.post<RespondMessageDto>(urlhost + AppConfig.HubTeam + '/ExitNewHubTeamMember', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  public AdminActivateLoanMethod(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/AdminActivateLoanMethod', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public ProcessAction(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.StaffService + '/ProcessAction', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public ProcessAction2(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost +  AppConfig.StaffService + '/ProcessAction2', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  public ProcessAction3(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost +  AppConfig.StaffService + '/ProcessAction3', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public ProcessAction4(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost +  AppConfig.StaffService + '/ProcessAction4', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public  ProcessAction5(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost +  AppConfig.StaffService + '/ProcessAction5', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public ProcessAction6(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.StaffService + '/ProcessAction6', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  public ProcessAction1(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.StaffService + '/ProcessAction1', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public GetProcessGetAllStaffAccessRight(AcctId: string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 ProcessGetAllStaffAccessRight
    return this.http.get<RespondMessageDto>(urlhost +  AppConfig.StaffService + '/ProcessGetAllStaffAccessRight?AcctId=' + AcctId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public GetE360UsersByTeamMember(AcctId: any, inputUser:any, SystemRole:any,
     SystemRef:any):Observable<RespondMessageDto>
  {
        let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); 
        // 2, 0 ProcessGetAllStaffAccessRight
        // alert("Message received: " + urlhost + AppConfig.AcctSecurity + '/GetE360UsersByTeamMember?AcctId=' + AcctId + "&inputUser=" + inputUser + "&SystemRef1=" + SystemRef  + "&SystemRole1=" + SystemRole);
        return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/GetE360UsersByTeamMember?AcctId=' + AcctId + "&inputUser=" + inputUser + "&SystemRef1=" + SystemRef  + "&SystemRole1=" + SystemRole, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public ProcessActionAddStaff(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.StaffService + '/ProcessSetPermissionToCreatedStaff', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public ProcessActionActivatorStaff(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.StaffService + '/ProcessSetPermissionHasPermissionToDisableStaff', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public CancelLoanAppConnector(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/CancelLoanAppRequest', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  public AdminCancelLoanAppRequest(data:any):Observable<RespondMessageDto>
  {
     let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
     return this.http.post<RespondMessageDto>(urlhost +  AppConfig.AcctSecurity + '/AdminCancelLoanAppRequest', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public AdminApprovedLoanAppRequest(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/AdminApprovedLoanAppRequest', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public AdminSaveLoanMethod(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/AdminSaveLoanMethod', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public AdminSaveNewNarration(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/NewNarration', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  public CreateHubTeam(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.HubTeam + '/CreateHubTeam', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  public CreateNewHubTeamMember(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.HubTeam + '/CreateNewHubTeamMember', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  OfficerStandardLoan(data:any):Observable<RespondMessageDto>
  {
        let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
        return this.http.post<RespondMessageDto>(urlhost + AppConfig.HubTeam  + '/OfficerStandardLoan', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  SaveLoanSettings(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/UpdateLoanSettings', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  AddRegisterStaffs(data:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
    return this.http.post<RespondMessageDto>(urlhost +AppConfig.StaffService + '/RegisterStaffs', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  SignInConnector(save:SignInPostDto):Observable<RespondMessageDto>
  {
     let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); // 2
     /// alert(urlhost + this.controllerName + '/AdminSignInAuth');
     return this.http.post<RespondMessageDto>(urlhost + AppConfig.StaffService + '/AdminSignInAuth', save, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  AutoCreateAccountConnector(data : string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/AutoAdminCreateAcct?data=' + data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  ConfirmTwoFactorAuthCodeConnector(code:TwoFactorAuthÇodeDto):Observable<RespondMessageDto>
  {
     let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2
     return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/ConfirmTwoFactorAuth', code, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  GetLoadSpinnerLoadingConnector(data : any):Observable<RespondMessageDto>
  {
       let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
       return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/LoadSpinnerRound?Lenght=' + data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  ResendTwofactorsmsConnector(message : string, accountId: number):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/ReSendTwoFactorCode?AcctId=' + accountId + "&message=" + message, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  async GetClientNetPay1Connector( PagenationFilter:any):Promise<Observable<RespondMessageDto>>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return await this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + 'ClientNetPay1', PagenationFilter, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  GetClientNetPayConnector(PagenationFilter: any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/ClientNetPay', PagenationFilter, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  ActivateCustomerLoanPermission(accountId: string):Observable<RespondMessageDto>
  {
      let urlhost = Apphttpclienturl.GetHostUrl(0); //2  ,0 
      return this.http.get<RespondMessageDto>(urlhost +  AppConfig.AcctSecurity + '/ActivateCustomerLoanPermission?Pfnumber=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  ActivateHubGroupPermission(accountId: string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.HubTeam + '/ActivateHubGroup?AppsId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  ActivateHubTeamMemberPermission(accountId: string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.HubTeam + '/ActivateHubTeamMember?AppsId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  ActivateHubDisTeamPermission(accountId: string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.HubTeam + '/ActivateHubGroup?AppsId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  ActivateTeamLeadPermission(accountId: string,AppId: string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost +  AppConfig.HubTeam + '/ActivateTeamLead?AppsId=' + accountId + '&AcctId=' + AppId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  ActivateReconciliationOfficerMemberPermission(accountId: string,AppId: string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.HubTeam  + '/ActivateReconciliationOfficerMember?AppsId=' + accountId + '&AcctId=' + AppId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  GetMonthsNetPayConnector( PagenationFilter:any):Observable<RespondMessageDto>
  {
      let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
      return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/AllMonthlyNetPays', PagenationFilter, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  GetUserProfileDetails(accountId: number):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/GetUserProfileDetails?AccounttId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public GetUserPermissionDetails(accountId: number):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/GetUserPermissionDetails?AccounttId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  GetLoanSettings(accountId: any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/GetLoanSettings?AcctId=' + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  GetAssignLoanToTeamMembers(AccountId: any, AppId:any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.HubTeam + '/GetAllReconcilationMembers?AccountId=' + AccountId + '&AppId=' + AppId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  GetClientNetPaysConnector(Pfnumber: string, accountId: string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/ClientMonthlyNetPays?Pfnumber=' + Pfnumber, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  DeleteClientNetPayConnector(Pfnumber: string, accountId: string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/DeleteClientNetPay?Pfnumber=' + Pfnumber + "&AccountId='" + accountId, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  CheckIfEmailExitConnector(data : any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/CheckIfEmailExit', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
  
  ChangePasswordConnector(data : any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/ChangePassword', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  InnerChangePasswordConnector(data : any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); 
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/InnerChangePassword', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public ExportLoanApps(data : any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); 
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.FileExport + '/ExportApprovedLoanApps', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  public Download(data : any) 
  { 
      let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); 
      let fileUrl = JSON.stringify(data)
      //  alert(urlhost + this.controllerName + `/GetExportApprovedLoanApps?FileUrl=${fileUrl}`);
      return this.http.get(urlhost + AppConfig.FileExport + `/GetExportApprovedLoanApps?FileUrl=${fileUrl}`, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
      }); 
  }

  FetchAccountDetailsConnector(data : string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/FetchAccountDetails?AcctId=' + data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  UserTwoFactorActivatorConnector(data : string):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.get<RespondMessageDto>(urlhost + AppConfig.AcctSecurity + '/UserTwoFactorActivator?AccounttId=' + data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }

  ChangeProfileDetailsConnector(data : any):Observable<RespondMessageDto>
  {
    let urlhost = Apphttpclienturl.GetHostUrl(this.HostServerUrl); //2  ,0 
    return this.http.post<RespondMessageDto>(urlhost + AppConfig.AcctSecurity  + '/ChangeProfileDetails', data, { headers: new HttpHeaders({ timeout: `${this.TimeOutHttp}` }) });
  }
}
