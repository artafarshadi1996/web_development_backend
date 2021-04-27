using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace EmployeeTimeTool.Models
{
    public class Employee
    {
        [Key]
        public int id { get; set; }

        [Obsolete("Remove")]
        public int EmployeeId { get; set; }
        
        [Obsolete("Remove")]
        [DisplayName("First Name")]
        [Required(ErrorMessage = "First Name is Required")]
        public string FirstName { get; set; }
        
        [Obsolete("Remove")]
        [DisplayName("Last Name")]
        [Required(ErrorMessage = "Last Name is Required")]
        public string LastName { get; set; }

        [DisplayName("Name")]
        public string name { get; set; }
        
        // TODO: Remove
        [DisplayName("Department")]
        public int DepartmentId { get; set; }
        public Department Departments { get; set; }
        public ICollection<Timecard> Timecards { get; set; }
    }
}
