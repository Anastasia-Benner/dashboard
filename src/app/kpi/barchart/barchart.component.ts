import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';

export interface barData {
  label:string,
  value:number
}

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit, AfterViewInit {

  @ViewChild("bars") figureContainer: ElementRef<HTMLElement>;

  data:barData[];

  data1:barData[] = [
    {label: 'A', value:2},
    {label: 'B', value: 7},
    {label: 'C', value: 4},
    {label: 'D', value:2},
    {label: 'E', value: 7},
    {label: 'F', value: 4}
  ]

  data2:barData[] = [
    {label: 'A', value:5},
    {label: 'B', value: 3},
    {label: 'C', value: 8},
    {label: 'D', value: 1},
    {label: 'E', value: 3},
    {label: 'F', value: 6}
  ]
  margin = 30;
  height = 300;
  width = 600;
  

  private svg;

  constructor() { }

  ngOnInit(): void {
    this.data = this.data1;
  }

  ngAfterViewInit() {
    this.createSvg();
    this.draw();
  }

  toggleData(data) {
    this.data = data;
    this.draw();
  }

  createSvg() {
    this.svg = d3.select(this.figureContainer.nativeElement)
      .append('svg')
      .attr('width', this.width + (2*this.margin))
      .attr('height', this.height + (2*this.margin))
      .append('g')
      .attr('transform', `translate(${this.margin},${this.margin})`);
  }

  draw() {
    //x axis
    let x = d3.scaleBand()
      .range([0, this.width])
      .domain(this.data.map(d => d.label))
      .padding(.2);
    
    this.svg.append('g')
      .attr('transform', 'translate(0,'+this.height+")")
      .call(d3.axisBottom(x));

    // y axis
    let y = d3.scaleLinear()
      .domain([0,10])
      .range([this.height, 0]);
    
      this.svg.append('g')
        .attr('class', 'Yaxis')
        .call(d3.axisLeft(y));

    let u = this.svg.selectAll('rect')
      .data(this.data)
    
    u
      .enter()
      .append('rect')
      .merge(u)
      .transition()
      .duration(1000)
        .attr('x', d => x(d.label))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => this.height - y(d.value))
        .attr('fill', 'green');
  }

  refresh() {
    this.svg.selectAll('*').remove();
    this.draw();
  }
}
