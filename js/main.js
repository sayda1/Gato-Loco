$(document).ready(init);
//funciones de seciones
function init(){   
    
}

//FUNCTION  DE BIENVENIDO A GATO LOCO
function gatoLoco(){
    $('#bienvenido').hide(1000);
    $('#nombres').show(1000); 
}
//FUNCTION  DE INGRESE NOMBRES
function ingreseNombres(){
    var nombre1=$('#nombre').val();
    var nombre2=$('#nombre2').val();
    if(nombre1==""||nombre2==""){
        $('#salida').html('Complete los campos .').css('color' , 'red');
    }else{
        $('#nombres').hide(1000);            
        $('#juego').show(1000); 
    }
    nombre1
}
//FUNCTION MANDAR HISTORIAL
function mandarHistorial(){
    $('#juego').hide(1000); 
    $('#historial').show(1000);
}
//FUNCTION  PARA COMENTAR
$('.comentar').click(function(){
    $('#historial').hide(1000); 
    $('#comentarios').show(1000);
});