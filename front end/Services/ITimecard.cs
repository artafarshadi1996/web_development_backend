using EmployeeTimeTool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimeTool.Services
{
    public interface ITimecard
    {
        IEnumerable<Timecard> GetTimecards { get; }
        Timecard GetTimecard(int? Id);
        void Add(Timecard _Timecard);
        void Remove(int? Id);
    }
}
