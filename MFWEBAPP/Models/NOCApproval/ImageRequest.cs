
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DTO.MFGeneralAPI.Request
{
   public class ImageRequest
    {
        #region ImagesRequest
        /// <summary>
        /// API Number : GEN016
        /// Created on : 24-Jan-2020
        /// Created By : 100199
        /// Description: Retrieve ImageIDs from Mongo DB for various cases
        /// Modify Date:
        /// Modify By  : 
        /// Description:
        /// </summary>
        /// 

       
        public string recordingId { get; set; }
        
        public string collectionName { get; set; }
    }
    #endregion
}
