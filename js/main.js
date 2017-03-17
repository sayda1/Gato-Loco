$(document).ready(init);
var currentGameID;
function init(){
    //ROTACIONES DE LAS SECIONES
   $('#navegaHistorial').click(naveHistorial);
    $('#boton1').click(naveNombres);        
    $('#boton2').click(naveJuego);
   $('#boton3').click(naveHistorial2);
    $('#reiniciar').click(reiniciarJuego);
    $('#inicio').click(inicio);
    
   //ver comentarios y tambien para navegar
   $('#lista-juegos').on('click','button', naveComentario);
   $('#comentar').click(clickComentar);
    
    //juegoTablero();
}
//--------------------------ROTACIONES DE LAS SECIONES
function inicio(){
    $('#nombres').hide(1000);
    $('#juego').hide(1000); 
    $('#historial').hide(1000);
    $('#bienvenido').show(1000);
}
function naveHistorial(){
    $('#bienvenido').hide(1000);
    $('#nombres').hide(1000);
    $('#juego').hide(1000); 
    $('#historial').show(1000);
    solicitarHistorial(); 
}
function naveHistorial2(){
    $('#juego').hide(1000); 
    $('#historial').show(1000);
    solicitarHistorial();
    envioDeJuego($(".ganador").text(), $(".perdedor").text(), $('.cont1').text());
}
function naveNombres(){
    $('#bienvenido').hide(1000);
    $('#nombres').show(1000); 
}
function naveJuego(){
    nombreJugador1=$('#nombre').val();
    nombreJugador2=$('#nombre2').val();
    if(nombreJugador1==""||nombreJugador2==""){
        $('#salida').text('Por favor ingresen sus nombres .').css('color', 'red');
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

///-----------------------AJAX PETICIONES----- HISTORIAL HTML
function solicitarHistorial(){
    $.ajax({url:'https://test-ta.herokuapp.com/games',
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
      var html ='<li data-idgame="'+_datos[i].id+'" class="list-group-item">'+_datos[i].winner_player+' le gano a '+_datos[i].loser_player+' en '+_datos[i].number_of_turns_to_win+' movimientos <br><button class="btn">Comentar</button></li>'
        carga+=html;
    }
    $('#lista-juegos').html(carga);
}
//funcion de peticion general
function getSingleGame(_idGame)
{
	$.ajax({
		url: 'https://test-ta.herokuapp.com/games/'+_idGame,
		type:'GET'
	}).success(function(_data){
		console.log(_data);
	});
}
//------------------------PETICIONES--ENVIAR COMENTARIOS

function clickComentar(){
    enviarComentario(currentGameID, $('#name').val(), $('#comentario').val());
    //console.log('hola..!');
}

function enviarComentario(_idGame, _name , _content){
    $.ajax({
        url:'https://test-ta.herokuapp.com/games/'+_idGame+'/comments',
        type:'POST',
        data:{comment:{name:_name, content:_content, game_id:_idGame}}
    }).done(function (_data){
        console.log(_data);
        solicitarComentarios(_idGame);
    });
}

//---COMENTARIOS HTML
function solicitarComentarios(_idGame)
{
	$.ajax({
		url:'https://test-ta.herokuapp.com/games/'+_idGame+'/comments',
		type:'GET'
	}).done(function(_data){
		console.log(_data);
        dibujarComentarios(_data);
	});
}

//----HTML COMENTARIOS LISTA
function dibujarComentarios(_data){
    var comentaHtml='';
    for(var i in _data){
        var html = '<li class="list-group-item">'+_data[i].name+' dice: <p>'+ _data[i].content +'</p></li>';
        comentaHtml+=html;
    }
    $('#lista-comentarios').html(comentaHtml);
}
//ENVIAR JUEGO
function envioDeJuego(_ganador, _perdedor, _movimientos){
	$.ajax({
		url:'https://test-ta.herokuapp.com/games',
		type:'POST',
		data:{game:{winner_player:_ganador, loser_player:_perdedor, number_of_turns_to_win: _movimientos}}
        
    }).done(function(_data){
		console.log(_data);
        //dibujarJuego(_data);
	});
}

//-------------------------JUEGO DEL TABLERO
//globales
function validarNombres(){
    var nombre=$('#nombre');
    var nombre2=$('#nombre2');
    
    $('#saliNombre1').text(nombre.val());
    $('#saliNombre2').text(nombre2.val());
    //salinombre1.html(nombre.val());
    //salinombre2.html(nombre2);
    $("#juga").html( "Empieza " + nombreJugador2);
}
var nombreJugador1=$("#nombre").val(); 
var nombreJugador2=$("#nombre2").val();
var turno = 1;
var movimiento1 = 0; 
var movimiento2 = 0;
var posicion;
var gana=false;

var tablero = new Array(9);
$(".celdas").click(dibujarJuego);
//----------------------- Función para los mensajes y movimientos
function dibujarJuego(evento){
    //$("#juga").html( "Empieza" + nombreJugador2);
    posicion=evento.target.id-1; 
    //console.log(posicion);
    if(turno == 1){ 
        if(tablero[posicion] == "X" || tablero[posicion] == "O") { 
        }else{ 
            $(this).html("X"); 
            $("#juga").html("<span>Turno de: "+nombreJugador1 + "</span>"); 
            tablero[posicion]="X"; 
            turno=2;
            movimiento1++;
        } 
    }else if(turno==2){ 
        if(tablero[posicion] == "X" || tablero[posicion] == "O"){
        }else{ 
            $(this).html("O") ;
            $("#juga").html("<span>Turno de: "+nombreJugador2+"</span>");
            tablero[posicion]="O"; 
            turno = 1; 
            movimiento2++; 
        } 
    } 
    if(movimiento1>= 3 && movimiento1<=9){ 
        defineGanador(); 
    }
}

//----------------- Función para los mensajes y movimientos
function defineGanador(){ 
    if ((tablero[0]=="X" && tablero[1]=="X" && tablero[2]=="X") || 
     (tablero[3]=="X" && tablero[4]=="X" && tablero[5]=="X") || 
     (tablero[6]=="X" && tablero[7]=="X" && tablero[8]=="X") || 
     (tablero[0]=="X" && tablero[3]=="X" && tablero[6]=="X") || 
     (tablero[1]=="X" && tablero[4]=="X" && tablero[7]=="X") || 
     (tablero[2]=="X" && tablero[5]=="X" && tablero[8]=="X") || 
     (tablero[0]=="X" && tablero[4]=="X" && tablero[8]=="X") || 
     (tablero[2]=="X" && tablero[4]=="X" && tablero[6]=="X")) {
        
        $("#juga").html("Gano<span'>" + nombreJugador2 + "</span>");
        
        
        $(".ganador").html("<span>" + nombreJugador2+ " le gano a </span>");
        $(".perdedor").html("<span>" + nombreJugador1+ " en </span>");
        $(".cont1").html("<span>" + movimiento1 + "</span>");
        turno = 3; 
        gana = true; 
    }else if((tablero[0]=="O" && tablero[1]=="O" && tablero[2]=="O") || 
    (tablero[3]=="O" && tablero[4]=="O" && tablero[5]=="O") || 
    (tablero[6]=="O" && tablero[7]=="O" && tablero[8]=="O") || 
    (tablero[0]=="O" && tablero[3]=="O" && tablero[6]=="O") || 
    (tablero[1]=="O" && tablero[4]=="O" && tablero[7]=="O") || 
    (tablero[2]=="O" && tablero[5]=="O" && tablero[8]=="O") || 
    (tablero[0]=="O" && tablero[4]=="O" && tablero[8]=="O") || 
    (tablero[2]=="O" && tablero[4]=="O" && tablero[6]=="O")){
        
        $("#juga").html("Ganó <span>" + nombreJugador1 + "</span>");
        
        $(".ganador").html("<span>"+nombreJugador1 +" le gano a </span>");
        $(".perdedor").html("<span>" + nombreJugador2+ " en </span>");
        $(".cont1").html("<span>" + movimiento2 + "</span>");
        turno=3; 
        gana=true;
    }
}
function reiniciarJuego(){
    tablero.length=0;
    turno='x';
    //tablero.empty();
    var celdas=$('.celdas').text('');
    celdas.empty();
}