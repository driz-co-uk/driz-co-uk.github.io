document.addEventListener("DOMContentLoaded",function(){updateGreeting(),updateYear(),setInterval(function(){updateGreeting(),updateYear()},1e3)});const updateGreeting=function(){let e=(new Date).getHours(),n="Hello";n=e<12?"Morning":e<17?"Afternoon":"Evening",document.getElementsByClassName("greeting")[0].innerHTML=n},updateYear=function(){let e=(new Date).getFullYear();document.getElementsByClassName("year")[0].innerHTML=e};
//# sourceMappingURL=/assets/source-maps/application.js.map
//# sourceURL=_assets/js/application.js
