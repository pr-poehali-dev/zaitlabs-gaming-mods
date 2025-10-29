import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AchievementBadgeProps {
  title: string;
  description: string;
  icon: string;
  earned?: boolean;
  earnedDate?: string;
}

export default function AchievementBadge({ 
  title, 
  description, 
  icon, 
  earned = false,
  earnedDate 
}: AchievementBadgeProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className={`
          relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer
          ${earned 
            ? 'bg-card border-primary shadow-lg shadow-primary/20 hover:scale-105' 
            : 'bg-muted/30 border-muted opacity-50 hover:opacity-70'
          }
        `}>
          <div className="flex flex-col items-center gap-2 text-center">
            <div className={`
              w-12 h-12 rounded-full flex items-center justify-center
              ${earned ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}
            `}>
              <Icon name={icon as any} size={24} />
            </div>
            <div className="space-y-1">
              <p className="font-heading font-semibold text-sm">{title}</p>
              {earned && earnedDate && (
                <Badge variant="outline" className="text-xs">
                  {new Date(earnedDate).toLocaleDateString('ru-RU')}
                </Badge>
              )}
            </div>
          </div>
          {earned && (
            <div className="absolute -top-2 -right-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} className="text-primary-foreground" />
              </div>
            </div>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </TooltipContent>
    </Tooltip>
  );
}
