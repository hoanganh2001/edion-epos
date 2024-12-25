import {
  Injectable,
  ComponentRef,
  ApplicationRef,
  Injector,
  EnvironmentInjector,
  createComponent,
  Type,
} from '@angular/core';
import { CommonModalComponent } from '../components/common-modal/common-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: ComponentRef<CommonModalComponent> | null = null;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private environmentInjector: EnvironmentInjector
  ) {}

  open<T>(
    component: Type<T>,
    size: 'small' | 'medium' | 'large' = 'medium',
    data?: any // Data là optional
  ): void {
    if (this.modalRef) {
      return;
    }

    // Tạo modal component
    this.modalRef = createComponent(CommonModalComponent, {
      environmentInjector: this.environmentInjector,
    });

    // Gắn kích thước modal
    this.modalRef.instance.size = size;

    // Nếu có data thì gắn vào modal
    if (data) {
      this.modalRef.instance.data = data;
    }

    // Gắn modal vào DOM
    this.appRef.attachView(this.modalRef.hostView);
    const domElem = (this.modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    // Tạo content component
    const contentRef = createComponent(component, {
      environmentInjector: this.environmentInjector,
    });

    // Nếu có data và component con có các thuộc tính tương ứng, gán data
    if (data && contentRef.instance) {
      Object.assign(contentRef.instance, data);
    }

    // Gắn content vào modal
    const modalContainer =
      this.modalRef.location.nativeElement.querySelector('.modal-container');
    modalContainer.appendChild((contentRef.hostView as any).rootNodes[0]);

    // Đóng modal khi sự kiện "close" được phát
    this.modalRef.instance.close.subscribe(() => this.close());
  }

  close(): void {
    if (!this.modalRef) return;

    this.appRef.detachView(this.modalRef.hostView);
    this.modalRef.destroy();
    this.modalRef = null;
  }
}
