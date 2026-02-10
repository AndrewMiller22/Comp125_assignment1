function calculateTotal() {

let brisket = document.getElementById("brisket").value * 18;
let ribs = document.getElementById("ribs").value * 16;
let moose = document.getElementById("moose").value * 15;

let subtotal = brisket + ribs + moose;
let tax = subtotal * 0.13;
let total = subtotal + tax;

document.getElementById("total").innerText = total.toFixed(2);
}
