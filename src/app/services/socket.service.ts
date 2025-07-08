import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FancySocketService {
  constructor(private socket: Socket) {}

  subscribeFancy(eventId: string): void {
    this.socket.emit('subscribe', `PRMFancy/Auto/${eventId}`);
  }

  listenFancy(eventId: string): Observable<any> {
    return this.socket.fromEvent(`PRMFancy/Auto/${eventId}`);
  }
}
