import React from "react";
import SignaturePad from "./SignaturePad";

export default function InputsPanel({
  form,
  setForm,
  onAddRow,
  onRemoveRow,
  onUpdateRow,
  onLogoUpload,
  onReset,
  onNextInvoiceNo,
  onPrint,
}) {
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  return (
    <div className="panel no-print">
      <div className="panel-title">Invoice Inputs</div>
{/* 
      <Field label="Company Name">
        <input className="input" name="companyName" value={form.companyName} onChange={onChange} />
      </Field>

      <Field label="Company Address">
        <input className="input" name="companyAddress" value={form.companyAddress} onChange={onChange} />
      </Field> */}

      {/* <div className="grid2">
        <Field label="Phone">
          <input className="input" name="phone" value={form.phone} onChange={onChange} />
        </Field>
        <Field label="Email">
          <input className="input" name="email" value={form.email} onChange={onChange} />
        </Field>
      </div> */}

      <div style={{ marginBottom: 10 }}>
  <div className="label">Company (Fixed)</div>
  <div style={{ fontSize: 13, lineHeight: 1.5 }}>
    <b>{form.companyName}</b>
    <div>{form.companyAddress}</div>
    <div>
      Ph - {form.phone} &nbsp;&nbsp; Mail - {form.email}
    </div>
  </div>
</div>


      <div className="grid3">
        <Field label="Invoice No">
          <input className="input" name="invoiceNo" value={form.invoiceNo} onChange={onChange} />
        </Field>
        <Field label="Invoice Date">
          <input className="input" name="invoiceDate" value={form.invoiceDate} onChange={onChange} />
        </Field>
        <Field label="Vehicle No">
          <input className="input" name="vehicleNo" value={form.vehicleNo} onChange={onChange} />
        </Field>
      </div>

      <Field label="TO (multiline)">
        <textarea className="input textarea" name="toText" value={form.toText} onChange={onChange} />
      </Field>

      <div className="row-head">
        <div className="label">Trip Rows</div>
        <button type="button" className="btn" onClick={onAddRow}>
          + Add Row
        </button>
      </div>

      <div className="rows">
        {form.items.map((row, idx) => (
          <div key={row.id} className="row-card">
            <div className="grid2">
              <Field label="Pickup">
                <input
                  className="input"
                  value={row.pickup}
                  onChange={(e) => onUpdateRow(row.id, { pickup: e.target.value })}
                />
              </Field>
              <Field label="Drop">
                <input
                  className="input"
                  value={row.drop}
                  onChange={(e) => onUpdateRow(row.id, { drop: e.target.value })}
                />
              </Field>
            </div>

            <div className="grid3">
              <Field label="Qty">
                <input
                  className="input"
                  inputMode="numeric"
                  value={row.qty}
                  onChange={(e) => onUpdateRow(row.id, { qty: e.target.value })}
                />
              </Field>
              <Field label="Rate">
                <input
                  className="input"
                  inputMode="numeric"
                  value={row.rate}
                  onChange={(e) => onUpdateRow(row.id, { rate: e.target.value })}
                />
              </Field>

              <div className="row-actions">
                <button
                  type="button"
                  className="btn danger"
                  onClick={() => onRemoveRow(row.id)}
                  disabled={form.items.length === 1}
                  title={form.items.length === 1 ? "At least 1 row required" : "Remove row"}
                >
                  Remove
                </button>
                <div className="hint">Row #{idx + 1}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <Field label="Logo (optional)">
        <input type="file" accept="image/*" onChange={onLogoUpload} />
      </Field> */}

      <Field label="Signature (Touch / Mouse)">
        <SignaturePad
          value={form.signaturePng}
          onChange={(png) => setForm((p) => ({ ...p, signaturePng: png }))}
        />
      </Field>

      <div className="panel-actions">
        <button className="btn primary" type="button" onClick={onPrint}>
          Download / Print PDF
        </button>
        {/* <button className="btn" type="button" onClick={onNextInvoiceNo}>
          Next Invoice No
        </button> */}
        <button className="btn" type="button" onClick={onReset}>
          Reset
        </button>
      </div>

      <div className="tip">
        Click <b>Download / Print PDF</b> → choose <b>Save as PDF</b>.
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="field">
      <div className="label">{label}</div>
      {children}
    </div>
  );
}
