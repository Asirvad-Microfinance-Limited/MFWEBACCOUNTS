using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Config
{
   public class AppConfigManager
    {

        #region summary
        /// <summary>       
        /// Created on : 16-apr-2020
        /// Created By :Afsal Rahman a
        /// Description: AppConfigManager
        /// Modify Date:
        /// Modify By  : 
        /// Description:
        /// </summary>

        #endregion

        #region Declarations
    
       
        public static string Domain_Url;
        public static string MFPUBLICCUSTOMERAPI_URL;
        public static string MFPUBLICLOSAPI_URL;
        public static string MFPUBLICLMSAPI_URL;
        public static string MFAADHARAPI_URL;
        public static string MFPUBLICACCOUNTSAPI_URL;



        #endregion

        #region AppConfigManager
        public AppConfigManager()
        {
            string property = string.Empty;

            try
            {
                //-----DB Connection-----//
                var configurationBuilder = new ConfigurationBuilder();

                var path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
                configurationBuilder.AddJsonFile(path, false);
                var root = configurationBuilder.Build();

                Domain_Url = root.GetSection("SiteUrls").GetSection("DOMAIN_URL").Value;
                MFPUBLICCUSTOMERAPI_URL = root.GetSection("SiteUrls").GetSection("MFPUBLICCUSTOMERAPI_URL").Value;
                MFPUBLICLOSAPI_URL = root.GetSection("SiteUrls").GetSection("MFPUBLICLOSAPI_URL").Value;
                MFPUBLICLMSAPI_URL = root.GetSection("SiteUrls").GetSection("MFPUBLICLMSAPI_URL").Value;
                MFAADHARAPI_URL = root.GetSection("SiteUrls").GetSection("MFAADHARAPI_URL").Value;
                MFPUBLICACCOUNTSAPI_URL = root.GetSection("SiteUrls").GetSection("MFPUBLICACCOUNTSAPI_URL").Value;
                //baseUrl = root.GetSection("ClientSettings").GetSection("baseUrl").Value;
                //siteUrl = root.GetSection("ClientSettings").GetSection("siteUrl").Value;
                //EquifaxapiUrl = root.GetSection("EQUIFAXUrl").Value;
                //var sharedFolderName = root.GetSection("AppSettingPath").Value;
                //var sharedFolderPath = @"../" + sharedFolderName;
                //sharedPath = System.IO.Path.GetFullPath(sharedFolderPath);





            }
            catch (Exception exception)
            {
                string stackTrace = exception.StackTrace;
            }

        }

        #endregion

        #region Properties

        public string getDomainUrl
        {
            get => Domain_Url;
        }
        public string getPublicCustomerApi
        {
            get => MFPUBLICCUSTOMERAPI_URL;
        }

        public string getPublicLosApi
        {
            get => MFPUBLICLOSAPI_URL;
        }

        public string getPublicLmsApi
        {
            get => MFPUBLICLMSAPI_URL;
        }

        public string getPublicKycApi
        {
            get => MFAADHARAPI_URL;
        }
        public string getPublicAccountsApi
        {
            get => MFPUBLICACCOUNTSAPI_URL;
        }
        #endregion
    }
}
