import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CustomerModel, Result } from '../models/customerModel';
import { Observable } from 'rxjs';
import { CustomerCreateRequest } from '../models/customerCreateRequest';
import { CustomerUpdateRequest } from '../models/customerUpdateRequest';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly baseUrl = 'api/Customer';
  private readonly url: string = environment.API_BASE + this.baseUrl;

  constructor(private httpClient: HttpClient) {}

  get(id: number): Observable<Result<CustomerModel>> {
    return this.httpClient.get<Result<CustomerModel>>(`${this.url}/${id}`);
  }

  getAll(): Observable<Result<CustomerModel[]>> {
    return this.httpClient.get<Result<CustomerModel[]>>(`${this.url}`);
  }

  create(createRequest: CustomerCreateRequest): Observable<Result<number>> {
    return this.httpClient.post<Result<number>>(`${this.url}`, createRequest, {
      params: {},
    });
  }

  delete(id: number): Observable<Result<number>> {
    return this.httpClient.delete<Result<number>>(`${this.url}/${id}`);
  }

  update(
    id: number,
    updateRequest: CustomerUpdateRequest
  ): Observable<Result<number>> {
    return this.httpClient.put<Result<number>>(
      `${this.url}/${id}`,
      updateRequest,
      {
        params: {},
      }
    );
  }
}
