using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MFWEBACCOUNTS
{/// <summary>
 /// <CreatedBy> Nithin (100367) </CreatedBy>
 /// <CreatedOn> 31-Aug-2021 </CreatedOn>
 /// </summary>

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class NoDirectAccessAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var a = filterContext.HttpContext.Request.Headers["Referer"].ToString();
            if (a == "")
            {
                filterContext.Result = new RedirectToRouteResult(new
                                          RouteValueDictionary(new { controller = "Home", action = "accessdenied" }));
            }
        }
    }
}

