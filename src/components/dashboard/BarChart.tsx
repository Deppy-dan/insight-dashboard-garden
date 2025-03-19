
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BarChartProps {
  data: any[];
  title?: string;
  description?: string;
  xAxisDataKey: string;
  bars: {
    dataKey: string;
    fill: string;
    name?: string;
  }[];
  showGrid?: boolean;
  className?: string;
  height?: number;
  layout?: 'vertical' | 'horizontal';
  stacked?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  description,
  xAxisDataKey,
  bars,
  showGrid = true,
  className,
  height = 300,
  layout = 'horizontal',
  stacked = false,
}) => {
  return (
    <Card className={cn("overflow-hidden neo-morphism hover-lift", className)}>
      {(title || description) && (
        <CardHeader className="pb-2">
          {title && <CardTitle className="text-lg">{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className={cn("p-1", title || description ? "pt-0" : "pt-6")}>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout={layout}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.1)" />}
              <XAxis
                dataKey={layout === 'vertical' ? undefined : xAxisDataKey}
                type={layout === 'vertical' ? 'number' : 'category'}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
              />
              <YAxis
                dataKey={layout === 'vertical' ? xAxisDataKey : undefined}
                type={layout === 'vertical' ? 'category' : 'number'}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                labelStyle={{ fontWeight: 500, marginBottom: 4 }}
              />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: 20 }}
              />
              {bars.map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={bar.dataKey}
                  name={bar.name || bar.dataKey}
                  fill={bar.fill}
                  radius={[4, 4, 0, 0]}
                  stackId={stacked ? 'stack' : undefined}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
