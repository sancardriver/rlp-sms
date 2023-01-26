const progressBar=document.getElementsByClassName("progress-bar"),progress=e=>{progressBar[0].style.width=`${e}%`},prevBtn=document.getElementById("prevBtn"),nextBtn=document.getElementById("nextBtn"),statusWarning=document.getElementById("statusWarning"),switchUseBirthday=document.querySelector("#form-check-usebirthday"),switchUseBirthdayPicker=document.querySelector("#form-check-usebirthdaypicker"),inputBirthdayDiv=document.querySelector("#form-input-birthday-div"),inputBirthday=document.querySelector("#form-input-birthday"),inputBirthdayPickerDiv=document.querySelector("#form-input-birthdaypicker-div"),inputBirthdayPicker=document.querySelector("#form-input-birthdaypicker"),inputAge=document.querySelector("#form-input-age"),inputAgeUnit=document.querySelector("#form-select-ageunit"),changeSelectedAgeUnit=e=>{inputAgeUnit.value=`${e}`},selectIso=document.querySelector("#form-select-iso"),inputIsoIssueDiv=document.querySelector("#form-input-iso-issue-div"),switchKg=document.querySelector("#form-switch-kg"),kgDiv=document.querySelector("#form-input-kg-div"),inputKg=document.querySelector("#form-input-kg"),inputAnk=document.getElementById("form-input-ank"),setTimeNow=document.getElementById("setTimeNow"),setTime10=document.getElementById("setTime10"),setTime15=document.getElementById("setTime15"),setTime20=document.getElementById("setTime20"),setTime25=document.getElementById("setTime25"),setTime30=document.getElementById("setTime30"),resetButton=document.getElementById("resetButton"),resetToast=document.getElementById("resetToast");var isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Samsung:function(){return navigator.userAgent.match(/SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)||navigator.userAgent.match(/WPDesktop/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};function isStandalone(){const e=window.matchMedia("(display-mode: standalone)").matches;return!!document.referrer.startsWith("android-app://")||!(!("standalone"in navigator)&&!e)}selectIso.addEventListener("change",(function(){"Nein"==selectIso.value||""==selectIso.value?inputIsoIssueDiv.classList.add("d-none"):inputIsoIssueDiv.classList.remove("d-none")}));var currentTab=0;function showTab(e){var t=document.getElementsByClassName("tab");t[e].classList.remove("d-none"),0==e?prevBtn.classList.add("d-none"):prevBtn.classList.remove("d-none"),checkNavigatiorShare()||(statusWarning.classList.remove("d-none"),statusWarning.innerHTML="Die Funktion steht auf diesem Gerät nicht zur Verfügung!"),e==t.length-1?(nextBtn.classList.add("d-none"),checkNavigatiorShare()?(document.getElementById("fnShareButton").classList.remove("d-none"),statusWarning.classList.add("d-none")):document.getElementById("fnShareButton").classList.add("d-none")):(nextBtn.classList.remove("d-none"),document.getElementById("fnShareButton").classList.add("d-none"))}function validateForm(){var e,t,i=!0,n="0";for(e=document.getElementsByClassName("tab")[currentTab].querySelectorAll("input, select"),console.log(e),t=0;t<e.length;t++)(i=e[t].checkValidity())?e[t].classList.remove("is-invalid"):(i=!1,e[t].classList.add("is-invalid"),n++);return"0"==n&&i}function resetAllSwitchs(){switchUseBirthday.checked=!1,inputBirthdayDiv.classList.add("d-none"),switchUseBirthdayPicker.checked=!1,inputBirthdayPickerDiv.classList.add("d-none"),switchKg.checked=!1,kgDiv.classList.add("d-none")}function nextPrev(e){var t,i=document.getElementsByClassName("tab");if(1==e&&!validateForm())return!1;i[currentTab].classList.add("d-none"),999==e?(resetAllSwitchs(),currentTab=0):currentTab+=e,currentTab>=i.length&&webShare(),t=100/(i.length-1)*currentTab,progressBar[0].style.width=`${t}%`,showTab(currentTab)}function persistFunc(e){localStorage.setItem(e.id,e.value)}function ageCalculator(e){var t,i=e,n=new Date,r=i.getYear(),a=i.getMonth(),s=i.getDate(),d=n.getYear(),c=n.getMonth(),o=n.getDate(),u=d-r;if(c>=a)var l=c-a;else{u--;l=12+c-a}if(o>=s)var h=o-s;else{h=31+o-s;--l<0&&(l=11,u--)}0==(t={years:u,months:l,days:h}).years&&0==t.months&&0==t.days?(inputAge.value="1",changeSelectedAgeUnit("day")):0==t.years&&0==t.months&&t.days>0?(inputAge.value=t.days,changeSelectedAgeUnit("day")):0==t.years&&t.months>0&&0==t.days||0==t.years&&t.months>0&&t.days>0?(inputAge.value=t.months,changeSelectedAgeUnit("month")):1==t.years&&0==t.months&&0==t.days?(inputAge.value=t.years,changeSelectedAgeUnit("year")):1==t.years&&0==t.months&&t.days>0||1==t.years&&t.months>0&&0==t.days||1==t.years&&t.months>0&&t.days>0?(inputAge.value=t.months+12,changeSelectedAgeUnit("month")):(t.years>1&&0==t.months&&0==t.days||t.years>1&&0==t.months&&t.days>0||t.years>1&&t.months>0&&0==t.days||t.years>1&&t.months>0&&t.days>0)&&(inputAge.value=t.years,changeSelectedAgeUnit("year"))}function setTimeToField(e){var t=new Date,i=moment(t).add(e,"m").toDate();inputAnk.value=i.toTimeString().substring(0,5)}async function webShare(){var e="",t="";const i=document.querySelector("#form-input-rm"),n=document.querySelector("#form-select-zlb"),r=document.querySelector("#form-input-dia"),a=document.querySelector("#form-select-sex"),s=document.querySelector("#form-input-age"),d=document.querySelector("#form-select-ageunit"),c=document.querySelector("#form-select-iso"),o=document.querySelector("#form-input-iso-issue"),u=document.querySelector("#form-input-kg"),l=document.querySelector("#form-select-mon"),h=document.querySelector("#form-select-beat"),y=document.querySelector("#form-input-ank"),m=document.querySelector("#form-input-son");if("1"==s.value)switch(d.value){case"day":t="Tag";break;case"month":t="Monat";break;default:t=""}else switch(d.value){case"day":t="Tage";break;case"month":t="Monate";break;default:t=""}""!=o.value&&(o.value=" - "+o.value),e=""==u.value?"unter 150kg":u.value+"kg";const g="RM: 🚑 "+i.value+"\nZLB: "+n.value+"\nDia: "+r.value+"\nSex: "+a.value+"\nAge: "+s.value+t+"\nIso: "+c.value+o.value+"\nKg: "+e+"\nMon: "+l.value+"\nBeat: "+h.value+"\nAnk: "+y.value+" Uhr\nInfo: "+m.value;try{await navigator.share({files:undefined,title:"SMS Anmeldung",text:g,url:undefined}),console.log("Successfully sent share")}catch(e){console.log("Error sharing: "+e)}}function checkNavigatiorShare(){return void 0!==navigator.share}function invokeServiceWorkerUpdateFlow(e){const t=document.getElementById("updateAvailableToast");new bootstrap.Toast(t).show();document.getElementById("reloadButton").addEventListener("click",(()=>{e.waiting&&e.waiting.postMessage("SKIP_WAITING")}))}document.addEventListener("DOMContentLoaded",(function(e){showTab(currentTab),isStandalone()||alert("nicht installiert")})),document.querySelectorAll("input").forEach((e=>{e.value=localStorage.getItem(e.id),e.addEventListener("change",persistFunc)})),window.addEventListener("load",(e=>{1==switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.remove("d-none"),inputAgeUnit.disabled=!0,inputBirthday.required=!1,inputBirthdayPicker.required=!0):1==switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.remove("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),inputAgeUnit.disabled=!0,inputBirthday.required=!0,inputBirthdayPicker.required=!1):(1!=switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked||1!=switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked)&&(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),switchUseBirthdayPicker.checked=!1,inputAgeUnit.disabled=!1,inputBirthday.required=!1,inputBirthdayPicker.required=!1),console.log("page is fully loaded")})),switchUseBirthday.addEventListener("change",(function(){1==switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.remove("d-none"),inputAgeUnit.disabled=!0,inputBirthday.required=!1,inputBirthdayPicker.required=!0):1==switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.remove("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),inputAgeUnit.disabled=!0,inputBirthday.required=!0,inputBirthdayPicker.required=!1):(1!=switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked||1!=switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked)&&(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),switchUseBirthdayPicker.checked=!1,inputAgeUnit.disabled=!1,inputBirthday.required=!1,inputBirthdayPicker.required=!1)})),switchUseBirthdayPicker.addEventListener("change",(function(){1==switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.remove("d-none"),inputAgeUnit.disabled=!0,inputBirthday.required=!1,inputBirthdayPicker.required=!0):1==switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.remove("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),inputAgeUnit.disabled=!0,inputBirthday.required=!0,inputBirthdayPicker.required=!1):1!=switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.remove("d-none"),switchUseBirthday.checked=!0,inputAgeUnit.disabled=!0,inputBirthday.required=!1,inputBirthdayPicker.required=!0):1!=switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked&&(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),switchUseBirthdayPicker.checked=!1,switchUseBirthday.checked=!1,inputAgeUnit.disabled=!1,inputBirthday.required=!1,inputBirthdayPicker.required=!1)})),inputBirthday.addEventListener("change",(function(){var e=inputBirthday.checkValidity();if(console.log(e),e){inputBirthday.classList.remove("is-invalid");var t=inputBirthday.value;ageCalculator(new Date(t.replace(/(\d{2})\.(\d{2})\.(\d{4})/,"$3-$2-$1")))}else e=!1,inputBirthday.classList.add("is-invalid")})),inputBirthdayPicker.addEventListener("change",(function(){var e=inputBirthdayPicker.checkValidity();if(e){inputBirthdayPicker.classList.remove("is-invalid");var t=inputBirthdayPicker.value;ageCalculator(new Date(t.replace(/(\d{4})\.(\d{2})\.(\d{2})/,"$1-$2-$1")))}else e=!1,inputBirthdayPicker.classList.add("is-invalid")})),switchKg.addEventListener("change",(function(){1==switchKg.checked?(kgDiv.classList.remove("d-none"),inputKg.required=!0):(kgDiv.classList.add("d-none"),inputKg.required=!1,inputKg.value=null)})),setTimeNow.addEventListener("click",(()=>{var e=new Date;inputAnk.value=e.toTimeString().substring(0,5),console.log(e.toTimeString().substring(0,5))})),setTime10.addEventListener("click",(()=>{setTimeToField(10)})),setTime15.addEventListener("click",(()=>{setTimeToField(15)})),setTime20.addEventListener("click",(()=>{setTimeToField(20)})),setTime25.addEventListener("click",(()=>{setTimeToField(25)})),setTime30.addEventListener("click",(()=>{setTimeToField(30)})),resetButton&&resetButton.addEventListener("click",(()=>{new bootstrap.Toast(resetToast).show()})),"serviceWorker"in navigator&&window.addEventListener("load",(async()=>{const e=await navigator.serviceWorker.register("service-worker.js");e.waiting&&invokeServiceWorkerUpdateFlow(e),e.addEventListener("updatefound",(()=>{e.installing&&(console.log("Test 1"),e.installing.addEventListener("statechange",(()=>{console.log("Test 2"),e.waiting&&(console.log("Test 3"),navigator.serviceWorker.controller?(console.log("Test 4"),invokeServiceWorkerUpdateFlow(e)):(console.log("Test 5"),console.log("Service Worker initialized for the first time")))})))}));let t=!1;navigator.serviceWorker.addEventListener("controllerchange",(()=>{t||(window.location.reload(),t=!0)}))}));