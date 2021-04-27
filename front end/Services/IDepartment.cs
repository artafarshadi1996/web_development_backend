using EmployeeTimeTool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimeTool.Services
{
    public interface IDepartment
    {
        IEnumerable<Department> GetDepartments { get; }
        Department GetDepartment(int? Id);
        void Add(Department _Department);
        void Remove(int? Id);
    }
}
