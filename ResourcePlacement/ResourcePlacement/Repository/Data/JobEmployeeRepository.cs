using ResourcePlacement.Context;
using ResourcePlacement.Model;
using ResourcePlacement.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ResourcePlacement.Repository.Data
{
    public class JobEmployeeRepository : GeneralRepository<MyContext, JobEmployee, string>
    {

        private readonly MyContext myContext;
        public JobEmployeeRepository(MyContext myContext) : base(myContext)
        {
            this.myContext = myContext;
        }

        public IEnumerable<JobEmployeeVM> GetJobEmployeeVM()
        {
            var getJobEmployeeVMs = (from e in myContext.Employees
                                join je in myContext.JobEmployees on e.Id equals je.EmployeeId
                                join j in myContext.Jobs on je.JobId equals j.Id
                                join c in myContext.Companies on j.CompanyId equals c.Id
                                select new JobEmployeeVM
                                {
                                    IdEmployee = e.Id,
                                    FullName = e.FirstName + " " + e.LastName,
                                    IdJob = j.Id,
                                    TitleJob = j.Title,
                                    Company = c.Name,
                                    Status = je.Status,

                                }).ToList();
            if (getJobEmployeeVMs.Count == 0)
            {
                return null;
            }
            return getJobEmployeeVMs;
        }

        public string Email(string password, string email)//tambah string email kalo mau kirim email sesuai email yg di input di model forgot password
        {
            try
            {
                DateTime today = DateTime.Now;
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("ercheriom@gmail.com");//email pengirim
                message.To.Add(email);//email penerima (email testing atau string email yg disebut diatas)
                message.Subject = $"Reset Password Request From NETCoreTester {today.Date}";
                message.Body = $"Password anda sudah kami reset menjadi {password}";
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com";
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("ercheriom@gmail.com", "Vongola_123"); //self explanatory
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
                return "Email berhasil Dikirim";
            }
            catch (Exception e)
            {
                return e.Message;
            }
        }
    }
}
