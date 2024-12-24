import { MetaModel } from './meta-response.model';
import { ResponseCodeEnum } from "../enums/response-code.enums";

export class BaseResponse<T> {
  code: ResponseCodeEnum;
  message: string;
  data: T;
  metadata: unknown;
  meta: MetaModel;
}
