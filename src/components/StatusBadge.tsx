import { Badge } from '@/components/ui/badge';
import type { WorkOrderStatus } from '@/types';
import { cn } from '@/lib/utils';

const statusConfig: Record<WorkOrderStatus, { label: string; className: string }> = {
  CREATED: { label: 'Criada', className: 'bg-muted text-muted-foreground border-border' },
  IN_PROGRESS: { label: 'Em Andamento', className: 'bg-[hsl(var(--info))] text-[hsl(var(--info-foreground))] border-transparent' },
  READY: { label: 'Pronta', className: 'bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] border-transparent' },
  DELIVERED: { label: 'Entregue', className: 'bg-primary text-primary-foreground border-transparent' },
  CANCELLED: { label: 'Cancelada', className: 'bg-destructive text-destructive-foreground border-transparent' },
};

interface StatusBadgeProps {
  status: WorkOrderStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={cn(config.className, className)}>
      {config.label}
    </Badge>
  );
}
