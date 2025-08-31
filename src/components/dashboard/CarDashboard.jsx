// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // استيراد SweetAlert2

export default function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedContracts = JSON.parse(localStorage.getItem("contracts")) || [];
    setContracts(savedContracts);
  }, []);

  // 🟢 حذف العقد مع SweetAlert2
  const deleteContract = (id) => {
    Swal.fire({
      title: "⚠️ هل أنت متأكد من حذف العقد؟",
      text: "لن تتمكن من التراجع عن الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف!",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = contracts.filter((c) => c.id !== id);
        setContracts(updated);
        localStorage.setItem("contracts", JSON.stringify(updated));

        Swal.fire({
          title: "تم الحذف!",
          text: "تم حذف العقد بنجاح.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  if (contracts.length === 0) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", direction: "rtl" }}>
        <h2>📂 لا يوجد عقود محفوظة</h2>
        <button
          onClick={() => navigate("/")}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#0d6efd",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          ➕ إضافة عقد جديد
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", direction: "rtl" }}>
      <h2>📋 لوحة العقود</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ background: "#f1f1f1" }}>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>رقم العقد</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>الاسم</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>الشركة</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>الهاتف</th>
            <th style={{ border: "1px solid #ddd", padding: "10px" }}>إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map((c) => (
            <tr key={c.id}>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{c.contractNo}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{c.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{c.company}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>{c.phone1}</td>
              <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                <button
                  onClick={() => navigate(`/preview/${c.id}`)}
                  style={{
                    marginRight: "5px",
                    background: "#198754",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "6px",
                  }}
                >
                  👁️ معاينة
                </button>
                <button
                  onClick={() => navigate(`/edit/${c.id}`)}
                  style={{
                    marginRight: "5px",
                    background: "#0d6efd",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "6px",
                  }}
                >
                  ✏️ تعديل
                </button>
                <button
                  onClick={() => deleteContract(c.id)}
                  style={{
                    background: "#dc3545",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "6px",
                  }}
                >
                  🗑️ حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
