import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  states: any = {};
  constructor() { }

  get(id: string): any {
    return this.states[id];
  }

  set(id: string, data: any) {
    this.states[id] = data;
  }
}
