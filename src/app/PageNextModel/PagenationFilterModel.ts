import { LoginUserPermissionModel } from "./LoginUserPermissionModel";
import { PageNextSelection } from "./PageNextSelection";


export class PagenationFilterModel
 {

    public AccountId: number| undefined;
    public status: string | undefined;
    public dateTo: string| undefined;
    public dateFrom: string| undefined;
    public pageDataSize: number| undefined;
    public searchText: string| undefined;
    public PageNext :PageNextSelection | undefined;
    public IsSearchBar :boolean | undefined;
    
    public  IsSelected :boolean | undefined;

    public  MarkAllData :boolean =false;

    public  SelectedNumber !:number;

    public  AcctId :string="1";
    public  AppId :string="1";
    public  PermissionPage !: LoginUserPermissionModel;

}
