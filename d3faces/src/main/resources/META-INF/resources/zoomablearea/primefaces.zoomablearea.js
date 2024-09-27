PrimeFaces.widget.Zoomablearea = PrimeFaces.widget.BaseWidget.extend({
    init: function (cfg) {

        this._super(cfg);

        this.id = cfg.id;
        this.url = cfg.url;
        this.width = cfg.width;
        this.height = cfg.height;

        var that = this;

        var margin = {top: 20, right: 60, bottom: 30, left: 20},
                width = that.width - margin.left - margin.right,
                height = that.height - margin.top - margin.bottom;

        var parseDate = d3.time.format("%d-%b-%y").parse,
                formatDate = d3.time.format("%Y");

        var x = d3.time.scale()
                .range([0, width]);

        var y = d3.scale.linear()
                .range([height, 0]);

        var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom")
                .tickSize(-height, 0)
                .tickPadding(6);

        var yAxis = d3.svg.axis()
                .scale(y)
                .orient("right")
                .tickSize(-width)
                .tickPadding(6);

        var area = d3.svg.area()
                .interpolate("step-after")
                .x(function (d) {
                    return x(d.date);
                })
                .y0(y(0))
                .y1(function (d) {
                    return y(d.price);
                });

        var line = d3.svg.line()
                .interpolate("step-after")
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.price);
                });

        var svg = d3.select("#" + that.id).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var zoom = d3.behavior.zoom()
                .on("zoom", draw);

        var gradient = svg.append("defs").append("linearGradient")
                .attr("id", "gradient")
                .attr("x2", "0%")
                .attr("y2", "100%");

        gradient.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "#fff")
                .attr("stop-opacity", .5);

        gradient.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "#999")
                .attr("stop-opacity", 1);

        svg.append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("x", x(0))
                .attr("y", y(1))
                .attr("width", x(1) - x(0))
                .attr("height", y(0) - y(1));

        svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + width + ",0)");

        svg.append("path")
                .attr("class", "area")
                .attr("clip-path", "url(#clip)")
                .style("fill", "url(#gradient)");

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")");

        svg.append("path")
                .attr("class", "line")
                .attr("clip-path", "url(#clip)");

        svg.append("rect")
                .attr("class", "pane")
                .attr("width", width)
                .attr("height", height)
                .call(zoom);

        d3.json(that.url, function (error, data) {
            if (error)
                throw error;

            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.price = +d.price;
            });

            x.domain([new Date(2007, 3, 24), new Date(2012, 4, 1)]);
            y.domain([0, d3.max(data, function (d) {
                    return d.price;
                })]);
            zoom.x(x);

            svg.select("path.area").data([data]);
            svg.select("path.line").data([data]);
            draw();
        });

        function draw() {
            svg.select("g.x.axis").call(xAxis);
            svg.select("g.y.axis").call(yAxis);
            svg.select("path.area").attr("d", area);
            svg.select("path.line").attr("d", line);
        }

    }
});
