const path = require("path");
const cors = require('cors');
const Express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mkdirp = require('mkdirp');
const https = require('https');
const http = require('http');
const fs = require('fs');
var app = Express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Express.static(path.join(__dirname, "/", "build")));
app.use(Express.static("public"));


const ASSET_BUCKET = 'assets_bucket';
const FILE_SIZE = 10000000;

const getDateString = () => {
  const date = new Date();
  return `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2)}`;
};

const getFileDestisnation = (body) => {
  const { type } = body;
  let destination = '';
  if (type === 'chat') {
    const { deviceInfoId } = body;
    destination = deviceInfoId ? `/${ASSET_BUCKET}/chats/${deviceInfoId}/${getDateString()}` : '';
  } else if (type === 'user') {
    const { userId } = body;
    destination = userId ? `/${ASSET_BUCKET}/users/${userId}` : '';
  } else if (type === 'printer') {
    const { deviceInfoId } = body;
    destination = deviceInfoId ? `/${ASSET_BUCKET}/printers/${deviceInfoId}` : '';
  }
  return destination;
};

const AssetStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destination = getFileDestisnation(req.body);
    if (destination) {
      mkdirp.sync(destination)
      callback(null, destination);
    }
  },
  filename: (req, file, callback) => {
    const fileType = file.originalname.split('.');
    callback(null, Date.now() + '.' + fileType[fileType.length - 1]);
  }
});

const AssetUpload = multer({
  storage: AssetStorage,
  limits: {
    fileSize: FILE_SIZE
  }
}).any();

app.post("/api/upload", (req, res) => {
  AssetUpload(req, res, (error) => {
    if (error) {
      return res.json({ error });
    } else {
      const filePath = (res.req.files[0].path).replace(`${ASSET_BUCKET}/`, '');
      return res.json({
        Data: {
          error: null,
          filePath,
        }
      })
    }
  });
});

app.get(['/file/users/*', '/file/printers/*', '/file/chats/*'], (req, res, next) => {
  const types = req.path.split('/')[2];
  res.sendFile(__dirname + `/${ASSET_BUCKET}/${types}/${req.params[0]}`);
});

app.get(['/users/*', '/printers/*', '/chats/*'], (req, res, next) => {
  try {
    const acceptArr = req.headers.accept.split(';')[0].split('/');
    if (acceptArr.includes('image')) {
      const types = req.path.split('/')[1];
      res.sendFile(__dirname + `/${ASSET_BUCKET}/${types}/${req.params[0]}`);
    } else {
      next();
    }
  } catch (err) {
    next();
  }

  // if (req.headers['sec-fetch-dest'] === 'image') {
  //   const types = req.path.split('/')[1];
  //   res.sendFile(__dirname + `/${ASSET_BUCKET}/${types}/${req.params[0]}`);
  // } else {
  //   next();
  // }
});

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "/", "build", "index.html"));
});

//app.listen(80, () => console.log("server started on port 80"));

// serve the API with signed certificate on 443 (SSL/HTTPS) port
const httpsServer = https.createServer({
  key: fs.readFileSync('/root/app2.okprobe.com_2021070597K1/app2.okprobe.com_2021070597K1.key.pem'),
  cert: fs.readFileSync('/root/app2.okprobe.com_2021070597K1/app2.okprobe.com_2021070597K1.crt.pem'),
  ca: fs.readFileSync('/root/app2.okprobe.com_2021070597K1/app2.okprobe.com_2021070597K1.ca-bundle.pem'),
}, app);

httpsServer.listen(443, () => {
  console.log('HTTPS Server running on port 443');
});

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);