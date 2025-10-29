import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ModCard from '@/components/ModCard';
import GameCard from '@/components/GameCard';
import AchievementBadge from '@/components/AchievementBadge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { api, type Game, type Mod, type Achievement } from '@/lib/api';

export default function Index() {
  const [games, setGames] = useState<Game[]>([]);
  const [mods, setMods] = useState<Mod[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesData, modsData, achievementsData] = await Promise.all([
          api.games.getAll(),
          api.mods.getAll({ sort: 'downloads', limit: 8 }),
          api.achievements.getAll()
        ]);
        
        setGames(gamesData.games || []);
        setMods(modsData.mods || []);
        setAchievements(achievementsData.achievements || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={48} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  const totalDownloads = mods.reduce((sum, mod) => sum + mod.downloads_count, 0);
  const stats = [
    { label: "Всего модов", value: mods.length.toString(), icon: "Package", color: "text-primary" },
    { label: "Активных пользователей", value: "0", icon: "Users", color: "text-secondary" },
    { label: "Скачиваний", value: totalDownloads.toLocaleString(), icon: "Download", color: "text-accent" },
    { label: "Игр", value: games.length.toString(), icon: "Gamepad2", color: "text-primary" }
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
              {mods.length > 0 ? (
                mods.slice(0, 8).map((mod, index) => (
                  <div key={mod.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ModCard 
                      title={mod.title}
                      game={mod.game_title}
                      author={mod.author_username}
                      downloads={mod.downloads_count}
                      rating={parseFloat(mod.rating.toString())}
                      image={mod.image_url || 'https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/f3031d53-4049-48b5-b7cb-1a2a1ad58edb.jpg'}
                      category={mod.category}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Пока нет модов. Будь первым!</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="new" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mods.length > 0 ? (
                mods.slice().reverse().slice(0, 8).map((mod, index) => (
                  <div key={mod.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ModCard 
                      title={mod.title}
                      game={mod.game_title}
                      author={mod.author_username}
                      downloads={mod.downloads_count}
                      rating={parseFloat(mod.rating.toString())}
                      image={mod.image_url || 'https://cdn.poehali.dev/projects/771a388d-7f14-499e-8687-bc465eed70b9/files/f3031d53-4049-48b5-b7cb-1a2a1ad58edb.jpg'}
                      category={mod.category}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  <Icon name="Package" size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Пока нет модов. Будь первым!</p>
                </div>
              )}
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
            {games.length > 0 ? (
              games.map((game, index) => (
                <div key={game.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                  <GameCard 
                    title={game.title}
                    modsCount={game.mods_count}
                    image={game.image_url}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <Icon name="Gamepad2" size={48} className="mx-auto mb-4 opacity-50" />
                <p>Игры загружаются...</p>
              </div>
            )}
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
                {achievements.length > 0 ? (
                  achievements.map((achievement, index) => (
                    <div key={achievement.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <AchievementBadge 
                        title={achievement.title}
                        description={achievement.description}
                        icon={achievement.icon}
                        earned={achievement.earned || false}
                        earnedDate={achievement.earned_at}
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    <Icon name="Trophy" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Достижения загружаются...</p>
                  </div>
                )}
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