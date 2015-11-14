function plot(json, size){
    var svg = d3.select("body").append("svg")
        .attr("width", 800)
        .attr("height", 720);
    var img = d3.select('body').append('img')
        .attr('id', 'current_img');

    svg.append('g').selectAll('.myPoint')
        .data(json)
        .enter()
        .append('image')
        .attr("xlink:href", function(d){ return d[2] })
        .attr("x", function(d){ return d[0]})
        .attr("y", function(d){ return d[1]})
        .attr("width", size[0])
        .attr("height", size[1])
        .on("click", function(d, i){
            img.attr('src', d[3]);
        });

    var zoom = d3.behavior.zoom().scaleExtent([0.5, 100]);
    svg.call(zoom);
    zoom.on("zoom", function(){
        var e = d3.event;
        var w = size[0] / e.scale;
        var h = size[1] / e.scale;
        var transform = 'translate(' + e.translate + ')' +' scale(' + e.scale + ')';
        svg.selectAll('image')
            .attr('transform', transform)
            .attr('width', w)
            .attr('height', h);
    });
}

function get_dataset(){
    var dataset = window.location.search.substr(1);
    if ({ portrait: 1, landscape: 1}[dataset] !== 1){
        dataset = 'square';
    }
    return "datasets/" + dataset + ".json";
}

function get_size(){
    var dataset = window.location.search.substr(1);
    var lut = {
        portrait: [32, 50],
        landscape: [50, 32],
        square: [40, 40]
    };
    return lut[dataset] || lut['square'];
}

d3.json(get_dataset(), function(error, json) {
    if (error) return console.warn(error);
    plot(json, get_size());
});
