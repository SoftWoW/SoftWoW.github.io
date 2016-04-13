var ctrl = false;

function trocouControle(){
	ctrl = $('#seletor_ctrl').val();
}

function start() {
	$("#inicio").hide();
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo0' class='anima0'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='anima3'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");
	//Principais variaveis do jogo
	cursor(false);
	var jogo = {}
	var velocidade = 5;
	var posicaoY = parseInt(Math.random() * 334);
	var posicaoY2 = parseInt(Math.random() * 334);
	var podeAtirar = true;
	var fimdejogo = false;
	var pontos = 0;
	var salvos = 0;
	var perdidos = 0;
	var energiaAtual = 3;
	var pulando = false;
	var correndo = false;
	var pulando = false;
	var correrendo_pra_traz = false;
	var chao = 464;
	var squid = 0;
	var somDisparo=document.getElementById("somDisparo");
	var somExplosao=document.getElementById("somExplosao");
	var musica_fundo=document.getElementById("musica");
	var somGameover=document.getElementById("somGameover");
	var somPerdido=document.getElementById("somPerdido");
	var somResgate=document.getElementById("somResgate");
var element = document.getElementById("container");
	element.onmousemove = function(e) {
		if (!ctrl){
    	var xCoor = e.clientX;
    	var yCoor = e.clientY;
    	$("#jogador").css("top", yCoor - $('#container').offset().top);
    	$("#jogador").css("left", xCoor - $('#container').offset().left);
	}
	}
	

	function cursor(val){
		if(!val)
		{
			$('#body').css('cursor', 'none');
		}else{
			$('#body').css('cursor', '');
		}
		
	}

	//Musica em loop
	musica.addEventListener("ended", function() { musica.currentTime = 0; musica.play();}, false);
	musica.play();

	var TECLA = {
		W: 87,
		S: 83,
		D: 68,
		A: 65,
		L: 76,
		ESPACE : 32,
		MOUSEL : 1
	}
	/*jogo.pressionou = [];
	//Verifica se o usuario pressionou alguma tecla
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;

	});
	$(document).keyup(function(e) {
		jogo.pressionou[e.which] = false;
	});

	$(document).mousedown(function(e){
		jogo.pressionou[e.which] = true;

	});
	$(document).mouseup(function(e){
		jogo.pressionou[e.which] = false;
	
	});*/

	$("#jogador")
		.hammer({drag_max_touches:0})
		.on("touch drag", function(ev) {
			var touches = ev.gesture.touches;

			ev.gesture.preventDefault();

			for(var t=0, len=touches.length; t<len; t++) {
				var target = $(touches[t].target);
				target.css({
					zIndex: 1337,
					top: touches[t].pageY-50
				});
				//Limita movimentacao

				var topo = parseInt($("#jogador").css("top"));

				if (topo<=0) {
					$("#jogador").css("top", 0);
				}

				if (topo>=410) {
					$("#jogador").css("top", 434);
				}
			}
		});
	//Game loop
	jogo.timer = setInterval(loop, 30);
	function loop() {
		movefundo();
		//movejogador();
		moveinimigo1();
		moveinimigo0();
		moveinimigo2();
		moveamigo();
		colisao();
		placar();
		energia();
		//verificaaltura();
	}

	function moveJogadorGravidade(canvas){
		//console.log(canvas);
	}

	 /*$('body').jGravity({ // jGravity works best when targeting the body
			target: 'div#jogador', // Enter your target critera e.g. 'div, p, span', 'h2' or 'div#specificDiv', or even 'everything' to target everything in the body
			ignoreClass: 'ignoreMe', // Specify if you would like to use an ignore class, and then specify the class
			weight: 25, // Enter any number 1-100 ideally (25 is default), you can also use 'heavy' or 'light'
			depth: 5, // Enter a value between 1-10 ideally (1 is default), this is used to prevent targeting structural divs or other items which may break layout in jGravity
			drag: true, // Decide if users can drag elements which have been effected by jGravity
			controle: jogo
	});*/

	//Funcao que movimenta o fundo do jogo
	function movefundo(){
		esquerda = parseInt($("#fundoGame").css("background-position"));
		$("#fundoGame").css("background-position", esquerda-1);
	}

    /*function iniciaPulo(queda){
    	var tempoQueda = undefined;
    	pulando = true;
    	forcapulo = 8;
    	posicaoYInicial = parseInt($("#jogador").css("top"));
    	if (!queda) {
    		var tempoPulo = window.setInterval(executaPulo, 30);
    		pular(true);
    	}
    	else {
    		tempoQueda = window.setInterval(executaQueda, 30);
    	}
    	function executaPulo() {	
    		var topo = parseInt($("#jogador").css("top"));
    		if((posicaoYInicial - topo) < 150){
    			$("#jogador").css("top", topo-forcapulo);
    		
    		}else{
    			window.clearInterval(tempoPulo);
    			tempoQueda = window.setInterval(executaQueda, 30);
    		}
			//window.clearInterval(tempoPulo);//para pulo
		}

		function executaQueda() {
			var colisao2 = ($("#jogador").collision($("#inimigo2")));
    		var topo = parseInt($("#jogador").css("top"));
    		if (colisao2.length > 0) {
    			inimigo2X = parseInt($("#inimigo2").css("left"));
				inimigo2Y = parseInt($("#inimigo2").css("top"));
    			window.clearInterval(tempoQueda);
    			pulando = false;
    			pular(false);
    		}
    		else if(topo <= chao){
    			$("#jogador").css("top", topo+forcapulo);
    		}
    		else{
    			window.clearInterval(tempoQueda);
    			pulando = false;
    			pular(false);
    		}
			//window.clearInterval(tempoPulo);//para pulo
		}
    }

    function verificaaltura() {
    	var topo = parseInt($("#jogador").css("top"));
    	if (topo <= chao && !pulando) {
    		iniciaPulo(true);
    	}
    }*/

	function movejogador(){
		if (ctrl) {
		if(jogo.pressionou[TECLA.ESPACE]){
			//console.log('pressionou espaco');
			//iniciaPulo(false);
			disparo();
		}
		if (jogo.pressionou[TECLA.W]) {
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo-20);
			if (topo <= 0){
				$("#jogador").css("top", topo+10);
			}
		}
		if (jogo.pressionou[TECLA.S]) {
			//disparo_baixo();
			var topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top", topo+20);
			if (topo >= 500){
				$("#jogador").css("top", topo-10);
			}
		}

		if (jogo.pressionou[TECLA.D]) {
			//Chama funcao Disparo
			//disparo();
			posicaoX = parseInt($("#jogador").css("left"));
			$("#jogador").css("left", posicaoX+20);
			//correr(true);
			if (posicaoX > 906) {				
				$("#jogador").css("left", 906);
				//correr(false);
			}
		}
	}
	else {
		if(jogo.pressionou[TECLA.MOUSEL]){
			//console.log('pressionou espaco');
			//iniciaPulo(false);
			disparo();
		}
		
	}
		/*else if(correndo)
		{
			correr(false);
		}*/

		if (jogo.pressionou[TECLA.A]) {
			//disparo_esquerda();
			posicaoX = parseInt($("#jogador").css("left"));
			$("#jogador").css("left", posicaoX-20);
			//correr_pra_traz(true);
			if (posicaoX < 0) {
				$("#jogador").css("left", 0);
				//correr_pra_traz(false);
			}
		}
		/*else if (correrendo_pra_traz) {
			correr_pra_traz(false);
		}
		if (jogo.pressionou[TECLA.L]) {
			//disparo();
		}*/
	}

	function correr(val){
		if (!pulando){
			if(val){
				$("#jogador").attr("class", "correr");
				$("#jogador").css("width", "50px");
				correndo = true;
			}else{
				$("#jogador").attr("class", "anima1");
				$("#jogador").css("width", "36px");
				correndo = false;
			}
		}
	}

	function correr_pra_traz(val){
		if (!pulando){
			if(val){
				$("#jogador").attr("class", "correr_pra_traz");
				$("#jogador").css("width", "50px");
				correrendo_pra_traz = true;
			}else{
				$("#jogador").attr("class", "anima1");
				$("#jogador").css("width", "36px");
				correrendo_pra_traz = false;
			}
		}
	}

	function pular(val){
		if(val){
			$("#jogador").attr("class", "pular");
			$("#jogador").css("width", "36px");
		}else{
			$("#jogador").attr("class", "anima1");
			$("#jogador").css("width", "36px");

		}
	}
	function moveinimigo1() {
		posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left", posicaoX-velocidade);
		$("#inimigo1").css("top", posicaoY);
		if (posicaoX <= 0) {
			energiaAtual--;
			posicaoY = parseInt(Math.random() * 500);
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoY);
		}
	}
	function moveinimigo0() {
		posicaoX = parseInt($("#inimigo0").css("left"));
		$("#inimigo0").css("left", posicaoX-velocidade);
		$("#inimigo0").css("top", posicaoY2);
		if (posicaoX <= 0) {
			energiaAtual--;
			posicaoY2 = parseInt(Math.random() * 500);
			$("#inimigo0").css("left", 694);
			$("#inimigo0").css("top", posicaoY2);
		}
	}
	function moveinimigo2() {
		posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left", posicaoX-0.5);

		if (posicaoX <= 0) {
			$("#inimigo2").css("left", 775);
		}
	}
	function moveamigo() {
		posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left", posicaoX+0.5);

		if (posicaoX > 906) {
			$("#amigo").css("left", 0);
		}
	}
	function disparo() {
		if (podeAtirar == true) {
			podeAtirar = false;
			somDisparo.play();
			topo = parseInt($("#jogador").css("top"));
			posicaoX = parseInt($("#jogador").css("left"));
			//tiroX = posicaoX + 50;
			//topoTiro = topo+20;
			$("#fundoGame").append("<div id = 'disparo' class = 'anima5'></div>");
			$("#disparo").css("top", topo);
			$("#disparo").css("left", posicaoX);

			var tempoDisparo = window.setInterval(executaDisparo, 500);
		}
		function executaDisparo() {
			//posicaoX = parseInt($("#disparo").css("left"));
			//$("#disparo").css("left", posicaoX+15);
				window.clearInterval(tempoDisparo);
				tempoDisparo = null;
				$("#disparo").remove();
				podeAtirar = true;
		}
	}

	function disparo_esquerda() {
		if (podeAtirar == true) {
			podeAtirar = false;
			somDisparo.play();
			topo = parseInt($("#jogador").css("top"));
			posicaoX = parseInt($("#jogador").css("left"));
			tiroX = posicaoX - 50;
			topoTiro = topo+20;
			$("#fundoGame").append("<div id = 'disparo_esquerda'></div>");
			$("#disparo_esquerda").css("top", topoTiro);
			$("#disparo_esquerda").css("left", tiroX);

			var tempoDisparo = window.setInterval(executaDisparo, 30);
		}
		function executaDisparo() {
			posicaoX = parseInt($("#disparo_esquerda").css("left"));
			$("#disparo_esquerda").css("left", posicaoX-15);
			if (posicaoX < 00) {
				window.clearInterval(tempoDisparo);
				tempoDisparo = null;
				$("#disparo_esquerda").remove();
				podeAtirar = true;
			}
		}
	}
	function colisao() {
		//var colisao1 = ($("#jogador").collision($("#inimigo1")));
		//var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao0 = ($("#disparo").collision($("#inimigo0")));
		//var colisao4 = ($("#disparo").collision($("#inimigo2")));
		//var colisao5 = ($("#jogador").collision($("#amigo")));
		//var colisao6 = ($("#inimigo2").collision($("#amigo")));
		//jogar com inimigo1
		/*if (colisao1.length > 0) {
			energiaAtual--;
			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao1(inimigo1X, inimigo1Y);

			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoY);
		}*/
		//jogador com inimigo2
		/*if (colisao2.length > 0) {
			energiaAtual--;
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			$("#jogador").css("left", inimigo2X-20);
			explosao2(inimigo2X, inimigo2Y);
			$("#inimigo2").remove();
			reposicionaInimigo2();

		}*/
		//Disparo com o inimigo1
		if (colisao3.length > 0) {

			velocidade = velocidade + 0.3;
			pontos = pontos + 75;
			squid++;
			if (squid == 100){
				beatGame();
			}

			inimigo1X = parseInt($("#inimigo1").css("left"));
			inimigo1Y = parseInt($("#inimigo1").css("top"));

			//$("#disparo").css("left", 950);
			posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left", 694);
			$("#inimigo1").css("top", posicaoY);

		}
		if (colisao0.length > 0) {

			velocidade = velocidade + 0.3;
			pontos = pontos + 75;
			squid++;
			if (squid == 100){
				beatGame();
			}

			inimigo0X = parseInt($("#inimigo0").css("left"));
			inimigo0Y2 = parseInt($("#inimigo0").css("top"));

			//$("#disparo").css("left", 950);
			posicaoY2 = parseInt(Math.random() * 334);
			$("#inimigo0").css("left", 694);
			$("#inimigo0").css("top", posicaoY2);

		}

		//Disparo com inimigo2
		/*if (colisao4.length > 0) {
			pontos = pontos + 50;
			inimigo2X = parseInt($("#inimigo2").css("left"));
			inimigo2Y = parseInt($("#inimigo2").css("top"));
			$("#inimigo2").remove();

			explosao2(inimigo2X, inimigo2Y);
			$("#disparo").css("left", 950);

			reposicionaInimigo2();
		}*/
		//jogador com amigo
		/*if (colisao5.length > 0) {
			somResgate.play();
			salvos++;
			$("#amigo").remove();
			reposicionaAmigo();
		}
		//Inimigo2 com o amigo
		if (colisao6.length > 0) {
			perdidos++;
			amigoX = parseInt($("#amigo").css("left"));
			amigoY = parseInt($("#amigo").css("top"));
			explosao3(amigoX, amigoY);
			$("#amigo").remove();
			reposicionaAmigo();
		}*/
	}
	//Explosao1
	function explosao1(inimigo1X, inimigo1Y) {
		somExplosao.play();
		$("#fundoGame").append("<div id='explosao1'></div>");
		$("#explosao1").css("background-image", "url(imgs/explosao.png)");
		var div = $("#explosao1");
		div.css("top", inimigo1Y);
		div.css("left", inimigo1X);
		div.animate({width: 200, opacity: 0}, "slow");
		var tempoExplosao = window.setInterval(removeExplosao, 1000);
		function removeExplosao() {
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}
	}
	//Explosao2
	/*function explosao2(inimigo2X, inimigo2Y) {
		somExplosao.play();
		$("#fundoGame").append("<div id='explosao2'></div>");
		$("#explosao2").css("background-image", "url(imgs/explosao.png)");
		var div2 = $("#explosao2");
		div2.css("top", inimigo2Y);
		div2.css("left", inimigo2X);
		div2.animate({width: 200, opacity: 0}, "slow");
		var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

		function removeExplosao2() {
			div2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2 = null;
		}
	}*/
	//Reposiciona Inimigo2
	function reposicionaInimigo2() {
		var tempoColisao4 = window.setInterval(reposiciona4, 5000);
		function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4 = null;
		}

		if (fimdejogo == false) {
			$("#fundoGame").append("<div id = inimigo2></div>");
		}
	}
	//Reposiciona Amigo
	function reposicionaAmigo() {
		var tempoAmigo = window.setInterval(reposiciona6, 6000);
		function reposiciona6() {
			window.clearInterval(tempoAmigo);
			tempoAmigo = null;

			if (fimdejogo == false) {
				$("#fundoGame").append("<div id = 'amigo' class = 'anima3'></div>");
			}
		}
	}
	//Explosao3
	function explosao3(amigoX, amigoY) {
		somPerdido.play();
		$("#fundoGame").append("<div id = 'explosao3' class = 'anima4'></div>");
		$("#explosao3").css("top", amigoY);
		$("#explosao3").css("left", amigoX);
		var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
		function resetaExplosao3() {
			$("#explosao3").remove();
			window.clearInterval(tempoExplosao3);
			tempoExplosao3 = null;
		}
	}
	function placar() {
		$("#placar").html("<h2> Pontos: " + pontos + " Lulas derrotadas: " + squid + "</h2>");
	}
	//Barra de energia
	function energia() {
		if (energiaAtual==3) {
			$("#energia").css("background-image", "url(imgs/energia3.png)");
		}
		if (energiaAtual==2) {
			$("#energia").css("background-image", "url(imgs/energia2.png)");
		}
		if (energiaAtual==1) {
			$("#energia").css("background-image", "url(imgs/energia1.png)");
		}
		if (energiaAtual==0) {
			$("#energia").css("background-image", "url(imgs/energia0.png)");
			//Game Over
			gameOver();
		}
	}
	//funcao GAME OVER
	function gameOver () {
		cursor(true);
		fimdejogo=true;
		musica.pause();
		somGameover.play();

		window.clearInterval(jogo.timer);
		jogo.timer=null;

		$("#jogador").remove();
		$("#inimigo1").remove();
		$("#inimigo0").remove();
		$("#inimigo2").remove();
		$("#amigo").remove();
		$("#fundoGame").append("<div id='derrota'></div>");
		$("#derrota").html("<h1> Fim de Jogo </h1><p>Sua pontuação foi: " + pontos + "<br> A quantidade de Lulas derrotadas foi: " + squid + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	}
	function beatGame () {
		cursor(true);
		fimdejogo=true;
		musica.pause();

		window.clearInterval(jogo.timer);
		jogo.timer=null;

		$("#jogador").remove();
		$("#inimigo1").remove();
		$("#inimigo0").remove();
		$("#inimigo2").remove();
		$("#amigo").remove();
		$("#fundoGame").append("<div id='fim'></div>");
		$("#fim").html("<h1> Voce venceu o jogo!! </h1> <br> <p>Oque voce esta fazendo com sua vida?</p> <p>Sua pontuação foi: " + pontos + "<br> A quantidade de Lulas derrotadas foi: " + squid + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>");
	}
}

//Reinicia o jogo
function reiniciaJogo() {
	somGameover.pause();
	$("#derrota").remove();
	$("#fim").remove();
	start();
}