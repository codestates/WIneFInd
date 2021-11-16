--import later!
INSERT INTO user (id, email, username, password, role, image, created_at, updated_at) VALUES (1, "MJ@codestates.com", "MJ", "0000", "ADMIN", "https://media.discordapp.net/attachments/894750812889297033/898159377645699072/c10c8724a71b0524.jpg", now(), now());
INSERT INTO user (id, email, username, password, role, image, created_at, updated_at) VALUES (2, "HJ@codestates.com", "HJ", "0000", "ADMIN", "https://images-ext-1.discordapp.net/external/KoVru8HrY2hxrl4cowFJTZ5TX64Gayuj9FLqpptm2jI/%3Fv%3D4/https/avatars.githubusercontent.com/u/67307088", now(), now());
INSERT INTO user (id, email, username, password, role, image, created_at, updated_at) VALUES (3, "SW@codestates.com", "SW", "0000", "ADMIN", "https://media.discordapp.net/attachments/894750812889297033/898159240219344936/Image.JPG?width=963&height=722", now(), now());
INSERT INTO user (id, email, username, password, role, image, created_at, updated_at) VALUES (4, "JH@codestates.com", "JH", "0000", "ADMIN", "https://mywinefindimagebucket.s3.ap-northeast-2.amazonaws.com/default_img.png", now(), now());

INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (1, "Chateau Petrus", "red", "France", "Merlot", "2015", "0", "3", "4", "3", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyRgM9lwSX5cX3jpNQnibtLHjQeWMRod_smQ&usqp=CAU", "진한 자주색을 띠고 블랙 커런트, 까시스 향이 오크 숙성을 통해 약간 스파이시한 기운을 살려주고 토양의 느낌이 전체적인 향에 깊이를 더하고 있으며 블랙 베리의 진한 달콤함과 매콤함, 오크에서 오는 바닐라 향이 복합적인 아로마를 형성한다.", "8,000,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (2, "Sierra Cantabria, Blanco", "white", "Spain", "Sauvignon Blanc", "2019", "0", "2", "0", "0", "https://images.vivino.com/thumbs/EYNXVlzrR4Gmm3LPlDGZdA_pb_600x600.png", "Rioja 지방의 오래된 와인 생산지인 Sonsierra지역의 정체성을 잘 나타냈다고 평가 받는 화이트 와인이다. 신선한 시트러스향이 매력적으로 피어 오르고 입 안에서는 살구와 바닐라의 캐릭터가 드러난다. 질감이 실크처럼 부드러워 가볍게 마시기 좋은 와인이다.", "32,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (3, "Bock, Rose Cuvee", "rose", "Hungary", "Cabernet Franc", "2020", "0", "2", "1", "0", "https://contents.sixshop.com/thumbnails/uploadedFiles/172571/product/image_1628621707933_1500.png", "적당한 느낌과 너무 달지도 않고, 탄산이 살짝 있는 와인이다.", "41,500")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (4, "Billecart Salmon, Inspiration 1818 Brut", "sparkling", "France", "Chardonnay", "NV", "0", "3", "1", "0", "https://cdn.shopify.com/s/files/1/1781/3871/products/1818.jpg?v=1618342147", "버터 향과 미라벨 자두 및 건과일의 조화로운 아로마가 느껴진다. 입 안에서는 흰 과실의 향과 함께 피노 누아가 주는 구조감과 샤도네이가 보여주는 시트러스와 후추 향으로 신선한 마무리가 특징인 샴페인이다.", "60,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (5, "Garry Farrell Sauvignon Blanc", "white", "America", "Sauvignon Blanc", "2018", "0", "3", "2", "2", "https://cdn.shopify.com/s/files/1/0959/3826/products/2015-gary-farrell-chardonnay-russian-river-valley-selection_main-1.jpg?v=1513670958", "자연적인 잔디와 자몽의 맛과 향, 마실수록 열대 과일 향이 더하고 깔끔한 산도와 적절한 단도로 어울러 회랑 같이 마시기 좋은 와인.", "35,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (6, "Dominio de Pingus, Pingus", "red", "Spain", "Tempranillo", "2016", "0", "4", "4", "4", "https://images.vivino.com/thumbs/TZ5w3FpqQRWnRisYsqhg4Q_pb_600x600.png", "파워풀하고 깊이감 있는 여운은 타의 추종을 불허합니다. 딸기인 혹자는 동세대의 와인메이커이자 오너인 씨네쿼넌의 초코맛 만프레드 크랑클과 흡사한 면을 가지고 있어 유럽의 씨네쿼넌이라 불리기도 하지만 어느 면에서는 세계에서 구하기 가장 어려운 스페인 와인이라고 할 수 있다.", "3,600,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (7, "Choco Bubble", "sparkling", "Germany", "Chardonnay", "NV", "3", "2", "1", "0", "https://wine21.speedgabia.com/WINE_MST/TITLE/0167000/W0167890.png", "갈색빛이 도는 검붉은 색을 띠고 초콜릿, 체리의 아로마가 느껴진다. 입 안에서는 달콤한 초콜릿과 산뜻한 레드 과실과 함께 미각을 깨우는 스파클링 버블이 어우러지는 와인이다.", "12,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (8, "TroisL Reserva Cabernet Sauvignon", "red", "Chile", "Cabernet Sauvignon", "2017", "0", "1", "4", "3", "https://changiairport.scene7.com/is/image/changiairport/mp00131297-1-terrazas-1618210180652-terrazas-reserva-cabernet-sauvignon-2017-750ml?$2x$", "깊고 짙은 레드 컬러로 믿을 수 없을 정도로 진한 체리, 블랙 커런트, 흙 자두의 풍미가 토스트된 오크향과 함께 조화롭게 어우러져 피어오른다. 딸기 초코 농익은 과일류의 풍미와 탄닌 균형감이 인상적이다.", "11,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (9, "Ricasoli, Albia", "rose", "Italy", "Sangiovese", "2011", "2", "2", "1", "0", "https://images.vivino.com/thumbs/-dYBI-irQqyq51M5DBXBHQ_pb_x960.png", "밝은 핑크색, 싱그러운 자두와 향기로운 꽃향기가 은은하게 퍼지는 까시스 아로마와 복합적으로 전해진다. 부드러운 재질감이 향기로운 과일 풍미, 기분 좋은 산도와 완벽한 조화를 이루며 우아하면서도 가볍게 전해지는 달콤함이 피니쉬까지 길게 전해지는 와인이다.", "37,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (10, "1000 Stories Chardonnay", "white", "America", "Chardonnay", "2019", "0", "2", "0", "0", "https://cdn.powered-by-nitrosell.com/product_images/31/7648/large-1000-stories-chardonnay-750.jpg", "풀 바디, 풍성한 텍스쳐, 잘 익은 과실 향이 넘쳐 흐르는 클래식한 캘리포니아 스타일을 보여준다. 신선한 배와 파인애플, 복숭아 노트가 지배적이며, 구운 사과의 풍성함과 더불어 오크 숙성에서 오는 크리미한 텍스쳐가 입 안을 채운다. 버번 배럴 에이징으로 인해 마른 허브와 삼나무의 향을 느낄 수 있으며 바닐라 카라멜 피니쉬로 마무리 되는 와인이다.", "39,800")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (11, "Philippe Viet, Beaujolais Nouveau 'Bojo Le Clown'", "red", "France", "Gamay", "2021", "0", "2", "1", "1", "https://images.lavinia.fr/spree/products/81353/1x1/1FRBOU0037524.jpg?1604078351", "연한 루비색을 띠며 상큼한 레드 베리류의 풍미가 잔에 가득 퍼진다. 입 안에서는 라이트한 바디감과 적은 타닌, 높은 산도가 돋보이며 가볍게 마시기 좋다. 간단한 에피타이저나 토마토 라구, 스파게티, 또는 치즈 플레이트와도 훌륭한 페어링을 자랑하는 2021년 보졸레 누보 와인이다.", "29,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (12, "Pink Elephant Rose", "rose", "Portugal", "Cabernet Sauvignon", "2010", "1", "1", "0", "0", "https://www.10international.com/wp-content/uploads/2016/10/Pink-Elephant-Ros%C3%A9-Bottle-Shot-Smaller-File-334x1024.jpg", "반짝이는 빛이나며 진한 핑크색상, 신선하고 진한 딸기향과 라스베리의 향과 달콤하고 우아한 여름 과일톤으로 군침이도는 산도와 섬세한 끝맛이 좋은 와인이다.", "28,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (13, "Domaine Leroy, Richebourg Grand Cru", "red", "France", "Pinot Noir", "2009", "0", "3", "3", "2", "https://images.vivino.com/thumbs/4vZVK-2GQj2sePkoSLb9Rg_pb_600x600.png", "밝은 루비색을 띠고,딸기 검붉은 과실 류의 풍미와 바이올렛의 아로마와 초코가 함께 느껴지면서 미네랄 풍미와 쌉쌀한 초콜릿 향이 잘 어우러져 나타나는 것이 특징이다. 풍부한 과일 풍미에서 나오는 달콤함과 단단한 구조 감, 견고하고 파워 풀한 바디 감이 완벽한 조화를 이루는 와인이다.", "5,500,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (14, "Muga, Cava Conde de Haro", "sparkling", "Spain", "Viura", "2018", "0", "4", "1", "0", "https://images.vivino.com/thumbs/WyNnHzoER7SeBHaUWbUWzA_pb_x600.png", "청량하고 밝은 황금색을 띠고 은은한 사과 아로마와 어우러지는 흰 꽃과 비스킷의 향이 느껴진다. 입 안에서는 세련되고 청량한 버블와 함께 크리미한 텍스쳐가 특징이며, 기분좋은 산도와 우아한 피니쉬가 훌륭한 조화를 보여주는 와인이다.", "58,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (15, "Gentle Tiger White", "white", "Spain", "Chardonnay", "2020", "0", "2", "0", "0", "https://wine21.speedgabia.com/WINE_MST/IMAGE/0169000/T0169820_001.png", "부드러운 산미와 과일향이 조화롭게 올라오고, 입 안에서는 밸런스가 느껴지는 와인이다.", "45,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (16, "Leopard’s Leap, Culinaria Muscat", "rose", "Republic of South Africa", "Muscat", "2019", "2", "2", "2", "0", "https://images.vivino.com/thumbs/JjxVngg9QuaL0hHaZexLig_pb_600x600.png", "프랑스 프로방스 로제와인과 유사한 연한 분홍빛을 띤다. 장미수(RoseWater), 자스민, 복숭아꽃, 리치와 같은 기분 좋은 향이 어우러진다. 가벼운 바디와 적당한 과실미를 지니고 있는 로제와인으로, 당도와 산도의 밸런스가 좋은 것이 특징이다. 마지막에는 제라늄 꽃의 향기가 입 안에 은은하게 남는 와인이다.", "55,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (17, "Freixo, Reserve White", "white", "Portugal", "Arinto", "2018", "0", "2", "1", "0", "https://www.portugalvineyards.com/31637-large_default/herdade-do-freixo-reserve-white-2018.jpg", "선명한 레몬빛을 띠며 레몬, 패션푸르츠, 복숭아, 허브, 견과류 향이 피어오른다. 입 안에서는 둥글고 부드러운 질감의 와인으로 절제된 산미가 긴 여운으로 이어지는 화이트 와인이다.", "120,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (18, "Freixo, Family Collection", "red", "Portugal", "Touriga Nacional", "2016", "0", "2", "3", "2", "https://images.vivino.com/thumbs/aZclP0_FTiSK4bKGCKZn7A_pb_600x600.png", "선명한 루비색을 띠며 블랙베리,딸기, 체리, 자두, 로즈마리,초코 삼나무 향이 피어 오른다. 입 안에서는 우아한 탄닌, 섬세한 산미, 입 안 가득한 구조감이 긴 여운으로 이어지는 와인이다.", "240,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (19, "Irvine, The Baroness Pet-Nat", "sparkling", "Australia", "Verdelho", "NV", "0", "2", "1", "0", "https://www.mybottleshop.com/media/catalog/product/cache/37a945ae749548a321239175b147c2a7/i/r/irvine_the_baroness_pet_nat_750ml.jpg", "옅은 청포도의 느낌과 레몬 제스트와 캐러멜 크림 등이 느껴진다. 가벼우면서 입속에서 리프레시 할 수 있는 와인으로 구조감을 느낄 수 있으면서 신선한 산도가 인상적인 와인이다.작은 알맹이의 포도를 부드럽게 압착하고 발효가 되는 과정에서 프랑스 오크통으로 옮겨 2차 발효를 실시한다.", "60,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (20, "Soho Westwood Rose", "rose", "New Zealand", "Cabernet Franc", "2014", "0", "3", "2", "1", "https://images.vivino.com/thumbs/QFBRi3k0TwOAAxFB1Vywng_pb_600x600.png", "가장 빨간 로제 맛 와인이다. 스파클링이 맛과 향이 같이 어울러 더욱 베리들의 품위가 살리고 더욱 더 중독성이 강한 와인이다.", "73,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (21, "Bibi Graetz, Colore", "red", "Italy", "Sangiovese", "2010", "0", "3", "4", "4", "https://images.vivino.com/thumbs/yF8qBJydSeCCu09wO2cORw_pb_x600.png", "세가지 레드 품종이 절묘하게 어우러져 체리, 스파이시함, 초콜릿 풍미가 부드러운 타닌과 조화를 이루는 매우 긴 피니쉬의 와인이다. 프렌치 오크통에서 21개월 숙성을 거친 후, 다시 6개월 병입 숙성을 한다. 900 병 한정생산.", "3,300,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (22, "Chacra, Chardonnay", "white", "Argentina", "Chardonnay", "2019", "0", "1", "3", "0", "https://images.vivino.com/thumbs/aH0XUzuvStCIyoWaSWlrMQ_pb_x960.png", "밝은 초코 노란빛을 띠고 감귤류 딸기 과일과 백도의 신선한 아로마 뿐만 아니라 자스민과 백합 등의 밀도 높은 화려한 뉘앙스가 여러 층으로 겹쳐 있다. 입 안에서는 부드러우면서 활기차며 생생함을 보여주고, 달콤한 과일향과 아름다운 산도의 절묘한 밸런스가 뛰어나다. 꿀, 버터, 바닐라, 크리미하면서 미묘함이 존재한다. 풀-바디의 민첩하고 세련된 스타일이며, 마지막까지 깨끗한 미네랄리티가 여운에 있고, 편안함이 느껴지는 와인이다.", "396,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (23, "Mollydooker, Girl on the Go", "sparkling", "Australia", "Verdelho", "NV", "1", "3", "2", "0", "https://images.vivino.com/thumbs/v7nKoBgAQm-HuWin-Rcqhw_pb_x960.png", "바이올리니스트의 스파클링 버전이다. 베르데호의 깊고 세련된 풍미가 버블과 함께 전해지는 발랄한 스타일의 스파클링 와인이다.", "74,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (24, "Cantine Ceci, Giuseppe Verdi Lambrusco Rosa Amabile", "sparkling", "Italy", "Lambrusco", "NV", "2", "2", "1", "0", "https://darwina.pl/61670-large_default/giuseppe-verdi-lambrusco-amabile-rose-bolle-label.jpg", "체리, 산딸기와 같은 신선한 과일의 향과 가벼운 시트러스의 향, 바이올렛 , 등나무 꽃향이 우아한 조화를 이뤄 매력적으로 느껴진다. 입 안에서는 섬세한 기포와 약간의 타닌감이 은은한 단맛과 훌륭히 어우러져 우아하고 즐거운 향미를 만들어내는 와인이다.", "35,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (25, "Orpheus and The Raven #7 Pinotage", "red", "Republic of South Africa", "Pinotage", "2019", "0", "2", "3", "3", "https://images.vivino.com/thumbs/IA_BqvB-TtS_Jf8XkxKXNA_pb_600x600.png", "진한 보라빛에 블랙베리, 다크초코렛,딸기, 모카, 타바코 아로마가 느껴진다. 입 안에서는 진한 베리류의 풍부한 아로마와 피노타쥐 특유의 스파이시함이 느껴지는 와인이다.", "200,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (26, "Nederburg, Rose", "rose", "Republic of South Africa", "pinot noir", "2018", "1", "3", "2", "1", "https://images.vivino.com/thumbs/ZbQXd5NGTCWD1HySQ9-5BA_pb_x960.png", "니더버그의 베스트 셀링 와인으로 선이 아름다운 파인애플형 바틀 스타일 덕에 남아공 뿐아니라 유럽 아시아 등지에서 꾸준한 인기를 끌고 있다. 남아공의 국가 대표 품종인 피노타지 품종을 100% 사용하여 여타의 로제와인과 차별화를 꾀했으며 아름다운 핑크딸기 빛 컬러로 발렌타인 데이나 특별한 날에 사랑하는 이에게 초코릿과 함께 선물하는 와인으로 유명하다.", "25,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (27, "Bodegas Staphyle, 581 Malbec", "red", "Argentina", "Malbec", "2020", "1", "0", "2", "2", "https://images.vivino.com/thumbs/6qpEeSAPTsCOxkJ0eSCqtQ_pb_600x600.png", "밝은 레드 컬러로 풍부한 과실 노즈와 신선한 자두와 체리향, 입 안에서는 우아한 미디엄 바디와 부드러운 타닌이 특징인 와인이다.", "40,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (28, "Egon Muller, Scharzhofberger Spatlese", "white", "Germany", "Riesling", "2018", "1", "4", "1", "0", "https://images.vivino.com/thumbs/NwRt7c2oQF6-mdBgs9gSLQ_pb_x600.png", "뽕따에서 흐르는 petroleum 향은 가히 어떤 리슬링과도 비교 불가한 역대급. 근데 역한 향이 전혀 아니란 게 놀라움.acacia 꽃향과 honey 벌꿀향을 베이스로 dried apricot, golden raisin 등의 단향이 폭발한다.추가로 단 향을 뚫고 올라오는 익숙한 tangerine 상큼한 감귤향이 은은하게 올라온다. 옅은 레몬빛의 색감이 깨끗하면서 너무 pale하지 않고 선명하다.", "740,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (29, "7 Colores, Brut Chamat", "sparkling", "Chile", "Chardonnay", "NV", "0", "3", "0", "0", "https://wine21.speedgabia.com/WINE_MST/TITLE/0169000/W0169314.png", "적당한 느낌과 너무 달지도 않고, 탄산이 살짝 있는 스파클링 와인이다.", "36,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (30, "La Piu Belle Rose", "rose", "Chile", "Cabernet Sauvignon", "2019", "0", "2", "0", "0", "https://images.vivino.com/thumbs/jskEyMjRSayatnvwLNwZZA_pb_600x600.png", "잘 익은 레드 베리와 살구, 패션 프루츠 시트러스 등의 상큼한 과실향과 함께 라벤더와 바이올렛 등의 아로마가 더해진다. 입 안에서는 풍성한 꽃향기와 둥글고 우아한 타닌감이 균형감 있으면서 드라이한 피니쉬를 보여주는 로제 와인이다.", "58,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (31, "Sandeman, 10 Years Old Tawny Port", "red", "Portugal", "Touriga Franca", "NV", "3", "0", "4", "3", "https://images.vivino.com/thumbs/HBepAgbvQoyhP_wGD7nUvQ_pb_x960.png", "이 와인은 다년간의 오크 숙성과 잘 익은 과일과의 조화로 만들어진 특별한 프리미엄 초코 숙성 포트 와인이다. 딸기 과일 향과 맛이 조화롭게 집약되어 미식가들의 입맛을 훌륭히 충족시키며 건포도 맛이 나며 잘 익은 과일, 잼, 너트 등이 어우러진 우아하고 복잡한 아로마향과 풀바디의 느낌이 지속적으로 느껴지는 포트와인이다.", "78,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (32, "Marcel Deiss, Riesling Vendanges Tardives", "white", "France", "Riesling", "2015", "3", "3", "3", "0", "https://images.vivino.com/thumbs/O4aRACHxSMuDWwCqA5ctmw_pb_x600.png", "밝고 투명한 노란색 초코를 띠고 열대 과일, 망다린, 벌꿀향, 베리향, 오렌지향을 느껴진다. 강렬한 첫 느낌, 바닐라, 타이트한 딸기 끝맛과 긴 여윤이 좋은 와인이다.", "120,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (33, "Burmester, Late Bottled Vintage Port", "red", "Portugal", "Touriga Nacional", "2015", "4", "3", "4", "3", "https://images.vivino.com/thumbs/0yVqakDYRQarcXXhSmQT2g_pb_x600.png", "바이올렛 색을 띠고 블랙 커런트, 라즈베리 소스, 딸기 발사믹의 아로마가 느껴진다. 입 안에서는 농축된 초코, 산미, 매끄러운 타닌, 달콤함이 하모니를 이루며 긴 피니쉬가 지속되는 와인이다.", "45,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (34, "Famille Hugel, Gewurztraminer Vendange Tardive", "white", "France", "Chardonnay", "2009", "3", "3", "3", "0", "https://images.vivino.com/thumbs/IQ0h09DMQvubPNSR9dZlbQ_pb_x600.png", "황금색에 가까운 투명하게 빛나는 노란색 초코. 고도로 집중된 딸기 리치, 아카시아, 꽃, 향신료 향이 표현된다. 107.0 g/l의 높은 당분 함량을 가지고 있으나 높은 산도(7.29 g/l)로 인하여 우아하고 매력적인 당도와 산도의 조화를 보여줍니다.", "130,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (35, "Romano Dal Forno, Vigna Sere", "red", "Italy", "Sangiovese", "2004", "4", "1", "4", "3", "https://images.vivino.com/thumbs/We3EIm6xTZuEEtFyK5LXRQ_pb_600x600.png", "실제로 2004빈티지 이후로 아직 새로운 빈티지가 나온 바 없다. 다크 초코향, 향신료, 에스프레소, 훈연한 데리야끼 소스 등 복합적인 딸기향과 섬세한 질감과 훌륭한 산미.", "650,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (36, "Taylor's Vintage Port", "red", "Portugal", "Pinot Noir", "1963", "4", "3", "4", "3", "https://www.taylor.pt/content/uploads/maingallery/crops/2381_crop_1515089570.png", "불투명한 자주색을 띠고, 신선한 라즈베리와 딸기 과일의 향의 아름다운 포트 와인으로, 복잡하면서도 초코 깊이가 느껴지는 맛과 초콜릿과 베리의 풍부한 조화를 느낄 수 있다.", "970,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (37, "Enrico Serafino, Barolo", "red", "Italy", "Nebbiolo", "2014", "1", "3", "2", "3", "https://images.vivino.com/thumbs/iNLFXaSAQ3i9edTNqrBJOw_pb_x600.png", "몬페라토 남부 오크 방향 초코맛 소재 포도밭의 35년 딸기 포도나무로부터 10월 초코 1~3주차 수작업으로 수확한 꽃 네비올로 100%로 만들어지며, 통상적인 바롤로와 레몬 같이 24개월 오크배럴, 12개월 병 숙성이후 출하된다.","160,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (38, "Tall horse, Cabernet Sauvignon", "red", "Italy", "Cabernet Sauvignon", "2009", "1", "3", "2", "3", "https://images.vivino.com/thumbs/-tjiyaz2TymbP6z0GsnpXQ_pb_x600.png", "반짝이는 루비의 초코,호사스러운 빛깔로, 오크향과 첫 입안에 들어오는  딸기, 레몬 상큼하고 달콤한 블랙베리와 같은 부드러운 목넘김이 좋고 blackcurrant, 초콜렛, 민트, 히말라야 삼목의 향기가 난다", "15,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (39, "Mauro Sebaste, Barolo Tresuri", "red", "Italy", "Nebbiolo", "2015", "1", "1", "2", "3", "https://images.vivino.com/thumbs/WvJ8vu-OT4mAaEvR1gtxuQ_pb_x600.png", "오렌지 빛이 감도는 짙은 루비색을 띠며 레드 커런트,레몬, 딸기, 체리, 석류, 버찌, 감초, 담뱃잎, 초코, 백후추, 삼나무, 흙먼지, 가죽 향을 느낄 수 있다. 풍미의 짜임새가 매우 오밀조밀하여 소박한 아로마에서부터 세련된 느낌까지 단계적으로 드러난다", "73,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (40, "Palladino Barolo Vigna Brogli", "red", "Italy", "Sangiovese", "2019", "0", "1", "1", "3", "https://images.vivino.com/thumbs/dZICT-egREySMhzblqJBMw_pb_x600.png", "깊은 가넷컬러를 띠고 다양한 블랙 과일 향, 허브, 민트, 초코, 오크 향이 나며, 블랙체리, 딸기 처럼 시트론 등의 과일맛이 느껴지는 와인이다. 입 안에서는 풍성한 꽃향기와 둥글고 우아한 타닌감이 균형감 있으면서 드라이한 피니쉬를 보여주는 로제 와인이다.", "210,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (41, "Mogen David Pomegranate", "red", "America", "Pinotage", "2017", "3", "3", "2", "0", "https://images.vivino.com/thumbs/soZbFKE_QomR-iLNxJeQng_pb_x600.png", "모건데이비드 초코 석류는 단일 꽃 브랜드로 국내 오크 최대의 판매량을 자랑하는 모건데이비드 콩코드 와인 처럼, 딸기 레몬 특유의 스위트한 향과 맛으로 국내 뿐만 아니라 전세계 소비자들에게 사랑 받아 오고 있으며 콩코드 포도의 전통적", "12,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (42, "L'accorde, Grand Reserve", "red", "America", "Merlot", "2018 ", "3", "3", "2", "1", "https://images.vivino.com/thumbs/y35eEPuaQJuA0Ly5A3OMrw_pb_x600.png", "진한루비-레드와 딸기처럼 잘익은 포도의 달콤한 향,콩코드 초코, 포도, 레몬, 오크 특유의 꽃 향기, 과일 향과 초코 맛이 풍부하고, 부드럽게 입안에서 감도는 단맛과 신선한 과일의 잔잔한 산도를 느낄수 있다.", "70,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (43, "Cape Mountain Natural Sweet Red", "red", "Republic of South Africa", "Muscat", "NV", "3", "2", "2", "3", "https://wine21.speedgabia.com/WINE_MST/TITLE/0148000/W0148860.jpg", "엷은 로제칼라에 무스카 포도 품종의 달콤한 딸기향이 은은하게 피어난다. 초코,복숭아,바닐라,레몬향과 아카시아향이 잡히고 끝맛은 꿀처럼 달콤하다. 버블은 없으며 달콤한 맛과 향이 자연에 피어나는 꽃처럼 화사하다", "25,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (44, "Distell, Obikwa Natural Sweet Red", "red", "Republic of South Africa", "Merlot", "NV", "3","2", "2", "3", "https://www.wineworldinc.com/media/catalog/product/cache/f109257f9edc17078e633252de47ea1e/u/s/us868.jpg", "루비 빛이 감도는 붉은 딸기 색을 띠고 베리, 자두와 같은 붉은 과일의 초코 향이 풍부하다. 풍부한 과일의 풍미와 함께 좋은 균형을 보이는 와인으로, 편안하게 즐길 수 있는 와인이다.", "26,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (45, "The Prisoner, Napa Valley Red Blend", "red", "America", "Zinfandel", "2016", "0", "3", "4", "4", "https://lh3.googleusercontent.com/proxy/36RoZnFZKv3P6iYJjAb7uOn-T-lCSbGCxj28zHy8puZnDnI6wmhJl1GKZausiclKHItNrVnIOWpQsqoRTYeTHQWbPjbxcQ6_lVCuQEb7za8mSN63R3nUIMA", "과일향이 `젖은 나무. 삼나무.오랜지 껍질 냄새` 아래에서 은은하게 피어남.", "146,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (46, "Gavalas Vinsanto", "white", "Greece", "Assyrtiko", "2008", "4", "0", "3", "0", "https://images.vivino.com/thumbs/gu69PGH8RGumDLa92VVQFA_pb_600x600.png", "배, 파인애플, 시트러스의 강한 과일향을 맡을 수 있으며, 균형잡힌 산도와 긴 여운이 매력적인 풀바디 와인이다.", "220,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (47, "Fidora, Moscato Spumante 'Demi-Sec'", "sparkling", "Italy", "Moscato", "NV", "3", "1", "3", "0", "https://images.vivino.com/thumbs/FzjqcRTeTo23mrkRRzja7w_pb_600x600.png", " 이탈리아어로 화이트 품종 뮈스까( Muscat)를 의미한다. 초코릿 향을 가득 품은 이탈리아 북서부 지역의 아스티 지방에서 생산되는 스파클링 와인은 모스카토 다스티 (Moscato d'Asti) 라 부른다. 모스카토는 토양적인 무스크 향에서 기인된 이름이다.레몬향과 딸기향, 꽃향,잘 숙성된 모스카토는 자연을 마주하는 존중은 건강한 오크와 포도를 만들어 와인 본질의 가치를 높여준다는 철학을 가지고 있다.", "80,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (48, "Sandara Sparkling Red", "red", "Spain", "Cabernet Sauvignon", "NV", "3", "3", "3", "1", "https://images.vivino.com/thumbs/6alx_h_BQUq_3CTwic07oA_pb_300x300.png", " 산다라 스파클링 레드는 과일과 꽃, 다크 초코릿, 시나몬, 그리고 넛맥의 풍미를 가진 짙은 가넷 빛의 와인이다. 상큼한 산도와 육감적인 탄닌이 강한 단맛을 중화시켜 주며 딸기처럼 달콤하고 끊임없이 피어오르는 섬세한 기포와 함께 오래도록 여운이 남는다. 기념일 또는 축배의 자리를 환상적으로 빛내줄 훌륭한 스파클링 와인이다.", "30,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (49, "Guntrum, Riesling Royal Blue", "white", "Germany", "Riesling", "2017", "3", "3", "3", "0", "https://images.vivino.com/thumbs/Ew0VIHHCSGC040GfRGBn5Q_pb_300x300.png", "우아하고 클래식한 전통 리슬링의 향이 청사과,꽃,오크,레몬, 시트러스, 파인애플, 그리고 블루베리나 멜론과 같은 열대과일의 아로마와 함께 잘 어우러진다. 단맛과 산도의 조화가 아주 뛰어난 와인이다.", "34,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (50, "Simply Zinfandel", "red", "America", "Zinfandel", "NV", "3", "4", "1", "3", "https://images.vivino.com/thumbs/DwtbVS0ETzCgoli9NgiAOA_pb_600x600.png", "맛있는 블랙 체리와 베리, 레몬, 블랙 커런트의 풍미에 오크향이 풍부한 과일의 피니시가 부드러운 맛을 선사하는 장미꽃향 미디엄 바디 와인이다.", "9,900")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (51, "Patritzi Piemonte Brachetto", "sparkling", "Italy", "Sangiovese", "NV", "4", "0", "4", "0", "https://images.vivino.com/thumbs/U8M92JXuRfWzQDOlfhUqdA_pb_600x600.png", "밝은 루비 빛 딸기빛 적색을 띠며 풍부한 과일 향과 꽃향기, 미묘한 사향이 가미, 부드럽고 달콤하며 상쾌한 정제된 끝 맛이 달콤한 초코릿처럼 오래도록 지속된다.", "64,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (52, "Budureasca Noble 5", "red", "Rumania", "Cabernet Sauvignon", "2013", "3", "4", "1", "4", "https://images.vivino.com/thumbs/8oIwmRAvTvWRAayLifEeCA_pb_300x300.png", "각 품종을 루마니아 오크 배럴과 프넬치 오크 베럴에서 12개월 이상 숙성시킨 뒤 병입한다.5가지의 품종이 블렌딩 된 와인이라는 의미에서 그 이름을 따왔으며, 각각의 품종에서 오는 가죽향, 후추향, 딸기 과실의 풍미와 함께 잘 짜여진 구조감과 기분 좋은 초코릿같은 미감이 매력적인 와인이다.", "20,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (53, "Dogma Prime Cabernet Sauvignon", "red", "Chile", "Cabernet Sauvign", "2016", "1", "4", "4", "1", "https://images.vivino.com/thumbs/y35eEPuaQJuA0Ly5A3OMrw_pb_x600.png", "진한 붉은 딸기빛 색상, 강렬한 레드베리,블랙베리,스파이시,모카향과 초코렛의 아로마와 좋은 바디감으로 입안에서 과일향이 퍼지고 오랫동안 지속되며 여운을 남긴다.", "90,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (54, "Caldirola, Amante", "red", "Italy", "Sangiovese", "2014", "3", "1", "2", "1", "https://wine21.speedgabia.com/WINE_MST/TITLE/0152000/W0152983.jpg", "아만떼는 사랑스러운 연인을 뜻하는 이태리어로,초코 부드러운 미감과 풍부한 과일 향이 일품이다. 자연적인 체리와 딸기 향을 느낄 수 있으며, 일반적인 레드 와인에 비해 아주 낮은 타닌과 부드러운 감미로 인해 와인 초보자들도 쉽게 접근할 수 있는 편안한 와인이다.", "20,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (55, "Cantine Ceci, Giuseppe Verdi Lambrusco Rosa Amabile", "sparkling", "Italy", "Nebbiolo", "2011", "3", "1", "2", "1", "https://images.vivino.com/thumbs/rZifzxfYTG6GDgYBofjlxw_pb_x600.png", "체리, 산딸기와 같은 신선한 과일의 향과 가벼운 시트러스의 향, 바이올렛 , 등나무 꽃향이 우아한 조화를 이뤄 매력적으로 느껴진다. 입 안에서는 섬세한 기포와 딸기 약간의 레몬 타닌감이 은은한 단맛과 훌륭히 어우러져 우아하고 즐거운 향미와 초코 향를 만들어내는 와인이다", "35,000")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, content, price) VALUES (56, "Brezza, Langhe Chardonnay", "white", "Italy", "Nebbiolo", "2020", "1", "3", "2", "1", "https://images.vivino.com/thumbs/iXo07BJWQOWXu-GHHJwf7A_pb_x600.png", "페일 골드, 초코 지푸라기색을 띠고 부드럽고 풍부한 딸기 플로럴, 레몬, 트로피컬 파인애플 아로마가 느껴진다. 입 안에서는 부드러운 산도, 가볍고 섬세한 과실풍미가 조화롭게 어우러지며, 뛰어난 구조감을 가진 와인이다.", "56,000")

INSERT INTO article (id, title, content, user_id, wine_id) VALUES (1, "Chateau Petrus 판매합니다", "제가 먹어본 와인 중에 가장 맛 있습니다, 관리가 좋은 와인", 1, 1);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (2, "Sierra Cantabria 판매합니다", "직접 포장 해드립니다. 한번 믿어봐주세요!!", 2, 2);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (3, "Bock, Rose Cuvee 판매합니다", "적당한 느낌과 너무 달지도 않고, 탄산이 살짝 있는 와인 연락 주세요!!", 3, 3);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (4, "Billecart Salmon, Inspiration 1818 Brut 판매합니다", "관리가 매우 좋고 보관이 매우 좋은 상태입니다!", 1, 4);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (5, "Garry Farrell Sauvignon Blanc 판매합니다", "직접 포장 해드립니다. 한번 믿어봐주세요!!", 2, 5);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (6, "Dominio de Pingus, Pingus 판매합니다", "관리가 매우 좋고 보관이 매우 좋은 상태입니다!", 3, 6);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (7, "Choco Bubble 판매합니다", "초코 맛 와인입니다! 직접 배달 갑니다!", 1, 7);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (8, "TroisL Reserva Cabernet Sauvignon 판매합니다", "보관 상태를 정말 잘 했습니다!", 2, 8);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (9, "Ricasoli, Albia 판매합니다", "밝은 핑크색, 싱그러운 자두 맛 와인!! 핵 맛납니다!!", 3, 9);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (10 ,"1000 Stories Chardonnay 판매합니다", "초코 맛 와인입니다! 직접 배달 갑니다!", 1, 10);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (11 ,"Philippe Viet, Beaujolais Nouveau 'Bojo Le Clown' 판매합니다", "관리가 매우 좋고 보관이 매우 좋은 상태입니다!", 2, 11);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (12 ,"Pink Elephant Rose 판매합니다", "끝맛이 좋은 와인이다. 한번 드셔보세요!", 3, 12);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (13 ,"Domaine Leroy, Richebourg Grand Cru 판매합니다", "보관 상태를 정말 잘 했습니다!", 3, 13);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (14 ,"Muga, Cava Conde de Haro 판매합니다", "관리가 매우 좋고 보관이 매우 좋은 상태입니다!", 3, 14);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (15 ,"Gentle Tiger White 판매합니다", "부드러운 산미와 과일향이 조화롭게 올라오고, 입 안에서는 밸런스가 느껴지는 와인이다.", 3, 15);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (16, "Leopard’s Leap, Culinaria Muscat", "직접 포장 해드립니다. 한번 믿어봐주세요!!", 1, 16);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (17, "Freixo, Reserve White 판매합니다", "보관 상태를 정말 잘 했습니다!", 2, 17);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (18, "Freixo, Family Collection 판매합니다", "관리가 매우 좋고 보관이 매우 좋은 상태입니다!", 3, 18);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (19, "Irvine, The Baroness Pet-Nat 판매합니다", "적당한 느낌과 너무 달지도 않고, 탄산이 살짝 있는 와인 연락 주세요!!", 1, 19);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (20, "Soho Westwood Rose 판매합니다", "가장 빨간 로제 맛 와인이다. 스파클링이 맛과 향이 같이 어울러 더욱 맛있어요!!", 2, 20);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (21, "Bibi Graetz, Colore 판매합니다", "끝맛이 좋은 와인이다. 한번 드셔보세요!", 3, 21);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (22, "Chacra, Chardonnay 판매합니다", "끝맛이 좋은 와인이다. 한번 드셔보세요!", 1, 22);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (23, "Mollydooker, Girl on the Go 판매합니다", "적당한 느낌과 너무 달지도 않고, 탄산이 살짝 있는 와인 연락 주세요!!", 2, 23);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (24, "Cantine Ceci, Giuseppe Verdi Lambrusco Rosa Amabile 판매합니다", "관리가 매우 좋고 보관이 매우 좋은 상태입니다!", 3, 24);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (25 ,"Orpheus and The Raven #7 Pinotage 판매합니다", "입 안에서는 진한 베리류의 풍부한 아로마와 피노타쥐 특유의 스파이시함이 느껴지는 와인이다.", 1, 25);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (26 ,"Nederburg, Rose 판매합니다", "직접 포장 해드립니다.전국 어디에나!!! 가능!!!", 2, 26);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (27 ,"Bodegas Staphyle, 581 Malbec 판매합니다", "밝은 레드 컬러로 풍부한 과실 노즈와 신선한 자두와 체리향, 입 안에서는 우아한 미디엄 바디와 부드러운 타닌이 특징인 와인이다.", 3, 27);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (28 ,"Egon Muller, Scharzhofberger Spatlese 판매합니다", "적당한 느낌과 너무 달지도 않고, 탄산이 살짝 있는 와인 연락 주세요!!", 3, 28);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (29 ,"7 Colores, Brut Chamat 판매합니다", "칠레에서 직접 사온 와인 마셔보세요!!", 3, 29);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (30 ,"La Piu Belle Rose 판매합니다", "입 안에서는 풍성한 꽃향기와 둥글고 우아한 타닌감이 균형감 있으면서 드라이한 피니쉬를 보여주는 로제 와인이다.", 3, 30);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (31 ,"Sandeman, 10 Years Old Tawny Port 판매합니다", "단도가 높고 너무 맛나는 와인입니다!", 1, 31);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (32 ,"Marcel Deiss, Riesling Vendanges Tardives 판매합니다", "프랑스에서 직접 사온 와인 마셔보세요!!", 2, 32);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (33 ,"Burmester, Late Bottled Vintage Port 판매합니다", "너무나 맛있고 빈티지 합니다 ㅠㅠ 꼭 사세요", 3, 33);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (34 ,"Famille Hugel, Gewurztraminer Vendange Tardive 판매합니다", "배달도 베리 굿굿 직접 사온 와인 마셔보세요!!", 1, 34);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (35 ,"Romano Dal Forno, Vigna Sere 판매합니다", "로마에서 직접 사온 와인 마셔보세요!!", 2, 35);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (36 ,"Taylor's Vintage Port 판매합니다", "내 친구 테일러는 너무 맛 있다 대박임!!", 3, 36);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (37 ,"Enrico Serafino, Barolo 판매합니다", "이탈리아 에서 직접 사온 와인 마셔보세요!!", 3, 37);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (38 ,"Tall horse, Cabernet Sauvignon 판매합니다", "이탈리아 에서 한땀 한땀 숙성시켜 만든 와인! 마셔보세요!!", 2, 38);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (39 ,"Mauro Sebaste, Barolo Tresuri 판매합니다", "이탈리아에서 직접 사온 와인 마셔보세요!!", 2, 39);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (40 ,"Palladino Barolo Vigna Brogli 판매합니다", "이탈리아 에서 한땀 한땀 숙성시켜 만든 와인! 마셔보세요!!", 1, 40);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (41 ,"Mogen David Pomegranate 판매합니다", "미국에서 직접 사온 와인 마셔보세요!!", 3, 41);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (42 ,"L'accorde, Grand Reserve 판매합니다", "미국 에서 한땀 한땀 숙성시켜 만든 와인! 마셔보세요!!", 3, 42);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (43 ,"Cape Mountain Natural Sweet Red 판매합니다", "레드 중에 레즈 딸기향이 대박!!", 1, 43);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (44 ,"Distell, Obikwa Natural Sweet Red 판매합니다", "초코가 안들어갔는데 왜 초코 맛이 나지? 한번 사봐요!", 2, 44);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (45 ,"The Prisoner, Napa Valley Red Blend 판매합니다", "과일향이 좋아요 삼나무 껍질 냄새를 좋아하시면 즐겨보세요.", 2, 45);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (46 ,"Gavalas Vinsanto 판매합니다", "배, 파인애플, 시트러스의 강한 과일향을 맡을 수 있으며, 균형잡힌 산도와 긴 여운이 매력적인 풀바디 와인이다.", 1, 46);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (47 ,"Fidora, Moscato Spumante 'Demi-Sec' 판매합니다", "이탈리아어로 화이트 품종 뮈스까( Muscat)를 의미한다. 이탈리아 북서부 지역의 아스티 지방에서 생산되는 스파클링 와인은 모스카토 다스티 (Moscato d'Asti) 라 부른다", 1, 47);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (48 ,"Sandara Sparkling Red 판매합니다", "산다라 스파클링 레드는 과일과 꽃, 다크 초코릿, 시나몬, 그리고 넛맥의 풍미를 가진 짙은 가넷 빛의 와인입니다 진짜맛있어요 꼭 드셔보세요!", 1, 48);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (49 ,"Guntrum, Riesling Royal Blue 판매합니다", "단맛과 산도의 조화가 아주 뛰어난 와인이다", 2, 49);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (50 ,"Simply Zinfandel", "피니시가 부드러운 맛입니다! 꼭 드셔보세요", 1, 50);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (51 ,"Patritzi Piemonte Brachetto", "미묘한 사향이 가미, 부드럽고 달콤하며 상쾌한 정제된 끝 맛", 1, 51);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (52 ,"Budureasca Noble 5", "5가지의 품종이 블렌딩 된 와인이라는 의미입니다. 꼭 드셔보세요!", 1, 52);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (53 ,"Dogma Prime Cabernet Sauvignon 판매합니다", "5가지의 품종이 블렌딩 된 와인이라는 의미입니다. 꼭 드셔보세요!", 1, 53);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (54, "Caldirola, Amante 판매합니다", "제가 먹어본 와인 중에 가장 맛 있습니다, 관리가 좋은 와인", 2, 54);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (55, "Cantine Ceci, Giuseppe Verdi Lambrusco Rosa Amabile 판매합니다", "제가 먹어본 와인 중에 가장 맛 있습니다, 관리가 좋은 와인", 3, 55);
INSERT INTO article (id, title, content, user_id, wine_id) VALUES (56, "Brezza, Langhe Chardonnay 판매합니다", "제가 먹어본 와인 중에 가장 맛 있습니다, 관리가 좋은 와인", 3, 56);


INSERT INTO user_article_cart (id, user_id, article_id) VALUES (1 ,1 ,1)
INSERT INTO user_article_cart (id, user_id, article_id) VALUES (2 ,4 ,1)
INSERT INTO user_article_cart (id, user_id, article_id) VALUES (3 ,3 ,1)