$(document).ready(init);

function init(){
    $('#boton1').click(function(){
        $('#bienvenido').hide(1000);
        $('#nombres').show(1000); 
    });    

    $('#boton3').click(function (){
        $('#juego').hide(1000); 
        $('#historial').show(1000);
    });
    $('.comentar').click(function(){
        $('#historial').hide(1000); 
       $('#comentarios').show(1000);
    });
}
//funciones de seciones
function validarNombres(){
   $('#boton2').click(function(){
        var nombre1=$('#nombre').val();
        var nombre2=$('#nombre2').val();
        if(nombre1==""||nombre2==""){
            alert("Complete los campos");
        }else{
            $('#nombres').hide(1000);
            $('#juego').show(1000); 
        }
    }); 
}