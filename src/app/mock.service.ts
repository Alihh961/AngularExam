import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {IMock} from "./Interface";

@Injectable({
  providedIn: 'root'
})
export class MockService {

  constructor() {
  }

  private Mock: BehaviorSubject<IMock[] | null> = new BehaviorSubject<IMock[] | null>(null);
  mock$ = this.Mock.asObservable();


  setMock(value: IMock) {
    let currentMock: IMock[] | null = this.Mock.getValue();

    if (currentMock) {
      currentMock.push(value);
      this.Mock.next(currentMock);
    } else {
      currentMock = [value];
      this.Mock.next(currentMock);
    }
  }

}
