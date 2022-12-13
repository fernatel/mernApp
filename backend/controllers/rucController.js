const asyncHandler = require('express-async-handler')
const axios = require('axios');


const getRuc = asyncHandler(async (req, res) => {
 
      await axios({
          method: "get",
          url:  `https://api.apis.net.pe/v1/ruc/?numero=${req.params.ruc}` ,  
                  
          headers: {
            Authorization:`Bearer apis-token-3373.3YXXyRwEnNM8ljXr8wqko98B290yfDrx`,
          },
        }).then((response) => {    
         res.json(response.data.nombre)          
        })
  })


  module.exports = {
    getRuc,
  }
  

