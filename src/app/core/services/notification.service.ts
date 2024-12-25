import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastyService: ToastrService) {}
  toastOptions = {
    closeButton: true,
    timeOut: 2000,
    maxOpened: 1,
    progressBar: true,
    toastClass: 'ngx-toastr mt-16',
  };

  showSuccess(message: string) {
    this.toastyService.clear();
    message && this.toastyService.success(message, '', this.toastOptions);
  }

  showError(message: string) {
    this.toastyService.clear();
    message && this.toastyService.error(message, '', this.toastOptions);
  }

  showWarning(message: string) {
    this.toastyService.clear();
    message && this.toastyService.warning(message, '', this.toastOptions);
  }

  showInfo(message: string) {
    this.toastyService.clear();
    message && this.toastyService.info(message, '', this.toastOptions);
  }
}
