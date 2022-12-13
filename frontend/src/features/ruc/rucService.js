import axios from 'axios'




const API_URL= 'https://apifacturacion.com/doc/'

axios({
    method: "get",
    url: url,
    headers: {
      Authorization: `Bearer ${process.env.TOKEN}`,
    },
  }).then((response) => {
  
    console.log(response.data);
  
  }).catch((error) => {
    console.error(error);
  });
  
