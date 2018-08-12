import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[displayPassword]'
})
export class DisplayPasswordDirective {
  constructor(private renderer: Renderer2, private el: ElementRef) {
    console.log('directive constructor');
  }

  ngOnInit() {
    // this.renderer.setProperty(this.el.nativeElement, 'type', 'text');
    console.log(this.el.nativeElement.previousElementSibling);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight('text');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('password');
  }

  private highlight(type_: string) {
    let pw_field = this.el.nativeElement.previousElementSibling;
    this.renderer.setAttribute(pw_field, 'type', type_);
    this.renderer.setStyle(pw_field, 'color', type_ === 'text' ? 'gray' : 'black');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
  }
}
