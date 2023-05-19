
// window.addEventListener('DOMContentLoaded', () => {
// 	const fileListDiv = document.getElementById('fileList');
// 	fileListDiv.addEventListener('dragover', (event) => event.preventDefault());
// 	fileListDiv.addEventListener('drop', handleFileDrop);

// 	const fileInput = document.getElementById('fileInput');
// 	fileInput.addEventListener('change', handleFileSelect);
// });

// function handleFileDrop(event) {
// 	event.preventDefault();
// 	const file = event.dataTransfer.files[0];
// 	console.log('File dropped:', file.path);
// 	ipcRenderer.send('uploadFile', file.path);
// }

// function handleFileSelect(event) {
// 	const file = event.target.files[0];
// 	console.log('File selected:', file.path);
// 	ipcRenderer.send('uploadFile', file.path);
// }

