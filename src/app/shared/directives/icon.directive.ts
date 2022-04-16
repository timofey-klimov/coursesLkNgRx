import { Directive, ElementRef, HostListener, Input, Renderer2, ViewContainerRef } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { IIconInput } from "../types/directives/iconInput.interface";

@Directive({
    selector: '[selectIcon]'
})
export class IconDirective {

    @Input() selectIcon: IIconInput;

    htmlElement: any;

    constructor(private element: ElementRef, private renderer: Renderer2, private containerRef: ViewContainerRef) {
        console.log(element);
    }


    @HostListener('mouseenter', ['$event']) onMouseEnter(event: Event) {

       const component = this.containerRef.createComponent(MatIcon);
       component.instance._elementRef.nativeElement.innerHTML= this.selectIcon.iconStyle;
       this.htmlElement = component.location.nativeElement;
       this.htmlElement.style.color = this.selectIcon.baseColor;
       this.renderer.setStyle(this.htmlElement, 'cursor', 'pointer');
       this.renderer.setStyle(this.htmlElement, 'margin-left','.2rem');
       this.renderer.listen(this.htmlElement, 'mouseenter', (e) => {
           this.htmlElement.style.color = this.selectIcon.hoverColor
        })
        this.renderer.listen(this.htmlElement, 'mouseleave', (e) => {
            this.htmlElement.style.color = this.selectIcon.baseColor
        })
        this.renderer.listen(this.htmlElement, 'click', (e) => {
            this.selectIcon.handleClick(this.selectIcon.elementIndex);
        })

       this.renderer.appendChild(this.element.nativeElement, this.htmlElement);
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.renderer.removeChild(this.element.nativeElement, this.htmlElement);
    }
}