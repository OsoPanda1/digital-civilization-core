import { cn } from '@/lib/utils';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterTabsProps {
  options: FilterOption[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function FilterTabs({
  options,
  activeId,
  onChange,
  className = ''
}: FilterTabsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-all',
            activeId === option.id
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
