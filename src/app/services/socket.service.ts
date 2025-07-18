import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import * as pako from 'pako';
import * as msgpack from 'msgpack-lite';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FancySocketService {
  private socket: Socket | null = null;
  private data$ = new BehaviorSubject<any>(null);
  private currentEventId = '';
  private subscribedEvents: string[] = [];

  connect(eventId: string, eventTypes: string[] = ['Fancy/Auto']) {
    if (this.socket) {
      this.disconnect();
    }

    this.currentEventId = eventId;
    this.data$ = new BehaviorSubject<any>(null);
    this.subscribedEvents = [];

    this.socket = io('https://node8.online', {
      path: '/socket.io',
      transports: ['websocket'],
      forceNew: true
    });

    this.socket.on('connect', () => {
      console.log('🟢 Connected to FancySocket:', this.socket?.id);

      eventTypes.forEach(eventType => {
        const fullEvent = `${eventType}/${eventId}`;
        this.socket?.emit(eventType, eventId);
        this.subscribedEvents.push(fullEvent);


        this.socket?.off(fullEvent);

        this.socket?.on(fullEvent, (data: any) => {
          console.log('📡 Data received from:', fullEvent);

          let decodedData: any = data;

          if (data instanceof ArrayBuffer) {
            decodedData = this.decodeBinary(data);
          }

          this.data$.next({ event: fullEvent, data: decodedData });
        });
      });
    });

    this.socket.onAny((event, ...args) => {
      console.log('📨 onAny:', event, args);
    });
  }

  getData$() {
    return this.data$.asObservable();
  }

  private decodeBinary(buffer: ArrayBuffer) {
    try {
      const inflated = pako.inflate(new Uint8Array(buffer));
      return msgpack.decode(inflated);
    } catch (err) {
      console.error('❌ Binary decode failed:', err);
      return null;
    }
  }

  disconnect() {
    if (this.socket) {
      console.log('🔌 Disconnected FancySocket from:', this.currentEventId);


      this.subscribedEvents.forEach(eventName => {
        this.socket?.off(eventName);
      });

      this.socket.offAny();
      this.socket.disconnect();
      this.socket = null;
      this.currentEventId = '';
      this.subscribedEvents = [];
    }
  }
}
