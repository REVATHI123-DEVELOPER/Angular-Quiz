import { Directive,Input,ElementRef,Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input() iscorrect :Boolean=false;
// values will be change using render method
  constructor(private ef:ElementRef,private render:Renderer2) { }

// hostlistener annotation binds the dom event when some one is clicking on the answer part
  @HostListener('click') answer()
  {
    // already we set the boolean value as false then I am telling it is set as true then
    if(this.iscorrect){
      this.render.setStyle(this.ef.nativeElement, 'background','green');
      this.render.setStyle(this.ef.nativeElement, 'color','white');
      this.render.setStyle(this.ef.nativeElement, 'border','2px solid grey');



    }
    else{
      this.render.setStyle(this.ef.nativeElement, 'background','red');
      this.render.setStyle(this.ef.nativeElement, 'color','white');
      this.render.setStyle(this.ef.nativeElement, 'border','2px solid grey');


    }
  }
}
