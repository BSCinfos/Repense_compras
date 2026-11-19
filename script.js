const STORAGE_PRODUCTS = "cc_products_v2";
const STORAGE_CART = "cc_cart_v2";
const STORAGE_SAVED = "cc_saved_v2";

const CATEGORIES = [
  "Eletrônicos, TV e Áudio",
  "Celulares e Smartphones",
  "Informática e Escritório",
  "Games e Consoles",
  "Eletrodomésticos",
  "Eletroportáteis",
  "Casa, Móveis e Decoração",
  "Cozinha e Jantar",
  "Ferramentas e Construção",
  "Automotivo",
  "Esportes e Fitness",
  "Moda e Acessórios",
  "Calçados, Roupas e Bolsas",
  "Beleza e Cuidado Pessoal",
  "Saúde e Bem-Estar",
  "Bebês e Infantil",
  "Brinquedos e Hobbies",
  "Livros e Papelaria",
  "Pet Shop",
  "Alimentos e Bebidas"
];

// Função auxiliar para gerar ilustrações vetoriais limpas (SVG data URI) para cada produto
// Isso garante que as imagens carreguem 100% offline/online, apareçam por inteiro e nunca quebrem
function makeProductSVG(label, bgHex, accentHex, iconType) {
  const icons = {
    tv: `<rect x="45" y="45" width="150" height="95" rx="6" fill="#1e293b" stroke="${accentHex}" stroke-width="4"/><rect x="53" y="53" width="134" height="79" fill="${accentHex}" opacity="0.25"/><path d="M100 140 L140 140 L148 155 L92 155 Z" fill="#475569"/>`,
    headphone: `<path d="M70 115 V95 A50 50 0 0 1 170 95 V115" fill="none" stroke="#1e293b" stroke-width="10" stroke-linecap="round"/><rect x="56" y="102" width="24" height="42" rx="10" fill="${accentHex}"/><rect x="160" y="102" width="24" height="42" rx="10" fill="${accentHex}"/>`,
    speaker: `<rect x="82" y="38" width="76" height="124" rx="16" fill="#1e293b"/><circle cx="120" cy="75" r="16" fill="${accentHex}"/><circle cx="120" cy="125" r="24" fill="none" stroke="${accentHex}" stroke-width="5"/>`,
    phone: `<rect x="82" y="32" width="76" height="136" rx="12" fill="#1e293b"/><rect x="88" y="42" width="64" height="114" rx="6" fill="${accentHex}" opacity="0.3"/><circle cx="120" cy="37" r="2.5" fill="#94a3b8"/>`,
    watch: `<rect x="102" y="30" width="36" height="140" rx="6" fill="#475569"/><rect x="88" y="64" width="64" height="72" rx="14" fill="#1e293b" stroke="${accentHex}" stroke-width="4"/><circle cx="120" cy="100" r="16" fill="none" stroke="${accentHex}" stroke-width="3"/>`,
    laptop: `<rect x="52" y="46" width="136" height="88" rx="6" fill="#1e293b"/><rect x="60" y="54" width="120" height="72" fill="${accentHex}" opacity="0.25"/><path d="M38 134 H202 L192 148 H48 Z" fill="#64748b"/>`,
    chair: `<rect x="85" y="38" width="70" height="72" rx="12" fill="${accentHex}"/><rect x="78" y="114" width="84" height="16" rx="6" fill="#1e293b"/><line x1="120" y1="130" x2="120" y2="158" stroke="#475569" stroke-width="8"/><line x1="90" y1="158" x2="150" y2="158" stroke="#475569" stroke-width="6" stroke-linecap="round"/>`,
    console: `<rect x="55" y="75" width="130" height="54" rx="24" fill="#1e293b"/><circle cx="88" cy="102" r="12" fill="${accentHex}"/><circle cx="152" cy="96" r="5" fill="${accentHex}"/><circle cx="164" cy="106" r="5" fill="#fff"/>`,
    fridge: `<rect x="78" y="28" width="84" height="144" rx="8" fill="#e2e8f0" stroke="#64748b" stroke-width="3"/><line x1="78" y1="78" x2="162" y2="78" stroke="#64748b" stroke-width="3"/><line x1="90" y1="45" x2="90" y2="68" stroke="${accentHex}" stroke-width="4" stroke-linecap="round"/><line x1="90" y1="90" x2="90" y2="125" stroke="${accentHex}" stroke-width="4" stroke-linecap="round"/>`,
    blender: `<path d="M88 42 H152 L142 112 H98 Z" fill="${accentHex}" opacity="0.35" stroke="#1e293b" stroke-width="3"/><rect x="86" y="112" width="68" height="44" rx="8" fill="#1e293b"/><circle cx="120" cy="134" r="10" fill="${accentHex}"/>`,
    lamp: `<path d="M85 85 L100 45 H140 L155 85 Z" fill="${accentHex}"/><line x1="120" y1="85" x2="120" y2="152" stroke="#1e293b" stroke-width="6"/><ellipse cx="120" cy="154" rx="28" ry="7" fill="#1e293b"/>`,
    pan: `<ellipse cx="105" cy="102" rx="48" ry="22" fill="#1e293b"/><ellipse cx="105" cy="98" rx="42" ry="16" fill="#334155"/><rect x="150" y="95" width="46" height="10" rx="5" fill="${accentHex}"/>`,
    drill: `<path d="M65 65 H145 L155 92 H95 L88 142 H68 L76 92 H65 Z" fill="${accentHex}"/><rect x="145" y="71" width="32" height="14" fill="#334155"/>`,
    car: `<path d="M55 112 L72 78 H168 L185 112 V136 H55 Z" fill="${accentHex}"/><circle cx="82" cy="136" r="16" fill="#1e293b"/><circle cx="158" cy="136" r="16" fill="#1e293b"/>`,
    dumbbell: `<rect x="75" y="94" width="90" height="12" fill="#475569"/><rect x="55" y="72" width="14" height="56" rx="4" fill="#1e293b"/><rect x="71" y="78" width="10" height="44" rx="3" fill="${accentHex}"/><rect x="171" y="72" width="14" height="56" rx="4" fill="#1e293b"/><rect x="159" y="78" width="10" height="44" rx="3" fill="${accentHex}"/>`,
    bag: `<path d="M92 72 V60 A28 28 0 0 1 148 60 V72" fill="none" stroke="#1e293b" stroke-width="6"/><rect x="72" y="72" width="96" height="82" rx="10" fill="${accentHex}"/>`,
    shoe: `<path d="M52 126 Q55 95 95 92 L125 75 L145 96 Q185 102 188 126 Z" fill="${accentHex}"/><rect x="50" y="124" width="140" height="12" rx="5" fill="#1e293b"/>`,
    bottle: `<rect x="98" y="34" width="44" height="18" rx="4" fill="#1e293b"/><rect x="88" y="52" width="64" height="106" rx="14" fill="${accentHex}"/><rect x="88" y="86" width="64" height="28" fill="#ffffff" opacity="0.35"/>`,
    book: `<rect x="72" y="38" width="96" height="124" rx="6" fill="${accentHex}"/><rect x="84" y="38" width="8" height="124" fill="#1e293b" opacity="0.3"/><rect x="102" y="64" width="50" height="12" rx="3" fill="#ffffff" opacity="0.8"/>`,
    pet: `<circle cx="120" cy="116" r="24" fill="${accentHex}"/><circle cx="92" cy="84" r="11" fill="${accentHex}"/><circle cx="110" cy="70" r="11" fill="${accentHex}"/><circle cx="130" cy="70" r="11" fill="${accentHex}"/><circle cx="148" cy="84" r="11" fill="${accentHex}"/>`,
    coffee: `<path d="M78 72 H152 V122 A32 32 0 0 1 88 122 Z" fill="#1e293b"/><path d="M152 82 H168 A14 14 0 0 1 168 110 H152" fill="none" stroke="${accentHex}" stroke-width="7"/><rect x="70" y="142" width="90" height="8" rx="4" fill="${accentHex}"/>`
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 240 190">
    <rect width="240" height="190" rx="12" fill="${bgHex}"/>
    ${icons[iconType] || icons.bottle}
    <text x="120" y="177" font-family="sans-serif" font-size="11" font-weight="700" fill="#334155" text-anchor="middle">${label}</text>
  </svg>`;
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const defaultProducts = [
  // 1. Eletrônicos, TV e Áudio
  {
    id: "p1",
    category: "Eletrônicos, TV e Áudio",
    name: "Smart TV LED 43" Full HD HDR",
    price: 1649.00,
    description: "Tela LED de 43 polegadas com resolução Full HD, suporte a HDR10, sistema operacional fluido com aplicativos de streaming integrados, 3 entradas HDMI, 2 USB e áudio Dolby Digital.",
    image: makeProductSVG("Smart TV 43" Full HD", "#eef4fa", "#2563eb", "tv")
  },
  {
    id: "p2",
    category: "Eletrônicos, TV e Áudio",
    name: "Fone de Ouvido Bluetooth Over-Ear ANC",
    price: 289.90,
    description: "Headphone sem fio com cancelamento ativo de ruído, drivers dinâmicos de 40 mm, bateria de até 40 horas de reprodução contínua, almofadas macias e microfone embutido para chamadas.",
    image: makeProductSVG("Headphone Bluetooth ANC", "#f1f5f9", "#0f172a", "headphone")
  },
  {
    id: "p3",
    category: "Eletrônicos, TV e Áudio",
    name: "Caixa de Som Portátil Bluetooth à Prova d'Água",
    price: 239.00,
    description: "Caixa acústica portátil com certificação IPX7 contra água e poeira, radiadores passivos para graves reforçados, conexão Bluetooth 5.3 e autonomia de até 12 horas.",
    image: makeProductSVG("Caixa de Som Portátil", "#fff7ed", "#ea580c", "speaker")
  },

  // 2. Celulares e Smartphones
  {
    id: "p4",
    category: "Celulares e Smartphones",
    name: "Smartphone 128GB 6GB RAM Tela 6.6" 5G",
    price: 1299.00,
    description: "Smartphone intermediário com tela Super AMOLED de 6,6 polegadas e 120Hz, processador octa-core 5G, câmera principal tripla de 50MP com estabilização óptica e bateria de 5.000mAh.",
    image: makeProductSVG("Smartphone 128GB 5G", "#eff6ff", "#1d4ed8", "phone")
  },
  {
    id: "p5",
    category: "Celulares e Smartphones",
    name: "Smartwatch Esportivo GPS Tela AMOLED",
    price: 349.00,
    description: "Relógio inteligente com tela AMOLED de alta visibilidade, monitoramento contínuo de frequência cardíaca, oxigenação do sangue, sono, mais de 100 modos de treino e bateria de 10 dias.",
    image: makeProductSVG("Smartwatch AMOLED GPS", "#f0fdf4", "#15803d", "watch")
  },
  {
    id: "p6",
    category: "Celulares e Smartphones",
    name: "Carregador Portátil Power Bank 10.000mAh USB-C",
    price: 119.90,
    description: "Bateria externa compacta de 10.000mAh com carregamento rápido de 22.5W, duas saídas USB-A e uma porta USB-C bidirecional com proteção contra sobrecarga e superaquecimento.",
    image: makeProductSVG("Power Bank 10.000mAh", "#f8fafc", "#475569", "phone")
  },

  // 3. Informática e Escritório
  {
    id: "p7",
    category: "Informática e Escritório",
    name: "Notebook Core i5 8GB RAM SSD 256GB 15.6"",
    price: 2699.00,
    description: "Notebook para produtividade e estudos com processador Intel Core i5, 8GB de memória DDR4, armazenamento SSD NVMe de 256GB, tela antirreflexo Full HD de 15,6" e teclado numérico.",
    image: makeProductSVG("Notebook Core i5 SSD", "#eef2ff", "#4338ca", "laptop")
  },
  {
    id: "p8",
    category: "Informática e Escritório",
    name: "Cadeira de Escritório Ergonômica Tela Mesh",
    price: 549.00,
    description: "Cadeira giratória com encosto em tela respirável mesh, apoio lombar ajustável, regulagem de altura a gás, braços rebatíveis e base estrelada reforçada suportando até 120 kg.",
    image: makeProductSVG("Cadeira Ergonômica Mesh", "#f1f5f9", "#0284c7", "chair")
  },
  {
    id: "p9",
    category: "Informática e Escritório",
    name: "Kit Teclado e Mouse Sem Fio Silenciosos",
    price: 129.90,
    description: "Conjunto sem fio 2.4GHz com receptor USB único, teclas de perfil baixo macias e silenciosas, mouse óptico ambidestro de 1600 DPI e autonomia de pilhas de longa duração.",
    image: makeProductSVG("Kit Teclado e Mouse", "#f8fafc", "#334155", "laptop")
  },

  // 4. Games e Consoles
  {
    id: "p10",
    category: "Games e Consoles",
    name: "Controle Sem Fio Multiplataforma com Vibração",
    price: 279.00,
    description: "Gamepad ergonômico sem fio compatível com PC, consoles e dispositivos móveis, motores duplos de vibração, gatilhos analógicos precisos e bateria recarregável via USB-C.",
    image: makeProductSVG("Controle Sem Fio Pro", "#eef2ff", "#4f46e5", "console")
  },
  {
    id: "p11",
    category: "Games e Consoles",
    name: "Headset Gamer Surround 7.1 Microfone Removível",
    price: 219.90,
    description: "Headset leve com som surround virtual 7.1, drivers de 50mm, microfone unidirecional com cancelamento de ruído e espuma de memória revestida em tecido respirável.",
    image: makeProductSVG("Headset Gamer 7.1", "#fef2f2", "#dc2626", "headphone")
  },
  {
    id: "p12",
    category: "Games e Consoles",
    name: "Mouse Gamer Óptico 12.000 DPI 6 Botões",
    price: 139.00,
    description: "Mouse com sensor óptico de alta precisão ajustável até 12.000 DPI, switches mecânicos duráveis, cabo paracord flexível de 1,8m e iluminação discreta configurável.",
    image: makeProductSVG("Mouse Gamer 12.000 DPI", "#f0f9ff", "#0369a1", "console")
  },

  // 5. Eletrodomésticos
  {
    id: "p13",
    category: "Eletrodomésticos",
    name: "Forno Micro-ondas 20 Litros Branco 1100W",
    price: 539.00,
    description: "Micro-ondas compacto de 20 litros com 10 níveis de potência, função descongelar por peso, receitas pré-programadas, trava de segurança para crianças e prato giratório de vidro.",
    image: makeProductSVG("Micro-ondas 20L 1100W", "#f8fafc", "#0284c7", "fridge")
  },
  {
    id: "p14",
    category: "Eletrodomésticos",
    name: "Aspirador de Pó Vertical 2 em 1 1300W",
    price: 189.90,
    description: "Aspirador vertical que também funciona como portátil de mão, filtro HEPA lavável que retém ácaros e poeira fina, reservatório transparente sem saco coletor e cabo de 5 metros.",
    image: makeProductSVG("Aspirador Vertical 2 em 1", "#fff7ed", "#ea580c", "fridge")
  },
  {
    id: "p15",
    category: "Eletrodomésticos",
    name: "Ventilador de Mesa 40cm 6 Pás Silencioso",
    price: 169.00,
    description: "Ventilador com hélice de 6 pás para maior vazão de ar, 3 velocidades, oscilação horizontal automática, inclinação vertical regulável e grade removível para limpeza fácil.",
    image: makeProductSVG("Ventilador 40cm 6 Pás", "#eff6ff", "#2563eb", "fridge")
  },

  // 6. Eletroportáteis
  {
    id: "p16",
    category: "Eletroportáteis",
    name: "Fritadeira Elétrica Sem Óleo Air Fryer 4L",
    price: 349.00,
    description: "Fritadeira a ar com capacidade útil de 4 litros, cesto antiaderente removível, controle de temperatura de 80°C a 200°C, timer sonoro de 60 minutos e desligamento automático.",
    image: makeProductSVG("Air Fryer 4 Litros", "#f8fafc", "#1e293b", "blender")
  },
  {
    id: "p17",
    category: "Eletroportáteis",
    name: "Cafeteira Elétrica Programável Jarra Inox 30 Xícaras",
    price: 179.90,
    description: "Cafeteira com jarra térmica em aço inoxidável, filtro permanente lavável, sistema corta-pingos, placa aquecedora e indicador de nível de água transparente.",
    image: makeProductSVG("Cafeteira Jarra Inox", "#fff7ed", "#c2410c", "coffee")
  },
  {
    id: "p18",
    category: "Eletroportáteis",
    name: "Liquidificador 1200W Copo Resistente 3 Litros",
    price: 149.00,
    description: "Liquidificador de alta potência com 12 velocidades mais função pulsar/autolimpeza, 6 lâminas em aço inox serrilhadas para triturar gelo e copo livre de BPA.",
    image: makeProductSVG("Liquidificador 1200W", "#fef2f2", "#b91c1c", "blender")
  },

  // 7. Casa, Móveis e Decoração
  {
    id: "p19",
    category: "Casa, Móveis e Decoração",
    name: "Luminária de Mesa Articulada LED Bivolt",
    price: 89.90,
    description: "Luminária de mesa com braço articulável em metal, iluminação LED com 3 temperaturas de cor (branco quente, neutro e frio) e ajuste de intensidade para leitura ou trabalho.",
    image: makeProductSVG("Luminária LED Articulada", "#fefce8", "#ca8a04", "lamp")
  },
  {
    id: "p20",
    category: "Casa, Móveis e Decoração",
    name: "Jogo de Lençol Casal 4 Peças Microfibra 300 Fios",
    price: 94.90,
    description: "Conjunto composto por 1 lençol de cima, 1 lençol com elástico para colchão de até 30cm de altura e 2 fronhas com toque macio, secagem rápida e resistência a bolinhas.",
    image: makeProductSVG("Jogo de Lençol Casal", "#f0fdf4", "#16a34a", "lamp")
  },
  {
    id: "p21",
    category: "Casa, Móveis e Decoração",
    name: "Estante Livreiro Multiuso 5 Prateleiras MDP",
    price: 229.00,
    description: "Estante organizadora vertical em MDP com acabamento fosco resistente, 5 prateleiras espaçosas ideais para livros, caixas organizadoras e objetos decorativos.",
    image: makeProductSVG("Estante 5 Prateleiras", "#fff7ed", "#9a3412", "lamp")
  },

  // 8. Cozinha e Jantar
  {
    id: "p22",
    category: "Cozinha e Jantar",
    name: "Jogo de Panelas Antiaderente 5 Peças Cerâmica",
    price: 299.00,
    description: "Conjunto com 2 caçarolas, 2 panelas e 1 frigideira com revestimento cerâmico livre de PFOA, tampas de vidro temperado com saída de vapor e cabos antitérmicos.",
    image: makeProductSVG("Jogo de Panelas 5 Peças", "#f8fafc", "#ea580c", "pan")
  },
  {
    id: "p23",
    category: "Cozinha e Jantar",
    name: "Garrafa Térmica Inox Parede Dupla 750ml",
    price: 69.90,
    description: "Garrafa térmica em aço inox 304 com isolamento a vácuo de parede dupla, conserva líquidos gelados por até 24h e quentes por até 12h sem suar por fora.",
    image: makeProductSVG("Garrafa Térmica 750ml", "#eff6ff", "#0284c7", "bottle")
  },
  {
    id: "p24",
    category: "Cozinha e Jantar",
    name: "Kit 10 Potes Herméticos de Vidro com Tampa",
    price: 139.90,
    description: "Potes de vidro borossilicato resistentes a choque térmico, tampas com anel de vedação em silicone e 4 travas laterais, próprios para freezer, micro-ondas e lava-louças.",
    image: makeProductSVG("Kit Potes Herméticos", "#f0fdf4", "#0d9488", "pan")
  },

  // 9. Ferramentas e Construção
  {
    id: "p25",
    category: "Ferramentas e Construção",
    name: "Parafusadeira e Furadeira Sem Fio 12V com Maleta",
    price: 249.00,
    description: "Parafusadeira e furadeira a bateria de íons de lítio 12V, mandril de aperto rápido 3/8", 18 níveis de torque, luz LED frontal e maleta com 13 acessórios.",
    image: makeProductSVG("Parafusadeira 12V Kit", "#fefce8", "#eab308", "drill")
  },
  {
    id: "p26",
    category: "Ferramentas e Construção",
    name: "Jogo de Ferramentas Manuais 110 Peças Maleta",
    price: 189.00,
    description: "Kit completo em aço cromo-vanádio contendo chaves combinadas, alicates, martelo, trena, chaves de fenda/phillips, soquetes e bits organizados em maleta plástica.",
    image: makeProductSVG("Maleta 110 Ferramentas", "#f1f5f9", "#1e293b", "drill")
  },
  {
    id: "p27",
    category: "Ferramentas e Construção",
    name: "Trena Laser Digital Alcance 40 Metros",
    price: 149.90,
    description: "Medidor de distância a laser com precisão de ±2mm, cálculo automático de área, volume e Pitágoras, visor LCD retroiluminado e corpo emborrachado resistente.",
    image: makeProductSVG("Trena Laser 40m", "#fff7ed", "#ea580c", "drill")
  },

  // 10. Automotivo
  {
    id: "p28",
    category: "Automotivo",
    name: "Compressor de Ar Portátil Digital 12V para Pneus",
    price: 159.00,
    description: "Calibrador portátil conectável na tomada 12V do veículo ou bateria recarregável, manômetro digital com desligamento automático na pressão programada e lanterna LED.",
    image: makeProductSVG("Compressor Portátil 12V", "#f8fafc", "#dc2626", "car")
  },
  {
    id: "p29",
    category: "Automotivo",
    name: "Suporte Veicular Magnético Universal para Celular",
    price: 44.90,
    description: "Suporte articulado com fixação firme na saída de ar ou painel, 6 ímãs de neodímio de alta aderência que não interferem no sinal e rotação 360 graus.",
    image: makeProductSVG("Suporte Veicular 360°", "#f1f5f9", "#334155", "car")
  },
  {
    id: "p30",
    category: "Automotivo",
    name: "Kit Limpeza Automotiva Cera, Shampoo e Microfibra",
    price: 79.90,
    description: "Conjunto de cuidados para o carro contendo shampoo automotivo neutro concentrado, cera líquida protetora com carnaúba, limpa-pneus e 2 panos de microfibra.",
    image: makeProductSVG("Kit Estética Automotiva", "#eff6ff", "#2563eb", "car")
  },

  // 11. Esportes e Fitness
  {
    id: "p31",
    category: "Esportes e Fitness",
    name: "Kit Halteres Emborrachados 2x5kg + Colchonete",
    price: 169.90,
    description: "Par de halteres de ferro fundido revestidos em PVC que não riscam o piso, acompanhado de tapete colchonete em EVA de alta densidade para treinos funcionais em casa.",
    image: makeProductSVG("Kit Halteres + Colchonete", "#f0fdf4", "#16a34a", "dumbbell")
  },
  {
    id: "p32",
    category: "Esportes e Fitness",
    name: "Tapete de Yoga Antiderrapante TPE 6mm com Alça",
    price: 84.90,
    description: "Tapete ecológico em TPE de dupla camada com textura antiderrapante nos dois lados, 6mm de espessura para amortecimento articular e alça para transporte.",
    image: makeProductSVG("Tapete de Yoga 6mm", "#faf5ff", "#7e22ce", "dumbbell")
  },
  {
    id: "p33",
    category: "Esportes e Fitness",
    name: "Corda de Pular Rolamento Profissional Cabo de Aço",
    price: 39.90,
    description: "Corda de alta velocidade com manoplas ergonômicas antiderrapantes, sistema de rolamento interno sem atrito e cabo de aço revestido com ajuste fácil de comprimento.",
    image: makeProductSVG("Corda Rolamento Aço", "#fff7ed", "#ea580c", "dumbbell")
  },

  // 12. Moda e Acessórios
  {
    id: "p34",
    category: "Moda e Acessórios",
    name: "Mochila Executiva Impermeável Notebook 15.6"",
    price: 139.90,
    description: "Mochila em poliéster resistente à água com compartimento acolchoado para notebook até 15,6", alças ergonômicas respiráveis, bolso antifurto traseiro e entrada USB.",
    image: makeProductSVG("Mochila Impermeável 15.6"", "#f1f5f9", "#1e293b", "bag")
  },
  {
    id: "p35",
    category: "Moda e Acessórios",
    name: "Óculos de Sol Clássico Polarizado Proteção UV400",
    price: 99.90,
    description: "Armação leve em acetato resistente com lentes polarizadas que reduzem reflexos e oferecem proteção total UV400 contra raios UVA e UVB, acompanha estojo rígido.",
    image: makeProductSVG("Óculos Polarizado UV400", "#fefce8", "#b45309", "bag")
  },
  {
    id: "p36",
    category: "Moda e Acessórios",
    name: "Carteira Masculina Slim Couro Legítimo RFID",
    price: 69.90,
    description: "Carteira compacta confeccionada em couro legítimo com bloqueio antifurto RFID para cartões por aproximação, 6 compartimentos para cartões e divisória para cédulas.",
    image: makeProductSVG("Carteira Couro RFID", "#fff7ed", "#7c2d12", "bag")
  },

  // 13. Calçados, Roupas e Bolsas
  {
    id: "p37",
    category: "Calçados, Roupas e Bolsas",
    name: "Tênis Esportivo Caminhada e Corrida Leve Amortecimento",
    price: 189.90,
    description: "Tênis com cabedal em mesh respirável sem costuras, entressola em EVA macio para absorção de impacto e solado emborrachado antiderrapante para uso diário.",
    image: makeProductSVG("Tênis Caminhada Leve", "#eff6ff", "#1d4ed8", "shoe")
  },
  {
    id: "p38",
    category: "Calçados, Roupas e Bolsas",
    name: "Kit 3 Camisetas Básicas 100% Algodão Fio 30.1",
    price: 109.90,
    description: "Pacote com 3 camisetas lisas versáteis de gola careca reforçada, malha penteada 100% algodão com ótimo caimento, conforto térmico e alta durabilidade nas lavagens.",
    image: makeProductSVG("Kit 3 Camisetas Algodão", "#f8fafc", "#475569", "shoe")
  },
  {
    id: "p39",
    category: "Calçados, Roupas e Bolsas",
    name: "Bolsa Tote Transversal Casual em Lona Reforçada",
    price: 119.00,
    description: "Bolsa feminina espaçosa com alça de mão e alça transversal removível, fechamento principal em zíper, bolsos internos organizadores e tecido de lona durável.",
    image: makeProductSVG("Bolsa Tote Casual", "#fdf2f8", "#be185d", "bag")
  },

  // 14. Beleza e Cuidado Pessoal
  {
    id: "p40",
    category: "Beleza e Cuidado Pessoal",
    name: "Secador de Cabelos Íons Turmalina 2000W",
    price: 159.90,
    description: "Secador potente com emissão de íons negativos que reduzem o frizz e selam as cutículas, 2 velocidades, 3 temperaturas, jato de ar frio e bico direcionador.",
    image: makeProductSVG("Secador Íons 2000W", "#fdf2f8", "#db2777", "bottle")
  },
  {
    id: "p41",
    category: "Beleza e Cuidado Pessoal",
    name: "Aparador de Pelos e Barba Recarregável à Prova d'Água",
    price: 129.90,
    description: "Aparador multifuncional com lâminas autoafiáveis em aço inox, 4 pentes de altura, uso seco ou molhado, carregamento USB e bateria para até 60 minutos de uso.",
    image: makeProductSVG("Aparador Barba e Pelos", "#f1f5f9", "#0f172a", "bottle")
  },
  {
    id: "p42",
    category: "Beleza e Cuidado Pessoal",
    name: "Kit Skincare Facial Gel de Limpeza + Hidratante + Protetor FPS50",
    price: 114.90,
    description: "Rotina diária completa para todos os tipos de pele: gel de limpeza suave sem sabão, sérum hidratante com ácido hialurônico e protetor solar facial toque seco FPS 50.",
    image: makeProductSVG("Kit Skincare Diário", "#f0fdfa", "#0d9488", "bottle")
  },

  // 15. Saúde e Bem-Estar
  {
    id: "p43",
    category: "Saúde e Bem-Estar",
    name: "Balança Digital de Bioimpedância Bluetooth",
    price: 89.90,
    description: "Balança corporal em vidro temperado que mede peso, IMC, percentual de gordura, massa muscular e hidratação sincronizando os dados via aplicativo no celular.",
    image: makeProductSVG("Balança Bioimpedância", "#f0f9ff", "#0284c7", "watch")
  },
  {
    id: "p44",
    category: "Saúde e Bem-Estar",
    name: "Medidor de Pressão Arterial Digital de Braço Automático",
    price: 139.00,
    description: "Monitor clínico automático com braçadeira universal ajustável, detector de arritmia cardíaca, memória para 60 medições e visor grande de fácil leitura.",
    image: makeProductSVG("Monitor de Pressão", "#fef2f2", "#dc2626", "watch")
  },
  {
    id: "p45",
    category: "Saúde e Bem-Estar",
    name: "Umidificador de Ar Ultrassônico 3 Litros Silencioso",
    price: 119.90,
    description: "Umidificador bivolt com reservatório de 3 litros para até 12 horas de névoa fria contínua, controle de intensidade, desligamento automático sem água e compartimento para essências.",
    image: makeProductSVG("Umidificador 3 Litros", "#f0fdf4", "#16a34a", "bottle")
  },

  // 16. Bebês e Infantil
  {
    id: "p46",
    category: "Bebês e Infantil",
    name: "Babá Eletrônica Digital com Câmera Visão Noturna",
    price: 329.00,
    description: "Monitor sem fio com tela LCD colorida de 3.2", visão noturna infravermelha automática, comunicação bidirecional de áudio, sensor de temperatura e modo ECO.",
    image: makeProductSVG("Babá Eletrônica Vídeo", "#eff6ff", "#3b82f6", "tv")
  },
  {
    id: "p47",
    category: "Bebês e Infantil",
    name: "Mochila Maternidade Impermeável Multifunção",
    price: 129.90,
    description: "Mochila espaçosa com bolsos térmicos para mamadeiras, abertura ampla estilo boca de lobo, trocador portátil incluso e alças para acoplar no carrinho de bebê.",
    image: makeProductSVG("Mochila Maternidade", "#fdf2f8", "#ec4899", "bag")
  },
  {
    id: "p48",
    category: "Bebês e Infantil",
    name: "Kit Alimentação Infantil Silicone Livre de BPA 5 Peças",
    price: 74.90,
    description: "Conjunto ergonômico composto por prato com divisórias e ventosa antiderrapante, tigela, copo com canudo, babador coletor e colher macia para introdução alimentar.",
    image: makeProductSVG("Kit Alimentação Bebê", "#fefce8", "#eab308", "pan")
  },

  // 17. Brinquedos e Hobbies
  {
    id: "p49",
    category: "Brinquedos e Hobbies",
    name: "Blocos de Montar Criativos Caixa com 500 Peças",
    price: 119.90,
    description: "Caixa organizadora com 500 peças coloridas de encaixe preciso compatíveis com principais marcas, estimula a criatividade, coordenação motora e raciocínio espacial.",
    image: makeProductSVG("Blocos de Montar 500pç", "#fef2f2", "#ef4444", "console")
  },
  {
    id: "p50",
    category: "Brinquedos e Hobbies",
    name: "Jogo de Tabuleiro Estratégia e Família",
    price: 139.00,
    description: "Jogo de tabuleiro moderno para 2 a 5 jogadores com partidas dinâmicas de 45 minutos, componentes ilustrados de alta qualidade e regras fáceis de aprender.",
    image: makeProductSVG("Jogo de Tabuleiro", "#fff7ed", "#f97316", "book")
  },
  {
    id: "p51",
    category: "Brinquedos e Hobbies",
    name: "Quebra-Cabeça 1000 Peças Paisagem Papelão Holler",
    price: 59.90,
    description: "Quebra-cabeça adulto e juvenil com 1000 peças de encaixe suave e impressão fosca antirreflexo em papelão de alta gramatura, ideal para relaxar longe das telas.",
    image: makeProductSVG("Quebra-Cabeça 1000pç", "#f0fdf4", "#15803d", "book")
  },

  // 18. Livros e Papelaria
  {
    id: "p52",
    category: "Livros e Papelaria",
    name: "Livro: Hábitos Atômicos - James Clear (Edição Brochura)",
    price: 49.90,
    description: "Guia prático sobre como pequenas mudanças diárias geram resultados extraordinários a longo prazo, apresentando um método comprovado para construir bons hábitos.",
    image: makeProductSVG("Livro Hábitos Atômicos", "#fefce8", "#ca8a04", "book")
  },
  {
    id: "p53",
    category: "Livros e Papelaria",
    name: "Caderno Inteligente Reposicionável Capa Dura A5 80 Folhas",
    price: 79.90,
    description: "Caderno com sistema de discos que permite retirar e recolocar folhas à vontade, acompanha divisórias, bolsa plástica interna, elástico e folhas 90g.",
    image: makeProductSVG("Caderno Reposicionável A5", "#faf5ff", "#7e22ce", "book")
  },
  {
    id: "p54",
    category: "Livros e Papelaria",
    name: "Kit 12 Canetas Esferográficas Ponta Fina 0.7mm Cores",
    price: 34.90,
    description: "Conjunto com 12 canetas de escrita macia e secagem rápida sem borrões, corpo sextavado ergonômico e tinta de alto rendimento para anotações e resumos.",
    image: makeProductSVG("Kit 12 Canetas 0.7mm", "#eff6ff", "#2563eb", "book")
  },

  // 19. Pet Shop
  {
    id: "p55",
    category: "Pet Shop",
    name: "Cama Pet Retangular Lavável Impermeável Tamanho G",
    price: 99.90,
    description: "Cama confortável para cães e gatos com enchimento em fibra siliconada antialérgica, fundo impermeável contra umidade e zíperes para remoção total da capa para lavagem.",
    image: makeProductSVG("Cama Pet Lavável G", "#fff7ed", "#ea580c", "pet")
  },
  {
    id: "p56",
    category: "Pet Shop",
    name: "Fonte Bebedouro Automática Elétrica para Gatos e Cães 2L",
    price: 109.90,
    description: "Bebedouro com circulação contínua de água filtrada por carvão ativado, bomba silenciosa de baixo consumo e reservatório de 2 litros que incentiva a hidratação.",
    image: makeProductSVG("Fonte Bebedouro Pet 2L", "#f0f9ff", "#0284c7", "pet")
  },
  {
    id: "p57",
    category: "Pet Shop",
    name: "Arranhador Torre com Brinquedo e Sisal Natural para Gatos",
    price: 89.90,
    description: "Poste arranhador revestido em corda de sisal natural resistente, base estável em pelúcia macia e bolinha suspensa para entreter o felino e proteger os móveis.",
    image: makeProductSVG("Arranhador Sisal Gatos", "#f0fdf4", "#16a34a", "pet")
  },

  // 20. Alimentos e Bebidas
  {
    id: "p58",
    category: "Alimentos e Bebidas",
    name: "Café Especial Torrado em Grãos 100% Arábica 1kg",
    price: 68.90,
    description: "Café gourmet de torra média com notas sensoriais de chocolate e caramelo, acidez equilibrada, pontuação acima de 84 pontos e embalagem com válvula aromática.",
    image: makeProductSVG("Café Especial Grãos 1kg", "#fff7ed", "#78350f", "coffee")
  },
  {
    id: "p59",
    category: "Alimentos e Bebidas",
    name: "Azeite de Oliva Extra Virgem Importado Vidro 500ml",
    price: 49.90,
    description: "Azeite extra virgem prensado a frio com acidez máxima de 0,4%, embalado em vidro escuro para preservar os antioxidantes naturais e o sabor frutado.",
    image: makeProductSVG("Azeite Extra Virgem 500ml", "#f0fdf4", "#15803d", "bottle")
  },
  {
    id: "p60",
    category: "Alimentos e Bebidas",
    name: "Castanha de Caju Torrada Sem Sal Pacote 500g",
    price: 44.90,
    description: "Castanhas de caju inteiras selecionadas, torradas naturalmente sem adição de sal ou óleo, fonte de gorduras boas, proteínas e magnésio para lanches saudáveis.",
    image: makeProductSVG("Castanha de Caju 500g", "#fefce8", "#b45309", "coffee")
  }
];

let products = readStorage(STORAGE_PRODUCTS, defaultProducts);
let cart = readStorage(STORAGE_CART, []);
let savedItems = readStorage(STORAGE_SAVED, []);
let previewData = "";
let activeDetailProductId = null;

// Estado dos filtros
let filterState = {
  name: "",
  category: "",
  min: "",
  max: ""
};

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function save() {
  localStorage.setItem(STORAGE_PRODUCTS, JSON.stringify(products));
  localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
  localStorage.setItem(STORAGE_SAVED, JSON.stringify(savedItems));
}

function money(value) {
  return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

// Popular selects de categorias (Filtro e Cadastro)
function populateCategorySelects() {
  const filterSelect = document.getElementById("filter-category");
  const formSelect = document.getElementById("product-category");

  CATEGORIES.forEach(cat => {
    const optFilter = document.createElement("option");
    optFilter.value = cat;
    optFilter.textContent = cat;
    filterSelect.appendChild(optFilter);

    const optForm = document.createElement("option");
    optForm.value = cat;
    optForm.textContent = cat;
    formSelect.appendChild(optForm);
  });
}

// Filtragem de produtos
function getFilteredProducts() {
  const nameTerm = filterState.name.trim().toLowerCase();
  const catTerm = filterState.category;
  const minVal = filterState.min !== "" ? Number(filterState.min) : null;
  const maxVal = filterState.max !== "" ? Number(filterState.max) : null;

  return products.filter(p => {
    if (nameTerm && !p.name.toLowerCase().includes(nameTerm) && !p.description.toLowerCase().includes(nameTerm)) {
      return false;
    }
    if (catTerm && p.category !== catTerm) {
      return false;
    }
    if (minVal !== null && !Number.isNaN(minVal) && p.price < minVal) {
      return false;
    }
    if (maxVal !== null && !Number.isNaN(maxVal) && p.price > maxVal) {
      return false;
    }
    return true;
  });
}

function renderProducts() {
  const grid = document.getElementById("product-grid");
  const empty = document.getElementById("products-empty");
  const filtered = getFilteredProducts();

  const isFiltered = filterState.name || filterState.category || filterState.min !== "" || filterState.max !== "";
  document.getElementById("product-total").textContent = isFiltered
    ? `Exibindo ${filtered.length} de ${products.length} produtos`
    : `${products.length} ${products.length === 1 ? "produto" : "produtos"}`;

  const statusEl = document.getElementById("filter-status");
  if (statusEl) {
    statusEl.textContent = isFiltered
      ? `${filtered.length} resultado(s) encontrado(s) com os filtros atuais`
      : `Mostrando todos os ${products.length} produtos em ${CATEGORIES.length} categorias`;
  }

  empty.hidden = filtered.length > 0;

  grid.innerHTML = filtered.map(p => {
    const isSaved = savedItems.includes(p.id);
    return `<article class="product-card" data-open-detail="${escapeHTML(p.id)}">
      <button type="button" class="card-fav-btn ${isSaved ? "saved" : ""}" data-toggle-save="${escapeHTML(p.id)}" title="${isSaved ? "Remover de Comprar depois" : "Salvar para comprar depois"}">
        ${isSaved ? "♥" : "♡"}
      </button>
      <div class="product-image">
        <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" onerror="this.style.opacity='.2'">
      </div>
      <div class="product-info">
        <span class="product-category-tag">${escapeHTML(p.category || "Geral")}</span>
        <h3>${escapeHTML(p.name)}</h3>
        <p>${escapeHTML(p.description)}</p>
        <div class="product-bottom">
          <span class="price">${money(p.price)}</span>
          <button class="add-cart" type="button" data-add="${escapeHTML(p.id)}">Adicionar +</button>
        </div>
      </div>
    </article>`;
  }).join("");

  // Abrir modal de detalhes ao clicar no card
  grid.querySelectorAll("[data-open-detail]").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("[data-add]") || e.target.closest("[data-toggle-save]")) return;
      openProductDetail(card.dataset.openDetail);
    });
  });

  // Botão rápido de adicionar ao carrinho no card
  grid.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(btn.dataset.add);
    });
  });

  // Botão rápido de favoritar/comprar depois no card
  grid.querySelectorAll("[data-toggle-save]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleSavedItem(btn.dataset.toggleSave);
    });
  });
}

// Modal de Detalhes do Produto
function openProductDetail(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  activeDetailProductId = id;
  document.getElementById("detail-img").src = product.image;
  document.getElementById("detail-img").alt = product.name;
  document.getElementById("detail-category").textContent = product.category || "PRODUTO";
  document.getElementById("detail-title").textContent = product.name;
  document.getElementById("detail-price").textContent = money(product.price);
  document.getElementById("detail-description").textContent = product.description;

  updateDetailSaveButton();

  document.getElementById("product-detail-modal").hidden = false;
  document.getElementById("overlay").classList.add("visible");
}

function closeProductDetail() {
  document.getElementById("product-detail-modal").hidden = true;
  activeDetailProductId = null;
  checkOverlay();
}

function updateDetailSaveButton() {
  if (!activeDetailProductId) return;
  const isSaved = savedItems.includes(activeDetailProductId);
  const btn = document.getElementById("detail-save-later");
  document.getElementById("detail-save-icon").textContent = isSaved ? "♥" : "♡";
  document.getElementById("detail-save-text").textContent = isSaved ? "Salvo para depois" : "Comprar depois";
  btn.classList.toggle("saved-active", isSaved);
}

// Comprar Depois (Favoritos)
function toggleSavedItem(id) {
  if (savedItems.includes(id)) {
    savedItems = savedItems.filter(item => item !== id);
  } else {
    savedItems.unshift(id);
  }
  save();
  renderProducts();
  renderSaved();
  updateDetailSaveButton();
}

function renderSaved() {
  savedItems = savedItems.filter(id => products.some(p => p.id === id));
  document.getElementById("saved-count").textContent = savedItems.length;
  const holder = document.getElementById("saved-items");

  if (!savedItems.length) {
    holder.innerHTML = '<div class="cart-empty">Nenhum item salvo para comprar depois.<br>Clique em um produto e selecione <strong>"Comprar depois"</strong> para refletir com calma.</div>';
    return;
  }

  holder.innerHTML = savedItems.map(id => {
    const p = products.find(x => x.id === id);
    return `<div class="cart-row">
      <img src="${escapeHTML(p.image)}" alt="">
      <div style="cursor:pointer" data-saved-detail="${escapeHTML(p.id)}">
        <h4>${escapeHTML(p.name)}</h4>
        <small>${money(p.price)}</small>
      </div>
      <div class="saved-row-actions">
        <button class="move-cart-btn" type="button" data-move-cart="${escapeHTML(p.id)}">+ Carrinho</button>
        <button class="remove-item" type="button" data-remove-saved="${escapeHTML(p.id)}">Remover</button>
      </div>
    </div>`;
  }).join("");

  holder.querySelectorAll("[data-saved-detail]").forEach(el => {
    el.addEventListener("click", () => {
      closeSaved();
      openProductDetail(el.dataset.savedDetail);
    });
  });

  holder.querySelectorAll("[data-move-cart]").forEach(btn => {
    btn.addEventListener("click", () => {
      closeSaved();
      addToCart(btn.dataset.moveCart);
    });
  });

  holder.querySelectorAll("[data-remove-saved]").forEach(btn => {
    btn.addEventListener("click", () => toggleSavedItem(btn.dataset.removeSaved));
  });
}

function openSaved() {
  closeCart();
  closeProductDetail();
  document.getElementById("saved-drawer").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
  document.getElementById("saved-drawer").setAttribute("aria-hidden", "false");
}

function closeSaved() {
  document.getElementById("saved-drawer").classList.remove("open");
  document.getElementById("saved-drawer").setAttribute("aria-hidden", "true");
  checkOverlay();
}

// Carrinho
function addToCart(id) {
  const item = cart.find(x => x.id === id);
  if (item) item.quantity++;
  else cart.push({ id, quantity: 1 });
  save();
  renderCart();
  closeProductDetail();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(x => x.id !== id);
  save();
  renderCart();
}

function total() {
  return cart.reduce((sum, item) => {
    const p = products.find(x => x.id === item.id);
    return sum + (p ? p.price * item.quantity : 0);
  }, 0);
}

function renderCart() {
  cart = cart.filter(item => products.some(p => p.id === item.id));
  document.getElementById("cart-count").textContent = cart.reduce((n, x) => n + x.quantity, 0);
  document.getElementById("cart-total").textContent = money(total());
  const holder = document.getElementById("cart-items");

  holder.innerHTML = cart.length
    ? cart.map(item => {
        const p = products.find(x => x.id === item.id);
        return `<div class="cart-row">
          <img src="${escapeHTML(p.image)}" alt="">
          <div>
            <h4>${escapeHTML(p.name)}</h4>
            <small>${item.quantity} × ${money(p.price)}</small>
          </div>
          <button class="remove-item" type="button" data-remove="${escapeHTML(p.id)}">Remover</button>
        </div>`;
      }).join("")
    : '<div class="cart-empty">Seu carrinho está vazio.<br>Adicione um produto para começar.</div>';

  holder.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.remove));
  });
}

function openCart() {
  closeSaved();
  closeProductDetail();
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("overlay").classList.add("visible");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "true");
  checkOverlay();
}

function showModal(id) {
  document.querySelectorAll(".checkout-modal").forEach(m => m.hidden = true);
  document.getElementById(id).hidden = false;
  document.getElementById("overlay").classList.add("visible");
}

function hideModals() {
  document.querySelectorAll(".checkout-modal").forEach(m => m.hidden = true);
  checkOverlay();
}

function checkOverlay() {
  const anyModalOpen = Array.from(document.querySelectorAll(".checkout-modal")).some(m => !m.hidden);
  const detailOpen = !document.getElementById("product-detail-modal").hidden;
  const cartOpen = document.getElementById("cart-drawer").classList.contains("open");
  const savedOpen = document.getElementById("saved-drawer").classList.contains("open");

  if (!anyModalOpen && !detailOpen && !cartOpen && !savedOpen) {
    document.getElementById("overlay").classList.remove("visible");
  }
}

// Exibir/Ocultar interface de adição de produtos
function openAddSection() {
  const sec = document.getElementById("adicionar");
  sec.hidden = false;
  sec.scrollIntoView({ behavior: "smooth" });
}

function closeAddSection() {
  document.getElementById("adicionar").hidden = true;
}

document.getElementById("toggle-add-section").addEventListener("click", () => {
  const sec = document.getElementById("adicionar");
  if (sec.hidden) {
    openAddSection();
  } else {
    closeAddSection();
  }
});
document.getElementById("close-add-section").addEventListener("click", closeAddSection);
document.getElementById("close-add-x").addEventListener("click", closeAddSection);
document.getElementById("empty-open-add").addEventListener("click", openAddSection);

// Eventos do Modal de Detalhes
document.getElementById("close-detail").addEventListener("click", closeProductDetail);
document.getElementById("detail-save-later").addEventListener("click", () => {
  if (activeDetailProductId) toggleSavedItem(activeDetailProductId);
});
document.getElementById("detail-add-cart").addEventListener("click", () => {
  if (activeDetailProductId) addToCart(activeDetailProductId);
});

// Eventos das Gavetas e Overlay
document.getElementById("open-cart").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("open-saved").addEventListener("click", openSaved);
document.getElementById("close-saved").addEventListener("click", closeSaved);
document.getElementById("overlay").addEventListener("click", () => {
  closeCart();
  closeSaved();
  closeProductDetail();
  hideModals();
});

// Eventos dos Filtros
const filterPanel = document.getElementById("filter-panel");
const toggleFilterBtn = document.getElementById("toggle-filters");

toggleFilterBtn.addEventListener("click", () => {
  filterPanel.hidden = !filterPanel.hidden;
  toggleFilterBtn.classList.toggle("active", !filterPanel.hidden);
});

document.getElementById("filter-name").addEventListener("input", (e) => {
  filterState.name = e.target.value;
  renderProducts();
});

document.getElementById("filter-category").addEventListener("change", (e) => {
  filterState.category = e.target.value;
  renderProducts();
});

document.getElementById("filter-min").addEventListener("input", (e) => {
  filterState.min = e.target.value;
  renderProducts();
});

document.getElementById("filter-max").addEventListener("input", (e) => {
  filterState.max = e.target.value;
  renderProducts();
});

function clearAllFilters() {
  filterState = { name: "", category: "", min: "", max: "" };
  document.getElementById("filter-name").value = "";
  document.getElementById("filter-category").value = "";
  document.getElementById("filter-min").value = "";
  document.getElementById("filter-max").value = "";
  renderProducts();
}

document.getElementById("clear-filters").addEventListener("click", clearAllFilters);
document.getElementById("empty-clear-filters").addEventListener("click", clearAllFilters);

// Fluxo de Checkout e Reflexão
document.getElementById("start-checkout").addEventListener("click", () => {
  if (!cart.length) {
    alert("Adicione pelo menos um produto ao carrinho.");
    return;
  }
  closeCart();
  document.getElementById("reflection-form").reset();
  document.getElementById("utility-field").hidden = true;
  document.getElementById("reflection-error").textContent = "";
  showModal("checkout-modal");
});

document.getElementById("close-checkout").addEventListener("click", hideModals);
document.getElementById("back-to-cart").addEventListener("click", () => {
  hideModals();
  openCart();
});

document.querySelectorAll('input[name="useful"]').forEach(input => input.addEventListener("change", () => {
  const show = document.querySelector('input[name="useful"]:checked')?.value === "sim";
  document.getElementById("utility-field").hidden = !show;
  document.getElementById("utility-reason").required = show;
  if (!show) document.getElementById("utility-reason").value = "";
}));

document.getElementById("reflection-form").addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const need = data.get("need"), budget = data.get("budget"), useful = data.get("useful"), reason = String(data.get("reason") || "").trim();
  if (!need || !budget || !useful) {
    document.getElementById("reflection-error").textContent = "Responda às três perguntas para continuar.";
    return;
  }
  if (useful === "sim" && reason.length < 8) {
    document.getElementById("reflection-error").textContent = "Conte um pouco mais sobre a utilidade do produto (mínimo de 8 caracteres).";
    return;
  }
  const answers = [need, budget, useful];
  const allPositive = answers.every(x => x === "sim");
  document.getElementById("result-title").textContent = allPositive ? "Você refletiu sobre sua compra!" : "Que tal reconsiderar sua escolha?";
  document.getElementById("result-message").textContent = allPositive
    ? "Suas respostas indicam que você pensou na necessidade, no orçamento e na utilidade. A decisão final continua sendo sua."
    : "Alguma resposta indica que vale a pena fazer uma pausa. Você pode voltar ao carrinho, rever os produtos e considerar se esta compra é a melhor decisão agora.";
  document.getElementById("result-symbol").textContent = allPositive ? "✓" : "!";
  document.getElementById("result-summary").innerHTML = `<strong>Resumo das respostas</strong><br>Precisa do produto: ${need === "sim" ? "Sim" : "Não"}<br>Compra cabe no orçamento: ${budget === "sim" ? "Sim" : "Não"}<br>Produto é útil: ${useful === "sim" ? "Sim" : "Não"}${useful === "sim" ? `<br>Utilidade: ${escapeHTML(reason)}` : ""}<br><br><strong>Total do carrinho: ${money(total())}</strong>`;
  showModal("result-modal");
});

document.getElementById("result-back").addEventListener("click", () => {
  hideModals();
  openCart();
});

document.getElementById("confirm-purchase").addEventListener("click", () => {
  cart = [];
  save();
  renderCart();
  showModal("success-modal");
});

document.getElementById("finish").addEventListener("click", () => {
  hideModals();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Upload e Cadastro de Produto
const imageInput = document.getElementById("product-image");
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  previewData = "";
  const img = document.getElementById("preview-img"), placeholder = document.querySelector(".preview-placeholder");
  if (!file) {
    img.hidden = true;
    placeholder.hidden = false;
    return;
  }
  if (!file.type.startsWith("image/")) {
    imageInput.value = "";
    alert("Selecione um arquivo de imagem.");
    return;
  }
  if (file.size > 1.5 * 1024 * 1024) {
    imageInput.value = "";
    alert("A imagem deve ter até 1,5 MB para facilitar o armazenamento no navegador.");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    previewData = reader.result;
    img.src = previewData;
    img.hidden = false;
    placeholder.hidden = true;
  };
  reader.readAsDataURL(file);
});

document.getElementById("product-form").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("product-name").value.trim();
  const category = document.getElementById("product-category").value;
  const price = Number(document.getElementById("product-price").value);
  const description = document.getElementById("product-description").value.trim();

  if (!previewData) {
    document.getElementById("form-feedback").textContent = "Selecione uma imagem e confira a prévia antes de cadastrar.";
    return;
  }
  if (!name || !category || !description || !Number.isFinite(price) || price <= 0) return;

  products.unshift({
    id: "p" + Date.now(),
    category,
    name,
    price,
    description,
    image: previewData
  });

  try {
    save();
  } catch (err) {
    products.shift();
    alert("Não foi possível salvar. A imagem pode ser grande demais para o armazenamento do navegador.");
    return;
  }

  renderProducts();
  e.target.reset();
  previewData = "";
  document.getElementById("preview-img").hidden = true;
  document.querySelector(".preview-placeholder").hidden = false;
  document.getElementById("form-feedback").textContent = "Produto cadastrado com sucesso!";

  setTimeout(() => {
    document.getElementById("form-feedback").textContent = "";
    closeAddSection();
    document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
  }, 900);
});

// Inicialização
populateCategorySelects();
renderProducts();
renderCart();
renderSaved();
