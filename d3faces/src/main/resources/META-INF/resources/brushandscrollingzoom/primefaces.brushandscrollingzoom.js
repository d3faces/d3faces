PrimeFaces.widget.Brushandscrollingzoom = PrimeFaces.widget.BaseWidget.extend({
    
    init: function (cfg) {

        this._super(cfg);

        this.id = cfg.id;
        this.url = cfg.url;
        this.width = cfg.width;
        this.height = cfg.height;

        var that = this;

        var margin = {top: 10, right: 10, bottom: 100, left: 40},
                margin2 = {top: 530, right: 10, bottom: 20, left: 40},
                width = that.width - margin.left - margin.right,
                height = that.height - margin.top - margin.bottom,
                height2 = that.height - margin2.top - margin2.bottom;

        var parseDate = d3.time.format("%d-%b-%y").parse;

        var x = d3.time.scale().range([0, width]),
                x2 = d3.time.scale().range([0, width]),
                y = d3.scale.linear().range([height, 0]),
                y2 = d3.scale.linear().range([height2, 0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom"),
                xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
                yAxis = d3.svg.axis().scale(y).orient("left");

        var brush = d3.svg.brush()
                .x(x2)
                .on("brush", brushed);

        var area = d3.svg.area()
                .interpolate("monotone")
                .x(function (d) {
                    return x(d.date);
                })
                .y0(height)
                .y1(function (d) {
                    return y(d.price);
                });

        var area2 = d3.svg.area()
                .interpolate("monotone")
                .x(function (d) {
                    return x2(d.date);
                })
                .y0(height2)
                .y1(function (d) {
                    return y2(d.price);
                });

        var svg = d3.select("#" + that.id).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);

        svg.append("defs").append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

        var focus = svg.append("g")
                .attr("class", "focus")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var context = svg.append("g")
                .attr("class", "context")
                .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        var zoom = d3.behavior.zoom()
                .on("zoom", draw);

        // Add rect cover the zoomed graph and attach zoom event.
        var rect = svg.append("svg:rect")
                .attr("class", "pane")
                .attr("width", width)
                .attr("height", height)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(zoom);

        d3.json(that.url, function (error, data) {
            if (error)
                throw error;

            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.price = +d.price;
            });

            x.domain(d3.extent(data.map(function (d) {
                return d.date;
            })));
            y.domain([0, d3.max(data.map(function (d) {
                    return d.price;
                }))]);
            x2.domain(x.domain());
            y2.domain(y.domain());

            // Set up zoom behavior
            zoom.x(x);

            focus.append("path")
                    .datum(data)
                    .attr("class", "area")
                    .attr("d", area);

            focus.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

            focus.append("g")
                    .attr("class", "y axis")
                    .call(yAxis);

            context.append("path")
                    .datum(data)
                    .attr("class", "area")
                    .attr("d", area2);

            context.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height2 + ")")
                    .call(xAxis2);

            context.append("g")
                    .attr("class", "x brush")
                    .call(brush)
                    .selectAll("rect")
                    .attr("y", -6)
                    .attr("height", height2 + 7);
        });

        function brushed() {
            x.domain(brush.empty() ? x2.domain() : brush.extent());
            focus.select(".area").attr("d", area);
            focus.select(".x.axis").call(xAxis);
            // Reset zoom scale's domain
            zoom.x(x);
        }

        function draw() {
            focus.select(".area").attr("d", area);
            focus.select(".x.axis").call(xAxis);
            // Force changing brush range
            brush.extent(x.domain());
            svg.select(".brush").call(brush);
        }


    }
});
