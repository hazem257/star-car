import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputForm from "./components/InputForm";
import PreviewAgreement from "./components/PreviewAgreement";

export default function App() {
  const [form, setForm] = useState({
    contractNo: "00213",
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
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputForm form={form} setForm={setForm} />} />
        <Route path="/preview" element={<PreviewAgreement form={form} setForm={setForm} />} />
      </Routes>
    </Router>
  );
}
