
import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { cn } from '../../lib/utils';

const LineChart = ({
  data,
  title,
  description,
  xAxisDataKey,
  lines,
  showGrid = true,
  className,
  height = 300,
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
            <RechartsLineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
              <XAxis 
                dataKey={xAxisDataKey} 
                tick={{ fill: 'hsl(var(--foreground))' }} 
                tickLine={{ stroke: 'hsl(var(--border))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }} 
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--foreground))' }}
                tickLine={{ stroke: 'hsl(var(--border))' }}
                axisLine={{ stroke: 'hsl(var(--border))' }} 
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: 20 }} 
                formatter={(value) => (
                  <span style={{ color: 'hsl(var(--foreground))' }}>
                    {value}
                  </span>
                )}
              />
              {lines.map((line, index) => (
                <Line 
                  key={index}
                  type="monotone" 
                  dataKey={line.dataKey} 
                  name={line.name || line.dataKey}
                  stroke={line.stroke} 
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
