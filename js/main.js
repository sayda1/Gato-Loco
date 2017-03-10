$(document).ready(function(){
    $('#boton1').click(function(){
        $('#bienvenido').hide();
        $('#nombres').show(); 
    });
    
    $('#boton2').click(function(){
        var nombre1=$('#nombre').val();
        var nombre2=$('#nombre2').val();
        if(nombre1==""||nombre2==""){
            alert("Complete los campos");
        }else{
            $('#nombres').hide();
            $('#juego').show(); 
        }
    }); 
   
})