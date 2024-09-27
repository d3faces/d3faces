PrimeFaces.widget.Tickdistribution = PrimeFaces.widget.BaseWidget.extend({
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
                x: {
                    domain: [-4, 4]
                },
                marks: [
                    Plot.tickX({ length: 500 }, { x: d3.randomNormal(), strokeOpacity: 0.2 }),
                ]
            });
            d3.select("#" + that.id).append(() => chart);
        });

    }
});
