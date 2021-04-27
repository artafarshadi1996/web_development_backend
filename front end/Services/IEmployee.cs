using EmployeeTimeTool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimeTool.Services
{
    public interface IEmployee
    {
        // IEnumerable<Employee> GetEmployees { get; }
        Task<List<Employee>> GetEmployee(int? Id);
        void Add(Employee _Employee);
        void Remove(int? Id);
        void Update(Employee employee);
    }
}
