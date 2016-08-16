let url = require('url');
let http = require('http');
let axios = require('axios');
let port = 8000;

let server = http.createServer((req, res) => {
  let parsed = url.parse(req.url, true);
  let query = parsed.query;
  let path = parsed.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (path === '/proxy' && req.method === 'GET') {
    if (query.url) {
      console.log('Proxying: ' + query.url);
      axios.get(query.url, {
          transformResponse: (data, headers) => {
            return data;
          }
        })
        .then((response) => {
          res.writeHead(response.status, response.headers);
          res.end(response.data);
        }, (error) => {
          let response = error.response || {status: 500, headers: {}};
          res.writeHead(response.status, response.headers);
          res.end(error.message);
        });
    } else {
      res.writeHead(500);
      res.end('Missing parameter "url"');
    }
  } else {
    res.writeHead(404);
    res.end('404 (Not found)');
  }
});

server.listen(port);
console.log(`Listening on 0.0.0.0:${port}, CTRL+C to stop`);
