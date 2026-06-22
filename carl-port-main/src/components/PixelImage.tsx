import { useEffect, useRef } from 'react';
import { Application as PixiApp, Sprite, Assets } from 'pixi.js';

// ============================================
// PIXEL PERFECT IMAGE COMPONENT
// ============================================
interface PixelImageProps {
  src?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const PixelImage = ({ src, width = 64, height = 64, className = '' }: PixelImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<PixiApp | null>(null);

  useEffect(() => {
    if (!src) return; // ✅ GUARD
    let mounted = true;

    const initPixi = async () => {
      try {
        const app = new PixiApp();

        await app.init({
          width,
          height,
          backgroundAlpha: 0,
          resolution: window.devicePixelRatio || 1,
          autoDensity: true,
        });

        if (!mounted || !containerRef.current) {
          app.destroy(true);
          return;
        }

        appRef.current = app;
        containerRef.current.appendChild(app.canvas);

        // Load texture
        const texture = await Assets.load(src);

        if (!mounted) {
          app.destroy(true);
          return;
        }

        // ✅ PIXEL PERFECT - No blur
        texture.source.scaleMode = "nearest";

        const sprite = new Sprite(texture);

        // Scale to fit container while maintaining aspect ratio
        const scale = Math.min(width / texture.width, height / texture.height);
        sprite.scale.set(scale);

        // Center the sprite
        sprite.x = (width - sprite.width) / 2;
        sprite.y = (height - sprite.height) / 2;

        app.stage.addChild(sprite);

      } catch (error) {
        console.error("PixiJS Image loading error:", error);
      }
    };

    initPixi();

    return () => {
      mounted = false;
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, [src, width, height]);

  return <div ref={containerRef} className={className} />;
};