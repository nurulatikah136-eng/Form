document.getElementById("receiptForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Validate form fields
  const requiredFields = ["customerName", "paymentDate", "item", "amountPaid", "balance"];
  for (const field of requiredFields) {
    if (!document.getElementById(field).value.trim()) {
      alert("Sila lengkapkan semua maklumat yang diperlukan.");
      return;
    }
  }

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
  doc.rect(10, 10, 190, 277);

  // Title
  doc.setFontSize(18);
  doc.text("RESIT PEMBAYARAN", 105, 30, { align: "center" });

  // Company Logo (if available)
  // doc.addImage(logoData, "PNG", 80, 15, 40, 15);

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
