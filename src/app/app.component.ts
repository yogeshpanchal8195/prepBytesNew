import { Component, ViewChild, OnInit, Output, EventEmitter, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('parent', { static: false }) parent: any;
  @ViewChild('svg', { static: false }) svg: any;
  @ViewChildren('point') points: QueryList<any>;

  width: number = 500
  height: number = 600;
  slides: Array<any> = [
    [{ url: "/assets/img/Untitled-1_03.jpg", type: "img" }, { url: "/assets/img/Untitled-2_03.jpg", type: "img" }, { url: "/assets/img/jack-sparrow.jpg", type: "img" }],
    [{ url: "/assets/img/aventador_lamborghini.jpg", type: "img" },{ url: "/assets/img/Untitled-1_03.jpg", type: "img" }, { url: "/assets/img/Untitled-2_03.jpg", type: "img" }],
    [{ url: "/assets/img/jack-sparrow.jpg", type: "img" }, { url: "/assets/img/aventador_lamborghini.jpg", type: "img" }, { url: "/assets/img/Batman-Movie-Joker.jpg", type: "img" }]
  ];

  constructor(
  ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.svg && this.parent && this.points && this.points.length && this.points["_results"] && this.points["_results"].length) {
      this.width = this.parent.nativeElement.offsetWidth;
      this.height = this.parent.nativeElement.offsetHeight;
      let str = "";
      let svgNode = this.svg.nativeElement
      var child = svgNode.lastElementChild
      while (child) {
        svgNode.removeChild(child);
        child = svgNode.lastElementChild;
      }
      for (let i = 0; i < this.points["_results"].length - 1; i++) {
        let d1 = document.createElementNS("http://www.w3.org/2000/svg", 'path')
        d1.setAttribute("stroke", "black");
        d1.setAttribute("fill", "transparent");
        d1.setAttribute("stroke-dasharray", "5,5");
        let x1 = Math.floor(this.points["_results"][i].nativeElement.children[0].offsetLeft);
        let y1 = Math.floor(this.points["_results"][i].nativeElement.children[0].offsetTop);
        let x2 = Math.floor(this.points["_results"][i + 1].nativeElement.children[0].offsetLeft);
        let y2 = Math.floor(this.points["_results"][i + 1].nativeElement.children[0].offsetTop);
        if (y1 == y2) {
          str = "M " + x1 + ' ' + y1 + ' C' + x1 + ' ' + y1 + ',' + x2 + ' ' + y2 + ',' + x2 + ' ' + y2
        } else {
          str = "M " + x1 + ' ' + y1 + ' C' + this.width + ' ' + y1 + ',' + this.width + ' ' + y2 + ',' + x2 + ' ' + y2
          if (i == this.slides[0].length + this.slides[1].length - 1) {
            str = "M " + x1 + ' ' + y1 + ' C' + 0 + ' ' + y1 + ',' + 0 + ' ' + y2 + ',' + x2 + ' ' + y2
          }
        }
        d1.setAttribute("d", str);
        this.svg.nativeElement.appendChild(d1);
      }
    }
  }


  ngAfterViewInit() {

  }

}
