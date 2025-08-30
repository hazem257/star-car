import React from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

export default function InputForm({ form, setForm }) {
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const goPreview = () => {
    navigate("/preview");
  };

  return (
    <div className="page-wrapper" style={{ direction: "rtl" }}>
      <h2>نموذج الإدخال</h2>

      {/* بيانات العميل */}
      <div className="form-section">
        <h3>📌 بيانات العميل</h3>
        <div>
          <label>رقم العقد</label>
          <input name="contractNo" value={form.contractNo} onChange={onChange} />

          <label>الاسم</label>
          <input name="name" value={form.name} onChange={onChange} />

          <label>الشركة</label>
          <input name="company" value={form.company} onChange={onChange} />

          <label>الهاتف 1</label>
          <input name="phone1" value={form.phone1} onChange={onChange} />

          <label>الهاتف 2</label>
          <input name="phone2" value={form.phone2} onChange={onChange} />

          <label>العنوان - المنزل</label>
          <input name="homeAddress" value={form.homeAddress} onChange={onChange} />

          <label>العنوان الحالي</label>
          <input name="currentAddress" value={form.currentAddress} onChange={onChange} />

          <label>الجنسية</label>
          <input name="nationality" value={form.nationality} onChange={onChange} />

          <label>تاريخ الميلاد</label>
          <input type="date" name="dob" value={form.dob} onChange={onChange} />
        </div>
      </div>

      {/* بيانات الباسبور */}
      <div className="form-section">
        <h3>🛂 بيانات الباسبور</h3>
        <div>
          <label>رقم الباسبور</label>
          <input name="passportNo" value={form.passportNo} onChange={onChange} />

          <label>انتهاء الباسبور</label>
          <input type="date" name="passportExpiry" value={form.passportExpiry} onChange={onChange} />
        </div>
      </div>

      {/* بيانات الرخصة */}
      <div className="form-section">
        <h3>🚘 بيانات الرخصة</h3>
        <div>
          <label>رقم الرخصة</label>
          <input name="licenseNo" value={form.licenseNo} onChange={onChange} />

          <label>تاريخ الإصدار</label>
          <input type="date" name="licenseIssue" value={form.licenseIssue} onChange={onChange} />

          <label>انتهاء الرخصة</label>
          <input type="date" name="licenseExpiry" value={form.licenseExpiry} onChange={onChange} />

          <label>صادرة من</label>
          <input name="issuedBy" value={form.issuedBy} onChange={onChange} />
        </div>
      </div>

      {/* سائق إضافي */}
      <div className="form-section">
        <h3>👨‍✈️ سائق إضافي</h3>
        <div>
          <label>اسم السائق</label>
          <input name="additionalDriver" value={form.additionalDriver} onChange={onChange} />

          <label>باسبور السائق</label>
          <input name="additionalPassportNo" value={form.additionalPassportNo} onChange={onChange} />

          <label>انتهاء رخصة السائق</label>
          <input type="date" name="additionalLicenseExpiry" value={form.additionalLicenseExpiry} onChange={onChange} />

          <label>تاريخ الإصدار الإضافي</label>
          <input type="date" name="additionalDateOfIssue" value={form.additionalDateOfIssue} onChange={onChange} />
        </div>
      </div>

      {/* بيانات السيارة */}
      <div className="form-section">
        <h3>🚗 بيانات السيارة</h3>
        <div>
          <label>Vehicle No</label>
          <input name="carVehicleNo" value={form.carVehicleNo} onChange={onChange} />

          <label>Group</label>
          <input name="carGroup" value={form.carGroup} onChange={onChange} />

          <label>Model</label>
          <input name="carModel" value={form.carModel} onChange={onChange} />

          <label>Driver</label>
          <input name="driver" value={form.driver} onChange={onChange} />
        </div>
      </div>

      {/* الأسعار */}
      <div className="form-section">
        <h3> تفاصيل الاستئجار</h3>
        <div>
          <label>تاريخ الخروج</label>
          <input type="date" name="dateOut" value={form.dateOut} onChange={onChange} />
          <label>تاريخ العودة</label>
          <input type="date" name="dateIn" value={form.dateIn} onChange={onChange} />
          <label>تاريخ العودة المتوقع</label>
          <input type="date" name="expectedReturnDate" value={form.expectedReturnDate} onChange={onChange} />
          <label>كم (IN)</label>
          <input name="kmIn" value={form.kmIn} onChange={onChange} />
          <label>كم (OUT)</label>
          <input name="kmOut" value={form.kmOut} onChange={onChange} />
          <label>كم (مستخدم)</label>
          <input name="driversKm" value={form.driversKm} onChange={onChange} />
          <label>كم (البدل)</label>
          <input name="allowance" value={form.allowance} onChange={onChange} />
          <label>كم (زيادة)</label>
          <input name="kmIncrease" value={form.kmIncrease} onChange={onChange} />
        </div>
      </div>

      {/* طريقة الدفع */}
      <div className="form-section">
        <h3>💳 طريقة الدفع</h3>
        <div>
          <label>Payment Method</label>
          <select name="paymentMethod" value={form.paymentMethod} onChange={onChange}>
            <option value="">اختر</option>
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
            <option value="cheque">Cheque</option>
          </select>

          <label>CDW</label>
          <input name="cdw" value={form.cdw} onChange={onChange} />

          <label>
            <input type="checkbox" name="cdwAccept" checked={form.cdwAccept} onChange={onChange} /> قبول CDW
          </label>
        </div>
      </div>

      <button onClick={goPreview}>معاينة العقد</button>
    </div>
  );
}
