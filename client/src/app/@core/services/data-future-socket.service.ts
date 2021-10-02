import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Manager, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';

const NAMESPACE = '/data-future';

@Injectable({
  providedIn: 'root',
})
export class DataFutureSocketService {
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

  connectSocket(): any {
    if (!this._socket) {
      const manager = new Manager(this.socketUrl);
      this._socket = manager.socket(NAMESPACE, {});
      return this.initSocket();
    }
    return this._socket;
  }

  private addChartingListeners() {
    if (this._socket) {
      this._socket.on('datafeed', obj => {
        this._chartSubject.next(obj);
      });
    }
  }

  sendToSocket(eventName: string, ...args: any[]) {
    if (this._socket) {
      console.log(eventName);
      if (eventName === 'datafeed') {
        this.isSubscriber = args;
      }
      this._socket.emit(eventName, ...args);
    }
  }

  disconnect() {
    return new Promise(resolve => {
      if (this._socket) {
        this._socket.disconnect();
        resolve(true);
      }
    });
  }
}
