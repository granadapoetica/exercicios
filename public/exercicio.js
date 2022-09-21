function executarExercicio(){    
    var soma = 10;            
    for (let index = 0; index < 100; index++) {
        if(index % 2 == 0)
           soma += index;         
    }     
    valorCalculado = soma;
    imprimeNaTela(valorCalculado);
}
