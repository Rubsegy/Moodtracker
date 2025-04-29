function hoyISO(){
    return new Date().toISOString().split('T')[0];
  }
  
  function enviarEstado(estado){
    let xhr = new XMLHttpRequest();
    xhr.open("POST","php/process.php",true);
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
  
    xhr.onload = () => {
      console.log("Respuesta:", xhr.responseText); 
      cargarResumen();                             
    };
  
    xhr.send("estado="+encodeURIComponent(estado));
  }
  
  const ctx   = document.getElementById('grafico');
  let chart   = null;
  
  function cargarResumen(){
    const d = document.getElementById('desde').value;
    const h = document.getElementById('hasta').value;
    const qs = new URLSearchParams({
                resumen:1,
                desde  : d,
                hasta  : h
              }).toString();
  
    fetch("php/process.php?"+qs)
      .then(r => r.json())
      .then(datos => {
        const labels = datos.map(o=>o.estado);
        const totals = datos.map(o=>o.total);
        if(chart) chart.destroy();
        if(totals.length){
          chart = new Chart(ctx,{
            type:'pie',
            data:{labels,datasets:[{data:totals}]},
            options:{responsive:false}
          });
        }else{
          ctx.insertAdjacentHTML('beforebegin',
            '<p><em>No hay registros para ese rango.</em></p>');
        }
      });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#moods button').forEach(btn=>{
      btn.addEventListener('click', () => enviarEstado(btn.dataset.estado));
    });
    document.getElementById('filtrar').addEventListener('click', cargarResumen);  
    document.getElementById('desde').value = hoyISO();
    document.getElementById('hasta').value = hoyISO();
    cargarResumen();
  });
  