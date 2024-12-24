import { debounce } from 'lodash';

/**
 * Debounce a method
 */
export function Debounce(ms: number) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const oldFunc = descriptor.value;
    const newFunc = debounce(oldFunc, ms);
    descriptor.value = function (...args: any[]) {
      return newFunc.apply(this, args);
    };
  };
}
