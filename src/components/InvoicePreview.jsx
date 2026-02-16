import React from "react";
import { calcGrandTotal, formatINR, splitLines } from "../utils/helpers";

const InvoicePreview = React.forwardRef(function InvoicePreview({ data }, ref) {
  const grandTotal = calcGrandTotal(data.items);

  return (
    <div ref={ref} className="invoice-page">
      {/* Header */}
      <div className="inv-header">
        <div className="inv-logo">
          {data.logoUrl ? (
            <img src={data.logoUrl} alt="logo" />
          ) : (
            <div className="inv-logo-placeholder">LOGO</div>
          )}
        </div>

        <div className="inv-company">
          <div className="inv-company-name">{data.companyName}</div>
          <div className="inv-company-line">{data.companyAddress}</div>
          <div className="inv-company-line">
            Ph - {data.phone} &nbsp;&nbsp; Mail - {data.email}
          </div>
        </div>
      </div>

      <div className="inv-title">INVOICE</div>

      {/* Meta */}
      <div className="inv-meta">
        <div className="inv-meta-col">
          <div className="inv-meta-label">INVOICE NO</div>
          <div className="inv-meta-value">{data.invoiceNo}</div>
        </div>
        <div className="inv-meta-col">
          <div className="inv-meta-label">INVOICE DATE</div>
          <div className="inv-meta-value">{data.invoiceDate}</div>
        </div>
        <div className="inv-meta-col">
          <div className="inv-meta-label">VEHICLE NO</div>
          <div className="inv-meta-value">{data.vehicleNo}</div>
        </div>
      </div>

      {/* TO */}
      <div className="inv-to">
        <div className="inv-to-label">TO</div>
        <div className="inv-to-text">
          {splitLines(data.toText).map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="inv-table">
        <div className="inv-tr inv-th">
          <div className="c pickup">Pickup Place</div>
          <div className="c drop">Drop Place</div>
          <div className="c qty right">Descrpition</div>
          <div className="c rate right">Rate</div>
          <div className="c total right">Total</div>
        </div>

        {data.items.map((it) => (
          <div className="inv-tr" key={it.id}>
            <div className="c pickup">{it.pickup}</div>
            <div className="c drop">{it.drop}</div>
            <div className="c qty right">{it.Descrpition
}</div>
            <div className="c rate right">{formatINR(it.rate)}</div>
            <div className="c total right">{formatINR(it.total)}</div>
          </div>
        ))}
      </div>

      {/* Grand Total */}
      <div className="inv-grand">
        <div className="inv-grand-label">TOTAL</div>
        <div className="inv-grand-value">{formatINR(grandTotal)}</div>
      </div>

      {/* Signature */}
      <div className="inv-sign">
        {data.signaturePng ? (
          <img className="inv-sign-img" src={data.signaturePng} alt="signature" />
        ) : (
          <div className="inv-sign-line">Signature</div>
        )}
        <div className="inv-sign-name">{data.companyName}</div>
      </div>
    </div>
  );
});

export default InvoicePreview;
