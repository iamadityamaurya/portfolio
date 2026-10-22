import { useEffect, useState } from 'react';
import { isPlaying, onSoundChange, toggleSound } from '../lib/audio';

// Equaliser bars: animate while music plays, freeze flat when muted.
const SoundToggle = () => {
  const [on, setOn] = useState(isPlaying());
  useEffect(() => onSoundChange(setOn), []);

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-8 z-50 flex items-center gap-3 mix-blend-difference text-white cursor-pointer"
      aria-label={on ? 'Mute sound' : 'Turn sound on'}
      aria-pressed={on}
    >
      <span className="flex items-end gap-[3px] h-4">
        {[0, 0.4, 0.8, 1.2, 0.2].map((delay, i) => (
          <span
            key={i}
            className="eq-bar w-[2px] rounded-full bg-current"
            style={{ animationDelay: `${delay}s`, animationPlayState: on ? 'running' : 'paused', height: on ? undefined : '3px' }}
          />
        ))}
      </span>
      <span className="label hidden sm:inline">{on ? 'Sound on' : 'Sound off'}</span>
      <style>{`
        .eq-bar { height: 3px; animation: eq 0.75s linear infinite alternate; }
        @keyframes eq { from { height: 3px; } to { height: 16px; } }
        @media (prefers-reduced-motion: reduce) { .eq-bar { animation: none; height: 8px; } }
      `}</style>
    </button>
  );
};

export default SoundToggle;
