PrimeFaces.widget.Barchartdiverging = PrimeFaces.widget.BaseWidget.extend({
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
            var metric = "absolute"; // absolute, relative
            var chart = DivergingBarChart(data, {
                x: metric === "absolute" ? d => d[2019] - d[2010] : d => d[2019] / d[2010] - 1,
                y: d => d.State,
                yDomain: d3.groupSort(data, ([d]) => d[2019] - d[2010], d => d.State),
                xFormat: metric === "absolute" ? "+,d" : "+%",
                xLabel: "← decrease · Change in population · increase →",
                width: width,
                marginRight: 70,
                marginLeft: 70,
                colors: d3.schemeRdBu[3]
            });
            d3.select("#" + that.id).append(() => chart);
        });

    }
});
