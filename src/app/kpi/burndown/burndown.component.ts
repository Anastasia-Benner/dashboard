import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

export interface burndownData {
  date:string,
  value:number
}

@Component({
  selector: 'app-burndown',
  templateUrl: './burndown.component.html',
  styleUrls: ['./burndown.component.css']
})

export class BurndownComponent implements OnInit, AfterViewInit {

  margin = {top: 10, right: 30, bottom: 30, left: 60}
  width = 440 - this.margin.left - this.margin.right;
  height = 280 - this.margin.top - this.margin.bottom;

  
  @ViewChild("burndown") figureContainer: ElementRef<HTMLElement>;
  //@Input() data: burndownData[];
  data:burndownData[] = [
    {value:30 , date:"1"},
    {value:25 , date:"2"},
    {value:20 , date:"3"},
    {value:15 , date:"4"},
    {value:10 , date:"5"}
  ]
  @Input() storyPoints:number = 30;

  private svg;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.createSvg();
    this.draw();
  }

  createSvg():void {
    this.svg = d3.select(this.figureContainer.nativeElement)
    .append('svg')
    .attr("width", this.width + this.margin.left + this.margin.right)
    .attr("height", this.height + this.margin.top + this.margin.bottom)
    .append("g")
    .attr("transform", "translate("+this.margin.left+","+this.margin.top+")");
  }

  draw() {
    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain([0, this.data.length -1])
      //.domain([0,d3.extent(this.data, d => d.date)])
      .range([ 0, this.width ]);
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, this.storyPoints])
      //.domain([0, d3.max(data, d => d.value;)])
      .range([ this.height, 0 ]);
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    this.svg.append("path")
      .datum(this.data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x((d, i) =>  x(i) )
        .y( (d:any) => y(d.value))
        )
  }
  refresh() {
    this.svg.selectAll('*').remove();
    this.draw();
  }
}
