	const express   = require('express');
	const path      = require('path');
	const app       = express();
	var http        = require('http').Server(app);
	var io          = require('socket.io')(http);
	var port        = process.env.PORT || 3002;
	const db        = require("./sqlite.js");
	const fs        = require('fs');
	
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	io.on('connection', function(socket)
	{
	  console.log('socket conectado'); 	
	  socket.on('comunicacaoexercicios', function()
	  {	
		console.log('enviando socket'); 	
		io.emit('comunicacaoexercicios', 'comunicação iniciada...');
	  });
	});

	app.get('/', function(req, res)
	{
	  res.sendFile(__dirname + '/index.html');
	});

	app.get('/exerciciosJson', function(req, res)
	{
		var exerciciosJson = '';
		fs.readFile('./exercicios.json', 'utf8', (err, data) => {
			if (err) {
			  console.error(err);
			  return;
			}
			exerciciosJson = data;
			res.send(exerciciosJson);
		});		
	});

	app.post('/exercicio', async (req, res)=> {
		var exercicio = {
			enunciado: req.body.enunciado,
			tarefas :req.body.tarefas, 
			valorcorreto:req.body.valorcorreto 
		}
		var exercicioJson = JSON.stringify(exercicio);
		db.addMessage(exercicioJson);
		io.emit('comunicacaoexercicios', 'Exercicio' + exercicioJson.enunciado + 'Cadastrado');
		res.end("Cadastrado com sucesso");
	});

	app.post('/atualizarexercicio', async (req, res)=> {
		console.log('Message:',req.body.message); 
		db.updateExercicio(req.body.id,req.body.message);
		res.end("Exercicio atualizado com sucesso");
	});

	app.post('/progresso', async (req, res)=> {
		console.log('Atualizando o progresso:',req.body.exercicio); 
		db.updateProgresso(req.body.exercicio);
		res.end("Exercicio atualizado com sucesso");
	});
1
	app.get('/exercicio', async (req, res)=> {
		var mensagens = await db.getMessages();
		res.end(JSON.stringify(mensagens));				
	});

	app.get('/allExercicio', async (req, res)=> {
		var mensagens = await db.getAllMessages();
		res.end(JSON.stringify(mensagens));				
	});

	app.get('/exerciciobyid', async (req, res)=> {		
		var mensagem = await db.getMessage(parseInt(req.query['id']));		
		console.log('teste',mensagem); 
        res.end(JSON.stringify(mensagem));	
	});
	
	http.listen(port, function(){
		console.log('listening on *:'+ port);
	});