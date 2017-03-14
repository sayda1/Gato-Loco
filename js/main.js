$(document).ready(init);
function init(){
    rotacionSeciones();
}


//ROTACIONES DE LAS SECIONES
function rotacionSeciones(){
     $('#boton1').click(function(){
        $('#bienvenido').hide(1000);
        $('#nombres').show(1000); 
    });
    
    $('#boton2').click(function(){
        var nombre1=$('#nombre').val();
        var nombre2=$('#nombre2').val();
        if(nombre1==""||nombre2==""){
            $('#salida').text('Por fabor ingresen sus nombres .').css('color', 'red');
        }else{
            $('#nombres').hide(1000);
            $('#juego').show(1000); 
        }
    });
    $('#boton3').click(function (){
        $('#juego').hide(1000); 
        $('#historial').show(1000);
    });
    $('.comentar') .click(function(){
        $('#historial').hide(1000);
        $('#comentarios').show(1000);        
    });
}