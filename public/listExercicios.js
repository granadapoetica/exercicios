var exercicios = [];
$( document ).ready(function()
{
	$.get("/allExercicio", function(data){		
        exercicios = JSON.parse(data);
        $("#ulExercicios").empty();	
		$("#ulExercicios").append('<li class="list-group-item active"><h4>Exercícios Cadastrados</h4></li>');	
		for (let index = 0; index < exercicios.length; index++){
            var mensagem = JSON.parse(exercicios[index].message);			
            $("#ulExercicios").append('<li class="list-group-item"><p><b>'+ mensagem.enunciado +'</b></p>'+
                                      '<input type="button" onClick="editar('+ exercicios[index].id +')" value="Editar" />'+                                      
                                      '</li>');			
		}
    });
});
function editar(id){
    window.location.href= 'EditarExercicio.html?id='+ id; 
}
function excluir(id){
    alert('Excluir:'+id); 
}