$(document).ready(init);
function init(){
    rotacionSeciones();
    juegoTablero();
}

//ROTACIONES DE LAS SECIONES
function rotacionSeciones(){
    $('#boton1').click(function(){
        $('#bienvenido').hide(1000);
        $('#nombres').show(1000); 
    });
    $('.comentar').click(function(){
        $('#historial').hide(1000);
        $('#comentarios').show(1000);        
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
        solicitar();
    });
    $('#lista-juegos').on('click','li','button' onBtnItemJuego)
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
//JUEGO DEL TABLERO
function juegoTablero(){
    var juego = new Array(9);
    var tabla=$('td').each(function(){
       $(this).click(function(){
          console.log('funciona..!!');
       })
    });
};

function solicitar(){
    $.ajax({url:'http://test-ta.herokuapp.com/games',
    }).done(function (_data){
        console.log(_data);
        dubujarHistorial(_data);
    });
}
function dubujarHistorial(_datos){
    //var list=$('#lista-juegos');
    //list.html('hola...!!!');
    var carga='';
    for(var i in _datos){
      console.log(_datos[i].winner_player);
      var html ='<li data-idgame="" class="list-group-item"><button class="btn">ver</button>Ganador:'+_datos[i].winner_player+'</li>'
        carga+=html;
    }
    $('#lista-juegos').html(carga);
}
function onBtnItemJuego(){
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/1',
    }).done(function (){
        
    });
}


