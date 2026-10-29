// Audio disabled - no-op fallbacks to prevent runtime errors if imported
export const isPlaying = () => false;
export const unlock = () => {};
export const toggleSound = () => {};
export const sfx = () => {};
export const onSoundChange = () => () => {};
