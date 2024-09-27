PrimeFaces.widget.Scatterplot = PrimeFaces.widget.BaseWidget.extend({
    init: function (cfg) {

        this._super(cfg);

        this.id = cfg.id;
        this.url = cfg.url;
        this.width = cfg.width;
        this.height = cfg.height;

        var that = this;

        // set the dimensions and margins of the diagram
        var margin = { top: 20, right: 90, bottom: 30, left: 90 },
            url = that.url,
            width = that.width - margin.left - margin.right,
            height = that.height - margin.top - margin.bottom;

        d3.json(url).then(function (data) {
            var chart = Scatterplot(data, {
                x: d => d.mpg,
                y: d => d.hp,
                title: d => d.name,
                xLabel: "Miles per gallon →",
                yLabel: "↑ Horsepower",
                stroke: "steelblue",
                width: width,
                height: height
            });
            d3.select("#" + that.id).append(() => chart);
        });

    }
});
