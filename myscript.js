(function(){
	'use strict';
	// variables
	var panels = ['◯', '△', '☆'];
	var timers = [];
	var results = [];

	var panel0 = document.getElementById('panel0');
	var panel1 = document.getElementById('panel1');
	var panel2 = document.getElementById('panel2');

	var btn0 = document.getElementById('btn0');
	var btn1 = document.getElementById('btn1');
	var btn2 = document.getElementById('btn2');

	var spinButton = document.getElementById('spinButton');

	var stopCount = 0;
	var isPlaying = false;

	//functions
	spinButton.addEventListener('click', function(){
		if (isPlaying) return;
		isPlaying = true;
		this.className = "inactive";
		btn0.className = 'btn';
		btn1.className = 'btn';
		btn2.className = 'btn';
		panel0.className = 'panel';
		panel1.className = 'panel';
		panel2.className = 'panel';

		runSlot(0, panel0);
		runSlot(1, panel1);
		runSlot(2, panel2);
	}); //endof spinButton eventlistener

	function runSlot(n, panel){
		panel.innerHTML = panels[Math.floor(Math.random() * panels.length)];
		timers[n] = setTimeout(function(){
			runSlot(n, panel);
		}, 50);
	} //endof runSlot

	

	btn0.addEventListener('click', function(){
		stopSlot(0, panel0, this);
	}); //endof btn0 eventlistener

	btn1.addEventListener('click', function(){
		stopSlot(1, panel1, this);
	}); //endof btn1 eventlistener

	btn2.addEventListener('click', function(){
		stopSlot(2, panel2, this);
	}); //endof btn2 eventlistener

	function stopSlot(n, panel, btn){
		if (!isPlaying || results[n] !== undefined) return;
		btn.className = 'btn inactive';
		clearTimeout(timers[n]);
		results[n] = panel.innerHTML;
		stopCount++;
		if (stopCount === 3) {
			checkResults();
			results = [];
			timers = [];
			stopCount = 0;
			spinButton.className = '';
			isPlaying = false;
		}
	} //endof stopSlot

	function checkResults(){
		if(results[0] !== results[1] && results[0] !== results[2]){
			panel0.className = 'panel unmatched';
		}
		if(results[1] !== results[0] && results[1] !== results[2]){
			panel1.className = 'panel unmatched';
		}
		if(results[2] !== results[1] && results[2] !== results[0]){
			panel2.className = 'panel unmatched';
		}
	} //endof checkResults
		

})();



