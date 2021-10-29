--import later!
INSERT INTO user (id, email, nickname, password, image, created_at, updated_at) VALUES (1, "MJ@codestates.com", "MJ", "0000", "default.img", now(), now());
INSERT INTO user (id, email, nickname, password, image, created_at, updated_at) VALUES (2, "HJ@codestates.com", "HJ", "0000", "default.img", now(), now());
INSERT INTO user (id, email, nickname, password, image, created_at, updated_at) VALUES (3, "SW@codestates.com", "SW", "0000", "default.img", now(), now());
INSERT INTO user (id, email, nickname, password, image, created_at, updated_at) VALUES (4, "JH@codestates.com", "JH", "0000", "default.img", now(), now());

INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (1, "Sauvignon blanc", "blue", "France", "Sauternes", "1990504", "tte", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (2, "Sauvignon blanc", "blue", "korea", "Sauternes", "1990504", "5point", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (3, "Sauvignon blanc", "red", "France", "Sauternes", "1990504", "5point", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (4, "Sauvignon blanc3", "red", "vella", "Sauternes", "1990504", "5point", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")
INSERT INTO wine (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (5, "Sauvignon blanc4", "red", "France", "Sauternes", "1990504", "5point", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")


INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (1, "TEST1", "TEST content", 1, 1);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (2, "TEST2", "TEST content", 2, 2);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (3, "TEST3", "TEST content", 3, 3);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (4, "TEST1", "TEST content", 1, 4);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (5, "TEST2", "TEST content", 2, 5);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (6, "TEST3", "TEST content", 3, 1);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (7, "TEST1", "TEST content", 1, 2);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (8, "TEST2", "TEST content", 2, 3);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (9, "TEST3", "TEST content", 3, 4);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (10 ,"TEST1", "TEST content", 1, 5);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (11 ,"TEST2", "TEST content", 2, 1);
INSERT INTO article (id, title, comment, user_id, wine_id) VALUES (12 ,"TEST3", "TEST content", 3, 2);

INSERT INTO consumer (id, email, nickname, created_at, updated_at) VALUES (1, "MJ@cos", "MJ", now(), now())
INSERT INTO consumer (id, email, nickname, created_at, updated_at) VALUES (2, "HJ@cos", "HJ", now(), now())
INSERT INTO consumer (id, email, nickname, created_at, updated_at) VALUES (3, "SW@cos", "SW", now(), now())
