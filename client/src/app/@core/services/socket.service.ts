import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Manager, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socketUrl = environment.socketUrl;
  private isSubscriber: any = null;
  private _socket!: Socket;

  private _chartSubject = new Subject<{
    tick: any;
    listenerGuid: string;
  }>();

  private _socketSubject = new Subject<void>();

  get socket() {
    return this._socketSubject;
  }

  get chart() {
    return this._chartSubject;
  }

  get isSocketReady() {
    return !!this._socket;
  }

  constructor() {}

  private initSocket(): Promise<void> {
    console.log('call init socket');
    return new Promise((resolve: () => void) => {
      this._socket.on('connect', () => {
        console.log(`Socket Connected ${this._socket.id}`);
        this.addChartingListeners();
        this._socketSubject.next();
        resolve();
      });
      this._socket.on('disconnect', () => {
        console.log(`disconnect`);
      });
      this._socket.on('reconnect', () => {
        console.log('socket reconnected');
      });
    });
  }

  connectSocketWithToken(token: string, userId?: string): any {
    console.log('[connectSocketWithToken] method call=> userId', userId);
    console.log('token:' + token);
    console.log(this.socketUrl);
    if (!this._socket) {
      const manager = new Manager(this.socketUrl);
      this._socket = manager.socket('/data-future', {
        auth: {
          authorization: `Bearer ${token}`,
          userId,
        },
      });
      console.log(this._socket);
      return this.initSocket();
    }
    console.log('[connectSocketWithToken] socket existed', this._socket);
    console.log(' User register => userId: ' + userId);
    if (userId !== undefined) {
      this._socket.disconnect();
      this._socket = null as any;
      const manager = new Manager(this.socketUrl);
      this._socket = manager.socket('/data-future', {
        auth: {
          authorization: `Bearer ${token}`,
          userId,
        },
      });
      console.log(this._socket);
      return this.initSocket();
    }
    console.log('[connectSocketWithToken] socket existed', this._socket);
  }

  private addChartingListeners() {
    if (this._socket) {
      this._socket.on('tick', (obj) => {
        this._chartSubject.next(obj);
      });
    }
  }

  sendToSocket(eventName: string, ...args: any[]) {
    // console.log(this._socket);
    if (this._socket) {
      console.log(eventName);
      if (eventName === 'tick') {
        this.isSubscriber = args;
      }
      this._socket.emit(eventName, ...args);
    }
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this._socket) {
        this._socket.disconnect();
        resolve(true);
      }
    });
  }
}
