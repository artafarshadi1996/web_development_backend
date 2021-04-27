using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimeTool.Models
{
    public class Timecard
    {
        [Key]
        public int TimecardId { get; set; }
        [DisplayName("Employee Name")]
        public int EmployeeId { get; set; }
        [DisplayName("Hours Worked")]
        [Required(ErrorMessage = "Hours Worked is Required")]
        public double Hours { get; set; }
        [DisplayName("Date")]
        [Required(ErrorMessage = "Date is Required")]
        [DataType(DataType.Date)]
        public DateTime Date { get; set; }
        [DisplayName("In Time")]
        [Required(ErrorMessage = "In Time is Required")]
        [DataType(DataType.Time)]
        public TimeSpan InTime { get; set; }
        [DisplayName("Out Time")]
        [Required(ErrorMessage = "Out Time is Required")]
        [DataType(DataType.Time)]
        public TimeSpan OutTime { get; set; }

        public Employee Employees { get; set; }
    }
}
