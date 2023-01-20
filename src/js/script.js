/* Logging Funktion für Text */
function logText(message, isError) {
    if (isError)
        console.error(message);
    else
        console.log(message);
}
function logError(message) {
    logText(message, true);
}

/* Funktion persistFunc
Damit Informationen aus einem Input-Feld gespeichert werden können um sie später wieder abrufen zu können.
*/
function persistFunc(thisArg) {
    localStorage.setItem(thisArg.id, thisArg.value);
}

/* Funktion shareFunction

*/
function shareFunction(available) {
    if(!available){
        document.querySelector('#fnShareButton').style.display = "none";
        //document.querySelector('#fnShareButton').disabled = true;
        document.querySelector('#fnUnavailableButton').style.display = "block";
    }
}

function GetAge(birthDate) {
    var today = new Date();
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

async function webShare() {
    const rm = document.querySelector('#form-input-rm');
    const zlb = document.querySelector('#form-select-zlb');
    const dia = document.querySelector('#form-input-dia');
    const sex = document.querySelector('#form-select-sex');
    const age = document.querySelector('#form-input-age');
    const iso = document.querySelector('#form-select-iso');
    const kg = document.querySelector('#form-input-kg');
    const mon = document.querySelector('#form-select-mon');
    const ank = document.querySelector('#form-input-ank');
    const son = document.querySelector('#form-input-son');

    const title = undefined;
    const text = "RM: " + rm.value + "\nZLB: " + zlb.value + "\nDia: " + dia.value + "\nSex: " + sex.value + "\nAge: " + age.value + "\nIso: " + iso.value + "\nKg: " + kg.value + "\nMon: " + mon.value + "\nAnk: " + ank.value + " Uhr" + "\n" + son.value;
    const url = undefined;
    const files = undefined;

    try {
        await navigator.share({ files, title, text, url });
        logText('Successfully sent share');
    } catch (error) {
        logError('Error sharing: ' + error);
    }
}

function onLoad() {
    if (navigator.share === undefined) {
        shareFunction(false);
        if (window.location.protocol === 'http:') {
            // navigator.share() is only available in secure contexts.
            window.location.replace(window.location.href.replace(/^http:/, 'https:'));
        } else {
            logError('Error: You need to use a browser that supports this draft ' + 'proposal.');
        }
    }
}
window.addEventListener('load', onLoad);

document.querySelectorAll("input").forEach((inputEl) => {
    inputEl.value = localStorage.getItem(inputEl.id);
    inputEl.addEventListener("change", persistFunc);
});

const birth = document.querySelector('#form-input-birth');
birth.addEventListener('change', function() {
    var today = new Date();
    var birthDate = new Date(birth.value);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    document.querySelector('#form-input-age').value = age;
});

const birthswitch = document.querySelector('#birthswitch');
birthswitch.addEventListener('change', function() {
    if (birthswitch.checked == true){
        document.querySelector('#div-form-input-age').style.display = "none";
        document.querySelector('#div-form-input-birth').style.display = "flex";
        document.querySelector('#form-input-birth').required = true;
      } else {
        document.querySelector('#div-form-input-age').style.display = "flex";
        document.querySelector('#div-form-input-birth').style.display = "none";
        document.querySelector('#form-input-birth').required = false;
      } 
});

const formInputSwitchKg = document.querySelector('#form-input-switch-kg');
formInputSwitchKg.addEventListener('change', function() {
    if (formInputSwitchKg.checked == true){
        document.querySelector('#div-form-input-kg').style.display = "flex";
        document.querySelector('#form-input-kg').required = true;
      } else {
        document.querySelector('#div-form-input-kg').style.display = "none";
        document.querySelector('#form-input-kg').required = false;
      } 
});

(() => {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {

            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            } else {
                // Call webShare() if the form is valid
                webShare();
            }
            form.classList.add('was-validated')
        }, false)
    })
})()

const resetButton = document.getElementById('resetButton')
const resetToast = document.getElementById('resetToast')
if (resetButton) {
    resetButton.addEventListener('click', () => {
    const toast = new bootstrap.Toast(resetToast)
    toast.show()
  })
}





function invokeServiceWorkerUpdateFlow(registration) {
    const toastLiveExample = document.getElementById('updateAvailableToast')
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
    const reloadButton = document.getElementById('reloadButton')
    reloadButton.addEventListener('click', () => {
        if (registration.waiting) {
            // let waiting Service Worker know it should became active
            registration.waiting.postMessage('SKIP_WAITING')
        }
    })
}

const resetnow = document.getElementById('clearButton')
if (resetnow) {
    resetnow.addEventListener('click', () => {
       var element = document.getElementById('rlp-sms-form')
       element.reset()
  })
}

// check if the browser supports serviceWorker at all
if ('serviceWorker' in navigator) {
    // wait for the page to load
    window.addEventListener('load', async () => {
        // register the service worker from the file specified
        const registration = await navigator.serviceWorker.register('service-worker.js')

        // ensure the case when the updatefound event was missed is also handled
        // by re-invoking the prompt when there's a waiting Service Worker
        if (registration.waiting) {
            invokeServiceWorkerUpdateFlow(registration)
        }

        // detect Service Worker update available and wait for it to become installed
        registration.addEventListener('updatefound', () => {
            if (registration.installing) {
                console.log("Test 1")
                // wait until the new Service worker is actually installed (ready to take over)
                registration.installing.addEventListener('statechange', () => {
                    console.log("Test 2")
                    if (registration.waiting) {
                        console.log("Test 3")
                        // if there's an existing controller (previous Service Worker), show the prompt
                        if (navigator.serviceWorker.controller) {
                            console.log("Test 4")
                            invokeServiceWorkerUpdateFlow(registration)
                        } else {
                            console.log("Test 5")
                            // otherwise it's the first install, nothing to do
                            console.log('Service Worker initialized for the first time')
                        }
                    }
                })
            }
        })

        let refreshing = false;

        // detect controller change and refresh the page
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                window.location.reload()
                refreshing = true
            }
        })
    })
}