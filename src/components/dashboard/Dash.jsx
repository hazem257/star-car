// @ts-nocheck
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  // تحميل العقود من localStorage
  useEffect(() => {
    const savedContracts = JSON.parse(localStorage.getItem("contracts")) || [];
    setContracts(savedContracts);
  }, []);

  const viewContract = (id) => {
    navigate(`/preview/${id}`);
  };

  const deleteContract = (id) => {
    if (window.confirm("هل أنت متأكد من حذف العقد؟")) {
      const updated = contracts.filter((c, i) => i !== id);
      setContracts(updated);
      localStorage.setItem("contracts", JSON.stringify(updated));
    }
  };

  return (
    <div className="dashboard">
      <h2>📋 لوحة التحكم - العقود</h2>
      <button className="new-btn" onClick={() => navigate("/")}>
        ➕ عقد جديد
      </button>

      {contracts.length === 0 ? (
        <p>لا توجد عقود محفوظة</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>رقم العقد</th>
              <th>اسم العميل</th>
              <th>تاريخ الإنشاء</th>
              <th>إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{c.contractNo}</td>
                <td>{c.name}</td>
                <td>{c.createdAt || new Date().toLocaleDateString()}</td>
                <td>
                  <button onClick={() => viewContract(index)}>👁️ عرض</button>
                  <button onClick={() => deleteContract(index)}>🗑️ حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
