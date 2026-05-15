import type React from "react";
import { useCallback, useRef } from "react";

interface SwipeBackOptions {
  enabled: boolean;
  onBack: () => void;
}

interface SwipeState {
  id: number;
  startX: number;
  startY: number;
  startedAt: number;
}

export function useSwipeBack({ enabled, onBack }: SwipeBackOptions) {
  const swipe = useRef<SwipeState | null>(null);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (!enabled || event.pointerType === "mouse" || event.clientX > 24) return;

    swipe.current = {
      id: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startedAt: performance.now(),
    };
  }, [enabled]);

  const finishSwipe = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const current = swipe.current;
    if (!current || current.id !== event.pointerId) return;

    const deltaX = event.clientX - current.startX;
    const deltaY = Math.abs(event.clientY - current.startY);
    const elapsedSeconds = Math.max((performance.now() - current.startedAt) / 1000, 0.01);
    const velocity = deltaX / elapsedSeconds;
    swipe.current = null;

    if (deltaX > 80 && deltaY < 80 && velocity > 300) {
      onBack();
    }
  }, [onBack]);

  return {
    onPointerCancel: finishSwipe,
    onPointerUp: finishSwipe,
    onPointerDown,
  };
}
