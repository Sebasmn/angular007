import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario{
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  clave: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  //contiene la referencia al objeto con el formulario reactivo
  formularioCreado!: FormGroup;

  //la lista de usuarios registrados
  listaUsuarios:Array<Usuario> = new Array<Usuario>();

  //determina si se desea realizar  "Agregar" o "Editar"
  esNuevo:boolean = true;

  posicionEdicion:number =  -1;

  columnas:string[] = ['Nombre', 'Apellido', 'Edad', 'Correo', 'Contraseña'];
  //inyeccion de dependencias
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    //llamar el metodo para crear el formulario
    this.crearFormulario();
  }

  // metodo para crear el formulario reactivo
  crearFormulario(){
    // usar formBuilder para crear el formulario
    this.formularioCreado = this.formBuilder.group({
      nombre: ['John', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      clave: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  agregar(){
    //obtener los valores ingresados en los inputs
    //console.log(this.formularioCreado.value); 

    //agregar al array el registro ingresado en el formulario
    this.listaUsuarios.push(this.formularioCreado.value as Usuario);

    //limpiar o resetear los controles del formulario
    this.formularioCreado.reset();
  }

  //editar el registro indicado
  editar(){
    //asignar los datos ingresados en los controles al Array<Usuario>
    this.listaUsuarios[this.posicionEdicion].nombre = this.formularioCreado.value.nombre;
    this.listaUsuarios[this.posicionEdicion].apellido = this.formularioCreado.value.apellido;
    this.listaUsuarios[this.posicionEdicion].edad = this.formularioCreado.value.edad;
    this.listaUsuarios[this.posicionEdicion].correo = this.formularioCreado.value.correo;
    this.listaUsuarios[this.posicionEdicion].clave = this.formularioCreado.value.clave;
    //resetear el formulario
    this.formularioCreado.reset();
    //mostrar el boton de agregar
    this.esNuevo = true;

    // cambiar la posicion del registro actual a editar
    this.posicionEdicion = -1;
  }

  editarUsuarioActual(posicion:number){
    //editar el usuario en la posicion indicada
    // this.listaUsuarios[posicion].nombre = 'Editar';
    // this.listaUsuarios[posicion].correo = 'correo@gmail.com';
    // this.listaUsuarios[posicion].clave = '123456';

    //console.log(this.listaUsuarios[posicion].nombre,this.listaUsuarios[posicion].correo,this.listaUsuarios[posicion].clave);

    //utilizar el objeto "formularioCreado", que tiene la referencia al formulario reactivo
    //y con el metodo (setValue) asignar un nuevo registro
    this.formularioCreado.setValue({
      nombre: this.listaUsuarios[posicion].nombre, 
      apellido: this.listaUsuarios[posicion].apellido, 
      edad: this.listaUsuarios[posicion].edad,
      correo: this.listaUsuarios[posicion].correo, 
      clave: this.listaUsuarios[posicion].clave
    });
    //asignar la posicion para editar
    this.posicionEdicion = posicion;
    //ocultar el boton agregar y mostrar el boton de editar
    this.esNuevo = false;
  }

  //eliminar el registro actual
  eliminarUsuarioActual(posicion:number){
    //eliminar el registro del Array
    this.listaUsuarios.splice(posicion, 1);
  }
}
