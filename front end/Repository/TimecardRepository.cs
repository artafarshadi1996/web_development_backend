using EmployeeTimeTool.Models;
using EmployeeTimeTool.Services;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimeTool.Repository
{
    public class TimecardRepository : ITimecard
    {
        private DB_Context db;
        public TimecardRepository(DB_Context _db)
        {
            db = _db;
        }
        public IEnumerable<Timecard> GetTimecards => db.Timecards.Include(global => global.Employees);

        public void Add(Timecard _Timecard)
        {
            if (_Timecard.TimecardId == 0)
            {
                db.Timecards.Add(_Timecard);
                db.SaveChanges();
            }
            else
            {
                var dbEntity = db.Timecards.Find(_Timecard.TimecardId);
                dbEntity.EmployeeId = _Timecard.EmployeeId;
                dbEntity.Hours = _Timecard.Hours;
                dbEntity.Date = _Timecard.Date;
                dbEntity.InTime = _Timecard.InTime;
                dbEntity.OutTime = _Timecard.OutTime;
                db.SaveChanges();
            }    
        }

        public Timecard GetTimecard(int? Id)
        {
            Timecard dbEntity = db.Timecards.Find(Id);
            return dbEntity;
        }

        public void Remove(int? Id)
        {
            Timecard dbEntity = db.Timecards.Find(Id);
            db.Timecards.Remove(dbEntity);
            db.SaveChanges();
        }
    }
}
