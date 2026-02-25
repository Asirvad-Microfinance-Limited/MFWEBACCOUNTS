using System;
using System.Collections.Generic;
using System.Text;

namespace DTO.MFGeneralAPI.Response
{
    public class ImageResponse
    {
        #region ImagesResponse
        /// <summary>
        /// API Number : GEN016
        /// Created on : 24-Jan-2020
        /// Created By : 100272
        /// Description: Retrieve ImageIDs from Mongo DB for various cases
        /// Modify Date:
        /// Modify By  : 
        /// Description:
        /// </summary>
        /// 
        public ImageResponse()
        {
            isDataAvilable = false;
        }
        public bool isDataAvilable { get; set; }
        public byte[] imageString { get; set; }
    }
    #endregion
}
