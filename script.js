const STORAGE_PRODUCTS = "cc_products_v1";
const STORAGE_CART = "cc_cart_v1";
const defaultProducts = [
  {id:"p1",name:"Garrafa reutilizável",price:39.90,description:"Uma opção prática para levar água e reduzir o uso de descartáveis.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&auto=format&fit=crop&q=80"},
  {id:"p2",name:"Caderno essencial",price:24.50,description:"Caderno para organizar ideias, estudos e tarefas do dia a dia.",image:"https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=700&auto=format&fit=crop&q=80"},
  {id:"p3",name:"Bolsa de tecido",price:32.00,description:"Bolsa versátil para pequenas compras e atividades cotidianas.",image:"https://images.unsplash.com/photo-1590875861582-4b8c5b4b8c5b?w=700&auto=format&fit=crop&q=80"}
];
let products = readStorage(STORAGE_PRODUCTS, defaultProducts);
let cart = readStorage(STORAGE_CART, []);
let previewData = "";

function readStorage(key, fallback){try{const value=localStorage.getItem(key);return value?JSON.parse(value):fallback}catch{return fallback}}
function save(){localStorage.setItem(STORAGE_PRODUCTS,JSON.stringify(products));localStorage.setItem(STORAGE_CART,JSON.stringify(cart))}
function money(value){return Number(value).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderProducts(){
 const grid=document.getElementById("product-grid"),empty=document.getElementById("products-empty");
 document.getElementById("product-total").textContent=`${products.length} ${products.length===1?"produto":"produtos"}`;
 empty.hidden=products.length>0;
 grid.innerHTML=products.map(p=>`<article class="product-card">
  <div class="product-image"><img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" onerror="this.style.opacity='.2'"></div>
  <div class="product-info"><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p>
  <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-cart" data-add="${escapeHTML(p.id)}">Adicionar +</button></div></div></article>`).join("");
 grid.querySelectorAll("[data-add]").forEach(btn=>btn.addEventListener("click",()=>addToCart(btn.dataset.add)));
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.quantity++;else cart.push({id,quantity:1});save();renderCart();openCart()}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);save();renderCart()}
function total(){return cart.reduce((sum,item)=>{const p=products.find(x=>x.id===item.id);return sum+(p?p.price*item.quantity:0)},0)}
function renderCart(){
 cart=cart.filter(item=>products.some(p=>p.id===item.id));
 document.getElementById("cart-count").textContent=cart.reduce((n,x)=>n+x.quantity,0);
 document.getElementById("cart-total").textContent=money(total());
 const holder=document.getElementById("cart-items");
 holder.innerHTML=cart.length?cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<div class="cart-row"><img src="${escapeHTML(p.image)}" alt=""><div><h4>${escapeHTML(p.name)}</h4><small>${item.quantity} × ${money(p.price)}</small></div><button class="remove-item" data-remove="${escapeHTML(p.id)}">Remover</button></div>`}).join(""):'<div class="cart-empty">Seu carrinho está vazio.<br>Adicione um produto para começar.</div>';
 holder.querySelectorAll("[data-remove]").forEach(btn=>btn.addEventListener("click",()=>removeFromCart(btn.dataset.remove)));
}
function openCart(){document.getElementById("cart-drawer").classList.add("open");document.getElementById("overlay").classList.add("visible");document.getElementById("cart-drawer").setAttribute("aria-hidden","false")}
function closeCart(){document.getElementById("cart-drawer").classList.remove("open");document.getElementById("overlay").classList.remove("visible");document.getElementById("cart-drawer").setAttribute("aria-hidden","true")}
function showModal(id){document.querySelectorAll(".checkout-modal").forEach(m=>m.hidden=true);document.getElementById(id).hidden=false;document.getElementById("overlay").classList.add("visible")}
function hideModals(){document.querySelectorAll(".checkout-modal").forEach(m=>m.hidden=true);document.getElementById("overlay").classList.remove("visible")}
document.getElementById("open-cart").addEventListener("click",openCart);
document.getElementById("close-cart").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",()=>{closeCart();hideModals()});
document.getElementById("start-checkout").addEventListener("click",()=>{if(!cart.length){alert("Adicione pelo menos um produto ao carrinho.");return}closeCart();document.getElementById("reflection-form").reset();document.getElementById("utility-field").hidden=true;document.getElementById("reflection-error").textContent="";showModal("checkout-modal")});
document.getElementById("close-checkout").addEventListener("click",hideModals);
document.getElementById("back-to-cart").addEventListener("click",()=>{hideModals();openCart()});
document.querySelectorAll('input[name="useful"]').forEach(input=>input.addEventListener("change",()=>{const show=document.querySelector('input[name="useful"]:checked')?.value==="sim";document.getElementById("utility-field").hidden=!show;document.getElementById("utility-reason").required=show;if(!show)document.getElementById("utility-reason").value=""}));
document.getElementById("reflection-form").addEventListener("submit",e=>{
 e.preventDefault();const data=new FormData(e.currentTarget);const need=data.get("need"),budget=data.get("budget"),useful=data.get("useful"),reason=String(data.get("reason")||"").trim();
 if(!need||!budget||!useful){document.getElementById("reflection-error").textContent="Responda às três perguntas para continuar.";return}
 if(useful==="sim"&&reason.length<8){document.getElementById("reflection-error").textContent="Conte um pouco mais sobre a utilidade do produto (mínimo de 8 caracteres).";return}
 const answers=[need,budget,useful];const allPositive=answers.every(x=>x==="sim");
 document.getElementById("result-title").textContent=allPositive?"Você refletiu sobre sua compra!":"Que tal reconsiderar sua escolha?";
 document.getElementById("result-message").textContent=allPositive?"Suas respostas indicam que você pensou na necessidade, no orçamento e na utilidade. A decisão final continua sendo sua.":"Alguma resposta indica que vale a pena fazer uma pausa. Você pode voltar ao carrinho, rever os produtos e considerar se esta compra é a melhor decisão agora.";
 document.getElementById("result-symbol").textContent=allPositive?"✓":"!";
 document.getElementById("result-summary").innerHTML=`<strong>Resumo das respostas</strong><br>Precisa do produto: ${need==="sim"?"Sim":"Não"}<br>Compra cabe no orçamento: ${budget==="sim"?"Sim":"Não"}<br>Produto é útil: ${useful==="sim"?"Sim":"Não"}${useful==="sim"?`<br>Utilidade: ${escapeHTML(reason)}`:""}<br><br><strong>Total do carrinho: ${money(total())}</strong>`;
 showModal("result-modal");
});
document.getElementById("result-back").addEventListener("click",()=>{hideModals();openCart()});
document.getElementById("confirm-purchase").addEventListener("click",()=>{cart=[];save();renderCart();showModal("success-modal")});
document.getElementById("finish").addEventListener("click",()=>{hideModals();window.scrollTo({top:0,behavior:"smooth"})});

const imageInput=document.getElementById("product-image");
imageInput.addEventListener("change",()=>{
 const file=imageInput.files[0];previewData="";
 const img=document.getElementById("preview-img"),placeholder=document.querySelector(".preview-placeholder");
 if(!file){img.hidden=true;placeholder.hidden=false;return}
 if(!file.type.startsWith("image/")){imageInput.value="";alert("Selecione um arquivo de imagem.");return}
 if(file.size>1.5*1024*1024){imageInput.value="";alert("A imagem deve ter até 1,5 MB para facilitar o armazenamento no navegador.");return}
 const reader=new FileReader();reader.onload=()=>{previewData=reader.result;img.src=previewData;img.hidden=false;placeholder.hidden=true};reader.readAsDataURL(file);
});
document.getElementById("product-form").addEventListener("submit",e=>{
 e.preventDefault();const name=document.getElementById("product-name").value.trim(),price=Number(document.getElementById("product-price").value),description=document.getElementById("product-description").value.trim();
 if(!previewData){document.getElementById("form-feedback").textContent="Selecione uma imagem e confira a prévia antes de cadastrar.";return}
 if(!name||!description||!Number.isFinite(price)||price<=0)return;
 products.unshift({id:"p"+Date.now(),name,price,description,image:previewData});
 try{save()}catch(err){products.shift();alert("Não foi possível salvar. A imagem pode ser grande demais para o armazenamento do navegador.");return}
 renderProducts();e.target.reset();previewData="";document.getElementById("preview-img").hidden=true;document.querySelector(".preview-placeholder").hidden=false;document.getElementById("form-feedback").textContent="Produto cadastrado com sucesso!";
 document.getElementById("produtos").scrollIntoView({behavior:"smooth"});
});
renderProducts();renderCart();
