import { Component, ElementRef, ViewChild, OnDestroy, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

@Component({
  selector: 'app-camera-drawing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera-drawing.component.html',
  styleUrls: ['./camera-drawing.component.scss']
})
export class CameraDrawingComponent implements OnInit, OnDestroy {
  @ViewChild('webcam') webcamRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('drawCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private handLandmarker!: HandLandmarker;
  private animationFrameId: number | null = null;
  private lastVideoTime = -1;
  private ctx!: CanvasRenderingContext2D;

  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;
  private smoothX = 0;
  private smoothY = 0;

  // Gesture State
  private wristHistory: {x: number, y: number, time: number}[] = [];
  private gestureCooldown = 0;

  isActive = false;
  isLoading = false;
  gestureEnabled = false; // Disabled by default to prevent accidental scrolls

  // Game Mode State
  isGameMode = false;
  private gameState = {
    ballX: 100,
    ballY: 100,
    dx: 8,
    dy: 8,
    score: 0,
    paddleWidth: 200,
    paddleHeight: 20
  };

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.initHandLandmarker();
  }

  ngOnDestroy() {
    this.stopCamera();
    if (this.handLandmarker) {
      this.handLandmarker.close();
    }
  }

  private async initHandLandmarker() {
    this.isLoading = true;
    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 1
      });
    } catch (error) {
      console.error("Error initializing HandLandmarker:", error);
    } finally {
      this.isLoading = false;
    }
  }

  async startCamera() {
    if (!this.handLandmarker) {
      alert("Hand Tracking model is not loaded yet.");
      return;
    }

    this.isActive = true;
    const video = this.webcamRef.nativeElement;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      video.srcObject = stream;
      video.addEventListener('loadeddata', () => {
        const canvas = this.canvasRef.nativeElement;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        this.ctx = canvas.getContext('2d')!;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 6;
        this.ctx.strokeStyle = '#FF7955'; // Primary portfolio color

        this.ngZone.runOutsideAngular(() => {
          this.predictWebcam();
        });
      });
    } catch (error) {
      console.error("Camera access denied", error);
      this.isActive = false;
    }
  }

  stopCamera() {
    this.isActive = false;
    this.isGameMode = false;
    if (this.webcamRef?.nativeElement) {
      const video = this.webcamRef.nativeElement;
      if (video.srcObject) {
        const stream = video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
    }
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  clearCanvas() {
    if (this.ctx && this.canvasRef) {
      const canvas = this.canvasRef.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }


  toggleGestureNav() {
    this.gestureEnabled = !this.gestureEnabled;
    this.wristHistory = [];
  }

  toggleGameMode() {
    this.isGameMode = !this.isGameMode;
    if (this.isGameMode) {
      const canvas = this.canvasRef.nativeElement;
      this.gameState = {
        ballX: canvas.width / 2,
        ballY: 100,
        dx: 8,
        dy: 8,
        score: 0,
        paddleWidth: 200,
        paddleHeight: 20
      };
      this.clearCanvas();
    } else {
      this.clearCanvas();
    }
  }

  private drawGameFrame(canvas: HTMLCanvasElement, paddleX: number) {
    // Clear canvas with slight trailing background effect
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update ball
    this.gameState.ballX += this.gameState.dx;
    this.gameState.ballY += this.gameState.dy;

    // Left/Right Walls
    if (this.gameState.ballX <= 15 || this.gameState.ballX >= canvas.width - 15) {
      this.gameState.dx *= -1;
    }
    // Top Wall
    if (this.gameState.ballY <= 15) {
      this.gameState.dy *= -1;
    }

    // Paddle Hit detection
    // Remember the canvas is flipped horizontally via CSS (-scale-x-100)
    // paddleX is the raw smoothX mapped directly.
    const pY = canvas.height - 60;
    if (this.gameState.ballY >= pY - 15 && this.gameState.ballY <= pY + 15) {
      if (this.gameState.ballX >= paddleX - this.gameState.paddleWidth / 2 && 
          this.gameState.ballX <= paddleX + this.gameState.paddleWidth / 2) {
        // Hit
        this.gameState.dy *= -1;
        // Increase speed slightly
        this.gameState.dy *= 1.05;
        this.gameState.dx *= 1.05;
        this.gameState.score++;
        this.gameState.ballY = pY - 16; // Prevent double-hit sticking
      }
    }

    // Bottom Wall (Game Over)
    if (this.gameState.ballY >= canvas.height) {
      this.gameState.score = 0;
      this.gameState.ballX = canvas.width / 2;
      this.gameState.ballY = 100;
      this.gameState.dx = 8;
      this.gameState.dy = 8;
    }

    // Draw Paddle
    this.ctx.fillStyle = '#FF7955';
    this.ctx.fillRect(paddleX - this.gameState.paddleWidth / 2, pY, this.gameState.paddleWidth, this.gameState.paddleHeight);

    // Draw Ball
    this.ctx.beginPath();
    this.ctx.arc(this.gameState.ballX, this.gameState.ballY, 15, 0, Math.PI * 2);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fill();
    this.ctx.closePath();

    // Draw Score
    this.ctx.font = 'bold 48px monospace';
    this.ctx.fillStyle = '#FF7955';
    // Must mirror text horizontally since canvas scaleX is naturally mirrored by CSS if drawn straight
    // Wait, the canvas CSS has -scale-x-100. So we need to draw text mirrored so it appears normal!
    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.fillText(`SCORE: ${this.gameState.score}`, -canvas.width + 40, 60);
    this.ctx.restore();
  }

  private predictWebcam = () => {
    if (!this.isActive) return;

    const video = this.webcamRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;

    if (video && video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = video.currentTime;
      const results = this.handLandmarker.detectForVideo(video, performance.now());

      let handDetected = false;

      if (results.landmarks && results.landmarks.length > 0) {
        handDetected = true;
        const landmarks = results.landmarks[0];
        const indexTip = landmarks[8];
        const thumbTip = landmarks[4];
        
        const distance = Math.hypot(indexTip.x - thumbTip.x, indexTip.y - thumbTip.y, indexTip.z - thumbTip.z);
        const rawX = indexTip.x * canvas.width;
        const rawY = indexTip.y * canvas.height;

        if (!this.isDrawing && !this.isGameMode) {
          this.smoothX = rawX;
          this.smoothY = rawY;
        } else {
          this.smoothX += (rawX - this.smoothX) * 0.4;
          this.smoothY += (rawY - this.smoothY) * 0.4;
        }

        const isPinching = distance < 0.08; 
        const wrist = landmarks[0];
        const isExtended = (tipIdx: number, pipIdx: number) => {
          const tip = landmarks[tipIdx];
          const pip = landmarks[pipIdx];
          const distTip = Math.hypot(tip.x - wrist.x, tip.y - wrist.y, tip.z - wrist.z);
          const distPip = Math.hypot(pip.x - wrist.x, pip.y - wrist.y, pip.z - wrist.z);
          return distTip > distPip * 1.15;
        };
        const isOpen = isExtended(4, 2) && isExtended(8, 6) && isExtended(12, 10) && isExtended(16, 14) && isExtended(20, 18);

        // Process only if NOT in game mode
        if (!this.isGameMode) {
          const now = performance.now();
          this.wristHistory.push({ x: wrist.x, y: wrist.y, time: now });
          this.wristHistory = this.wristHistory.filter(h => now - h.time < 300);

          let didSwipe = false;
          if (this.gestureCooldown > 0) {
            this.gestureCooldown--;
          } else if (this.gestureEnabled && isOpen && this.wristHistory.length > 3) {
            const oldest = this.wristHistory[0];
            const dx = wrist.x - oldest.x;
            const dy = wrist.y - oldest.y;
            
            const SWIPE_THRESHOLD = 0.45; // Much more deliberate
            if (Math.abs(dy) > SWIPE_THRESHOLD) {
              if (dy > 0) {
                // Hand moved DOWN -> Scroll UP
                window.scrollBy({ top: -800, behavior: 'smooth' });
              } else {
                // Hand moved UP -> Scroll DOWN
                window.scrollBy({ top: 800, behavior: 'smooth' });
              }
              this.gestureCooldown = 45; // Longer cooldown
              this.wristHistory = [];
              didSwipe = true;
            }
          }

          if (isOpen && !didSwipe) {
            if (!this.isDrawing) {
              this.isDrawing = true;
              this.lastX = this.smoothX;
              this.lastY = this.smoothY;
            }
            this.ctx.globalCompositeOperation = 'destination-out';
            this.ctx.lineWidth = 50;
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(this.smoothX, this.smoothY);
            this.ctx.stroke();
            this.ctx.globalCompositeOperation = 'source-over';
            this.ctx.lineWidth = 6;
            this.lastX = this.smoothX;
            this.lastY = this.smoothY;
          } else if (isPinching) {
            if (!this.isDrawing) {
              this.isDrawing = true;
              this.lastX = this.smoothX;
              this.lastY = this.smoothY;
            }
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(this.smoothX, this.smoothY);
            this.ctx.stroke();
            this.lastX = this.smoothX;
            this.lastY = this.smoothY;
          } else {
            this.isDrawing = false;
            this.wristHistory = [];
          }
        }
      } else {
        if (!this.isGameMode) {
          this.isDrawing = false;
          this.wristHistory = [];
        }
      }

      // Loop game mechanics if game mode is active, even if hand is lost briefly
      if (this.isGameMode) {
        this.drawGameFrame(canvas, this.smoothX);
      }
    }

    this.animationFrameId = requestAnimationFrame(this.predictWebcam);
  }
}
