export class LoginUserPermissionModel
{
    public  IsRELATIONSHIPOFFICER:boolean  = false;
    public  IsTEAMLEADS :boolean  = false;
    public  IsRECONCILIATIONANDACCOUNTOFFICER :boolean  = false;
    public  IsASSISTANTHEADOFOPERATION:boolean  = false;
    public  IsHEADOFOPERATIONS:boolean  = false;
    public  IsGROUPHEAD :boolean  = false;
    public  IsDISBURSEMENTOFFICER :boolean  = false;

    public  IsGeneralPermissionsAccessRight :boolean  = false;
    public  IsTenureAccessRight :boolean  = false;
    public  IsLoanSettingAccessRight :boolean  = false;
    public  IsNetPaysAccessRight :boolean  = false;

    public  IsCustomerLoanPermission :boolean  = false;

    public  GroupId !:number;
    public  GroupName !:string;
    public  TeamId!:number;

    public  IsDeveloperTeam :boolean  = false;
    public  AccessRightToAnonymousLoanApplication :boolean  = false;

    public  AccessRightToApprovedLoan :boolean  = false;
    public  AccessRightToCancelLoan :boolean  = false;
  
    public  AccessRightToUploadBackDISBURSEMENTLoan:boolean  = false;
    public  AccessRightToViewLoan:boolean  = false;
    public  AccessRightToUploadBackRepaymentLoan :boolean  = false;
    public  AccessRightToViewUploadBackRepaymentLoan :boolean  = false;
    public  AccessRightToViewDisbursementLoan :boolean  = false;
    public  AccessRightToPrintLoan :boolean  = false;
    public  AccessRightToProceedLoan :boolean  = false;

    public  AccessRightToExportDISBURSEMENTLoan :boolean  = false;
    public  AccessRightToExportDisbursementloan1 :boolean  = false;
    
    public  AccessRighttoapprovecustomerloan :boolean  = false;
    public  AccessRighttocreateahub :boolean  = false;
    public  AccessRighttocreateateammember :boolean  = false;
    public  AccessRighttocreatetenure :boolean  = false;
    public  AccessRighttodisablecustomerstoapplyforaloan :boolean  = false;
    public  AccessRighttodisablehubs :boolean  = false;
    public  AccessRightToEditTeamMemberPermissions:boolean  = false;

    public  AccessRighttoloansettings :boolean  = false;
    public  AccessRighttorejectaloan :boolean  = false;
    public  AccessRighttoteamsAndpermissions :boolean  = false;
    public  AccessRightToUploadBackDisbursementloan :boolean  = false;

    // AccessRightToExportDisbursementloan

    public  AccessRighttoviewveammembers :boolean  = false;
    public  AccessRighttoviewcustomersloans :boolean  = false;
    public  AccessRighttoviewcustomers :boolean  = false;
    public  AccessRighttoviewhubs :boolean  = false;
    public  AccessRighttoviewloandetails :boolean  = false;
    public  AccessRighttoviewtenure :boolean  = false;
    public  CreateLoanNarration :boolean  = false;
    public  ViewLoanNarration :boolean  = false;
}