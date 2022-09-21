var exercicio;
$( document ).ready(function()
{
    var queryString = window.location.search;
    var urlParams   = new URLSearchParams(queryString);
    var paramId     = urlParams.get('id');    
    $.get("/exerciciobyId",{ id: paramId },function(data){				
        exercicio = JSON.parse(data);
        var message = JSON.parse(exercicio[0].message);
        $('#txtEnunciado').val(message.enunciado);
        $("#ulTarefas").empty();	
		$("#ulTarefas").append('<li class="list-group-item active"><h4>Exercícios Cadastrados</h4></li>');	
		for (let index = 0; index < message.tarefas.length; index++){            
            $("#ulTarefas").append('<li class="list-group-item"><p><b>'+ message.tarefas[index].tarefa +'</b></p></li>');			            
		}
        $('#txtValorEsperado').val(message.valorcorreto);       
    });    
});

function atualizar(){
    var listaTarefas = [];
    $('#ulTarefas li').each(function(i){
        var value = $(this);  
        if(value[0].childNodes[0].innerHTML !== 'Exercícios Cadastrados')               
        listaTarefas.push({ tarefa : value[0].childNodes[0].innerHTML });
    });
     

    var exercicioAtualizado = { 
        enunciado:$('#txtEnunciado').val() , 
        tarefas: listaTarefas,
        valorcorreto: $('#txtValorEsperado').val() 
    } 
    
    
    $.post("/atualizarexercicio",{ id: exercicio[0].id,
    message: JSON.stringify(exercicioAtualizado) },function(data){
         alert(data);    
    });
}