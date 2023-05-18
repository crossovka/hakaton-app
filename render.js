const { ipcRenderer, remote } = require('electron');
const { dialog } = remote;

const uploadButton = document.getElementById('uploadButton');
const fileListDiv = document.getElementById('fileList');

uploadButton.addEventListener('click', () => {
	dialog
		.showOpenDialog({
			properties: ['openFile'],
			filters: [{ name: 'FASTA Files', extensions: ['fas', 'fasta'] }],
		})
		.then((result) => {
			const filePath = result.filePaths[0];
			ipcRenderer.send('uploadFile', filePath);
		});
});

function displayFileList(file) {
	fileListDiv.innerHTML = '';
	const fileItem = document.createElement('div');
	fileItem.textContent = file;
	fileListDiv.appendChild(fileItem);
}

ipcRenderer.on('fileUploaded', (event, file) => {
	displayFileList(file);
});
