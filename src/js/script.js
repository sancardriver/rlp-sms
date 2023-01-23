var currentTab = 0;
document.addEventListener("DOMContentLoaded", function (event) {
    showTab(currentTab);
});

const progress = (value) => {
    document.getElementsByClassName('progress-bar')[0].style.width = `${value}%`;
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
        document.getElementById("prevBtn").classList.add("d-none");
    } else {
        document.getElementById("prevBtn").classList.remove("d-none");
    }
    if (!checkNavigatiorShare()) {
        document.getElementById("statusWarning").classList.remove("d-none");
        document.getElementById("statusWarning").innerHTML = "Die Funktion steht auf diesem Gerät nicht zur Verfügung!";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").classList.add("d-none");
        if (checkNavigatiorShare()) {
            document.getElementById("fnShareButton").classList.remove("d-none");
            document.getElementById("statusWarning").classList.add("d-none");
        } else {
            document.getElementById("fnShareButton").classList.add("d-none");
        }

    } else {
        document.getElementById("nextBtn").classList.remove("d-none");
        document.getElementById("fnShareButton").classList.add("d-none");
    }
}
function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].classList.add("d-none");
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        // document.getElementById("rlp-sms-form").submit();
        // return false;
        //alert("sdf");
        document.getElementById("nextprevious").style.display = "none";
        document.getElementById("register").style.display = "none";
        document.getElementById("text-message").style.display = "block";
    }
    
    progress((100 / (x.length -1)) * currentTab);
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    // y = x[currentTab].getElementsByTagName("input");
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



function shareFunction(available) {
    if(!available){
        document.querySelector('#fnShareButton').style.display = "none";
        document.querySelector('#fnUnavailableButton').style.display = "block";
    }
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
    const beat = document.querySelector('#form-input-beat');
    const ank = document.querySelector('#form-input-ank');
    const son = document.querySelector('#form-input-son');

    const title = undefined;
    const text = "RM: " + rm.value + "\nZLB: " + zlb.value + "\nDia: " + dia.value + "\nSex: " + sex.value + "\nAge: " + age.value + "\nIso: " + iso.value + "\nKg: " + kg.value + "\nMon: " + mon.value + "\nBeat: " + beat.value + "\nAnk: " + ank.value + " Uhr" + "\n" + son.value;
    const url = undefined;
    const files = undefined;

    try {
        await navigator.share({ files, title, text, url });
        logText('Successfully sent share');
    } catch (error) {
        logError('Error sharing: ' + error);
    }
}

document.querySelectorAll("input").forEach((inputEl) => {
    inputEl.value = localStorage.getItem(inputEl.id);
    inputEl.addEventListener("change", persistFunc);
});

//SECTION - Alter der anzumeldenden Person

//NOTE - Konstanten
const switchBirthday = document.querySelector('#form-switch-birthday');
const birthdayDiv = document.querySelector("#form-input-birthday-div");
const inputBirthdate = document.querySelector('#form-input-birthday');
const inputAge = document.querySelector('#form-input-age');
const inputAgeText = document.querySelector('#form-input-age-text');
const switchUseMonthDiv = document.querySelector('#form-switch-use-month-div');
const switchUseMonth = document.querySelector('#form-switch-use-month');


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

//NOTE - Konstanten
const switchKg = document.querySelector('#form-switch-kg');
const kgDiv = document.querySelector("#form-input-kg-div");
const inputKg = document.querySelector('#form-input-kg');


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
