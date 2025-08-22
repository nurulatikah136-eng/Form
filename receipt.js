document.getElementById("receiptForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  // A6 size: 105 x 148 mm
  const doc = new jsPDF({ format: 'a6', unit: 'mm' });

  // Generate Invoice No.
  const today = new Date();
  const dateStr = today.toISOString().slice(0,10).replace(/-/g,"");
  const invoiceNo = `INV-${dateStr}-${Math.floor(Math.random()*900+100)}`;

  // Get form values
  const name = document.getElementById("customerName").value.trim();
  const date = document.getElementById("paymentDate").value.trim();
  const item = document.getElementById("item").value.trim();
  const paid = parseFloat(document.getElementById("amountPaid").value).toFixed(2);
  const balance = parseFloat(document.getElementById("balance").value).toFixed(2);
  const note = document.getElementById("note").value.trim();

  // Add border
  doc.setLineWidth(0.5);
  doc.rect(5, 5, 95, 138);

  // Title Section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("RESIT PEMBAYARAN", 52.5, 15, { align: "center" });

  // Invoice & Date Section
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(`No. Resit: ${invoiceNo}`, 10, 21);
  doc.text(`Tarikh Resit: ${today.toLocaleDateString("ms-MY")}`, 60, 21);

  // Garisan pemisah
  doc.setLineWidth(0.2);
  doc.line(10, 23, 95, 23);

  // Customer Details
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Maklumat Pelanggan", 10, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Nama", 12, 33);
  doc.text(":", 45, 33);
  doc.text(name || "-", 48, 33);

  doc.text("Tarikh Bayaran", 12, 38);
  doc.text(":", 45, 38);
  doc.text(date || "-", 48, 38);

  // Garisan pemisah
  doc.setLineWidth(0.1);
  doc.line(10, 41, 95, 41);

  // Payment Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Butiran Pembayaran", 10, 46);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Item", 12, 51);
  doc.text(":", 45, 51);
  doc.text(item || "-", 48, 51);

  doc.text("Jumlah Bayaran (RM)", 12, 56);
  doc.text(":", 45, 56);
  doc.text(paid, 48, 56);

  doc.text("Baki/Tertunggak (RM)", 12, 61);
  doc.text(":", 45, 61);
  doc.text(balance, 48, 61);

  // Garisan pemisah
  doc.setLineWidth(0.1);
  doc.line(10, 64, 95, 64);

  // Note Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Catatan / Nota", 10, 69);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(note || "-", 12, 74, { maxWidth: 80 });

  // Footer Section
  doc.setLineWidth(0.2);
  doc.line(10, 135, 95, 135);
  doc.setFontSize(8);
  doc.setFont("helvetica", "italic");
  doc.text("Resit ini dijana secara automatik.", 52.5, 140, { align: "center" });

  doc.save(`${invoiceNo}.pdf`);
});
