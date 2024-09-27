PrimeFaces.widget.Tickbarcode = PrimeFaces.widget.BaseWidget.extend({
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
            var keys = data.slice(0, 1).map(function (d, i) { return Object.keys(d); });
            var ages = keys.shift();
            var stateages = ages.flatMap(age => data.map(d => ({ state: d.name, age, population: d[age] })));
            var chart = Plot.plot({
                marginLeft: 50,
                grid: true,
                x: {
                    axis: "top",
                    label: "Percent (%) →",
                    transform: d => d * 100
                },
                y: {
                    domain: ages,
                    label: "Age"
                },
                marks: [
                    Plot.ruleX([0]),
                    Plot.tickX(stateages, Plot.normalizeX({ basis: "sum", z: "state", x: "population", y: "age" }))
                ]
            });
            d3.select("#" + that.id).append(() => chart);
        });

    }
});
