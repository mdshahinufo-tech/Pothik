export interface PlaybackState {
  isPlaying: boolean;
  isLoading: boolean;
  currentAudioUrl: string | null;
  error: string | null;
  source: 'gemini-3.8-flash-tts' | 'fallback' | null;
}

class TTSService {
  private activeAudio: HTMLAudioElement | null = null;
  private audioCache = new Map<string, string>(); // prompt hash -> blob URL

  public async generateAndPlaySpeech(
    text: string,
    voice: 'Kore' | 'Puck' | 'Fenrir' | 'Zephyr' | 'Charon' = 'Kore',
    style: string = 'Enthusiastic, clear Bengali travel host',
    onStateChange?: (state: PlaybackState) => void
  ): Promise<void> {
    this.stopAudio();

    onStateChange?.({
      isPlaying: false,
      isLoading: true,
      currentAudioUrl: null,
      error: null,
      source: null,
    });

    const cacheKey = `${text}_${voice}_${style}`;
    if (this.audioCache.has(cacheKey)) {
      const cachedUrl = this.audioCache.get(cacheKey)!;
      this.playAudioUrl(cachedUrl, 'gemini-3.8-flash-tts', onStateChange);
      return;
    }

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice, style }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status} failed to generate TTS`);
      }

      const data = await response.json();
      if (!data.audioBase64) {
        throw new Error('No audio returned in response payload');
      }

      // Convert base64 to Blob URL
      const byteCharacters = atob(data.audioBase64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: data.mimeType || 'audio/wav' });
      const audioUrl = URL.createObjectURL(blob);

      this.audioCache.set(cacheKey, audioUrl);
      this.playAudioUrl(audioUrl, 'gemini-3.8-flash-tts', onStateChange);
    } catch (err: any) {
      console.warn('Gemini 3.8 Flash TTS call issue, attempting client speech fallback:', err);
      // Attempt browser speech synthesis fallback
      this.playSpeechSynthesisFallback(text, onStateChange, err.message);
    }
  }

  private playAudioUrl(
    url: string,
    source: 'gemini-3.8-flash-tts' | 'fallback',
    onStateChange?: (state: PlaybackState) => void
  ) {
    this.activeAudio = new Audio(url);

    this.activeAudio.onplay = () => {
      onStateChange?.({
        isPlaying: true,
        isLoading: false,
        currentAudioUrl: url,
        error: null,
        source: source,
      });
    };

    this.activeAudio.onended = () => {
      onStateChange?.({
        isPlaying: false,
        isLoading: false,
        currentAudioUrl: url,
        error: null,
        source: source,
      });
    };

    this.activeAudio.onerror = (e) => {
      console.error('Audio playback error', e);
      onStateChange?.({
        isPlaying: false,
        isLoading: false,
        currentAudioUrl: null,
        error: 'Failed to play audio stream',
        source: source,
      });
    };

    this.activeAudio.play().catch((e) => {
      console.warn('Autoplay prevented or playback issue:', e);
      onStateChange?.({
        isPlaying: false,
        isLoading: false,
        currentAudioUrl: url,
        error: 'Playback requires user click interaction',
        source: source,
      });
    });
  }

  private playSpeechSynthesisFallback(
    text: string,
    onStateChange?: (state: PlaybackState) => void,
    originalError?: string
  ) {
    if (!('speechSynthesis' in window)) {
      onStateChange?.({
        isPlaying: false,
        isLoading: false,
        currentAudioUrl: null,
        error: originalError || 'Text-to-speech not supported in browser environment',
        source: null,
      });
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    // Find Bengali voice if available, else standard
    const voices = window.speechSynthesis.getVoices();
    const bnVoice = voices.find((v) => v.lang.includes('bn') || v.lang.includes('Bengali'));
    if (bnVoice) {
      utterance.voice = bnVoice;
    }
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      onStateChange?.({
        isPlaying: true,
        isLoading: false,
        currentAudioUrl: null,
        error: null,
        source: 'fallback',
      });
    };

    utterance.onend = () => {
      onStateChange?.({
        isPlaying: false,
        isLoading: false,
        currentAudioUrl: null,
        error: null,
        source: 'fallback',
      });
    };

    utterance.onerror = () => {
      onStateChange?.({
        isPlaying: false,
        isLoading: false,
        currentAudioUrl: null,
        error: originalError || 'Speech synthesis error',
        source: 'fallback',
      });
    };

    window.speechSynthesis.speak(utterance);
  }

  public stopAudio() {
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio.currentTime = 0;
      this.activeAudio = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  public downloadCurrentAudio(url: string, filename = 'tripbooking-stmartin-announcement.wav') {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

export const ttsService = new TTSService();
