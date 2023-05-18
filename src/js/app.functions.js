const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;
// reafing and sending parameters async to the main.js

// close app
// searching for an item by id фтв when click will send a parameter 'closeApp' to main.js
closeBtn.addEventListener('click', () => {
	ipc.send('closeApp');
});
// function close_app() {
// 	ipcRenderer.send('closeBtn', true);
// }

// minimize app
minimizeBtn.addEventListener('click', () => {
	ipc.send('minimizeApp');
});

// MAX RESTORE app
maxResBtn.addEventListener('click', () => {
	ipc.send('maximizeApp');
});
