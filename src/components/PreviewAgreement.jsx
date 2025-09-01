import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate, useParams } from "react-router-dom";
import "./agreement.css";

export default function PreviewAgreement() {
  const refAgreement = useRef();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [form, setForm] = useState(null);

  // 🟢 تحميل بيانات العقد
  useEffect(() => {
    const savedContracts = JSON.parse(localStorage.getItem("contracts")) || [];
    const foundContract = savedContracts.find((c) => c.id === id);
    setForm(foundContract || null);
  }, [id]);

  if (!form) return <p>⏳ جاري تحميل العقد...</p>;

  // 🟢 تحميل كـ PDF
const downloadPDF = async () => {
  const canvas = await html2canvas(refAgreement.current, { scale: 3, useCORS: true });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // نخلي الصورة كلها تتحشر في صفحة A4 واحدة
  pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);

  pdf.save(`contract-${form.contractNo}.pdf`);
};


  // 🟢 طباعة العقد مباشرة
  const printContract = () => {
  if (!refAgreement.current) return;

  const printContent = refAgreement.current.innerHTML;
  const printWindow = window.open("", "_blank");

  printWindow.document.write(`
    <html>
      <head>
        <title>طباعة العقد</title>
        <style>
          @media print {
            body { margin: 0; padding: 10px; font-family: 'Cairo', sans-serif; direction: rtl; zoom: 0.8; }
            .agreement { width: 210mm; page-break-inside: avoid; }
            table { width: 100%; border-collapse: collapse; font-size: 12px; }
            table, th, td { border: 1px solid #000; }
            th, td { padding: 6px; text-align: right; }
            img { max-width: 100%; height: auto; }
          }
        </style>
      </head>
      <body>
        <div class="agreement">${printContent}</div>
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
};


  // 🟢 رجوع للتعديل
  const goBack = () => {
    navigate(`/edit/${form.id}`);
  };
  return (
    <div style={{ padding: "2rem", direction: "rtl", fontFamily: "Cairo, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📑 معاينة العقد</h2>

      {/* منطقة العقد */}
      <div ref={refAgreement} className="agreement">
        {/* الهيدر */}
        <div className="header">
          <div className="en-head">
            <h2>Star <span>Car</span></h2>
            <h3>for Rent Cars</h3>
            <p>Sharm El Sheikh - Ras Um El Sayed front of Aqua Park</p>
            <h2 className="mobile">Mob : 01096000813 - 01147600078</h2>
          </div>
          <div className="logo-cont">
            <img className="logo" src="/logo1.png" alt="Star Car Logo" />
          </div>
          <div className="ar-head">
            <h2>ستار <span>كار</span></h2>
            <h3>لإيجار السيارات</h3>
            <p>شرم الشيخ - هضبة رأس أم السيد أمام أكوا بارك</p>
            <h2 className="mobile">01096000813 - 01147600078</h2>
          </div>
        </div>

        {/* رقم العقد */}
        <div className="num">
          <center><h2 className="contract-number">رقم العقد : {form.contractNo}</h2></center>
        </div>

        {/* بيانات العميل */}
        <div className="table-title">بيانات العميل</div>
        <table className="contract-table">
          <tbody>
            <tr><td>الاسم</td><td>{form.name}</td></tr>
            <tr><td>الشركة</td><td>{form.company}</td></tr>
            <tr><td>الهاتف 1</td><td>{form.phone1}</td></tr>
            <tr><td>الهاتف 2</td><td>{form.phone2}</td></tr>
            <tr><td>العنوان</td><td>{form.homeAddress}</td></tr>
            <tr><td>العنوان الحالي</td><td>{form.currentAddress}</td></tr>
            <tr><td>الجنسية</td><td>{form.nationality}</td></tr>
            <tr><td>تاريخ الميلاد</td><td>{form.dob}</td></tr>
            <tr><td>رقم الباسبور</td><td>{form.passportNo}</td></tr>
            <tr><td>انتهاء الباسبور</td><td>{form.passportExpiry}</td></tr>
            <tr><td>رقم الرخصة</td><td>{form.licenseNo}</td></tr>
            <tr><td>تاريخ الإصدار</td><td>{form.licenseIssue}</td></tr>
            <tr><td>انتهاء الرخصة</td><td>{form.licenseExpiry}</td></tr>
            <tr><td>صادرة من</td><td>{form.issuedBy}</td></tr>
          </tbody>
        </table>

        {/* بيانات السائق الإضافي */}
        <div className="table-title">بيانات السائق الإضافي</div>
        <table className="contract-table">
          <tbody>
            <tr><td>الاسم</td><td>{form.additionalDriver}</td></tr>
            <tr><td>باسبور</td><td>{form.additionalPassportNo}</td></tr>
            <tr><td>انتهاء الرخصة</td><td>{form.additionalLicenseExpiry}</td></tr>
            <tr><td>تاريخ الإصدار</td><td>{form.additionalDateOfIssue}</td></tr>
          </tbody>
        </table>

        {/* بيانات السيارة */}
        <div className="table-title">بيانات السيارة</div>
        <table className="contract-table">
          <tbody>
            <tr><td>Vehicle No</td><td>{form.carVehicleNo}</td></tr>
            <tr><td>Group</td><td>{form.carGroup}</td></tr>
            <tr><td>Model</td><td>{form.carModel}</td></tr>
            <tr><td>Driver</td><td>{form.driver}</td></tr>
          </tbody>
        </table>

        {/* بيانات الرحلة */}
        <div className="table-title">بيانات الاستئجار</div>
        <table className="contract-table cost-table">
          <tbody>
            <tr><td>Date Out</td><td>{form.dateOut}</td></tr>
            <tr><td>Date In</td><td>{form.dateIn}</td></tr>
            <tr><td>Expected Return</td><td>{form.expectedReturnDate}</td></tr>
            <tr><td>Km (IN)</td><td>{form.kmIn || 0}</td></tr>
            <tr><td>Km (OUT)</td><td>{form.kmOut || 0}</td></tr>
            <tr><td>Driver Km</td><td>{form.driversKm || 0}</td></tr>
            <tr><td>Allowance</td><td>{form.allowance || 0}</td></tr>
            <tr><td>EXT</td><td>{form.kmIncrease || 0}</td></tr>
          </tbody>
        </table>

        {/* الملاحظات */}
        <div className="notes">
          <div className="ar-note">
            <h2>ملاحظات :</h2>
            <p>1- في حالة الحادث يتم تحرير محضر فوراً لدى قسم الشرطة ويدفع المستأجر 3000 يورو لمكتب ستار كار.</p>
            <p>2- يجب على المستأجر الاحتفاظ بالعقد وجميع مستندات السيارة داخلها وإلا يتحمل كافة الالتزامات.</p>
            <p>3- في حالة فقدان أو سحب الرخصة، يتم الإبلاغ فوراً ودفع 150 يورو.</p>
            <p>4- لا يعتمد السداد إلا بإيصال مختوم من الشركة.</p>
          </div>
          <div className="en-note">
            <h2>Notes :</h2>
            <p>1- In case of accident the renter must register with police and pay €3000.</p>
            <p>2- Renter must keep rental agreement & car docs inside car or assume full responsibility.</p>
            <p>3- In case of license lost/withdrawn report immediately & pay €150.</p>
            <p>4- Payment valid only with stamped receipt.</p>
          </div>
        </div>

        {/* توقيع */}
        <div className="signatures" style={{direction: "ltr"}}>
          <p>Full Name: ____________________________</p>
          <p>Signature: ____________________________</p>
        </div>
      </div>

      {/* الأزرار */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
          {/*<button onClick={printContract} style={{ marginRight: "12px" }}>🖨️ طباعة العقد</button>*/}

        <button onClick={downloadPDF} style={{ marginRight: "12px" }}>📥 تحميل PDF</button>
        <button onClick={goBack}>✏️ تعديل البيانات</button>
      </div>
    </div>
  );
}
