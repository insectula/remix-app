use data;
CREATE TABLE data (ID INT NOT NULL AUTO_INCREMENT, added datetime, modified datetime, status varchar(20), category varchar(50), subcategory varchar(200), title text, description text, name varchar(200))
INSERT INTO data (added, modified, status, category, subcategory, title, description, name)
(SELECT added, modified, status, 'взрывозащищенные клапаны' AS category, 'АЗЕ' AS subcategory, title, description, REPLACE(name,'klapan-obratnyj-iskrobezopasnyj-','') AS name FROM products WHERE name LIKE '%klapan-obratnyj-iskrobezopasnyj-%'),
(SELECT added, modified, status, 'противопожарные клапаны', subcategory, title, description, REPLACE(name,'protivopozharnyj-klapan-','') AS name FROM products WHERE name LIKE '%protivopozharnyj-klapan-%'),
(SELECT added, modified, status, 'противопожарные клапаны', subcategory, title, description, REPLACE(name,'klapan-dymoudaleniya-','') AS name FROM products WHERE name LIKE '%klapan-dymoudaleniya-%'),
(SELECT added, modified, status, 'воздушные клапаны', subcategory, title, description, REPLACE(name,'klapan-dymoudaleniya-','') AS name FROM products WHERE name LIKE '%klapan-dymoudaleniya-%'),
(SELECT added, modified, status, 'электроприводы', subcategory, title, description, REPLACE(name,'elektroprivod-','') AS name FROM products WHERE name LIKE '%elektroprivod-%'),
(SELECT added, modified, status, 'элементы монтажа', 'дефлекторы', title, description, REPLACE(name,'deflektor-','') AS name FROM products WHERE name LIKE '%deflektor-%'),
(SELECT added, modified, status, 'элементы монтажа', 'фасадные решетки', title, description, REPLACE(name,'fasadnaya-ventilyatsionnaya-reshyotka-','') AS name FROM products WHERE name LIKE '%fasadnaya-ventilyatsionnaya-reshyotka-%'),
(SELECT added, modified, status, 'элементы монтажа', 'монтажные стаканы', title, description, REPLACE(name,'montazhnyj-stakan-','') AS name FROM products WHERE name LIKE '%montazhnyj-stakan-%'),
(SELECT added, modified, status, 'элементы монтажа', 'компенсаторы линейных расширений', title, description, REPLACE(name,'kompensator-linejnyh-rasshirenij-','') AS name FROM products WHERE name LIKE '%kompensator-linejnyh-rasshirenij-%'),
(SELECT added, modified, status, 'элементы монтажа', 'решетки РДКМ', title, description, REPLACE(name,'reshetka-dlya-klapana-rkdm-','') AS name FROM products WHERE name LIKE '%reshetka-dlya-klapana-rkdm-%'),
(SELECT added, modified, status, 'шумоглушители', 'пластинчатые', title, description, REPLACE(name,'shumoglushitel-plastinchatyj-','') AS name FROM products WHERE name LIKE '%shumoglushitel-plastinchatyj-%'),
(SELECT added, modified, status, 'шумоглушители', 'трубчатые', title, description, REPLACE(name,'shumoglushitel-trubchatyj-','') AS name FROM products WHERE name LIKE '%shumoglushitel-trubchatyj-%'),
(SELECT added, modified, status, 'элементы монтажа', 'узлы прохода', title, description, REPLACE(name,'uzel-prohoda-','') AS name FROM products WHERE name LIKE '%uzel-prohoda-%'),
(SELECT added, modified, status, 'воздушные клапаны', 'АВК', title, description, REPLACE(name,'vozdushnyj-klapan-avk-','') AS name FROM products WHERE name LIKE '%vozdushnyj-klapan-avk-%'),
(SELECT added, modified, status, 'взрывозащищенные клапаны', 'противопожарные', title, description, REPLACE(name,'vzryvozashhishhennyj-ex-protivopozharnyj-klapan-','') AS name FROM products WHERE name LIKE '%vzryvozashhishhennyj-ex-protivopozharnyj-klapan-%'),
(SELECT added, modified, status, 'элементы монтажа', 'зонты вытяжные', title, description, name FROM products WHERE name LIKE '%zont-vytyazhnoj-iz-nerzhaveyushhej-stali-600h600mm%')


