"use client";

import { useEffect, useState, useRef } from "react";

const DISMISSED_KEY = "install-banner-dismissed";
const DISMISS_DAYS = 7;

export default function InstallBanner() {
  const [show, setShow] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const deferredPrompt = useRef<any>(null);

  useEffect(() => {
    // Already in standalone mode
    if (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone) {
      return;
    }

    // Check dismissed timestamp
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed) {
      const diff = Date.now() - Number(dismissed);
      if (diff < DISMISS_DAYS * 24 * 60 * 60 * 1000) return;
    }

    const ua = navigator.userAgent;
    const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(ios);

    if (ios) {
      setShow(true);
      return;
    }

    // Android / Chrome
    const handler = (e: Event) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setShow(false);
  };

  const install = async () => {
    if (isIOS) {
      setShowIOSGuide(true);
      return;
    }
    const prompt = deferredPrompt.current;
    if (!prompt) return;
    prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === "accepted") {
      setShow(false);
    }
    deferredPrompt.current = null;
  };

  if (!show) return null;

  return (
    <>
      {/* iOS instruction overlay */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-end justify-center p-4" onClick={() => setShowIOSGuide(false)}>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-800 mb-3">ホーム画面に追加</h3>
            <ol className="text-sm text-slate-600 space-y-2">
              <li>1. 画面下の <span className="inline-block px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded text-xs font-medium">共有ボタン ↑</span> をタップ</li>
              <li>2. <span className="font-medium">「ホーム画面に追加」</span> を選択</li>
              <li>3. 右上の <span className="font-medium">「追加」</span> をタップ</li>
            </ol>
            <button onClick={() => setShowIOSGuide(false)} className="mt-4 w-full py-2 bg-blue-700 text-white rounded-lg text-sm font-medium">
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* Banner */}
      <div className="fixed bottom-4 left-4 right-4 z-50 bg-blue-800 text-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 max-w-lg mx-auto">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">アプリとして追加</p>
          <p className="text-xs text-blue-200">ホーム画面からすぐアクセス</p>
        </div>
        <button onClick={install} className="shrink-0 bg-white text-blue-800 text-sm font-bold px-4 py-1.5 rounded-lg">
          追加
        </button>
        <button onClick={dismiss} className="shrink-0 text-blue-300 text-lg leading-none" aria-label="閉じる">
          ✕
        </button>
      </div>
    </>
  );
}
