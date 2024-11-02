/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef, inject } from '@angular/core';
import { NgControl } from '@angular/forms';
@Directive({
  standalone: true,
  selector: 'input[aplazoNoWhiteSpace]',
  host: {
    '(input)': 'sanitizeValue()',
  },
})
export class AplazoNoWhiteSpaceDirective {
  readonly #elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);
  readonly #ngControl = inject(NgControl, {
    self: true,
    optional: true,
  });

  sanitizeValue(): void {
    const inputElement = this.#elementRef.nativeElement;
    const originalValue = inputElement.value;
    // TODO: sanitize the value to remove white spaces
    const sanitizedValue = originalValue.replace(/\s+/g, '');
  
    if (sanitizedValue !== originalValue) {
      const cursorPosition = (inputElement.selectionStart ?? sanitizedValue.length) - (originalValue.length - sanitizedValue.length);
      inputElement.value = sanitizedValue;
      // TODO: propagate the value to the NgControl
      this.#ngControl?.control?.setValue(sanitizedValue, { emitEvent: false });
      // TODO: preserve the cursor position
      inputElement.setSelectionRange(cursorPosition, cursorPosition);
    }
  }
}
