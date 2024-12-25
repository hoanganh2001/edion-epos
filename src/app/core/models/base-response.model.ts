import { ResponseCodeEnum } from '../enums/response-code.enums';
import { MetaModel } from './meta-response.model';

export class BaseResponse<T> {
  code?: ResponseCodeEnum;
  message?: string;
  data?: T;
  metadata?: unknown;
  meta?: MetaModel;
}
