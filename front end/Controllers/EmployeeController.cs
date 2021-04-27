using EmployeeTimeTool.Services;
using EmployeeTimeTool.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimeTool.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly IEmployee _Employee;
        private readonly IDepartment _Department;
        public EmployeeController(IEmployee _IEmployee, IDepartment _IDepartment)
        {
            _Employee = _IEmployee;
            _Department = _IDepartment;
        }
        public IActionResult Index()
        {
            return View();
            //return View(_Employee.GetEmployees);
        }
        [HttpGet]
        public IActionResult Create()
        {
            Employee model = new Employee();
            model.id = 0;
            //ViewBag.Departments = _Department.GetDepartments;
            //return View(model);
            return View();
        }
        [HttpPost]
        public IActionResult Create(Employee model)
        {
            if (ModelState.IsValid)
            {
                _Employee.Add(model);
                return RedirectToAction("Index");
            }
            return View(model);

        }
        public IActionResult Delete(int? Id)
        {
            if (Id == null)
            {

            }
            else
            {
                _Employee.Remove(Id);
                return RedirectToAction("Index");
            }
            return View();
        }
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirm(int? Id)
        {
            _Employee.Remove(Id);
            return RedirectToAction("Index");
        }
        [HttpGet]
        public IActionResult Details(int? Id)
        {
            try {
                var model = _Employee.GetEmployee(Id);           
                return View(model.Result);
            } catch (AggregateException e) {
                return View(new List<Employee>());
            }
        }

        [HttpGet]
        public IActionResult Edit(int? Id)
        {
            var model = _Employee.GetEmployee(Id).Result;
            return View(model[0]);
        }

        [HttpPost]
        public IActionResult Edit(int? Id, Employee employee)
        {
            _Employee.Update(employee);
            return Redirect(String.Format("/Employee/Details?id={0}",Id));
        }
    }
}
