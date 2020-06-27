function getCenterOutBoundCircle(p1, p2, p3){
    const y12 = p1.y - p2.y;
    const x12 = p1.x - p2.x;
    const y32 = p3.y - p3.y; 
    const x32 = p3.x - p2.x;
    const d21 = p2.y * p2.y - p1.y * p1.y + p2.x * p2.x - p1.x * p1.x;
    const d23 = p2.y * p2.y - p3.y * p3.y + p2.x * p2.x - p3.x * p3.x;

    let y0 = ( ( d21 * x32 / x12 ) - d23 ) / ( 2 * ( y32 - ( y12 * x32 / x12)));
    let x0 = ( ( d21 * y32 / y12 ) - d23 ) / ( 2 * ( x32 - ( x12 * y32 / y12)));
    
    const p12x_2 = p1.x * p1.x - p2.x * p2.x;
    const p12y_2 = p1.y * p1.y - p2.y * p2.y;    
    const p12_2 = p12x_2 + p12y_2;
    const p13x_2 = p1.x * p1.x - p3.x * p3.x;
    const p13y_2 = p1.y * p1.y - p3.y * p3.y;    
    const p13_2 = p13x_2 + p13y_2;
    const p31x = p3.x - p1.x;
    const p21x = p2.x - p1.x;
    const p31y = p3.y - p1.y;
    const p21y = p2.y - p1.y;

    y0 = ( p12_2 * p31x - p13_2 * p21x ) / 2 / ( p31y * p21x - p21y * p31x );
    x0 = - ( 2 * y0 *p21y + p12x_2 + p12y_2) / (2 * p21x);
    
    return {x:x0, y:y0}
};

function getMiddleSegment(p1,p2){
    let middleX = p1.x * 1.0 / 2 + p2.x * 1.0 / 2 ;
    let middleY = p1.y * 1.0 / 2 + p2.y * 1.0 / 2 ;
    return {x:middleX, y: middleY };
}

function drawTrinagleEchiR(ctx, r){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, r);
    ctx.lineTo(r/2 * Math.sqrt(3), r/2);
    ctx.closePath();
}
function divideColor(colorHex, c){
    let r = Math.round(parseInt(colorHex.substring(1,3), 16) / c).toString(16);
    let g = Math.round(parseInt(colorHex.substring(3,5), 16) / c).toString(16);
    let b = Math.round(parseInt(colorHex.substring(5,7), 16) / c).toString(16);
    
    return '#' + r + g + b;
}

function drawShape(ctx, ...p){
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y)
    for( i=1; i < p.length; i++){
        ctx.lineTo(p[i].x, p[i].y);
    }
    ctx.closePath();
}

function drawTriangle(ctx, p1, p2, p3){
    drawShape(ctx, p1, p2, p3);
    ctx.stroke();

    
    const d12 = Math.sqrt( Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) ); 
    const d13 = Math.sqrt( Math.pow(p1.x - p3.x, 2) + Math.pow(p1.y - p3.y, 2) ); 
    const d23 = Math.sqrt( Math.pow(p3.x - p2.x, 2) + Math.pow(p3.y - p2.y, 2) ); 
    const p12 = getMiddleSegment(p1, p2);
    const p13 = getMiddleSegment(p1, p3);
    const p23 = getMiddleSegment(p2, p3);
    const o  = getCenterOutBoundCircle(p1, p2, p3);
    
    
    var grd12 = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
    grd12.addColorStop(0, p1.c);
    grd12.addColorStop(1, p2.c);

    var grd13 = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
    grd13.addColorStop(0, p1.c);
    grd13.addColorStop(1, p3.c);

    var grd21 = ctx.createLinearGradient(p2.x, p2.y, p1.x, p1.y);
    grd21.addColorStop(0, p2.c);
    grd21.addColorStop(1, p1.c);

    var grd23 = ctx.createLinearGradient(p2.x, p2.y, p3.x, p3.y);
    grd23.addColorStop(0, p2.c);
    grd23.addColorStop(1, p3.c);

    var grd32 = ctx.createLinearGradient(p3.x, p3.y, p2.x, p2.y);
    grd32.addColorStop(0, p3.c);
    grd32.addColorStop(1, p2.c);

    var grd31 = ctx.createLinearGradient(p3.x, p3.y, p1.x, p1.y);
    grd31.addColorStop(0, p3.c);
    grd31.addColorStop(1, p1.c);


    ctx.globalCompositeOperation = 'lighter';

    drawShape(ctx, p1, p12, o, p1);
    ctx.fillStyle = grd12;
    ctx.fill();      
    ctx.stroke();
    
    drawShape(ctx, p1, p13, o, p1);
    ctx.fillStyle = grd13;
    ctx.fill();

    drawShape(ctx, p2, p12, o, p2);
    ctx.fillStyle = grd21;
    ctx.fill();      
    
    drawShape(ctx, p2, p23, o, p2);
    ctx.fillStyle = grd23;
    ctx.fill();

    drawShape(ctx, p3, p13, o, p3);
    ctx.fillStyle = grd31;
    ctx.fill();      
    
    drawShape(ctx, p3, p23, o, p3);
    ctx.fillStyle = grd32;
    ctx.fill();
    // ctx.globalCompositeOperation='source-in';
    // drawShape(ctx, p1, p2, p3);
    // ctx.fillStyle = '#00000000';
    // ctx.fill();

}



var canv = document.getElementById("myCanvas");
var ctx = canv.getContext("2d");
p1 = {x:0, y:100, c:'#FF0000'};
p2 = {x:50, y:600, c:'#00FF00'};
p3 = {x:350, y:650, c:'#202020'};
p4 = {x:400, y:400, c:'#FFFFFF'};

p5 = {x:30, y:20, c:'#008080'}
drawTriangle(ctx, p1, p2, p3);
// drawTriangle(ctx, p2, p3, p4);
// drawTriangle(ctx, p1, p3, p5);
// drawTriangle(ctx, p5, p3, p4);
// let c534 = getCenterOutBoundCircle(p5,p3,p4);
// ctx.beginPath();
// ctx.moveTo(c534.x, c534.y);
// ctx.lineTo(p4.x, p4.y);
// ctx.moveTo(c534.x, c534.y);
// ctx.lineTo(p5.x, p5.y);
// ctx.moveTo(c534.x, c534.y);
// ctx.lineTo(p3.x, p3.y);
// ctx.stroke();

