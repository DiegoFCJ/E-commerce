import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReviewDTO } from '../models/review.model';
import { AbstractService } from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends AbstractService<ReviewDTO>{
  
  constructor(http: HttpClient) {
    super(http);
    this.type = 'review/';
    this.baseUrl += this.type;
  }
}
