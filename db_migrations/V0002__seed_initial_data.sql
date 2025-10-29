INSERT INTO games (title, slug, description, image_url) VALUES
('Manhunt 2', 'manhunt-2', 'Психологический стелс-экшен с жестокими сценами', 'https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/f3031d53-4049-48b5-b7cb-1a2a1ad58edb.jpg'),
('Postal 2', 'postal-2', 'Культовый шутер с черным юмором и безумным геймплеем', 'https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/3583e678-bfd7-4f5e-bfbd-1abc5010a1a8.jpg'),
('Max Payne', 'max-payne', 'Нуарный экшен с эффектом замедления времени', 'https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/3583e678-bfd7-4f5e-bfbd-1abc5010a1a8.jpg')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO achievements (title, description, icon) VALUES
('Твой первый мод!', 'Загрузил свой первый мод на платформу', 'Upload'),
('1 год на сайте', 'Проведи год в нашем сообществе', 'Calendar'),
('Популярный автор', 'Набери 10,000 скачиваний', 'TrendingUp'),
('Коллекционер', 'Скачай 50 модов', 'Package'),
('Мастер-моддер', 'Загрузи 10 модов', 'Award'),
('5 звезд', 'Получи рейтинг 5.0 на мод', 'Star');