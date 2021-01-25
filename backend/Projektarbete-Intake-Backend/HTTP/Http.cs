using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Projektarbete_Intake_Backend.HTTP
{
    public class Http : ControllerBase
    {
        private static readonly string foodApi = "https://trackapi.nutritionix.com/v2/search/instant?self=false&query=";
        private static readonly string appId = "ca743281";
        private static readonly string appKey = "8de9ae6cf37d39687a6d06b48fe45c07";

        public async static Task<string> Search(string query)
        {
            string searchQuery = foodApi + query;
            try
            {
                //We will now define your HttpClient with your first using statement which will use a IDisposable.
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("x-app-id", appId);
                    client.DefaultRequestHeaders.Add("x-app-key", appKey);
                    //In the next using statement you will initiate the Get Request, use the await keyword so it will execute the using statement in order.
                    //The HttpResponseMessage which contains status code, and data from response.
                    using (HttpResponseMessage res = await client.GetAsync(searchQuery))
                    {
                        

                        //Then get the data or content from the response in the next using statement, then within it you will get the data, and convert it to a c# object.
                        using (HttpContent content = res.Content)
                        {
                            //Now assign your content to your data variable, by converting into a string using the await keyword.
                            return await content.ReadAsStringAsync();
                        }
                    }
                }
            }
            catch (Exception exception)
            {
                return null;
            }
        }
    }
}
