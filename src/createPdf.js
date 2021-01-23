const downloadInvoice = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const title = "Hotel Reservation Invoice";
    const headers = [
      ["Properties", "Payment Method", "Amount", "Check In", "Check Out"],
    ];

    const data =
      rows &&
      rows.map((item) => [
        item.propertyInfo.title,
        item.payment_Method,
        item.total_Cost,
        moment(item.check_In_Date).format("L"),
        moment(item.check_Out_Date).format("L"),
      ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("invoice.pdf");
  };