using EmployeeTimeTool.Services;
using EmployeeTimeTool.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimeTool.Controllers
{
    public class DepartmentController : Controller
    {
        private readonly IDepartment _Department;
        public DepartmentController(IDepartment _IDepartment)
        {
            _Department = _IDepartment;
        }
        public IActionResult Index()
        {
            return View(_Department.GetDepartments);
        }
        [HttpGet]
        public IActionResult Create()
        {
            Department model = new Department();
            model.DepartmentId = 0;
            return View(model);
        }
        [HttpPost]
        public IActionResult Create(Department model)
        {
            if (ModelState.IsValid)
            {
                _Department.Add(model);
                return RedirectToAction("Index");
            }
            return View();
        }
        public IActionResult Delete(int? Id)
        {
            if (Id == null)
            {
                return NotFound();
            }
            else
            {
                Department model = _Department.GetDepartment(Id);
                return View(model);
            }
        }
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirm(int? Id)
        {
            _Department.Remove(Id);
            return RedirectToAction("Index");
        }
        [HttpGet]
        public IActionResult Details(int? Id)
        {
            return View(_Department.GetDepartment(Id));
        }
        public IActionResult Edit(int? Id)
        {
            var model = _Department.GetDepartment(Id);
            return View("Create", model);
        }
    }
}