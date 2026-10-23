    /**
     * ============================================================================
     * 1. PROCEDURAL WEB AUDIO ENGINE (细腻纸张摩挲、微动开关、机械轴体与夜雨白噪音)
     * ============================================================================
     */
    const SoundEngine = (() => {
      let ctx = null;
      let rainGain = null;
      let rainActive = false;

      function init() {
        if (!ctx) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          if (AudioCtx) ctx = new AudioCtx();
        }
        if (ctx && ctx.state === 'suspended') ctx.resume().catch(() => {});
      }

      function playPageFlip(subtle = false) {
        try {
          init();
          if (!ctx) return;
          const dur = subtle ? 0.16 : 0.42;
          const len = Math.floor(ctx.sampleRate * dur);
          const buf = ctx.createBuffer(1, len, ctx.sampleRate);
          const data = buf.getChannelData(0);
          for (let i = 0; i < len; i++) {
            const p = i / len;
            data[i] = (Math.random() * 2 - 1) * Math.sin(p * Math.PI) * Math.pow(1 - p, 0.75);
          }
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(subtle ? 1300 : 900, ctx.currentTime);
          filter.frequency.exponentialRampToValueAtTime(1950, ctx.currentTime + dur);
          filter.Q.value = 1.6;
          const gain = ctx.createGain();
          gain.gain.setValueAtTime(subtle ? 0.03 : 0.11, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
          src.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          src.start();
        } catch (e) {}
      }

      function playClick(freq = 720) {
        try {
          init();
          if (!ctx) return;
          const now = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          osc.frequency.exponentialRampToValueAtTime(freq * 0.42, now + 0.05);
          gain.gain.setValueAtTime(0.07, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 0.06);
        } catch (e) {}
      }

      // 细腻客制化机械轴体敲击音效（包含清脆轴心触底瞬态 + PBT 键帽温润 Thock 共鸣 + 回弹微音）
      function playMechKey(pitchScale = 1.0, isStabilized = false) {
        try {
          init();
          if (!ctx) return;
          const now = ctx.currentTime;

          // 1. 轴心触底清脆瞬态 (Short Filtered Noise Burst)
          const clickDur = 0.014;
          const clickLen = Math.floor(ctx.sampleRate * clickDur);
          const clickBuf = ctx.createBuffer(1, clickLen, ctx.sampleRate);
          const clickData = clickBuf.getChannelData(0);
          for (let i = 0; i < clickLen; i++) {
            clickData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / clickLen, 1.8);
          }
          const noiseSrc = ctx.createBufferSource();
          noiseSrc.buffer = clickBuf;
          const bpFilter = ctx.createBiquadFilter();
          bpFilter.type = 'bandpass';
          bpFilter.frequency.setValueAtTime((isStabilized ? 2100 : 2750) * pitchScale, now);
          bpFilter.Q.value = 2.4;
          const clickGain = ctx.createGain();
          clickGain.gain.setValueAtTime(0.055, now);
          clickGain.gain.exponentialRampToValueAtTime(0.001, now + clickDur);
          noiseSrc.connect(bpFilter);
          bpFilter.connect(clickGain);
          clickGain.connect(ctx.destination);
          noiseSrc.start(now);

          // 2. 铝合金定位板与键帽腔体低频共鸣 (Warm Thock Body)
          const bodyOsc = ctx.createOscillator();
          const bodyGain = ctx.createGain();
          bodyOsc.type = 'triangle';
          const baseFreq = (isStabilized ? 235 : 310) * pitchScale;
          bodyOsc.frequency.setValueAtTime(baseFreq, now);
          bodyOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.34, now + 0.046);
          bodyGain.gain.setValueAtTime(isStabilized ? 0.068 : 0.052, now);
          bodyGain.gain.exponentialRampToValueAtTime(0.0008, now + 0.048);
          bodyOsc.connect(bodyGain);
          bodyGain.connect(ctx.destination);
          bodyOsc.start(now);
          bodyOsc.stop(now + 0.05);

          // 3. 极轻微的轴体回弹顶盖声 (Upstroke Top-out Tick)
          const upOsc = ctx.createOscillator();
          const upGain = ctx.createGain();
          upOsc.type = 'sine';
          upOsc.frequency.setValueAtTime(1150 * pitchScale, now + 0.062);
          upOsc.frequency.exponentialRampToValueAtTime(520 * pitchScale, now + 0.082);
          upGain.gain.setValueAtTime(0.015, now + 0.062);
          upGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.084);
          upOsc.connect(upGain);
          upGain.connect(ctx.destination);
          upOsc.start(now + 0.062);
          upOsc.stop(now + 0.086);
        } catch (e) {}
      }

      function toggleRain() {
        init();
        if (!ctx) return false;
        if (!rainGain) {
          const bufferSize = ctx.sampleRate * 3;
          const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
          const output = buffer.getChannelData(0);
          let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
          for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.025;
            b6 = white * 0.115926;
          }
          const src = ctx.createBufferSource();
          src.buffer = buffer;
          src.loop = true;
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 980;
          rainGain = ctx.createGain();
          rainGain.gain.value = 0;
          src.connect(filter);
          filter.connect(rainGain);
          rainGain.connect(ctx.destination);
          src.start(0);
        }
        rainActive = !rainActive;
        rainGain.gain.setTargetAtTime(rainActive ? 0.25 : 0.0, ctx.currentTime, 0.35);
        return rainActive;
      }

      return { playPageFlip, playClick, playMechKey, toggleRain };
    })();
