import{G as i,O as v,aa as m,aA as g,aC as C,ah as V,C as k,U as y,W as f,ab as S,aG as A,aH as P,D as z,x as e,B,$ as R}from"./index.0ee80c0a.js";const b=i({color:String,start:Boolean,end:Boolean,icon:v,image:String,...m(),...g(),...C(),...V()}),I=k({name:"VAvatar",props:b(),setup(a,o){let{slots:s}=o;const{backgroundColorClasses:n,backgroundColorStyles:l}=y(f(a,"color")),{densityClasses:r}=S(a),{roundedClasses:u}=A(a),{sizeClasses:c,sizeStyles:d}=P(a);return z(()=>{var t;return e(a.tag,{class:["v-avatar",{"v-avatar--start":a.start,"v-avatar--end":a.end},n.value,r.value,u.value,c.value],style:[l.value,d.value]},{default:()=>[a.image?e(B,{src:a.image,alt:""},null):a.icon?e(R,{icon:a.icon},null):(t=s.default)==null?void 0:t.call(s)]})}),{}}});export{I as V,b as m};
