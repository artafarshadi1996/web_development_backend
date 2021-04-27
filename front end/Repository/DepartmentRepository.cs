using EmployeeTimeTool.Models;
using EmployeeTimeTool.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimeTool.Repository
{
    public class DepartmentRepository : IDepartment
    {
        private DB_Context db;
        public DepartmentRepository(DB_Context _db)
        {
            db = _db;
        }
        public IEnumerable<Department> GetDepartments => db.Departments;

        public void Add(Department _Department)
        {
            if (_Department.DepartmentId == 0)
            {
                db.Departments.Add(_Department);
                db.SaveChanges();
            }
            else
            {
                var dbEntity = db.Departments.Find(_Department.DepartmentId);
                dbEntity.DepartmentName = _Department.DepartmentName;
                db.SaveChanges();
            }
        }

        public Department GetDepartment(int? Id)
        {
            Department dbEntity = db.Departments.Include(e=>e.Employees)
                                                   .SingleOrDefault(m=>m.DepartmentId==Id);
            return dbEntity;
        }

        public void Remove(int? Id)
        {
            Department dbEntity = db.Departments.Find(Id);
            db.Departments.Remove(dbEntity);
            db.SaveChanges();
        }
    }
}
