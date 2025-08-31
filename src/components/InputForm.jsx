// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; 
import Swal from "sweetalert2";

import "./form.css";

export default function InputForm({ form, setForm }) {
  const navigate = useNavigate();
  const { id } = useParams(); // لو تعديل
  const [selectedImage, setSelectedImage] = useState(null);

  const formatContractNo = (num) => num.toString().padStart(6, "0"); // 000001

  // ✅ عند التحميل
  useEffect(() => {
    const contracts = JSON.parse(localStorage.getItem("contracts")) || [];

    if (id) {
      // تعديل: تحميل العقد من التخزين
      const found = contracts.find((c) => c.id === id);
      if (found) setForm(found);
    } else {
      // عقد جديد: نجهز رقم جديد و id
      const nextContractNo = contracts.length + 1;
      setForm((prev) => ({
        ...prev,
        id: uuidv4(),
        contractNo: formatContractNo(nextContractNo),
      }));
    }
  }, [id, setForm]);

  const onChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setForm((prev) => ({
            ...prev,
            [name]: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // ✅ حفظ / تحديث العقد
const saveContract = () => {
  const contracts = JSON.parse(localStorage.getItem("contracts")) || [];
  const existsIndex = contracts.findIndex((c) => c.id === form.id);

  if (existsIndex !== -1) {
    contracts[existsIndex] = form; // تعديل
  } else {
    contracts.push({ ...form, id: form.id || uuidv4() }); // إضافة
  }

  localStorage.setItem("contracts", JSON.stringify(contracts));

  Swal.fire({
    title: "✅ تم حفظ العقد",
    text: "تم حفظ العقد بنجاح ويمكنك معاينته الآن.",
    icon: "success",
    confirmButtonText: "حسناً",
  }).then(() => {
    navigate(`/preview/${form.id}`);
  });
};
const dashboard = () => {
  navigate("/dashboard");
};
const returnHome = () => {
  navigate("/");
};

  return (
    <div className="page-wrapper" style={{ direction: "rtl" }}>
      <h2>{id ? "✏️ تعديل العقد" : "➕ عقد جديد"}</h2>

      {/* بيانات العميل */}
      <div className="form-section">
        <h3>📌 بيانات العميل</h3>
        <label>رقم العقد</label>
        <input name="contractNo" value={form.contractNo || ""} readOnly />

        <label>الاسم</label>
        <input name="name" value={form.name || ""} onChange={onChange} />

        <label>الشركة</label>
        <input name="company" value={form.company || ""} onChange={onChange} />

        <label>الهاتف 1</label>
        <input name="phone1" value={form.phone1 || ""} onChange={onChange} />

        <label>الهاتف 2</label>
        <input name="phone2" value={form.phone2 || ""} onChange={onChange} />

        <label>العنوان - المنزل</label>
        <input name="homeAddress" value={form.homeAddress || ""} onChange={onChange} />

        <label>العنوان الحالي</label>
        <input name="currentAddress" value={form.currentAddress || ""} onChange={onChange} />

        <label>الجنسية</label>
        <input name="nationality" value={form.nationality || ""} onChange={onChange} />

        <label>تاريخ الميلاد</label>
        <input type="date" name="dob" value={form.dob || ""} onChange={onChange} />
      </div>

      {/* صور الهوية */}
    <div className="form-section">
  <h3>🖼️ صور الهوية</h3>
  <div className="image-upload-wrapper">
    
    {/* صورة البطاقة الأمامية */}
    <div className="image-card">
      <label htmlFor="idImage">صورة البطاقة الأمامية</label>
      <input id="idImage" type="file" name="idImage" accept="image/*" onChange={onChange} />
      {form.idImage ? (
        <img
          src={form.idImage}
          alt="صورة البطاقة الأمامية"
          className="image-preview"
          onClick={() => setSelectedImage(form.idImage)}
        />
      ) : (
        <p>📷 لم يتم رفع صورة</p>
      )}
    </div>

    {/* صورة البطاقة الخلفية */}
    <div className="image-card">
      <label htmlFor="idbackImage">صورة البطاقة الخلفية</label>
      <input id="idbackImage" type="file" name="idbackImage" accept="image/*" onChange={onChange} />
      {form.idbackImage ? (
        <img
          src={form.idbackImage}
          alt="صورة البطاقة الخلفية"
          className="image-preview"
          onClick={() => setSelectedImage(form.idbackImage)}
        />
      ) : (
        <p>📷 لم يتم رفع صورة</p>
      )}
    </div>

    {/* صورة الرخصة الأمامية */}
    <div className="image-card">
      <label htmlFor="licensefrontImage">صورة الرخصة الأمامية</label>
      <input id="licensefrontImage" type="file" name="licensefrontImage" accept="image/*" onChange={onChange} />
      {form.licensefrontImage ? (
        <img
          src={form.licensefrontImage}
          alt="صورة الرخصة الأمامية"
          className="image-preview"
          onClick={() => setSelectedImage(form.licensefrontImage)}
        />
      ) : (
        <p>📷 لم يتم رفع صورة</p>
      )}
    </div>

    {/* صورة الرخصة الخلفية */}
    <div className="image-card">
      <label htmlFor="licensebackImage">صورة الرخصة الخلفية</label>
      <input id="licensebackImage" type="file" name="licensebackImage" accept="image/*" onChange={onChange} />
      {form.licensebackImage ? (
        <img
          src={form.licensebackImage}
          alt="صورة الرخصة الخلفية"
          className="image-preview"
          onClick={() => setSelectedImage(form.licensebackImage)}
        />
      ) : (
        <p>📷 لم يتم رفع صورة</p>
      )}
    </div>

  </div>
</div>


      {/* الباسبور */}
      <div className="form-section">
        <h3>🛂 بيانات الباسبور</h3>
        <label>رقم الباسبور</label>
        <input name="passportNo" value={form.passportNo || ""} onChange={onChange} />

        <label>انتهاء الباسبور</label>
        <input type="date" name="passportExpiry" value={form.passportExpiry || ""} onChange={onChange} />
      </div>

      {/* الرخصة */}
      <div className="form-section">
        <h3>🚘 بيانات الرخصة</h3>
        <label>رقم الرخصة</label>
        <input name="licenseNo" value={form.licenseNo || ""} onChange={onChange} />

        <label>تاريخ الإصدار</label>
        <input type="date" name="licenseIssue" value={form.licenseIssue || ""} onChange={onChange} />

        <label>انتهاء الرخصة</label>
        <input type="date" name="licenseExpiry" value={form.licenseExpiry || ""} onChange={onChange} />

        <label>صادرة من</label>
        <input name="issuedBy" value={form.issuedBy || ""} onChange={onChange} />
      </div>

      {/* سائق إضافي */}
      <div className="form-section">
        <h3>👨‍✈️ سائق إضافي</h3>
        <label>اسم السائق</label>
        <input name="additionalDriver" value={form.additionalDriver || ""} onChange={onChange} />

        <label>باسبور السائق</label>
        <input name="additionalPassportNo" value={form.additionalPassportNo || ""} onChange={onChange} />

        <label>انتهاء رخصة السائق</label>
        <input type="date" name="additionalLicenseExpiry" value={form.additionalLicenseExpiry || ""} onChange={onChange} />

        <label>تاريخ الإصدار الإضافي</label>
        <input type="date" name="additionalDateOfIssue" value={form.additionalDateOfIssue || ""} onChange={onChange} />
      </div>

      {/* السيارة */}
      <div className="form-section">
        <h3>🚗 بيانات السيارة</h3>
        <label>Vehicle No</label>
        <input name="carVehicleNo" value={form.carVehicleNo || ""} onChange={onChange} />

        <label>Group</label>
        <input name="carGroup" value={form.carGroup || ""} onChange={onChange} />

        <label>Model</label>
        <input name="carModel" value={form.carModel || ""} onChange={onChange} />

        <label>Driver</label>
        <input name="driver" value={form.driver || ""} onChange={onChange} />
      </div>

      {/* الاستئجار */}
      <div className="form-section">
        <h3>📅 تفاصيل الاستئجار</h3>
        <label>تاريخ الخروج</label>
        <input type="date" name="dateOut" value={form.dateOut || ""} onChange={onChange} />

        <label>تاريخ العودة</label>
        <input type="date" name="dateIn" value={form.dateIn || ""} onChange={onChange} />

        <label>تاريخ العودة المتوقع</label>
        <input type="date" name="expectedReturnDate" value={form.expectedReturnDate || ""} onChange={onChange} />
<label>كم (OUT)</label>
        <input name="kmOut" value={form.kmOut || ""} onChange={onChange} />

        <label>كم (IN)</label>
        <input name="kmIn" value={form.kmIn || ""} onChange={onChange} />

        <label>كم (مستخدم)</label>
        <input name="driversKm" value={form.driversKm || ""} onChange={onChange} />

        <label>كم (البدل)</label>
        <input name="allowance" value={form.allowance || ""} onChange={onChange} />

        <label>كم (زيادة)</label>
        <input name="kmIncrease" value={form.kmIncrease || ""} onChange={onChange} />
      </div>

      {/* الدفع */}
      <div className="form-section">
        <h3>💳 طريقة الدفع</h3>
        <label>Payment Method</label>
        <select name="paymentMethod" value={form.paymentMethod || ""} onChange={onChange}>
          <option value="">اختر</option>
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
          <option value="cheque">Cheque</option>
        </select>

        <label>CDW</label>
        <input name="cdw" value={form.cdw || ""} onChange={onChange} />

        <label>
          <input type="checkbox" name="cdwAccept" checked={form.cdwAccept || false} onChange={onChange} /> قبول CDW
        </label>
      </div>

      {/* عرض الصورة في مودال */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <span className="close-btn">×</span>
          <img src={selectedImage} alt="عرض كامل" className="modal-content" />
        </div>
      )}

      {/* الأزرار */}
      <div className="btn-cont" style={{ marginTop: "20px" }}>
        <button onClick={saveContract}>💾 حفظ + معاينة العقد</button>
        <button onClick={dashboard}>Dashboard</button>
        <button onClick={returnHome}>اضافة عقد جديد</button>
      </div>
    </div>
  );
}
