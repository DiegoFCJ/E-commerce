import { Observable } from 'rxjs';
import { GenMsgResponse } from '../models/util-DTOs/generic.model';

export interface Service<DTO> {

    getAll(): Observable<any>;

    create(dto: DTO): Observable<GenMsgResponse>;

    read(id: number): Observable<any>;

    update(dto: DTO): Observable<GenMsgResponse>;

    delete(id: number): Observable<GenMsgResponse>;
}