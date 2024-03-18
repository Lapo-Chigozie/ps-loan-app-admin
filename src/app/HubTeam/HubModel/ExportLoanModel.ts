export class ExportLoanModel 
{
    public LoanId!:string;
    public ExportedBy!:string;
}

export class ExportedLoanModel 
{
    public LoanId!:string;
    public MarkedExportLoans : Array<ExportLoanModel> = new Array<ExportLoanModel>();

    public Status!:string;
    public ExportedBy!:string;

    public HasMarkedExportLoans!:boolean;
    public StartDate!:string;
    public EndDate!:string;
}