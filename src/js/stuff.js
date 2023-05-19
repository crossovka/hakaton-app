const { spawn } = require('child_process');
const path = require('path');
const { setSequences } = require('./sequences');
const { placeDataHtml } = require('./placeDataHtml');
const { ipcMain } = require('electron');

async function uploadHandler(event, filePath) {
	//start load
	event.sender.send('startLoading');
	console.log('Start loading');
	
	const pythonScript = path.join(
		__dirname.replace('js', 'python_scripts'),
		'test.py'
	);
	const pythonProcess = spawn('python', [pythonScript, filePath]);

	let output = '';
	pythonProcess.stdout.on('data', (data) => {
		output += data.toString();
	});

	pythonProcess.stderr.on('data', (data) => {
		output += data.toString();
	});

	let parsed_json = [];
	pythonProcess.on('close', (code) => {
		// end load	
		event.sender.send('endLoading');

		let returnValue = output.trim();
		if (code != 0) {
			console.error('Python script execution failed with code:', returnValue);
			return;
		}

		// console.log('Python script return value: ', returnValue);
		parsed_json = returnValue
			.split(`<>`)[1]
			.split('\n')
			.filter((x) => x[0] == '{')
			.map((x) => {
				return JSON.parse(x);
			});

		if (parsed_json.length > 0) {
			setSequences(parsed_json);
		}
		
		event.sender.send('amtOfSeqChange', parsed_json.length);
		event.sender.send(
			'averageReactivityChange',
			parsed_json.reduce((a, b) => a + Number(b.prediction), 0) /
				parsed_json.length
		);
	});
}

module.exports = { uploadHandler };
