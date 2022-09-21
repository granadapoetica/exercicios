var tarefasCadastro;
var exercicios = [];
var contador = 0;
var socket = io();
$( document ).ready(function()
{
    tarefasCadastro = $("#ulTarefas");
    tarefasCadastro.append('<li class="list-group-item active"> Lista de Tarefas <input type="button" value="Adicionar" onclick="adiciona()"/> </li>');
    
    socket.on('comunicacaoexercicios', function(msg)
	{        		
		$('#messages').append($('<li>').text(msg));					
    });
});

function gravaExercicio(vExercicio){
    socket.emit('comunicacaoexercicios','enviando...' + contador);
    $.post("/exercicio", { enunciado: vExercicio.enunciado , 
        tarefas: vExercicio.tarefas,
        valorcorreto: vExercicio.valorcorreto }, 
        function(data){
            if((contador +1 ) < exercicios.length){ 
                contador++;             
                gravaExercicio(exercicios[contador]);
            }else{
                alert("Fim"); 
            }       
        }
    );   
}

function executarExercicio(){
    $.get("/exerciciosJson", function(data){		
        exercicios = JSON.parse(data);
        console.log('Data:',exercicios);        
        gravaExercicio(exercicios[contador]);
    });    
}

function adiciona(){
    tarefasCadastro.append('<li class="list-group-item">Tarefa: <input type="text" style="width:750px" /></li>');
}
function salvar(){
    var listaTarefas = [];
    $('#ulTarefas li').each(function(i){
        var value = $(this); 
        if(value[0].childNodes.length > 1)        
           listaTarefas.push({ tarefa : value[0].childNodes[1].value });
    });
    debugger; 

    $.post("/exercicio", { enunciado:$('#txtEnunciado').val() , 
                           tarefas: listaTarefas,
                           valorcorreto: $('#txtValorEsperado').val() }, 
    function(data){
        alert("Exercício Cadastrado com sucesso!");
    });
}