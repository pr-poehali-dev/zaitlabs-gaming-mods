import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ModCardProps {
  title: string;
  game: string;
  author: string;
  downloads: number;
  rating: number;
  image: string;
  category: string;
}

export default function ModCard({ title, game, author, downloads, rating, image, category }: ModCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-secondary/90 backdrop-blur-sm">
            {category}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-lg truncate">{title}</h3>
            <p className="text-sm text-muted-foreground">{game}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Icon name="Star" size={16} />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="User" size={14} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Download" size={14} />
            <span>{downloads.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button className="w-full" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Скачать
        </Button>
      </CardFooter>
    </Card>
  );
}
