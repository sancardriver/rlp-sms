//NOTE - Variablen
var currentTab = 0;

//SECTION - Konstanten
const progressBar = document.getElementsByClassName('progress-bar');
const progress = (value) => {progressBar[0].style.width = `${value}%`;}
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const statusWarning = document.getElementById("statusWarning");
const switchBirthday = document.querySelector('#form-switch-birthday');
const birthdayDiv = document.querySelector("#form-input-birthday-div");
const inputBirthdate = document.querySelector('#form-input-birthday');
const inputAge = document.querySelector('#form-input-age');
const inputAgeText = document.querySelector('#form-input-age-text');
const switchUseMonthDiv = document.querySelector('#form-switch-use-month-div');
const switchUseMonth = document.querySelector('#form-switch-use-month');
//NOTE - Iso
const selectIso = document.querySelector('#form-select-iso');
const inputIsoIssueDiv = document.querySelector('#form-input-iso-issue-div');
//NOTE - Gewicht
const switchKg = document.querySelector('#form-switch-kg');
const kgDiv = document.querySelector("#form-input-kg-div");
const inputKg = document.querySelector('#form-input-kg');

//!SECTION

document.addEventListener("DOMContentLoaded", function (event) {
    showTab(currentTab);
});



selectIso.addEventListener('change', function() {
    if (selectIso.value == 'Nein' || selectIso.value == ''){
        inputIsoIssueDiv.classList.add('d-none');
    } else {
        inputIsoIssueDiv.classList.remove('d-none');
    } 
});




async function webShare() {
    const rm = document.querySelector('#form-input-rm');
    const zlb = document.querySelector('#form-select-zlb');
    const dia = document.querySelector('#form-input-dia');
    const sex = document.querySelector('#form-select-sex');
    const age = document.querySelector('#form-input-age');
    const iso = document.querySelector('#form-select-iso');
    const isoIssue = document.querySelector('#form-input-iso-issue');
    const kg = document.querySelector('#form-input-kg');
    const mon = document.querySelector('#form-select-mon');
    const beat = document.querySelector('#form-select-beat');
    const ank = document.querySelector('#form-input-ank');
    const son = document.querySelector('#form-input-son');

    if (isoIssue.value != ''){
        isoIssue.value = ' - ' + isoIssue.value
    }

    const title = "SMS Anmeldung";
    const text = "RM: 🚑 " + rm.value + "\nZLB: " + zlb.value + "\nDia: " + dia.value + "\nSex: " + sex.value + "\nAge: " + age.value + "\nIso: " + iso.value + isoIssue.value + "\nKg: " + kg.value + "\nMon: " + mon.value + "\nBeat: " + beat.value + "\nAnk: " + ank.value + " Uhr" + "\n" + son.value;
    const url = undefined;
    const files = undefined;

    try {
        await navigator.share({ files, title, text, url });
        console.log('Successfully sent share');
    } catch (error) {
        console.log('Error sharing: ' + error);
    }
}


function checkNavigatiorShare() {
    if (navigator.share === undefined) {
        return false;
    } else {
        return true;
    }
}

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].classList.remove("d-none");
    if (n == 0) {
        prevBtn.classList.add("d-none");
    } else {
        prevBtn.classList.remove("d-none");
    }
    if (!checkNavigatiorShare()) {
        statusWarning.classList.remove("d-none");
        statusWarning.innerHTML = "Die Funktion steht auf diesem Gerät nicht zur Verfügung!";
    }
    if (n == (x.length - 1)) {
        nextBtn.classList.add("d-none");
        if (checkNavigatiorShare()) {
            document.getElementById("fnShareButton").classList.remove("d-none");
            statusWarning.classList.add("d-none");
        } else {
            document.getElementById("fnShareButton").classList.add("d-none");
        }
    } else {
        nextBtn.classList.remove("d-none");
        document.getElementById("fnShareButton").classList.add("d-none");
    }
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].classList.add("d-none");
    if (n == 999) {
        currentTab = 0;
    }else {
        currentTab = currentTab + n;
    }
    if (currentTab >= x.length) {
        webShare();
    }
    progress((100 / (x.length -1)) * currentTab);
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].querySelectorAll('textarea, input, select');
    for (i = 0; i < y.length; i++) {
        valid = y[i].checkValidity();
        if (!valid) {
            valid = false;
            y[i].classList.add("is-invalid");
        } else {
            y[i].classList.remove("is-invalid");
        }
    }
    return valid;
}


function persistFunc(thisArg) {
    localStorage.setItem(thisArg.id, thisArg.value);
}

document.querySelectorAll("input").forEach((inputEl) => {
    inputEl.value = localStorage.getItem(inputEl.id);
    inputEl.addEventListener("change", persistFunc);
});

//SECTION - Alter der anzumeldenden Person

//NOTE - Funktionen

switchBirthday.addEventListener('change', function() {
    if (switchBirthday.checked == true){
        birthdayDiv.classList.remove("d-none");
        switchUseMonthDiv.classList.add("d-none");
        inputBirthdate.required = true;
        inputAge.disabled = true;
    } else {
        birthdayDiv.classList.add("d-none");
        switchUseMonthDiv.classList.remove("d-none");
        inputAge.disabled = false;
        inputBirthdate.required = false;
    } 
});

switchUseMonth.addEventListener('change', function() {
    if (switchUseMonth.checked == true){
        inputAgeText.innerHTML = 'Monate';
    } else {
        inputAgeText.innerHTML = 'Jahre';
    }
});


function calculateAge (birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    var d = today.getDay() - birthDate.getDay();
    var month = age * 12 + m;
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    //TODO - Denkfehler beheben! Hier muss auf den Tag differenziert werden.
    if (age == 0 ){
    	age = month;
        if (age == 1){
            inputAgeText.innerHTML = 'Monat';
        } else {
            inputAgeText.innerHTML = 'Monate';
        }
    } else {
        inputAgeText.innerHTML = 'Jahre';
    }
    inputAge.value = age;
}


inputBirthdate.addEventListener('change', function(){
calculateAge(inputBirthdate.value)
});


//!SECTION

//SECTION - Gewicht der anzumeldenden Person
//NOTE - Funktionen
switchKg.addEventListener('change', function() {
    if (switchKg.checked == true){
        kgDiv.classList.remove("d-none");
        inputKg.required = true;
    } else {
        kgDiv.classList.add("d-none");
        inputKg.required = false;
        inputKg.value = null;
    } 
});

//!SECTION


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
