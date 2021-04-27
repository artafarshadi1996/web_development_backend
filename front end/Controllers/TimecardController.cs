using EmployeeTimeTool.Services;
using EmployeeTimeTool.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimeTool.Controllers
{
    public class TimecardController : Controller
    {
        private readonly ITimecard _Timecard;
        private readonly IEmployee _Employee;
        public TimecardController(ITimecard _ITimecard, IEmployee _IEmployee)
        {
            _Timecard = _ITimecard;
            _Employee = _IEmployee;
        }
        public IActionResult Index()
        {
            return View(_Timecard.GetTimecards);
        }
        [HttpGet]
        public IActionResult Create()
        {
            Timecard model = new Timecard();
            model.TimecardId = 0;
            //ViewBag.Employees = _Employee.GetEmployees;
            return View(model);
        }
        [HttpPost]
        public IActionResult Create(Timecard model)
        {
            if (ModelState.IsValid)
            {
                _Timecard.Add(model);
                return RedirectToAction("Index");
            }
            return View(model);
        }
        public IActionResult Delete(int? Id)
        {
            if (Id == null)
            {
                return NotFound();
            }
            else
            {
                Timecard model = _Timecard.GetTimecard(Id);
                return View(model);
            }
        }
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirm(int? Id)
        {
            _Timecard.Remove(Id);
            return RedirectToAction("Index");
        }
        [HttpGet]
        public IActionResult Details(int? Id)
        {
            return View(_Timecard.GetTimecard(Id));
        }
        public IActionResult Edit(int? Id)
        {
            var model = _Timecard.GetTimecard(Id);
            return View("Create", model);
        }
    }
}