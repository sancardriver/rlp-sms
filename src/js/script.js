/* Logging Funktion für Text */
function logText(message, isError) {
    if (isError)
        console.error(message);
    else
        console.log(message);
    const p = document.createElement('p');
    if (isError)
        p.setAttribute('class', 'error');
    document.querySelector('#output').appendChild(p);
    p.appendChild(document.createTextNode(message));
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
        // document.querySelector('#fnShareButton').style.display = "none";
        document.querySelector('#fnShareButton').disabled = true;
    } else {
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