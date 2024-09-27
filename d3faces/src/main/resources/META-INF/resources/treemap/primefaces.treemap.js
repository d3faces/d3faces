PrimeFaces.widget.Treemap = PrimeFaces.widget.BaseWidget.extend({
    init: function (cfg) {

        this._super(cfg);

        this.id = cfg.id;
        this.url = cfg.url;
        this.width = cfg.width;
        this.height = cfg.height;

        var that = this;

        var margin = {top: 40, right: 10, bottom: 10, left: 10},
        width = that.width - margin.left - margin.right,
                height = that.height - margin.top - margin.bottom;

        var color = d3.scale.category20c();

        var treemap = d3.layout.treemap()
                .size([width, height])
                .sticky(true)
                .value(function (d) {
                    return d.size;
                });

        var div = d3.select("#" + that.id).append("div")
                .style("position", "relative")
                .style("width", (width + margin.left + margin.right) + "px")
                .style("height", (height + margin.top + margin.bottom) + "px")
                .style("left", margin.left + "px")
                .style("top", margin.top + "px");

        d3.json(that.url, function (error, root) {
            if (error)
                throw error;

            var node = div.datum(root).selectAll(".node")
                    .data(treemap.nodes)
                    .enter().append("div")
                    .attr("class", "node")
                    .call(position)
                    .style("background", function (d) {
                        return d.children ? color(d.name) : null;
                    })
                    .text(function (d) {
                        return d.children ? null : d.name;
                    });

            d3.selectAll("input").on("change", function change() {
                var value = this.value === "count"
                        ? function () {
                            return 1;
                        }
                : function (d) {
                    return d.size;
                };

                node
                        .data(treemap.value(value).nodes)
                        .transition()
                        .duration(1500)
                        .call(position);
            });
        });

        function position() {
            this.style("left", function (d) {
                return d.x + "px";
            })
                    .style("top", function (d) {
                        return d.y + "px";
                    })
                    .style("width", function (d) {
                        return Math.max(0, d.dx - 1) + "px";
                    })
                    .style("height", function (d) {
                        return Math.max(0, d.dy - 1) + "px";
                    });
        }

    }
});
