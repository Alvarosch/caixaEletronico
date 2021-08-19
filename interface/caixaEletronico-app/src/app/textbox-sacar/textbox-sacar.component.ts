import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-textbox-sacar',
  templateUrl: './textbox-sacar.component.html',
  styleUrls: ['./textbox-sacar.component.css']
})
export class TextboxSacarComponent implements OnInit {

  constructor(private http: HttpClient) { 
    this.saqueAutofilled = false;
    this.valor="";  
    this.result = "";
    this.qtdNota10 = "0";
    this.qtdNota20 = "0";
    this.qtdNota50 = "0";
    this.qtdNota100 = "0";
    this.falha= "";
}

  evento(){
    //this.eventoGenerico.emit();
    console.log ("Botão clicou");
    console.log (this.valor);
    this.http.get<any>("http://localhost:9999/withdraw?value="+this.valor, {headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})}).subscribe(data => {
        this.result = data.total;
        console.log (data.result);
        if (data.result=="nok"){
            this.falha="Valor inválido. Tente novamente"
            this.qtdNota10 = '0';
            this.qtdNota20 = '0';
            this.qtdNota50 = '0';
            this.qtdNota100 = '0';
        } else {
            this.qtdNota10 = data.result[10];
            this.qtdNota20 = data.result[20];
            this.qtdNota50 = data.result[50];
            this.qtdNota100 = data.result[100];
            this.falha="";
        }
    });
  }

  saqueAutofilled: boolean;
  public valor: string;
  public result: string;
  public qtdNota10: string;
  public qtdNota20: string;
  public qtdNota50: string;
  public qtdNota100: string;
  public falha: string;

  ngOnInit(): void {
  }

}
