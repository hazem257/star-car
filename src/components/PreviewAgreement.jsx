import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";
import "./agreement.css";

export default function PreviewAgreement({ form }) {
  const refAgreement = useRef();
  const navigate = useNavigate();

  const downloadPDF = async () => {
    const canvas = await html2canvas(refAgreement.current, { scale: 3, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`contract-${form.contractNo}.pdf`);
  };

  const goBack = () => navigate("/");

  const subTotal = (parseFloat(form.monthlyRate) || 0) + (parseFloat(form.weeklyRate) || 0) +
    (parseFloat(form.dailyRate) || 0) + (parseFloat(form.hourRate) || 0) +
    (parseFloat(form.allowance) || 0);
  const salesTax = subTotal * 0.15;
  const total = subTotal + salesTax;
  const totalCharge = total + (parseFloat(form.delivery) || 0);

  return (
    <div style={{ padding: "2rem", direction: "rtl", fontFamily: "Cairo, sans-serif" }}>
      <h2>معاينة العقد</h2>
      <div ref={refAgreement} className="agreement">
        {/* Header */} <div className="header">
          <div className="en-head"> <h2>Star <span>Car</span>
          </h2> <h3>for Rent Cars</h3>
            <p>Sharm El Sheikh - Res U8m El sayed front of Aqua Park</p>
            <h2 className="mobile">Mob : 01096000813 - 01147600078</h2>
          </div> <div className="logo-cont"> <img className="logo" src="/logo1.png" alt="Star Car Logo" /> </div>
          <div className="ar-head"> 
          <h2>ستار <span>كار</span>
          </h2> <h3>لإيجار السيارات</h3> 
          <p>شرم الشيخ - هضبه راس ام السيد أمام أكوا بارك</p>
           <h2>01096000813 - 01147600078</h2> </div> </div> <div className="num"> <center><h2 className="contract-number">رقم العقد : {form.contractNo}</h2></center> </div>
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
            <tr><td>السائق الإضافي</td><td>{form.additionalDriver}</td></tr>
            <tr><td>باسبور السائق</td><td>{form.additionalPassportNo}</td></tr>
            <tr><td>تاريخ انتهاء الرخصة</td><td>{form.additionalLicenseExpiry}</td></tr>
            <tr><td>تاريخ الإصدار الإضافي</td><td>{form.additionalDateOfIssue}</td></tr>
          </tbody>
        </table>

        {/* معلومات المركبة */}
        <div className="table-title">معلومات المركبة</div>
        <table className="contract-table">
          <tbody>
            <tr><td>رقم المركبة</td><td>{form.carVehicleNo}</td></tr>
            <tr><td>المجموعة</td><td>{form.carGroup}</td></tr>
            <tr><td>الموديل</td><td>{form.carModel}</td></tr>
            <tr><td>السائق</td><td>{form.driver}</td></tr>
          </tbody>
        </table>

        {/* التكاليف */}
        <div className="table-title">التكاليف</div>
        <table className="contract-table">
          <tbody>
            <tr><td>Allowance</td><td>{form.allowance}</td></tr>
            <tr><td>Monthly Rate</td><td>{form.monthlyRate}</td></tr>
            <tr><td>Weekly Rate</td><td>{form.weeklyRate}</td></tr>
            <tr><td>Daily Rate</td><td>{form.dailyRate}</td></tr>
            <tr><td>Hour Rate</td><td>{form.hourRate}</td></tr>
            <tr><td>Delivery</td><td>{form.delivery}</td></tr>
            <tr><td>Sub Total</td><td>{subTotal.toFixed(2)}</td></tr>
            <tr><td>Sales Tax 15%</td><td>{salesTax.toFixed(2)}</td></tr>
            <tr><td>Total</td><td>{total.toFixed(2)}</td></tr>
            <tr><td>Total Charge</td><td>{totalCharge.toFixed(2)}</td></tr>
            <tr><td>طريقة الدفع</td><td>{form.paymentMethod}</td></tr>
            <tr><td>CDW</td><td>{form.cdw} ({form.cdwAccept ? "✓" : "✗"})</td></tr>
          </tbody>
        </table>
        <div className="notes">
          <div className="ar-note">
            <h2>  ملاحظات : </h2>
            <p>1- في حالة الحادث يتم تحرير محضر فورا لدى قسم الشرطة ويقوم المستأجر بدفع 3000 يورو إلى مكتب ستار كار لتأجير السيارات.</p>
            <p>2- يجب على المستأجر أن يحتفظ بعقد الإيجار وجميع مستندات السيارة بكفاءة داخل السيارة وفي حالة مخالفة المستأجر لذلك يتحمل وحده وليس غيره جميع الالتزامات المالية والشرعية تجاه الجهات الحكومية.</p>
            <p>3- في حالة فقدان الرخصة أو سحبها من قبل الجهات المختصة فعلى المستأجر الإبلاغ فورا لمكتب ستار كار لتأجير السيارات ويدفع 150 يورو.</p>
            <p>4- لا يعتمد السداد إلا بموجب إيصال مختوم بختم الشركة.</p>
          </div>
          <div className="en-note">
            <h2>Notes : </h2>
           <p>1- In case of accident the renter responsible to register the case with the police immediately, obtain police report and pay €3000 to Star Car Office for Rent Cars.</p> <p>2- It’s necessary for the renter to keep the rental agreement and all car documents efficiently inside the car and if the renter contravene this, he will assume himself not other one all financial due & jurist liability to Government organization.</p> <p>3- In case of car license lost or withdrawn the renter has to report immediately to Star Car Office for Rent Cars and pay €150 as a penalty.</p> <p>4- Payment is approved only with stamped company receipt.</p>
          </div>
        </div>
          <div className="signatures" style={{direction: "ltr"}}> 
            <p>Full Name: ____________________________________</p> <p>Signature: ____________________________________</p> </div>

      </div>

      <button onClick={downloadPDF} style={{ marginRight: "12px" }}>تحميل PDF</button>
      <button onClick={goBack}>تعديل البيانات</button>
    </div>
  );
}
