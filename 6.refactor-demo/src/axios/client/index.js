

import axios  from './dist/axios/axios.js'


axios({
    url: "/api/addParameters",
    method: "post",
    data: {
      msg: "hi"
    }
});