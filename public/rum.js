// Gerçek kullanıcı ölçümü: çerez onayından sonra Base.astro yükler. Değerler GA4'e olay olarak gider (CLS ×1000).
import{onCLS,onINP,onLCP,onFCP,onTTFB}from'/wv.js';
const s=(m)=>window.gtag&&gtag('event',m.name,{value:Math.round(m.name=='CLS'?m.value*1e3:m.value),metric_id:m.id,metric_rating:m.rating,non_interaction:true});
onCLS(s);onINP(s);onLCP(s);onFCP(s);onTTFB(s);
