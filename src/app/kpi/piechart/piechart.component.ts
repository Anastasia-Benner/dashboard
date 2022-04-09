import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

export interface chartSlice {
  x: string,
  y: number,
  color?: string,
  percent?: number,
}

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit, AfterViewInit {

  @ViewChild('piechart') figureContainer: ElementRef<HTMLElement>;

  data: chartSlice[] = [
    {x:"test",y:5, percent:.5, color: 'red'},
    {x:'test2', y:5, color: 'blue'}
  ];
  //@Input() data: chartSlice[];

  @Input() label: string = "chart label";
  @Input() margin = 28;
  @Input() width = 400;
  @Input() height = 300;

  private radius;
  private textRadius:number  = 5;
  private colors;

  private svg;

  constructor() { }

  ngOnInit(): void {
    this.radius = (Math.min(this.width, this.height) / 4) - this.margin;
  }

  ngAfterViewInit(): void {
    //let that = this;
    this.createSvg();
    this.createColors();
    this.draw();
    // this.dataService.piechartData.subscribe(data => { // for use with a data service later
    //   typeWithParameters.data = data;
    //   that.refresh();
    // })
  }

  createSvg() {
    this.svg = d3.select(this.figureContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        "transform",
        "translate("+this.width/4+","+this.height/6+")"
      );
  }

  createColors() {
    this.colors = d3.scaleOrdinal()
      .domain(this.data.map(d => d.y.toString()))
      .range(['#64afe8', '#334355', '#2f5277', '#466688', '#9bb0c6']);
  }

  draw() {
    let total = this.data.reduce((prev,b) => prev + b.y, 0);
    
    const pie = d3.pie<any>().value((d => Number(d.y)));

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(0)
        .outerRadius(this.radius)
        )
      .attr('fill', (d,i) => d.data.color ? d.data.color: this.colors(i));

    const labelLocation = d3.arc()
      .innerRadius(this.textRadius)
      .outerRadius(this.radius);

    this.svg
      .selectAll('pieces')
      .data(pie(this.data))
      .enter()
      .append('text')
      .text(d => d.x)
      .attr('transform', d => "translate("+labelLocation.centroid(d)+")")
      .style("text-anchor", "middle")
      .style("font-size", "9px")
      .style("text-transform", "uppercase")
  }

  refresh() {
    this.svg.selectAll('*').remove();
    this.createColors();
    this.draw();
  }

}
