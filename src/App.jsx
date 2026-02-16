import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import InputsPanel from "./components/InputsPanel";
import InvoicePreview from "./components/InvoicePreview";
import { calcRowTotal, uid } from "./utils/helpers";
import "./App.css"
import cabslogo from "./assets/cabslogo.jpg";


const LS_KEY = "cab_invoice_form_v1";

const DEFAULT_FORM = {
  // ✅ Fixed company data
  companyName: "Thirumala Cabs Services",
  companyAddress: "No , 82, Nandha Majestic Avenue, Athur, Chengalpattu",
  phone: "8072320873",
  email: "thirumalacabservices@gmail.com",

  // ✅ Fixed default logo
  logoUrl: cabslogo,

  // ✅ Empty fields
  invoiceNo: "INV-0",
  invoiceDate: "",
  vehicleNo: "",
  toText: "",
  signaturePng: "",

  items: [
    { id: uid(), pickup: "", drop: "", Descrpition:"", rate: "", total: 0 },
  ],
};


export default function App() {
  const printRef = useRef(null);

  const [form, setForm] = useState(DEFAULT_FORM);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      // small safety: ensure at least 1 row
      if (!parsed.items?.length) parsed.items = DEFAULT_FORM.items;
      setForm(parsed);
    } catch {
      // ignore
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(form));
  }, [form]);

  const data = useMemo(() => {
    // Convert items to computed totals (ensure numbers)
    const computedItems = form.items.map((it) => {
      const total = calcRowTotal(it.rate, it.qty);
      return {
        ...it,
        rate: Number(it.rate || 0),
        total: Number(total || 0),
      };
    });

    return {
      ...form,
      items: computedItems,
    };
  }, [form]);

  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  //   documentTitle: `Invoice-${data.invoiceNo}`,
  // });

  const handlePrint = useReactToPrint({
  contentRef: printRef,
  documentTitle: `Invoice-${data.invoiceNo || "NEW"}`,
});


  const onAddRow = () => {
    setForm((p) => ({
      ...p,
      items: [
        ...p.items,
        { id: uid(), pickup: "", drop: "", Descrpition: "", rate: "0", total: 0 },
      ],
    }));
  };

  const onRemoveRow = (id) => {
    setForm((p) => ({
      ...p,
      items: p.items.length === 1 ? p.items : p.items.filter((x) => x.id !== id),
    }));
  };

  const onUpdateRow = (id, patch) => {
    setForm((p) => ({
      ...p,
      items: p.items.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }));
  };

  const onLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((p) => ({ ...p, logoUrl: url }));
  };

  // const onReset = () => {
  //   localStorage.removeItem(LS_KEY);
  //   setForm({
  //     ...DEFAULT_FORM,
  //     items: [{ ...DEFAULT_FORM.items[0], id: uid() }],
  //   });
  // };


  const onReset = () => {
  localStorage.removeItem(LS_KEY);
  setForm({
    ...DEFAULT_FORM,
    items: [{ ...DEFAULT_FORM.items[0], id: uid() }],
  });
};



  const onNextInvoiceNo = () => {
    setForm((p) => ({
      ...p,
      invoiceNo: String(Number(p.invoiceNo || 0) + 1),
    }));
  };

  return (
    <div className="app">


      <div className="layout">

          <div ref={printRef}>
        <InputsPanel
          form={form}
          setForm={setForm}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onUpdateRow={onUpdateRow}
          onLogoUpload={onLogoUpload}
          onReset={onReset}
          onNextInvoiceNo={onNextInvoiceNo}
          onPrint={handlePrint}
        />
</div>
        <div className="preview-wrap">
          <div className="preview-title">Live Preview</div>
          <InvoicePreview ref={printRef} data={data} />
        </div>
      </div>
    </div>
  );
}
