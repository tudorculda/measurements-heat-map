function drawShape(ctx, ...p){
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y)
    for( i=1; i < p.length; i++){
        ctx.lineTo(p[i].x, p[i].y);
    }
    ctx.closePath();
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

function mixcolors(c1, ratio1, c2, ratio2, c3, ratio3){
    let r1 = Math.round(parseInt(c1.substring(1,3), 16) * ratio1);
    let g1 = Math.round(parseInt(c1.substring(3,5), 16) * ratio1);
    let b1 = Math.round(parseInt(c1.substring(5,7), 16) * ratio1);

    let r2 = Math.round(parseInt(c2.substring(1,3), 16) * ratio2);
    let g2 = Math.round(parseInt(c2.substring(3,5), 16) * ratio2);
    let b2 = Math.round(parseInt(c2.substring(5,7), 16) * ratio2);

    let r3 = Math.round(parseInt(c3.substring(1,3), 16) * ratio3);
    let g3 = Math.round(parseInt(c3.substring(3,5), 16) * ratio3);
    let b3 = Math.round(parseInt(c3.substring(5,7), 16) * ratio3);
    let r = r1 + r2 + r3;
    let g = g1 + g2 + g3;
    let b = b1 + b2 + b3;
    let result = '#' + paddingleft0(r.toString(16),2) + paddingleft0(g.toString(16),2) + paddingleft0(b.toString(16),2);

    return result;
}

var canv = document.getElementById("myCanvas");
var ctx = canv.getContext("2d");
p1 = {x:50, y:40, c:'#FF0000'};
p2 = {x:50, y:140, c:'#00FF00'};
p3 = {x:337, y:100, c:'#0000FF'};




function drawPoints(p1,p2,p3){
    let xmin = Math.min(p1.x, p2.x, p3.x);
let xmax = Math.max(p1.x, p2.x, p3.x);
let ymin = Math.min(p1.y, p2.y, p3.y);
let ymax = Math.max(p1.y, p2.y, p3.y);
let x, y;

for (x = xmin; x < xmax; x++){
    for (y = ymin; y < ymax; y++){
        if ( x == 193 && y==120){
            debugger;
        }
        d12 = getProjectionDistance(p1, p2, {x:x, y:y});
        d23 = getProjectionDistance(p2, p3, {x:x, y:y});
        d13 = getProjectionDistance(p1, p3, {x:x, y:y});
        c1 = limit01(d12.d2) * limit01(d13.d2);
        c2 = limit01(d12.d1) * limit01(d23.d2);
        c3 = limit01(d13.d1) * limit01(d23.d1);
        suma = c1 + c2 + c3;
        // suma = 1;
        c = mixcolors(p1.c, c1/suma, p2.c, c2/suma, p3.c, c3/suma);
        ctx.fillStyle = c;
        ctx.fillRect(x, y, 1, 1);
        
    }
}
// ctx.globalCompositeOperation = 'destination-in';
// drawShape(ctx, p1, p2, p3 );
// ctx.fillStyle = "#000000";
// ctx.fill();

drawShape(ctx, p1, p2, p3 );
ctx.stroke();
}

var canv = document.getElementById("myCanvas");
var ctx = canv.getContext("2d");
ctx.save();
p1 = {x:50, y:40, c:'#FF0000'};
p2 = {x:50, y:140, c:'#00FF00'};
p3 = {x:337, y:100, c:'#0000FF'};
drawPoints(p1,p2,p3);

ctx.translate(0, 200);
p1 = {x:50, y:40, c:'#FF0000'};
p2 = {x:50, y:140, c:'#00FF00'};
p3 = {x:337, y:140, c:'#0000FF'};
drawPoints(p1,p2,p3);


ctx.restore();
ctx.translate(400, 0);
p1 = {x:50, y:40, c:'#00FF00'};
p2 = {x:180, y:120, c:'#0000FF'};
p3 = {x:537, y:100, c:'#FF0000'};
drawPoints(p1,p2,p3);

// // ctx.restore();
// ctx.translate(0, 200);
// p1 = {x:50, y:40, c:'#FF0000'};
// p2 = {x:150, y:140, c:'#0000FF'};
// p3 = {x:337, y:10, c:'#00FF00'};

// drawPoints(p1,p2,p3);