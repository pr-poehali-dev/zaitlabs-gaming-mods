import Header from '@/components/Header';
import ModCard from '@/components/ModCard';
import GameCard from '@/components/GameCard';
import AchievementBadge from '@/components/AchievementBadge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Index() {
  const featuredMods = [
    {
      title: "Enhanced Graphics Pack",
      game: "Manhunt 2",
      author: "DarkModder",
      downloads: 15420,
      rating: 4.8,
      image: "https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/f3031d53-4049-48b5-b7cb-1a2a1ad58edb.jpg",
      category: "Графика"
    },
    {
      title: "Realism Overhaul",
      game: "Postal 2",
      author: "RealistPro",
      downloads: 8932,
      rating: 4.5,
      image: "https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/3583e678-bfd7-4f5e-bfbd-1abc5010a1a8.jpg",
      category: "Геймплей"
    },
    {
      title: "New Weapons Pack",
      game: "Manhunt 2",
      author: "WeaponMaster",
      downloads: 12341,
      rating: 4.7,
      image: "https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/f3031d53-4049-48b5-b7cb-1a2a1ad58edb.jpg",
      category: "Оружие"
    },
    {
      title: "HD Textures",
      game: "Postal 2",
      author: "TexMaster",
      downloads: 19823,
      rating: 4.9,
      image: "https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/3583e678-bfd7-4f5e-bfbd-1abc5010a1a8.jpg",
      category: "Графика"
    }
  ];

  const games = [
    {
      title: "Manhunt 2",
      modsCount: 247,
      image: "https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/f3031d53-4049-48b5-b7cb-1a2a1ad58edb.jpg"
    },
    {
      title: "Postal 2",
      modsCount: 189,
      image: "https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/3583e678-bfd7-4f5e-bfbd-1abc5010a1a8.jpg"
    },
    {
      title: "Max Payne",
      modsCount: 312,
      image: "https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/3583e678-bfd7-4f5e-bfbd-1abc5010a1a8.jpg"
    }
  ];

  const achievements = [
    { title: "Твой первый мод!", description: "Загрузил свой первый мод на платформу", icon: "Upload", earned: true, earnedDate: "2024-10-15" },
    { title: "1 год на сайте", description: "Проведи год в нашем сообществе", icon: "Calendar", earned: true, earnedDate: "2024-01-01" },
    { title: "Популярный автор", description: "Набери 10,000 скачиваний", icon: "TrendingUp", earned: false },
    { title: "Коллекционер", description: "Скачай 50 модов", icon: "Package", earned: true, earnedDate: "2024-09-20" },
    { title: "Мастер-моддер", description: "Загрузи 10 модов", icon: "Award", earned: false },
    { title: "5 звезд", description: "Получи рейтинг 5.0 на мод", icon: "Star", earned: false }
  ];

  const stats = [
    { label: "Всего модов", value: "1,247", icon: "Package", color: "text-primary" },
    { label: "Активных пользователей", value: "8,432", icon: "Users", color: "text-secondary" },
    { label: "Скачиваний", value: "127K", icon: "Download", color: "text-accent" },
    { label: "Игр", value: "23", icon: "Gamepad2", color: "text-primary" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-12">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12">
          <div className="relative z-10 max-w-3xl space-y-4">
            <h1 className="font-heading font-bold text-4xl md:text-6xl animate-fade-in">
              Добро пожаловать в ZaitLabs
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Крупнейшая платформа для модификаций культовых игр. Создавай, делись и скачивай моды от комьюнити.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Button size="lg" className="gap-2">
                <Icon name="Compass" size={20} />
                Исследовать моды
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Icon name="Upload" size={20} />
                Загрузить мод
              </Button>
            </div>
          </div>
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-secondary/30 rounded-full blur-3xl" />
        </section>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                <div className={`w-12 h-12 rounded-full bg-card flex items-center justify-center ${stat.color}`}>
                  <Icon name={stat.icon as any} size={24} />
                </div>
                <div className="font-heading font-bold text-2xl">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="featured">
              <Icon name="Zap" size={16} className="mr-2" />
              Популярные
            </TabsTrigger>
            <TabsTrigger value="new">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Новые
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMods.map((mod, index) => (
                <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ModCard {...mod} />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMods.slice().reverse().map((mod, index) => (
                <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ModCard {...mod} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-3xl">Популярные игры</h2>
            <Button variant="ghost" className="gap-2">
              Все игры
              <Icon name="ArrowRight" size={16} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.map((game, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <GameCard {...game} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Trophy" size={24} className="text-accent" />
                Достижения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <AchievementBadge {...achievement} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="bg-card rounded-2xl p-8 text-center space-y-4">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Users" size={32} className="text-primary" />
          </div>
          <h3 className="font-heading font-bold text-2xl">Присоединяйся к сообществу</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Общайся с тысячами моддеров, делись опытом и получай помощь в создании модификаций для любимых игр.
          </p>
          <Button size="lg" className="gap-2">
            <Icon name="MessageCircle" size={20} />
            Открыть форум
          </Button>
        </section>
      </main>

      <footer className="border-t border-border/40 mt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Rocket" size={20} className="text-primary" />
              <span>© 2024 ZaitLabs. Все права защищены.</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">О нас</a>
              <a href="#" className="hover:text-foreground transition-colors">Правила</a>
              <a href="#" className="hover:text-foreground transition-colors">Помощь</a>
              <a href="#" className="hover:text-foreground transition-colors">Контакты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
