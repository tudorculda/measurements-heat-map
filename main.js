function getCenterOutBoundCircle(p1, p2, p3){
    const y12 = p1.y - p2.y;
    const x12 = p1.x - p2.x;
    const y32 = p3.y - p3.y; 
    const x32 = p3.x - p2.x;
    const d21 = p2.y * p2.y - p1.y * p1.y + p2.x * p2.x - p1.x * p1.x;
    const d23 = p2.y * p2.y - p3.y * p3.y + p2.x * p2.x - p3.x * p3.x;
    y0 = ( ( d21 * x32 / x12 ) - d23 ) / ( 2 * ( y32 - ( y12 * x32 / x12)));
    x0 = ( ( d21 * y32 / y12 ) - d23 ) / ( 2 * ( x32 - ( x12 * y32 / y12)));
    return {x:x0, y:y0}
};


function drawTrinagleEchiR(ctx, r){
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, r);
    ctx.lineTo(r/2 * Math.sqrt(3), r/2);
    ctx.closePath();
}


function drawTriangle(ctx, p1, p2, p3){
    let xa = p1.x;
    let ya = p1.y;
    let xb = p2.x;
    let yb = p2.y;
    let xc = p3.x;
    let yc = p3.y;
    let r = 1000;
    let RAD3 = Math.sqrt(3);
    let a,b,c,d,e,f;
    e = xa * 1.0;
    f = ya * 1.0;
    c = ( xb  - e ) * 1.0 / r;
    d = ( yb - f ) * 1.0 / r;
    a = ( xc - e - c*r/2 ) * 2.0 / ( r * RAD3 );
    b = ( yc - f - d*r/2 ) * 2.0 / ( r * RAD3 );
    
    ctx.save();
    
    ctx.setTransform(a, b, c, d, e, f); 
    
    var grd = ctx.createRadialGradient(0,0,10, 0,0, r*RAD3/2);
    // grd.addColorStop(0, p1.c + 'FF');
    // grd.addColorStop(1, p1.c + '00');
    grd.addColorStop(0, p1.c );
    grd.addColorStop(1, "#000000");
    // Fill with gradient
    drawTrinagleEchiR(ctx, r);
    ctx.fillStyle = grd;
    ctx.fill();
    
    ctx.globalCompositeOperation = 'lighter';
    
    // Create gradient
    grd = ctx.createRadialGradient(0,r,10, 0, r, r*RAD3/2);
    // grd.addColorStop(0, p2.c + 'FF');
    // grd.addColorStop(1, p2.c + '00');
    grd.addColorStop(0, p2.c);
    grd.addColorStop(1, "#000000");
    
    drawTrinagleEchiR(ctx, r);
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fill();
    
    // Create gradient
    grd = ctx.createRadialGradient(RAD3 *r/2, r/2 ,10, RAD3 *r/2, r/2 , r*RAD3/2);
    // grd.addColorStop(0, p3.c + 'FF');
    // grd.addColorStop(1, p3.c + '00');
    grd.addColorStop(0, p3.c);
    grd.addColorStop(1, "#000000");
       drawTrinagleEchiR(ctx, r);
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fill();
    
    ctx.restore()
}



var canv = document.getElementById("myCanvas");
var ctx = canv.getContext("2d");
p1 = {x:0, y:100, c:'#FF0000'};
p2 = {x:50, y:600, c:'#00FF00'};
p3 = {x:150, y:200, c:'#202020'};
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

