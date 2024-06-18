export const loadVoices = () => {
  return new Promise((resolve) => {
      let voices = window.speechSynthesis.getVoices();
      if (voices.length) {
          resolve(voices);
      } else {
          window.speechSynthesis.onvoiceschanged = () => {
              voices = window.speechSynthesis.getVoices();
              resolve(voices);
          };
      }
  });
};

export const speak = async (text, options = {}) => {
  const synth = window.speechSynthesis;

  // 현재 진행 중인 음성 취소
  if (synth.speaking) {
      synth.cancel();
  }

  const utter = new SpeechSynthesisUtterance(text);

  const defaultOptions = {
      rate: 1.7, 
      pitch: 1, 
      volume: 1, 
      lang: 'ko-KR'
  };

  const { rate, pitch, volume, lang } = { ...defaultOptions, ...options };

  utter.rate = rate;
  utter.pitch = pitch;
  utter.volume = volume;

  const voices = await loadVoices();
  utter.voice = voices.find(voice => voice.lang === lang);

  if (!utter.voice) {
      console.error('No voice found for the specified language:', lang);
  }

  synth.speak(utter);
};

