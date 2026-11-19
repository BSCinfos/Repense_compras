/* ============================================================
   CATÁLOGO — 20 categorias (união das principais categorias da
   Amazon Brasil e do Mercado Livre) com 3 produtos cada.

   Os preços são ESTIMATIVAS (média aproximada entre as faixas
   praticadas na Amazon.com.br e no Mercado Livre) e variam com
   promoções e vendedores. As descrições seguem as de produtos
   semelhantes vendidos nesses sites.

   Para usar uma foto real, preencha o campo `image` de qualquer
   produto com o endereço da imagem. Sem `image`, o site mostra
   uma ilustração da categoria.
   ============================================================ */
const CATEGORIES = [
  { name: "Celulares e Smartphones",      emoji: "📱", c1: "#dbeafe", c2: "#93c5fd" },
  { name: "Eletrônicos, Áudio e Vídeo",   emoji: "🎧", c1: "#ede9fe", c2: "#c4b5fd" },
  { name: "Informática",                  emoji: "💻", c1: "#e0f2fe", c2: "#7dd3fc" },
  { name: "Games e Consoles",             emoji: "🎮", c1: "#fce7f3", c2: "#f9a8d4" },
  { name: "Eletrodomésticos",             emoji: "🍳", c1: "#ffedd5", c2: "#fdba74" },
  { name: "Casa e Cozinha",               emoji: "🍽️", c1: "#fef3c7", c2: "#fcd34d" },
  { name: "Móveis e Decoração",           emoji: "🛋️", c1: "#f5e6d8", c2: "#d6b08c" },
  { name: "Ferramentas e Construção",     emoji: "🔧", c1: "#e5e7eb", c2: "#9ca3af" },
  { name: "Beleza e Cuidados Pessoais",   emoji: "💄", c1: "#ffe4e6", c2: "#fda4af" },
  { name: "Saúde e Bem-estar",            emoji: "💊", c1: "#dcfce7", c2: "#86efac" },
  { name: "Esportes e Fitness",           emoji: "🏋️", c1: "#d1fae5", c2: "#6ee7b7" },
  { name: "Brinquedos e Jogos",           emoji: "🧸", c1: "#fef9c3", c2: "#fde047" },
  { name: "Bebês",                        emoji: "🍼", c1: "#e0f2fe", c2: "#bae6fd" },
  { name: "Livros",                       emoji: "📚", c1: "#e0e7ff", c2: "#a5b4fc" },
  { name: "Papelaria e Escritório",       emoji: "✏️", c1: "#fef3c7", c2: "#fbbf24" },
  { name: "Moda e Acessórios",            emoji: "👕", c1: "#fae8ff", c2: "#e879f9" },
  { name: "Automotivo",                   emoji: "🚗", c1: "#fee2e2", c2: "#fca5a5" },
  { name: "Pet Shop",                     emoji: "🐶", c1: "#ffedd5", c2: "#fb923c" },
  { name: "Alimentos e Bebidas",          emoji: "☕", c1: "#fef3c7", c2: "#d6a15c" },
  { name: "Jardim e Piscina",             emoji: "🌱", c1: "#ecfccb", c2: "#a3e635" }
];

/* [categoria, nome, preço médio (R$), emoji, descrição] */
const RAW_PRODUCTS = [
  // 0 — Celulares e Smartphones
  [0, "Smartphone 128 GB 6,5\" Câmera Tripla", 1299.00, "📱", "Tela de 6,5 polegadas com taxa de atualização de 90 Hz, 128 GB de armazenamento, 6 GB de RAM, câmera principal de 50 MP, bateria de 5.000 mAh e carregamento rápido. Dual chip e leitor de digital lateral."],
  [0, "Carregador de Parede Turbo USB-C 25 W", 69.90, "🔌", "Carregador com saída USB-C de 25 W para carregamento rápido de smartphones e tablets compatíveis. Conta com proteção contra sobrecarga, curto-circuito e superaquecimento. Acompanha cabo USB-C de 1 metro."],
  [0, "Capa Anti-impacto com Película de Vidro", 39.90, "🛡️", "Capa de TPU flexível com cantos reforçados e bordas elevadas que protegem a tela e as câmeras contra quedas. Acabamento fosco antiderrapante. Acompanha película de vidro temperado 9H."],

  // 1 — Eletrônicos, Áudio e Vídeo
  [1, "Fone de Ouvido Bluetooth 5.3 TWS com Estojo", 119.90, "🎧", "Fones sem fio com Bluetooth 5.3, drivers de 10 mm, microfone com redução de ruído para chamadas e até 24 horas de uso somadas ao estojo de carregamento. Resistentes a respingos (IPX4) e com controle por toque."],
  [1, "Caixa de Som Bluetooth Portátil à Prova d'Água", 249.00, "🔊", "Caixa portátil com Bluetooth, resistência a água e poeira IP67, até 10 horas de reprodução e graves reforçados. Compacta, com alça para pendurar e função para conectar duas caixas ao mesmo tempo."],
  [1, "Smart TV 43\" 4K UHD com Wi-Fi", 1899.00, "📺", "Smart TV LED de 43 polegadas com resolução 4K Ultra HD, Wi-Fi integrado, 3 entradas HDMI, 2 portas USB, comando de voz e acesso aos principais aplicativos de streaming. Bivolt automático."],

  // 2 — Informática
  [2, "Notebook 15,6\" Core i5, 8 GB RAM, SSD 256 GB", 2799.00, "💻", "Notebook com tela Full HD de 15,6 polegadas, processador Intel Core i5, 8 GB de memória RAM, SSD de 256 GB, Wi-Fi, Bluetooth e Windows 11. Indicado para estudo, trabalho e uso diário."],
  [2, "Mouse Sem Fio 1600 DPI com Receptor USB", 59.90, "🖱️", "Mouse óptico sem fio de 2,4 GHz com alcance de até 10 metros, sensor de 1600 DPI, seis botões e design ergonômico. Funciona com 1 pilha AA e desliga sozinho para economizar energia."],
  [2, "SSD Externo Portátil 1 TB USB 3.2", 579.00, "💾", "SSD externo com 1 TB de capacidade, leitura de até 1.050 MB/s, estrutura resistente a quedas e conexão USB-C com cabo USB-A incluso. Compatível com Windows, macOS, Android e consoles."],

  // 3 — Games e Consoles
  [3, "Controle Sem Fio com Vibração Háptica", 359.00, "🎮", "Controle sem fio com vibração háptica, gatilhos adaptativos, alto-falante integrado, conexão Bluetooth e bateria recarregável via USB-C. Compatível com console e PC."],
  [3, "Headset Gamer com Microfone e Som Surround", 169.90, "🎧", "Headset com drivers de 50 mm, som surround virtual 7.1, microfone retrátil com cancelamento de ruído, almofadas macias e iluminação LED. Conexão USB e P2, compatível com PC e consoles."],
  [3, "Mouse Pad Gamer Extra Grande 90 x 40 cm", 59.90, "🖥️", "Mousepad de 900 x 400 mm com base de borracha antiderrapante, superfície de tecido otimizada para precisão e bordas costuradas que evitam o desgaste. Cobre teclado e mouse."],

  // 4 — Eletrodomésticos
  [4, "Fritadeira Elétrica sem Óleo (Air Fryer) 4 L", 349.00, "🍟", "Fritadeira com capacidade de 4 litros, potência de 1500 W, temperatura ajustável de até 200 °C e timer de 60 minutos. Cesto antiaderente removível; prepara frituras com pouco ou nenhum óleo."],
  [4, "Liquidificador 1000 W com Jarra de 2 L", 199.00, "🥤", "Liquidificador com motor de 1000 W, jarra de 2 litros em acrílico, 5 velocidades mais função pulsar e lâminas de aço inoxidável. Ideal para sucos, vitaminas e molhos."],
  [4, "Cafeteira Elétrica 1,2 L com Filtro Permanente", 129.00, "☕", "Cafeteira com reservatório de 1,2 litro (até 30 cafezinhos), filtro permanente reutilizável, base aquecedora que mantém o café quente, indicador de nível de água e desligamento automático."],

  // 5 — Casa e Cozinha
  [5, "Jogo de Panelas Antiaderente 5 Peças", 289.00, "🍲", "Conjunto com caçarola, panela funda, frigideira e tampas de vidro, em alumínio com revestimento antiaderente interno. Cabos de baquelite resistentes ao calor e fundo reforçado, compatível com fogão a gás e elétrico."],
  [5, "Conjunto de Potes Herméticos de Vidro 10 Peças", 119.90, "🥗", "Potes de vidro com tampas herméticas de plástico livre de BPA, em diferentes tamanhos. Vão ao micro-ondas (sem a tampa), ao freezer e à lava-louças. Ótimos para marmitas e organização da despensa."],
  [5, "Faqueiro Inox 24 Peças", 109.00, "🍴", "Faqueiro em aço inoxidável com 24 peças: 6 garfos, 6 facas, 6 colheres de mesa e 6 colheres de sobremesa. Acabamento espelhado, resistente à ferrugem e próprio para lava-louças."],

  // 6 — Móveis e Decoração
  [6, "Cadeira de Escritório Ergonômica com Apoio Lombar", 679.00, "💺", "Cadeira giratória com encosto em tela mesh, apoio lombar, regulagem de altura a gás, braços ajustáveis e base de nylon com rodízios. Suporta até 120 kg e oferece conforto em longas jornadas."],
  [6, "Luminária de Mesa LED com Carregador USB", 109.00, "💡", "Luminária articulada com 3 temperaturas de cor e 5 níveis de brilho, controle por toque, porta USB para carregar o celular e baixo consumo de energia. Base estável e haste flexível."],
  [6, "Kit 3 Prateleiras Nicho em MDF", 119.90, "🖼️", "Kit com 3 nichos decorativos de MDF para parede, com acabamento texturizado e fixação inclusa. Ideais para livros, plantas e objetos de decoração; suportam até 5 kg cada."],

  // 7 — Ferramentas e Construção
  [7, "Furadeira e Parafusadeira a Bateria 12 V", 249.00, "🔧", "Parafusadeira com bateria de lítio 12 V, mandril de 10 mm, 2 velocidades, 20 níveis de torque, luz de LED e maleta com bits e brocas. Acompanha carregador bivolt."],
  [7, "Maleta de Ferramentas Manuais 94 Peças", 229.00, "🧰", "Maleta com 94 peças que inclui chaves de fenda, Phillips, alicates, soquetes, chaves combinadas e martelo, em aço cromo-vanádio. Organização prática para manutenção doméstica e automotiva."],
  [7, "Trena de Aço 5 m com Trava", 24.90, "📏", "Trena com fita de aço de 5 metros por 19 mm, escala em centímetros e polegadas, trava de segurança e gancho magnético na ponta. Carcaça emborrachada resistente a impactos."],

  // 8 — Beleza e Cuidados Pessoais
  [8, "Secador de Cabelo 2000 W com Íons", 169.00, "💨", "Secador com potência de 2000 W, tecnologia de íons para reduzir o frizz, 3 temperaturas e 2 velocidades, função de ar frio e bocal concentrador. Cabo giratório de 1,8 m."],
  [8, "Creme Hidratante Corporal 400 ml", 39.90, "🧴", "Hidratante corporal com manteiga de karité e vitamina E, textura leve de rápida absorção e hidratação por até 24 horas. Para todos os tipos de pele, com fragrância suave."],
  [8, "Perfume Floral Feminino Eau de Toilette 100 ml", 189.00, "🌸", "Fragrância feminina de notas florais e frutadas, em frasco de 100 ml. Fixação moderada, indicada para o uso diário."],

  // 9 — Saúde e Bem-estar
  [9, "Termômetro Digital Infravermelho Sem Contato", 89.90, "🌡️", "Termômetro infravermelho para testa e ouvido com medição em 1 segundo, display de LED, memória das últimas leituras e alarme de febre. Funciona com 2 pilhas AAA (inclusas)."],
  [9, "Medidor de Pressão Arterial Digital de Braço", 169.00, "🩺", "Aparelho automático de braço com tela digital grande, detecção de arritmia, memória para 90 medições e braçadeira ajustável de 22 a 40 cm. Funciona com pilhas ou adaptador."],
  [9, "Whey Protein Concentrado 900 g", 149.90, "🥛", "Suplemento em pó sabor chocolate com cerca de 24 g de proteína por dose de 30 g, baixo teor de gordura e açúcares, de fácil dissolução. Pote de 900 g."],

  // 10 — Esportes e Fitness
  [10, "Tapete de Yoga Antiderrapante 6 mm", 59.90, "🧘", "Tapete em NBR de 6 mm de espessura (183 x 61 cm) com superfície antiderrapante e bom amortecimento para joelhos e coluna. Acompanha alça de transporte."],
  [10, "Kit Halteres Ajustáveis 10 kg", 199.00, "🏋️", "Kit com 2 barras e anilhas emborrachadas que permitem montar halteres de 5 kg cada (10 kg no total), com travas de segurança e empunhadura antiderrapante. Ideal para treinar em casa."],
  [10, "Bola de Futebol de Campo Tamanho Oficial", 129.90, "⚽", "Bola de campo tamanho 5 com 32 gomos termocolados, câmara de butil que retém melhor o ar e cobertura em PU resistente. Indicada para treinos e jogos."],

  // 11 — Brinquedos e Jogos
  [11, "Blocos de Montar 500 Peças", 159.90, "🧱", "Caixa com 500 peças coloridas compatíveis com os principais blocos de encaixe, que estimulam a criatividade e a coordenação motora. Indicado para crianças a partir de 6 anos."],
  [11, "Quebra-cabeça 1000 Peças Paisagem", 79.90, "🧩", "Quebra-cabeça de 1000 peças em papel cartão resistente, com acabamento fosco e imagem em alta definição. Medida montada de aproximadamente 68 x 48 cm. A partir de 14 anos."],
  [11, "Jogo de Xadrez Magnético de Madeira", 89.90, "♟️", "Tabuleiro dobrável de madeira com peças magnéticas que ficam firmes durante a partida e compartimento interno para guardá-las. Compacto e prático para viagens."],

  // 12 — Bebês
  [12, "Fraldas Descartáveis Tamanho G – 78 unidades", 74.90, "👶", "Fraldas com indicador de umidade, canais de absorção rápida e fitas adesivas reposicionáveis, com camada seca para proteger a pele do bebê. Indicadas para bebês de 9 a 13 kg."],
  [12, "Mamadeira Anticólica 260 ml com Bico de Silicone", 44.90, "🍼", "Mamadeira de polipropileno livre de BPA com válvula anticólica, bico de silicone ortodôntico de fluxo lento e graduação em ml. Fácil de desmontar e higienizar."],
  [12, "Banheira para Bebê com Suporte e Tampão", 119.90, "🛁", "Banheira anatômica de 20 litros com apoio para o corpo, fundo antiderrapante, tampão de escoamento e suporte dobrável. Indicada para recém-nascidos até 20 kg."],

  // 13 — Livros
  [13, "Hábitos Atômicos – James Clear (Capa Comum)", 47.90, "📘", "Guia prático sobre como pequenas mudanças diárias geram grandes resultados com o tempo, com estratégias para criar bons hábitos, abandonar os ruins e manter a consistência."],
  [13, "Pai Rico, Pai Pobre – Robert Kiyosaki", 39.90, "📗", "Clássico de educação financeira que compara as visões de dois \"pais\" sobre o dinheiro, abordando ativos, passivos e independência financeira em linguagem simples."],
  [13, "O Pequeno Príncipe – Antoine de Saint-Exupéry", 19.90, "📙", "Fábula clássica sobre um pequeno príncipe que viaja entre planetas e aprende lições sobre amizade, amor e o olhar sensível diante da vida. Edição em português, capa comum."],

  // 14 — Papelaria e Escritório
  [14, "Kit 12 Canetas Gel Coloridas", 24.90, "🖊️", "Kit com 12 canetas gel de cores variadas, ponta de 0,7 mm, tinta de secagem rápida e escrita macia. Ótimas para estudos, anotações e bullet journal."],
  [14, "Agenda Planner 2027 Capa Dura", 49.90, "📅", "Agenda planner com visão mensal e semanal, capa dura com fechamento em elástico, papel de 90 g/m², marcador de página e espaço para metas e anotações."],
  [14, "Calculadora Científica 240 Funções", 74.90, "🧮", "Calculadora científica com 240 funções, display de 2 linhas, alimentação solar e a bateria, com tampa protetora rígida. Indicada para ensino médio e universitário."],

  // 15 — Moda e Acessórios
  [15, "Camiseta Básica 100% Algodão", 49.90, "👕", "Camiseta de malha 100% algodão penteado, gola redonda, modelagem regular e toque macio. Disponível em várias cores e tamanhos, do P ao GG."],
  [15, "Tênis Casual Unissex", 229.00, "👟", "Tênis com cabedal em material sintético respirável, solado de borracha antiderrapante e palmilha anatômica acolchoada. Fechamento com cadarço, para uso diário e caminhadas."],
  [15, "Relógio Digital Esportivo à Prova d'Água", 149.00, "⌚", "Relógio digital com cronômetro, alarme, calendário e luz de fundo em LED. Caixa em resina e pulseira de silicone ajustável, resistente à água até 50 metros."],

  // 16 — Automotivo
  [16, "Compressor de Ar Portátil 12 V Digital", 169.00, "🚗", "Compressor para pneus de carros e motos com manômetro digital, desligamento automático ao atingir a pressão programada, lanterna de LED e conexão no acendedor veicular de 12 V."],
  [16, "Aspirador de Pó Automotivo Portátil 12 V", 89.90, "🧹", "Aspirador compacto de 120 W com cabo de 4,5 m para tomada 12 V, filtro lavável e bicos para cantos e estofados. Acompanha bolsa de armazenamento."],
  [16, "Suporte Veicular Magnético para Celular", 39.90, "📲", "Suporte para painel ou saída de ar com base magnética forte e rotação de 360°, compatível com celulares de 4 a 7 polegadas. Fixação por adesivo ou grampo."],

  // 17 — Pet Shop
  [17, "Ração Premium para Cães Adultos 15 kg", 189.00, "🦴", "Ração seca para cães adultos de porte médio e grande, com frango e arroz, fonte de proteínas e ômega 3 e 6 para pele e pelagem, sem corantes artificiais. Pacote de 15 kg."],
  [17, "Cama Pet Média Lavável", 99.90, "🛏️", "Cama macia para cães e gatos de porte médio, com enchimento de fibra siliconizada, base antiderrapante e capa removível lavável. Medidas aproximadas de 60 x 50 cm."],
  [17, "Arranhador para Gatos com Brinquedo", 119.90, "🐱", "Torre arranhadora com poste de sisal, plataforma acolchoada e brinquedo suspenso, que estimula o exercício e protege os móveis. Altura aproximada de 60 cm."],

  // 18 — Alimentos e Bebidas
  [18, "Café em Grãos Especial 1 kg", 79.90, "☕", "Café 100% arábica em grãos, torra média, com notas de chocolate e caramelo e acidez equilibrada. Pacote de 1 kg com válvula de preservação do aroma."],
  [18, "Azeite de Oliva Extra Virgem 500 ml", 44.90, "🫒", "Azeite extra virgem de acidez máxima de 0,5%, com sabor frutado e aroma intenso, extraído a frio. Ideal para saladas, finalização de pratos e pães. Frasco de vidro escuro de 500 ml."],
  [18, "Mix de Castanhas e Frutas Secas 500 g", 39.90, "🥜", "Mistura de castanha-de-caju, amêndoas, nozes e uvas-passas, sem adição de açúcar ou conservantes. Rico em fibras e gorduras boas, em embalagem de 500 g."],

  // 19 — Jardim e Piscina
  [19, "Mangueira de Jardim 30 m com Esguicho", 119.90, "💦", "Mangueira flexível trançada de 30 metros, resistente a dobras e ao sol, com esguicho de 7 jatos, engates rápidos e conexão universal para torneira."],
  [19, "Kit 3 Vasos Autoirrigáveis", 69.90, "🪴", "Vasos de plástico com reservatório de água embutido que irriga a planta por capilaridade, ideais para temperos, flores e suculentas. Acompanham prato e acabamento fosco."],
  [19, "Kit de Jardinagem 5 Peças", 59.90, "🌿", "Conjunto com pá, rastelo, garfo de plantio, tesoura de poda e luvas, com cabos ergonômicos em aço carbono. Prático para cuidar de hortas e jardins."]
];

/* Os 3 produtos iniciais do projeto original, agora com categoria. */
const BASE_PRODUCTS = [
  { id: "p1", name: "Garrafa reutilizável", price: 39.90, category: "Casa e Cozinha", emoji: "🥤", description: "Uma opção prática para levar água e reduzir o uso de descartáveis.", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=700&auto=format&fit=crop&q=80" },
  { id: "p2", name: "Caderno essencial", price: 24.50, category: "Papelaria e Escritório", emoji: "📓", description: "Caderno para organizar ideias, estudos e tarefas do dia a dia.", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=700&auto=format&fit=crop&q=80" },
  { id: "p3", name: "Bolsa de tecido", price: 32.00, category: "Moda e Acessórios", emoji: "👜", description: "Bolsa versátil para pequenas compras e atividades cotidianas.", image: "https://images.unsplash.com/photo-1590875861582-4b8c5b4b8c5b?w=700&auto=format&fit=crop&q=80" }
];

const CATALOG = BASE_PRODUCTS.concat(
  RAW_PRODUCTS.map((r, i) => ({
    id: "c" + String(i + 1).padStart(2, "0"),
    category: CATEGORIES[r[0]].name,
    name: r[1],
    price: r[2],
    emoji: r[3],
    description: r[4]
  }))
);

/* Termo de busca usado para encontrar a foto de cada produto (c01 a c60, na ordem do catálogo). */
const IMAGE_TERMS = {
  c01:"Smartphone", c02:"AC adapter", c03:"Mobile phone case",
  c04:"Earphones", c05:"Wireless speaker", c06:"Smart TV",
  c07:"Laptop", c08:"Computer mouse", c09:"Solid-state drive",
  c10:"Gamepad", c11:"Headset (audio)", c12:"Mousepad",
  c13:"Air fryer", c14:"Blender", c15:"Coffeemaker",
  c16:"Cookware and bakeware", c17:"Food storage container", c18:"Cutlery",
  c19:"Office chair", c20:"Desk lamp", c21:"Shelving",
  c22:"Cordless drill", c23:"Hand tool", c24:"Tape measure",
  c25:"Hair dryer", c26:"Moisturizer", c27:"Perfume",
  c28:"Infrared thermometer", c29:"Sphygmomanometer", c30:"Whey protein",
  c31:"Yoga mat", c32:"Dumbbell", c33:"Association football ball",
  c34:"Toy block", c35:"Jigsaw puzzle", c36:"Chess",
  c37:"Diaper", c38:"Baby bottle", c39:"Baby bathtub",
  c40:"Paperback", c41:"Hardcover", c42:"Book",
  c43:"Gel pen", c44:"Diary", c45:"Scientific calculator",
  c46:"T-shirt", c47:"Sneakers", c48:"Digital watch",
  c49:"Air compressor", c50:"Vacuum cleaner", c51:"Mobile phone accessories",
  c52:"Dog food", c53:"Dog bed", c54:"Cat tree",
  c55:"Coffee bean", c56:"Olive oil", c57:"Mixed nuts",
  c58:"Garden hose", c59:"Flowerpot", c60:"Gardening"
};
