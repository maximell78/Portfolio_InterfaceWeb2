// animbouton.js
// Programmé par : Maxime Lacroix-Lemire
// Dernière Mise À  Jour :  2021/09/18

let deferredInstallPrompt = null;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

// Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

/**
* Event handler for beforeinstallprompt event.
*   Saves the event & shows install button.
*
* @param {Event} evt
*/
function saveBeforeInstallPromptEvent(evt) {
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
}
/**
* Event handler for butInstall - Does the PWA installation.
*
* @param {Event} evt
*/

// Log user response to prompt.

deferredInstallPrompt.userChoice
    .then((choice) => {
        if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt', choice);
        } else {
            console.log('User dismissed the A2HS prompt', choice);
        }
        deferredInstallPrompt = null;
    });
