const $=id=>document.getElementById(id);
const from=$('from'),to=$('to'),input=$('input'),output=$('output'),status=$('status');
$('swap').addEventListener('click',()=>{if(from.value==='auto')return;const old=from.value;from.value=to.value;to.value=old;});
$('translate').addEventListener('click',translateText);
async function translateText(){
 const text=input.value.trim(); if(!text){status.textContent='Escribe primero el texto que quieres traducir.';return;}
 const source=from.value==='auto'?'autodetect':from.value;
 $('translate').disabled=true;status.textContent='Traduciendo…';
 try{
  const url=new URL('https://api.mymemory.translated.net/get');
  url.searchParams.set('q',text);url.searchParams.set('langpair',`${source}|${to.value}`);
  const response=await fetch(url);if(!response.ok)throw new Error('El servicio respondió con un error.');
  const data=await response.json();const translated=data?.responseData?.translatedText;
  if(!translated)throw new Error('No se recibió una traducción.');
  output.textContent=translated;status.textContent='Traducción lista.';
 }catch(e){status.textContent='No se pudo traducir. Comprueba Internet e inténtalo otra vez.';}
 finally{$('translate').disabled=false;}
}
$('mic').addEventListener('click',()=>{
 const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SpeechRecognition){status.textContent='El dictado por voz no está disponible en este dispositivo/navegador.';return;}
 const rec=new SpeechRecognition();rec.lang=from.value==='auto'?'es-ES':({'es':'es-ES','en':'en-US','fr':'fr-FR','pt':'pt-PT','de':'de-DE','it':'it-IT','ja':'ja-JP','zh':'zh-CN'}[from.value]||'es-ES');
 rec.onstart=()=>status.textContent='Escuchando…';rec.onresult=e=>{input.value=e.results[0][0].transcript;status.textContent='Voz convertida a texto.';};rec.onerror=()=>status.textContent='No se pudo usar el micrófono.';rec.start();
});
$('camera').addEventListener('click',()=> $('image').click());
$('image').addEventListener('change',async e=>{
 const file=e.target.files?.[0];if(!file)return;
 status.textContent='Leyendo texto de la imagen…';
 try{
  if(!window.Tesseract){await loadTesseract();}
  const result=await window.Tesseract.recognize(file,'eng+spa');
  const text=result.data.text.trim();if(!text)throw new Error('No se detectó texto legible.');
  input.value=text;status.textContent='Texto detectado. Pulsa Traducir.';
 }catch(err){status.textContent='No se pudo leer la imagen. Prueba con una foto más nítida e Internet.';}
});
function loadTesseract(){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s);});}
$('speak').addEventListener('click',()=>{if(!('speechSynthesis'in window)){status.textContent='La voz de lectura no está disponible.';return;}const text=output.textContent.trim();if(!text||text==='Tu traducción aparecerá aquí…')return;const u=new SpeechSynthesisUtterance(text);u.lang=({'es':'es-ES','en':'en-US','fr':'fr-FR','pt':'pt-PT','de':'de-DE','it':'it-IT','ja':'ja-JP','zh':'zh-CN'}[to.value]||'en-US');speechSynthesis.cancel();speechSynthesis.speak(u);});
$('copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(output.textContent);status.textContent='Traducción copiada.';}catch(e){status.textContent='No se pudo copiar automáticamente.';}});
$('clear').addEventListener('click',()=>{input.value='';output.textContent='Tu traducción aparecerá aquí…';status.textContent='Listo.';});
