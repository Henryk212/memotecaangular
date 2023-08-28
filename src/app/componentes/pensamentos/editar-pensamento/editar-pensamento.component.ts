import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {
 formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router:Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    
    
    ){

      this.formulario = this.formBuilder.group({
        id: [''],
        conteudo: ['', 
          Validators.compose([
            Validators.required,
            Validators.pattern(/(.|\s)*\S(.|\s)*/)
          ])
        ],

        autoria: ['', 
          Validators.compose([
            Validators.required,
            Validators.minLength(3)
          ])
        ],
        modelo:[''],
        favorito:[]
      })

    }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id')
      this.service.buscarPorId(parseInt(id!)).subscribe((formulario) => {
        this.formulario.setValue(
          formulario
        )
      })
    }

  editarPensamento(){
    this.service.editar(this.formulario.value).subscribe(() =>{
      this.router.navigate(['/listarPensamento'])
    })
  }

  cancelar(){
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao() : string{
    if(this.formulario.valid){
      return 'botao'
    }else{
      return 'botao__desabilitado'
    }
  }
}

  


