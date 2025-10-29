import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'mods', label: 'Моды', icon: 'Package' },
    { id: 'games', label: 'Игры', icon: 'Gamepad2' },
    { id: 'achievements', label: 'Достижения', icon: 'Trophy' },
    { id: 'community', label: 'Сообщество', icon: 'Users' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Rocket" size={24} className="text-white" />
              </div>
              <span className="font-heading font-bold text-xl">ZaitLabs</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveSection(item.id)}
                  className="gap-2"
                >
                  <Icon name={item.icon as any} size={16} />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block w-64">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Поиск модов..." 
                className="pl-10"
              />
            </div>
            
            <Button size="sm" className="gap-2">
              <Icon name="Upload" size={16} />
              <span className="hidden sm:inline">Загрузить мод</span>
            </Button>
            
            <Button variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
