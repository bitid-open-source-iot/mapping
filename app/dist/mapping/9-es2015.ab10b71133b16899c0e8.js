(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{UUSl:function(r,a,t){"use strict";t.r(a),t.d(a,"SignupModule",(function(){return _}));var e=t("ofXK"),i=t("NFeN"),n=t("qFsG"),o=t("bTqV"),s=t("/t3+"),m=t("kmnG"),b=t("mrSG"),c=t("3Pt+"),l=t("fXoL"),p=t("9ZKQ"),f=t("tyNb"),u=t("IRyT"),d=t("dWDE"),g=t("bv9b");function h(r,a){1&r&&l.Pb(0,"mat-progress-bar",13)}function y(r,a){if(1&r&&(l.Tb(0,"mat-error"),l.xc(1),l.Sb()),2&r){const r=l.fc();l.Bb(1),l.zc(" ",r.errors.email," ")}}function v(r,a){if(1&r&&(l.Tb(0,"mat-error"),l.xc(1),l.Sb()),2&r){const r=l.fc();l.Bb(1),l.zc(" ",r.errors.password," ")}}function w(r,a){if(1&r&&(l.Tb(0,"mat-error"),l.xc(1),l.Sb()),2&r){const r=l.fc();l.Bb(1),l.zc(" ",r.errors.confirm," ")}}const k=[{path:"",component:(()=>{class r{constructor(r,a,t,e){this.toast=r,this.router=a,this.service=t,this.formerror=e,this.form=new c.d({email:new c.b("",[c.p.required,c.p.email]),confirm:new c.b("",[c.p.required]),password:new c.b("",[c.p.required])}),this.errors={email:"",confirm:"",password:""},this.subscriptions={}}submit(){return Object(b.a)(this,void 0,void 0,(function*(){this.loading=!0,this.form.disable();const r=yield this.service.register({email:this.form.value.email,confirm:this.form.value.confirm,password:this.form.value.password});this.form.enable(),this.loading=!1,r.ok?(this.router.navigate(["/verify-account"],{replaceUrl:!0}),this.toast.success("registration was successful!")):this.toast.error(r.error.message)}))}ngOnInit(){this.subscriptions.form=this.form.valueChanges.subscribe(r=>{this.errors=this.formerror.validateForm(this.form,this.errors,!0),this.errors.confirm=r.password!=r.confirm?"passwords do not match":""})}ngOnDestroy(){this.subscriptions.form.unsubscribe()}}return r.\u0275fac=function(a){return new(a||r)(l.Ob(p.a),l.Ob(f.c),l.Ob(u.a),l.Ob(d.a))},r.\u0275cmp=l.Ib({type:r,selectors:[["app-signup"]],decls:35,vars:5,consts:[["mat-icon-button","","color","primary","routerLink","/signin"],[1,"title","spacer"],["mode","indeterminate",4,"ngIf"],[3,"formGroup","ngSubmit"],["appearance","outline"],["matInput","","type","email","name","email","placeholder","email","formControlName","email","required",""],[4,"ngIf"],["matInput","","type","password","name","password","placeholder","password","formControlName","password","required",""],["matInput","","type","password","name","confirm","placeholder","confirm password","formControlName","confirm","required",""],["type","submit","mat-flat-button","","color","primary"],["routerLink","/terms-and-conditions"],["routerLink","/privacy-policy"],["mat-stroked-button","","color","primary","routerLink","/verify-account"],["mode","indeterminate"]],template:function(r,a){1&r&&(l.Tb(0,"mat-toolbar"),l.Tb(1,"button",0),l.Tb(2,"mat-icon"),l.xc(3," arrow_back "),l.Sb(),l.Sb(),l.Tb(4,"div",1),l.xc(5," sign up "),l.Sb(),l.Sb(),l.wc(6,h,1,0,"mat-progress-bar",2),l.Tb(7,"form",3),l.bc("ngSubmit",(function(){return!a.form.invalid&&a.form.value.confirm==a.form.value.password&&a.submit()})),l.Tb(8,"mat-form-field",4),l.Tb(9,"mat-label"),l.xc(10," Email "),l.Sb(),l.Pb(11,"input",5),l.wc(12,y,2,1,"mat-error",6),l.Sb(),l.Tb(13,"mat-form-field",4),l.Tb(14,"mat-label"),l.xc(15," Password "),l.Sb(),l.Pb(16,"input",7),l.wc(17,v,2,1,"mat-error",6),l.Sb(),l.Tb(18,"mat-form-field",4),l.Tb(19,"mat-label"),l.xc(20," Confirm Password "),l.Sb(),l.Pb(21,"input",8),l.wc(22,w,2,1,"mat-error",6),l.Sb(),l.Tb(23,"button",9),l.xc(24," submit "),l.Sb(),l.Tb(25,"p"),l.xc(26," By clicking \u201cSIGN UP\u201d, you agree to our "),l.Tb(27,"a",10),l.xc(28,"Terms & Conditions"),l.Sb(),l.xc(29," and "),l.Tb(30,"a",11),l.xc(31,"Privacy Policy"),l.Sb(),l.xc(32,". We\u2019ll occasionally send you account related emails. "),l.Sb(),l.Tb(33,"button",12),l.xc(34," verify account "),l.Sb(),l.Sb()),2&r&&(l.Bb(6),l.mc("ngIf",a.loading),l.Bb(1),l.mc("formGroup",a.form),l.Bb(5),l.mc("ngIf",a.errors.email),l.Bb(5),l.mc("ngIf",a.errors.password),l.Bb(5),l.mc("ngIf",a.errors.confirm))},directives:[s.a,o.a,f.d,i.a,e.m,c.q,c.j,c.e,m.c,m.f,n.a,c.a,c.i,c.c,c.o,f.f,g.a,m.b],styles:["mat-toolbar[_ngcontent-%COMP%]{background-color:transparent}.title[_ngcontent-%COMP%]{text-align:center;padding-right:40px;text-transform:uppercase}form[_ngcontent-%COMP%]{width:400px;padding:0 10px;margin:50px auto auto}form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{flex:1 auto;height:50px;font-size:16px;font-weight:400;margin-bottom:15px;text-transform:uppercase}@media screen and (max-width:420px){form[_ngcontent-%COMP%]{width:calc(100% - 20px)}}p[_ngcontent-%COMP%]{font-size:12px;margin-top:15px;text-align:justify;line-height:15px}p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#2196f3}"]}),r})()}];let x=(()=>{class r{}return r.\u0275mod=l.Mb({type:r}),r.\u0275inj=l.Lb({factory:function(a){return new(a||r)},imports:[[f.g.forChild(k)],f.g]}),r})(),_=(()=>{class r{}return r.\u0275mod=l.Mb({type:r}),r.\u0275inj=l.Lb({factory:function(a){return new(a||r)},imports:[[c.f,e.c,i.b,n.b,o.b,s.b,m.e,c.n,x,g.b]]}),r})()},bv9b:function(r,a,t){"use strict";t.d(a,"a",(function(){return g})),t.d(a,"b",(function(){return y}));var e=t("fXoL"),i=t("ofXK"),n=t("FKr1"),o=t("8LU1"),s=t("R1ws"),m=t("quSY"),b=t("xgIS"),c=t("pLZG");const l=["primaryValueBar"];class p{constructor(r){this._elementRef=r}}const f=Object(n.p)(p,"primary"),u=new e.q("mat-progress-bar-location",{providedIn:"root",factory:function(){const r=Object(e.U)(i.d),a=r?r.location:null;return{getPathname:()=>a?a.pathname+a.search:""}}});let d=0,g=(()=>{class r extends f{constructor(r,a,t,i){super(r),this._elementRef=r,this._ngZone=a,this._animationMode=t,this._isNoopAnimation=!1,this._value=0,this._bufferValue=0,this.animationEnd=new e.n,this._animationEndSubscription=m.a.EMPTY,this.mode="determinate",this.progressbarId="mat-progress-bar-"+d++;const n=i?i.getPathname().split("#")[0]:"";this._rectangleFillValue=`url('${n}#${this.progressbarId}')`,this._isNoopAnimation="NoopAnimations"===t}get value(){return this._value}set value(r){this._value=h(Object(o.e)(r)||0)}get bufferValue(){return this._bufferValue}set bufferValue(r){this._bufferValue=h(r||0)}_primaryTransform(){return{transform:`scaleX(${this.value/100})`}}_bufferTransform(){return"buffer"===this.mode?{transform:`scaleX(${this.bufferValue/100})`}:null}ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{const r=this._primaryValueBar.nativeElement;this._animationEndSubscription=Object(b.a)(r,"transitionend").pipe(Object(c.a)(a=>a.target===r)).subscribe(()=>{"determinate"!==this.mode&&"buffer"!==this.mode||this._ngZone.run(()=>this.animationEnd.next({value:this.value}))})})}ngOnDestroy(){this._animationEndSubscription.unsubscribe()}}return r.\u0275fac=function(a){return new(a||r)(e.Ob(e.l),e.Ob(e.z),e.Ob(s.a,8),e.Ob(u,8))},r.\u0275cmp=e.Ib({type:r,selectors:[["mat-progress-bar"]],viewQuery:function(r,a){var t;1&r&&e.Cc(l,!0),2&r&&e.nc(t=e.cc())&&(a._primaryValueBar=t.first)},hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100",1,"mat-progress-bar"],hostVars:4,hostBindings:function(r,a){2&r&&(e.Cb("aria-valuenow","indeterminate"===a.mode||"query"===a.mode?null:a.value)("mode",a.mode),e.Fb("_mat-animation-noopable",a._isNoopAnimation))},inputs:{color:"color",mode:"mode",value:"value",bufferValue:"bufferValue"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],features:[e.yb],decls:9,vars:4,consts:[["width","100%","height","4","focusable","false",1,"mat-progress-bar-background","mat-progress-bar-element"],["x","4","y","0","width","8","height","4","patternUnits","userSpaceOnUse",3,"id"],["cx","2","cy","2","r","2"],["width","100%","height","100%"],[1,"mat-progress-bar-buffer","mat-progress-bar-element",3,"ngStyle"],[1,"mat-progress-bar-primary","mat-progress-bar-fill","mat-progress-bar-element",3,"ngStyle"],["primaryValueBar",""],[1,"mat-progress-bar-secondary","mat-progress-bar-fill","mat-progress-bar-element"]],template:function(r,a){1&r&&(e.ec(),e.Tb(0,"svg",0),e.Tb(1,"defs"),e.Tb(2,"pattern",1),e.Pb(3,"circle",2),e.Sb(),e.Sb(),e.Pb(4,"rect",3),e.Sb(),e.dc(),e.Pb(5,"div",4),e.Pb(6,"div",5,6),e.Pb(8,"div",7)),2&r&&(e.Bb(2),e.mc("id",a.progressbarId),e.Bb(2),e.Cb("fill",a._rectangleFillValue),e.Bb(1),e.mc("ngStyle",a._bufferTransform()),e.Bb(1),e.mc("ngStyle",a._primaryTransform()))},directives:[i.n],styles:['.mat-progress-bar{display:block;height:4px;overflow:hidden;position:relative;transition:opacity 250ms linear;width:100%}._mat-animation-noopable.mat-progress-bar{transition:none;animation:none}.mat-progress-bar .mat-progress-bar-element,.mat-progress-bar .mat-progress-bar-fill::after{height:100%;position:absolute;width:100%}.mat-progress-bar .mat-progress-bar-background{width:calc(100% + 10px)}.cdk-high-contrast-active .mat-progress-bar .mat-progress-bar-background{display:none}.mat-progress-bar .mat-progress-bar-buffer{transform-origin:top left;transition:transform 250ms ease}.cdk-high-contrast-active .mat-progress-bar .mat-progress-bar-buffer{border-top:solid 5px;opacity:.5}.mat-progress-bar .mat-progress-bar-secondary{display:none}.mat-progress-bar .mat-progress-bar-fill{animation:none;transform-origin:top left;transition:transform 250ms ease}.cdk-high-contrast-active .mat-progress-bar .mat-progress-bar-fill{border-top:solid 4px}.mat-progress-bar .mat-progress-bar-fill::after{animation:none;content:"";display:inline-block;left:0}.mat-progress-bar[dir=rtl],[dir=rtl] .mat-progress-bar{transform:rotateY(180deg)}.mat-progress-bar[mode=query]{transform:rotateZ(180deg)}.mat-progress-bar[mode=query][dir=rtl],[dir=rtl] .mat-progress-bar[mode=query]{transform:rotateZ(180deg) rotateY(180deg)}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-fill,.mat-progress-bar[mode=query] .mat-progress-bar-fill{transition:none}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-primary,.mat-progress-bar[mode=query] .mat-progress-bar-primary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-primary-indeterminate-translate 2000ms infinite linear;left:-145.166611%}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-primary.mat-progress-bar-fill::after,.mat-progress-bar[mode=query] .mat-progress-bar-primary.mat-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-primary-indeterminate-scale 2000ms infinite linear}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-secondary,.mat-progress-bar[mode=query] .mat-progress-bar-secondary{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-secondary-indeterminate-translate 2000ms infinite linear;left:-54.888891%;display:block}.mat-progress-bar[mode=indeterminate] .mat-progress-bar-secondary.mat-progress-bar-fill::after,.mat-progress-bar[mode=query] .mat-progress-bar-secondary.mat-progress-bar-fill::after{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-secondary-indeterminate-scale 2000ms infinite linear}.mat-progress-bar[mode=buffer] .mat-progress-bar-background{-webkit-backface-visibility:hidden;backface-visibility:hidden;animation:mat-progress-bar-background-scroll 250ms infinite linear;display:block}.mat-progress-bar._mat-animation-noopable .mat-progress-bar-fill,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-fill::after,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-buffer,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-primary,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-primary.mat-progress-bar-fill::after,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-secondary,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-secondary.mat-progress-bar-fill::after,.mat-progress-bar._mat-animation-noopable .mat-progress-bar-background{animation:none;transition-duration:1ms}@keyframes mat-progress-bar-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mat-progress-bar-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mat-progress-bar-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mat-progress-bar-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mat-progress-bar-background-scroll{to{transform:translateX(-8px)}}\n'],encapsulation:2,changeDetection:0}),r})();function h(r,a=0,t=100){return Math.max(a,Math.min(t,r))}let y=(()=>{class r{}return r.\u0275mod=e.Mb({type:r}),r.\u0275inj=e.Lb({factory:function(a){return new(a||r)},imports:[[i.c,n.d],n.d]}),r})()}}]);