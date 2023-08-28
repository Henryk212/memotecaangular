import { Component, Input } from '@angular/core';

import { Pensamento } from "../pensamento";
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent {
  @Input()  pensamento : Pensamento = {
    id: 0,
    conteudo: 'Angular a fundo',
    autoria: 'Henrique',
    modelo: 'modelo3',
    favorito: false
  }

  @Input() listaFavoritos : Pensamento[] = [];

  constructor(private service: PensamentoService){

  }

  larguraPensamento(){
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): string{
      if(this.pensamento.favorito == false){
        return 'inativo'
      }
      return 'ativo'
  }

  atualizarFavoritos(){
    this.service.mudarFavoritos(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento))
    });
    

  }
}
