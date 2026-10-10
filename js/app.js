/* Nuestro Momento × BubbleMesh — cotizador, slideshow, video y FAQ */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); };

  /* ====================== DATOS ====================== */

  var QUOTE = {
    email: 'contacto@bubble-mesh.com', version: 'v1.0',
    rec: { marketing: 8000, landingMgmt: 1500, shopifyMgmt: 2500, organic: 5500 },
    plans: {
      landing_promo: { group: 'landing', name: 'One Page Premium · Promoción', initial: 10000, monthly: 0, term: null, web: 'landing', plazo: '3 semanas a 1 mes desde materiales, accesos y anticipo', pay: '60% para iniciar ($6,000) + 40% restante ($4,000)' },
      landing_regular: { group: 'landing', name: 'One Page Premium · Precio regular', initial: 15000, monthly: 0, term: null, web: 'landing', plazo: '3 semanas a 1 mes desde materiales, accesos y anticipo', pay: '50% ($7,500) + 50% ($7,500)' },
      ecommerce_new: { group: 'ecommerce', name: 'E-commerce Shopify', initial: 30000, monthly: 0, term: null, web: 'shopify', plazo: '1–2 meses con materiales y aprobaciones disponibles', pay: 'Pago único por proyecto · calendario por confirmar' },
      ecommerce_upgrade: { group: 'ecommerce', name: 'Actualización de One Page a Shopify', initial: 20000, monthly: 0, term: null, web: 'shopify', plazo: '1–2 meses con materiales y aprobaciones disponibles', pay: 'Pago único por proyecto · calendario por confirmar' },
      marketing_6: { group: 'marketing_6', name: 'Marketing + Landing · 6 meses', initial: 0, monthly: 8000, term: 6, web: 'landing', plazo: 'Landing en aprox. 3–4 semanas desde el inicio', pay: '$8,000/mes × 6 meses · sin pago inicial por la landing' },
      marketing_12: { group: 'marketing_12', name: 'Marketing + E-commerce · 12 meses', initial: 0, monthly: 8000, term: 12, web: 'shopify', plazo: 'Landing 3–4 semanas + tienda en 1–2 meses', pay: '$8,000/mes × 12 meses · sin cargo inicial por desarrollo web estándar' }
    }
  };

  var SCOPE = {
    landing: {
      inc: ['Sitio web one-page con diseño premium y adaptable a escritorio, tablet y móvil.', 'Español e inglés mediante un selector funcional de idioma; las traducciones requieren revisión/aprobación del cliente.', 'Hero, presentación de la marca, historia/origen, producto(s), contacto y llamada a la acción.', 'Botones hacia WhatsApp y redes sociales (sin checkout ni cobro online).', 'Estructura SEO básica.', 'Configuración técnica básica y puesta en línea, sujeto a dominio/accesos.', 'Una fase de presentación y ajustes de diseño.'],
      exc: ['Dominio, hosting y correo corporativo', 'Fotografía presencial', 'Rediseño de marca', 'Traducción profesional certificada', 'Licencias pagadas', 'Mantenimiento recurrente', 'Integración de pagos e inventario'],
      micro: 'No incluimos un rebranding completo ni rediseño de etiquetas/empaque.'
    },
    ecommerce: {
      inc: ['Diseño de front-end personalizado y adaptación a móvil.', 'Integración funcional con Shopify.', 'Catálogo inicial, fichas, variantes básicas y precios.', 'Inventario y pedidos desde el panel de Shopify.', 'Carrito y checkout de Shopify con proveedores aprobados.', 'Configuración inicial de impuestos, envíos y métodos de pago cuando sean aplicables y autorizados.', 'Cupones/promociones básicos y métricas integradas.', 'Capacitación breve de catálogo e inventario.'],
      exc: ['Suscripción Shopify y apps', 'Importación masiva de productos', 'Integración con ERP/POS/CRM', 'Multimoneda/multirregión y B2B avanzado', 'Headless de alta complejidad o checkout a medida'],
      micro: 'La venta de mezcal en línea requiere validaciones adicionales de pago, publicidad y distribución.'
    },
    marketing_6: {
      inc: ['Planeación y parrilla mensual de publicaciones.', '8 artes al mes para Instagram, entre reels (videos), posts y carruseles.', 'Edición, copy breve, programación/publicación y seguimiento orgánico básico de Instagram.', '1 ronda consolidada de cambios por parrilla.', 'One Page Premium bilingüe vinculada a WhatsApp, entregada en aprox. 3–4 semanas.', 'Gestión de la landing durante el contrato.', 'Gestión de campañas pagadas (Ads): estrategia, configuración, monitoreo y optimización.'],
      exc: ['Inversión en pauta publicitaria (la paga el cliente)', 'Administración de mensajes 24/7', 'Producción presencial y fotografía compleja', 'Rediseño de marca o Shopify'],
      micro: 'El desarrollo de la landing está incluido con tu compromiso de 6 meses.'
    },
    marketing_12: {
      inc: ['Mismas entregas recurrentes del plan de 6 meses: parrilla, 8 artes al mes (reels, posts y carruseles), copies, publicación orgánica en Instagram y 1 ronda consolidada de ajustes.', 'Fase 1: One Page Premium publicada en 3–4 semanas.', 'Fase 2: e-commerce Shopify con alcance estándar, objetivo de 1–2 meses desde el arranque.', 'Traspaso de accesos y capacitación inicial de la tienda.', 'Gestión de la landing y de la tienda Shopify durante el contrato.', 'Gestión de campañas pagadas (Ads): estrategia, configuración, monitoreo y optimización.'],
      exc: ['Suscripción Shopify, licencias y pasarelas', 'Inversión en pauta publicitaria (la paga el cliente)', 'Agente de IA y CRM avanzado', 'Headless de alta complejidad'],
      micro: 'El e-commerce se desarrolla por etapas y está incluido con tu compromiso de 12 meses.'
    }
  };

  var SHOP = {
    basic: { name: 'Basic', a: 14, m: 19, who: 'Emprendedores que trabajan solos', feats: ['Tienda online completa, productos ilimitados, ventas en redes, marketplaces y chats de IA', 'Asistente de IA (Sidekick) y constructor web con IA', 'Comisión con tarjeta: 3.5% + $3 MXN. Si usas otra pasarela de pago, Shopify cobra 2% extra', 'Hasta 10 ubicaciones de inventario y hasta 3 catálogos B2B', 'Soporte 24/7 por chat', 'Hasta USD 2,500 en créditos (1% de lo que vendas)'] },
    grow: { name: 'Grow', a: 39, m: 52, who: 'Equipos pequeños', feats: ['Incluye todo lo de Basic', '5 cuentas de personal', 'Tarjeta: 3.4% + $3 MXN. Con otra pasarela, 1% extra', 'Acceso completo a las APIs para crear apps propias', 'Hasta USD 3,500 en créditos'] },
    advanced: { name: 'Advanced', a: 299, m: 399, who: 'Negocios que venden en varios países', feats: ['Incluye todo lo de Grow', '15 cuentas de personal', 'Tarjeta: 3.3% + $3 MXN. Con otra pasarela, 0.6% extra', 'Tarifas de envío en tiempo real de paqueterías externas', 'Tienda adaptada por región', 'Hasta el doble de límite en algunas APIs', 'Chat de soporte mejorado', 'Hasta USD 5,000 en créditos'] },
    plus: { name: 'Plus', a: 2300, m: 2300, from: true, who: 'Operaciones complejas', feats: ['Incluye todo lo de Advanced', 'Cuentas de personal ilimitadas', 'Tarjeta: 3.1% + $3 MXN. Con otra pasarela, 0.2% extra', 'Checkout totalmente personalizable', '200 ubicaciones de inventario y catálogos B2B ilimitados', 'POS Pro con 20 sucursales incluidas (hasta 200 si usas Shopify Payments)', 'Hasta 25 tiendas headless y hasta 9 tiendas de expansión sin costo', 'Protección contra bots y hasta 10 veces más límite en algunas APIs', 'Soporte telefónico prioritario 24/7'] }
  };

  var FAQ = [
    ['¿La landing vende directamente?', 'No. Presenta productos y redirige a WhatsApp para consultas/pedidos. Una compra online automatizada requiere e-commerce. También se puede cotizar un agente de IA que conteste por WhatsApp.'],
    ['¿Se puede convertir mi landing en tienda?', 'Sí. Bubble Mesh ofrece una actualización comercial desde $20,000 si ya realizó la landing y puede reutilizar el trabajo previo, previa validación técnica.'],
    ['¿Quién paga Shopify?', 'Bubble Mesh podría pagar Shopify, pero la recomendación es que Nuestro Momento sea la dueña o tenga el super admin de la cuenta, para evitar que después cualquier agencia secuestre el sistema.'],
    ['¿Shopify está incluido en el plan anual?', 'El desarrollo e integración estándar sí; la suscripción externa no. La gestión mensual de la tienda está incluida durante el contrato.'],
    ['¿Cuánto tarda la página?', 'Landing: 3–4 semanas. E-commerce estándar: objetivo de 1–2 meses, sujeto a materiales y autorizaciones para pagos y venta de alcohol. Al final del e-commerce se incluye una capacitación para la gestión del inventario.'],
    ['¿Qué incluye el marketing mensual?', 'Planeación de contenido, 8 artes mensuales en Instagram entre reels (videos), posts y carruseles, copies y publicación orgánica en Instagram. También incluye la gestión de la página y la gestión de campañas de Ads; la inversión en anuncios y la producción presencial van aparte.'],
    ['¿Cuántos cambios puedo pedir?', 'Una ronda consolidada de ajustes de parrilla está incluida. Cambios extras menores se cotizan de $250 a $500; rehacer integralmente una parrilla aprobada puede costar 30% de la mensualidad ($2,400 en el plan de $8,000). Las correcciones por errores de Bubble Mesh no tienen cargo.'],
    ['¿Cómo funcionan los tickets web?', 'Modelo propuesto de 4 tickets menores mensuales para gestión de landing o Shopify, no acumulables. Nuevas páginas, integraciones, rediseños o funciones nuevas se cotizan aparte. La política deberá confirmarse en la propuesta formal.'],
    ['¿Qué pasa si cancelo un plan de 6/12 meses?', 'Si el cliente cancela sin causa durante el plazo mínimo, tiene que avisar por escrito con 30 días naturales de anticipación. Además debe pagar las mensualidades ya devengadas y una mensualidad extra como compensación. No se devuelve ninguna mensualidad ya iniciada, y ambos hacen un cierre de cuenta con calendario de entrega del material pendiente. Por ejemplo, en un plan de 12 meses, si cancela en el mes 4, paga los 4 meses, más el mes de aviso, más una mensualidad de compensación; no paga los 8 meses restantes. La regla funciona igual para el plan de 6 meses.']
  ];

  /* ====================== ESTADO ====================== */

  var st = {
    plan: 'landing_promo', landingRegular: false, hasLanding: false,
    organic: false, webOn: false, adsOn: false,
    adsMode: 'none', google: 5000, social: 3000,
    horizon: 1, shopStart: null,
    shopPlan: 'none', shopBilling: 'annual', fx: '18.40',
    inclExt: false, notice: '', copyMsg: ''
  };

  var nf = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
  var f = function (n) { return nf.format(n); };
  var mes = function (n) { return n === 1 ? '1 mes' : n + ' meses'; };

  /* ====================== CÁLCULO ====================== */

  function compute() {
    var R = QUOTE.rec, planId = st.plan, P = QUOTE.plans[planId];
    var isMk = !!P.term, horizon = st.horizon || 1, term = P.term || horizon;
    var orgOn = !!st.organic && !isMk;
    var webType = P.web, webFee = webType === 'landing' ? R.landingMgmt : R.shopifyMgmt;
    var webStart = webType === 'shopify' ? Math.min(term, st.shopStart || (planId === 'marketing_12' ? 3 : 1)) : 1;
    var webMonths = (st.webOn && !isMk) ? Math.max(0, term - webStart + 1) : 0;
    var adsFee = (!isMk && st.adsOn) ? 5000 : 0, mode = st.adsMode || 'none';
    var g = (mode === 'google' || mode === 'both') ? (st.google || 5000) : 0;
    var so = (mode === 'social' || mode === 'both') ? (st.social || 3000) : 0;
    var SP = SHOP[st.shopPlan] || null;
    var fx = Math.max(0, Number(st.fx === '' || st.fx == null ? 18.40 : st.fx) || 0);
    var shopUsd = SP ? (st.shopBilling === 'monthly' ? SP.m : SP.a) : 0;
    var shopM = shopUsd && fx ? Math.round(shopUsd * fx) : 0;
    var shopVal = SP
      ? (SP.from ? 'Desde ' : '') + 'USD ' + shopUsd.toLocaleString('en-US') + '/mes' + (fx ? ' (≈ ' + f(shopM) + ')' : '') + ' · ' + SP.name
      : (webType === 'shopify' ? 'Por elegir plan' : 'No aplica');

    var agencyTotal = P.initial + term * (P.monthly + (orgOn ? R.organic : 0) + adsFee) + webMonths * webFee;
    var externalTotal = term * (g + so + shopM);

    var ag = [];
    if (P.initial) {
      var sub = planId === 'landing_promo' ? 'Precio regular $15,000 · ahorro $5,000 (33.33%)'
        : planId === 'ecommerce_upgrade' ? 'Precio diferencial por reutilizar tu landing'
        : planId === 'landing_regular' ? 'Precio regular' : 'Desarrollo desde cero';
      ag.push({ label: 'Desarrollo web', sub: sub, value: f(P.initial) });
      if (planId === 'landing_promo') {
        ag.push({ label: 'Anticipo 60%', sub: 'Para iniciar', value: f(6000) });
        ag.push({ label: 'Saldo 40%', sub: 'Vencimiento por fijar en contrato', value: f(4000) });
      }
      if (planId === 'landing_regular') {
        ag.push({ label: 'Primer pago 50%', sub: '', value: f(7500) });
        ag.push({ label: 'Segundo pago 50%', sub: '', value: f(7500) });
      }
    } else {
      ag.push({ label: 'Desarrollo web', sub: planId === 'marketing_12' ? 'Landing + e-commerce Shopify estándar' : 'One Page Premium bilingüe', value: 'Incluido' });
      ag.push({ label: 'Mensualidad Bubble Mesh', sub: mes(term) + ' de compromiso', value: f(P.monthly) + '/mes' });
      ag.push({ label: 'Total base del contrato', sub: 'Sin impuestos ni terceros', value: f(P.monthly * term) });
    }
    if (orgOn) ag.push({ label: 'Contenido orgánico esencial', sub: '8 artes · ' + mes(term), value: f(R.organic) + '/mes' });
    if (isMk) {
      ag.push({ label: 'Contenido (8 artes al mes)', sub: 'Reels, posts y carruseles', value: 'Incluido' });
      ag.push({ label: webType === 'landing' ? 'Gestión de la landing' : 'Gestión de landing y Shopify', sub: 'Durante el contrato', value: 'Incluido' });
      ag.push({ label: 'Gestión de campañas Ads', sub: 'Honorarios · la pauta va aparte', value: 'Incluido' });
    }
    if (st.webOn && !isMk) ag.push({ label: webType === 'landing' ? 'Gestión de landing' : 'Gestión de e-commerce Shopify', sub: 'Desde el mes ' + webStart + ' · ' + mes(webMonths), value: f(webFee) + '/mes' });
    if (adsFee) ag.push({ label: 'Gestión de campañas pagadas', sub: 'Honorarios · ' + mes(term), value: f(adsFee) + '/mes' });

    var ex = [
      { label: 'Pauta Google Ads', value: g ? f(g) + '/mes' : 'Sin pauta' },
      { label: 'Pauta Instagram + TikTok', value: so ? f(so) + '/mes' : 'Sin pauta' },
      { label: 'Suscripción Shopify', value: shopVal },
      { label: 'Dominio, hosting y herramientas', value: 'Por contratar si aplican' }
    ];

    var agencyTotalLabel = 'Honorarios proyectados · ' + mes(term);
    var durationLabel = isMk ? 'Compromiso de ' + mes(term) : 'Proyecto único · servicios proyectados a ' + mes(term);
    var versionLabel = QUOTE.version + ' · ' + new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

    var lines = ['BUBBLE MESH × NUESTRO MOMENTO — Resumen de cotización', P.name + ' · ' + durationLabel, 'Plazo: ' + P.plazo, 'Pagos: ' + P.pay, ''];
    ag.forEach(function (r) { lines.push('• ' + r.label + ': ' + r.value + (r.sub ? ' (' + r.sub + ')' : '')); });
    lines.push(agencyTotalLabel + ': ' + f(agencyTotal), '', 'Gastos externos (los paga el cliente):');
    ex.forEach(function (r) { lines.push('• ' + r.label + ': ' + r.value); });
    if (st.inclExt) lines.push('Total orientativo con externos: ' + f(agencyTotal + externalTotal));
    if ((g || so) && !adsFee && !isMk) lines.push('Pauta presupuestada, gestión de campañas no incluida.');
    lines.push('', 'Precios sujetos a confirmación de IVA en propuesta formal.', 'Propuesta indicativa, sujeta a contrato · ' + versionLabel);

    return {
      P: P, planId: planId, group: P.group, isMk: isMk, term: term, horizon: horizon, orgOn: orgOn,
      webType: webType, webFee: webFee, webStart: webStart, webMonths: webMonths, adsFee: adsFee,
      mode: mode, g: g, so: so, shopPlan: SP, shopM: shopM, fx: fx,
      agencyTotal: agencyTotal, externalTotal: externalTotal, ag: ag, ex: ex,
      agencyTotalLabel: agencyTotalLabel, durationLabel: durationLabel, versionLabel: versionLabel,
      text: lines.join('\n')
    };
  }

  function setPlan(next) {
    var P = QUOTE.plans, cur = P[st.plan], np = P[next], msgs = [];
    if (np.term && st.organic) { st.organic = false; msgs.push('El contenido orgánico esencial ya está incluido en el plan de marketing; se retiró de la cotización.'); }
    if (st.webOn && !np.term && cur.web !== np.web) msgs.push('La gestión web se ajustó a ' + (np.web === 'landing' ? 'gestión de landing ($1,500/mes)' : 'gestión de Shopify ($2,500/mes)') + ' para esta modalidad.');
    if (cur.web !== np.web) st.shopStart = null;
    st.plan = next;
    st.notice = msgs.join(' ');
    render();
  }

  /* ====================== RENDER ====================== */

  var PLAN_CARDS = [
    { g: 'landing', kicker: 'Proyecto · Promoción', name: 'One Page Premium', meta: 'Compromiso: proyecto · Plazo: 3–4 semanas', pick: function () { return st.landingRegular ? 'landing_regular' : 'landing_promo'; } },
    { g: 'ecommerce', kicker: 'Proyecto', name: 'E-commerce Shopify', meta: 'Compromiso: proyecto · Plazo: 1–2 meses', pick: function () { return st.hasLanding ? 'ecommerce_upgrade' : 'ecommerce_new'; } },
    { g: 'marketing_6', kicker: 'Contrato · Menor compromiso', name: 'Marketing + Landing', price: '$8,000/mes', sub: 'Landing, contenido (8 artes al mes), gestión de página y Ads incluidos', meta: '6 meses · Total base $48,000', pick: function () { return 'marketing_6'; } },
    { g: 'marketing_12', kicker: 'Contrato · Recomendado para e-commerce', name: 'Marketing + E-commerce', price: '$8,000/mes', sub: 'Landing + Shopify por etapas, contenido (8 artes al mes), gestión de página y Ads incluidos', meta: '12 meses · Total base $96,000', pick: function () { return 'marketing_12'; } }
  ];

  function renderPlanCards(Q) {
    var lg = Q.planId === 'landing_regular', up = Q.planId === 'ecommerce_upgrade';
    var html = PLAN_CARDS.map(function (c, i) {
      var price = c.price, sub = c.sub;
      if (c.g === 'landing') { price = lg ? '$15,000' : '$10,000'; sub = lg ? 'Precio regular · 50% + 50%' : 'Antes $15,000 · 60% + 40%'; }
      if (c.g === 'ecommerce') { price = up ? '$20,000' : '$30,000'; sub = up ? 'Actualización de tu landing existente' : 'Tienda con inventario, pedidos y checkout*'; }
      var sel = Q.group === c.g;
      return '<button type="button" class="plan" role="radio" data-i="' + i + '" aria-checked="' + sel + '">' +
        '<span class="pk">' + esc(c.kicker) + '</span><span class="radio"><i></i></span>' +
        '<span class="pnm">' + esc(c.name) + '</span>' +
        '<span class="ppr">' + esc(price) + '</span>' +
        '<span class="psb">' + esc(sub) + '</span>' +
        '<span class="pmt">' + esc(c.meta) + '</span></button>';
    }).join('');
    $('#plan-cards').innerHTML = html;
  }

  function renderSummary(el, Q) {
    if (!el) return;
    var rows = Q.ag.map(function (r) {
      return '<div class="sum-row"><span class="l"><b>' + esc(r.label) + '</b>' + (r.sub ? '<i>' + esc(r.sub) + '</i>' : '') + '</span><span class="v">' + esc(r.value) + '</span></div>';
    }).join('');
    var ext = Q.ex.map(function (r) {
      return '<div class="sum-row"><span class="l"><b>' + esc(r.label) + '</b></span><span class="v">' + esc(r.value) + '</span></div>';
    }).join('');
    var grand = '';
    if (st.inclExt) {
      grand = '<div class="sum-grand">' +
        '<div class="g"><span>Honorarios Bubble Mesh</span><span>' + f(Q.agencyTotal) + '</span></div>' +
        '<div class="g"><span>Gastos externos · ' + mes(Q.term) + '</span><span>+ ' + f(Q.externalTotal) + '</span></div>' +
        '<div class="gt"><span>Total orientativo con externos</span><span>' + f(Q.agencyTotal + Q.externalTotal) + '</span></div>' +
        (Q.externalTotal === 0 ? '<p class="sum-note">Aún no hay gastos externos cuantificados. Elige pauta en el paso 4 o un plan de Shopify en el paso 5 para sumarlos.</p>' : '') +
        '</div>';
    }
    el.innerHTML =
      '<div class="sum-head"><p class="sum-k">Resumen de cotización</p><p class="sum-plan">' + esc(Q.P.name) + '</p><p class="sum-dur">' + esc(Q.durationLabel) + '</p></div>' +
      '<div class="sum-rows">' + rows +
      '<div class="sum-total"><span class="tl">' + esc(Q.agencyTotalLabel) + '</span><span class="tv">' + f(Q.agencyTotal) + '</span></div></div>' +
      '<div class="sum-ext"><p class="sum-ext-k">Gastos externos · los paga el cliente</p>' + ext + grand + '</div>' +
      '<p class="sum-legal">Precios sujetos a confirmación de IVA en propuesta formal. Propuesta indicativa, sujeta a contrato · ' + esc(Q.versionLabel) + '</p>' +
      '<div class="sum-act">' +
      '<a class="btn btn-gold" href="' + esc(mailHref(Q)) + '">Solicitar propuesta por correo</a>' +
      '<div class="two"><button type="button" class="btn btn-line" data-act="copy">Copiar resumen</button>' +
      '<button type="button" class="btn btn-line" data-act="print">Imprimir / PDF</button></div>' +
      '<p class="sum-msg" role="status" aria-live="polite">' + esc(st.copyMsg) + '</p></div>';
  }

  function mailHref(Q) {
    return 'mailto:' + QUOTE.email + '?subject=' + encodeURIComponent('Solicitud de propuesta — Nuestro Momento') + '&body=' + encodeURIComponent(Q.text);
  }

  function renderShopCard(Q) {
    var box = $('#shop-card'), sp = Q.shopPlan;
    if (!sp) { box.hidden = true; box.innerHTML = ''; return; }
    var fr = sp.from ? 'desde ' : '';
    var u = st.shopBilling === 'monthly' ? sp.m : sp.a;
    box.hidden = false;
    box.className = 'shop-card';
    box.innerHTML = '<div class="sh-top"><span class="sh-nm">' + esc(sp.name) + '</span><span class="sh-pr">' + (sp.from ? 'Desde ' : '') + 'USD ' + u.toLocaleString('en-US') + '/mes</span></div>' +
      '<p class="sh-who">' + esc(sp.who) + ' · Anual ' + fr + 'USD ' + sp.a.toLocaleString('en-US') + ' · Mensual ' + fr + 'USD ' + sp.m.toLocaleString('en-US') + '</p>' +
      '<ul>' + sp.feats.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
  }

  function render() {
    var Q = compute();

    /* paso 1 */
    renderPlanCards(Q);
    $('#wrap-landing-regular').hidden = Q.group !== 'landing';
    $('#wrap-has-landing').hidden = Q.group !== 'ecommerce';
    $('#landing-regular').checked = !!st.landingRegular;
    $('#has-landing').checked = !!st.hasLanding;

    /* paso 2 */
    $('#plan-plazo').textContent = Q.P.plazo;
    $('#plan-pay').textContent = Q.P.pay;
    var sc = SCOPE[Q.group];
    $('#scope-inc').innerHTML = sc.inc.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    $('#scope-exc').innerHTML = sc.exc.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('');
    $('#plan-micro').textContent = sc.micro;

    /* paso 3 */
    var nt = $('#notice');
    nt.hidden = !st.notice; nt.textContent = st.notice || '';
    $('#wrap-horizon').hidden = Q.isMk;
    $('#horizon').value = Q.horizon;
    $('#horizon-label').textContent = mes(Q.horizon);

    var og = $('#opt-organic');
    $('#chk-organic').checked = Q.orgOn;
    $('#chk-organic').disabled = Q.isMk;
    og.classList.toggle('is-off', Q.isMk);
    $('#organic-tag').textContent = Q.isMk ? 'Incluido en tu plan' : 'Opcional';
    $('#organic-note').textContent = Q.isMk
      ? 'El plan de $8,000/mes ya incluye 8 artes al mes entre reels, posts y carruseles; no se suma para evitar un doble cobro.'
      : '8 artes + calendario, copy y publicación, sujeto a definición final de carga.';

    var ow = $('#opt-web');
    $('#chk-web').checked = Q.isMk || !!st.webOn;
    $('#chk-web').disabled = Q.isMk;
    ow.classList.toggle('is-struck', Q.isMk);
    $('#web-name').textContent = Q.webType === 'landing' ? 'Gestión de landing' : 'Gestión de e-commerce Shopify';
    $('#web-price').textContent = f(Q.webFee) + '/mes';
    $('#web-tag').textContent = Q.isMk ? 'Incluido en tu plan' : 'Opcional';
    $('#web-note').textContent = Q.webType === 'landing'
      ? 'Actualización de textos, imágenes y promocionales existentes. Propuesta: hasta 4 tickets menores al mes, por confirmar.'
      : 'Ajustes menores de catálogo, promociones y productos, y soporte administrativo básico. No cubre atención al cliente, logística, facturación ni funciones nuevas.';

    var showStart = !Q.isMk && !!st.webOn && Q.webType === 'shopify';
    $('#wrap-shopstart').hidden = !showStart;
    var ss = $('#shopstart');
    ss.max = Q.term; ss.value = Q.webStart;
    $('#shopstart-label').textContent = 'mes ' + Q.webStart;

    var oa = $('#opt-ads');
    $('#chk-ads').checked = Q.isMk || !!st.adsOn;
    $('#chk-ads').disabled = Q.isMk;
    oa.classList.toggle('is-struck', Q.isMk);
    $('#ads-tag').textContent = Q.isMk ? 'Incluido en tu plan' : 'Opcional';
    $('#ads-note').textContent = Q.isMk
      ? 'Incluida en tu plan de $8,000/mes, sin honorarios adicionales. La inversión en anuncios la paga el cliente.'
      : 'Estrategia, configuración, monitoreo y optimización de campañas. La inversión en anuncios la paga el cliente y es aparte de este servicio.';

    /* paso 4 */
    $$('#ads-mode button').forEach(function (b) { b.setAttribute('aria-checked', String(b.dataset.v === Q.mode)); });
    $('#wrap-google').hidden = !(Q.mode === 'google' || Q.mode === 'both');
    $('#wrap-social').hidden = !(Q.mode === 'social' || Q.mode === 'both');
    $('#google').value = st.google; $('#google-label').textContent = f(st.google);
    $('#social').value = st.social; $('#social-label').textContent = f(st.social);
    $('#no-mgmt').hidden = !((Q.g || Q.so) > 0 && !Q.adsFee && !Q.isMk);

    /* paso 5 */
    $('#shop-plan').value = st.shopPlan;
    $('#shop-billing').value = st.shopBilling;
    $('#incl-ext').checked = !!st.inclExt;
    renderShopCard(Q);

    /* resumen y barra */
    renderSummary($('#sum-desktop'), Q);
    renderSummary($('#sum-sheet'), Q);
    $('#qbar-plan').textContent = Q.P.name;
    $('#qbar-total').textContent = f(st.inclExt ? Q.agencyTotal + Q.externalTotal : Q.agencyTotal);

    /* pistas de paso (colapsado en móvil) */
    var hint2 = Q.P.plazo.split(' desde')[0];
    var svc = [];
    if (Q.isMk) svc.push('Incluidos en el plan');
    else {
      if (Q.orgOn) svc.push('Contenido');
      if (st.webOn) svc.push('Gestión web');
      if (st.adsOn) svc.push('Ads');
      if (!svc.length) svc.push('Sin extras');
    }
    var pauta = { none: 'Sin pauta', google: 'Google', social: 'IG + TikTok', both: 'Google + IG/TikTok' }[Q.mode];
    $('#hint1').textContent = Q.P.name;
    $('#hint2').textContent = hint2;
    $('#hint3').textContent = svc.join(' · ');
    $('#hint4').textContent = pauta;
    $('#hint5').textContent = Q.shopPlan ? 'Shopify ' + Q.shopPlan.name : 'Sin plan Shopify';

    lastQ = Q;
  }

  var lastQ = null;

  /* ====================== ACCIONES ====================== */

  function scrollToSummary() {
    if (window.matchMedia('(min-width:1024px)').matches) {
      var el = $('#sum-desktop');
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
    } else {
      openSheet();
    }
  }

  function flashMsg(t) {
    st.copyMsg = t;
    $$('.sum-msg').forEach(function (n) { n.textContent = t; });
    clearTimeout(flashMsg.t);
    flashMsg.t = setTimeout(function () { st.copyMsg = ''; $$('.sum-msg').forEach(function (n) { n.textContent = ''; }); }, 3500);
  }

  function copySummary() {
    var t = compute().text, done = function (ok) { flashMsg(ok ? 'Resumen copiado al portapapeles.' : 'No se pudo copiar. Usa Imprimir / PDF.'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(t).then(function () { done(true); }, function () { done(fallbackCopy(t)); });
    } else { done(fallbackCopy(t)); }
  }

  function fallbackCopy(t) {
    try {
      var ta = document.createElement('textarea');
      ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = document.execCommand('copy'); ta.remove();
      return ok;
    } catch (e) { return false; }
  }

  function printQuote() {
    try {
      var Q = compute();
      var row = function (r) { return '<tr><td>' + esc(r.label) + (r.sub ? '<span class="s">' + esc(r.sub) + '</span>' : '') + '</td><td class="v">' + esc(r.value) + '</td></tr>'; };
      var logo = new URL('assets/logo-920.webp', location.href).href;
      var ext = st.inclExt ? '<tr class="t"><td>Total orientativo con externos</td><td class="v">' + f(Q.agencyTotal + Q.externalTotal) + '</td></tr>' : '';
      var html = '<!doctype html><html lang="es-MX"><head><meta charset="utf-8"><title>Cotización Nuestro Momento</title>' +
        '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Cormorant+Garamond:wght@500&display=swap" rel="stylesheet">' +
        '<style>@page{size:letter;margin:14mm}*{box-sizing:border-box}body{margin:0;font-family:Montserrat,Arial,sans-serif;font-size:10pt;color:#1E1E1E;line-height:1.4}' +
        'header{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #C7A066;padding-bottom:8px;margin-bottom:14px}header img{height:46px}' +
        '.k{font-size:8pt;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#8C6A36}h1{font-family:"Cormorant Garamond",Georgia,serif;font-weight:500;font-size:20pt;color:#0F6A55;margin:4px 0 2px}' +
        '.m{display:flex;gap:18px;flex-wrap:wrap;margin:6px 0 12px;font-size:9pt}.m b{color:#8C6A36;font-weight:600}' +
        'table{width:100%;border-collapse:collapse;margin-bottom:12px}td{padding:5px 0;border-bottom:1px solid #E6DAC6;vertical-align:top}td.v{text-align:right;white-space:nowrap;font-weight:600;padding-left:12px}' +
        '.s{display:block;font-size:8pt;color:#666}tr.t td{border-bottom:none;border-top:1.5px solid #0F6A55;padding-top:7px;font-weight:600;color:#0F6A55;font-size:11pt}' +
        'h2{font-size:8pt;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#8C6A36;margin:10px 0 2px}footer{margin-top:10px;font-size:8pt;color:#555;border-top:1px solid #C7A066;padding-top:8px}</style></head><body>' +
        '<header><img src="' + logo + '" alt="Nuestro Momento"><div style="text-align:right"><div class="k">Bubble Mesh × Nuestro Momento</div><div style="font-size:8pt;color:#555">Cotización · ' + esc(Q.versionLabel) + '</div></div></header>' +
        '<div class="k">Resumen de cotización</div><h1>' + esc(Q.P.name) + '</h1><div style="font-size:9pt;color:#555">' + esc(Q.durationLabel) + '</div>' +
        '<div class="m"><span><b>Plazo:</b> ' + esc(Q.P.plazo) + '</span><span><b>Pagos:</b> ' + esc(Q.P.pay) + '</span></div>' +
        '<h2>Honorarios Bubble Mesh</h2><table>' + Q.ag.map(row).join('') + '<tr class="t"><td>' + esc(Q.agencyTotalLabel) + '</td><td class="v">' + f(Q.agencyTotal) + '</td></tr></table>' +
        '<h2>Gastos externos · los paga el cliente</h2><table>' + Q.ex.map(row).join('') + ext + '</table>' +
        '<footer>Precios sujetos a confirmación de IVA en propuesta formal. Propuesta indicativa, sujeta a contrato. Contacto: ' + QUOTE.email + '</footer></body></html>';
      var fr = document.createElement('iframe');
      fr.setAttribute('aria-hidden', 'true');
      fr.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
      document.body.appendChild(fr);
      var d = fr.contentWindow.document; d.open(); d.write(html); d.close();
      var go = function () {
        try { fr.contentWindow.focus(); fr.contentWindow.print(); }
        catch (e) { flashMsg('No se pudo abrir la impresión en este navegador.'); }
        setTimeout(function () { fr.remove(); }, 1500);
      };
      var img = d.querySelector('img');
      var ready = Promise.all([
        d.fonts ? d.fonts.ready : Promise.resolve(),
        new Promise(function (r) { if (!img || img.complete) r(); else { img.onload = img.onerror = r; } })
      ]);
      Promise.race([ready, new Promise(function (r) { setTimeout(r, 2000); })]).then(go);
    } catch (e) { flashMsg('No se pudo abrir la impresión en este navegador.'); }
  }

  /* ====================== EVENTOS DEL COTIZADOR ====================== */

  $('#plan-cards').addEventListener('click', function (e) {
    var b = e.target.closest('.plan'); if (!b) return;
    setPlan(PLAN_CARDS[+b.dataset.i].pick());
  });
  $('#landing-regular').addEventListener('change', function (e) {
    st.landingRegular = e.target.checked;
    setPlan(st.landingRegular ? 'landing_regular' : 'landing_promo');
  });
  $('#has-landing').addEventListener('change', function (e) {
    st.hasLanding = e.target.checked;
    setPlan(st.hasLanding ? 'ecommerce_upgrade' : 'ecommerce_new');
  });
  $('#chk-organic').addEventListener('change', function (e) { st.organic = e.target.checked; render(); });
  $('#chk-web').addEventListener('change', function (e) { st.webOn = e.target.checked; render(); });
  $('#chk-ads').addEventListener('change', function (e) { st.adsOn = e.target.checked; render(); });
  $('#horizon').addEventListener('input', function (e) { st.horizon = +e.target.value; render(); });
  $('#shopstart').addEventListener('input', function (e) { st.shopStart = +e.target.value; render(); });
  $('#google').addEventListener('input', function (e) { st.google = +e.target.value; render(); });
  $('#social').addEventListener('input', function (e) { st.social = +e.target.value; render(); });
  $('#ads-mode').addEventListener('click', function (e) {
    var b = e.target.closest('button[data-v]'); if (!b) return;
    st.adsMode = b.dataset.v; render();
  });
  $('#shop-plan').addEventListener('change', function (e) { st.shopPlan = e.target.value; render(); });
  $('#shop-billing').addEventListener('change', function (e) { st.shopBilling = e.target.value; render(); });
  $('#fx').addEventListener('input', function (e) { st.fx = e.target.value; render(); });
  $('#incl-ext').addEventListener('change', function (e) { st.inclExt = e.target.checked; render(); });
  $('#btn-choose-offer').addEventListener('click', function () {
    st.landingRegular = false;
    setPlan('landing_promo');
    setTimeout(scrollToSummary, 60);
  });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act]'); if (!b) return;
    if (b.dataset.act === 'copy') copySummary();
    if (b.dataset.act === 'print') printQuote();
  });

  /* ====================== BARRA Y HOJA ====================== */

  var sheet = $('#sheet'), qbar = $('#qbar');

  function openSheet() {
    sheet.hidden = false;
    document.body.classList.add('sheet-open');
    $('#sheet-close').focus();
  }
  function closeSheet() {
    sheet.hidden = true;
    document.body.classList.remove('sheet-open');
  }
  $('#qbar-open').addEventListener('click', openSheet);
  $('#sheet-close').addEventListener('click', closeSheet);
  $('#sheet-back').addEventListener('click', closeSheet);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });

  var quoteSec = $('#cotizacion');
  var isWide = function () { return window.matchMedia('(min-width:1024px)').matches; };

  function syncBar() {
    if (isWide()) { qbar.hidden = true; qbar.classList.remove('is-on'); return; }
    var r = quoteSec.getBoundingClientRect();
    var on = r.top < window.innerHeight * 0.4 && r.bottom > 160;
    qbar.hidden = false;
    qbar.classList.toggle('is-on', on);
  }

  /* pasos: plegados en móvil (solo el 1 abierto), siempre abiertos en escritorio */
  var steps = $$('.step');
  var wasWide = null;
  function syncSteps() {
    var w = isWide();
    if (w === wasWide) return;
    wasWide = w;
    steps.forEach(function (d, i) { d.open = w ? true : i === 0; });
  }

  var rafT;
  window.addEventListener('scroll', function () {
    if (rafT) return;
    rafT = requestAnimationFrame(function () { rafT = null; syncBar(); });
  }, { passive: true });
  window.addEventListener('resize', function () { syncSteps(); syncBar(); if (isWide()) closeSheet(); });

  /* ====================== FAQ ====================== */

  $('#faq').innerHTML = FAQ.map(function (p) {
    return '<details><summary><span>' + esc(p[0]) + '</span><span class="sign">+</span></summary><div class="a">' + esc(p[1]) + '</div></details>';
  }).join('');
  $$('#faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      $('.sign', d).textContent = d.open ? '−' : '+';
      if (d.open) $$('#faq details').forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ====================== SLIDESHOW ====================== */

  var slides = $$('#slideshow .slide'), dots = $('#slide-dots'), cur = 0, slideT;
  dots.innerHTML = slides.map(function (s, i) {
    return '<button type="button" role="tab" aria-selected="' + (i === 0) + '" aria-label="Imagen ' + (i + 1) + '"><span></span></button>';
  }).join('');
  var dotBtns = $$('button', dots);
  function goSlide(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('is-on', k === cur); });
    dotBtns.forEach(function (b, k) { b.setAttribute('aria-selected', String(k === cur)); });
  }
  function autoSlides() { clearInterval(slideT); slideT = setInterval(function () { goSlide(cur + 1); }, 3000); }
  dotBtns.forEach(function (b, i) { b.addEventListener('click', function () { goSlide(i); autoSlides(); }); });
  if (!window.matchMedia('(prefers-reduced-motion:reduce)').matches) autoSlides();

  /* ====================== VIDEO ====================== */

  var VIDS = ['assets/video-01-720.mp4', 'assets/video-02-720.mp4'];
  var POST = ['assets/video-01-poster.webp', 'assets/video-02-poster.webp'];
  var vEl = $('#player'), vi = 0, muted = true, loaded = false;

  var ICON_MUTE = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="22" y1="9" x2="16" y2="15"/><line x1="16" y1="9" x2="22" y2="15"/></svg>';
  var ICON_SOUND = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/></svg>';

  function paintVideo() {
    $('#video-count').textContent = '0' + (vi + 1) + ' / 0' + VIDS.length;
    var b = $('#btn-mute');
    b.innerHTML = muted ? ICON_MUTE : ICON_SOUND;
    b.setAttribute('aria-label', muted ? 'Activar sonido' : 'Silenciar');
    b.title = muted ? 'Activar sonido' : 'Silenciar';
  }
  function loadVideo(play) {
    vEl.poster = POST[vi];
    if (!loaded) return;
    if (vEl.dataset.i !== String(vi)) {
      vEl.dataset.i = String(vi);
      vEl.src = VIDS[vi];
      vEl.load();
    }
    vEl.muted = muted;
    if (play) { var p = vEl.play(); if (p && p.catch) p.catch(function () {}); }
  }
  vEl.addEventListener('ended', function () { vi = (vi + 1) % VIDS.length; paintVideo(); loadVideo(true); });
  $('#btn-prev').addEventListener('click', function () { vi = (vi - 1 + VIDS.length) % VIDS.length; paintVideo(); loadVideo(true); });
  $('#btn-next').addEventListener('click', function () { vi = (vi + 1) % VIDS.length; paintVideo(); loadVideo(true); });
  $('#btn-mute').addEventListener('click', function () { muted = !muted; paintVideo(); vEl.muted = muted; if (vEl.paused) loadVideo(true); });
  paintVideo();
  vEl.poster = POST[0];

  /* el video solo se descarga cuando entra en pantalla (ahorro de datos en móvil) */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { loaded = true; loadVideo(true); }
        else if (loaded && !vEl.paused) vEl.pause();
      });
    }, { threshold: 0.35 });
    io.observe(vEl);
  } else { loaded = true; loadVideo(true); }

  /* ====================== ARRANQUE ====================== */

  render();
  syncSteps();
  syncBar();
})();
