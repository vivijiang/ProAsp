using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ProASP.Models;

namespace ProASP.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            int hour = DateTime.Now.Hour;
            ViewBag.Greeting = hour < 12 ? "Good Morning" : "Good Afternoon";
            return View();
        }

        [HttpGet]
        public ViewResult RegisterForm()
        {
            return View();
        }

        [HttpPost]
        public ViewResult RegisterForm(GuestResponse guestResponse)
        {
            //todo: Email to the party oganizer
            return View("Thanks", guestResponse);
        }

        [HttpGet]
        public ViewResult Stamp()
        {
            return View();
        }
    }
}
