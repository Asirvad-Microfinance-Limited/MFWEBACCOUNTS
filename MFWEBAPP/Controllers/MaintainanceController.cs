using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MFWEBAPP.Controllers
{
    public class MaintainanceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("restrictmembercreation")]
        public IActionResult RestrictMemberCreation()
        {
            return View();
        }

        [HttpGet("restrictmembercreationview")]
        public IActionResult RestrictMemberCreationView()
        {
            return PartialView("RestrictMemberCreationView");
        }
        [HttpGet("operationallevel")]
        public IActionResult OperationalLevel()
        {
            return View();
        }

        [HttpGet("operationalsublevel")]
        public IActionResult OperationalSubLevel()
        {
            return View();
        }
        [HttpGet("usertypedetails")]
        public IActionResult UserTypeDetails()
        {
            return View();
        }
        [HttpGet("userdetails")]
        public IActionResult UserDetails()
        {
            return View();
        }
        [HttpGet("userroledetails")]
        public IActionResult UserRoleDetails()
        {
            return View();
        }
        [HttpGet("userroleassign")]
        public IActionResult UserRoleAssign()
        {
            return View();
        }
        [HttpGet("setrules")]
        public IActionResult SetRules()
        {
            return View();
        }
        [HttpGet("setgeneralparams")]
        public IActionResult SetGeneralParams()
        {
            return View();
        }
        [HttpGet("assigncenter")]
        public IActionResult AssignCenter()
        {
            return View();
        }
        [HttpGet("roleuserassign")]
        public IActionResult RoleUserAssign()
        {
            return View();
        }
        [HttpGet("reportaccess")]
        public IActionResult ReportAccess()
        {
            return View();
        }
    }
}