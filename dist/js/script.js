function logText(e,t){t?console.error(e):console.log(e)}function logError(e){logText(e,!0)}function persistFunc(e){localStorage.setItem(e.id,e.value)}function shareFunction(e){e||(document.querySelector("#fnShareButton").style.display="none",document.querySelector("#fnUnavailableButton").style.display="block")}function GetAge(e){var t=new Date,o=t.getFullYear()-e.getFullYear(),n=t.getMonth()-e.getMonth();return(n<0||0===n&&t.getDate()<e.getDate())&&o--,o}async function webShare(){const e=document.querySelector("#form-input-rm"),t=document.querySelector("#form-select-zlb"),o=document.querySelector("#form-input-dia"),n=document.querySelector("#form-select-sex"),r=document.querySelector("#form-input-age"),i=document.querySelector("#form-select-iso"),c=document.querySelector("#form-input-kg"),l=document.querySelector("#form-select-mon"),a=document.querySelector("#form-input-ank"),u=document.querySelector("#form-input-son"),s="RM: "+e.value+"\nZLB: "+t.value+"\nDia: "+o.value+"\nSex: "+n.value+"\nAge: "+r.value+"\nIso: "+i.value+"\nKg: "+c.value+"\nMon: "+l.value+"\nAnk: "+a.value+" Uhr\n"+u.value;try{await navigator.share({files:undefined,title:undefined,text:s,url:undefined}),logText("Successfully sent share")}catch(e){logError("Error sharing: "+e)}}function onLoad(){void 0===navigator.share&&(shareFunction(!1),"http:"===window.location.protocol?window.location.replace(window.location.href.replace(/^http:/,"https:")):logError("Error: You need to use a browser that supports this draft proposal."))}window.addEventListener("load",onLoad),document.querySelectorAll("input").forEach((e=>{e.value=localStorage.getItem(e.id),e.addEventListener("change",persistFunc)}));const birth=document.querySelector("#form-input-birth");birth.addEventListener("change",(function(){var e=new Date,t=new Date(birth.value),o=e.getFullYear()-t.getFullYear(),n=e.getMonth()-t.getMonth();(n<0||0===n&&e.getDate()<t.getDate())&&o--,document.querySelector("#form-input-age").value=o}));const birthswitch=document.querySelector("#birthswitch");birthswitch.addEventListener("change",(function(){1==birthswitch.checked?(document.querySelector("#div-form-input-age").style.display="none",document.querySelector("#div-form-input-birth").style.display="flex",document.querySelector("#form-input-birth").required=!0):(document.querySelector("#div-form-input-age").style.display="flex",document.querySelector("#div-form-input-birth").style.display="none",document.querySelector("#form-input-birth").required=!1)}));const formInputSwitchKg=document.querySelector("#form-input-switch-kg");formInputSwitchKg.addEventListener("change",(function(){1==formInputSwitchKg.checked?(document.querySelector("#div-form-input-kg").style.display="flex",document.querySelector("#form-input-kg").required=!0):(document.querySelector("#div-form-input-kg").style.display="none",document.querySelector("#form-input-kg").required=!1)})),(()=>{"use strict";const e=document.querySelectorAll(".needs-validation");Array.from(e).forEach((e=>{e.addEventListener("submit",(t=>{e.checkValidity()?webShare():(t.preventDefault(),t.stopPropagation()),e.classList.add("was-validated")}),!1)}))})();const resetButton=document.getElementById("resetButton"),resetToast=document.getElementById("resetToast");function invokeServiceWorkerUpdateFlow(e){const t=document.getElementById("updateAvailableToast");new bootstrap.Toast(t).show();document.getElementById("reloadButton").addEventListener("click",(()=>{e.waiting&&e.waiting.postMessage("SKIP_WAITING")}))}resetButton&&resetButton.addEventListener("click",(()=>{new bootstrap.Toast(resetToast).show()}));const resetnow=document.getElementById("reset");resetnow&&resetnow.addEventListener("click",(()=>{document.getElementById("rlp-sms-form").reset()})),"serviceWorker"in navigator&&window.addEventListener("load",(async()=>{const e=await navigator.serviceWorker.register("service-worker.js");e.waiting&&invokeServiceWorkerUpdateFlow(e),e.addEventListener("updatefound",(()=>{e.installing&&(console.log("Test 1"),e.installing.addEventListener("statechange",(()=>{console.log("Test 2"),e.waiting&&(console.log("Test 3"),navigator.serviceWorker.controller?(console.log("Test 4"),invokeServiceWorkerUpdateFlow(e)):(console.log("Test 5"),console.log("Service Worker initialized for the first time")))})))}));let t=!1;navigator.serviceWorker.addEventListener("controllerchange",(()=>{t||(window.location.reload(),t=!0)}))}));