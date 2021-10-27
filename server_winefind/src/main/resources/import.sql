INSERT INTO users (id, email, nickname, password, image, created_at, updated_at) VALUES (1, "MJ@codestates.com", "MJ", "0000", "default.img", now(), now());
INSERT INTO users (id, email, nickname, password, image, created_at, updated_at) VALUES (2, "HJ@codestates.com", "HJ", "0000", "default.img", now(), now());
INSERT INTO users (id, email, nickname, password, image, created_at, updated_at) VALUES (3, "SW@codestates.com", "SW", "0000", "default.img", now(), now());
INSERT INTO users (id, email, nickname, password, image, created_at, updated_at) VALUES (4, "JH@codestates.com", "JH", "0000", "default.img", now(), now());

INSERT INTO wines (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (1, "Sauvignon blanc", "red", "France", "Sauternes", "1990504", "5point", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")
INSERT INTO wines (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (2, "Sauvignon blanc1", "red", "France", "Sauternes", "1990504", "5point", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")
INSERT INTO wines (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (3, "Sauvignon blanc2", "red", "France", "Sauternes", "1990504", "5point", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")
INSERT INTO wines (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (4, "Sauvignon blanc3", "red", "France", "Sauternes", "1990504", "5point", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")
INSERT INTO wines (id, wine_name, type, country, grape, vintage, sweet, acidity, body, tannic, image, comment, price) VALUES (5, "Sauvignon blanc4", "red", "France", "Sauternes", "1990504", "5point", "5point", "Bold", "5point", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "taste good", "100M")

INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (1, "TEST1", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 1, 1);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (2, "TEST2", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 2, 2);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (3, "TEST3", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 3, 3);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (4, "TEST1", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 1, 4);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (5, "TEST2", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 2, 5);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (6, "TEST3", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 3, 1);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (7, "TEST1", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 1, 2);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (8, "TEST2", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 2, 3);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (9, "TEST3", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 3, 4);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (10 ,"TEST1", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 1, 5);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (11 ,"TEST2", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 2, 1);
INSERT INTO article (id, title, image, comment, user_id, wine_id) VALUES (12 ,"TEST3", "http://www.sommeliertimes.com/news/photo/201702/3944_7266_122.png", "TEST content", 3, 2);



