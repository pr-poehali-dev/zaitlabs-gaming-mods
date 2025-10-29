import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameCardProps {
  title: string;
  modsCount: number;
  image: string;
}

export default function GameCard({ title, modsCount, image }: GameCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 cursor-pointer group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <CardContent className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-heading font-bold text-xl mb-2">{title}</h3>
          <Badge variant="secondary" className="bg-secondary/80 backdrop-blur-sm">
            {modsCount} модов
          </Badge>
        </CardContent>
      </div>
    </Card>
  );
}
