using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace EmployeeTimeTool.Models
{
    public class Department
    {
        [Key]
        public int DepartmentId { get; set; }
        [DisplayName("Department")]
        [Required(ErrorMessage = "Department is Required")]
        public string DepartmentName { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}
