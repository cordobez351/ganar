
import React, { useMemo } from "react";

export interface GradientConfig {
  from: string;
  via?: string;
  to: string;
  direction?: "diagonal" | "horizontal" | "vertical";
}

export interface DiamondOrbitSmoothLoaderProps {
  /** Size of each dot in pixels. Defaults to 5 */
  dotSize?: number;
  /** Gap between dots in pixels. Defaults to 4 */
  gap?: number;
  /** Duration of one full animation cycle in seconds. Defaults to 1.2 */
  speed?: number;
  /** Color of active dots (e.g. "currentColor", "#3b82f6"). Defaults to "currentColor" */
  color?: string;
  /** Multi-stop gradient color configuration */
  gradient?: GradientConfig;
  /** Enable bloom / glow effect. Defaults to false */
  bloom?: boolean;
  /** Inactive dot opacity (0 - 1). Defaults to 0.08 */
  opacity?: number;
  /** Optional custom class name */
  className?: string;
}

const MATRIX = ["00100","01010","10001","01010","00100"] as const;
const ROWS = MATRIX.length;
const COLS = MATRIX[0]?.length || 5;

const colorCache = new Map<string, [number, number, number] | null>();

function parseColorToRgb(color: string): [number, number, number] | null {
  if (!color || color === "currentColor") return null;
  if (colorCache.has(color)) return colorCache.get(color)!;

  let result: [number, number, number] | null = null;
  if (color.startsWith("#")) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    if (hex.length === 6) {
      const num = parseInt(hex, 16);
      result = [(num >> 16) & 255, (num >> 8) & 255, num & 255];
    }
  } else {
    const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (rgbMatch) {
      result = [
        parseInt(rgbMatch[1], 10),
        parseInt(rgbMatch[2], 10),
        parseInt(rgbMatch[3], 10),
      ];
    }
  }
  colorCache.set(color, result);
  return result;
}

function interpolateColor(
  c1: [number, number, number],
  c2: [number, number, number],
  factor: number
): string {
  const r = Math.round(c1[0] + factor * (c2[0] - c1[0]));
  const g = Math.round(c1[1] + factor * (c2[1] - c1[1]));
  const b = Math.round(c1[2] + factor * (c2[2] - c1[2]));
  return `rgb(${r}, ${g}, ${b})`;
}

function getMultiGradientColor(
  gradient: GradientConfig,
  col: number,
  row: number,
  totalCols: number,
  totalRows: number
): string | undefined {
  const cFrom = parseColorToRgb(gradient.from);
  const cTo = parseColorToRgb(gradient.to);
  const cVia = gradient.via ? parseColorToRgb(gradient.via) : null;

  if (!cFrom || !cTo) return undefined;

  let progress = 0;
  const maxDim = Math.max(1, totalCols - 1);
  const maxRow = Math.max(1, totalRows - 1);

  if (gradient.direction === "horizontal") {
    progress = col / maxDim;
  } else if (gradient.direction === "vertical") {
    progress = row / maxRow;
  } else {
    progress = (col + row) / (maxDim + maxRow);
  }

  progress = Math.max(0, Math.min(1, progress));

  if (!cVia) {
    return interpolateColor(cFrom, cTo, progress);
  }

  if (progress < 0.5) {
    const factor = progress / 0.5;
    return interpolateColor(cFrom, cVia, factor);
  } else {
    const factor = (progress - 0.5) / 0.5;
    return interpolateColor(cVia, cTo, factor);
  }
}

export function DiamondOrbitSmoothLoader({
  dotSize = 5,
  gap = 4,
  speed = 1.2,
  color = "currentColor",
  gradient,
  bloom = false,
  opacity = 0.08,
  className = "",
}: DiamondOrbitSmoothLoaderProps) {
  const dots = useMemo(() => {
    const list: {
      key: string;
      active: boolean;
      delay: number;
      color?: string;
      x: number;
      y: number;
    }[] = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const active = MATRIX[r]?.[c] === "1";
        const delay = (r * COLS + c) * 0.04;

        let dotColor: string | undefined = undefined;
        if (gradient) {
          dotColor = getMultiGradientColor(gradient, c, r, COLS, ROWS);
        } else if (color && color !== "currentColor") {
          dotColor = color;
        }

        list.push({
          key: `${r}-${c}`,
          active,
          delay,
          color: dotColor,
          x: c + 1,
          y: r + 1,
        });
      }
    }
    return list;
  }, [color, gradient]);

  let gradientBackground: string | undefined = undefined;
  if (gradient) {
    const angle =
      gradient.direction === "horizontal"
        ? "to right"
        : gradient.direction === "vertical"
          ? "to bottom"
          : "135deg";
    if (gradient.via) {
      gradientBackground = `linear-gradient(${angle}, ${gradient.from}, ${gradient.via}, ${gradient.to})`;
    } else {
      gradientBackground = `linear-gradient(${angle}, ${gradient.from}, ${gradient.to})`;
    }
  }

  return (
    <div
      className={`atom-loader dot-loader ${bloom ? "has-bloom" : ""} ${className}`}
      data-motion="orbit"
      style={
        {
          "--dot-size": `${dotSize}px`,
          "--gap": `${gap}px`,
          "--cols": COLS,
          "--rows": ROWS,
          "--speed": `${speed}s`,
          "--idle-opacity": opacity,
          "--dot-color": color === "currentColor" ? "currentColor" : color,
          "--dot-bg": gradientBackground || undefined,
        } as React.CSSProperties
      }
      aria-label="Loading: Diamond Orbit Smooth"
      role="status"
    >
      {dots.map((dot) => (
        <span
          key={dot.key}
          className={dot.active ? "active" : ""}
          style={
            {
              "--x": dot.x,
              "--y": dot.y,
              "--delay": `${dot.delay}s`,
              ...(dot.color
                ? {
                    "--dot-color": dot.color,
                    backgroundColor: dot.active ? dot.color : undefined,
                  }
                : {}),
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

export default DiamondOrbitSmoothLoader;
