import{_ as a,e as _,r as h,o as e,c as o,d as t,F as l,f as u,b as r,t as c,a as p,w as P}from"./index-e4591d58.js";const{VITE_APP_API:w,VITE_APP_PATH:f}={VITE_APP_API:"https://vue3-course-api.hexschool.io",VITE_APP_PATH:"deliciousfood",BASE_URL:"/week6/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},g={data(){return{products:[],productId:"",cart:[],loadingId:"",user:{},isLoading:!0}},components:{RouterLink:_},methods:{getProducts(){this.$http.get(`${w}/v2/api/${f}/products`).then(d=>{this.products=d.data.products}).catch(d=>{alert(d.response.data.message)})}},mounted(){this.getProducts()}},m={class:"container"},k={class:"row py-3"},v={class:"col-md-6"},A=t("h2",null,"產品列表",-1),V={class:"table table-hover mt-4"},E=t("thead",null,[t("tr",null,[t("th",{width:"150"},"產品名稱"),t("th",{width:"120"},"原價"),t("th",{width:"120"},"售價"),t("th",{width:"150"},"是否啟用"),t("th",{width:"120"},"查看細節")])],-1),I={width:"150"},x={width:"120"},T={width:"120"},b={width:"150"},y={key:0,class:"text-success"},L={key:1},R={class:"col-md-6"};function $(d,B,D,S,n,N){const i=h("RouterLink");return e(),o("div",null,[t("div",m,[t("div",k,[t("div",v,[A,t("table",V,[E,t("tbody",null,[(e(!0),o(l,null,u(n.products,s=>(e(),o("tr",{key:s.id},[t("td",I,c(s.title),1),t("td",x,c(s.origin_price),1),t("td",T,c(s.price),1),t("td",b,[s.is_enabled?(e(),o("span",y,"啟用")):(e(),o("span",L,"未啟用"))])]))),128))])]),t("p",null,[r(" 目前有 "),t("span",null,c(n.products.length),1),r(" 項產品 ")])]),t("div",R,[p(i,{to:`/Product/${n.products.id}`},{default:P(()=>[r("單一產品細節")]),_:1},8,["to"])])])])])}const F=a(g,[["render",$]]);export{F as default};