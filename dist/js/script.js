var currentTab=0;document.addEventListener("DOMContentLoaded",(function(e){showTab(currentTab)}));const progress=e=>{document.getElementsByClassName("progress-bar")[0].style.width=`${e}%`};async function webShare(){const e=document.querySelector("#form-input-rm"),t=document.querySelector("#form-select-zlb"),n=document.querySelector("#form-input-dia"),r=document.querySelector("#form-select-sex"),o=document.querySelector("#form-input-age"),a=document.querySelector("#form-select-iso"),i=document.querySelector("#form-input-kg"),s=document.querySelector("#form-select-mon"),c=document.querySelector("#form-select-beat"),d=document.querySelector("#form-input-ank"),u=document.querySelector("#form-input-son"),l="RM: "+e.value+"\nZLB: "+t.value+"\nDia: "+n.value+"\nSex: "+r.value+"\nAge: "+o.value+"\nIso: "+a.value+"\nKg: "+i.value+"\nMon: "+s.value+"\nBeat: "+c.value+"\nAnk: "+d.value+" Uhr\n"+u.value;try{await navigator.share({files:undefined,title:undefined,text:l,url:undefined}),console.log("Successfully sent share")}catch(e){console.log("Error sharing: "+e)}}function checkNavigatiorShare(){return void 0===navigator.share?(console.log("navigator.share nicht verfügbar"),!1):(console.log("navigator.share verfügbar"),!0)}function showTab(e){var t=document.getElementsByClassName("tab");t[e].classList.remove("d-none"),0==e?document.getElementById("prevBtn").classList.add("d-none"):document.getElementById("prevBtn").classList.remove("d-none"),checkNavigatiorShare()||(document.getElementById("statusWarning").classList.remove("d-none"),document.getElementById("statusWarning").innerHTML="Die Funktion steht auf diesem Gerät nicht zur Verfügung!"),e==t.length-1?(document.getElementById("nextBtn").classList.add("d-none"),checkNavigatiorShare()?(document.getElementById("fnShareButton").classList.remove("d-none"),document.getElementById("statusWarning").classList.add("d-none")):document.getElementById("fnShareButton").classList.add("d-none")):(document.getElementById("nextBtn").classList.remove("d-none"),document.getElementById("fnShareButton").classList.add("d-none"))}function nextPrev(e){var t,n=document.getElementsByClassName("tab");if(1==e&&!validateForm())return!1;n[currentTab].classList.add("d-none"),(currentTab+=e)>=n.length&&webShare(),t=100/(n.length-1)*currentTab,document.getElementsByClassName("progress-bar")[0].style.width=`${t}%`,showTab(currentTab)}function validateForm(){var e,t,n=!0;for(e=document.getElementsByClassName("tab")[currentTab].querySelectorAll("textarea, input, select"),t=0;t<e.length;t++)(n=e[t].checkValidity())?e[t].classList.remove("is-invalid"):(n=!1,e[t].classList.add("is-invalid"));return n}function persistFunc(e){localStorage.setItem(e.id,e.value)}document.querySelectorAll("input").forEach((e=>{e.value=localStorage.getItem(e.id),e.addEventListener("change",persistFunc)}));const switchBirthday=document.querySelector("#form-switch-birthday"),birthdayDiv=document.querySelector("#form-input-birthday-div"),inputBirthdate=document.querySelector("#form-input-birthday"),inputAge=document.querySelector("#form-input-age"),inputAgeText=document.querySelector("#form-input-age-text"),switchUseMonthDiv=document.querySelector("#form-switch-use-month-div"),switchUseMonth=document.querySelector("#form-switch-use-month");function calculateAge(e){var t=new Date,n=new Date(e),r=t.getFullYear()-n.getFullYear(),o=t.getMonth()-n.getMonth(),a=(t.getDay(),n.getDay(),12*r+o);(o<0||0===o&&t.getDate()<n.getDate())&&r--,0==r?(r=a,inputAgeText.innerHTML=1==r?"Monat":"Monate"):inputAgeText.innerHTML="Jahre",inputAge.value=r}switchBirthday.addEventListener("change",(function(){1==switchBirthday.checked?(birthdayDiv.classList.remove("d-none"),switchUseMonthDiv.classList.add("d-none"),inputBirthdate.required=!0,inputAge.disabled=!0):(birthdayDiv.classList.add("d-none"),switchUseMonthDiv.classList.remove("d-none"),inputAge.disabled=!1,inputBirthdate.required=!1)})),switchUseMonth.addEventListener("change",(function(){1==switchUseMonth.checked?inputAgeText.innerHTML="Monate":inputAgeText.innerHTML="Jahre"})),inputBirthdate.addEventListener("change",(function(){calculateAge(inputBirthdate.value)}));
//!SECTION
const switchKg=document.querySelector("#form-switch-kg"),kgDiv=document.querySelector("#form-input-kg-div"),inputKg=document.querySelector("#form-input-kg");switchKg.addEventListener("change",(function(){1==switchKg.checked?(kgDiv.classList.remove("d-none"),inputKg.required=!0):(kgDiv.classList.add("d-none"),inputKg.required=!1,inputKg.value=null)})),
//!SECTION
"serviceWorker"in navigator&&window.addEventListener("load",(async()=>{const e=await navigator.serviceWorker.register("service-worker.js");e.waiting&&invokeServiceWorkerUpdateFlow(e),e.addEventListener("updatefound",(()=>{e.installing&&(console.log("Test 1"),e.installing.addEventListener("statechange",(()=>{console.log("Test 2"),e.waiting&&(console.log("Test 3"),navigator.serviceWorker.controller?(console.log("Test 4"),invokeServiceWorkerUpdateFlow(e)):(console.log("Test 5"),console.log("Service Worker initialized for the first time")))})))}));let t=!1;navigator.serviceWorker.addEventListener("controllerchange",(()=>{t||(window.location.reload(),t=!0)}))}));