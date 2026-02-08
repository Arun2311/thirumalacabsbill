import React, { useEffect, useMemo, useRef, useState } from "react";

export default function SignaturePad({ value, onChange }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasInk, setHasInk] = useState(Boolean(value));
  const size = useMemo(() => ({ w: 320, h: 140 }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;

    // visually size
    canvas.style.width = `${size.w}px`;
    canvas.style.height = `${size.h}px`;

    // internal pixels
    canvas.width = Math.floor(size.w * dpr);
    canvas.height = Math.floor(size.h * dpr);

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#111";

    // load from base64 if exists
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, size.w, size.h);
        ctx.drawImage(img, 0, 0, size.w, size.h);
        setHasInk(true);
      };
      img.src = value;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // when value changes externally (reset)
  useEffect(() => {
    if (!canvasRef.current) return;
    if (!value) {
      clearCanvas(false);
      setHasInk(false);
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, size.w, size.h);
      ctx.drawImage(img, 0, 0, size.w, size.h);
      setHasInk(true);
    };
    img.src = value;
  }, [value, size.w, size.h]);

  const getPoint = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    if (e.touches?.[0]) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const start = (e) => {
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const p = getPoint(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    setIsDrawing(true);
  };

  const move = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext("2d");
    const p = getPoint(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    setHasInk(true);
  };

  const end = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = (alsoClearState = true) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size.w, size.h);
    if (alsoClearState) {
      onChange?.("");
      setHasInk(false);
    }
  };

  const save = () => {
    const png = canvasRef.current.toDataURL("image/png");
    onChange?.(png);
  };

  return (
    <div className="sig-wrap">
      <canvas
        ref={canvasRef}
        className="sig-canvas"
        style={{ touchAction: "none" }}
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={end}
        onMouseLeave={end}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
      />
      <div className="sig-actions no-print">
        <button type="button" className="btn" onClick={() => clearCanvas(true)}>
          Clear
        </button>
        <button type="button" className="btn primary" onClick={save} disabled={!hasInk}>
          Save Signature
        </button>
      </div>

      {value ? (
        <div className="sig-preview">
          <div className="label">Signature Preview</div>
          <img src={value} alt="signature" />
        </div>
      ) : null}
    </div>
  );
}
