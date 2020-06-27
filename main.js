function putCross( ctx, p){
    for ([i,point] of p.entries()){
        ctx.beginPath()
        ctx.moveTo(point.x-5, point.y-5);
        ctx.lineTo(point.x+5, point.y+5);
        ctx.moveTo(point.x-5, point.y+5);
        ctx.lineTo(point.x+5, point.y-5);
        ctx.stroke();
        ctx.fillText(i,point.x+7,point.y+7);
    }
}

function getProjectionDistance(a, b, c){
    const k2 = b.x*b.x - b.x*a.x + b.y*b.y -b.y*a.y;
    const k1 = a.x*a.x - b.x*a.x + a.y*a.y -b.y*a.y;
    const ab2 = (a.x - b.x)*(a.x - b.x) + (a.y - b.y) * (a.y - b.y);
    const kcom = (c.x*(a.x - b.x) + c.y*(a.y-b.y));
    const d1 = (k1 - kcom) / ab2;
    const d2 = (k2 + kcom) / ab2;
    return {d1, d2};
}

function limit01(value){
    if(value < 0){
        return 0;
    }
    if(value > 1){
        return 1;
    }
    return value;
}
function paddingleft0(v, v_length){
    while( v.length < v_length){
        v = '0' + v;
    }
    return v;
}

function getWeightedColorMix(points, ratios){
    let r = 0;
    let g = 0;
    let b = 0;
    for( [ind, point] of points.entries()){
        r += Math.round(parseInt(point.c.substring(1,3), 16) * ratios[ind]);
        g += Math.round(parseInt(point.c.substring(3,5), 16) * ratios[ind]);
        b += Math.round(parseInt(point.c.substring(5,7), 16) * ratios[ind]);
    }
        
    let result = '#' + paddingleft0(r.toString(16),2) + paddingleft0(g.toString(16),2) + paddingleft0(b.toString(16),2);

    return result;
}

/**
 * Given some points with color attached, calculate the color for a new point
 * @param  p The new point position {x: number, y: number}
 * @param  points The array of given colored points [{x: nember, y: number, c: hexColor}]
 * @return hex color string -- The weighted color mix
 */
function getGeometricColorMix( p, points ){
    let colorRatios = new Array(points.length);
    colorRatios.fill(1);
    for ( [ind1, point1] of points.entries()){
        for ( [ind2, point2] of points.entries()){
            if( ind1 != ind2){
                d  = getProjectionDistance(point1, point2, p);
                colorRatios[ind1] *= limit01(d.d2);
            }
        }

    }
      let totalRatiosSum = 0;
      colorRatios.forEach(c => totalRatiosSum += c);
      colorRatios.forEach((c,i) => colorRatios[i] /= totalRatiosSum);
    c = getWeightedColorMix(points, colorRatios);
    return c;
}

let points = [
    {x:10, y:10, c:"#FF0000"},
    {x:70, y:150, c:"#FFFF00"},
    {x:224, y:300, c:"#00FF00"},
    {x:121, y:100, c:"#00FFFF"},
    {x:160, y:10, c:"#FF00FF"},
]; // these are the starting points for drawing the gradient


var canv = document.getElementById("myCanvas");
var ctx = canv.getContext("2d");
putCross(ctx, points); // optional, only to show the original point position
ctx.globalCompositeOperation = 'destination-over'; // to show the cross points over the gradient
let xcs = points.map( p => p.x);
let ycs = points.map( p => p.y);
let xmin = Math.min(...xcs);
let xmax = Math.max(...xcs);
let ymin = Math.min(...ycs);
let ymax = Math.max(...ycs);
let x, y;
let mixColor;

// iterate all the pixels between the given points
for( x = xmin; x < xmax; x++ ){
    for( y = ymin; y < ymax; y++ ){
        mixColor = getGeometricColorMix({x:x, y:y}, points);
        ctx.fillStyle = mixColor;
        ctx.fillRect(x, y, 1, 1);
    }
}
