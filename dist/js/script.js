function logText(e,t){t?console.error(e):console.log(e);const o=document.createElement("p");t&&o.setAttribute("class","error"),document.querySelector("#output").appendChild(o),o.appendChild(document.createTextNode(e))}function logError(e){logText(e,!0)}function persistFunc(e){localStorage.setItem(e.id,e.value)}function shareFunction(e){e||(document.querySelector("#fnShareButton").disabled=!0),document.querySelector("#fnCopyText").style.display="none"}function GetAge(e){var t=new Date,o=t.getFullYear()-e.getFullYear(),r=t.getMonth()-e.getMonth();return(r<0||0===r&&t.getDate()<e.getDate())&&o--,o}async function webShare(){const e=document.querySelector("#form-input-rm"),t=document.querySelector("#form-select-zlb"),o=document.querySelector("#form-input-dia"),r=document.querySelector("#form-select-sex"),n=document.querySelector("#form-input-age"),u=document.querySelector("#form-select-iso"),a=document.querySelector("#form-input-kg"),c=document.querySelector("#form-select-mon"),l=document.querySelector("#form-input-ank"),i="RM: "+e.value+"\nZLB: "+t.value+"\nDia: "+o.value+"\nSex: "+r.value+"\nAge: "+n.value+"\nIso: "+u.value+"\nKg: "+a.value+"\nMon: "+c.value+"\nAnk: "+l.value+" Uhr";try{await navigator.share({files:undefined,title:undefined,text:i,url:undefined}),logText("Successfully sent share")}catch(e){logError("Error sharing: "+e)}}function onLoad(){void 0===navigator.share&&(shareFunction(!1),"http:"===window.location.protocol?window.location.replace(window.location.href.replace(/^http:/,"https:")):logError("Error: You need to use a browser that supports this draft proposal."))}window.addEventListener("load",onLoad),document.querySelectorAll("input").forEach((e=>{e.value=localStorage.getItem(e.id),e.addEventListener("change",persistFunc)})),(()=>{"use strict";const e=document.querySelectorAll(".needs-validation");Array.from(e).forEach((e=>{e.addEventListener("submit",(t=>{e.checkValidity()?webShare():(t.preventDefault(),t.stopPropagation()),e.classList.add("was-validated")}),!1)}))})();const birth=document.querySelector("#form-input-birth");birth.addEventListener("change",(function(){var e=new Date,t=new Date(birth.value),o=e.getFullYear()-t.getFullYear(),r=e.getMonth()-t.getMonth();(r<0||0===r&&e.getDate()<t.getDate())&&o--,document.querySelector("#form-input-age").value=o}));const birthswitch=document.querySelector("#birthswitch");birthswitch.addEventListener("change",(function(){1==birthswitch.checked?(document.querySelector("#div-form-input-age").style.display="none",document.querySelector("#div-form-input-birth").style.display="flex"):(document.querySelector("#div-form-input-age").style.display="flex",document.querySelector("#div-form-input-birth").style.display="none")}));