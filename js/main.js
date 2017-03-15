$(document).ready(init);
var currentGameID;
function init(){
    //ROTACIONES DE LAS SECIONES
    $('#navegaHistorial').click(naveHistorial);
    $('#boton1').click(naveNombres);        
    $('#boton2').click(naveJuego);
    $('#boton3').click(naveHistorial2);
    
    //ver comentarios y tambien para navegar
    $('#lista-juegos').on('click','button', naveComentario);
    $('#comentar').click(clickComentar);
    
    juegoTablero();
}
//ROTACIONES DE LAS SECIONES
function naveHistorial(){
    $('#bienvenido').hide(1000); 
    $('#historial').show(1000);
    solicitarHistorial(); 
}
function naveHistorial2(){
    $('#juego').hide(1000); 
    $('#historial').show(1000);
    solicitarHistorial();
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
//navegar a  comentario
function naveComentario(){
    var idGame=$(this).parent().data('idgame');
    $('#historial').hide(1000);
    $('#comentarios').show(1000);
   //console.log(idGame);
    solicitarComentarios(idGame);
    currentGameID=idGame;
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
    var juego=new Array(9);
    var n;
    for(var i=0;i>9; i++){
        $('td').click(tresEnraya);
        n++;
    }
};
function tresEnraya(){
    alert('funciona..!');
    
}
///AJAX PETICIONES----- HISTORIAL HTML-----
function solicitarHistorial(){
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
//funcion de peticion general
function getSingleGame(_idGame)
{
	$.ajax({
		url: 'http://test-ta.herokuapp.com/games/'+_idGame,
		type:'GET'
	}).success(function(_data){
		console.log(_data);
	});
}
//ENVIAR COMENTARIOS

function clickComentar(){
    enviarComentario(currentGameID, $('#name').val(), $('#comentario').val());
    //console.log('hola..!');
}

function enviarComentario(_idGame, _name , _content){
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
        type:'POST',
        data:{comment:{name:_name, content:_content, game_id:_idGame}}
    }).done(function (_data){
        console.log(_data);
        solicitarComentarios(_idGame);
    });
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

//HTML COMENTARIOS LISTAone
function dibujarComentarios(_data){
    var comentaHtml='';
    for(var i in _data){
        var html = '<li class="list-group-item">'+_data[i].name+' dice: <p>'+ _data[i].content +'</p></li>';
        comentaHtml+=html;
    }
    $('#lista-comentarios').html(comentaHtml);
}
