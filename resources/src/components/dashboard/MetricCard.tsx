
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  metric: string | number;
  description?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'glass';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  metric,
  description,
  icon,
  footer,
  trend,
  className,
  variant = 'default',
}) => {
  return (
    <Card className={cn(
      "overflow-hidden hover-lift transition-all duration-300",
      variant === 'glass' ? "glass-morphism border-0" : "neo-morphism",
      className
    )}>
      <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {icon && <div className="opacity-70">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{metric}</div>
        {trend && (
          <div className="flex items-center mt-2">
            <span className={cn(
              "text-xs inline-flex items-center px-2 py-0.5 rounded-full",
              trend.isPositive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400" : 
                                "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
            )}>
              <svg 
                className={cn("w-3 h-3 mr-1", trend.isPositive ? "text-emerald-500" : "text-red-500")} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={trend.isPositive ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
                />
              </svg>
              {trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-2">{trend.label}</span>
          </div>
        )}
      </CardContent>
      {footer && <CardFooter className="pt-0 border-t border-border/50">{footer}</CardFooter>}
    </Card>
  );
};

export default MetricCard;
