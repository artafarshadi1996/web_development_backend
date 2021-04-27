using EmployeeTimeTool.Services;
using EmployeeTimeTool.Models;
using System.Net.Http;
using System.Net.Http.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EmployeeTimeTool.Repository
{
    public class EmployeeRepository : IEmployee
    {
        private readonly HttpClient httpClient;
        public EmployeeRepository(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }
        // public IEnumerable<Employee> GetEmployees => db.Employees.Include(global => global.Departments);

        public void Add(Employee _Employee)
        {
            if (_Employee.id == 0)
            {
                // db.Employees.Add(_Employee);
                // db.SaveChanges();
            }
            else
            {
                // var dbEntity = db.Employees.Find(_Employee.EmployeeId);
                // dbEntity.FirstName = _Employee.FirstName;
                // dbEntity.LastName = _Employee.LastName;
                // dbEntity.DepartmentId = _Employee.DepartmentId;
                // db.SaveChanges();
            }
        }

        public async Task<List<Employee>> GetEmployee(int? Id)
        {
            // Employee dbEntity = db.Employees.Include(e=>e.Timecards)
            //                                 .Include(d=>d.Departments)
            //                                 .SingleOrDefault(m=>m.EmployeeId==Id);
            // return dbEntity;
            return await httpClient.GetFromJsonAsync<List<Employee>>(String.Format("https://www.api.thetheartafarshadi.com/COMP351/API/V1/employees/{0}",Id));
        }

        public void Remove(int? Id)
        {
            // Employee dbEntity = db.Employees.Find(Id);
            // db.Employees.Remove(dbEntity);
            // db.SaveChanges();
        }

        public void Update(Employee employee) {
            String url = String.Format("https://www.api.thetheartafarshadi.com/COMP351/API/V1/employees/{0}", employee.id);
            //String url = "https://httpbin.org/put";
            var response = httpClient.PutAsJsonAsync<Employee>(url,employee).Result;
            //var response = await httpClient.PutAsJsonAsync<Employee>(url,employee);
            //bool returnValue = await response.Content.ReadAsAsync<bool>();
        }
    }
}
