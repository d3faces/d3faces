PrimeFaces.widget.Brushandzoom = PrimeFaces.widget.BaseWidget.extend({
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

        var parseDate = d3.timeParse("%d-%b-%y");

        var x = d3.scaleTime().range([0, width]),
                x2 = d3.scaleTime().range([0, width]),
                y = d3.scaleLinear().range([height, 0]),
                y2 = d3.scaleLinear().range([height2, 0]);

        var xAxis = d3.axisBottom(x),
                xAxis2 = d3.axisBottom(x2),
                yAxis = d3.axisLeft(y);

        var brush = d3.brushX()
                .extent([[0, 0], [width, height2]])
                .on("brush end", brushed);

        var area = d3.area()
                .curve(d3.curveMonotoneX)
                .x(function (d) {
                    return x(d.date);
                })
                .y0(height)
                .y1(function (d) {
                    return y(d.price);
                });

        var area2 = d3.area()
                .curve(d3.curveMonotoneX)
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

        var zoom = d3.zoom()
                .scaleExtent([1, Infinity])
                .translateExtent([[0, 0], [width, height]])
                .extent([[0, 0], [width, height]])
                .on("zoom", zoomed);

        d3.json(that.url, function (error, data) {
            if (error)
                throw error;

            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.price = +d.price;
            });

            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));
            y.domain([0, d3.max(data, function (d) {
                    return d.price;
                })]);
            x2.domain(x.domain());
            y2.domain(y.domain());

            focus.append("path")
                    .datum(data)
                    .attr("class", "area")
                    .attr("d", area);

            focus.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

            focus.append("g")
                    .attr("class", "axis axis--y")
                    .call(yAxis);

            context.append("path")
                    .datum(data)
                    .attr("class", "area")
                    .attr("d", area2);

            context.append("g")
                    .attr("class", "axis axis--x")
                    .attr("transform", "translate(0," + height2 + ")")
                    .call(xAxis2);

            context.append("g")
                    .attr("class", "brush")
                    .call(brush)
                    .call(brush.move, x.range());

            svg.append("rect")
                    .attr("class", "zoom")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                    .call(zoom);
        });

        function brushed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom")
                return; // ignore brush-by-zoom
            var s = d3.event.selection || x2.range();
            x.domain(s.map(x2.invert, x2));
            focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            svg.select(".zoom").call(zoom.transform, d3.zoomIdentity
                    .scale(width / (s[1] - s[0]))
                    .translate(-s[0], 0));
        }

        function zoomed() {
            if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush")
                return; // ignore zoom-by-brush
            var t = d3.event.transform;
            x.domain(t.rescaleX(x2).domain());
            focus.select(".area").attr("d", area);
            focus.select(".axis--x").call(xAxis);
            context.select(".brush").call(brush.move, x.range().map(t.invertX, t));
        }

    }
});
