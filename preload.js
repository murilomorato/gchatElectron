const { ipcRenderer } = require('electron');

let lastFavicon = '';

function observeFavicon() {
    const favicon = document.querySelector('link[rel="icon"]');

    if (!favicon) {
        console.log('Favicon not found, retrying in 2 seconds...');
        setTimeout(observeFavicon, 2000);
        return;
    }

    console.log('Favicon found, starting observation...');
    const config = { attributes: true, attributeFilter: ['href'] };

    const callback = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'href') {
                const href = mutation.target.href;
                if (href !== lastFavicon) {
                    ipcRenderer.send('favicon-changed', href);
                    lastFavicon = href;
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(favicon, config);

    // Loop de verificação de notificação
    setInterval(() => {
        const currentFavicon = document.querySelector('link[rel="icon"]');
        if (currentFavicon && currentFavicon.href !== lastFavicon) {
            const href = currentFavicon.href;
            console.log('Favicon changed (interval check):', href);
            ipcRenderer.send('favicon-changed', href);
            lastFavicon = href;
        }
    }, 5000);
}

window.addEventListener('load', () => {
    observeFavicon();
});
