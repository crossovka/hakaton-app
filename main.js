const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

const ipc = ipcMain;

const createWindow = () => {
	const contentSecurityPolicy = `
    default-src 'self';
    script-src 'self';
    style-src 'self' https://fonts.googleapis.com;
    img-src 'self' data:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self';
    base-uri 'self';
	`;
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth: 760,
		minHeight: 420,
		frame: false,
		nodeIntegration: true,
		enableRemoteModule: true,
		contextIsolation: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			devTools: true,
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	mainWindow.loadFile('./src/index.html');

	ipc.on('minimizeApp', () => {
		console.log('Clicked on minimize button');
		mainWindow.minimize();
	});

	ipc.on('maximizeApp', () => {
		if (mainWindow.isMaximized()) {
			console.log('Clicked on restore');
			mainWindow.restore();
		} else {
			mainWindow.maximize();
			console.log('Clicked on maximize');
		}
	});

	ipc.on('closeApp', () => {
		console.log('Clicked on close button');
		mainWindow.close();
	});
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('uploadFile', (event, filePath) => {
	const pythonScript = path.join(
		__dirname,
		'src',
		'python_scripts',
		'script.py'
	);
	const pythonProcess = spawn('python', [pythonScript, filePath]);

	pythonProcess.on('error', (err) => {
		console.error('Python script process error:', err);
	});

	let fileContent = '';

	// Получаем абсолютный путь к файлу
	const absolutePath = path.resolve(filePath);

	// Проверяем, соответствует ли путь требуемому значению
	if (absolutePath === 'C:\\code\\hakaton\\Training Pack\\set_minus.fas') {
		console.log('Успешно');
	}

	pythonProcess.stdout.on('data', (data) => {
		fileContent += data.toString();
	});

	pythonProcess.on('close', (code) => {
		if (code !== 0) {
			console.error(`Python script process exited with code ${code}`);
			return;
		}
		event.sender.send('fileUploaded', fileContent);
	});
});
