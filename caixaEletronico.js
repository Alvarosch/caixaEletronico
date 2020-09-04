function caixaEletronico(callback){
  this.notasDisponiveis = [100, 50, 20, 10]
}

caixaEletronico.prototype.sacar = function(req, callback) {
  var data
  if (!req.params.value){
    data = { result:'nok', message:'value was not informed'};
  } else if (req.params.value%10!=0){
    data = { result:'nok', message:'impossible to make that value available'};
  }
  else {
    data = {result:this.calcularNotas(req.params.value)}
  }
  callback(data)
  //return this.calcularNotas(valor)
}

caixaEletronico.prototype.calcularNotas = function(valor){

  var qtdTiposNotas = this.notasDisponiveis.length
  var qtdNotas = {100:0, 50:0, 20:0, 10:0}
  
  for (var i=0; i<qtdTiposNotas; i++){
    qtdNotas[this.notasDisponiveis[i]] = Math.floor(valor/this.notasDisponiveis[i])
    valor = valor%this.notasDisponiveis[i]
    if (valor <= 0) {
      break;
    }
  }

  return qtdNotas
}


var caixaEletronico_instance;

exports.start = function(callback){
  if(!caixaEletronico_instance){
    caixaEletronico_instance = new caixaEletronico(callback);
  }
  return caixaEletronico_instance;
}