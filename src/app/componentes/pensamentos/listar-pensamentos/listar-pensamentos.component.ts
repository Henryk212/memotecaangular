import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual : number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false
  listaFavoritos: Pensamento[] = [];
  listaTodosOsPensamentos: Pensamento[] = [];
constructor(
  private service: PensamentoService,
  private router: Router
  ){}

ngOnInit(): void {
  this.listarTodos()
}

carregarMaisPenamentos(){
  this.service.listar(++this.paginaAtual, this.filtro,this.favoritos)
  .subscribe((listaPensamentos) => {
    this.listaPensamentos.push(...listaPensamentos);
    if(!listaPensamentos.length){
      this.haMaisPensamentos = false
    }
  })
}

pesquisarPensamentos(){
  this.haMaisPensamentos = true
  this.paginaAtual = 1;
  this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentos =>{
      this.listaPensamentos = listaPensamentos
    })

}

listarFavoritos(){
  this.favoritos = true
  this.haMaisPensamentos = true
  this.paginaAtual= 1
  this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listarPensamentosFavoritos => {
      this.listaPensamentos = listarPensamentosFavoritos
      this.listaFavoritos = listarPensamentosFavoritos
    })
}

listarTodos(){
  this.favoritos = false
  this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
    this.listaPensamentos = listaPensamentos
  })
}

}
