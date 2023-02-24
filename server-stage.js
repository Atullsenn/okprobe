const path = require("path");
const cors = require('cors');
const Express = require('express');
const multer = require('multer');
const mkdirp = require('mkdirp');
const bodyParser = require('body-parser');
var app = Express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Express.static(path.join(__dirname, "/", "build")));
app.use(Express.static("public"));


const ASSET_BUCKET = 'assets_bucket';
const FILE_SIZE = 10000000;

const getDateString = () => {
  const date = new Date();
  return `${date.getFullYear()}${("0" + (date.getMonth() + 1)).slice(-2)}${("0" + date.getDate()).slice(-2) }`;
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
  storage : AssetStorage,
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

app.get(['/users/*', '/printers/*', '/chats/*'], (req, res, next) => {
  if (req.headers['sec-fetch-dest'] === 'image') {
    const types = req.path.split('/')[1];
    res.sendFile(__dirname + `/${ASSET_BUCKET}/${types}/${req.params[0]}`);
  } else {
    next();
  }
});


app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "/", "build", "index.html"));
});

app.listen(5000, () => console.log("server started on port 5000"));