const e=e=>{return Math.sqrt((r=e,(t=e).reduce((e,s,c)=>e+t[c]*r[c],0)));var t,r};function*t(t,r,s=5e4,c=.001,n=.01){let i=0,o=t.slice(),a=r(...o);for(;i<s;){const t=o.map((e,t)=>{const s=o.slice();return s[t]+=10*c,(r(...s)-a)/(s[t]-o[t])});if(o=o.map((e,r)=>e+t[r]*-c),a=r(...o),e(t)<n)break;yield{coefficients:o,iter:i,slopes:t},i++}return o}export{t as default};
//# sourceMappingURL=index.modern.js.map