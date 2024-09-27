PrimeFaces.widget.Tickboxplot = PrimeFaces.widget.BaseWidget.extend({
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
            var quartile1 = V => d3.quantile(V, 0.25);
            var quartile3 = V => d3.quantile(V, 0.75);
            var iqr1 = V => Math.max(d3.min(V), quartile1(V) * 2.5 - quartile3(V) * 1.5);
            var iqr2 = V => Math.min(d3.max(V), quartile3(V) * 2.5 - quartile1(V) * 1.5);
            var chart = Plot.plot({
                x: {
                    grid: true,
                    inset: 6
                },
                marks: [
                    Plot.ruleY(data, Plot.groupY({ x1: iqr1, x2: iqr2 }, { x: "Speed", y: "Expt" })),
                    Plot.barX(data, Plot.groupY({ x1: quartile1, x2: quartile3 }, { x: "Speed", y: "Expt", fill: "#ccc" })),
                    Plot.tickX(data, Plot.groupY({ x: "median" }, { x: "Speed", y: "Expt", strokeWidth: 2 })),
                ]
            });
            d3.select("#" + that.id).append(() => chart);
        });

    }
});
