// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
// 	const replaceText = (selector, text) => {
// 		const element = document.getElementById(selector);
// 		if (element) element.innerText = text;
// 	};

// 	for (const dependency of ['chrome', 'node', 'electron']) {
// 		replaceText(`${dependency}-version`, process.versions[dependency]);
// 	}
// });

// LOADER =========================================================
// window.addEventListener('beforeunload ', () => {
// 	const loader = document.getElementById('loader');
// 	loader.style.display = 'none';

// 	setTimeout(() => {
// 		loader.classList.add('fadeOut');
// 		setTimeout(() => {
// 			loader.style.display = 'block';
// 		});
// 	}, 1000);
// });
// LOADER =========================================================

window.addEventListener('DOMContentLoaded', () => {
	const fileListDiv = document.getElementById('fileList');
	fileListDiv.addEventListener('dragover', (event) => event.preventDefault());
	fileListDiv.addEventListener('drop', handleFileDrop);

	const fileInput = document.getElementById('fileInput');
	fileInput.addEventListener('change', handleFileSelect);
});

function handleFileDrop(event) {
	event.preventDefault();
	const file = event.dataTransfer.files[0];
	ipcRenderer.send('uploadFile', file.path);
}

function handleFileSelect(event) {
	const file = event.target.files[0];
	ipcRenderer.send('uploadFile', file.path);
}
