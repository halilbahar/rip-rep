import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appSectionHost]'
})
export class SectionHostDirective {

  private lastScrollTop = 0;

  private sectionIndex = 0;

  constructor(private element: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollTop = window.scrollY;
    const sectionHost = this.element.nativeElement as HTMLElement;
    const sections = sectionHost.querySelectorAll('.scroll-section');

    // if (scrollTop > this.lastScrollTop && this.sectionIndex < sections.length - 1) {
    //   this.sectionIndex++;
    //   const element = sections[this.sectionIndex];
    //   element.scrollIntoView();
    // } else if (this.sectionIndex > 0) {
    //   this.sectionIndex--;
    //   const element = sections[this.sectionIndex];
    //   element.scrollIntoView();
    // }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }
}
