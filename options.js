const input = document.getElementById('domain');
const listEl = document.getElementById('list');

async function render(){
  const s = await chrome.storage.local.get('blocklist');
  const arr = s.blocklist || [];
  listEl.innerHTML = arr.map(d => `<li>${d} <button data-d="${d}">remove</button></li>`).join('');
  listEl.querySelectorAll('button').forEach(btn => btn.addEventListener('click', async e=>{
    const domain = e.target.dataset.d;
    const s2 = await chrome.storage.local.get('blocklist');
    const newList = (s2.blocklist||[]).filter(x=>x!==domain);
    await chrome.storage.local.set({blocklist: newList});
    chrome.runtime.sendMessage({type:'update-blocklist', blocklist: newList});
    render();
  }));
}

document.getElementById('add').addEventListener('click', async ()=>{
  const val = input.value.trim();
  if(!val) return;
  const s = await chrome.storage.local.get('blocklist');
  const arr = s.blocklist || [];
  arr.push(val);
  await chrome.storage.local.set({blocklist: arr});
  chrome.runtime.sendMessage({type:'update-blocklist', blocklist: arr});
  input.value = '';
  render();
});

render();
