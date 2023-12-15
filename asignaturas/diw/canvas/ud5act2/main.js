let c = document.getElementById("c");

c.width = 600;
c.height = 600;


var sales = [{
    "product": "Basketballs",
    units: 150
}, {
    "product": "Baseballs",
    units: 125
}, {
    "product": "Footballs",
    units: 300
}]


let ctx = c.getContext("2d");
ctx.strokeRect(0, 0, c.width, c.height);

let x = 180;
let y = c.height - 130;

for (let i = 0; i < sales.length; i++) {
    let grd = ctx.createLinearGradient(x, 0, x + 70, 0);
    if (i == 0) {
        grd.addColorStop(0, "red");
        grd.addColorStop(1, "white");
    } else if (i == 1) {
        grd.addColorStop(0, "green");
        grd.addColorStop(1, "white");
    } else {
        grd.addColorStop(0, "blue");
        grd.addColorStop(1, "white");
    }

    ctx.fillStyle = grd;
    // dibujar la barra
    ctx.fillRect(x, y, 80, sales[i].units - y);
    // separación
    x += 120;
}

// poner el texto de los productos debajo de cada barra
x = 180;
y = c.height - 100;
for (let i = 0; i < sales.length; i++) {
    console.log(sales[i].product);
    console.log(i);
    console.log(sales.length)
    ctx.fillStyle = "black";
    ctx.font = "bold 19px Arial";
    ctx.fillText(sales[i].product, x, y);
    x += 120;
}

// línea debajo de las barras
ctx.beginPath();
ctx.moveTo(100, c.height - 70);
ctx.lineTo(c.width, c.height - 70);
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.stroke();

ctx.beginPath();
ctx.moveTo(100, 0);
ctx.lineTo(100, c.height - 70);
ctx.strokeStyle = "black";
ctx.lineWidth = 1;
ctx.stroke();

// poner el texto en negrita
ctx.font = "bold 19px Arial";
// texto debajo de la línea
ctx.fillText("Product", 250, c.height - 30, 250);

// poner el texto a la izquierda de la línea
ctx.save();
ctx.fillText("Units", 25, 300, 250);



