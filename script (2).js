document.getElementById("receiptForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Generate Invoice No.
  const today = new Date();
  const dateStr = today.toISOString().slice(0,10).replace(/-/g,"");
  const invoiceNo = `INV-${dateStr}-${Math.floor(Math.random()*900+100)}`;

  // Get form values
  const name = document.getElementById("customerName").value;
  const date = document.getElementById("paymentDate").value;
  const item = document.getElementById("item").value;
  const paid = document.getElementById("amountPaid").value;
  const balance = document.getElementById("balance").value;
  const note = document.getElementById("note").value;

  // Add border
  doc.rect(10, 10, 190, 277);

  // Title
  doc.setFontSize(18);
  doc.text("RESIT PEMBAYARAN", 105, 30, { align: "center" });

  doc.setFontSize(12);
  doc.text(`No. Invoice: ${invoiceNo}`, 20, 45);

  // Details
  let y = 60;
  doc.text(`✍️ Nama Pelanggan: ${name}`, 20, y);
  y += 10;
  doc.text(`📅 Tarikh Bayaran: ${date}`, 20, y);
  y += 10;
  doc.text(`📦 Item: ${item}`, 20, y);
  y += 10;
  doc.text(`💸 Jumlah Bayaran (RM): ${paid}`, 20, y);
  y += 10;
  doc.text(`🧾 Jumlah Tertunggak / Baki (RM): ${balance}`, 20, y);
  y += 10;
  doc.text(`📝 Catatan / Nota: ${note}`, 20, y);

  // Footer
  y += 20;
  doc.setFontSize(10);
  doc.text("** Resit ini dijana secara automatik **", 105, y, { align: "center" });

  doc.save(`${invoiceNo}.pdf`);
});