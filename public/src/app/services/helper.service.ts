import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})

export class HelperService {
  constructor(private toastrService: NbToastrService) { }

  showSuccess(title, content) {
    this.toastrService.show(title, content, { 
      status: 'success' 
    })
  }

  showError(content, title = '') {
    this.toastrService.show(title, content, { 
      status: 'danger' 
    })
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  markFormGroupTouched(formGroup) {
    (Object as any).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    })
  }
}