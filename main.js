const { app, BrowserWindow, ipcMain, Notification, nativeImage } = require('electron');
const path = require('path');

let notificationSent = false;

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            enableRemoteModule: false
        }
    });

    win.loadURL('https://chat.google.com');
    win.removeMenu();// Esconde barras de navegação    
    // win.webContents.openDevTools(); // Abrir devtools
    app.dock.show();

    // Limpa o badge e reseta notificacao quando a janela é focada
    win.on('focus', () => {
        app.dock.setBadge('');
        notificationSent = false;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.on('favicon-changed', (event, href) => {

    if (href.includes('favicon_chat_new_notif_r5.ico') && !notificationSent) {

        console.log('New notification detected');

        const notification = new Notification({
            title: 'Nova Mensagem no Google Chat',
            body: 'Você tem uma nova mensagem no Google Chat.',
            icon: nativeImage.createFromPath(path.join(__dirname, 'assets/icongchat.icns'))
        });

        notification.show();
        // Atualizar o badge de notificação no dock
        app.dock.setBadge('1');
        app.dock.show();
        notificationSent = true; // Marcar que a notificação foi enviada
    }
});


