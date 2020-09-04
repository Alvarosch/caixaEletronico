var assert = require('assert');

var caixaEletronico = require('../caixaEletronico.js').start()


describe('Testando calculo de quantidade de notas. Limite valido inferior', function() {
  it('Metodo set', function(done) {
    var compare = {"result":{ '10': 1, '20': 0, '50': 0, '100': 0 }};
    var req = {};
    req.params = {};
    req.params.value = 10
    var result = caixaEletronico.sacar (req, function (data){
      assert.deepEqual(compare, data);
      done();
    });
  });

});

describe('Testando calculo de quantidade de notas. Valor maior do que a maior nota', function() {
  it('Metodo set', function(done) {
    var compare = {"result":{ '10': 1, '20': 1, '50': 1, '100': 18 }};
    var req = {};
    req.params = {};
    req.params.value = 1880
    var result = caixaEletronico.sacar (req, function (data){
      assert.deepEqual(compare, data);
      done();
    });
  });

});

describe('Testando calculo de quantidade de notas. Valor invalido. Texto', function() {
  it('Metodo set', function(done) {
    var compare = {"result": "nok", "message": "impossible to make that value available"};
    var req = {};
    req.params = {};
    req.params.value = "Sacar"
    var result = caixaEletronico.sacar (req, function (data){
      assert.deepEqual(compare, data);
      done();
    });
  });

});

describe('Testando calculo de quantidade de notas. Valor invalido. Nao e possivel sacar com as notas disponiveis', function() {
  it('Metodo set', function(done) {
    var compare = {"result": "nok", "message": "impossible to make that value available"};
    var req = {};
    req.params = {};
    req.params.value = 123
    var result = caixaEletronico.sacar (req, function (data){
      assert.deepEqual(compare, data);
      done();
    });
  });

});

describe('Testando calculo de quantidade de notas. Valor invalido. Valor nao informado', function() {
  it('Metodo set', function(done) {
    var compare = {"result": "nok", "message": "value was not informed"};
    var req = {};
    req.params = {};
    var result = caixaEletronico.sacar (req, function (data){
      assert.deepEqual(compare, data);
      done();
    });
  });

});
