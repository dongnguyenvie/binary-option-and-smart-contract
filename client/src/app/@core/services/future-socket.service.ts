import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Manager, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';

const NAMESPACE = '/future';

@Injectable({
  providedIn: 'root',
})
export class FutureSocketService {
  private _socketUrl = environment.socketUrl;
  private _isSubscriber: any;
  private _socket!: Socket;

  private _socketSubject = new Subject<void>();
  public $betResultSubject = new Subject<void>();

  get socket() {
    return this._socketSubject;
  }

  get isReady() {
    return !!this._socket;
  }

  constructor() {}

  private initSocket(token: string): Promise<void> {
    return new Promise((resolve: () => void) => {
      this._socket.on('connect', () => {
        this.addListeners();
        this.authConnect(token);
        this._socketSubject.next();
        resolve();
      });
      this._socket.on('disconnect', () => {
        console.info(`disconnect`);
      });
      this._socket.on('reconnect', () => {
        console.info('socket reconnected');
      });
    });
  }

  authConnect(token: string) {
    this._socket.emit('authorization', token);
  }

  connectSocket(token: string): any {
    if (!this._socket) {
      const manager = new Manager(this._socketUrl);
      this._socket = manager.socket(NAMESPACE);
      return this.initSocket(token);
    }
  }

  private addListeners() {
    if (!this.isReady) return;
    this._socket.on('future:auth', payload => {
      console.info('user is verified');
    });

    this._socket.on('future:bet-results', payload => {
      this.$betResultSubject.next(payload);
    });
  }

  sendToSocket(eventName: string, ...args: any[]) {
    if (!this.isReady) return;
    if (eventName === 'datafeed') {
      this._isSubscriber = args;
    }
    this._socket.emit(eventName, ...args);
  }

  disconnect() {
    if (this.isReady && this._socket) {
      this._socket.disconnect();
    }
  }
}
