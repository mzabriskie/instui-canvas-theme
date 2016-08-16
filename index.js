var axios = require('axios')

console.log('Attempting to fetch branding variables from Canvas LMS...')
axios.get('http://127.0.0.1:3000/api/v1/brand_variables')
  .then((response) => {
    console.log('Success:', response.data)
  })
  .catch((error) => {
    console.log('Error:', error.message)
  })
