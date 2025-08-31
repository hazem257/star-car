// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputForm from "../InputForm";

export default function EditAgreement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  // 🟢 تحميل بيانات العقد الحالي
  useEffect(() => {
    const contracts = JSON.parse(localStorage.getItem("contracts")) || [];
    const found = contracts.find((c) => c.id === id);
    if (found) {
      setForm(found);
    } else {
      alert("❌ العقد غير موجود");
      navigate("/dashboard");
    }
  }, [id, navigate]);

  // 🟢 حفظ التعديلات
  const saveEdits = () => {
    const contracts = JSON.parse(localStorage.getItem("contracts")) || [];
    const updatedContracts = contracts.map((c) =>
      c.id === id ? { ...form } : c
    );
    localStorage.setItem("contracts", JSON.stringify(updatedContracts));

    alert("✅ تم حفظ التعديلات");
    navigate(`/preview/${id}`);
  };

  if (!form) return <p>⏳ جاري تحميل بيانات العقد...</p>;

  return (
    <div style={{ padding: "2rem", direction: "rtl" }}>
      <h2>✏️ تعديل العقد</h2>
      <InputForm form={form} setForm={setForm} />
      <button
        onClick={saveEdits}
        style={{
          marginTop: "20px",
          background: "#0d6efd",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "8px",
        }}
      >
        💾 حفظ التعديلات
      </button>
    </div>
  );
}
