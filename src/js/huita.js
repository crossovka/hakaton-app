const { spawn } = require('child_process');
const path = require('path');

async function uploadHandler(event, filePath) {
	const pythonScript = path.join(
		__dirname.replace('js', 'python_scripts'),
		'script.py'
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
		let returnValue = output.trim();
		if (code != 0) {
			console.error('Python script execution failed with code:', returnValue);
			return;
		}

		parsed_json = returnValue
			.replace("['", '')
			.replace("']", '')
			.replace(/', '/g, `','`)
			.split(`','`)
			.map((x) => JSON.parse(x));
		console.log('Python script return value:', returnValue);
		// js ify [JSON.parse(x) for x in returnValue]
		// parsed_jsons = returnValue.map((x) => JSON.parse(x));
		let qqqqqqqqqqqqq = parsed_json.length;
		console.log(qqqqqqqqqqqqq);
		if (parsed_json.length > 0) {
			console.log(parsed_json);

			// ес длина больше 0 то тут заполнять
			console.log(event);
			const huy = event.getElementById('huy');
			huy.textContent = parsed_json[0].name;

			// document.getElementById('huy').textContent = parsed_json[0].name;
		}

	});
}

module.exports = { uploadHandler };
