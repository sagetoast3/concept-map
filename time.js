d3.json("timenodes.json", function(data){

 	//constants 
 	var width = 600;
 	var height = 950;

 	var concepts = [];

 	var canvas = d3.select("#something")
 				.append("svg")
 				.attr("width", width)
 				.attr("height", height);
 	

 	//labeling and drawing axes and grid
	var dates = [1855,1860,1865,1870,1875,1880,1885,1890,1895,1900,1905,1910,1915,1920,1925,1930,1935]; 	

	var topics = ["Technology","Literature","Culture","Music","Psychology","Sciences","Visual Arts"];

	var Hspacing = 70;

	ver = 40;

 	var vert = canvas.selectAll("vline")
					.data(dates)
					.enter()
						.append("line")
						.attr("y1",function(d,i) 
								{ return (i*50)+10 +60 + ver;})
						.attr("x1",40)
						.attr("y2",function(d,i) 
								{ return (i*50)+10 +60 + ver;})
						.attr("x2",width)
						.attr("stroke",'#43AAFF')
						.attr("opacity",.2)
						.attr("stroke-dasharray","5,1")
						.attr("class","vline");

	var horiz = canvas.selectAll("hline")
					 .data(topics)
					 .enter()
					 	.append("line")
					 	.attr("y1",60)
					 	.attr("x1",function(d,i) {return (i+1)*Hspacing;})
					 	.attr("y2",height)
					 	.attr("x2",function(d,i) {return (i+1)*Hspacing;})
					 	.attr("stroke",'#43AAFF')
					 	.attr("opacity",.2)
						.attr("stroke-dasharray","5,1")
						.attr("class","hline");

	var labels = canvas.selectAll("text-date")
						.data(dates)
						.enter()
							.append("text")
							.attr("y", function(d,i) {return (i*50)+60 +ver;})
							.attr("x", 20)
							.text(function(d,i){return d})
							.attr("class","text-date");
							
	var label2 = canvas.selectAll("text-topic")
						.data(topics)
						.enter()
							.append("text")
							.attr("y", 10)
							.attr("x", function(d,i) {return (i+1)*Hspacing;})
							.text(function(d,i){return d;})
							.attr("class","text-topic");


	var igreen = '#6ECE8B';
    var iblue = '#ADD8E6';
    var imauve = '#D67B8F';
    var ilav = '#DAA1FF';
    var iorange = '#FFC25F';

 	//conceptual links

	var simulataneity = 

	[ {title: "Madame Bovary", x:1857, y:2},
	  {title: "Telephone Invented", x:1876, y:1 },
	  {title: "Cinema Invented", x:1893, y:1 },
	  {title: "The Octopus", x:1901, y:2},
	  {title: "Death of a Nobody", x:1908, y:2},
	  {title: "Le Sacre du Printemps", x:1913,y:4 },	  
	  {title: "Ulysses", x:1922, y:2}

	];

	var heterspace =

	[
		{title: "Chronophotography", x:1867 ,y:1 },
		{title: "Nietzche's Perspectivism", x:1887, y:3},
		{title: "Cinema Invented", x:1893, y:1 },
		{title: "Picasso's 'Les Demoiselles d'Avignon'", x:1907, y:7},
		{title: "Essay on Cubism", x:1912, y:7}

	];

	var posnegspace = 

	[
		{title: "H.G. Well's Time Traveller", x:1895 ,y:2},
		{title: "Thomson's Corpuscles(electrons)" ,x:1897, y:6}
	]
	
	

	var standardtime = 

	[
		{title: "Time Signals First Transmitted by Telegraph", x:1852, y:1},
		{title: "The Day of Two Noons", x:1883, y:3},
		{title: "Sanford Fleming proposed worldwide time zones", x:1879, y:6}

	]

	var publictime = 

	[
		{title: "Remembrance of Things Past", x:1909, y:2},
		{title: "The Metamorphosis", x:1915, y:2}

	]

	

	function lines(name, color) {

		var line = d3.svg.line()
		.y(function(d) { return ver + (10*(d.x -1850));}) //vertical position added 20
		.x(function(d,i) {return (d.y)*70;})
		.interpolate("cardinal");


		var path = canvas.selectAll("name")
			.data([name])
			.enter()
			.append("path")
				.attr("d", line)
				.attr("fill", "none")
				.attr("stroke", color)
				.attr("stroke-width",1)
						//function(name) {
						//if (name == simulataneity) {'#2397C9';} 
						//else {'#FEA2A1';};})
				.attr("class", name);

		var totalLength = path.node().getTotalLength();

		path
      		.attr("stroke-dasharray", totalLength + " " + totalLength)
      		.attr("stroke-dashoffset", totalLength)
      		.transition()
        		.duration(8000)
        		.ease("linear")
        		.attr("stroke-dashoffset", 0);}




	lines(simulataneity, igreen);
	lines(heterspace, imauve);
	lines(posnegspace, ilav);
	lines(standardtime, iblue);
	lines(publictime, iorange);

	/*function boxlabels(concept, color) {d3.select("hea").append("div")
											.selectAll("box")
											.data(concept)
											.enter()
											.append("p")
											.text(function(d){return concept;})
											.attr("class", "box");}

	boxlabels(simulataneity, igreen);
	*/

 	//plot nodes

 	var start = 1880;
 	var scale = 10;
 	var pad = 60;
 	var yspace = 100;

 	var ypos = function yposition(d) { //added 20
 		return ver + 10*(d.yr -1850);
 	}

 	var circles = canvas.selectAll("nodes")
					.data(data)
					.enter()
						.append("svg:circle")
						/*.attr("fill", 'beige')*/						
						.attr("r", 5)
						.attr("cy", function(d) { return ypos(d);})
						.attr("cx",function(d,i) { return (d.n)*70;})
						.attr("class","nodes")
						.attr("id", function(d) {return d.title;})
						;

	$('svg circle').tipsy({
		gravity:'s',
		html: true,
		title: function() {
			var d = this.__data__, c = d.description ;
			return  c ;
		}
	});



						
	//function label() { canvas.selectAll("text")

	/*circles.selectAll("nodes")
		.append("text")
		.data(data)
		.enter()
			.append("text")
			.text(function(d) {return d.title;})
			.attr("font-size", 8)
			.attr("fill", "grey")
			.attr("font-family", 'Futura'); */

	canvas.selectAll("node-labels")
		.data(data)
		.enter()
			.append("text")
			.attr("y", function(d) { return ver + 10*(d.yr -1850);})
			.attr("x",function(d,i) { return (d.n)*70 +5;})
			.attr("class","node-labels")
			.text(function(d) {return d.title;})
			.attr("font-size", 8)
			.attr("fill", "grey")
			.attr("font-family", 'Futura'); 


	})
