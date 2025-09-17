// public/app.js
const qInput = document.getElementById('q');
const go = document.getElementById('go');
const results = document.getElementById('results');
const compareBottom = document.getElementById('compare-bottom');

function productCard(p){
  const stores = (p.stores || []).map(s=>`<div class="text-sm text-white/80">${s.store} • ₹${s.price}</div>`).join('');
  return `
    <article class="bg-white/5 p-4 rounded-xl mb-4 flex gap-4 items-center">
      <img src="${p.image||'/placeholder.png'}" alt="" class="w-24 h-24 object-cover rounded-lg"/>
      <div class="flex-1">
        <h3 class="font-semibold">${p.name}</h3>
        <div class="text-sm text-white/60">${p.short||''}</div>
        <div class="mt-2">${stores}</div>
      </div>
      <div class="text-right">
        <div class="text-xl font-bold">₹${p.lowestPrice}</div>
        <div class="text-sm text-white/70">Deal Score: ${p.dealScore||0}</div>
      </div>
    </article>
  `;
}

async function doSearch(q){
  results.innerHTML = '<p class="text-white/60">Loading results...</p>';
  try{
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const json = await res.json();
    if(!json.products || json.products.length===0){
      results.innerHTML = '<p class="text-white/60">No products found</p>';
      return;
    }
    results.innerHTML = json.products.map(productCard).join('');
  }catch(err){
    results.innerHTML = '<p class="text-red-400">Error fetching results</p>';
    console.error(err);
  }
}

go.addEventListener('click', ()=>{ const q=qInput.value.trim(); if(!q) return alert('Type a product name'); doSearch(q); });
compareBottom.addEventListener('click', ()=>{ const q=qInput.value.trim(); if(!q) return alert('Type a product name'); doSearch(q); });
qInput.addEventListener('keydown', e=>{ if(e.key==='Enter'){ go.click(); } });
