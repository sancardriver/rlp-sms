var currentTab=0;const progressBar=document.getElementsByClassName("progress-bar"),progress=e=>{progressBar[0].style.width=`${e}%`},prevBtn=document.getElementById("prevBtn"),nextBtn=document.getElementById("nextBtn"),statusWarning=document.getElementById("statusWarning"),switchUseBirthday=document.querySelector("#form-check-usebirthday"),switchUseBirthdayPicker=document.querySelector("#form-check-usebirthdaypicker"),inputBirthdayDiv=document.querySelector("#form-input-birthday-div"),inputBirthday=document.querySelector("#form-input-birthday"),inputBirthdayPickerDiv=document.querySelector("#form-input-birthdaypicker-div"),inputBirthdayPicker=document.querySelector("#form-input-birthdaypicker"),inputAge=document.querySelector("#form-input-ageasnummer"),inputAgeUnit=document.querySelector("#form-select-ageunit"),changeSelectedAgeUnit=e=>{inputAgeUnit.value=`${e}`},switchUseMonthDiv=document.querySelector("#form-switch-use-month-div"),switchUseMonth=document.querySelector("#form-switch-use-month"),selectIso=document.querySelector("#form-select-iso"),inputIsoIssueDiv=document.querySelector("#form-input-iso-issue-div"),switchKg=document.querySelector("#form-switch-kg"),kgDiv=document.querySelector("#form-input-kg-div"),inputKg=document.querySelector("#form-input-kg"),inputAnk=document.getElementById("form-input-ank"),setTimeNow=document.getElementById("setTimeNow"),setTime10=document.getElementById("setTime10"),setTime15=document.getElementById("setTime15"),setTime20=document.getElementById("setTime20"),setTime25=document.getElementById("setTime25"),setTime30=document.getElementById("setTime30"),resetButton=document.getElementById("resetButton"),resetToast=document.getElementById("resetToast");function showTab(e){var t=document.getElementsByClassName("tab");t[e].classList.remove("d-none"),0==e?prevBtn.classList.add("d-none"):prevBtn.classList.remove("d-none"),checkNavigatiorShare()||(statusWarning.classList.remove("d-none"),statusWarning.innerHTML="Die Funktion steht auf diesem Gerät nicht zur Verfügung!"),e==t.length-1?(nextBtn.classList.add("d-none"),checkNavigatiorShare()?(document.getElementById("fnShareButton").classList.remove("d-none"),statusWarning.classList.add("d-none")):document.getElementById("fnShareButton").classList.add("d-none")):(nextBtn.classList.remove("d-none"),document.getElementById("fnShareButton").classList.add("d-none"))}function nextPrev(e){var t,n=document.getElementsByClassName("tab");if(1==e&&!validateForm())return!1;n[currentTab].classList.add("d-none"),999==e?currentTab=0:currentTab+=e,currentTab>=n.length&&webShare(),t=100/(n.length-1)*currentTab,progressBar[0].style.width=`${t}%`,showTab(currentTab)}function validateForm(){var e,t,n=!1;for(e=document.getElementsByClassName("tab")[currentTab].querySelectorAll("textarea, input, select"),t=0;t<e.length;t++)(n=e[t].checkValidity())?(e[t].classList.remove("is-invalid"),n=!0):(n=!1,e[t].classList.add("is-invalid"));return n}function persistFunc(e){localStorage.setItem(e.id,e.value)}async function webShare(){var e="",t="";const n=document.querySelector("#form-input-rm"),i=document.querySelector("#form-select-zlb"),s=document.querySelector("#form-input-dia"),r=document.querySelector("#form-select-sex"),a=document.querySelector("#form-input-ageasnummer"),c=document.querySelector("#form-select-ageunit"),o=document.querySelector("#form-select-iso"),d=document.querySelector("#form-input-iso-issue"),u=document.querySelector("#form-input-kg"),l=document.querySelector("#form-select-mon"),m=document.querySelector("#form-select-beat"),h=document.querySelector("#form-input-ank"),g=document.querySelector("#form-input-son");if("1"==a.value)switch(c.value){case"day":t="Tag";break;case"month":t="Monat";break;default:t=""}else switch(c.value){case"day":t="Tage";break;case"month":t="Monate";break;default:t=""}""!=d.value&&(d.value=" - "+d.value),e=""==u.value?"unter 150kg":u.value+"kg";const y="RM: 🚑 "+n.value+"\nZLB: "+i.value+"\nDia: "+s.value+"\nSex: "+r.value+"\nAge: "+a.value+t+"\nIso: "+o.value+d.value+"\nKg: "+e+"\nMon: "+l.value+"\nBeat: "+m.value+"\nAnk: "+h.value+" Uhr\nInfo: "+g.value;try{await navigator.share({files:undefined,title:"SMS Anmeldung",text:y,url:undefined}),console.log("Successfully sent share")}catch(e){console.log("Error sharing: "+e)}}function checkNavigatiorShare(){return void 0!==navigator.share}function ageCalculator(e){var t,n=e,i=new Date,s=n.getYear(),r=n.getMonth(),a=n.getDate(),c=i.getYear(),o=i.getMonth(),d=i.getDate();if(yearAge=c-s,o>=r)var u=o-r;else{yearAge--;u=12+o-r}if(d>=a)var l=d-a;else{l=31+d-a;--u<0&&(u=11,yearAge--)}0==(t={years:yearAge,months:u,days:l}).years&&0==t.months&&0==t.days?(inputAge.value="1",changeSelectedAgeUnit("day")):0==t.years&&0==t.months&&t.days>0?(inputAge.value=t.days,changeSelectedAgeUnit("day")):0==t.years&&t.months>0&&0==t.days||0==t.years&&t.months>0&&t.days>0?(inputAge.value=t.months,changeSelectedAgeUnit("month")):1==t.years&&0==t.months&&0==t.days?(inputAge.value=t.years,changeSelectedAgeUnit("year")):1==t.years&&0==t.months&&t.days>0||1==t.years&&t.months>0&&0==t.days||1==t.years&&t.months>0&&t.days>0?(inputAge.value=t.months+12,changeSelectedAgeUnit("month")):(t.years>1&&0==t.months&&0==t.days||t.years>1&&0==t.months&&t.days>0||t.years>1&&t.months>0&&0==t.days||t.years>1&&t.months>0&&t.days>0)&&(inputAge.value=t.years,changeSelectedAgeUnit("year"))}function setTimeToField(e){var t=new Date,n=moment(t).add(e,"m").toDate();inputAnk.value=n.toTimeString().substring(0,5)}function invokeServiceWorkerUpdateFlow(e){const t=document.getElementById("updateAvailableToast");new bootstrap.Toast(t).show();document.getElementById("reloadButton").addEventListener("click",(()=>{e.waiting&&e.waiting.postMessage("SKIP_WAITING")}))}
//!SECTION
document.addEventListener("DOMContentLoaded",(function(e){showTab(currentTab)})),selectIso.addEventListener("change",(function(){"Nein"==selectIso.value||""==selectIso.value?inputIsoIssueDiv.classList.add("d-none"):inputIsoIssueDiv.classList.remove("d-none")})),document.querySelectorAll("input").forEach((e=>{e.value=localStorage.getItem(e.id),e.addEventListener("change",persistFunc)})),switchUseBirthday.addEventListener("change",(function(){1==switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.remove("d-none"),inputAgeUnit.disabled=!0):1==switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.remove("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),inputAgeUnit.disabled=!0):(1!=switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked||1!=switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked)&&(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),switchUseBirthdayPicker.checked=!1,inputAgeUnit.disabled=!1)})),switchUseBirthdayPicker.addEventListener("change",(function(){1==switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.remove("d-none"),inputAgeUnit.disabled=!0):1==switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.remove("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),inputAgeUnit.disabled=!0):1!=switchUseBirthday.checked&&1==switchUseBirthdayPicker.checked?(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.remove("d-none"),switchUseBirthday.checked=!0,inputAgeUnit.disabled=!0):1!=switchUseBirthday.checked&&1!=switchUseBirthdayPicker.checked&&(inputBirthdayDiv.classList.add("d-none"),inputBirthdayPickerDiv.classList.add("d-none"),switchUseBirthdayPicker.checked=!1,switchUseBirthday.checked=!1,inputAgeUnit.disabled=!1)})),
//!SECTION
switchKg.addEventListener("change",(function(){1==switchKg.checked?(kgDiv.classList.remove("d-none"),inputKg.required=!0):(kgDiv.classList.add("d-none"),inputKg.required=!1,inputKg.value=null)})),
//!SECTION
setTimeNow.addEventListener("click",(()=>{var e=new Date;inputAnk.value=e.toTimeString().substring(0,5),console.log(e.toTimeString().substring(0,5))})),setTime10.addEventListener("click",(()=>{setTimeToField(10)})),setTime15.addEventListener("click",(()=>{setTimeToField(15)})),setTime20.addEventListener("click",(()=>{setTimeToField(20)})),setTime25.addEventListener("click",(()=>{setTimeToField(25)})),setTime30.addEventListener("click",(()=>{setTimeToField(30)})),resetButton&&resetButton.addEventListener("click",(()=>{new bootstrap.Toast(resetToast).show()})),"serviceWorker"in navigator&&window.addEventListener("load",(async()=>{const e=await navigator.serviceWorker.register("service-worker.js");e.waiting&&invokeServiceWorkerUpdateFlow(e),e.addEventListener("updatefound",(()=>{e.installing&&(console.log("Test 1"),e.installing.addEventListener("statechange",(()=>{console.log("Test 2"),e.waiting&&(console.log("Test 3"),navigator.serviceWorker.controller?(console.log("Test 4"),invokeServiceWorkerUpdateFlow(e)):(console.log("Test 5"),console.log("Service Worker initialized for the first time")))})))}));let t=!1;navigator.serviceWorker.addEventListener("controllerchange",(()=>{t||(window.location.reload(),t=!0)}))}));
//!SECTION