'use client';
import { useEffect, useRef, useState } from 'react';

const LiveStream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });
    pcRef.current = pc;

    pc.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
        setStatus('connected');
      }
    };

    const startStream = async () => {
      try {
        pc.addTransceiver('video', { direction: 'recvonly' });
        
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const response = await fetch('http://localhost:8889/parking/whep', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/sdp',
          },
          body: offer.sdp,
        });

        if (!response.ok) throw new Error('Failed to connect to stream server');

        const answerSdp = await response.text();
        await pc.setRemoteDescription(new RTCSessionDescription({
          type: 'answer',
          sdp: answerSdp,
        }));

      } catch (err) {
        console.error(err);
        setStatus('error');
      }
    };

    startStream();

    return () => {
      pc.close();
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden">
      {status === 'connecting' && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          Connecting to Camera...
        </div>
      )}
      {status === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          Stream Offline
        </div>
      )}
      
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        playsInline 
        controls 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default LiveStream;