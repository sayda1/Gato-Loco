$(document).ready(init);
function init(){
    rotacionSeciones();
    //validarNombres();
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
        validarNombres();
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

//VALIDANDO EL ENVIO DE NOMBRES
function validarNombres(){
    var nombre1=$('#nombre').val();
    var nombre2=$('#nombre2').val();
    
    var saliNombre1=$('#saliNombre1');
    var saliNombre2=$('#saliNombre2');
    saliNombre1.text(nombre1);
    saliNombre2.text(nombre2);
}

