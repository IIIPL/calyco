import React, { useMemo, useRef, useState } from 'react';
import SEO from '../components/SEO';
import { getAllColors } from '../data/calycoColors.js';

const flatColors = getAllColors();

const sampleRooms = [
  { key: 'living', base: '/Assets/Rooms/LivingRoom/base.webp', mask: '/Assets/Rooms/LivingRoom/mask-walls.webp' },
  { key: 'dining', base: '/Assets/Rooms/DiningRoom/base.webp', mask: '/Assets/Rooms/DiningRoom/mask-walls.webp' },
  { key: 'bedroom', base: '/Assets/Rooms/Bedroom/base.webp', mask: '/Assets/Rooms/Bedroom/mask-walls.webp' },
];

function hexToRgb(hex) {
  const res = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '#ffffff');
  return res ? { r: parseInt(res[1], 16), g: parseInt(res[2], 16), b: parseInt(res[3], 16) } : { r: 255, g: 255, b: 255 };
}

const VisualizerPage = () => {
  const [room, setRoom] = useState(sampleRooms[0]);
  const [color, setColor] = useState(flatColors?.[0] || null);
  const [upload, setUpload] = useState(null);
  const canvasRef = useRef(null);
  const baseImg = useMemo(() => new Image(), [room, upload]);
  const maskImg = useMemo(() => new Image(), [room]);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const baseSrc = upload || room.base;
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = baseSrc;
    maskImg.crossOrigin = 'anonymous';
    maskImg.src = room.mask;

    baseImg.onload = () => {
      canvas.width = baseImg.width;
      canvas.height = baseImg.height;
      ctx.drawImage(baseImg, 0, 0);
      maskImg.onload = () => {
        ctx.drawImage(maskImg, 0, 0);
        const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = img.data;
        const { r, g, b } = hexToRgb(color?.hex || '#ffffff');
        for (let i = 0; i < data.length; i += 4) {
          const a = data[i + 3];
          if (a > 10) {
            data[i] = r; data[i + 1] = g; data[i + 2] = b; data[i + 3] = 180;
          }
        }
        ctx.putImageData(img, 0, 0);
      };
    };
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUpload(url);
    setTimeout(draw, 50);
  };

  const reset = () => {
    setUpload(null);
    setColor(flatColors?.[0] || null);
    setTimeout(draw, 50);
  };

  React.useEffect(() => { draw(); /* eslint-disable-next-line */ }, [room, color, upload]);

  return (
    <div className="pt-20 px-6 md:px-12 max-w-7xl mx-auto">
      <SEO 
        title="Visualizer — Calyco"
        description="Try colors on sample rooms or your own photo."
        ogType="website"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-[#342347]">Room Visualizer</h1>
      <p className="text-gray-600">Choose a sample room or upload your photo. Client-side, fast.</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {sampleRooms.map(r => (
          <button key={r.key} onClick={() => setRoom(r)} className={`px-3 py-2 rounded-lg border ${room.key === r.key ? 'bg-[#493657] text-white border-[#493657]' : 'bg-white border-gray-300'}`}>{r.key}</button>
        ))}
        <label className="px-3 py-2 rounded-lg border bg-white border-gray-300 cursor-pointer">
          Upload Photo
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        </label>
        <button onClick={reset} className="px-3 py-2 rounded-lg border bg-white border-gray-300">Reset</button>
        <a href={canvasRef.current?.toDataURL('image/png') || '#'} download="calyco-preview.png" className="px-3 py-2 rounded-lg bg-[#F0C85A] text-[#342347] font-semibold">Download Preview</a>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 w-full overflow-auto border rounded-2xl bg-white">
          <canvas ref={canvasRef} className="w-full h-auto" aria-label="Room preview canvas" />
        </div>
        <div className="lg:col-span-1">
          <div className="grid grid-cols-4 gap-2 max-h-[70vh] overflow-y-auto pr-1">
            {flatColors.map(c => (
              <button key={c.slug || c.name} onClick={() => setColor(c)} className="aspect-square rounded-md border border-gray-200" style={{ backgroundColor: c.hex }} aria-label={`${c.name} ${c.hex}`} />
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">Selected: {color?.name || 'None'}</div>
        </div>
      </div>
    </div>
  );
};

export default VisualizerPage;


