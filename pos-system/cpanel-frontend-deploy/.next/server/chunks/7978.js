"use strict";exports.id=7978,exports.ids=[7978],exports.modules={5566:(e,r,t)=>{t.a(e,async(e,o)=>{try{t.d(r,{i:()=>printReceipt});var a=t(2893),s=e([a]);a=(s.then?(await s)():s)[0];let printReceipt=({createdOrder:e,storeInfo:r,activeCurrency:t,selectedTable:o,selectedWaiter:s,changeAmount:d=0,paymentMethod:l,formatPrice:n})=>{let i=new Date().toLocaleString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",timeZone:"Asia/Karachi"}),c=r.storeName,m=r.phoneNumber,p=r.address,u=e.table_id&&o&&(o.number||o.table_number)||"",x=e.waiter_id&&s&&s.name||"",h=r.store_logo||r.logoUrl,g="paid"===e.payment_status,v=window.open("","_blank");v&&(v.document.write(`
<html>
<head>
<title>Receipt - Order #${e.order_number}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  :root {
    --background-color: #ffffff;
    --surface-color: #ffffff;
    --text-color: #1a202c;
    --text-secondary: #4a5568;
    --border-color: #e2e8f0;
    --focus-ring: #3182ce;
    --error-color: #e53e3e;
    --background-secondary: #edf2f7;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, monospace, sans-serif;
    margin: 0;
    padding: 6px;
    font-size: 10px;
    line-height: 1.2;
    color: var(--text-color);
    background: var(--background-color);
  }

  .receipt-container {
    max-width: 72mm;
    margin: 0 auto;
    background: var(--surface-color);
    padding: 6px;
    border: 1px solid var(--border-color);
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
    padding-bottom: 6px;
    border-bottom: 1px solid var(--border-color);
    gap: 8px;
  }

  .store-logo {
    width: 35px;
    height: 35px;
    object-fit: contain;
    flex-shrink: 0;
  }

  .store-name {
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: center;
    color: var(--text-color);
  }

  .order-header {
    text-align: center;
    margin: 6px 0;
    font-weight: 700;
    font-size: 12px;
    padding-bottom: 3px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-color);
  }

  .order-details {
    font-size: 9px;
    margin: 6px 0;
    line-height: 1.2;
    color: var(--text-secondary);
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    margin: 1px 0;
    padding: 1px 0;
  }

  .detail-row span:first-child {
    font-weight: 600;
  }

  .completion-time {
    text-align: center;
    font-weight: 700;
    margin: 6px 0;
    font-size: 9px;
    border: 1px solid var(--border-color);
    padding: 4px;
    background: var(--background-secondary);
  }

  .items-section {
    margin: 6px 0;
    padding-bottom: 3px;
  }

  .items-header {
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 3px;
    padding-bottom: 2px;
  }

  .items-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 9px;
  }

  .items-table th {
    padding: 2px;
    text-align: left;
    font-weight: 700;
    color: var(--text-color);
  }

  .items-table td {
    padding: 2px;
    vertical-align: top;
    color: var(--text-secondary);
  }

  .item-name {
    max-width: 100px;
    word-wrap: break-word;
  }

  .item-center {
    text-align: center;
    width: 25px;
  }

  .item-right {
    text-align: right;
    width: 40px;
  }

  .total-section {
    margin: 6px 0;
    padding-top: 3px;
    border-top: 1px solid var(--border-color);
  }

  .total-row {
    display: flex;
    justify-content: space-between;
    margin: 1px 0;
    font-size: 10px;
    padding: 1px 0;
    color: var(--text-color);
  }

  .total-row.grand-total {
    font-weight: 700;
    font-size: 12px;
    border-top: 1px solid var(--border-color);
    padding-top: 3px;
    margin-top: 3px;
  }

  .payment-info {
    text-align: center;
    font-size: 9px;
    margin: 4px 0;
    font-weight: 700;
    border: 1px solid var(--border-color);
    padding: 3px;
    background: var(--background-secondary);
    color: var(--text-color);
  }

  .thank-you {
    text-align: center;
    font-weight: 700;
    font-size: 10px;
    margin: 8px 0;
    text-transform: uppercase;
    color: var(--text-color);
  }

  .footer {
    text-align: center;
    font-size: 8px;
    margin-top: 8px;
    padding-top: 6px;
    border-top: 1px solid var(--border-color);
    color: var(--text-secondary);
  }

  .store-contact {
    font-size: 8px;
    margin-top: 3px;
    line-height: 1.2;
  }

  .divider {
    text-align: center;
    margin: 6px 0;
    font-size: 10px;
    font-weight: 700;
    color: var(--text-color);
  }

  @media print {
    body {
      margin: 0;
      padding: 0;
    }
    .receipt-container {
      max-width: none;
      width: 100%;
    }
  }
</style>
</head>
<body>
<div class="receipt-container">
  <div class="header">
    ${h?`<img src="${h}" class="store-logo" alt="Store Logo" />`:""}
    <div class="store-name">${c}</div>
  </div>

  <div class="order-header">
    ORDER #${e.order_number}
  </div>

  <div class="order-details">
    <div class="detail-row">
      <span>Date:</span>
      <span>${i}</span>
    </div>
    <div class="detail-row">
      <span>Customer:</span>
      <span>${e.customer_name}</span>
    </div>
    <div class="detail-row">
      <span>Type:</span>
      <span>${"dine_in"===e.service_type?"Dine-In":"Takeaway"}</span>
    </div>
    ${"dine_in"===e.service_type&&e.table_id&&u?`
    <div class="detail-row">
      <span>Table:</span>
      <span>${u}</span>
    </div>`:""}
    ${"dine_in"===e.service_type&&e.waiter_id&&x?`
    <div class="detail-row">
      <span>Waiter:</span>
      <span>${x}</span>
    </div>`:""}
  </div>

  ${e.estimated_completion?`
  <div class="completion-time">
    ESTIMATED COMPLETION: ${e.estimated_completion}
  </div>`:""}

  <div class="divider">----------</div>

  <div class="items-section">
    <table class="items-table">
      <thead>
        <tr class="items-header">
          <th class="item-name">Item</th>
          <th class="item-center">Qty</th>
          <th class="item-right">Price</th>
          <th class="item-right">Total</th>
        </tr>
      </thead>
      <tbody>
        ${e.items.map(e=>`
          <tr>
            <td class="item-name">${e.product_id?.name||"Unknown Item"}</td>
              <td class="item-center">${e.quantity}</td>
              <td class="item-right">${n(e.product_id?.price||0,t)}</td>
              <td class="item-right">${n(e.sub_total||0,t)}</td>

          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>

  <div class="total-section">
    <div class="total-row grand-total">
      <span>TOTAL</span>
      <span>${n(e.total_amount||0,t)}</span>
    </div>
    ${d>0&&g?`
    <div class="total-row">
      <span>Change Given:</span>
      <span>${n(d,t)}</span>
    </div>`:""}
  </div>

  ${g?`
  <div class="payment-info">
    PAYMENT CONFIRMED ✓
  </div>`:""}

  <div class="thank-you">
    THANK YOU!
  </div>

  <div class="footer">
    <div>${new Date().toLocaleDateString()} | ${c}</div>
    ${p||m?`
    <div class="store-contact">
      ${p?`${p}`:""}
      ${p&&m?"<br/>":""}
      ${m?`Tel: ${m}`:""}
    </div>`:""}
  </div>
</div>
</body>
</html>
`),v.document.close(),v.focus(),v.print(),v.close(),a.default.success("Receipt printed successfully!"))};o()}catch(e){o(e)}})},7978:(e,r,t)=>{t.a(e,async(e,o)=>{try{t.r(r),t.d(r,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var a=t(8732),s=t(2015),d=t(5338),l=t(4576),n=t(7669),i=t(2893),c=t(6044),m=t(4984),p=t(5566),u=e([n,i,p]);[n,i,p]=u.then?(await u)():u;let ParentOrderCard=({parentOrder:e,themeColors:r,activeCurrency:t})=>{var o;if(!e)return null;let getCurrencySymbol=e=>({pkr:"₨",dollar:"$",euro:"€"})[e]||"₨";return a.jsx("div",{className:"mb-4 relative",children:(0,a.jsxs)("div",{className:"rounded-lg p-4 border shadow-sm h-64",style:{backgroundColor:r.cardBackground,borderColor:r.cardBorder},children:[a.jsx("div",{className:"flex justify-between items-start mb-3",children:(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[a.jsx("div",{className:"rounded-full p-1",style:{backgroundColor:"var(--primary-color)",color:"var(--text-color-button)"},children:a.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),(0,a.jsxs)("div",{children:[a.jsx("h3",{className:"text-lg font-bold",style:{color:r.headingText},children:"Parent Order Details"}),(0,a.jsxs)("p",{className:"text-sm",style:{color:r.cardText},children:["Order #",e.order_number]})]})]})}),(0,a.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-2",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[a.jsx("div",{className:"rounded-full p-1",style:{backgroundColor:"var(--background-secondary)",color:"var(--primary-color)"},children:a.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})})}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs uppercase tracking-wide",style:{color:r.cardText},children:"Customer"}),a.jsx("p",{className:"font-semibold",style:{color:r.headingText},children:e.customer_name})]})]}),(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[a.jsx("div",{className:"rounded-full p-1",style:{backgroundColor:"var(--background-secondary)",color:"var(--primary-color)"},children:(o=e.service_type,"dine_in"===o?a.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"})}):a.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"})}))}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs uppercase tracking-wide",style:{color:r.cardText},children:"Service Type"}),a.jsx("p",{className:"font-semibold",style:{color:r.headingText},children:"dine_in"===e.service_type?"Dine-In":"Takeaway"})]})]}),e.table_id&&(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[a.jsx("div",{className:"rounded-full p-1",style:{backgroundColor:"var(--background-secondary)",color:"var(--primary-color)"},children:a.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"})})}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs uppercase tracking-wide",style:{color:r.cardText},children:"Table"}),a.jsx("p",{className:"font-semibold",style:{color:r.headingText},children:e.table_number||"N/A"})]})]}),e.waiter&&(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[a.jsx("div",{className:"rounded-full p-1",style:{backgroundColor:"var(--background-secondary)",color:"var(--primary-color)"},children:a.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})})}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs uppercase tracking-wide",style:{color:r.cardText},children:"Waiter"}),a.jsx("p",{className:"font-semibold",style:{color:r.headingText},children:e.waiter.name})]})]})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[a.jsx("div",{className:"rounded-full p-1",style:{backgroundColor:"var(--background-secondary)",color:"var(--primary-color)"},children:a.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:a.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"})})}),(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs uppercase tracking-wide",style:{color:r.cardText},children:"Total Amount"}),a.jsx("p",{className:"font-bold text-xl",style:{color:r.headingText},children:((e,r)=>{let t=getCurrencySymbol(r);return`${t}${e.toFixed(2)}`})(e.total_amount,t)},`parent-total-${t}`)]})]}),a.jsx("div",{className:"flex items-center space-x-2",children:(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs uppercase tracking-wide mb-1",style:{color:r.cardText},children:"Order Status"}),a.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-semibold border ${(e=>{switch(e?.toLowerCase()){case"pending":return"bg-yellow-100 text-yellow-800 border-yellow-200";case"processing":return"bg-blue-100 text-blue-800 border-blue-200";case"completed":return"bg-green-100 text-green-800 border-green-200";case"cancelled":return"bg-red-100 text-red-800 border-red-200";default:return"bg-gray-100 text-gray-800 border-gray-200"}})(e.status)}`,children:e.status})]})}),a.jsx("div",{className:"flex items-center space-x-2",children:(0,a.jsxs)("div",{children:[a.jsx("p",{className:"text-xs uppercase tracking-wide mb-1",style:{color:r.cardText},children:"Payment Status"}),a.jsx("span",{className:`px-2 py-1 rounded-full text-xs font-semibold border ${(e=>{switch(e?.toLowerCase()){case"paid":return"bg-green-100 text-green-800 border-green-200";case"pending":return"bg-yellow-100 text-yellow-800 border-yellow-200";case"not_paid":return"bg-red-100 text-red-800 border-red-200";default:return"bg-gray-100 text-gray-800 border-gray-200"}})(e.payment_status)}`,children:e.payment_status.replace("_"," ")})]})})]})]})]})})},__WEBPACK_DEFAULT_EXPORT__=({orderItems:e,setOrderItems:r,calculateTotalOrderAmount:t,handleCreateOrder:o,token:p,logout:u,setCustomerName:x,setServiceType:h,setSelectedTableId:g,setWaiterId:v,currentTheme:b,createdOrder:y,selectedTable:f,selectedWaiter:w,changeAmount:j=0})=>{let{user:N}=(0,m.As)(),[k,_]=(0,s.useState)({}),[C,O]=(0,s.useState)(new Set),[T,$]=(0,s.useState)(""),[S,E]=(0,s.useState)(null),[A,L]=(0,s.useState)("pkr"),[I,P]=(0,s.useState)({create:!1,fetchOrder:!1}),[z,F]=(0,s.useState)({storeName:"POS Store",phoneNumber:null,address:null}),getCurrencySymbol=e=>({pkr:"₨",dollar:"$",euro:"€"})[e]||"₨",formatPrice=(e,r)=>{let t=getCurrencySymbol(r);return`${t}${e.toFixed(2)}`},getCurrentCurrency=()=>{let e=document.documentElement.getAttribute("data-currency"),r=localStorage.getItem("appCurrency");return e||r||"pkr"};(0,s.useEffect)(()=>{let fetchStoreData=async()=>{if(!p){F({storeName:N?.store_name||N?.name||"POS Store",phoneNumber:N?.phone_number||null,address:N?.address||null,store_logo:N?.store_logo||N?.logoUrl});return}try{let e=await c.Ay.getUserDetails(p);F({storeName:e.store_name||e.name||"POS Store",phoneNumber:e.phone_number||null,address:e.address||null,store_logo:e.store_logo||e.logoUrl})}catch(e){console.error("Fetch store data error:",e),F({storeName:N?.store_name||N?.name||"POS Store",phoneNumber:N?.phone_number||null,address:N?.address||null,store_logo:N?.store_logo||N?.logoUrl})}};fetchStoreData()},[p,N]),(0,s.useEffect)(()=>{let handleCurrencyChange=e=>{console.log("AddToOrder: Received currency change event:",e.detail);let r=e.detail.currency;r&&r!==A&&(L(r),console.log("AddToOrder: Currency updated to:",r))},handleSettingsLoaded=e=>{console.log("AddToOrder: Received settings loaded event:",e.detail);let r=e.detail.currency;r&&(L(r),console.log("AddToOrder: Currency loaded as:",r))},handleForceRerender=e=>{if(console.log("AddToOrder: Received force rerender event:",e.detail),"currency"===e.detail.type){let r=e.detail.value;L(r),console.log("AddToOrder: Currency force updated to:",r)}};window.addEventListener("currencyChange",handleCurrencyChange),window.addEventListener("settingsLoaded",handleSettingsLoaded),window.addEventListener("forceRerender",handleForceRerender);let e=getCurrentCurrency();return e!==A&&(console.log("AddToOrder: Setting initial currency to:",e),L(e)),()=>{window.removeEventListener("currencyChange",handleCurrencyChange),window.removeEventListener("settingsLoaded",handleSettingsLoaded),window.removeEventListener("forceRerender",handleForceRerender)}},[A]),(0,s.useEffect)(()=>{console.log("AddToOrder: Active currency is now:",A),console.log("AddToOrder: Currency symbol:",getCurrencySymbol(A))},[A]);let M=t(),B=(0,s.useCallback)((()=>{let e;return r=>{if(clearTimeout(e),!r.trim()){E(null),_(e=>({...e,parentOrderNumber:[]}));return}e=setTimeout(async()=>{if(p){P(e=>({...e,fetchOrder:!0}));try{let e=await (0,n.P7)(p,u,r);E(e),x(e.customer_name||""),h(e.service_type||"dine_in"),g(e.table_id||null),v(e.waiter_id||null),_(e=>({...e,parentOrderNumber:[]})),i.default.success("Parent order details loaded successfully")}catch(r){E(null);let e=r instanceof Error?r.message:"Failed to fetch parent order";_(r=>({...r,parentOrderNumber:[e]})),console.error("Failed to fetch parent order:",e)}finally{P(e=>({...e,fetchOrder:!1}))}}},800)}})(),[p,u,x,h,g,v]),validateParentOrderNumber=e=>{let r=[];return e||r.push("Parent order number is required"),r},validateOrderItems=e=>{let r=[];if(e&&0!==e.length){let t=e.filter(e=>!e.quantity||e.quantity<=0);t.length>0&&r.push("All items must have a valid quantity")}else r.push("At least one item must be added to the order");return r},getFieldErrors=r=>{switch(r){case"parentOrderNumber":return validateParentOrderNumber(T);case"orderItems":return validateOrderItems(e);default:return[]}},isFormValid=()=>{let r=0===validateOrderItems(e).length,t=0===validateParentOrderNumber(T).length,o=null!==S;return r&&t&&o},handleFocus=e=>{O(r=>new Set(r).add(e)),_(r=>({...r,[e]:getFieldErrors(e)}))},handleBlur=e=>{C.has(e)&&_(r=>({...r,[e]:getFieldErrors(e)}))};(0,s.useEffect)(()=>{C.has("orderItems")&&_(r=>({...r,orderItems:validateOrderItems(e)}))},[e,C]),(0,s.useEffect)(()=>{S?.service_type==="take_away"&&(_(e=>({...e,receivedAmount:[],paymentMethod:[]})),O(e=>{let r=new Set(e);return r.delete("receivedAmount"),r.delete("paymentMethod"),r}))},[S]);let handleEnhancedCreateOrder=async()=>{O(new Set(["orderItems","parentOrderNumber"]));let r={};r.orderItems=validateOrderItems(e),r.parentOrderNumber=validateParentOrderNumber(T),_(r);let t=Object.values(r).some(e=>e.length>0);if(!t&&S){P(e=>({...e,create:!0}));try{let r={order_items:e,parent_order_number:T,customer_name:S.customer_name,service_type:S.service_type,..."take_away"===S.service_type&&{payment_method:S.payment_method,received_amount:S.received_amount}};await o(r)}catch(e){_(e=>({...e,orderItems:["Failed to process order"]})),i.default.error(e instanceof Error?e.message:"Failed to process order")}finally{P(e=>({...e,create:!1}))}}},handleOrderItemsInteraction=()=>{O(e=>new Set(e).add("orderItems"))},renderFieldErrors=e=>{let r=k[e]||[];return 0===r.length?null:a.jsx("div",{className:"mt-1 space-y-1",children:r.map((e,r)=>(0,a.jsxs)("p",{className:"text-[var(--error-color)] text-xs flex items-start",children:[a.jsx("svg",{className:"w-3 h-3 mr-1 mt-0.5 flex-shrink-0",fill:"currentColor",viewBox:"0 0 20 20",children:a.jsx("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z",clipRule:"evenodd"})}),e]},r))})};return(0,a.jsxs)("div",{className:"space-y-4",children:[a.jsx("div",{className:"rounded-lg p-3 shadow-sm",style:{backgroundColor:"var(--background-color)",border:"1px solid var(--border-color)"},children:(0,a.jsxs)("div",{className:"flex items-center mb-4",children:[a.jsx("button",{className:"mr-2",style:{color:"var(--text-secondary)"},children:a.jsx(d.A,{className:"w-5 h-5"})}),a.jsx("h3",{className:"text-lg font-semibold",style:{color:"var(--text-color)"},children:"Add to Order"})]})}),(0,a.jsxs)("div",{className:"rounded-lg p-4 shadow-sm",style:{backgroundColor:"var(--background-color)",border:"1px solid var(--border-color)"},children:[a.jsx("label",{className:"block text-sm font-medium mb-1",style:{color:"var(--text-color)"},children:"Parent Order Number *"}),(0,a.jsxs)("div",{className:"relative",children:[a.jsx("input",{type:"text",placeholder:"Enter parent order number (e.g., 1707-RPOS-002)",value:T,onChange:e=>{let{value:r}=e.target;$(r),B(r),C.has("parentOrderNumber")&&_(e=>({...e,parentOrderNumber:validateParentOrderNumber(r)}))},onFocus:()=>handleFocus("parentOrderNumber"),onBlur:()=>handleBlur("parentOrderNumber"),className:`w-full p-2 border rounded-md focus:ring-2 focus:ring-[var(--primary-color)] transition-all duration-200 ${k.parentOrderNumber&&k.parentOrderNumber.length>0?"border-[var(--error-color)] ring-1 ring-[var(--error-color)]":"border-[var(--border-color)]"}`,style:{backgroundColor:"var(--background-color)",color:"var(--text-color)"},disabled:I.fetchOrder}),I.fetchOrder&&a.jsx("div",{className:"absolute right-2 top-1/2 transform -translate-y-1/2",children:(0,a.jsxs)("svg",{className:"animate-spin h-5 w-5 text-[var(--primary-color)]",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[a.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),a.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]})})]}),renderFieldErrors("parentOrderNumber")]}),(0,a.jsxs)("div",{className:"rounded-lg p-4 shadow-sm",style:{backgroundColor:"var(--background-color)",border:"1px solid var(--border-color)"},children:[a.jsx("h3",{className:"font-semibold mb-3",style:{color:"var(--text-color)"},children:"Order Summary *"}),0===e.length?(0,a.jsxs)("div",{onClick:handleOrderItemsInteraction,className:"py-8 text-center bg-[var(--background-secondary)] rounded border border-dashed",style:{borderColor:"var(--border-color)",color:"var(--text-secondary)"},children:[a.jsx("p",{children:"No items added to the order"}),renderFieldErrors("orderItems")]}):(0,a.jsxs)("div",{className:"space-y-3",children:[(0,a.jsxs)("div",{className:"grid grid-cols-5 gap-2 text-xs font-medium uppercase tracking-wider border-b pb-2",style:{borderColor:"var(--border-color)",color:"var(--text-color)"},children:[a.jsx("div",{children:"Item"}),a.jsx("div",{className:"text-center",children:"Qty"}),a.jsx("div",{className:"text-right",children:"Price"}),a.jsx("div",{className:"text-right",children:"Total"}),a.jsx("div",{})]}),e.map((t,o)=>(0,a.jsxs)("div",{className:"grid grid-cols-5 gap-2 items-center py-2 border-b",style:{borderColor:"var(--border-color)"},children:[a.jsx("div",{className:"font-medium truncate",style:{color:"var(--text-color)"},children:t.product?.name||`Product ${t.product_id}`}),a.jsx("div",{className:"text-center",style:{color:"var(--text-color)"},children:t.quantity}),a.jsx("div",{className:"text-right",style:{color:"var(--text-color)"},children:formatPrice(t.product?.price||0,A)},`item-price-${t.product_id}-${A}`),a.jsx("div",{className:"text-right font-medium",style:{color:"var(--text-color)"},children:formatPrice(t.sub_total||0,A)},`item-total-${t.product_id}-${A}`),a.jsx("div",{className:"flex justify-end",children:a.jsx("button",{onClick:()=>{handleOrderItemsInteraction(),r(e.filter((e,r)=>r!==o))},className:"text-[var(--error-color)] hover:text-[var(--error-color-hover)] p-1 rounded-full hover:bg-[var(--background-secondary)]",children:a.jsx(l.A,{className:"h-5 w-5"})})})]},t.product_id)),(0,a.jsxs)("div",{className:"flex justify-between items-center pt-2",children:[a.jsx("span",{className:"font-bold",style:{color:"var(--text-color)"},children:"Total"}),a.jsx("span",{className:"font-bold text-lg",style:{color:"var(--text-color)"},children:formatPrice(M,A)},`total-${A}`)]}),renderFieldErrors("orderItems")]})]}),a.jsx(ParentOrderCard,{parentOrder:S,themeColors:{cardBackground:"var(--background-color)",cardBorder:"var(--border-color)",cardText:"var(--text-color)",headingText:"var(--heading-text)"},activeCurrency:A}),a.jsx("button",{onClick:handleEnhancedCreateOrder,disabled:I.create||!isFormValid(),className:`flex items-center justify-center mx-auto px-8 py-4 text-lg font-medium rounded-lg transition-all duration-200 focus:outline-none w-3/4 min-w-[300px] max-w-[500px] ${I.create||!isFormValid()?"bg-gray-300 text-gray-500 cursor-not-allowed":"bg-[var(--primary-color)] text-[var(--text-on-primary)] hover:brightness-90 hover:shadow-md"}`,children:I.create?(0,a.jsxs)("span",{className:"flex items-center justify-center",children:[(0,a.jsxs)("svg",{className:"animate-spin -ml-1 mr-2 h-5 w-5",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",style:{color:"var(--text-on-primary)"},children:[a.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),a.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Adding to Order..."]}):"Add to Order"})]})};o()}catch(e){o(e)}})}};