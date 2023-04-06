import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  NgZone
} from "@angular/core";

import cytoscape, { ElementDefinition, Stylesheet } from "cytoscape";

import cola from "cytoscape-cola";
cytoscape.use(cola);

import dagre from "cytoscape-dagre";
cytoscape.use(dagre);

import elk from "cytoscape-elk";
cytoscape.use(elk);

import klay from "cytoscape-klay";
cytoscape.use(klay);

@Component({
  selector: "base-graph",
  templateUrl: "./base-graph.component.html",
  styleUrls: ["./base-graph.component.css"]
})
export class BaseGraphComponent implements OnInit, AfterViewInit {
  @Input() graphData: ElementDefinition[];
  @Input() styles: Stylesheet[];

  @ViewChild("baseGraph", { static: false }) baseGraph?: ElementRef<
    HTMLElement
  >;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      console.log(this.baseGraph.nativeElement);
      // Cytoscape Typings ::  https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/cytoscape/index.d.ts
      // Cytoscape Popper :: https://github.com/cytoscape/cytoscape.js-popper
      var cy = cytoscape({
        container: this.baseGraph.nativeElement,
        elements: this.graphData,
        autoungrabify: true,
        boxSelectionEnabled: false,
        layout: {
          name: "elk", //https://js.cytoscape.org/#layouts
          rankDir: "LR",
          elk: {
            priority: {
              straightness: 100
            }
            // considerModelOrder: "PREFER_EDGES"
            // fixedAlignment: 'LEFTDOWN'
            // 'zoomToFit': true,
            // 'algorithm': 'layered',
            // All options are available at http://www.eclipse.org/elk/reference.html
            // 'org.eclipse.elk.' can be dropped from the Identifier
            // Or look at demo.html for an example.
            // Enums use the name of the enum e.g.
            // 'searchOrder': 'DFS'
          }
        },
        style: this.styles,
        minZoom: 1e-50,
        maxZoom: 1e50
      });

      cy.on("click", "node", function(evt) {
        console.log("clicked " + this.id());
      });
    });
  }
}
