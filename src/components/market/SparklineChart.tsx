// Using pure SVG — more performant than mounting 20 Recharts instances in the table.

interface SparklineChartProps {
  prices: number[];
  /** positive = green, negative = red */
  isPositive: boolean;
  width?: number;
  height?: number;
}

export function SparklineChart({
  prices,
  isPositive,
  width = 80,
  height = 32,
}: SparklineChartProps) {
  if (!prices || prices.length < 2) return null;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;

  // Normalize prices to SVG coordinate space
  const points = prices.map((price, i) => {
    const x = (i / (prices.length - 1)) * width;
    const y = height - ((price - min) / range) * height;
    return `${x},${y}`;
  });

  const polyline = points.join(" ");

  // Gradient fill beneath the line
  const areaPoints = [`0,${height}`, ...points, `${width},${height}`].join(" ");

  const color = isPositive ? "#10b981" : "#ef4444";

  // eslint-disable-next-line react-hooks/purity
  const gradientId = `spark-${isPositive ? "pos" : "neg"}-${Math.random().toString(36).slice(2, 6)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.25} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${gradientId})`} />
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
