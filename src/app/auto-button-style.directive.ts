import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[autoButtonStyle]'
})
export class AutoButtonStyleDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const button: HTMLButtonElement = this.el.nativeElement;
    const label = button.textContent?.trim().toLowerCase() || '';

    const classMap: { [key: string]: string } = {
      delete: 'btn-danger',
      remove: 'btn-danger',
      cancel: 'btn-secondary',
      edit: 'btn-warning',
      update: 'btn-success',
      save: 'btn-success',
      submit: 'btn-primary',
      view: 'btn-info',
      details: 'btn-info',
      close: 'btn-secondary',
      back: 'btn-secondary'
    };

    // Default to primary
    let foundClass = 'btn-primary';
    for (const key in classMap) {
      if (label.includes(key)) {
        foundClass = classMap[key];
        break;
      }
    }

    // Apply .btn and variant class
    this.renderer.addClass(button, 'btn');
    this.renderer.addClass(button, foundClass);
  }
}
