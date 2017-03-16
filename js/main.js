$(document).ready(init);
var currentGameID;
function init(){
    //ROTACIONES DE LAS SECIONES
   // $('#navegaHistorial').click(naveHistorial);
    $('#boton1').click(naveNombres);        
    $('#boton2').click(naveJuego);
    //$('#boton3').click(naveHistorial2);
    $('#reinciar').click(reiniciarJuego);
    
    //ver comentarios y tambien para navegar
   // $('#lista-juegos').on('click','button', naveComentario);
   // $('#comentar').click(clickComentar);
    
    //juegoTablero();
}
//--------------------------ROTACIONES DE LAS SECIONES
/*function naveHistorial(){
    $('#bienvenido').hide(1000); 
    $('#historial').show(1000);
    solicitarHistorial(); 
}
function naveHistorial2(){
    $('#juego').hide(1000); 
    $('#historial').show(1000);
    solicitarHistorial();
}*/
function naveNombres(){
    $('#bienvenido').hide(1000);
    $('#nombres').show(1000); 
}
function naveJuego(){
    nombreJugador1=$('#nombre').val();
    nombreJugador2=$('#nombre2').val();
    if(nombreJugador1==""||nombreJugador2==""){
        $('#salida').text('Por fabor ingresen sus nombres .').css('color', 'red');
    }else{
        $('#nombres').hide(1000);
        $('#juego').show(1000); 
    }
    //validarNombres();
}
//navegar a  comentario
/*function naveComentario(){
    var idGame=$(this).parent().data('idgame');
    $('#historial').hide(1000);
    $('#comentarios').show(1000);
   //console.log(idGame);
    solicitarComentarios(idGame);
    currentGameID=idGame;
}

///-----------------------AJAX PETICIONES----- HISTORIAL HTML
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
//------------------------PETICIONES--ENVIAR COMENTARIOS

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

//---COMENTARIOS HTML
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

//----HTML COMENTARIOS LISTA
function dibujarComentarios(_data){
    var comentaHtml='';
    for(var i in _data){
        var html = '<li class="list-group-item">'+_data[i].name+' dice: <p>'+ _data[i].content +'</p></li>';
        comentaHtml+=html;
    }
    $('#lista-comentarios').html(comentaHtml);
}*/

//-------------------------JUEGO DEL TABLERO
//globales
/*function validarNombres(){
    var nombre1=$('#nombre').val();
    var nombre2=$('#nombre2').val();
    
    saliNombre1.text(nombre1);
    saliNombre2.text(nombre2);
}*/
var nombreJugador1=$("#nombre").val(); 
var nombreJugador2=$("#nombre2").val();
var turno = 1;
var cont1 = 0; 
var cont2 = 0;
var n = 0;
var posicion;
var gana=false;
//-------------------Que jugador comienza 
$("#juga").html("Empieza " + nombreJugador2);
//-------Obtener los elementos de las celdas de la tabla
    var tablero = new Array(9);
   // for (var i = 0;i < 9;i++){ 
        $(".celdas").click(dibujar);
        //n++; 
    //}
//----------------------- Función para los mensajes y movimientos
function dibujar(evento){
    
    posicion=evento.target.id-1; 
    console.log(posicion);
    if(turno == 1){ 
        if(tablero[posicion] == "X" || tablero[posicion] == "O") { 
        }else{ 
            this.innerHTML= "X"; 
            $("#juga").html("<span>Turno de: " + nombreJugador1 + "</span>"); 
            tablero[posicion]="X"; 
            turno = 2;
            cont1 ++;
        } 
    }else if(turno == 2){ 
        if(tablero[posicion] == "X" || tablero[posicion] == "O"){
        }else{ 
            this.innerHTML = "O"; 
            $("#juga").html("<span>Turno de: " + nombreJugador2 + "</span>");
            tablero[posicion]="O"; 
            turno = 1; 
            cont2++; 
        } 
    } 
    //llamar a funcion  ganador o enviar mensaje de empate
    if(cont1>= 3 && cont1<=9){ 
        ganador(); 
    }
    /*if(cont1 >= 9&& gana == false){ 
        $("#juga").html("Empate.!!");
        cont1++;
        cont2++;
        turno=3; 
    }*/
} 
//----------------- Función para los mensajes y movimientos
function ganador(){ 
    if ((tablero[0]=="X" && tablero[1]=="X" && tablero[2]=="X") || 
     (tablero[3]=="X" && tablero[4]=="X" && tablero[5]=="X") || 
     (tablero[6]=="X" && tablero[7]=="X" && tablero[8]=="X") || 
     (tablero[0]=="X" && tablero[3]=="X" && tablero[6]=="X") || 
     (tablero[1]=="X" && tablero[4]=="X" && tablero[7]=="X") || 
     (tablero[2]=="X" && tablero[5]=="X" && tablero[8]=="X") || 
     (tablero[0]=="X" && tablero[4]=="X" && tablero[8]=="X") || 
     (tablero[2]=="X" && tablero[4]=="X" && tablero[6]=="X")) { 
        $("#juga").html("<span class='super-ganador'>" + nombreJugador2 + "</span>");
        $(".one").html("<span>" + nombreJugador2+ "</span>");
        $(".two").html("<span>" + nombreJugador1+ "</span>");
        $(".cont1").html("<span>" + cont1 + "</span>");
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
        
        $("#juga").html("Ganó <span class='super-ganador'>" + nombreJugador1 + "</span>");
        $(".one").html("<span>" +nombreJugador1 + "</span>");
        $(".two").html("<span>" + nombreJugador2+ "</span>");
        $(".cont1").html("<span>" + cont2 + "</span>");
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