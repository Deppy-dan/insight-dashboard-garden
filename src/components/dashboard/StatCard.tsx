
import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const statCardVariants = cva(
  "rounded-lg p-5 transition-all overflow-hidden hover-lift neo-morphism", 
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        glass: "glass-morphism text-card-foreground",
        purple: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
        blue: "bg-primary/10 text-primary",
        green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        pink: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
        red: "bg-red-500/10 text-red-600 dark:text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  variant,
  className,
}) => {
  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <div className="flex justify-between items-start mb-3">
        <p className="text-sm font-medium opacity-80">{title}</p>
        {icon && <div>{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight">{value}</h3>
          {trend && (
            <div className="flex items-center mt-1 text-xs">
              {trend.isPositive ? (
                <>
                  <ArrowUpRight
                    className="mr-1 h-3 w-3 text-emerald-500" 
                    aria-hidden="true"
                  />
                  <span className="text-emerald-500">{trend.value}%</span>
                </>
              ) : (
                <>
                  <ArrowDownRight
                    className="mr-1 h-3 w-3 text-red-500" 
                    aria-hidden="true"
                  />
                  <span className="text-red-500">{trend.value}%</span>
                </>
              )}
              <span className="ml-1 opacity-70">vs. mês anterior</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
