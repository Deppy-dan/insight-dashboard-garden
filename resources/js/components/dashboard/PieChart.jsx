
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { cn } from '../../lib/utils';

const PieChart = ({
  data,
  title,
  description,
  className,
  height = 300,
  innerRadius = 0,
  outerRadius = 80,
  paddingAngle = 2,
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
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                paddingAngle={paddingAngle}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value) => [value, 'Valor']}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: 'hsl(var(--foreground))', marginLeft: 4 }}>
                    {value}
                  </span>
                )}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
