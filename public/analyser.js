  var total =0;
  var atual =1;	
  var valorCalculado = 0;
  var valorCorreto   = 0;
  var exercicios;
  $( document ).ready(function()
  {
	carrega();
  });

  function carrega(){
	$.get("/exercicio", function(data){		
		exercicios = JSON.parse(data);
		if(exercicios.length > 0){ 
			var exercicio = JSON.parse(exercicios[0].message); 
			atual = exercicios[0].exercicio;
			$('#txtEnunciado').text(exercicio.enunciado);
			$("#ulTarefas").empty();	
			$("#ulTarefas").append('<li class="list-group-item active"><h4>Lista de Tarefas do Exercício</h4></li>');	
			for (let index = 0; index < exercicio.tarefas.length; index++){
				$("#ulTarefas").append('<li class="list-group-item"><p>'+ exercicio.tarefas[index].tarefa +'</p></li>');			
			}
			valorCorreto = exercicio.valorcorreto;
		}else{
			alert("Nenhum exercício encontrado!"); 
		} 
	});
   }

  function conferir(){
    if(parseInt(valorCalculado) === parseInt(valorCorreto))
    {
		alert('Correto!');  
		$.post("/progresso",{ exercicio : atual + 1 }, function(data){		
			carrega();
		});
	}else
      alert('Errado');  
   }

  function imprimeNaTela(valor){
	$('#txtValorCalculado').text(valor);
  } 