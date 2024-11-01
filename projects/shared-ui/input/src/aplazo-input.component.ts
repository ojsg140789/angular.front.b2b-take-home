import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

interface InputClassnamesConfig {
  base: string;
  fullWidth: string;
  rounded: string;
}

@Component({
  selector: 'input[aplzInput]',
  standalone: true,
  imports: [NgClass],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      type="text"
      [ngClass]="class"
      [attr.placeholder]="placeholder"
      [disabled]="disabled"
    />
    <ng-content></ng-content>
  `,
  styleUrls: ['./aplazo-input.component.css'],
})
export class AplazoInputComponent {
  readonly #inputClassnames: InputClassnamesConfig = {
    base: 'aplazo-base-input',
    fullWidth: '',
    rounded: '',
  };

  /** Overrides the base Aplazo's input classnames
   *
   * @default null
   */
  @HostBinding('class')
  @Input()
  set class(value: string | null) {
    if (value == null || value === '') {
      this.#class = null;
      return;
    }

    this.#class = value;
  }
  get class(): string | null {
    const classes = new Set<string>([
      ...Object.values(this.#inputClassnames).filter(Boolean),
    ]);
    if (this.#class != null) {
      this.#class.split(' ').forEach((c) => classes.add(c));
    }

    return Array.from(classes).join(' ');
  }
  #class: string | null = null;

  /** Placeholder for the input
   *
   * @default ''
   */
  @Input() placeholder: string = '';

  /** Whether the input should be full width or not
   *
   * When the value is not present, the default value is `false`
   * @default false
   */
  @Input()
  set fullWidth(value: boolean | undefined) {
    if (value == null || value === false) {
      this.#inputClassnames.fullWidth = '';
      return;
    }

    this.#inputClassnames.fullWidth = 'input-full-width';
  }

  /** Whether the input should be rounded or not
   *
   * When the value is not present, the default value is `false`
   * @default false
   */
  @Input()
  public set rounded(value: boolean | undefined) {
    if (value == null || value === false) {
      this.#inputClassnames.rounded = '';
      return;
    }

    this.#inputClassnames.rounded = 'input-rounded';
  }

  /** Whether the input is disabled
   *
   * @default false
   */
  @Input() disabled: boolean = false;
}
