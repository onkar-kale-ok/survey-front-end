import{a as f}from"./index.becf6c0c.js";import{_ as V,u as d,e as _,f as w,x as e,y as a,bf as h,F as c,h as b,bg as g,bh as y,bi as x,bj as v,V as i,z as n}from"./index.0ee80c0a.js";import{V as C,a as T,b as B}from"./VLayout.83ffc63a.js";import{V as F}from"./VCardText.44edbe48.js";import{V as k}from"./VForm.b80d683c.js";import{V as r}from"./VTextField.685c1fe2.js";import"./VAvatar.417c8f48.js";const R={name:"register",data(){return{input:{name:"",password:""},name:"",password:"",email:"",dob:""}},methods:{register(){console.log("in register  fun",this.name),this.name!=""&&this.password!=""&&this.email!=""?f({method:"POST",url:"http://localhost:9005/api/survey/createUser",data:{email:this.email,password:this.password,fullName:this.name,dataOfBirth:this.dob,createdBy:this.email},headers:{"x-developer-token":"c256f988-459a-43ca-8fef-9c14f7134900","x-api-key":"qwrtrthedwd2124@#$%2sSQw2","Content-Type":"application/json"}}).then(t=>{t.resultCode==200?(alert(t.resultMessage),this.userid=t.data.ResponseData,this.$router.push({name:"login"})):alert(t.resultMessage)},t=>{console.error(t)}):console.log("A username and password must be present")}}},U=b("h1",null,"Register an Account",-1),N=n("Fill the Form to Register"),P=n("Register"),A=n("Cancel");function j(t,s,O,S,o,m){const u=d("v-flex"),p=d("v-content");return _(),w(c,null,[U,e(h,{id:"inspire"},{default:a(()=>[e(p,null,{default:a(()=>[e(g,{fluid:"","fill-height":""},{default:a(()=>[e(C,{"align-center":"","justify-center":""},{default:a(()=>[e(u,{xs12:"",sm8:"",md4:""},{default:a(()=>[e(T,{class:"elevation-12"},{default:a(()=>[e(y,{dark:""},{default:a(()=>[e(x,null,{default:a(()=>[N]),_:1})]),_:1}),e(F,null,{default:a(()=>[e(k,null,{default:a(()=>[e(r,{name:"name",label:"Full Name",type:"text",modelValue:o.name,"onUpdate:modelValue":s[0]||(s[0]=l=>o.name=l)},null,8,["modelValue"]),e(r,{id:"password",name:"password",label:"Password",type:"password",modelValue:o.password,"onUpdate:modelValue":s[1]||(s[1]=l=>o.password=l)},null,8,["modelValue"]),e(r,{id:"password",name:"cpassword",label:"Confirm Password",type:"password",modelValue:t.confirmPassword,"onUpdate:modelValue":s[2]||(s[2]=l=>t.confirmPassword=l)},null,8,["modelValue"]),e(r,{name:"email",label:"Email",type:"text",modelValue:o.email,"onUpdate:modelValue":s[3]||(s[3]=l=>o.email=l)},null,8,["modelValue"]),e(r,{name:"dob",label:"Date Of Birth (mm/dd/yy)",type:"date",modelValue:o.dob,"onUpdate:modelValue":s[4]||(s[4]=l=>o.dob=l)},null,8,["modelValue"])]),_:1})]),_:1}),e(B,null,{default:a(()=>[e(v),e(i,{onClick:s[5]||(s[5]=l=>m.register())},{default:a(()=>[P]),_:1}),e(i,{to:"/"},{default:a(()=>[A]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})],64)}var G=V(R,[["render",j]]);export{G as default};
