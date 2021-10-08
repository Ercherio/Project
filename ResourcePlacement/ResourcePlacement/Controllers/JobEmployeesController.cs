using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResourcePlacement.Base;
using ResourcePlacement.Model;
using ResourcePlacement.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResourcePlacement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobEmployeesController : BaseController<JobEmployee, JobEmployeeRepository, string>
    {
        private readonly JobEmployeeRepository jobEmployeeRepository;
        public JobEmployeesController(JobEmployeeRepository repository) : base(repository)
        {
            this.jobEmployeeRepository = repository;
        }


        [HttpGet("GetJobEmployee")]
        public ActionResult GetJobEmployeeVM()
        {
            var jobEmployees = jobEmployeeRepository.GetJobEmployeeVM();
            if (jobEmployees == null)
            {
                return NotFound(jobEmployees);
                //return StatusCode((int)HttpStatusCode.NotFound, new { status = (int)HttpStatusCode.NotFound, data = "No result" });
            }
            else
            {
                return Ok(jobEmployees);
                //return StatusCode((int)HttpStatusCode.OK, new { status = (int)HttpStatusCode.OK, data = person });
            }
        }
    }
}
