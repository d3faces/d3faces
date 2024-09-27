PrimeFaces.widget.Ticklinechart = PrimeFaces.widget.BaseWidget.extend({
    init: function (cfg) {

        this._super(cfg);

        this.id = cfg.id;
        this.url = cfg.url;
        this.width = cfg.width;
        this.height = cfg.height;

        var that = this;

        var margin = { top: 20, right: 20, bottom: 30, left: 50 },
            url = that.url,
            width = that.width - margin.left - margin.right,
            height = that.height - margin.top - margin.bottom;

        d3.json(url).then(function (data) {
            var chart = Plot.plot({
                y: {
                    grid: true
                },
                marks: [
                    Plot.tickY([0], { stroke: "red" }),
                    Plot.line(data, { x: "Date", y: "Close" })
                ]
            });
            d3.select("#" + that.id).append(() => chart);
        });

    }
});
