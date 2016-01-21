using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace Service_for_android
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the class name "RestServiceImpl" in code, svc and config file together.
    // NOTE: In order to launch WCF Test Client for testing this service, please select RestServiceImpl.svc or RestServiceImpl.svc.cs at the Solution Explorer and start debugging.
  //  [AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
    public class RestServiceImpl : IRestServiceImpl
    {
        #region IRestService Members

        public string JSONData(string id)
        {
            return "Your product is " + id;
        }
        public List<Employee> GetAllEmployeeDetails()
        {
            return EmployeeData.Instance.EmployeeList;
        }

        public List<GPS> Nearby_Devices()
        {
            return GPS.GPSData.Instance.GPSList;
        }

        /*  public Employee GetEmployee(int id)
          {
              IEnumerable<Employee> empList = EmployeeData.Instance.EmployeeList.Where(x => x.EmpId == id);

              if (empList != null)
                  return empList.First<Employee>();
              else
                  return null;
          }*/


        public void AddUser(string jsoninput)
        {
            EmployeeData.Instance.Add(jsoninput);
        }

        public void AddLocation(string jsonloc)
        {
            GPS.GPSData.Instance.addloc(jsonloc);
        }

        public void UpdateLocation(string jsonloc)
        {
            GPS.GPSData.Instance.updateloc(jsonloc);
        }

       public void Receive_Message(string id,string number)
        {
            GPS.GPSData.Instance.Receive_Message(id, number);
        }
    }
    #endregion
}
