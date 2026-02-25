using DTO.MFLMSAPI.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MFWEBAPP.Models.LoanCard
{
    public class GenerateLoanCardModel
    {
        //LoanCardMemberData
        public string branchName { get; set; }
        public string centerId { get; set; }
        public string centerName { get; set; }
        public string customerImage { get; set; }
        public string memberId { get; set; }
        public string memberName { get; set; }
        public string fatHusName { get; set; }
        public string kycNo { get; set; }
        public string mobileNumber { get; set; }
        public string ifscCode { get; set; }
        public string accountNo { get; set; }
        public List<LoanCardLoanData> loanDetails { get; set; }

        //-----------------LoanCardLoanData---------------//

        //LoanCardLoanData 1st column
        public string loanId { get; set; }
        public string loanDate { get; set; }
        public double loanAmount { get; set; }
        public double interestRate { get; set; }
        public string loanPurpose { get; set; }
        public long cycle { get; set; }
        public long noOfInstallment { get; set; }
        public string morotorium { get; set; }
        public string repayMode { get; set; }
        public double firstInstallment { get; set; }
        public double lastInstallment { get; set; }
        public double processingFee { get; set; }
        public double insuranceAmount { get; set; }
        public long loanTenure { get; set; }
        public string insuranceCompany { get; set; }
        public string loandueDate { get; set; }

        //LoanCardLoanData 2nd column
        public string loanId1 { get; set; }
        public string loanDate1 { get; set; }
        public double loanAmount1 { get; set; }
        public double interestRate1 { get; set; }
        public string loanPurpose1 { get; set; }
        public long cycle1 { get; set; }
        public long noOfInstallment1 { get; set; }
        public string morotorium1 { get; set; }
        public string repayMode1 { get; set; }
        public double firstInstallment1 { get; set; }
        public double lastInstallment1 { get; set; }
        public double processingFee1 { get; set; }
        public double insuranceAmount1 { get; set; }
        public long loanTenure1 { get; set; }
        public string insuranceCompany1 { get; set; }
        public string loandueDate1 { get; set; }


        //LoanCardLoanData 3rd column
        public string loanId2 { get; set; }
        public string loanDate2 { get; set; }
        public double loanAmount2 { get; set; }
        public double interestRate2 { get; set; }
        public string loanPurpose2 { get; set; }
        public long cycle2 { get; set; }
        public long noOfInstallment2 { get; set; }
        public string morotorium2 { get; set; }
        public string repayMode2 { get; set; }
        public double firstInstallment2 { get; set; }
        public double lastInstallment2 { get; set; }
        public double processingFee2 { get; set; }
        public double insuranceAmount2 { get; set; }
        public long loanTenure2 { get; set; }
        public string insuranceCompany2 { get; set; }
        public string loandueDate2 { get; set; }

        //LoanCardLoanData 4th column
        public string loanId3 { get; set; }
        public string loanDate3 { get; set; }
        public double loanAmount3 { get; set; }
        public double interestRate3 { get; set; }
        public string loanPurpose3 { get; set; }
        public long cycle3 { get; set; }
        public long noOfInstallment3 { get; set; }
        public string morotorium3 { get; set; }
        public string repayMode3 { get; set; }
        public double firstInstallment3 { get; set; }
        public double lastInstallment3 { get; set; }
        public double processingFee3 { get; set; }
        public double insuranceAmount3 { get; set; }
        public long loanTenure3 { get; set; }
        public string insuranceCompany3 { get; set; }
        public string loandueDate3 { get; set; }
        //-----------------LoanCardInstallmentData---------------//

        //LoanCardInstallmentData 1st column
        public long installmentNo { get; set; }
        public string dueDate { get; set; }
        public string paidDate { get; set; }
        public string emi { get; set; }
        public string principleAmount { get; set; }
        public string interestAmount { get; set; }
        public string paidAmount { get; set; }
        public string balanceAmount { get; set; }

        //LoanCardInstallmentData 2st column
        public long installmentNo1 { get; set; }
        public string dueDate1 { get; set; }
        public string paidDate1 { get; set; }
        public string emi1 { get; set; }
        public string principleAmount1 { get; set; }
        public string interestAmount1 { get; set; }
        public string paidAmount1 { get; set; }
        public string balanceAmount1 { get; set; }

        //LoanCardInstallmentData 3rd column
        public long installmentNo2 { get; set; }
        public string dueDate2 { get; set; }
        public string paidDate2 { get; set; }
        public string emi2 { get; set; }
        public string principleAmount2 { get; set; }
        public string interestAmount2 { get; set; }
        public string paidAmount2 { get; set; }
        public string balanceAmount2 { get; set; }

        //LoanCardInstallmentData 4th column
        public long installmentNo3 { get; set; }
        public string dueDate3 { get; set; }
        public string paidDate3 { get; set; }
        public string emi3 { get; set; }
        public string principleAmount3 { get; set; }
        public string interestAmount3 { get; set; }
        public string paidAmount3 { get; set; }
        public string balanceAmount3 { get; set; }

        //LoanCardInstallmentData 5th column
        public long installmentNo4 { get; set; }
        public string dueDate4 { get; set; }
        public string paidDate4 { get; set; }
        public string emi4 { get; set; }
        public string principleAmount4 { get; set; }
        public string interestAmount4 { get; set; }
        public string paidAmount4 { get; set; }
        public string balanceAmount4 { get; set; }

        //LoanCardInstallmentData 6th column
        public long installmentNo5 { get; set; }
        public string dueDate5 { get; set; }
        public string paidDate5 { get; set; }
        public string emi5 { get; set; }
        public string principleAmount5 { get; set; }
        public string interestAmount5 { get; set; }
        public string paidAmount5 { get; set; }
        public string balanceAmount5 { get; set; }


        //LoanCardInstallmentData 7th column
        public long installmentNo6 { get; set; }
        public string dueDate6 { get; set; }
        public string paidDate6 { get; set; }
        public string emi6 { get; set; }
        public string principleAmount6 { get; set; }
        public string interestAmount6 { get; set; }
        public string paidAmount6 { get; set; }
        public string balanceAmount6 { get; set; }

        //LoanCardInstallmentData 8th column
        public long installmentNo7 { get; set; }
        public string dueDate7 { get; set; }
        public string paidDate7 { get; set; }
        public string emi7 { get; set; }
        public string principleAmount7 { get; set; }
        public string interestAmount7 { get; set; }
        public string paidAmount7 { get; set; }
        public string balanceAmount7 { get; set; }

        //LoanCardInstallmentData 9th column
        public long installmentNo8 { get; set; }
        public string dueDate8 { get; set; }
        public string paidDate8 { get; set; }
        public string emi8 { get; set; }
        public string principleAmount8 { get; set; }
        public string interestAmount8 { get; set; }
        public string paidAmount8 { get; set; }
        public string balanceAmount8 { get; set; }

        //LoanCardInstallmentData 10th column
        public long installmentNo9 { get; set; }
        public string dueDate9 { get; set; }
        public string paidDate9 { get; set; }
        public string emi9 { get; set; }
        public string principleAmount9 { get; set; }
        public string interestAmount9 { get; set; }
        public string paidAmount9 { get; set; }
        public string balanceAmount9 { get; set; }

        //LoanCardInstallmentData 11th column
        public long installmentNo10 { get; set; }
        public string dueDate10 { get; set; }
        public string paidDate10 { get; set; }
        public string emi10 { get; set; }
        public string principleAmount10 { get; set; }
        public string interestAmount10 { get; set; }
        public string paidAmount10 { get; set; }
        public string balanceAmount10 { get; set; }

        //LoanCardInstallmentData 12th column
        public long installmentNo11 { get; set; }
        public string dueDate11 { get; set; }
        public string paidDate11 { get; set; }
        public string emi11 { get; set; }
        public string principleAmount11 { get; set; }
        public string interestAmount11 { get; set; }
        public string paidAmount11 { get; set; }
        public string balanceAmount11 { get; set; }

        //LoanCardInstallmentData 13th column
        public long installmentNo12 { get; set; }
        public string dueDate12 { get; set; }
        public string paidDate12 { get; set; }
        public string emi12 { get; set; }
        public string principleAmount12 { get; set; }
        public string interestAmount12 { get; set; }
        public string paidAmount12 { get; set; }
        public string balanceAmount12 { get; set; }

        //LoanCardInstallmentData 14th column
        public long installmentNo13 { get; set; }
        public string dueDate13 { get; set; }
        public string paidDate13 { get; set; }
        public string emi13 { get; set; }
        public string principleAmount13 { get; set; }
        public string interestAmount13 { get; set; }
        public string paidAmount13 { get; set; }
        public string balanceAmount13 { get; set; }

        //LoanCardInstallmentData 15th column
        public long installmentNo14 { get; set; }
        public string dueDate14 { get; set; }
        public string paidDate14 { get; set; }
        public string emi14 { get; set; }
        public string principleAmount14 { get; set; }
        public string interestAmount14 { get; set; }
        public string paidAmount14 { get; set; }
        public string balanceAmount14 { get; set; }

        //LoanCardInstallmentData 16th column
        public long installmentNo15 { get; set; }
        public string dueDate15 { get; set; }
        public string paidDate15 { get; set; }
        public string emi15 { get; set; }
        public string principleAmount15 { get; set; }
        public string interestAmount15 { get; set; }
        public string paidAmount15 { get; set; }
        public string balanceAmount15 { get; set; }

        //LoanCardInstallmentData 17th column
        public long installmentNo16 { get; set; }
        public string dueDate16 { get; set; }
        public string paidDate16 { get; set; }
        public string emi16 { get; set; }
        public string principleAmount16 { get; set; }
        public string interestAmount16 { get; set; }
        public string paidAmount16 { get; set; }
        public string balanceAmount16 { get; set; }

        //LoanCardInstallmentData 18th column
        public long installmentNo17 { get; set; }
        public string dueDate17 { get; set; }
        public string paidDate17 { get; set; }
        public string emi17 { get; set; }
        public string principleAmount17 { get; set; }
        public string interestAmount17 { get; set; }
        public string paidAmount17 { get; set; }
        public string balanceAmount17 { get; set; }

        //LoanCardInstallmentData 19th column
        public long installmentNo18 { get; set; }
        public string dueDate18 { get; set; }
        public string paidDate18 { get; set; }
        public string emi18 { get; set; }
        public string principleAmount18 { get; set; }
        public string interestAmount18 { get; set; }
        public string paidAmount18 { get; set; }
        public string balanceAmount18 { get; set; }

        //LoanCardInstallmentData 20th column
        public long installmentNo19 { get; set; }
        public string dueDate19 { get; set; }
        public string paidDate19 { get; set; }
        public string emi19 { get; set; }
        public string principleAmount19 { get; set; }
        public string interestAmount19 { get; set; }
        public string paidAmount19 { get; set; }
        public string balanceAmount19 { get; set; }

        //LoanCardInstallmentData 21th column
        public long installmentNo20 { get; set; }
        public string dueDate20 { get; set; }
        public string paidDate20 { get; set; }
        public string emi20 { get; set; }
        public string principleAmount20 { get; set; }
        public string interestAmount20 { get; set; }
        public string paidAmount20 { get; set; }
        public string balanceAmount20 { get; set; }

        //LoanCardInstallmentData 22th column
        public long installmentNo21 { get; set; }
        public string dueDate21 { get; set; }
        public string paidDate21 { get; set; }
        public string emi21 { get; set; }
        public string principleAmount21 { get; set; }
        public string interestAmount21 { get; set; }
        public string paidAmount21 { get; set; }
        public string balanceAmount21 { get; set; }

        //LoanCardInstallmentData 23th column
        public long installmentNo22 { get; set; }
        public string dueDate22 { get; set; }
        public string paidDate22 { get; set; }
        public string emi22 { get; set; }
        public string principleAmount22 { get; set; }
        public string interestAmount22 { get; set; }
        public string paidAmount22 { get; set; }
        public string balanceAmount22 { get; set; }

        //LoanCardInstallmentData 24th column
        public long installmentNo23 { get; set; }
        public string dueDate23 { get; set; }
        public string paidDate23 { get; set; }
        public string emi23 { get; set; }
        public string principleAmount23 { get; set; }
        public string interestAmount23 { get; set; }
        public string paidAmount23 { get; set; }
        public string balanceAmount23 { get; set; }

        //LoanCardInstallmentData 25th column
        public long installmentNo24 { get; set; }
        public string dueDate24 { get; set; }
        public string paidDate24 { get; set; }
        public string emi24 { get; set; }
        public string principleAmount24 { get; set; }
        public string interestAmount24 { get; set; }
        public string paidAmount24 { get; set; }
        public string balanceAmount24 { get; set; }

        //LoanCardInstallmentData 26th column
        public long installmentNo25 { get; set; }
        public string dueDate25 { get; set; }
        public string paidDate25 { get; set; }
        public string emi25 { get; set; }
        public string principleAmount25 { get; set; }
        public string interestAmount25 { get; set; }
        public string paidAmount25 { get; set; }
        public string balanceAmount25 { get; set; }
    }
}
