PrimeFaces.widget.Dendrogram = PrimeFaces.widget.BaseWidget.extend({
    init: function (cfg) {

        this._super(cfg);

        this.id = cfg.id;
        this.url = cfg.url;
        this.width = cfg.width;
        this.height = cfg.height;

        var that = this;

        var width = that.width,
                height = that.height;

        var cluster = d3.layout.cluster()
                .size([height, width - 160]);

        var diagonal = d3.svg.diagonal()
                .projection(function (d) {
                    return [d.y, d.x];
                });

        var svg = d3.select("#" + that.id).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(40,0)");

        d3.json(that.url, function (error, root) {
            if (error)
                throw error;

            var nodes = cluster.nodes(root),
                    links = cluster.links(nodes);

            var link = svg.selectAll(".link")
                    .data(links)
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", diagonal);

            var node = svg.selectAll(".node")
                    .data(nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function (d) {
                        return "translate(" + d.y + "," + d.x + ")";
                    })

            node.append("circle")
                    .attr("r", 4.5);

            node.append("text")
                    .attr("dx", function (d) {
                        return d.children ? -8 : 8;
                    })
                    .attr("dy", 3)
                    .style("text-anchor", function (d) {
                        return d.children ? "end" : "start";
                    })
                    .text(function (d) {
                        return d.name;
                    });
        });

        d3.select(self.frameElement).style("height", height + "px");

    }
});
