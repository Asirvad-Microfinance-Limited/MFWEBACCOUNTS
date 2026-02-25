using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace Config
{
  public class Manager
    {

        public Tuple<T, string> InvokePostHttpClient<T, F>(F obj, string url, string authToken = null)
        {

            string baseUrl = url;
            HttpResponseMessage response = new HttpResponseMessage() { StatusCode = HttpStatusCode.BadRequest };
            string contents = JsonConvert.SerializeObject(obj);
            var jsonResponse = string.Empty;
            Object ob = new object();
            try
            {
                using (var httpClient = new HttpClient())
                {
                    if (authToken != null)
                    {
                        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(authToken);
                    }

                    response = httpClient.PostAsync(baseUrl, new StringContent(contents, Encoding.UTF8, "application/json")).Result;
                    if (response.IsSuccessStatusCode)
                    {
                        jsonResponse = response.Content.ReadAsStringAsync().Result.ToString();
                        ob = JsonConvert.DeserializeObject<T>(jsonResponse);
                        return Tuple.Create((T)ob, jsonResponse);
                    }
                    else
                    {
                        T Obj = Activator.CreateInstance<T>();
                        jsonResponse = response.Content.ReadAsStringAsync().Result.ToString();
                        return Tuple.Create(Obj, jsonResponse);
                    }


                }

            }
            catch (Exception ex)
            {
                T Obj = Activator.CreateInstance<T>();
                jsonResponse = response.Content.ReadAsStringAsync().Result.ToString();
                return Tuple.Create(Obj, jsonResponse);

            }

        }
    }
}
