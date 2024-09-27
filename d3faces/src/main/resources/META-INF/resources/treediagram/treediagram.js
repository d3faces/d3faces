// https://bl.ocks.org/d3noob/727ed3b5a2020a6d5b0aa5412a719bf5
function TreeDiagram(data, {
  marginTop = 20, // top margin, in pixels
  marginRight = 30, // right margin, in pixels
  marginBottom = 30, // bottom margin, in pixels
  marginLeft = 40, // left margin, in pixels
  width = 640, // outer width, in pixels
  height = 400, // outer height, in pixels
} = {}) {
    // declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    var nodes = d3.hierarchy(data, function (d) {
        return d.children;
    });

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.create("svg")
        .attr("width", width + marginLeft + marginRight)
        .attr("height", height + marginTop + marginBottom);

    const g = svg.append("g")
        .attr("transform", "translate(" + marginLeft + "," + marginTop + ")");

    // adds the links between the nodes
    var link = g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr("d", function (d) {
            return "M" + d.y + "," + d.x
                    + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                    + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                    + " " + d.parent.y + "," + d.parent.x;
        });

    // adds each node as a group
    var node = g.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", function (d) {
            return "node" +
                    (d.children ? " node--internal" : " node--leaf");
        })
        .attr("transform", function (d) {
            return "translate(" + d.y + "," + d.x + ")";
        });

    // adds the circle to the node
    node.append("circle")
        .attr("r", 10);

    // adds the text to the node
    node.append("text")
        .attr("dy", ".35em")
        .attr("x", function (d) {
            return d.children ? -13 : 13;
        })
        .style("text-anchor", function (d) {
            return d.children ? "end" : "start";
        })
        .text(function (d) {
            return d.data.name;
        });
    

  return svg.node();
}