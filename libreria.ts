import {Articulo} from "./articulo";
import {Cliente} from "./cliente";
import { Libro } from "./libro";
import { Persona } from "./persona";
import {Venta} from "./venta";

export  class Libreria {
    private CantidadVentas : number;
    private clientes : Cliente[];
    private libros : Articulo[];
    private ventas  : Venta[];

    constructor(pclientes : Cliente[],PLibro: Libro[],pVentas : Venta[]){
        this.clientes = pclientes;
        this.libros = PLibro;
        this.ventas = pVentas;
        this.CantidadVentas = 0;
    }

    public agregarCliente(pPersona :Persona, pDireccion: string, pDescuento:number,pAutores : Persona[],pGenero : string[]){
        let nuevoCliente = new Cliente(pPersona.getNombre(),pPersona.getDni(),pDireccion,pDescuento,pAutores,pGenero);
        this.clientes.push(nuevoCliente);
        console.log("Se Agrego el Siguiente Cliente " + nuevoCliente.getNombre()); 
    }

    public getCliente(pNombre:string): Cliente{
        let i : number = 0;
            for( i; i<this.clientes.length; i++){
                if(pNombre === this.clientes[i].getNombre()){
                    return this.clientes[i];
                    break;
                }

            }
            if (i === 0){
                throw new Error('No se encontro Nro Venta');
            }
            

        return this.clientes[i]
    } 

    public agregarArticulo(pLibro : Articulo){
        this.libros.push(pLibro);
        console.log("Se Agrego el Siguiente Articulo " + pLibro.getTitulo()); 
    }

    public getArticulo(pTitulo:string): Articulo{
        let i : number = 0;
        try{ 
            for( i; i<this.clientes.length; i++){
                if(pTitulo === this.libros[i].getTitulo()){
                    return this.libros[i]
                    break;
                }

            }
            if (i === 0){
                throw new Error('No se encontro Nro Venta');
            }
            
        }catch(error){
            console.log("Historial de ARTICULOS vacio");
        }
        return this.libros[i]
    } 


    private aumentarCantidadVentas():number{
        this.CantidadVentas = this.CantidadVentas + 1;
        return this.CantidadVentas;
    }

    private calcularPrecioLibro(pDescuento: number, pPrecio : number):number{
        if (pDescuento === 0){
            return pPrecio
        }else{
            return pPrecio -(pPrecio * pDescuento/100);
        }
     
    }

    public ingresarVenta(pCliente: Cliente, pLibro : Articulo):void{
        let nuevaVenta = new Venta(this.aumentarCantidadVentas(),pCliente,pLibro);
        this.ventas.push(nuevaVenta);
        console.log("Se hizo la siguiente venta " + nuevaVenta.getVentaDetalleCompleto());
    }

    public eliminarVenta(pNroVenta: number):void{
        let control : number = 0;
            for(let i:number=0; i<this.ventas.length; i++){
                if(pNroVenta === this.ventas[i].getNumeroVenta()){
                    this.ventas.splice(i,1);
                    console.log("Se Elimino el siguiente Venta: " + pNroVenta);
                    control = 1;
                    break;
                }

            }
            if (control === 0){
                throw new Error('No se encontro Nro Venta');
            }
            

    }

    public esFavoritoAutor(pCliente : Cliente, pLibro: Articulo):boolean{
        let favorito : boolean = false;
        let autoresFav: Persona[] =  pCliente.listarAutoresFavoritos();
        try{ 
            for(let i:number=0; i<autoresFav.length; i++){
                if(pLibro.getAutor() === autoresFav[i]){
                    favorito = true;
                    break;
                }

            }
            
        }catch(error){
            console.log("Autores Favoritos vacio");
        }    

        return favorito;

    }

    public esFavoritoGenero(pCliente : Cliente, pLibro : Libro): boolean{
        let favorito : boolean = false;
        let generoFav: string[] =  pCliente.listarGenerosFavoritos();
        try{ 
            for(let i:number=0; i< generoFav.length; i++){
                if(pLibro.getGenero() === generoFav[i]){
                    favorito = true;
                    break;
                }

            }
            
        }catch(error){
            console.log("Generos Favoritos vacio");
        }    

        return favorito;

    }


    public buscarGeneroAutor(pCliente : Cliente,pLibro : Libro): boolean{
        let favorito : boolean = false;
        if (this.esFavoritoAutor(pCliente,pLibro) === true &&
            this.esFavoritoGenero(pCliente,pLibro) === true){
                favorito = true;

        }

        return favorito;

    }

    public buscarLibroComprado(pCliente : Cliente, pLibro : Libro) : boolean {
        let comprado : boolean = false;
           try{ 
            for(let i:number=0; i<this.ventas.length; i++){
                if(pLibro.getTitulo() === this.ventas[i].getLibro() && pCliente.getNombre() === this.ventas[i].getCliente() ) {
                    comprado = true;

                }

            }
            
        }catch(error){
            console.log("NO SE ENCONTRO LIBRO");
        }        

        return comprado;
    }

    public getPrecioLibro(pCliente : Cliente, pLibro: Articulo): number {
        return this.calcularPrecioLibro(pCliente.getDescuento(),pLibro.getPrecio())

    }
}