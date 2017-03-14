$(document).ready(init);
function init(){
    //ROTACIONES DE LAS SECIONES
    $('#navegaHistorial').click(naveHistorial);
    $('#boton1').click(naveNombres);        
    $('#boton2').click(naveJuego);
    $('#boton3').click(naveHistorial2);
    
    //ver comentarios funcion
    $('#lista-juegos').on('click','button', naveComentario);
    
    juegoTablero();
    solicitarPeticiones();
    solicitarComentarios();
}
//ROTACIONES DE LAS SECIONES
function naveHistorial(){
    $('#bienvenido').hide(1000); 
    $('#historial').show(1000);
    solicitarPeticiones(); 
}
function naveHistorial2(){
    $('#juego').hide(1000); 
    $('#historial').show(1000);
    solicitarPeticiones();
}
function naveNombres(){
    $('#bienvenido').hide(1000);
    $('#nombres').show(1000); 
}
function naveJuego(){
    var nombre1=$('#nombre').val();
    var nombre2=$('#nombre2').val();
    if(nombre1==""||nombre2==""){
        $('#salida').text('Por fabor ingresen sus nombres .').css('color', 'red');
    }else{
        $('#nombres').hide(1000);
        $('#juego').show(1000); 
    }
    validarNombres();
}
var gameID;//currentGameID
function naveComentario(){
    var idGame=$(this).parent().data('idgame');
    console.log(_idGame);
    solicitarComentarios(_idGame);
    $('#historial').hide(1000);
    $('#comentarios').show(1000);
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
console.log(juegoTablero);
function juegoTablero(){
    var juego = new Array(9);
    var tabla=$('td');
    for(var i=0;i>9; i++){
        tabla[i].html("X");
    }
    /*.each(function(){
       $("td")[i].click(function(){
           $('td').html("X"); 
       });
    });*/
};

//AJAX PETICIONES----- HISTORIAL HTML
function solicitarPeticiones(){
    $.ajax({url:'http://test-ta.herokuapp.com/games',
    }).done(function (_data){
        console.log(_data);
        dubujarHistorial(_data);
    });
}
//HTML HISTORIAL
function dubujarHistorial(_datos){
    var carga='';
    for(var i in _datos){
      //console.log(_datos[i].winner_player);
      var html ='<li data-idgame="'+_datos[i].id+'" class="list-group-item">'+_datos[i].winner_player+' le gano a '+_datos[i].loser_player+' en '+_datos[i].number_of_turns_to_win+' movimientos <br><button class="btn">ver</button></li>'
        carga+=html;
    }
    $('#lista-juegos').html(carga);
}
//COMENTARIOS HTML
function solicitarComentarios(_idGame)
{
	$.ajax({
		url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'GET'
	}).done(function(_data){
		console.log(_data);
        dibujarComentarios(_data);
	});
}

//HTML COMENTARIOS LISTA
function dibujarComentarios(_data){
    var comentaHtml='';
    for(var i in _data){
        var html = '<li class="list-group-item">'+_data[i].name+' dice: <p>'+ _data[i].content +'</p></li>';
        comentaHtml+=html;
    }
    $('#lista-comentarios').html(comentaHtml);
}

/*function enviarComentario (_idgame , _name , _content){
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/'+_idgame+'/comments',
        type:'POST',
        data:{coment:{name:_name, content:_content, game_id:_idgame}}
    }).done(function (_data){
        console.log(_data);
    });
}*/
