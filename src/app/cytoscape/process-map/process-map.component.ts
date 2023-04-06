import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import memoize from "lodash/memoize";

const elements = {
  nodes: [
    {
      data: { id: "a" }
    },

    {
      data: { id: "b" }
    }
  ],
  edges: [
    {
      data: { id: "ab", source: "a", target: "b" }
    }
  ]
};

const graphData = [
  {
    data: {
      id: "n0",
      label: "Source",
      type: "source"
    }
  },
  {
    data: {
      id: "n1",
      label: "NW Pipe",
      type: "pipe"
    },
    classes: ["foo", "bar"]
  },
  {
    data: {
      id: "n2",
      label: "C1 Pump",
      type: "antlia"
    }
  },
  {
    data: {
      id: "g1",
      label: "Group 1",
      type: "group",
      // parent: "n2",
      group: "nodes"
    }
  },
  {
    data: {
      id: "g2",
      label: "Group 2",
      type: "group",
      // parent: "n2",
      group: "nodes"
    }
  },
  {
    data: {
      id: "i1",
      label: "Info 1",
      type: "info",
      parent: "g1",
      group: "nodes"
    }
  },
  {
    data: {
      id: "i2",
      label: "Info 2",
      type: "info",
      parent: "g1",
      group: "nodes"
    }
  },
  {
    data: {
      id: "n5",
      label: "SW Pipe",
      type: "pipe"
    }
  },
  {
    data: {
      id: "e0",
      source: "n5",
      target: "n1"
    }
  },
  {
    data: {
      id: "e1",
      source: "n0",
      target: "n2"
    }
  },
  {
    data: {
      id: "e4",
      source: "n2",
      target: "n5"
    }
  },
  {
    data: {
      id: "eg1",
      source: "n2",
      target: "g1",
      type: "info"
    }
  },
  {
    data: {
      id: "eg2",
      source: "n5",
      target: "g2",
      type: "info"
    }
  },
  {
    data: {
      id: "i3",
      label: "Info 3",
      type: "info",
      parent: "g2",
      group: "nodes"
    }
  },
  {
    data: {
      id: "i4",
      label: "Info 4",
      type: "info",
      parent: "g2",
      group: "nodes"
    }
  }
];

// var options = {
//   style: [
//     {
//       selector: 'node',
//       style: {
//         'background-image': function(ele){ return makeSvg(ele).svg; },
//         'width': function(ele){ return makeSvg(ele).width; },
//         'height': function(ele){ return makeSvg(ele).height; }
//       }
//     }
//   ]
// };

@Component({
  selector: "process-map",
  templateUrl: "./process-map.component.html",
  styleUrls: ["./process-map.component.css"]
})
export class ProcessMapComponent implements OnInit {
  data = [];
  styles = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    of(graphData).subscribe(data => {
      //console.log(data);
      this.data = data;
      this.styles = [
        {
          selector: "node",
          style: {
            label: "data(label)",
            "background-image": function(ele) {
              return makeSvg(ele).svg;
            },
            width: function(ele) {
              return makeSvg(ele).width;
            },
            height: function(ele) {
              return makeSvg(ele).height;
            }
          }
        },
        {
          selector: 'node[type="pipe"]',
          style: {
            "background-color": "teal"
          }
        },
        {
          selector: 'node[type="source"]',
          style: {
            shape: "square",
            "background-color": "cyan"
          }
        },
        {
          selector: 'node[type="info"]',
          style: {
            shape: "round-rectangle",
            "background-color": "black",
            "text-valign": "center",
            "text-halign": "center",
            color: "#fff"
          }
        },
        {
          selector: "edge",
          style: {
            "curve-style": "taxi", //https://js.cytoscape.org/demos/edge-types/
            "taxi-direction": "rightward",
            "line-color": "#ccc",
            "target-arrow-shape": "triangle-backcurve"
            // 'width': 4,
            // 'line-color': '#9dbaea',
            // 'target-arrow-color': '#9dbaea'
          }
        },
        {
          selector: 'edge[type="info"]',
          style: {
            "curve-style": "straight", //https://js.cytoscape.org/demos/edge-types/
            "taxi-direction": "rightward",
            "line-color": "#ccc",
            "target-arrow-shape": "none",
            width: 1
            // 'line-color': '#9dbaea',
            // 'target-arrow-color': '#9dbaea'
          }
        },
        {
          selector: ":selected",
          css: {
            // 'background-color': 'SteelBlue',
            "line-color": "black",
            "target-arrow-color": "black",
            "source-arrow-color": "black",
            "border-color": "red",
            "border-width": "2px"
          }
        }
      ];
    });
  }
}

var makeSvg = memoize(function(ele) {
  //console.log(ele.data("type"));
  let svg;

  if (ele.data("type") === "pipe") {
    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 1000 1000"><path d="M94.22 162.17v152.17H10v101.44H61.49l.77 127.67.57 127.86 4.98 20.1C98.43 814.48 185.52 901.57 308.59 932.2l20.1 4.98 127.86.57 127.67.76V990h101.44v-84.22H990V534.46H685.66v-84.22H584.22V500l-41.54-.38-41.73-.57-.57-41.73-.38-41.54h49.76V314.34h-84.22V10H94.22v152.17zm338.79 17.22v134.95H128.67V44.46h304.34v134.93zm80.01 169.4c4.02 0 4.21.77 4.21 16.27v16.27H44.45V347.84l231.98.38c127.68.19 234.1.57 236.59.57zm-47.09 109.67l.57 42.88 5.74 9.38c6.7 10.72 18.18 19.33 28.9 21.82 4.02.96 24.5 1.91 45.36 1.91h37.71v371.51l-121.93-.76c-106.8-.57-124.22-.96-139.34-4.02-103.54-20.28-183.93-90.91-215.13-189.29-12.06-38.28-12.25-38.47-13.02-173.22l-.77-122.88h371.13l.78 42.67zm185.28 260.7v236.39h-32.54V482.77h32.54v236.39zm304.34 0v152.17H685.66V566.99h269.88v152.17z"/></svg>
    `;
  } else if (ele.data("type") === "antlia") {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 512.057 512.057"><path d="M443.769 290.191h-25.6c-23.553-.028-42.639-19.114-42.667-42.667v-17.067c18.851 0 34.133-15.282 34.133-34.133s-15.282-34.133-34.133-34.133v-51.2c-.059-51.817-42.05-93.808-93.867-93.867h-8.752a42.5 42.5 0 10-68.049 50.936v34.397h-8.533c-14.138 0-25.6 11.461-25.6 25.6s11.461 25.6 25.6 25.6v8.533h-59.733c-47.106.054-85.279 38.227-85.333 85.333a8.53 8.53 0 008.534 8.534h51.2a8.53 8.53 0 008.534-8.534c.011-9.421 7.645-17.056 17.067-17.067h59.733v10.106a25.446 25.446 0 000 48.054v138.106c-14.132.015-25.585 11.468-25.6 25.6v10.106a25.558 25.558 0 00-17.067 24.028v17.067a8.53 8.53 0 008.534 8.534h153.6a8.53 8.53 0 008.534-8.534v-17.067a25.559 25.559 0 00-17.067-24.028v-10.106c-.015-14.132-11.468-25.585-25.6-25.6V288.618a25.448 25.448 0 000-48.056v-10.106h42.667v17.067c.059 51.817 42.05 93.808 93.867 93.867h25.6c14.138 0 25.6-11.462 25.6-25.6s-11.463-25.599-25.602-25.599zm-162.996-256h.862c42.396.048 76.752 34.404 76.8 76.8v51.2h-17.067v-51.2c-.038-32.974-26.759-59.695-59.733-59.733h-.862a42.646 42.646 0 000-17.067zm-7.67 34.133h8.533c23.553.028 42.639 19.114 42.667 42.667v51.2h-42.667v-8.533c14.132-.015 25.585-11.468 25.6-25.6-.015-14.132-11.468-25.585-25.6-25.6h-8.533V68.324zm-34.134-51.2c14.138 0 25.6 11.462 25.6 25.6s-11.461 25.6-25.6 25.6-25.6-11.461-25.6-25.6c.016-14.132 11.468-25.585 25.6-25.6zm17.067 64.65v20.683h-34.133V81.774a42.077 42.077 0 0034.133 0zM136.569 213.391c-15.558.019-29.142 10.54-33.05 25.6H68.836c4.342-34.112 33.346-59.69 67.733-59.733h59.733v34.133h-59.733zm170.667 273.066v8.533H170.703v-8.533a8.54 8.54 0 018.533-8.533h119.467a8.542 8.542 0 018.533 8.533zm-17.067-34.133v8.533h-102.4v-8.533a8.54 8.54 0 018.533-8.533h85.333a8.54 8.54 0 018.534 8.533zm-76.8-25.6V290.191h51.2v136.533h-51.2zm59.734-153.6h-68.267c-4.713 0-8.533-3.82-8.533-8.533s3.82-8.533 8.533-8.533h68.267a8.533 8.533 0 010 17.066zm-59.734-34.133v-85.333h51.2v85.333h-51.2zm-17.066-102.4a8.54 8.54 0 01-8.533-8.533 8.54 8.54 0 018.533-8.533h85.333a8.533 8.533 0 010 17.066h-85.333zm85.333 76.8v-34.133h93.867c9.421.011 17.056 7.645 17.067 17.067-.011 9.421-7.645 17.056-17.067 17.067h-93.867zm162.133 110.933h-25.6c-42.396-.048-76.752-34.404-76.8-76.8v-17.067h17.067v17.067c.038 32.974 26.759 59.695 59.733 59.733h25.6c4.713 0 8.533 3.82 8.533 8.533s-3.82 8.534-8.533 8.534z"/><path d="M92.503 276.978a8.856 8.856 0 00-14.266 0c-3.642 5.55-35.533 54.913-35.533 79.088-.614 24.207 18.462 44.353 42.667 45.058 24.204-.706 43.281-20.851 42.667-45.058-.002-24.175-31.894-73.538-35.535-79.088zm-7.134 107.079c-14.778-.706-26.213-13.21-25.6-27.992 0-11.888 13.7-38.529 25.6-58.329 11.9 19.8 25.6 46.442 25.6 58.329.613 14.782-10.822 27.286-25.6 27.992z"/></svg>`;
  } else if (ele.data("type") === "source") {
    svg = `
    <svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 -256 1792 1792"><path d="M1476.339 741.424v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z" fill="currentColor"/></svg>`;
  }

  return {
    svg: "data:image/svg+xml;utf8," + encodeURIComponent(svg),
    width: "60px",
    height: "60px"
  };
});
