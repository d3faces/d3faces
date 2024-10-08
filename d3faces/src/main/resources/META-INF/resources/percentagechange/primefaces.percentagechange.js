PrimeFaces.widget.Percentagechange = PrimeFaces.widget.BaseWidget.extend({
    init: function (cfg) {

        this._super(cfg);

        this.id = cfg.id;
        this.url = cfg.url;
        this.width = cfg.width;
        this.height = cfg.height;

        var that = this;

        var margin = {top: 30, right: 30, bottom: 40, left: 50},
        width = that.width - margin.left - margin.right,
                height = that.height - margin.top - margin.bottom;

        var formatPercent = d3.format("+.0%"),
                // Formats a relative price (e.g., 2) as percentage change (e.g., +100%).
                formatChange = function (x) {
                    return formatPercent(x - 1);
                },
                parseDate = d3.time.format("%d-%b-%y").parse;

        var x = d3.time.scale()
                .range([0, width]);

        var y = d3.scale.log()
                .range([height, 0]);

        var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

        var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left")
                .tickSize(-width, 0)
                .tickFormat(formatChange);

        var line = d3.svg.line()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.ratio);
                });

        var area = d3.svg.area()
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.ratio);
                });

        var svg = d3.select("#" + that.id).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var gX = svg.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")");

        var gY = svg.append("g")
                .attr("class", "axis axis--y");

        gY.append("text")
                .attr("class", "axis-title")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .text("Change in Price");

        d3.json(that.url, function (error, data) {
            if (error)
                throw error;

            // Compute price relative to base value (hypothetical purchase price).
            var baseValue = +data[0].close;
            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.ratio = d.close / baseValue;
            });

            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));
            y.domain(d3.extent(data, function (d) {
                return d.ratio;
            }));

            area.y0(y(1));

            // Use a second linear scale for ticks.
            yAxis.tickValues(d3.scale.linear()
                    .domain(y.domain())
                    .ticks(20));

            gX.call(xAxis);

            gY.call(yAxis)
                    .selectAll(".tick")
                    .classed("tick--one", function (d) {
                        return Math.abs(d - 1) < 1e-6;
                    });

            var defs = svg.append("defs");

            defs.append("clipPath")
                    .attr("id", "clip-above")
                    .append("rect")
                    .attr("width", width)
                    .attr("height", y(1));

            defs.append("clipPath")
                    .attr("id", "clip-below")
                    .append("rect")
                    .attr("y", y(1))
                    .attr("width", width)
                    .attr("height", height - y(1));

            svg.append("path")
                    .datum(data)
                    .attr("clip-path", "url(#clip-above)")
                    .attr("class", "area area--above")
                    .attr("d", area);

            svg.append("path")
                    .datum(data)
                    .attr("clip-path", "url(#clip-below)")
                    .attr("class", "area area--below")
                    .attr("d", area);

            svg.append("path")
                    .datum(data)
                    .attr("class", "line")
                    .attr("d", line);
        });

    }
});
