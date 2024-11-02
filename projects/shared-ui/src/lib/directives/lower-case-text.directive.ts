/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: 'input[aplazoLowercase]',
  host: {
    '(input)': 'sanitizeValue($event)',
  },
})
export class AplazoLowercaseDirective {
  readonly #elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  readonly #ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  sanitizeValue(event: InputEvent): void {
    const input = this.#elementRef.nativeElement;
    
    // TODO: sanitize the value to lowercase
    const sanitizedValue = input.value.toLowerCase();
    input.value = sanitizedValue;
  
    // TODO: propagate the value to the NgControl
    const control = this.#ngControl?.control;
    if (control) {
      control.setValue(sanitizedValue);
    }
  
    // TODO: preserve the cursor position
    input.setSelectionRange(input.selectionStart, input.selectionEnd);
  }
}
