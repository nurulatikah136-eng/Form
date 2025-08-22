document.getElementById("receiptForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

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
  doc.rect(10, 10, 190, 277);

  // Title Section
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("RESIT PEMBAYARAN", 105, 28, { align: "center" });
  doc.setLineWidth(0.2);
  doc.line(20, 33, 190, 33);

  // Invoice & Date Section
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(`No. Resit: ${invoiceNo}`, 20, 40);
  doc.text(`Tarikh Resit: ${today.toLocaleDateString("ms-MY")}`, 150, 40);

  // Customer Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Maklumat Pelanggan", 20, 52);
  doc.setLineWidth(0.1);
  doc.line(20, 54, 70, 54);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Nama:", 22, 60);
  doc.text(name || "-", 60, 60);
  doc.text("Tarikh Bayaran:", 22, 67);
  doc.text(date || "-", 60, 67);

  // Payment Details
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Butiran Pembayaran", 20, 80);
  doc.setLineWidth(0.1);
  doc.line(20, 82, 70, 82);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Item:", 22, 88);
  doc.text(item || "-", 60, 88);
  doc.text("Jumlah Bayaran (RM):", 22, 95);
  doc.text(paid, 60, 95);
  doc.text("Baki/Tertunggak (RM):", 22, 102);
  doc.text(balance, 60, 102);

  // Note Section
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Catatan / Nota", 20, 115);
  doc.setLineWidth(0.1);
  doc.line(20, 117, 70, 117);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(note || "-", 22, 123);

  // Footer Section
  doc.setLineWidth(0.2);
  doc.line(20, 260, 190, 260);
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text("Resit ini dijana secara automatik. Tidak memerlukan tandatangan.", 105, 268, { align: "center" });

  doc.save(`${invoiceNo}.pdf`);
});  // doc.addImage(logoData, "PNG", 80, 15, 40, 15);

  doc.setFontSize(12);
  doc.text(`No. Invoice: ${invoiceNo}`, 20, 45);

  // Details
  let y = 60;
  const details = [
    [`鉁嶏笍 Nama Pelanggan`, name],
    [`馃搮 Tarikh Bayaran`, date],
    [`馃摝 Item`, item],
    [`馃捀 Jumlah Bayaran (RM)`, paid],
    [`馃Ь Jumlah Tertunggak / Baki (RM)`, balance],
    [`馃摑 Catatan / Nota`, note]
  ];
  details.forEach(([label, value]) => {
    doc.text(`${label}:`, 20, y);
    doc.text(value || "-", 80, y);
    y += 10;
  });

  // Footer
  y += 20;
  doc.setFontSize(10);
  doc.text("** Resit ini dijana secara automatik **", 105, y, { align: "center" });

  doc.save(`${invoiceNo}.pdf`);
});
