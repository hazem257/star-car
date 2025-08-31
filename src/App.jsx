// @ts-nocheck
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import InputForm from "./components/InputForm";
import PreviewAgreement from "./components/PreviewAgreement";
import LoginPage from "./components/admin/Admin";
import EditAgreement from "./components/dashboard/EditAgreement";
import Dashboard from "./components/dashboard/CarDashboard";
import { v4 as uuidv4 } from "uuid"; // لتوليد معرف فريد
export default function App() {
  const [form, setForm] = useState({
    id: uuidv4(),
    contractNo: "",
    name: "",
    company: "",
    homeAddress: "",
    currentAddress: "",
    phone1: "",
    phone2: "",
    nationality: "",
    dob: "",
    passportNo: "",
    passportExpiry: "",
    licenseNo: "",
    licenseIssue: "",
    licenseExpiry: "",
    issuedBy: "",
    additionalDriver: "",
    additionalPassportNo: "",
    additionalLicenseExpiry: "",
    additionalDateOfIssue: "",
    additionalExpiryDate: "",
    carVehicleNo: "",
    carGroup: "",
    carModel: "",
    dateOut: "",
    timeOut: "",
    dateIn: "",
    timeIn: "",
    kmIn: "",
    kmOut: "",
    driver: "",
    allowance: "",
    monthlyRate: "",
    weeklyRate: "",
    dailyRate: "",
    hourRate: "",
    delivery: "",
    paymentMethod: "",
    cdw: "",
    cdwAccept: false,
    approval: "",
    approval2: "",
    chequeNumber: "",
    bankName: "",
    idImage: "",
    licenseImage: "",
  });

  // ✅ تسجيل الدخول
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        
        <Route
          path="/"
          element={isLoggedIn ? <InputForm form={form} setForm={setForm} /> : <Navigate to="/login" />}
        />
        <Route
          path="/preview/:id"
          element={isLoggedIn ? <PreviewAgreement /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/edit/:id" element={<EditAgreement />} />

      </Routes>
    </Router>
  );
}
