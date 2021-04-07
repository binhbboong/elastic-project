import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserInfo } from '../interfaces/userInfo';

@Injectable({
  providedIn: 'root'
})

export class SubjectService {
  user = new BehaviorSubject<UserInfo>(null);
  constructor() { }
}