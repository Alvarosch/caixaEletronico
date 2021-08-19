var PORTA_TCP_CAIXA_ELETONICO = 9999;

var restify = require('restify');
var bodyParser = require('body-parser');
var caixaEletronico = require('./caixaEletronico.js').start()



function restserver(){
  this.start();
}

restserver.prototype.start = function(){
  this.server = restify.createServer({
    name: 'Caixa Eletronico',
    versions: ['1.0.0']
  });
  var self;
  this.server.pre(function (req, res, next) {
    var urlParams = req.url.match(/^\/v(\d{1,})(.{1,})/);
    if(!urlParams){
      req.headers['accept-version'] = "1.0.0";
    }
    else{
      req.headers['accept-version'] = urlParams[1]+".0.0";
      req.url = urlParams[2];
    }
    return next();
  });
  this.server.use(restify.queryParser());
  this.server.use(function (req, res, next){
    for(var i in req.body)
      req.params[i] = req.body[i]
    next();
  });

  this.server.use(restify.CORS());

  this.server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});

  this.server.on('InternalError', function(req, res, err, cb) {
    console.log('InternalError', err);
    if(!res.headersSent){
      res.send(500, 'InternalError');
    }
    cb();
  });
  this.server.on('InternalServerError', function(req, res, err, cb) {
    console.log('InternalServerError', err);
    if(!res.headersSent){
      res.send(500, 'InternalServerError');
      self.send_error(res, 500, 'uncaughtException')
    }
    cb();
  });
  this.server.on('uncaughtException', function(req, res, route, err){
    console.log('uncaughtException', err);
    if(!res.headersSent){
      self.send_error(res, 500, 'uncaughtException');
    }
  });

  var self = this;
  
  this.server.get({path: '/withdraw', version: ['1.0.0'] }, function create(req, res, next) {
    caixaEletronico.sacar(req, function(data){ self.send_response(res, data) } );
  });
  
  this.server.listen(PORTA_TCP_CAIXA_ELETONICO);
}

restserver.prototype.send_response = function(res, data){
  res.send(data);
  res.end();
}

restserver.prototype.sendContent = function(res, data){
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Connection': 'close'
  });
  res.write(data);
  res.end();
}

restserver.prototype.send_error = function(res, code, message){
  var error = { code : code, message : message };
  res.send(JSON.stringify(error));
  res.end();
}

var restserver_instance;
restserver_instance = new restserver();
