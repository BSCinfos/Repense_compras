/* Compre com Consciência — lógica da loja.
   Depende de produtos.js (CATEGORIES e CATALOG). */

const STORAGE_PRODUCTS = "cc_products_v1"; // produtos cadastrados pelo usuário
const STORAGE_CART = "cc_cart_v1";
const STORAGE_LATER = "cc_later_v1";       // lista "comprar depois"
const FALLBACK_CATEGORY = "Outros";

const $ = id => document.getElementById(id);
const categoryByName = Object.fromEntries(CATEGORIES.map(c => [c.name, c]));
const catalogIds = new Set(CATALOG.map(p => p.id));

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch { return fallback; }
}

// Versões antigas guardavam também os 3 produtos iniciais; eles agora vêm do catálogo.
let userProducts = readStorage(STORAGE_PRODUCTS, []).filter(p => p && !catalogIds.has(p.id));
let cart = readStorage(STORAGE_CART, []);
let later = readStorage(STORAGE_LATER, []);
let previewData = "";
let currentProductId = null;
const filters = { name: "", min: null, max: null, cats: new Set() };

/* ---------- utilidades ---------- */
function save() {
  try {
    localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(userProducts));
    localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
    localStorage.setItem(STORAGE_LATER, JSON.stringify(later));
    return true;
  } catch { return false; }
}
function money(value) { return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); }
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function normalize(text) { return String(text).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim(); }
function allProducts() { return userProducts.concat(CATALOG); }
function getProduct(id) { return allProducts().find(p => p.id === id); }
function categoryOf(p) { return p.category || FALLBACK_CATEGORY; }

/* Ilustração usada quando o produto não tem foto (ou a foto não carrega). */
const illustrationCache = new Map();
function illustration(p) {
  if (illustrationCache.has(p.id)) return illustrationCache.get(p.id);
  const cat = categoryByName[p.category] || { c1: "#e9f0f6", c2: "#c7d8e8" };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${cat.c1}"/><stop offset="1" stop-color="${cat.c2}"/></linearGradient></defs><rect width="400" height="400" rx="40" fill="url(#g)"/><g fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round" stroke-linecap="round" opacity=".9"><path d="M200 110 290 155v90l-90 45-90-45v-90z"/><path d="M110 155l90 45 90-45M200 200v90"/></g></svg>`;
  const uri = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  illustrationCache.set(p.id, uri);
  return uri;
}
function imageOf(p) { return p.image || webImages[p.id] || illustration(p); }

// Se uma foto externa falhar, troca pela ilustração.
document.addEventListener("error", e => {
  const img = e.target;
  if (img.tagName !== "IMG" || !img.dataset.pid || img.dataset.fallback) return;
  const p = getProduct(img.dataset.pid);
  if (p) { img.dataset.fallback = "1"; img.src = illustration(p); }
}, true);

/* ---------- filtros ---------- */
function getFiltered() {
  const q = normalize(filters.name);
  return allProducts().filter(p => {
    if (q && !normalize(p.name).includes(q)) return false;
    if (filters.min !== null && p.price < filters.min) return false;
    if (filters.max !== null && p.price > filters.max) return false;
    if (filters.cats.size && !filters.cats.has(categoryOf(p))) return false;
    return true;
  });
}
function activeFilterCount() {
  return (filters.name ? 1 : 0) + (filters.min !== null || filters.max !== null ? 1 : 0) + (filters.cats.size ? 1 : 0);
}
function renderChips() {
  const counts = {};
  allProducts().forEach(p => { counts[categoryOf(p)] = (counts[categoryOf(p)] || 0) + 1; });
  const names = CATEGORIES.map(c => c.name);
  if (counts[FALLBACK_CATEGORY]) names.push(FALLBACK_CATEGORY);
  $("category-chips").innerHTML = names.map(name => {
    const checked = filters.cats.has(name) ? "checked" : "";
    return `<label class="chip"><input type="checkbox" value="${escapeHTML(name)}" ${checked}><span>${escapeHTML(name)} <small>${counts[name] || 0}</small></span></label>`;
  }).join("");
}
function resetFilters() {
  filters.name = ""; filters.min = null; filters.max = null; filters.cats.clear();
  $("filter-name").value = ""; $("filter-min").value = ""; $("filter-max").value = "";
  renderChips(); renderProducts();
}
function parsePrice(value) {
  if (value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

/* ---------- vitrine ---------- */
function cardHTML(p) {
  return `<article class="product-card" data-id="${escapeHTML(p.id)}">
  <div class="product-image"><img src="${escapeHTML(imageOf(p))}" alt="${escapeHTML(p.name)}" loading="lazy" data-pid="${escapeHTML(p.id)}"></div>
  <div class="product-info">
    <span class="product-cat">${escapeHTML(categoryOf(p))}</span>
    <h3><button type="button" class="product-title" data-open="${escapeHTML(p.id)}">${escapeHTML(p.name)}</button></h3>
    <p>${escapeHTML(p.description)}</p>
    <div class="product-bottom"><span class="price">${money(p.price)}</span><button class="add-cart" type="button" data-add="${escapeHTML(p.id)}">Adicionar +</button></div>
  </div></article>`;
}
function renderProducts() {
  const everything = allProducts();
  const list = getFiltered();
  const filtering = activeFilterCount() > 0;
  const badge = $("filter-badge");
  badge.hidden = !filtering; badge.textContent = activeFilterCount();
  $("product-total").textContent = filtering
    ? `${list.length} de ${everything.length} produtos`
    : `${everything.length} ${everything.length === 1 ? "produto" : "produtos"}`;
  $("products-empty").hidden = everything.length > 0;
  $("filter-empty").hidden = !(everything.length > 0 && list.length === 0);
  const inverted = filters.min !== null && filters.max !== null && filters.min > filters.max;
  $("filter-result").textContent = inverted
    ? "O valor mínimo é maior que o máximo."
    : `${list.length} ${list.length === 1 ? "produto encontrado" : "produtos encontrados"}`;
  $("product-grid").innerHTML = list.map(cardHTML).join("");
}

/* ---------- carrinho ---------- */
function addToCart(id) {
  const item = cart.find(x => x.id === id);
  if (item) item.quantity++; else cart.push({ id, quantity: 1 });
  save(); renderCart(); openCart();
}
function removeFromCart(id) { cart = cart.filter(x => x.id !== id); save(); renderCart(); }
function total() {
  return cart.reduce((sum, item) => { const p = getProduct(item.id); return sum + (p ? p.price * item.quantity : 0); }, 0);
}
function renderCart() {
  cart = cart.filter(item => getProduct(item.id));
  $("cart-count").textContent = cart.reduce((n, x) => n + x.quantity, 0);
  $("cart-total").textContent = money(total());
  const holder = $("cart-items");
  holder.innerHTML = cart.length ? cart.map(item => {
    const p = getProduct(item.id);
    return `<div class="cart-row"><img src="${escapeHTML(imageOf(p))}" alt="" data-pid="${escapeHTML(p.id)}"><div><h4>${escapeHTML(p.name)}</h4><small>${item.quantity} × ${money(p.price)}</small></div><button class="remove-item" type="button" data-remove="${escapeHTML(p.id)}">Remover</button></div>`;
  }).join("") : '<div class="cart-empty">Seu carrinho está vazio.<br>Adicione um produto para começar.</div>';
}
$("cart-items").addEventListener("click", e => {
  const btn = e.target.closest("[data-remove]"); if (btn) removeFromCart(btn.dataset.remove);
});

/* ---------- comprar depois (favoritos) ---------- */
function isLater(id) { return later.includes(id); }
function toggleLater(id) {
  later = isLater(id) ? later.filter(x => x !== id) : later.concat(id);
  save(); renderLater(); updateLaterButton();
}
function renderLater() {
  later = later.filter(id => getProduct(id));
  $("later-count").textContent = later.length;
  const holder = $("later-items");
  holder.innerHTML = later.length ? later.map(id => {
    const p = getProduct(id);
    return `<div class="cart-row"><img src="${escapeHTML(imageOf(p))}" alt="" data-pid="${escapeHTML(p.id)}"><div><h4>${escapeHTML(p.name)}</h4><small>${money(p.price)}</small></div><div class="later-actions"><button class="move-cart" type="button" data-move="${escapeHTML(p.id)}">Ao carrinho</button><button class="remove-item" type="button" data-unsave="${escapeHTML(p.id)}">Remover</button></div></div>`;
  }).join("") : '<div class="cart-empty">Nenhum produto salvo.<br>Use “Comprar depois” na página do produto.</div>';
}
$("later-items").addEventListener("click", e => {
  const move = e.target.closest("[data-move]"), unsave = e.target.closest("[data-unsave]");
  if (move) { later = later.filter(x => x !== move.dataset.move); save(); renderLater(); addToCart(move.dataset.move); }
  if (unsave) toggleLater(unsave.dataset.unsave);
});
function updateLaterButton() {
  const saved = currentProductId && isLater(currentProductId);
  const btn = $("pm-later");
  btn.textContent = saved ? "♥ Salvo para comprar depois" : "♡ Comprar depois";
  btn.classList.toggle("saved", !!saved);
  btn.setAttribute("aria-pressed", saved ? "true" : "false");
}

/* ---------- gavetas e janelas ---------- */
function openDrawer(id) {
  closeDrawers();
  const el = $(id);
  el.classList.add("open"); el.setAttribute("aria-hidden", "false");
  $("overlay").classList.add("visible");
}
function closeDrawers() {
  document.querySelectorAll(".cart-drawer").forEach(d => { d.classList.remove("open"); d.setAttribute("aria-hidden", "true"); });
  $("overlay").classList.remove("visible");
}
function openCart() { openDrawer("cart-drawer"); }
function closeCart() { closeDrawers(); }
function showModal(id) {
  document.querySelectorAll(".checkout-modal").forEach(m => m.hidden = true);
  $(id).hidden = false;
  $("overlay").classList.add("visible");
}
function hideModals() {
  document.querySelectorAll(".checkout-modal").forEach(m => m.hidden = true);
  $("overlay").classList.remove("visible");
}
function closeAll() { closeDrawers(); hideModals(); }

/* ---------- página do produto ---------- */
function openProduct(id) {
  const p = getProduct(id); if (!p) return;
  currentProductId = id;
  closeDrawers();
  const img = $("pm-img");
  delete img.dataset.fallback;
  img.dataset.pid = id; img.src = imageOf(p); img.alt = p.name;
  $("pm-category").textContent = categoryOf(p);
  $("pm-name").textContent = p.name;
  $("pm-price").textContent = money(p.price);
  $("pm-desc").textContent = p.description;
  updateLaterButton();
  showModal("product-modal");
  $("close-product").focus();
}
$("product-grid").addEventListener("click", e => {
  const add = e.target.closest("[data-add]");
  if (add) { addToCart(add.dataset.add); return; }
  const card = e.target.closest(".product-card");
  if (card) openProduct(card.dataset.id);
});
$("close-product").addEventListener("click", hideModals);
$("pm-later").addEventListener("click", () => toggleLater(currentProductId));
$("pm-cart").addEventListener("click", () => { const id = currentProductId; hideModals(); addToCart(id); });

/* ---------- cadastro de produto (só abre ao clicar) ---------- */
function resetAddForm() {
  $("product-form").reset(); previewData = "";
  $("preview-img").hidden = true; document.querySelector(".preview-placeholder").hidden = false;
  $("form-feedback").textContent = "";
}
function openAdd() { closeDrawers(); resetAddForm(); showModal("add-modal"); $("product-name").focus(); }
document.querySelectorAll("[data-open-add]").forEach(b => b.addEventListener("click", openAdd));
$("close-add").addEventListener("click", hideModals);
$("cancel-add").addEventListener("click", hideModals);
$("product-category").insertAdjacentHTML("beforeend", CATEGORIES.map(c => `<option value="${escapeHTML(c.name)}">${escapeHTML(c.name)}</option>`).join(""));

const imageInput = $("product-image");
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0]; previewData = "";
  const img = $("preview-img"), placeholder = document.querySelector(".preview-placeholder");
  if (!file) { img.hidden = true; placeholder.hidden = false; return; }
  if (!file.type.startsWith("image/")) { imageInput.value = ""; alert("Selecione um arquivo de imagem."); return; }
  if (file.size > 1.5 * 1024 * 1024) { imageInput.value = ""; alert("A imagem deve ter até 1,5 MB para facilitar o armazenamento no navegador."); return; }
  const reader = new FileReader();
  reader.onload = () => { previewData = reader.result; img.src = previewData; img.hidden = false; placeholder.hidden = true; };
  reader.readAsDataURL(file);
});
$("product-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = $("product-name").value.trim(), category = $("product-category").value;
  const price = Number($("product-price").value), description = $("product-description").value.trim();
  if (!previewData) { $("form-feedback").textContent = "Selecione uma imagem e confira a prévia antes de cadastrar."; return; }
  if (!name || !description || !category || !Number.isFinite(price) || price <= 0) return;
  userProducts.unshift({ id: "p" + Date.now(), name, price, category, description, image: previewData });
  if (!save()) {
    userProducts.shift();
    alert("Não foi possível salvar. A imagem pode ser grande demais para o armazenamento do navegador.");
    return;
  }
  hideModals(); resetFilters();
  $("produtos").scrollIntoView({ behavior: "smooth" });
});

/* ---------- filtros: eventos ---------- */
$("filter-toggle").addEventListener("click", () => {
  const panel = $("filter-panel");
  panel.hidden = !panel.hidden;
  $("filter-toggle").setAttribute("aria-expanded", String(!panel.hidden));
  if (!panel.hidden) $("filter-name").focus();
});
$("filter-name").addEventListener("input", e => { filters.name = e.target.value; renderProducts(); });
$("filter-min").addEventListener("input", e => { filters.min = parsePrice(e.target.value); renderProducts(); });
$("filter-max").addEventListener("input", e => { filters.max = parsePrice(e.target.value); renderProducts(); });
$("category-chips").addEventListener("change", e => {
  if (e.target.checked) filters.cats.add(e.target.value); else filters.cats.delete(e.target.value);
  renderProducts();
});
$("clear-filters").addEventListener("click", resetFilters);
$("clear-filters-empty").addEventListener("click", resetFilters);

/* ---------- carrinho, reflexão e compra (fluxo original) ---------- */
$("open-cart").addEventListener("click", openCart);
$("close-cart").addEventListener("click", closeCart);
$("open-later").addEventListener("click", () => openDrawer("later-drawer"));
$("close-later").addEventListener("click", closeDrawers);
$("overlay").addEventListener("click", closeAll);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });

$("start-checkout").addEventListener("click", () => {
  if (!cart.length) { alert("Adicione pelo menos um produto ao carrinho."); return; }
  closeCart();
  $("reflection-form").reset(); $("utility-field").hidden = true; $("reflection-error").textContent = "";
  showModal("checkout-modal");
});
$("close-checkout").addEventListener("click", hideModals);
$("back-to-cart").addEventListener("click", () => { hideModals(); openCart(); });
document.querySelectorAll('input[name="useful"]').forEach(input => input.addEventListener("change", () => {
  const show = document.querySelector('input[name="useful"]:checked')?.value === "sim";
  $("utility-field").hidden = !show; $("utility-reason").required = show;
  if (!show) $("utility-reason").value = "";
}));
$("reflection-form").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const need = data.get("need"), budget = data.get("budget"), useful = data.get("useful"), reason = String(data.get("reason") || "").trim();
  if (!need || !budget || !useful) { $("reflection-error").textContent = "Responda às três perguntas para continuar."; return; }
  if (useful === "sim" && reason.length < 8) { $("reflection-error").textContent = "Conte um pouco mais sobre a utilidade do produto (mínimo de 8 caracteres)."; return; }
  const allPositive = [need, budget, useful].every(x => x === "sim");
  $("result-title").textContent = allPositive ? "Você refletiu sobre sua compra!" : "Que tal reconsiderar sua escolha?";
  $("result-message").textContent = allPositive
    ? "Suas respostas indicam que você pensou na necessidade, no orçamento e na utilidade. A decisão final continua sendo sua."
    : "Alguma resposta indica que vale a pena fazer uma pausa. Você pode voltar ao carrinho, rever os produtos e considerar se esta compra é a melhor decisão agora.";
  $("result-symbol").textContent = allPositive ? "✓" : "!";
  $("result-summary").innerHTML = `<strong>Resumo das respostas</strong><br>Precisa do produto: ${need === "sim" ? "Sim" : "Não"}<br>Compra cabe no orçamento: ${budget === "sim" ? "Sim" : "Não"}<br>Produto é útil: ${useful === "sim" ? "Sim" : "Não"}${useful === "sim" ? `<br>Utilidade: ${escapeHTML(reason)}` : ""}<br><br><strong>Total do carrinho: ${money(total())}</strong>`;
  showModal("result-modal");
});
$("result-back").addEventListener("click", () => { hideModals(); openCart(); });
$("confirm-purchase").addEventListener("click", () => { cart = []; save(); renderCart(); showModal("success-modal"); });
$("finish").addEventListener("click", () => { hideModals(); window.scrollTo({ top: 0, behavior: "smooth" }); });

/* ---------- imagens da internet (Wikipedia) ---------- */
const STORAGE_IMAGES = "cc_images_v1";
let webImages = {};
try { webImages = JSON.parse(localStorage.getItem(STORAGE_IMAGES)) || {}; } catch { webImages = {}; }

let refreshTimer;
function scheduleRefresh() {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    renderProducts(); renderCart(); renderLater();
    if (currentProductId && !$("product-modal").hidden) {
      const p = getProduct(currentProductId), img = $("pm-img");
      if (p) { delete img.dataset.fallback; img.src = imageOf(p); }
    }
  }, 300);
}
async function fetchImage(id, term) {
  try {
    const url = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=500&gsrsearch=" + encodeURIComponent(term);
    const data = await (await fetch(url)).json();
    const page = Object.values(data.query?.pages || {})[0];
    webImages[id] = page?.thumbnail?.source || "";
  } catch { /* sem rede: tenta de novo na próxima visita */ }
}
async function loadWebImages() {
  const pending = CATALOG.filter(p => !p.image && IMAGE_TERMS[p.id] && !(p.id in webImages));
  for (let i = 0; i < pending.length; i += 6) {
    await Promise.all(pending.slice(i, i + 6).map(p => fetchImage(p.id, IMAGE_TERMS[p.id])));
    try { localStorage.setItem(STORAGE_IMAGES, JSON.stringify(webImages)); } catch {}
    scheduleRefresh();
  }
}

/* ---------- início ---------- */
renderChips(); renderProducts(); renderCart(); renderLater();
loadWebImages();
