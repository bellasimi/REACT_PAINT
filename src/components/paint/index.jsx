import React from "react";
import { useEffect, useCallback, useRef } from "react";

const calculateCoord = (e, canvas) => {
  const rect = canvas.getBoundingClientReact();

  return {
    x: e.pageX - rect.left - window.scrollX,
    y: e.pageY - rect.top - window.scrollY,
  };
};

const Paint = ({
  command = "pen",
  color = "black",
  lineWidth = 2,
  width = 800,
  height = 600,
  style,
  className,
}) => {
  const canvasRef = useRef();
  const scale = typeof window === "undefined" ? 1 : window.devicePixelRatio;

  const canvasDefaultStyle = {
    useSelect: "none",
    WebKitUserSelect: "none",
  };

  const canvasDefaultSize = {
    width,
    height,
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.width = width * scale;
    canvasRef.current.height = height * scale;

    canvasRef.current.getContext("2d").scale(scale, scale);
  }, [canvasRef.current, scale]);

  const handleDrawStart = useCallback(
    (e) => {
      e.preventDefault();
      const { x, y } = calculateCoord(e, canvasRef.current);
    },
    [canvasRef]
  );

  const handleDrawing = () => {};

  const handleDrawEnd = () => {};

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleDrawStart}
      onMouseMove={handleDrawing}
      onMouseUp={handleDrawEnd}
      style={{ ...canvasDefaultStyle, ...canvasDefaultSize, ...style }}
      className={className}
    />
  );
};

export default Paint;
