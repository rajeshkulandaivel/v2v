using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Web.Script.Serialization;

namespace Service_for_android
{
    [DataContract]
    public class GPS
    {
        [DataMember]
        public string Number { get; set; }

        [DataMember]
        public string latitude { get; set; }

        [DataMember]
        public string longitude { get; set; }

        public partial class GPSData
        {
            private static readonly GPSData _instance = new GPSData();

            private GPSData() { }

            public static GPSData Instance
            {
                get
                {
                    return _instance;
                }
            }

            private List<GPS> gpsList = new List<GPS>()
            {
                /*  new Employee() { EmpId  = 1, Fname = "Sam", Lname = "kumar", JoinDate=new DateTime(2010,7, 21), Age=30,Salary=10000,Designation="Software Engineer"},
                  */
            };

            public List<GPS> GPSList
            {
                get
                {
                    return gpsList;
                }
            }

            public void addloc(string jsonLoc)
            {
                JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
                GPS gps1 = jsonSerializer.Deserialize<GPS>(jsonLoc);
                GPSList.Add(gps1);
            }
            public void updateloc(string jsonLoc)
            {
                JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
                GPS gps1 = jsonSerializer.Deserialize<GPS>(jsonLoc);
                GPS existing = GPSList.Find(p => p.Number == gps1.Number);

                if (existing == null)
                    throw new KeyNotFoundException("");

                existing.latitude = gps1.latitude;
                existing.longitude = gps1.longitude;
            }

            public List<GPS> nearbyDev(string num)
            {
                List<GPS> gpslist1 = new List<GPS>();
                JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
                GPS gps1 = jsonSerializer.Deserialize<GPS>(num);
                GPS existing = GPSList.Find(p => p.Number == gps1.Number);

                if (existing == null)
                    throw new KeyNotFoundException("");
                double latitude = Convert.ToDouble(existing.latitude);
                double longitude = Convert.ToDouble(existing.longitude);
                foreach (GPS gps in GPSList)
                {
                    if (((Convert.ToDouble(gps.latitude) - latitude) <= 0.0001)|| ((Convert.ToDouble(gps.longitude) - longitude) <= 0.0001))
                    {
                       gpslist1.Add(gps);
                    }
                        
                }

                /*JavaScriptSerializer jsr = new JavaScriptSerializer();
                jsr.Serialize(gpslist1);*/
                return gpslist1;
            }

            
            public string Receive_Message(string input, string number)
            {
                List<GPS> gpslist1 = new List<GPS>();
                foreach (GPS gps in gpslist1)
                {
                    GPS existing = GPSList.Find(p => p.Number == number);

                    if (existing == null)
                    { throw new KeyNotFoundException("");
                        return null;
                    }
                

                return input;
                    
                    
                }
                return null;
            }

        }
    }

        [DataContract]
        public class Employee
        {
            [DataMember]
            public string Number { get; set; }
            [DataMember]
            public string Brand { get; set; }
            [DataMember]
            public string Color { get; set; }
            [DataMember]
            public string CarText { get; set; }
            
        }


        public partial class EmployeeData
        {
            private static readonly EmployeeData _instance = new EmployeeData();

            private EmployeeData() { }

            public static EmployeeData Instance
            {
                get
                {
                    return _instance;
                }
            }


            private List<Employee> empList = new List<Employee>()
            {
                  new Employee() { Number  = "123456789", Brand = "abc", Color = "black", CarText ="Hello"},
                  
            };

            public List<Employee> EmployeeList
            {
                get
                {
                    return empList;
                }
            }


           
            public void Add(string jsonInput)
            {
                 
                 JavaScriptSerializer jsonSerializer = new JavaScriptSerializer();
                Employee emp1 = jsonSerializer.Deserialize<Employee>(jsonInput);               
                empList.Add(emp1);
            }
        }

    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IRestServiceImpl" in both code and config file together.
    [ServiceContract]
    public interface IRestServiceImpl
    {
        [OperationContract]
        [WebGet(BodyStyle = WebMessageBodyStyle.Wrapped,
            ResponseFormat = WebMessageFormat.Json,
            UriTemplate = "json/{id}")]
        string JSONData(string id);

        [OperationContract]
        [WebGet(BodyStyle = WebMessageBodyStyle.Wrapped,
            ResponseFormat = WebMessageFormat.Json,
            UriTemplate = "Receive_Message")]
        void Receive_Message(string id,string number);

        
        [WebGet(UriTemplate = "Employee",
            ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        List<Employee> GetAllEmployeeDetails();

        [WebGet(UriTemplate = "Nearby_Devices",
            ResponseFormat = WebMessageFormat.Json)]
        [OperationContract]
        List<GPS> Nearby_Devices();

        /*   [WebGet(UriTemplate = "Employee?id={id}",
               ResponseFormat = WebMessageFormat.Json)]
           [OperationContract]
           Employee GetEmployee(int Id);*/

        [WebInvoke(Method = "POST", UriTemplate = "UserPOST", 
            ResponseFormat = WebMessageFormat.Json, 
            RequestFormat = WebMessageFormat.Json)]
        [OperationContract]
        void AddUser(string jsonInput);

        [WebInvoke(Method = "POST", UriTemplate = "UserLOC",
           ResponseFormat = WebMessageFormat.Json,
           RequestFormat = WebMessageFormat.Json)]
        [OperationContract]
        void AddLocation(string jsonInput);

        [WebInvoke(Method = "PUT", UriTemplate = "UpdateLOC",
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json)]
        [OperationContract]
        void UpdateLocation(string jsonloc);

       
    }

  

}
