var Uu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wl=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Jf=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[t++],a=r[t++],u=r[t++],c=((i&7)<<18|(s&63)<<12|(a&63)<<6|u&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const s=r[t++],a=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Al={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],a=i+1<r.length,u=a?r[i+1]:0,c=i+2<r.length,d=c?r[i+2]:0,f=s>>2,p=(s&3)<<4|u>>4;let I=(u&15)<<2|d>>6,b=d&63;c||(b=64,a||(I=64)),n.push(t[f],t[p],t[I],t[b])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(wl(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Jf(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=t[r.charAt(i++)],u=i<r.length?t[r.charAt(i)]:0;++i;const d=i<r.length?t[r.charAt(i)]:64;++i;const p=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||u==null||d==null||p==null)throw new Yf;const I=s<<2|u>>4;if(n.push(I),d!==64){const b=u<<4&240|d>>2;if(n.push(b),p!==64){const V=d<<6&192|p;n.push(V)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Yf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Xf=function(r){const e=wl(r);return Al.encodeByteArray(e,!0)},Ni=function(r){return Xf(r).replace(/\./g,"")},Rl=function(r){try{return Al.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const em=()=>Zf().__FIREBASE_DEFAULTS__,tm=()=>{if(typeof process>"u"||typeof Uu>"u")return;const r=Uu.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},nm=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&Rl(r[1]);return e&&JSON.parse(e)},Zi=()=>{try{return em()||tm()||nm()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},bl=r=>{var e,t;return(t=(e=Zi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},rm=r=>{const e=bl(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},Pl=()=>{var r;return(r=Zi())===null||r===void 0?void 0:r.config},Sl=r=>{var e;return(e=Zi())===null||e===void 0?void 0:e[`_${r}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class im{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sm(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",i=r.iat||0,s=r.sub||r.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},r);return[Ni(JSON.stringify(t)),Ni(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function de(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function om(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(de())}function am(){var r;const e=(r=Zi())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function um(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function cm(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function lm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function hm(){const r=de();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Cl(){return!am()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Vl(){try{return typeof indexedDB=="object"}catch{return!1}}function dm(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fm="FirebaseError";class ot extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=fm,Object.setPrototypeOf(this,ot.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Mr.prototype.create)}}class Mr{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?mm(s,n):"Error",u=`${this.serviceName}: ${a} (${i}).`;return new ot(i,u,n)}}function mm(r,e){return r.replace(pm,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const pm=/\{\$([^}]+)}/g;function gm(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function Ar(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const s=r[i],a=e[i];if(Bu(s)&&Bu(a)){if(!Ar(s,a))return!1}else if(s!==a)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function Bu(r){return r!==null&&typeof r=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lr(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function _m(r,e){const t=new ym(r,e);return t.subscribe.bind(t)}class ym{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");Im(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=$s),i.error===void 0&&(i.error=$s),i.complete===void 0&&(i.complete=$s);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Im(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function $s(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(r){return r&&r._delegate?r._delegate:r}class Ht{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ut="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new im;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Em(e))try{this.getOrInitializeService({instanceIdentifier:Ut})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=Ut){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ut){return this.instances.has(e)}getOptions(e=Ut){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(s);n===u&&a.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),s=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:Tm(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=Ut){return this.component?this.component.multipleInstances?e:Ut:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Tm(r){return r===Ut?void 0:r}function Em(r){return r.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new vm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(W||(W={}));const Am={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},Rm=W.INFO,bm={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Pm=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=bm[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Vo{constructor(e){this.name=e,this._logLevel=Rm,this._logHandler=Pm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Am[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}const Sm=(r,e)=>e.some(t=>r instanceof t);let qu,ju;function Cm(){return qu||(qu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Vm(){return ju||(ju=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Dl=new WeakMap,no=new WeakMap,kl=new WeakMap,Ks=new WeakMap,Do=new WeakMap;function Dm(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",a)},s=()=>{t(vt(r.result)),i()},a=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Dl.set(t,r)}).catch(()=>{}),Do.set(e,r),e}function km(r){if(no.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",a),r.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",a),r.addEventListener("abort",a)});no.set(r,e)}let ro={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return no.get(r);if(e==="objectStoreNames")return r.objectStoreNames||kl.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return vt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function xm(r){ro=r(ro)}function Nm(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(Ws(this),e,...t);return kl.set(n,e.sort?e.sort():[e]),vt(n)}:Vm().includes(r)?function(...e){return r.apply(Ws(this),e),vt(Dl.get(this))}:function(...e){return vt(r.apply(Ws(this),e))}}function Om(r){return typeof r=="function"?Nm(r):(r instanceof IDBTransaction&&km(r),Sm(r,Cm())?new Proxy(r,ro):r)}function vt(r){if(r instanceof IDBRequest)return Dm(r);if(Ks.has(r))return Ks.get(r);const e=Om(r);return e!==r&&(Ks.set(r,e),Do.set(e,r)),e}const Ws=r=>Do.get(r);function Mm(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){const a=indexedDB.open(r,e),u=vt(a);return n&&a.addEventListener("upgradeneeded",c=>{n(vt(a.result),c.oldVersion,c.newVersion,vt(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),u.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const Lm=["get","getKey","getAll","getAllKeys","count"],Fm=["put","add","delete","clear"],Hs=new Map;function zu(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(Hs.get(e))return Hs.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=Fm.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||Lm.includes(t)))return;const s=async function(a,...u){const c=this.transaction(a,i?"readwrite":"readonly");let d=c.store;return n&&(d=d.index(u.shift())),(await Promise.all([d[t](...u),i&&c.done]))[0]};return Hs.set(e,s),s}xm(r=>({...r,get:(e,t,n)=>zu(e,t)||r.get(e,t,n),has:(e,t)=>!!zu(e,t)||r.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Bm(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function Bm(r){const e=r.getComponent();return e?.type==="VERSION"}const io="@firebase/app",Gu="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rt=new Vo("@firebase/app"),qm="@firebase/app-compat",jm="@firebase/analytics-compat",zm="@firebase/analytics",Gm="@firebase/app-check-compat",$m="@firebase/app-check",Km="@firebase/auth",Wm="@firebase/auth-compat",Hm="@firebase/database",Qm="@firebase/data-connect",Jm="@firebase/database-compat",Ym="@firebase/functions",Xm="@firebase/functions-compat",Zm="@firebase/installations",ep="@firebase/installations-compat",tp="@firebase/messaging",np="@firebase/messaging-compat",rp="@firebase/performance",ip="@firebase/performance-compat",sp="@firebase/remote-config",op="@firebase/remote-config-compat",ap="@firebase/storage",up="@firebase/storage-compat",cp="@firebase/firestore",lp="@firebase/vertexai-preview",hp="@firebase/firestore-compat",dp="firebase",fp="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const so="[DEFAULT]",mp={[io]:"fire-core",[qm]:"fire-core-compat",[zm]:"fire-analytics",[jm]:"fire-analytics-compat",[$m]:"fire-app-check",[Gm]:"fire-app-check-compat",[Km]:"fire-auth",[Wm]:"fire-auth-compat",[Hm]:"fire-rtdb",[Qm]:"fire-data-connect",[Jm]:"fire-rtdb-compat",[Ym]:"fire-fn",[Xm]:"fire-fn-compat",[Zm]:"fire-iid",[ep]:"fire-iid-compat",[tp]:"fire-fcm",[np]:"fire-fcm-compat",[rp]:"fire-perf",[ip]:"fire-perf-compat",[sp]:"fire-rc",[op]:"fire-rc-compat",[ap]:"fire-gcs",[up]:"fire-gcs-compat",[cp]:"fire-fst",[hp]:"fire-fst-compat",[lp]:"fire-vertex","fire-js":"fire-js",[dp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rr=new Map,pp=new Map,oo=new Map;function $u(r,e){try{r.container.addComponent(e)}catch(t){rt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function Rn(r){const e=r.name;if(oo.has(e))return rt.debug(`There were multiple attempts to register component ${e}.`),!1;oo.set(e,r);for(const t of Rr.values())$u(t,r);for(const t of pp.values())$u(t,r);return!0}function es(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function je(r){return r.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Tt=new Mr("app","Firebase",gp);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _p{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Ht("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Tt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Un=fp;function yp(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:so,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw Tt.create("bad-app-name",{appName:String(i)});if(t||(t=Pl()),!t)throw Tt.create("no-options");const s=Rr.get(i);if(s){if(Ar(t,s.options)&&Ar(n,s.config))return s;throw Tt.create("duplicate-app",{appName:i})}const a=new wm(i);for(const c of oo.values())a.addComponent(c);const u=new _p(t,n,a);return Rr.set(i,u),u}function xl(r=so){const e=Rr.get(r);if(!e&&r===so&&Pl())return yp();if(!e)throw Tt.create("no-app",{appName:r});return e}function zv(){return Array.from(Rr.values())}function Et(r,e,t){var n;let i=(n=mp[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const u=[`Unable to register library "${i}" with version "${e}":`];s&&u.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&u.push("and"),a&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),rt.warn(u.join(" "));return}Rn(new Ht(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ip="firebase-heartbeat-database",vp=1,br="firebase-heartbeat-store";let Qs=null;function Nl(){return Qs||(Qs=Mm(Ip,vp,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(br)}catch(t){console.warn(t)}}}}).catch(r=>{throw Tt.create("idb-open",{originalErrorMessage:r.message})})),Qs}async function Tp(r){try{const t=(await Nl()).transaction(br),n=await t.objectStore(br).get(Ol(r));return await t.done,n}catch(e){if(e instanceof ot)rt.warn(e.message);else{const t=Tt.create("idb-get",{originalErrorMessage:e?.message});rt.warn(t.message)}}}async function Ku(r,e){try{const n=(await Nl()).transaction(br,"readwrite");await n.objectStore(br).put(e,Ol(r)),await n.done}catch(t){if(t instanceof ot)rt.warn(t.message);else{const n=Tt.create("idb-set",{originalErrorMessage:t?.message});rt.warn(n.message)}}}function Ol(r){return`${r.name}!${r.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ep=1024,wp=720*60*60*1e3;class Ap{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new bp(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Wu();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const u=new Date(a.date).valueOf();return Date.now()-u<=wp}),this._storage.overwrite(this._heartbeatsCache))}catch(n){rt.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Wu(),{heartbeatsToSend:n,unsentEntries:i}=Rp(this._heartbeatsCache.heartbeats),s=Ni(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return rt.warn(t),""}}}function Wu(){return new Date().toISOString().substring(0,10)}function Rp(r,e=Ep){const t=[];let n=r.slice();for(const i of r){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Hu(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Hu(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class bp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Vl()?dm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Tp(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ku(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Ku(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Hu(r){return Ni(JSON.stringify({version:2,heartbeats:r})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pp(r){Rn(new Ht("platform-logger",e=>new Um(e),"PRIVATE")),Rn(new Ht("heartbeat",e=>new Ap(e),"PRIVATE")),Et(io,Gu,r),Et(io,Gu,"esm2017"),Et("fire-js","")}Pp("");var Qu=function(){return Qu=Object.assign||function(e){for(var t,n=1,i=arguments.length;n<i;n++){t=arguments[n];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},Qu.apply(this,arguments)};function ko(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}function Gv(r,e,t){if(t||arguments.length===2)for(var n=0,i=e.length,s;n<i;n++)(s||!(n in e))&&(s||(s=Array.prototype.slice.call(e,0,n)),s[n]=e[n]);return r.concat(s||Array.prototype.slice.call(e))}function Ml(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Sp=Ml,Ll=new Mr("auth","Firebase",Ml());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oi=new Vo("@firebase/auth");function Cp(r,...e){Oi.logLevel<=W.WARN&&Oi.warn(`Auth (${Un}): ${r}`,...e)}function Ti(r,...e){Oi.logLevel<=W.ERROR&&Oi.error(`Auth (${Un}): ${r}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(r,...e){throw No(r,...e)}function Be(r,...e){return No(r,...e)}function xo(r,e,t){const n=Object.assign(Object.assign({},Sp()),{[e]:t});return new Mr("auth","Firebase",n).create(e,{appName:r.name})}function wt(r){return xo(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Fl(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&He(r,"argument-error"),xo(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function No(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Ll.create(r,...e)}function q(r,e,...t){if(!r)throw No(e,...t)}function Ze(r){const e="INTERNAL ASSERTION FAILED: "+r;throw Ti(e),new Error(e)}function it(r,e){r||Ze(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ao(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function Vp(){return Ju()==="http:"||Ju()==="https:"}function Ju(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Vp()||cm()||"connection"in navigator)?navigator.onLine:!0}function kp(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,t){this.shortDelay=e,this.longDelay=t,it(t>e,"Short delay should be less than long delay!"),this.isMobile=om()||lm()}get(){return Dp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Oo(r,e){it(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ze("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ze("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ze("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np=new Fr(3e4,6e4);function Mo(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function Bn(r,e,t,n,i={}){return Bl(r,i,async()=>{let s={},a={};n&&(e==="GET"?a=n:s={body:JSON.stringify(n)});const u=Lr(Object.assign({key:r.config.apiKey},a)).slice(1),c=await r._getAdditionalHeaders();c["Content-Type"]="application/json",r.languageCode&&(c["X-Firebase-Locale"]=r.languageCode);const d=Object.assign({method:e,headers:c},s);return um()||(d.referrerPolicy="no-referrer"),Ul.fetch()(ql(r,r.config.apiHost,t,u),d)})}async function Bl(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},xp),e);try{const i=new Mp(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw mi(r,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const u=s.ok?a.errorMessage:a.error.message,[c,d]=u.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw mi(r,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw mi(r,"email-already-in-use",a);if(c==="USER_DISABLED")throw mi(r,"user-disabled",a);const f=n[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw xo(r,f,d);He(r,f)}}catch(i){if(i instanceof ot)throw i;He(r,"network-request-failed",{message:String(i)})}}async function Op(r,e,t,n,i={}){const s=await Bn(r,e,t,n,i);return"mfaPendingCredential"in s&&He(r,"multi-factor-auth-required",{_serverResponse:s}),s}function ql(r,e,t,n){const i=`${e}${t}?${n}`;return r.config.emulator?Oo(r.config,i):`${r.config.apiScheme}://${i}`}class Mp{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(Be(this.auth,"network-request-failed")),Np.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function mi(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=Be(r,e,n);return i.customData._tokenResponse=t,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lp(r,e){return Bn(r,"POST","/v1/accounts:delete",e)}async function jl(r,e){return Bn(r,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ir(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Fp(r,e=!1){const t=we(r),n=await t.getIdToken(e),i=Lo(n);q(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:n,authTime:Ir(Js(i.auth_time)),issuedAtTime:Ir(Js(i.iat)),expirationTime:Ir(Js(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Js(r){return Number(r)*1e3}function Lo(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return Ti("JWT malformed, contained fewer than 3 sections"),null;try{const i=Rl(t);return i?JSON.parse(i):(Ti("Failed to decode base64 JWT payload"),null)}catch(i){return Ti("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Yu(r){const e=Lo(r);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Pr(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof ot&&Up(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function Up({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ir(this.lastLoginAt),this.creationTime=Ir(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mi(r){var e;const t=r.auth,n=await r.getIdToken(),i=await Pr(r,jl(t,{idToken:n}));q(i?.users.length,t,"internal-error");const s=i.users[0];r._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?zl(s.providerUserInfo):[],u=jp(r.providerData,a),c=r.isAnonymous,d=!(r.email&&s.passwordHash)&&!u?.length,f=c?d:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:u,metadata:new uo(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(r,p)}async function qp(r){const e=we(r);await Mi(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function jp(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function zl(r){return r.map(e=>{var{providerId:t}=e,n=ko(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zp(r,e){const t=await Bl(r,{},async()=>{const n=Lr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,a=ql(r,i,"/v1/token",`key=${s}`),u=await r._getAdditionalHeaders();return u["Content-Type"]="application/x-www-form-urlencoded",Ul.fetch()(a,{method:"POST",headers:u,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Gp(r,e){return Bn(r,"POST","/v2/accounts:revokeToken",Mo(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Yu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){q(e.length!==0,"internal-error");const t=Yu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await zp(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,a=new vn;return n&&(q(typeof n=="string","internal-error",{appName:e}),a.refreshToken=n),i&&(q(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(q(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new vn,this.toJSON())}_performRefresh(){return Ze("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ht(r,e){q(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class et{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,s=ko(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Bp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new uo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await Pr(this,this.stsTokenManager.getToken(this.auth,e));return q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Fp(this,e)}reload(){return qp(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new et(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await Mi(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(je(this.auth.app))return Promise.reject(wt(this.auth));const e=await this.getIdToken();return await Pr(this,Lp(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,a,u,c,d,f;const p=(n=t.displayName)!==null&&n!==void 0?n:void 0,I=(i=t.email)!==null&&i!==void 0?i:void 0,b=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,V=(a=t.photoURL)!==null&&a!==void 0?a:void 0,x=(u=t.tenantId)!==null&&u!==void 0?u:void 0,D=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,z=(d=t.createdAt)!==null&&d!==void 0?d:void 0,B=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:F,emailVerified:Q,isAnonymous:Z,providerData:K,stsTokenManager:v}=t;q(F&&v,e,"internal-error");const g=vn.fromJSON(this.name,v);q(typeof F=="string",e,"internal-error"),ht(p,e.name),ht(I,e.name),q(typeof Q=="boolean",e,"internal-error"),q(typeof Z=="boolean",e,"internal-error"),ht(b,e.name),ht(V,e.name),ht(x,e.name),ht(D,e.name),ht(z,e.name),ht(B,e.name);const y=new et({uid:F,auth:e,email:I,emailVerified:Q,displayName:p,isAnonymous:Z,photoURL:V,phoneNumber:b,tenantId:x,stsTokenManager:g,createdAt:z,lastLoginAt:B});return K&&Array.isArray(K)&&(y.providerData=K.map(T=>Object.assign({},T))),D&&(y._redirectEventId=D),y}static async _fromIdTokenResponse(e,t,n=!1){const i=new vn;i.updateFromServerResponse(t);const s=new et({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await Mi(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];q(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?zl(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,u=new vn;u.updateFromIdToken(n);const c=new et({uid:i.localId,auth:e,stsTokenManager:u,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new uo(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(c,d),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xu=new Map;function tt(r){it(r instanceof Function,"Expected a class definition");let e=Xu.get(r);return e?(it(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Xu.set(r,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}Gl.type="NONE";const Zu=Gl;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ei(r,e,t){return`firebase:${r}:${e}:${t}`}class Tn{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=Ei(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ei("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?et._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new Tn(tt(Zu),e,n);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||tt(Zu);const a=Ei(n,e.config.apiKey,e.name);let u=null;for(const d of t)try{const f=await d._get(a);if(f){const p=et._fromJSON(e,f);d!==s&&(u=p),s=d;break}}catch{}const c=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Tn(s,e,n):(s=c[0],u&&await s._set(a,u.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new Tn(s,e,n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ec(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Hl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if($l(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Jl(e))return"Blackberry";if(Yl(e))return"Webos";if(Kl(e))return"Safari";if((e.includes("chrome/")||Wl(e))&&!e.includes("edge/"))return"Chrome";if(Ql(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function $l(r=de()){return/firefox\//i.test(r)}function Kl(r=de()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Wl(r=de()){return/crios\//i.test(r)}function Hl(r=de()){return/iemobile/i.test(r)}function Ql(r=de()){return/android/i.test(r)}function Jl(r=de()){return/blackberry/i.test(r)}function Yl(r=de()){return/webos/i.test(r)}function Fo(r=de()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function $p(r=de()){var e;return Fo(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Kp(){return hm()&&document.documentMode===10}function Xl(r=de()){return Fo(r)||Ql(r)||Yl(r)||Jl(r)||/windows phone/i.test(r)||Hl(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(r,e=[]){let t;switch(r){case"Browser":t=ec(de());break;case"Worker":t=`${ec(de())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Un}/${n}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=s=>new Promise((a,u)=>{try{const c=e(s);a(c)}catch(c){u(c)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hp(r,e={}){return Bn(r,"GET","/v2/passwordPolicy",Mo(r,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qp=6;class Jp{constructor(e){var t,n,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Qp,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,a,u;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(n=c.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(a=c.containsNumericCharacter)!==null&&a!==void 0?a:!0),c.isValid&&(c.isValid=(u=c.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),c}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yp{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new tc(this),this.idTokenSubscription=new tc(this),this.beforeStateQueue=new Wp(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ll,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=tt(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await Tn.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await jl(this,{idToken:e}),n=await et._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(je(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(u,u))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,u=i?._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===u)&&c?.user&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Mi(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=kp()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(je(this.app))return Promise.reject(wt(this));const t=e?we(e):null;return t&&q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return je(this.app)?Promise.reject(wt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return je(this.app)?Promise.reject(wt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(tt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Hp(this),t=new Jp(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Mr("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await Gp(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&tt(e)||this._popupRedirectResolver;q(t,this,"argument-error"),this.redirectPersistenceManager=await Tn.create(this,[tt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(q(u,this,"internal-error"),u.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,n,i);return()=>{a=!0,c()}}else{const c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Zl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&Cp(`Error while retrieving App Check token: ${t.error}`),t?.token}}function qn(r){return we(r)}class tc{constructor(e){this.auth=e,this.observer=null,this.addObserver=_m(t=>this.observer=t)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Uo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Xp(r){Uo=r}function Zp(r){return Uo.loadJS(r)}function eg(){return Uo.gapiScript}function tg(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ng(r,e){const t=es(r,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Ar(s,e??{}))return i;He(i,"already-initialized")}return t.initialize({options:e})}function rg(r,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(tt);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}function ig(r,e,t){const n=qn(r);q(n._canInitEmulator,n,"emulator-config-failed"),q(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const i=!1,s=eh(e),{host:a,port:u}=sg(e),c=u===null?"":`:${u}`;n.config.emulator={url:`${s}//${a}${c}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:a,port:u,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),og()}function eh(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function sg(r){const e=eh(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){const s=i[1];return{host:s,port:nc(n.substr(s.length+1))}}else{const[s,a]=n.split(":");return{host:s,port:nc(a)}}}function nc(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function og(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ze("not implemented")}_getIdTokenResponse(e){return Ze("not implemented")}_linkToIdToken(e,t){return Ze("not implemented")}_getReauthenticationResolver(e){return Ze("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function En(r,e){return Op(r,"POST","/v1/accounts:signInWithIdp",Mo(r,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ag="http://localhost";class Qt extends th{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Qt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):He("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,s=ko(t,["providerId","signInMethod"]);if(!n||!i)return null;const a=new Qt(n,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return En(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,En(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,En(e,t)}buildRequest(){const e={requestUri:ag,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Lr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur extends ts{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends Ur{constructor(){super("facebook.com")}static credential(e){return Qt._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return mt.credential(e.oauthAccessToken)}catch{return null}}}mt.FACEBOOK_SIGN_IN_METHOD="facebook.com";mt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends Ur{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Qt._fromParams({providerId:pt.PROVIDER_ID,signInMethod:pt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return pt.credentialFromTaggedObject(e)}static credentialFromError(e){return pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return pt.credential(t,n)}catch{return null}}}pt.GOOGLE_SIGN_IN_METHOD="google.com";pt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt extends Ur{constructor(){super("github.com")}static credential(e){return Qt._fromParams({providerId:gt.PROVIDER_ID,signInMethod:gt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return gt.credentialFromTaggedObject(e)}static credentialFromError(e){return gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return gt.credential(e.oauthAccessToken)}catch{return null}}}gt.GITHUB_SIGN_IN_METHOD="github.com";gt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t extends Ur{constructor(){super("twitter.com")}static credential(e,t){return Qt._fromParams({providerId:_t.PROVIDER_ID,signInMethod:_t.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return _t.credentialFromTaggedObject(e)}static credentialFromError(e){return _t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return _t.credential(t,n)}catch{return null}}}_t.TWITTER_SIGN_IN_METHOD="twitter.com";_t.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await et._fromIdTokenResponse(e,n,i),a=rc(n);return new bn({user:s,providerId:a,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=rc(n);return new bn({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function rc(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Li extends ot{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,Li.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new Li(e,t,n,i)}}function nh(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Li._fromErrorAndOperation(r,s,e,n):s})}async function ug(r,e,t=!1){const n=await Pr(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return bn._forOperation(r,"link",n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cg(r,e,t=!1){const{auth:n}=r;if(je(n.app))return Promise.reject(wt(n));const i="reauthenticate";try{const s=await Pr(r,nh(n,i,e,r),t);q(s.idToken,n,"internal-error");const a=Lo(s.idToken);q(a,n,"internal-error");const{sub:u}=a;return q(r.uid===u,n,"user-mismatch"),bn._forOperation(r,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&He(n,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lg(r,e,t=!1){if(je(r.app))return Promise.reject(wt(r));const n="signIn",i=await nh(r,n,e),s=await bn._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}function hg(r,e,t,n){return we(r).onIdTokenChanged(e,t,n)}function dg(r,e,t){return we(r).beforeAuthStateChanged(e,t)}function $v(r,e,t,n){return we(r).onAuthStateChanged(e,t,n)}function Kv(r){return we(r).signOut()}const Fi="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Fi,"1"),this.storage.removeItem(Fi),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fg=1e3,mg=10;class ih extends rh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Xl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,c)=>{this.notifyListeners(a,c)});return}const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(n);!t&&this.localCache[n]===a||this.notifyListeners(n,a)},s=this.storage.getItem(n);Kp()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,mg):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},fg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}ih.type="LOCAL";const pg=ih;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh extends rh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}sh.type="SESSION";const oh=sh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gg(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ns{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const n=new ns(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const u=Array.from(a).map(async d=>d(t.origin,s)),c=await gg(u);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ns.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bo(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _g{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((u,c)=>{const d=Bo("",20);i.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},n);a={messageChannel:i,onMessage(p){const I=p;if(I.data.eventId===d)switch(I.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),u(I.data.response);break;default:clearTimeout(f),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(){return window}function yg(r){$e().location.href=r}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ah(){return typeof $e().WorkerGlobalScope<"u"&&typeof $e().importScripts=="function"}async function Ig(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function vg(){var r;return((r=navigator?.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function Tg(){return ah()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uh="firebaseLocalStorageDb",Eg=1,Ui="firebaseLocalStorage",ch="fbase_key";class Br{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function rs(r,e){return r.transaction([Ui],e?"readwrite":"readonly").objectStore(Ui)}function wg(){const r=indexedDB.deleteDatabase(uh);return new Br(r).toPromise()}function co(){const r=indexedDB.open(uh,Eg);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Ui,{keyPath:ch})}catch(i){t(i)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Ui)?e(n):(n.close(),await wg(),e(await co()))})})}async function ic(r,e,t){const n=rs(r,!0).put({[ch]:e,value:t});return new Br(n).toPromise()}async function Ag(r,e){const t=rs(r,!1).get(e),n=await new Br(t).toPromise();return n===void 0?null:n.value}function sc(r,e){const t=rs(r,!0).delete(e);return new Br(t).toPromise()}const Rg=800,bg=3;class lh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await co(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>bg)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ah()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ns._getInstance(Tg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Ig(),!this.activeServiceWorker)return;this.sender=new _g(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||vg()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await co();return await ic(e,Fi,"1"),await sc(e,Fi),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>ic(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>Ag(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>sc(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=rs(i,!1).getAll();return new Br(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Rg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}lh.type="LOCAL";const Pg=lh;new Fr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qo(r,e){return e?tt(e):(q(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jo extends th{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return En(e,this._buildIdpRequest())}_linkToIdToken(e,t){return En(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return En(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Sg(r){return lg(r.auth,new jo(r),r.bypassAuthState)}function Cg(r){const{auth:e,user:t}=r;return q(t,e,"internal-error"),cg(t,new jo(r),r.bypassAuthState)}async function Vg(r){const{auth:e,user:t}=r;return q(t,e,"internal-error"),ug(t,new jo(r),r.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:a,type:u}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(c))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Sg;case"linkViaPopup":case"linkViaRedirect":return Vg;case"reauthViaPopup":case"reauthViaRedirect":return Cg;default:He(this.auth,"internal-error")}}resolve(e){it(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){it(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dg=new Fr(2e3,1e4);async function Wv(r,e,t){if(je(r.app))return Promise.reject(Be(r,"operation-not-supported-in-this-environment"));const n=qn(r);Fl(r,e,ts);const i=qo(n,t);return new $t(n,"signInViaPopup",e,i).executeNotNull()}class $t extends hh{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,$t.currentPopupAction&&$t.currentPopupAction.cancel(),$t.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){it(this.filter.length===1,"Popup operations only handle one event");const e=Bo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Be(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Be(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,$t.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Be(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Dg.get())};e()}}$t.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kg="pendingRedirect",wi=new Map;class xg extends hh{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=wi.get(this.auth._key());if(!e){try{const n=await Ng(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}wi.set(this.auth._key(),e)}return this.bypassAuthState||wi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ng(r,e){const t=fh(e),n=dh(r);if(!await n._isAvailable())return!1;const i=await n._get(t)==="true";return await n._remove(t),i}async function Og(r,e){return dh(r)._set(fh(e),"true")}function Mg(r,e){wi.set(r._key(),e)}function dh(r){return tt(r._redirectPersistence)}function fh(r){return Ei(kg,r.config.apiKey,r.name)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hv(r,e,t){return Lg(r,e,t)}async function Lg(r,e,t){if(je(r.app))return Promise.reject(wt(r));const n=qn(r);Fl(r,e,ts),await n._initializationPromise;const i=qo(n,t);return await Og(i,n),i._openRedirect(n,e,"signInViaRedirect")}async function Qv(r,e){return await qn(r)._initializationPromise,mh(r,e,!1)}async function mh(r,e,t=!1){if(je(r.app))return Promise.reject(wt(r));const n=qn(r),i=qo(n,e),a=await new xg(n,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await n._persistUserIfCurrent(a.user),await n._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fg=600*1e3;class Ug{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Bg(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!ph(e)){const i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(Be(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Fg&&this.cachedEventUids.clear(),this.cachedEventUids.has(oc(e))}saveEventToCache(e){this.cachedEventUids.add(oc(e)),this.lastProcessedEventTime=Date.now()}}function oc(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function ph({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function Bg(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return ph(r);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qg(r,e={}){return Bn(r,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,zg=/^https?/;async function Gg(r){if(r.config.emulator)return;const{authorizedDomains:e}=await qg(r);for(const t of e)try{if($g(t))return}catch{}He(r,"unauthorized-domain")}function $g(r){const e=ao(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const a=new URL(r);return a.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===n}if(!zg.test(t))return!1;if(jg.test(r))return n===r;const i=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg=new Fr(3e4,6e4);function ac(){const r=$e().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function Wg(r){return new Promise((e,t)=>{var n,i,s;function a(){ac(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ac(),t(Be(r,"network-request-failed"))},timeout:Kg.get()})}if(!((i=(n=$e().gapi)===null||n===void 0?void 0:n.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=$e().gapi)===null||s===void 0)&&s.load)a();else{const u=tg("iframefcb");return $e()[u]=()=>{gapi.load?a():t(Be(r,"network-request-failed"))},Zp(`${eg()}?onload=${u}`).catch(c=>t(c))}}).catch(e=>{throw Ai=null,e})}let Ai=null;function Hg(r){return Ai=Ai||Wg(r),Ai}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qg=new Fr(5e3,15e3),Jg="__/auth/iframe",Yg="emulator/auth/iframe",Xg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Zg=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function e_(r){const e=r.config;q(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?Oo(e,Yg):`https://${r.config.authDomain}/${Jg}`,n={apiKey:e.apiKey,appName:r.name,v:Un},i=Zg.get(r.config.apiHost);i&&(n.eid=i);const s=r._getFrameworks();return s.length&&(n.fw=s.join(",")),`${t}?${Lr(n).slice(1)}`}async function t_(r){const e=await Hg(r),t=$e().gapi;return q(t,r,"internal-error"),e.open({where:document.body,url:e_(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Xg,dontclear:!0},n=>new Promise(async(i,s)=>{await n.restyle({setHideOnLeave:!1});const a=Be(r,"network-request-failed"),u=$e().setTimeout(()=>{s(a)},Qg.get());function c(){$e().clearTimeout(u),i(n)}n.ping(c).then(c,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n_={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},r_=500,i_=600,s_="_blank",o_="http://localhost";class uc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function a_(r,e,t,n=r_,i=i_){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-n)/2,0).toString();let u="";const c=Object.assign(Object.assign({},n_),{width:n.toString(),height:i.toString(),top:s,left:a}),d=de().toLowerCase();t&&(u=Wl(d)?s_:t),$l(d)&&(e=e||o_,c.scrollbars="yes");const f=Object.entries(c).reduce((I,[b,V])=>`${I}${b}=${V},`,"");if($p(d)&&u!=="_self")return u_(e||"",u),new uc(null);const p=window.open(e||"",u,f);q(p,r,"popup-blocked");try{p.focus()}catch{}return new uc(p)}function u_(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c_="__/auth/handler",l_="emulator/auth/handler",h_=encodeURIComponent("fac");async function cc(r,e,t,n,i,s){q(r.config.authDomain,r,"auth-domain-config-required"),q(r.config.apiKey,r,"invalid-api-key");const a={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:Un,eventId:i};if(e instanceof ts){e.setDefaultLanguage(r.languageCode),a.providerId=e.providerId||"",gm(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof Ur){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}r.tenantId&&(a.tid=r.tenantId);const u=a;for(const f of Object.keys(u))u[f]===void 0&&delete u[f];const c=await r._getAppCheckToken(),d=c?`#${h_}=${encodeURIComponent(c)}`:"";return`${d_(r)}?${Lr(u).slice(1)}${d}`}function d_({config:r}){return r.emulator?Oo(r,l_):`https://${r.authDomain}/${c_}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys="webStorageSupport";class f_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=oh,this._completeRedirectFn=mh,this._overrideRedirectResult=Mg}async _openPopup(e,t,n,i){var s;it((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await cc(e,t,n,ao(),i);return a_(e,a,Bo())}async _openRedirect(e,t,n,i){await this._originValidation(e);const s=await cc(e,t,n,ao(),i);return yg(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(it(s,"If manager is not set, promise should be"),s)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await t_(e),n=new Ug(e);return t.register("authEvent",i=>(q(i?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ys,{type:Ys},i=>{var s;const a=(s=i?.[0])===null||s===void 0?void 0:s[Ys];a!==void 0&&t(!!a),He(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Gg(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Xl()||Kl()||Fo()}}const m_=f_;var lc="@firebase/auth",hc="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function __(r){Rn(new Ht("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=n.options;q(a&&!a.includes(":"),"invalid-api-key",{appName:n.name});const c={apiKey:a,authDomain:u,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Zl(r)},d=new Yp(n,i,s,c);return rg(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),Rn(new Ht("auth-internal",e=>{const t=qn(e.getProvider("auth").getImmediate());return(n=>new p_(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Et(lc,hc,g_(r)),Et(lc,hc,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y_=300,I_=Sl("authIdTokenMaxAge")||y_;let dc=null;const v_=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>I_)return;const i=t?.token;dc!==i&&(dc=i,await fetch(r,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function Jv(r=xl()){const e=es(r,"auth");if(e.isInitialized())return e.getImmediate();const t=ng(r,{popupRedirectResolver:m_,persistence:[Pg,pg,oh]}),n=Sl("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(n,location.origin);if(location.origin===s.origin){const a=v_(s.toString());dg(t,a,()=>a(t.currentUser)),hg(t,u=>a(u))}}const i=bl("auth");return i&&ig(t,`http://${i}`),t}function T_(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}Xp({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{const s=Be("internal-error");s.customData=i,t(s)},n.type="text/javascript",n.charset="UTF-8",T_().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});__("Browser");var E_="firebase",w_="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Et(E_,w_,"app");var fc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Kt,gh;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function y(){}y.prototype=g.prototype,v.D=g.prototype,v.prototype=new y,v.prototype.constructor=v,v.C=function(T,E,R){for(var _=Array(arguments.length-2),Je=2;Je<arguments.length;Je++)_[Je-2]=arguments[Je];return g.prototype[E].apply(T,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,g,y){y||(y=0);var T=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)T[E]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(E=0;16>E;++E)T[E]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=v.g[0],y=v.g[1],E=v.g[2];var R=v.g[3],_=g+(R^y&(E^R))+T[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=R+(E^g&(y^E))+T[1]+3905402710&4294967295,R=g+(_<<12&4294967295|_>>>20),_=E+(y^R&(g^y))+T[2]+606105819&4294967295,E=R+(_<<17&4294967295|_>>>15),_=y+(g^E&(R^g))+T[3]+3250441966&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(R^y&(E^R))+T[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(E^g&(y^E))+T[5]+1200080426&4294967295,R=g+(_<<12&4294967295|_>>>20),_=E+(y^R&(g^y))+T[6]+2821735955&4294967295,E=R+(_<<17&4294967295|_>>>15),_=y+(g^E&(R^g))+T[7]+4249261313&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(R^y&(E^R))+T[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(E^g&(y^E))+T[9]+2336552879&4294967295,R=g+(_<<12&4294967295|_>>>20),_=E+(y^R&(g^y))+T[10]+4294925233&4294967295,E=R+(_<<17&4294967295|_>>>15),_=y+(g^E&(R^g))+T[11]+2304563134&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(R^y&(E^R))+T[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=R+(E^g&(y^E))+T[13]+4254626195&4294967295,R=g+(_<<12&4294967295|_>>>20),_=E+(y^R&(g^y))+T[14]+2792965006&4294967295,E=R+(_<<17&4294967295|_>>>15),_=y+(g^E&(R^g))+T[15]+1236535329&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(E^R&(y^E))+T[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^E&(g^y))+T[6]+3225465664&4294967295,R=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(R^g))+T[11]+643717713&4294967295,E=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(E^R))+T[0]+3921069994&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^R&(y^E))+T[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^E&(g^y))+T[10]+38016083&4294967295,R=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(R^g))+T[15]+3634488961&4294967295,E=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(E^R))+T[4]+3889429448&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^R&(y^E))+T[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^E&(g^y))+T[14]+3275163606&4294967295,R=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(R^g))+T[3]+4107603335&4294967295,E=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(E^R))+T[8]+1163531501&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^R&(y^E))+T[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=R+(y^E&(g^y))+T[2]+4243563512&4294967295,R=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(R^g))+T[7]+1735328473&4294967295,E=R+(_<<14&4294967295|_>>>18),_=y+(R^g&(E^R))+T[12]+2368359562&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(y^E^R)+T[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^E)+T[8]+2272392833&4294967295,R=g+(_<<11&4294967295|_>>>21),_=E+(R^g^y)+T[11]+1839030562&4294967295,E=R+(_<<16&4294967295|_>>>16),_=y+(E^R^g)+T[14]+4259657740&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^R)+T[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^E)+T[4]+1272893353&4294967295,R=g+(_<<11&4294967295|_>>>21),_=E+(R^g^y)+T[7]+4139469664&4294967295,E=R+(_<<16&4294967295|_>>>16),_=y+(E^R^g)+T[10]+3200236656&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^R)+T[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^E)+T[0]+3936430074&4294967295,R=g+(_<<11&4294967295|_>>>21),_=E+(R^g^y)+T[3]+3572445317&4294967295,E=R+(_<<16&4294967295|_>>>16),_=y+(E^R^g)+T[6]+76029189&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^R)+T[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=R+(g^y^E)+T[12]+3873151461&4294967295,R=g+(_<<11&4294967295|_>>>21),_=E+(R^g^y)+T[15]+530742520&4294967295,E=R+(_<<16&4294967295|_>>>16),_=y+(E^R^g)+T[2]+3299628645&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(E^(y|~R))+T[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~E))+T[7]+1126891415&4294967295,R=g+(_<<10&4294967295|_>>>22),_=E+(g^(R|~y))+T[14]+2878612391&4294967295,E=R+(_<<15&4294967295|_>>>17),_=y+(R^(E|~g))+T[5]+4237533241&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~R))+T[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~E))+T[3]+2399980690&4294967295,R=g+(_<<10&4294967295|_>>>22),_=E+(g^(R|~y))+T[10]+4293915773&4294967295,E=R+(_<<15&4294967295|_>>>17),_=y+(R^(E|~g))+T[1]+2240044497&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~R))+T[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~E))+T[15]+4264355552&4294967295,R=g+(_<<10&4294967295|_>>>22),_=E+(g^(R|~y))+T[6]+2734768916&4294967295,E=R+(_<<15&4294967295|_>>>17),_=y+(R^(E|~g))+T[13]+1309151649&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~R))+T[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=R+(y^(g|~E))+T[11]+3174756917&4294967295,R=g+(_<<10&4294967295|_>>>22),_=E+(g^(R|~y))+T[2]+718787259&4294967295,E=R+(_<<15&4294967295|_>>>17),_=y+(R^(E|~g))+T[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,v.g[2]=v.g[2]+E&4294967295,v.g[3]=v.g[3]+R&4294967295}n.prototype.u=function(v,g){g===void 0&&(g=v.length);for(var y=g-this.blockSize,T=this.B,E=this.h,R=0;R<g;){if(E==0)for(;R<=y;)i(this,v,R),R+=this.blockSize;if(typeof v=="string"){for(;R<g;)if(T[E++]=v.charCodeAt(R++),E==this.blockSize){i(this,T),E=0;break}}else for(;R<g;)if(T[E++]=v[R++],E==this.blockSize){i(this,T),E=0;break}}this.h=E,this.o+=g},n.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;var y=8*this.o;for(g=v.length-8;g<v.length;++g)v[g]=y&255,y/=256;for(this.u(v),v=Array(16),g=y=0;4>g;++g)for(var T=0;32>T;T+=8)v[y++]=this.g[g]>>>T&255;return v};function s(v,g){var y=u;return Object.prototype.hasOwnProperty.call(y,v)?y[v]:y[v]=g(v)}function a(v,g){this.h=g;for(var y=[],T=!0,E=v.length-1;0<=E;E--){var R=v[E]|0;T&&R==g||(y[E]=R,T=!1)}this.g=y}var u={};function c(v){return-128<=v&&128>v?s(v,function(g){return new a([g|0],0>g?-1:0)}):new a([v|0],0>v?-1:0)}function d(v){if(isNaN(v)||!isFinite(v))return p;if(0>v)return D(d(-v));for(var g=[],y=1,T=0;v>=y;T++)g[T]=v/y|0,y*=4294967296;return new a(g,0)}function f(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return D(f(v.substring(1),g));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(g,8)),T=p,E=0;E<v.length;E+=8){var R=Math.min(8,v.length-E),_=parseInt(v.substring(E,E+R),g);8>R?(R=d(Math.pow(g,R)),T=T.j(R).add(d(_))):(T=T.j(y),T=T.add(d(_)))}return T}var p=c(0),I=c(1),b=c(16777216);r=a.prototype,r.m=function(){if(x(this))return-D(this).m();for(var v=0,g=1,y=0;y<this.g.length;y++){var T=this.i(y);v+=(0<=T?T:4294967296+T)*g,g*=4294967296}return v},r.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(V(this))return"0";if(x(this))return"-"+D(this).toString(v);for(var g=d(Math.pow(v,6)),y=this,T="";;){var E=Q(y,g).g;y=z(y,E.j(g));var R=((0<y.g.length?y.g[0]:y.h)>>>0).toString(v);if(y=E,V(y))return R+T;for(;6>R.length;)R="0"+R;T=R+T}},r.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function V(v){if(v.h!=0)return!1;for(var g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function x(v){return v.h==-1}r.l=function(v){return v=z(this,v),x(v)?-1:V(v)?0:1};function D(v){for(var g=v.g.length,y=[],T=0;T<g;T++)y[T]=~v.g[T];return new a(y,~v.h).add(I)}r.abs=function(){return x(this)?D(this):this},r.add=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],T=0,E=0;E<=g;E++){var R=T+(this.i(E)&65535)+(v.i(E)&65535),_=(R>>>16)+(this.i(E)>>>16)+(v.i(E)>>>16);T=_>>>16,R&=65535,_&=65535,y[E]=_<<16|R}return new a(y,y[y.length-1]&-2147483648?-1:0)};function z(v,g){return v.add(D(g))}r.j=function(v){if(V(this)||V(v))return p;if(x(this))return x(v)?D(this).j(D(v)):D(D(this).j(v));if(x(v))return D(this.j(D(v)));if(0>this.l(b)&&0>v.l(b))return d(this.m()*v.m());for(var g=this.g.length+v.g.length,y=[],T=0;T<2*g;T++)y[T]=0;for(T=0;T<this.g.length;T++)for(var E=0;E<v.g.length;E++){var R=this.i(T)>>>16,_=this.i(T)&65535,Je=v.i(E)>>>16,Kn=v.i(E)&65535;y[2*T+2*E]+=_*Kn,B(y,2*T+2*E),y[2*T+2*E+1]+=R*Kn,B(y,2*T+2*E+1),y[2*T+2*E+1]+=_*Je,B(y,2*T+2*E+1),y[2*T+2*E+2]+=R*Je,B(y,2*T+2*E+2)}for(T=0;T<g;T++)y[T]=y[2*T+1]<<16|y[2*T];for(T=g;T<2*g;T++)y[T]=0;return new a(y,0)};function B(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function F(v,g){this.g=v,this.h=g}function Q(v,g){if(V(g))throw Error("division by zero");if(V(v))return new F(p,p);if(x(v))return g=Q(D(v),g),new F(D(g.g),D(g.h));if(x(g))return g=Q(v,D(g)),new F(D(g.g),g.h);if(30<v.g.length){if(x(v)||x(g))throw Error("slowDivide_ only works with positive integers.");for(var y=I,T=g;0>=T.l(v);)y=Z(y),T=Z(T);var E=K(y,1),R=K(T,1);for(T=K(T,2),y=K(y,2);!V(T);){var _=R.add(T);0>=_.l(v)&&(E=E.add(y),R=_),T=K(T,1),y=K(y,1)}return g=z(v,E.j(g)),new F(E,g)}for(E=p;0<=v.l(g);){for(y=Math.max(1,Math.floor(v.m()/g.m())),T=Math.ceil(Math.log(y)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),R=d(y),_=R.j(g);x(_)||0<_.l(v);)y-=T,R=d(y),_=R.j(g);V(R)&&(R=I),E=E.add(R),v=z(v,_)}return new F(E,v)}r.A=function(v){return Q(this,v).h},r.and=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],T=0;T<g;T++)y[T]=this.i(T)&v.i(T);return new a(y,this.h&v.h)},r.or=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],T=0;T<g;T++)y[T]=this.i(T)|v.i(T);return new a(y,this.h|v.h)},r.xor=function(v){for(var g=Math.max(this.g.length,v.g.length),y=[],T=0;T<g;T++)y[T]=this.i(T)^v.i(T);return new a(y,this.h^v.h)};function Z(v){for(var g=v.g.length+1,y=[],T=0;T<g;T++)y[T]=v.i(T)<<1|v.i(T-1)>>>31;return new a(y,v.h)}function K(v,g){var y=g>>5;g%=32;for(var T=v.g.length-y,E=[],R=0;R<T;R++)E[R]=0<g?v.i(R+y)>>>g|v.i(R+y+1)<<32-g:v.i(R+y);return new a(E,v.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,gh=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,Kt=a}).apply(typeof fc<"u"?fc:typeof self<"u"?self:typeof window<"u"?window:{});var pi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var _h,mr,yh,Ri,lo,Ih,vh,Th;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,h){return o==Array.prototype||o==Object.prototype||(o[l]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof pi=="object"&&pi];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var n=t(this);function i(o,l){if(l)e:{var h=n;o=o.split(".");for(var m=0;m<o.length-1;m++){var w=o[m];if(!(w in h))break e;h=h[w]}o=o[o.length-1],m=h[o],l=l(m),l!=m&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}function s(o,l){o instanceof String&&(o+="");var h=0,m=!1,w={next:function(){if(!m&&h<o.length){var P=h++;return{value:l(P,o[P]),done:!1}}return m=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}i("Array.prototype.values",function(o){return o||function(){return s(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},u=this||self;function c(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function d(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function f(o,l,h){return o.call.apply(o.bind,arguments)}function p(o,l,h){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,m),o.apply(l,w)}}return function(){return o.apply(l,arguments)}}function I(o,l,h){return I=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,I.apply(null,arguments)}function b(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function V(o,l){function h(){}h.prototype=l.prototype,o.aa=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(m,w,P){for(var N=Array(arguments.length-2),ne=2;ne<arguments.length;ne++)N[ne-2]=arguments[ne];return l.prototype[w].apply(m,N)}}function x(o){const l=o.length;if(0<l){const h=Array(l);for(let m=0;m<l;m++)h[m]=o[m];return h}return[]}function D(o,l){for(let h=1;h<arguments.length;h++){const m=arguments[h];if(c(m)){const w=o.length||0,P=m.length||0;o.length=w+P;for(let N=0;N<P;N++)o[w+N]=m[N]}else o.push(m)}}class z{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function B(o){return/^[\s\xa0]*$/.test(o)}function F(){var o=u.navigator;return o&&(o=o.userAgent)?o:""}function Q(o){return Q[" "](o),o}Q[" "]=function(){};var Z=F().indexOf("Gecko")!=-1&&!(F().toLowerCase().indexOf("webkit")!=-1&&F().indexOf("Edge")==-1)&&!(F().indexOf("Trident")!=-1||F().indexOf("MSIE")!=-1)&&F().indexOf("Edge")==-1;function K(o,l,h){for(const m in o)l.call(h,o[m],m,o)}function v(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function g(o){const l={};for(const h in o)l[h]=o[h];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(o,l){let h,m;for(let w=1;w<arguments.length;w++){m=arguments[w];for(h in m)o[h]=m[h];for(let P=0;P<y.length;P++)h=y[P],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function E(o){var l=1;o=o.split(":");const h=[];for(;0<l&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function R(o){u.setTimeout(()=>{throw o},0)}function _(){var o=Ts;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class Je{constructor(){this.h=this.g=null}add(l,h){const m=Kn.get();m.set(l,h),this.h?this.h.next=m:this.g=m,this.h=m}}var Kn=new z(()=>new pf,o=>o.reset());class pf{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Wn,Hn=!1,Ts=new Je,Ua=()=>{const o=u.Promise.resolve(void 0);Wn=()=>{o.then(gf)}};var gf=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(h){R(h)}var l=Kn;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}Hn=!1};function at(){this.s=this.s,this.C=this.C}at.prototype.s=!1,at.prototype.ma=function(){this.s||(this.s=!0,this.N())},at.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ye(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}ye.prototype.h=function(){this.defaultPrevented=!0};var _f=(function(){if(!u.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};u.addEventListener("test",h,l),u.removeEventListener("test",h,l)}catch{}return o})();function Qn(o,l){if(ye.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(Z){e:{try{Q(l.nodeName);var w=!0;break e}catch{}w=!1}w||(l=null)}}else h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement);this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:yf[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Qn.aa.h.call(this)}}V(Qn,ye);var yf={2:"touch",3:"pen",4:"mouse"};Qn.prototype.h=function(){Qn.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Qr="closure_listenable_"+(1e6*Math.random()|0),If=0;function vf(o,l,h,m,w){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!m,this.ha=w,this.key=++If,this.da=this.fa=!1}function Jr(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Yr(o){this.src=o,this.g={},this.h=0}Yr.prototype.add=function(o,l,h,m,w){var P=o.toString();o=this.g[P],o||(o=this.g[P]=[],this.h++);var N=ws(o,l,m,w);return-1<N?(l=o[N],h||(l.fa=!1)):(l=new vf(l,this.src,P,!!m,w),l.fa=h,o.push(l)),l};function Es(o,l){var h=l.type;if(h in o.g){var m=o.g[h],w=Array.prototype.indexOf.call(m,l,void 0),P;(P=0<=w)&&Array.prototype.splice.call(m,w,1),P&&(Jr(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function ws(o,l,h,m){for(var w=0;w<o.length;++w){var P=o[w];if(!P.da&&P.listener==l&&P.capture==!!h&&P.ha==m)return w}return-1}var As="closure_lm_"+(1e6*Math.random()|0),Rs={};function Ba(o,l,h,m,w){if(Array.isArray(l)){for(var P=0;P<l.length;P++)Ba(o,l[P],h,m,w);return null}return h=za(h),o&&o[Qr]?o.K(l,h,d(m)?!!m.capture:!1,w):Tf(o,l,h,!1,m,w)}function Tf(o,l,h,m,w,P){if(!l)throw Error("Invalid event type");var N=d(w)?!!w.capture:!!w,ne=Ps(o);if(ne||(o[As]=ne=new Yr(o)),h=ne.add(l,h,m,N,P),h.proxy)return h;if(m=Ef(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)_f||(w=N),w===void 0&&(w=!1),o.addEventListener(l.toString(),m,w);else if(o.attachEvent)o.attachEvent(ja(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Ef(){function o(h){return l.call(o.src,o.listener,h)}const l=wf;return o}function qa(o,l,h,m,w){if(Array.isArray(l))for(var P=0;P<l.length;P++)qa(o,l[P],h,m,w);else m=d(m)?!!m.capture:!!m,h=za(h),o&&o[Qr]?(o=o.i,l=String(l).toString(),l in o.g&&(P=o.g[l],h=ws(P,h,m,w),-1<h&&(Jr(P[h]),Array.prototype.splice.call(P,h,1),P.length==0&&(delete o.g[l],o.h--)))):o&&(o=Ps(o))&&(l=o.g[l.toString()],o=-1,l&&(o=ws(l,h,m,w)),(h=-1<o?l[o]:null)&&bs(h))}function bs(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[Qr])Es(l.i,o);else{var h=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(h,m,o.capture):l.detachEvent?l.detachEvent(ja(h),m):l.addListener&&l.removeListener&&l.removeListener(m),(h=Ps(l))?(Es(h,o),h.h==0&&(h.src=null,l[As]=null)):Jr(o)}}}function ja(o){return o in Rs?Rs[o]:Rs[o]="on"+o}function wf(o,l){if(o.da)o=!0;else{l=new Qn(l,this);var h=o.listener,m=o.ha||o.src;o.fa&&bs(o),o=h.call(m,l)}return o}function Ps(o){return o=o[As],o instanceof Yr?o:null}var Ss="__closure_events_fn_"+(1e9*Math.random()>>>0);function za(o){return typeof o=="function"?o:(o[Ss]||(o[Ss]=function(l){return o.handleEvent(l)}),o[Ss])}function Ie(){at.call(this),this.i=new Yr(this),this.M=this,this.F=null}V(Ie,at),Ie.prototype[Qr]=!0,Ie.prototype.removeEventListener=function(o,l,h,m){qa(this,o,l,h,m)};function Ae(o,l){var h,m=o.F;if(m)for(h=[];m;m=m.F)h.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new ye(l,o);else if(l instanceof ye)l.target=l.target||o;else{var w=l;l=new ye(m,o),T(l,w)}if(w=!0,h)for(var P=h.length-1;0<=P;P--){var N=l.g=h[P];w=Xr(N,m,!0,l)&&w}if(N=l.g=o,w=Xr(N,m,!0,l)&&w,w=Xr(N,m,!1,l)&&w,h)for(P=0;P<h.length;P++)N=l.g=h[P],w=Xr(N,m,!1,l)&&w}Ie.prototype.N=function(){if(Ie.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var h=o.g[l],m=0;m<h.length;m++)Jr(h[m]);delete o.g[l],o.h--}}this.F=null},Ie.prototype.K=function(o,l,h,m){return this.i.add(String(o),l,!1,h,m)},Ie.prototype.L=function(o,l,h,m){return this.i.add(String(o),l,!0,h,m)};function Xr(o,l,h,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var w=!0,P=0;P<l.length;++P){var N=l[P];if(N&&!N.da&&N.capture==h){var ne=N.listener,pe=N.ha||N.src;N.fa&&Es(o.i,N),w=ne.call(pe,m)!==!1&&w}}return w&&!m.defaultPrevented}function Ga(o,l,h){if(typeof o=="function")h&&(o=I(o,h));else if(o&&typeof o.handleEvent=="function")o=I(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:u.setTimeout(o,l||0)}function $a(o){o.g=Ga(()=>{o.g=null,o.i&&(o.i=!1,$a(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Af extends at{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:$a(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Jn(o){at.call(this),this.h=o,this.g={}}V(Jn,at);var Ka=[];function Wa(o){K(o.g,function(l,h){this.g.hasOwnProperty(h)&&bs(l)},o),o.g={}}Jn.prototype.N=function(){Jn.aa.N.call(this),Wa(this)},Jn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Cs=u.JSON.stringify,Rf=u.JSON.parse,bf=class{stringify(o){return u.JSON.stringify(o,void 0)}parse(o){return u.JSON.parse(o,void 0)}};function Vs(){}Vs.prototype.h=null;function Ha(o){return o.h||(o.h=o.i())}function Qa(){}var Yn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ds(){ye.call(this,"d")}V(Ds,ye);function ks(){ye.call(this,"c")}V(ks,ye);var Nt={},Ja=null;function Zr(){return Ja=Ja||new Ie}Nt.La="serverreachability";function Ya(o){ye.call(this,Nt.La,o)}V(Ya,ye);function Xn(o){const l=Zr();Ae(l,new Ya(l))}Nt.STAT_EVENT="statevent";function Xa(o,l){ye.call(this,Nt.STAT_EVENT,o),this.stat=l}V(Xa,ye);function Re(o){const l=Zr();Ae(l,new Xa(l,o))}Nt.Ma="timingevent";function Za(o,l){ye.call(this,Nt.Ma,o),this.size=l}V(Za,ye);function Zn(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){o()},l)}function er(){this.g=!0}er.prototype.xa=function(){this.g=!1};function Pf(o,l,h,m,w,P){o.info(function(){if(o.g)if(P)for(var N="",ne=P.split("&"),pe=0;pe<ne.length;pe++){var Y=ne[pe].split("=");if(1<Y.length){var ve=Y[0];Y=Y[1];var Te=ve.split("_");N=2<=Te.length&&Te[1]=="type"?N+(ve+"="+Y+"&"):N+(ve+"=redacted&")}}else N=null;else N=P;return"XMLHTTP REQ ("+m+") [attempt "+w+"]: "+l+`
`+h+`
`+N})}function Sf(o,l,h,m,w,P,N){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+w+"]: "+l+`
`+h+`
`+P+" "+N})}function an(o,l,h,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Vf(o,h)+(m?" "+m:"")})}function Cf(o,l){o.info(function(){return"TIMEOUT: "+l})}er.prototype.info=function(){};function Vf(o,l){if(!o.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var m=h[o];if(!(2>m.length)){var w=m[1];if(Array.isArray(w)&&!(1>w.length)){var P=w[0];if(P!="noop"&&P!="stop"&&P!="close")for(var N=1;N<w.length;N++)w[N]=""}}}}return Cs(h)}catch{return l}}var ei={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},eu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},xs;function ti(){}V(ti,Vs),ti.prototype.g=function(){return new XMLHttpRequest},ti.prototype.i=function(){return{}},xs=new ti;function ut(o,l,h,m){this.j=o,this.i=l,this.l=h,this.R=m||1,this.U=new Jn(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new tu}function tu(){this.i=null,this.g="",this.h=!1}var nu={},Ns={};function Os(o,l,h){o.L=1,o.v=si(Ye(l)),o.m=h,o.P=!0,ru(o,null)}function ru(o,l){o.F=Date.now(),ni(o),o.A=Ye(o.v);var h=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),_u(h.i,"t",m),o.C=0,h=o.j.J,o.h=new tu,o.g=Ou(o.j,h?l:null,!o.m),0<o.O&&(o.M=new Af(I(o.Y,o,o.g),o.O)),l=o.U,h=o.g,m=o.ca;var w="readystatechange";Array.isArray(w)||(w&&(Ka[0]=w.toString()),w=Ka);for(var P=0;P<w.length;P++){var N=Ba(h,w[P],m||l.handleEvent,!1,l.h||l);if(!N)break;l.g[N.key]=N}l=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),Xn(),Pf(o.i,o.u,o.A,o.l,o.R,o.m)}ut.prototype.ca=function(o){o=o.target;const l=this.M;l&&Xe(o)==3?l.j():this.Y(o)},ut.prototype.Y=function(o){try{if(o==this.g)e:{const Te=Xe(this.g);var l=this.g.Ba();const ln=this.g.Z();if(!(3>Te)&&(Te!=3||this.g&&(this.h.h||this.g.oa()||Au(this.g)))){this.J||Te!=4||l==7||(l==8||0>=ln?Xn(3):Xn(2)),Ms(this);var h=this.g.Z();this.X=h;t:if(iu(this)){var m=Au(this.g);o="";var w=m.length,P=Xe(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ot(this),tr(this);var N="";break t}this.h.i=new u.TextDecoder}for(l=0;l<w;l++)this.h.h=!0,o+=this.h.i.decode(m[l],{stream:!(P&&l==w-1)});m.length=0,this.h.g+=o,this.C=0,N=this.h.g}else N=this.g.oa();if(this.o=h==200,Sf(this.i,this.u,this.A,this.l,this.R,Te,h),this.o){if(this.T&&!this.K){t:{if(this.g){var ne,pe=this.g;if((ne=pe.g?pe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!B(ne)){var Y=ne;break t}}Y=null}if(h=Y)an(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ls(this,h);else{this.o=!1,this.s=3,Re(12),Ot(this),tr(this);break e}}if(this.P){h=!0;let Ue;for(;!this.J&&this.C<N.length;)if(Ue=Df(this,N),Ue==Ns){Te==4&&(this.s=4,Re(14),h=!1),an(this.i,this.l,null,"[Incomplete Response]");break}else if(Ue==nu){this.s=4,Re(15),an(this.i,this.l,N,"[Invalid Chunk]"),h=!1;break}else an(this.i,this.l,Ue,null),Ls(this,Ue);if(iu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Te!=4||N.length!=0||this.h.h||(this.s=1,Re(16),h=!1),this.o=this.o&&h,!h)an(this.i,this.l,N,"[Invalid Chunked Response]"),Ot(this),tr(this);else if(0<N.length&&!this.W){this.W=!0;var ve=this.j;ve.g==this&&ve.ba&&!ve.M&&(ve.j.info("Great, no buffering proxy detected. Bytes received: "+N.length),zs(ve),ve.M=!0,Re(11))}}else an(this.i,this.l,N,null),Ls(this,N);Te==4&&Ot(this),this.o&&!this.J&&(Te==4?Du(this.j,this):(this.o=!1,ni(this)))}else Hf(this.g),h==400&&0<N.indexOf("Unknown SID")?(this.s=3,Re(12)):(this.s=0,Re(13)),Ot(this),tr(this)}}}catch{}finally{}};function iu(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Df(o,l){var h=o.C,m=l.indexOf(`
`,h);return m==-1?Ns:(h=Number(l.substring(h,m)),isNaN(h)?nu:(m+=1,m+h>l.length?Ns:(l=l.slice(m,m+h),o.C=m+h,l)))}ut.prototype.cancel=function(){this.J=!0,Ot(this)};function ni(o){o.S=Date.now()+o.I,su(o,o.I)}function su(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Zn(I(o.ba,o),l)}function Ms(o){o.B&&(u.clearTimeout(o.B),o.B=null)}ut.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Cf(this.i,this.A),this.L!=2&&(Xn(),Re(17)),Ot(this),this.s=2,tr(this)):su(this,this.S-o)};function tr(o){o.j.G==0||o.J||Du(o.j,o)}function Ot(o){Ms(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,Wa(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function Ls(o,l){try{var h=o.j;if(h.G!=0&&(h.g==o||Fs(h.h,o))){if(!o.K&&Fs(h.h,o)&&h.G==3){try{var m=h.Da.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var w=m;if(w[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)hi(h),ci(h);else break e;js(h),Re(18)}}else h.za=w[1],0<h.za-h.T&&37500>w[2]&&h.F&&h.v==0&&!h.C&&(h.C=Zn(I(h.Za,h),6e3));if(1>=uu(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else Lt(h,11)}else if((o.K||h.g==o)&&hi(h),!B(l))for(w=h.Da.g.parse(l),l=0;l<w.length;l++){let Y=w[l];if(h.T=Y[0],Y=Y[1],h.G==2)if(Y[0]=="c"){h.K=Y[1],h.ia=Y[2];const ve=Y[3];ve!=null&&(h.la=ve,h.j.info("VER="+h.la));const Te=Y[4];Te!=null&&(h.Aa=Te,h.j.info("SVER="+h.Aa));const ln=Y[5];ln!=null&&typeof ln=="number"&&0<ln&&(m=1.5*ln,h.L=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const Ue=o.g;if(Ue){const fi=Ue.g?Ue.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(fi){var P=m.h;P.g||fi.indexOf("spdy")==-1&&fi.indexOf("quic")==-1&&fi.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Us(P,P.h),P.h=null))}if(m.D){const Gs=Ue.g?Ue.g.getResponseHeader("X-HTTP-Session-Id"):null;Gs&&(m.ya=Gs,re(m.I,m.D,Gs))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),m=h;var N=o;if(m.qa=Nu(m,m.J?m.ia:null,m.W),N.K){cu(m.h,N);var ne=N,pe=m.L;pe&&(ne.I=pe),ne.B&&(Ms(ne),ni(ne)),m.g=N}else Cu(m);0<h.i.length&&li(h)}else Y[0]!="stop"&&Y[0]!="close"||Lt(h,7);else h.G==3&&(Y[0]=="stop"||Y[0]=="close"?Y[0]=="stop"?Lt(h,7):qs(h):Y[0]!="noop"&&h.l&&h.l.ta(Y),h.v=0)}}Xn(4)}catch{}}var kf=class{constructor(o,l){this.g=o,this.map=l}};function ou(o){this.l=o||10,u.PerformanceNavigationTiming?(o=u.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function au(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function uu(o){return o.h?1:o.g?o.g.size:0}function Fs(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function Us(o,l){o.g?o.g.add(l):o.h=l}function cu(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}ou.prototype.cancel=function(){if(this.i=lu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function lu(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.D);return l}return x(o.i)}function xf(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var l=[],h=o.length,m=0;m<h;m++)l.push(o[m]);return l}l=[],h=0;for(m in o)l[h++]=o[m];return l}function Nf(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var l=[];o=o.length;for(var h=0;h<o;h++)l.push(h);return l}l=[],h=0;for(const m in o)l[h++]=m;return l}}}function hu(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var h=Nf(o),m=xf(o),w=m.length,P=0;P<w;P++)l.call(void 0,m[P],h&&h[P],o)}var du=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Of(o,l){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var m=o[h].indexOf("="),w=null;if(0<=m){var P=o[h].substring(0,m);w=o[h].substring(m+1)}else P=o[h];l(P,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function Mt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Mt){this.h=o.h,ri(this,o.j),this.o=o.o,this.g=o.g,ii(this,o.s),this.l=o.l;var l=o.i,h=new ir;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),fu(this,h),this.m=o.m}else o&&(l=String(o).match(du))?(this.h=!1,ri(this,l[1]||"",!0),this.o=nr(l[2]||""),this.g=nr(l[3]||"",!0),ii(this,l[4]),this.l=nr(l[5]||"",!0),fu(this,l[6]||"",!0),this.m=nr(l[7]||"")):(this.h=!1,this.i=new ir(null,this.h))}Mt.prototype.toString=function(){var o=[],l=this.j;l&&o.push(rr(l,mu,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(rr(l,mu,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(rr(h,h.charAt(0)=="/"?Ff:Lf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",rr(h,Bf)),o.join("")};function Ye(o){return new Mt(o)}function ri(o,l,h){o.j=h?nr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function ii(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function fu(o,l,h){l instanceof ir?(o.i=l,qf(o.i,o.h)):(h||(l=rr(l,Uf)),o.i=new ir(l,o.h))}function re(o,l,h){o.i.set(l,h)}function si(o){return re(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function nr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function rr(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,Mf),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Mf(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var mu=/[#\/\?@]/g,Lf=/[#\?:]/g,Ff=/[#\?]/g,Uf=/[#\?@]/g,Bf=/#/g;function ir(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function ct(o){o.g||(o.g=new Map,o.h=0,o.i&&Of(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}r=ir.prototype,r.add=function(o,l){ct(this),this.i=null,o=un(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function pu(o,l){ct(o),l=un(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function gu(o,l){return ct(o),l=un(o,l),o.g.has(l)}r.forEach=function(o,l){ct(this),this.g.forEach(function(h,m){h.forEach(function(w){o.call(l,w,m,this)},this)},this)},r.na=function(){ct(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let m=0;m<l.length;m++){const w=o[m];for(let P=0;P<w.length;P++)h.push(l[m])}return h},r.V=function(o){ct(this);let l=[];if(typeof o=="string")gu(this,o)&&(l=l.concat(this.g.get(un(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)l=l.concat(o[h])}return l},r.set=function(o,l){return ct(this),this.i=null,o=un(this,o),gu(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},r.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function _u(o,l,h){pu(o,l),0<h.length&&(o.i=null,o.g.set(un(o,l),x(h)),o.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var m=l[h];const P=encodeURIComponent(String(m)),N=this.V(m);for(m=0;m<N.length;m++){var w=P;N[m]!==""&&(w+="="+encodeURIComponent(String(N[m]))),o.push(w)}}return this.i=o.join("&")};function un(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function qf(o,l){l&&!o.j&&(ct(o),o.i=null,o.g.forEach(function(h,m){var w=m.toLowerCase();m!=w&&(pu(this,m),_u(this,w,h))},o)),o.j=l}function jf(o,l){const h=new er;if(u.Image){const m=new Image;m.onload=b(lt,h,"TestLoadImage: loaded",!0,l,m),m.onerror=b(lt,h,"TestLoadImage: error",!1,l,m),m.onabort=b(lt,h,"TestLoadImage: abort",!1,l,m),m.ontimeout=b(lt,h,"TestLoadImage: timeout",!1,l,m),u.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function zf(o,l){const h=new er,m=new AbortController,w=setTimeout(()=>{m.abort(),lt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(P=>{clearTimeout(w),P.ok?lt(h,"TestPingServer: ok",!0,l):lt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(w),lt(h,"TestPingServer: error",!1,l)})}function lt(o,l,h,m,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),m(h)}catch{}}function Gf(){this.g=new bf}function $f(o,l,h){const m=h||"";try{hu(o,function(w,P){let N=w;d(w)&&(N=Cs(w)),l.push(m+P+"="+encodeURIComponent(N))})}catch(w){throw l.push(m+"type="+encodeURIComponent("_badmap")),w}}function oi(o){this.l=o.Ub||null,this.j=o.eb||!1}V(oi,Vs),oi.prototype.g=function(){return new ai(this.l,this.j)},oi.prototype.i=(function(o){return function(){return o}})({});function ai(o,l){Ie.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}V(ai,Ie),r=ai.prototype,r.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,or(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||u).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,sr(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,or(this)),this.g&&(this.readyState=3,or(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;yu(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function yu(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?sr(this):or(this),this.readyState==3&&yu(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,sr(this))},r.Qa=function(o){this.g&&(this.response=o,sr(this))},r.ga=function(){this.g&&sr(this)};function sr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,or(o)}r.setRequestHeader=function(o,l){this.u.append(o,l)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function or(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ai.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Iu(o){let l="";return K(o,function(h,m){l+=m,l+=":",l+=h,l+=`\r
`}),l}function Bs(o,l,h){e:{for(m in h){var m=!1;break e}m=!0}m||(h=Iu(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):re(o,l,h))}function ue(o){Ie.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}V(ue,Ie);var Kf=/^https?$/i,Wf=["POST","PUT"];r=ue.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,l,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():xs.g(),this.v=this.o?Ha(this.o):Ha(xs),this.g.onreadystatechange=I(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(P){vu(this,P);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var w in m)h.set(w,m[w]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const P of m.keys())h.set(P,m.get(P));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(P=>P.toLowerCase()=="content-type"),w=u.FormData&&o instanceof u.FormData,!(0<=Array.prototype.indexOf.call(Wf,l,void 0))||m||w||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,N]of h)this.g.setRequestHeader(P,N);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{wu(this),this.u=!0,this.g.send(o),this.u=!1}catch(P){vu(this,P)}};function vu(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,Tu(o),ui(o)}function Tu(o){o.A||(o.A=!0,Ae(o,"complete"),Ae(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Ae(this,"complete"),Ae(this,"abort"),ui(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),ui(this,!0)),ue.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Eu(this):this.bb())},r.bb=function(){Eu(this)};function Eu(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Xe(o)!=4||o.Z()!=2)){if(o.u&&Xe(o)==4)Ga(o.Ea,0,o);else if(Ae(o,"readystatechange"),Xe(o)==4){o.h=!1;try{const N=o.Z();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var m;if(m=N===0){var w=String(o.D).match(du)[1]||null;!w&&u.self&&u.self.location&&(w=u.self.location.protocol.slice(0,-1)),m=!Kf.test(w?w.toLowerCase():"")}h=m}if(h)Ae(o,"complete"),Ae(o,"success");else{o.m=6;try{var P=2<Xe(o)?o.g.statusText:""}catch{P=""}o.l=P+" ["+o.Z()+"]",Tu(o)}}finally{ui(o)}}}}function ui(o,l){if(o.g){wu(o);const h=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||Ae(o,"ready");try{h.onreadystatechange=m}catch{}}}function wu(o){o.I&&(u.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function Xe(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<Xe(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),Rf(l)}};function Au(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function Hf(o){const l={};o=(o.g&&2<=Xe(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(B(o[m]))continue;var h=E(o[m]);const w=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const P=l[w]||[];l[w]=P,P.push(h)}v(l,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ar(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function Ru(o){this.Aa=0,this.i=[],this.j=new er,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ar("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ar("baseRetryDelayMs",5e3,o),this.cb=ar("retryDelaySeedMs",1e4,o),this.Wa=ar("forwardChannelMaxRetries",2,o),this.wa=ar("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new ou(o&&o.concurrentRequestLimit),this.Da=new Gf,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Ru.prototype,r.la=8,r.G=1,r.connect=function(o,l,h,m){Re(0),this.W=o,this.H=l||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.I=Nu(this,null,this.W),li(this)};function qs(o){if(bu(o),o.G==3){var l=o.U++,h=Ye(o.I);if(re(h,"SID",o.K),re(h,"RID",l),re(h,"TYPE","terminate"),ur(o,h),l=new ut(o,o.j,l),l.L=2,l.v=si(Ye(h)),h=!1,u.navigator&&u.navigator.sendBeacon)try{h=u.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&u.Image&&(new Image().src=l.v,h=!0),h||(l.g=Ou(l.j,null),l.g.ea(l.v)),l.F=Date.now(),ni(l)}xu(o)}function ci(o){o.g&&(zs(o),o.g.cancel(),o.g=null)}function bu(o){ci(o),o.u&&(u.clearTimeout(o.u),o.u=null),hi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&u.clearTimeout(o.s),o.s=null)}function li(o){if(!au(o.h)&&!o.s){o.s=!0;var l=o.Ga;Wn||Ua(),Hn||(Wn(),Hn=!0),Ts.add(l,o),o.B=0}}function Qf(o,l){return uu(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Zn(I(o.Ga,o,l),ku(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const w=new ut(this,this.j,o);let P=this.o;if(this.S&&(P?(P=g(P),T(P,this.S)):P=this.S),this.m!==null||this.O||(w.H=P,P=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=Su(this,w,l),h=Ye(this.I),re(h,"RID",o),re(h,"CVER",22),this.D&&re(h,"X-HTTP-Session-Id",this.D),ur(this,h),P&&(this.O?l="headers="+encodeURIComponent(String(Iu(P)))+"&"+l:this.m&&Bs(h,this.m,P)),Us(this.h,w),this.Ua&&re(h,"TYPE","init"),this.P?(re(h,"$req",l),re(h,"SID","null"),w.T=!0,Os(w,h,null)):Os(w,h,l),this.G=2}}else this.G==3&&(o?Pu(this,o):this.i.length==0||au(this.h)||Pu(this))};function Pu(o,l){var h;l?h=l.l:h=o.U++;const m=Ye(o.I);re(m,"SID",o.K),re(m,"RID",h),re(m,"AID",o.T),ur(o,m),o.m&&o.o&&Bs(m,o.m,o.o),h=new ut(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),l&&(o.i=l.D.concat(o.i)),l=Su(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Us(o.h,h),Os(h,m,l)}function ur(o,l){o.H&&K(o.H,function(h,m){re(l,m,h)}),o.l&&hu({},function(h,m){re(l,m,h)})}function Su(o,l,h){h=Math.min(o.i.length,h);var m=o.l?I(o.l.Na,o.l,o):null;e:{var w=o.i;let P=-1;for(;;){const N=["count="+h];P==-1?0<h?(P=w[0].g,N.push("ofs="+P)):P=0:N.push("ofs="+P);let ne=!0;for(let pe=0;pe<h;pe++){let Y=w[pe].g;const ve=w[pe].map;if(Y-=P,0>Y)P=Math.max(0,w[pe].g-100),ne=!1;else try{$f(ve,N,"req"+Y+"_")}catch{m&&m(ve)}}if(ne){m=N.join("&");break e}}}return o=o.i.splice(0,h),l.D=o,m}function Cu(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;Wn||Ua(),Hn||(Wn(),Hn=!0),Ts.add(l,o),o.v=0}}function js(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Zn(I(o.Fa,o),ku(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,Vu(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Zn(I(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Re(10),ci(this),Vu(this))};function zs(o){o.A!=null&&(u.clearTimeout(o.A),o.A=null)}function Vu(o){o.g=new ut(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=Ye(o.qa);re(l,"RID","rpc"),re(l,"SID",o.K),re(l,"AID",o.T),re(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&re(l,"TO",o.ja),re(l,"TYPE","xmlhttp"),ur(o,l),o.m&&o.o&&Bs(l,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=si(Ye(l)),h.m=null,h.P=!0,ru(h,o)}r.Za=function(){this.C!=null&&(this.C=null,ci(this),js(this),Re(19))};function hi(o){o.C!=null&&(u.clearTimeout(o.C),o.C=null)}function Du(o,l){var h=null;if(o.g==l){hi(o),zs(o),o.g=null;var m=2}else if(Fs(o.h,l))h=l.D,cu(o.h,l),m=1;else return;if(o.G!=0){if(l.o)if(m==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var w=o.B;m=Zr(),Ae(m,new Za(m,h)),li(o)}else Cu(o);else if(w=l.s,w==3||w==0&&0<l.X||!(m==1&&Qf(o,l)||m==2&&js(o)))switch(h&&0<h.length&&(l=o.h,l.i=l.i.concat(h)),w){case 1:Lt(o,5);break;case 4:Lt(o,10);break;case 3:Lt(o,6);break;default:Lt(o,2)}}}function ku(o,l){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*l}function Lt(o,l){if(o.j.info("Error code "+l),l==2){var h=I(o.fb,o),m=o.Xa;const w=!m;m=new Mt(m||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||ri(m,"https"),si(m),w?jf(m.toString(),h):zf(m.toString(),h)}else Re(2);o.G=0,o.l&&o.l.sa(l),xu(o),bu(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Re(2)):(this.j.info("Failed to ping google.com"),Re(1))};function xu(o){if(o.G=0,o.ka=[],o.l){const l=lu(o.h);(l.length!=0||o.i.length!=0)&&(D(o.ka,l),D(o.ka,o.i),o.h.i.length=0,x(o.i),o.i.length=0),o.l.ra()}}function Nu(o,l,h){var m=h instanceof Mt?Ye(h):new Mt(h);if(m.g!="")l&&(m.g=l+"."+m.g),ii(m,m.s);else{var w=u.location;m=w.protocol,l=l?l+"."+w.hostname:w.hostname,w=+w.port;var P=new Mt(null);m&&ri(P,m),l&&(P.g=l),w&&ii(P,w),h&&(P.l=h),m=P}return h=o.D,l=o.ya,h&&l&&re(m,h,l),re(m,"VER",o.la),ur(o,m),m}function Ou(o,l,h){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new ue(new oi({eb:h})):new ue(o.pa),l.Ha(o.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function Mu(){}r=Mu.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function di(){}di.prototype.g=function(o,l){return new ke(o,l)};function ke(o,l){Ie.call(this),this.g=new Ru(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!B(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!B(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new cn(this)}V(ke,Ie),ke.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ke.prototype.close=function(){qs(this.g)},ke.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Cs(o),o=h);l.i.push(new kf(l.Ya++,o)),l.G==3&&li(l)},ke.prototype.N=function(){this.g.l=null,delete this.j,qs(this.g),delete this.g,ke.aa.N.call(this)};function Lu(o){Ds.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}V(Lu,Ds);function Fu(){ks.call(this),this.status=1}V(Fu,ks);function cn(o){this.g=o}V(cn,Mu),cn.prototype.ua=function(){Ae(this.g,"a")},cn.prototype.ta=function(o){Ae(this.g,new Lu(o))},cn.prototype.sa=function(o){Ae(this.g,new Fu)},cn.prototype.ra=function(){Ae(this.g,"b")},di.prototype.createWebChannel=di.prototype.g,ke.prototype.send=ke.prototype.o,ke.prototype.open=ke.prototype.m,ke.prototype.close=ke.prototype.close,Th=function(){return new di},vh=function(){return Zr()},Ih=Nt,lo={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},ei.NO_ERROR=0,ei.TIMEOUT=8,ei.HTTP_ERROR=6,Ri=ei,eu.COMPLETE="complete",yh=eu,Qa.EventType=Yn,Yn.OPEN="a",Yn.CLOSE="b",Yn.ERROR="c",Yn.MESSAGE="d",Ie.prototype.listen=Ie.prototype.K,mr=Qa,ue.prototype.listenOnce=ue.prototype.L,ue.prototype.getLastError=ue.prototype.Ka,ue.prototype.getLastErrorCode=ue.prototype.Ba,ue.prototype.getStatus=ue.prototype.Z,ue.prototype.getResponseJson=ue.prototype.Oa,ue.prototype.getResponseText=ue.prototype.oa,ue.prototype.send=ue.prototype.ea,ue.prototype.setWithCredentials=ue.prototype.Ha,_h=ue}).apply(typeof pi<"u"?pi:typeof self<"u"?self:typeof window<"u"?window:{});const mc="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ge{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ge.UNAUTHENTICATED=new ge(null),ge.GOOGLE_CREDENTIALS=new ge("google-credentials-uid"),ge.FIRST_PARTY=new ge("first-party-uid"),ge.MOCK_USER=new ge("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let jn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt=new Vo("@firebase/firestore");function pn(){return Jt.logLevel}function C(r,...e){if(Jt.logLevel<=W.DEBUG){const t=e.map(zo);Jt.debug(`Firestore (${jn}): ${r}`,...t)}}function be(r,...e){if(Jt.logLevel<=W.ERROR){const t=e.map(zo);Jt.error(`Firestore (${jn}): ${r}`,...t)}}function Pn(r,...e){if(Jt.logLevel<=W.WARN){const t=e.map(zo);Jt.warn(`Firestore (${jn}): ${r}`,...t)}}function zo(r){if(typeof r=="string")return r;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(r)}catch{return r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(r="Unexpected state"){const e=`FIRESTORE (${jn}) INTERNAL ASSERTION FAILED: `+r;throw be(e),new Error(e)}function L(r,e){r||M()}function j(r,e){return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends ot{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class A_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(ge.UNAUTHENTICATED)))}shutdown(){}}class R_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class b_{constructor(e){this.t=e,this.currentUser=ge.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){L(this.o===void 0);let n=this.i;const i=c=>this.i!==n?(n=this.i,t(c)):Promise.resolve();let s=new Ke;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Ke,e.enqueueRetryable((()=>i(this.currentUser)))};const a=()=>{const c=s;e.enqueueRetryable((async()=>{await c.promise,await i(this.currentUser)}))},u=c=>{C("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((c=>u(c))),setTimeout((()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?u(c):(C("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Ke)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(C("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string"),new Eh(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return L(e===null||typeof e=="string"),new ge(e)}}class P_{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=ge.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class S_{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new P_(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(ge.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class C_{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class V_{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){L(this.o===void 0);const n=s=>{s.error!=null&&C("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.R;return this.R=s.token,C("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>n(s)))};const i=s=>{C("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):C("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(L(typeof t.token=="string"),this.R=t.token,new C_(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const i=D_(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<t&&(n+=e.charAt(i[s]%e.length))}return n}}function G(r,e){return r<e?-1:r>e?1:0}function Sn(r,e,t){return r.length===e.length&&r.every(((n,i)=>t(n,e[i])))}function Ah(r){return r+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ae.fromMillis(Date.now())}static fromDate(e){return ae.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new ae(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class U{constructor(e){this.timestamp=e}static fromTimestamp(e){return new U(e)}static min(){return new U(new ae(0,0))}static max(){return new U(new ae(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{constructor(e,t,n){t===void 0?t=0:t>e.length&&M(),n===void 0?n=e.length-t:n>e.length-t&&M(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return Sr.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Sr?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const s=e.get(i),a=t.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class X extends Sr{construct(e,t,n){return new X(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new k(S.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((i=>i.length>0)))}return new X(t)}static emptyPath(){return new X([])}}const k_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class oe extends Sr{construct(e,t,n){return new oe(e,t,n)}static isValidIdentifier(e){return k_.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),oe.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new oe(["__name__"])}static fromServerFormat(e){const t=[];let n="",i=0;const s=()=>{if(n.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let a=!1;for(;i<e.length;){const u=e[i];if(u==="\\"){if(i+1===e.length)throw new k(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new k(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,i+=2}else u==="`"?(a=!a,i++):u!=="."||a?(n+=u,i++):(s(),i++)}if(s(),a)throw new k(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new oe(t)}static emptyPath(){return new oe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(X.fromString(e))}static fromName(e){return new O(X.fromString(e).popFirst(5))}static empty(){return new O(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new X(e.slice()))}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bi{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function ho(r){return r.fields.find((e=>e.kind===2))}function Bt(r){return r.fields.filter((e=>e.kind!==2))}Bi.UNKNOWN_ID=-1;class bi{constructor(e,t){this.fieldPath=e,this.kind=t}}class Cr{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Cr(0,Oe.min())}}function x_(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=U.fromTimestamp(n===1e9?new ae(t+1,0):new ae(t,n));return new Oe(i,O.empty(),e)}function Rh(r){return new Oe(r.readTime,r.key,-1)}class Oe{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new Oe(U.min(),O.empty(),-1)}static max(){return new Oe(U.max(),O.empty(),-1)}}function Go(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(r.documentKey,e.documentKey),t!==0?t:G(r.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bh="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Ph{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sn(r){if(r.code!==S.FAILED_PRECONDITION||r.message!==bh)throw r;C("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&M(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A(((n,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(n,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(n,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):A.reject(t)}static resolve(e){return new A(((t,n)=>{t(e)}))}static reject(e){return new A(((t,n)=>{n(e)}))}static waitFor(e){return new A(((t,n)=>{let i=0,s=0,a=!1;e.forEach((u=>{++i,u.next((()=>{++s,a&&s===i&&t()}),(c=>n(c)))})),a=!0,s===i&&t()}))}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next((i=>i?A.resolve(i):n()));return t}static forEach(e,t){const n=[];return e.forEach(((i,s)=>{n.push(t.call(this,i,s))})),this.waitFor(n)}static mapArray(e,t){return new A(((n,i)=>{const s=e.length,a=new Array(s);let u=0;for(let c=0;c<s;c++){const d=c;t(e[d]).next((f=>{a[d]=f,++u,u===s&&n(a)}),(f=>i(f)))}}))}static doWhile(e,t){return new A(((n,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):n()};s()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class is{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new Ke,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new vr(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{const i=$o(n.target.error);this.V.reject(new vr(e,i))}}static open(e,t,n,i){try{return new is(t,e.transaction(i,n))}catch(s){throw new vr(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(C("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new O_(t)}}class At{constructor(e,t,n){this.name=e,this.version=t,this.p=n,At.S(de())===12.2&&be("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return C("SimpleDb","Removing database:",e),qt(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Vl())return!1;if(At.v())return!0;const e=de(),t=At.S(e),n=0<t&&t<10,i=Sh(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(C("SimpleDb","Opening database:",this.name),this.db=await new Promise(((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const a=s.target.result;t(a)},i.onblocked=()=>{n(new vr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const a=s.target.error;a.name==="VersionError"?n(new k(S.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new k(S.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new vr(e,a))},i.onupgradeneeded=s=>{C("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const a=s.target.result;this.p.O(a,i.transaction,s.oldVersion,this.version).next((()=>{C("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,i){const s=t==="readonly";let a=0;for(;;){++a;try{this.db=await this.M(e);const u=is.open(this.db,e,s?"readonly":"readwrite",n),c=i(u).next((d=>(u.g(),d))).catch((d=>(u.abort(d),A.reject(d)))).toPromise();return c.catch((()=>{})),await u.m,c}catch(u){const c=u,d=c.name!=="FirebaseError"&&a<3;if(C("SimpleDb","Transaction failed with error:",c.message,"Retrying:",d),this.close(),!d)return Promise.reject(c)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Sh(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class N_{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return qt(this.B.delete())}}class vr extends k{constructor(e,t){super(S.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Vt(r){return r.name==="IndexedDbTransactionError"}class O_{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(C("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(C("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),qt(n)}add(e){return C("SimpleDb","ADD",this.store.name,e,e),qt(this.store.add(e))}get(e){return qt(this.store.get(e)).next((t=>(t===void 0&&(t=null),C("SimpleDb","GET",this.store.name,e,t),t)))}delete(e){return C("SimpleDb","DELETE",this.store.name,e),qt(this.store.delete(e))}count(){return C("SimpleDb","COUNT",this.store.name),qt(this.store.count())}U(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(n.range);return new A(((a,u)=>{s.onerror=c=>{u(c.target.error)},s.onsuccess=c=>{a(c.target.result)}}))}{const s=this.cursor(n),a=[];return this.W(s,((u,c)=>{a.push(c)})).next((()=>a))}}G(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A(((i,s)=>{n.onerror=a=>{s(a.target.error)},n.onsuccess=a=>{i(a.target.result)}}))}j(e,t){C("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const i=this.cursor(n);return this.W(i,((s,a,u)=>u.delete()))}J(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.W(i,t)}Y(e){const t=this.cursor({});return new A(((n,i)=>{t.onerror=s=>{const a=$o(s.target.error);i(a)},t.onsuccess=s=>{const a=s.target.result;a?e(a.primaryKey,a.value).next((u=>{u?a.continue():n()})):n()}}))}W(e,t){const n=[];return new A(((i,s)=>{e.onerror=a=>{s(a.target.error)},e.onsuccess=a=>{const u=a.target.result;if(!u)return void i();const c=new N_(u),d=t(u.primaryKey,u.value,c);if(d instanceof A){const f=d.catch((p=>(c.done(),A.reject(p))));n.push(f)}c.isDone?i():c.K===null?u.continue():u.continue(c.K)}})).next((()=>A.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function qt(r){return new A(((e,t)=>{r.onsuccess=n=>{const i=n.target.result;e(i)},r.onerror=n=>{const i=$o(n.target.error);t(i)}}))}let pc=!1;function $o(r){const e=At.S(de());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new k("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return pc||(pc=!0,setTimeout((()=>{throw n}),0)),n}}return r}class M_{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){C("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{C("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){Vt(t)?C("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await sn(t)}await this.X(6e4)}))}}class L_{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.te(t,e)))}te(e,t){const n=new Set;let i=t,s=!0;return A.doWhile((()=>s===!0&&i>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((a=>{if(a!==null&&!n.has(a))return C("IndexBackfiller",`Processing collection: ${a}`),this.ne(e,a,i).next((u=>{i-=u,n.add(a)}));s=!1})))).next((()=>t-i))}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next((s=>{const a=s.changes;return this.localStore.indexManager.updateIndexEntries(e,a).next((()=>this.re(i,s))).next((u=>(C("IndexBackfiller",`Updating offset: ${u}`),this.localStore.indexManager.updateCollectionGroup(e,t,u)))).next((()=>a.size))}))))}re(e,t){let n=e;return t.changes.forEach(((i,s)=>{const a=Rh(s);Go(a,n)>0&&(n=a)})),new Oe(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Me{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}Me.oe=-1;function ss(r){return r==null}function Vr(r){return r===0&&1/r==-1/0}function F_(r){return typeof r=="number"&&Number.isInteger(r)&&!Vr(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=gc(e)),e=U_(r.get(t),e);return gc(e)}function U_(r,e){let t=e;const n=r.length;for(let i=0;i<n;i++){const s=r.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function gc(r){return r+""}function ze(r){const e=r.length;if(L(e>=2),e===2)return L(r.charAt(0)===""&&r.charAt(1)===""),X.emptyPath();const t=e-2,n=[];let i="";for(let s=0;s<e;){const a=r.indexOf("",s);switch((a<0||a>t)&&M(),r.charAt(a+1)){case"":const u=r.substring(s,a);let c;i.length===0?c=u:(i+=u,c=i,i=""),n.push(c);break;case"":i+=r.substring(s,a),i+="\0";break;case"":i+=r.substring(s,a+1);break;default:M()}s=a+2}return new X(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _c=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pi(r,e){return[r,Pe(e)]}function Ch(r,e,t){return[r,Pe(e),t]}const B_={},q_=["prefixPath","collectionGroup","readTime","documentId"],j_=["prefixPath","collectionGroup","documentId"],z_=["collectionGroup","readTime","prefixPath","documentId"],G_=["canonicalId","targetId"],$_=["targetId","path"],K_=["path","targetId"],W_=["collectionId","parent"],H_=["indexId","uid"],Q_=["uid","sequenceNumber"],J_=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Y_=["indexId","uid","orderedDocumentKey"],X_=["userId","collectionPath","documentId"],Z_=["userId","collectionPath","largestBatchId"],ey=["userId","collectionGroup","largestBatchId"],Vh=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],ty=[...Vh,"documentOverlays"],Dh=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],kh=Dh,Ko=[...kh,"indexConfiguration","indexState","indexEntries"],ny=Ko,ry=[...Ko,"globals"];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo extends Ph{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function fe(r,e){const t=j(r);return At.F(t._e,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yc(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function zn(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function xh(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e,t){this.comparator=e,this.root=t||_e.EMPTY}insert(e,t){return new se(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,_e.BLACK,null,null))}remove(e){return new se(this.comparator,this.root.remove(e,this.comparator).copy(null,null,_e.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new gi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new gi(this.root,e,this.comparator,!1)}getReverseIterator(){return new gi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new gi(this.root,e,this.comparator,!0)}}class gi{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class _e{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n??_e.RED,this.left=i??_e.EMPTY,this.right=s??_e.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new _e(e??this.key,t??this.value,n??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return _e.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return _e.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,_e.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,_e.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw M();const e=this.left.check();if(e!==this.right.check())throw M();return e+(this.isRed()?0:1)}}_e.EMPTY=null,_e.RED=!0,_e.BLACK=!1;_e.EMPTY=new class{constructor(){this.size=0}get key(){throw M()}get value(){throw M()}get color(){throw M()}get left(){throw M()}get right(){throw M()}copy(e,t,n,i,s){return this}insert(e,t,n){return new _e(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{constructor(e){this.comparator=e,this.data=new se(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ic(this.data.getIterator())}getIteratorFrom(e){return new Ic(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof te)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new te(this.comparator);return t.data=e,t}}class Ic{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function hn(r){return r.hasNext()?r.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Le{constructor(e){this.fields=e,e.sort(oe.comparator)}static empty(){return new Le([])}unionWith(e){let t=new te(oe.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Le(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Sn(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class he{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Nh("Invalid base64 string: "+s):s}})(e);return new he(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s})(e);return new he(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}he.EMPTY_BYTE_STRING=new he("");const iy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function st(r){if(L(!!r),typeof r=="string"){let e=0;const t=iy.exec(r);if(L(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:ie(r.seconds),nanos:ie(r.nanos)}}function ie(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function bt(r){return typeof r=="string"?he.fromBase64String(r):he.fromUint8Array(r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function os(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Wo(r){const e=r.mapValue.fields.__previous_value__;return os(e)?Wo(e):e}function Dr(r){const e=st(r.mapValue.fields.__local_write_time__.timestampValue);return new ae(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sy{constructor(e,t,n,i,s,a,u,c,d){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=c,this.useFetchStreams=d}}class Yt{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Yt("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Yt&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const It={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},Si={nullValue:"NULL_VALUE"};function Xt(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?os(r)?4:Oh(r)?9007199254740991:as(r)?10:11:M()}function Qe(r,e){if(r===e)return!0;const t=Xt(r);if(t!==Xt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return Dr(r).isEqual(Dr(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=st(i.timestampValue),u=st(s.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(i,s){return bt(i.bytesValue).isEqual(bt(s.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(i,s){return ie(i.geoPointValue.latitude)===ie(s.geoPointValue.latitude)&&ie(i.geoPointValue.longitude)===ie(s.geoPointValue.longitude)})(r,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return ie(i.integerValue)===ie(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=ie(i.doubleValue),u=ie(s.doubleValue);return a===u?Vr(a)===Vr(u):isNaN(a)&&isNaN(u)}return!1})(r,e);case 9:return Sn(r.arrayValue.values||[],e.arrayValue.values||[],Qe);case 10:case 11:return(function(i,s){const a=i.mapValue.fields||{},u=s.mapValue.fields||{};if(yc(a)!==yc(u))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(u[c]===void 0||!Qe(a[c],u[c])))return!1;return!0})(r,e);default:return M()}}function kr(r,e){return(r.values||[]).find((t=>Qe(t,e)))!==void 0}function Pt(r,e){if(r===e)return 0;const t=Xt(r),n=Xt(e);if(t!==n)return G(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return G(r.booleanValue,e.booleanValue);case 2:return(function(s,a){const u=ie(s.integerValue||s.doubleValue),c=ie(a.integerValue||a.doubleValue);return u<c?-1:u>c?1:u===c?0:isNaN(u)?isNaN(c)?0:-1:1})(r,e);case 3:return vc(r.timestampValue,e.timestampValue);case 4:return vc(Dr(r),Dr(e));case 5:return G(r.stringValue,e.stringValue);case 6:return(function(s,a){const u=bt(s),c=bt(a);return u.compareTo(c)})(r.bytesValue,e.bytesValue);case 7:return(function(s,a){const u=s.split("/"),c=a.split("/");for(let d=0;d<u.length&&d<c.length;d++){const f=G(u[d],c[d]);if(f!==0)return f}return G(u.length,c.length)})(r.referenceValue,e.referenceValue);case 8:return(function(s,a){const u=G(ie(s.latitude),ie(a.latitude));return u!==0?u:G(ie(s.longitude),ie(a.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return Tc(r.arrayValue,e.arrayValue);case 10:return(function(s,a){var u,c,d,f;const p=s.fields||{},I=a.fields||{},b=(u=p.value)===null||u===void 0?void 0:u.arrayValue,V=(c=I.value)===null||c===void 0?void 0:c.arrayValue,x=G(((d=b?.values)===null||d===void 0?void 0:d.length)||0,((f=V?.values)===null||f===void 0?void 0:f.length)||0);return x!==0?x:Tc(b,V)})(r.mapValue,e.mapValue);case 11:return(function(s,a){if(s===It.mapValue&&a===It.mapValue)return 0;if(s===It.mapValue)return 1;if(a===It.mapValue)return-1;const u=s.fields||{},c=Object.keys(u),d=a.fields||{},f=Object.keys(d);c.sort(),f.sort();for(let p=0;p<c.length&&p<f.length;++p){const I=G(c[p],f[p]);if(I!==0)return I;const b=Pt(u[c[p]],d[f[p]]);if(b!==0)return b}return G(c.length,f.length)})(r.mapValue,e.mapValue);default:throw M()}}function vc(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return G(r,e);const t=st(r),n=st(e),i=G(t.seconds,n.seconds);return i!==0?i:G(t.nanos,n.nanos)}function Tc(r,e){const t=r.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const s=Pt(t[i],n[i]);if(s)return s}return G(t.length,n.length)}function Cn(r){return mo(r)}function mo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=st(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return bt(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return O.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",i=!0;for(const s of t.values||[])i?i=!1:n+=",",n+=mo(s);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of n)s?s=!1:i+=",",i+=`${a}:${mo(t.fields[a])}`;return i+"}"})(r.mapValue):M()}function Zt(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function po(r){return!!r&&"integerValue"in r}function xr(r){return!!r&&"arrayValue"in r}function Ec(r){return!!r&&"nullValue"in r}function wc(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function Ci(r){return!!r&&"mapValue"in r}function as(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Tr(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return zn(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Tr(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Tr(r.arrayValue.values[t]);return e}return Object.assign({},r)}function Oh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const Mh={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function oy(r){return"nullValue"in r?Si:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Zt(Yt.empty(),O.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?as(r)?Mh:{mapValue:{}}:M()}function ay(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Zt(Yt.empty(),O.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Mh:"mapValue"in r?as(r)?{mapValue:{}}:It:M()}function Ac(r,e){const t=Pt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Rc(r,e){const t=Pt(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class De{constructor(e){this.value=e}static empty(){return new De({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Ci(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Tr(t)}setAll(e){let t=oe.emptyPath(),n={},i=[];e.forEach(((a,u)=>{if(!t.isImmediateParentOf(u)){const c=this.getFieldsMap(t);this.applyChanges(c,n,i),n={},i=[],t=u.popLast()}a?n[u.lastSegment()]=Tr(a):i.push(u.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){const t=this.field(e.popLast());Ci(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Qe(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];Ci(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){zn(t,((i,s)=>e[i]=s));for(const i of n)delete e[i]}clone(){return new De(Tr(this.value))}}function Lh(r){const e=[];return zn(r.fields,((t,n)=>{const i=new oe([t]);if(Ci(n)){const s=Lh(n.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)})),new Le(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e,t,n,i,s,a,u){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=a,this.documentState=u}static newInvalidDocument(e){return new ce(e,0,U.min(),U.min(),U.min(),De.empty(),0)}static newFoundDocument(e,t,n,i){return new ce(e,1,t,U.min(),n,i,0)}static newNoDocument(e,t){return new ce(e,2,t,U.min(),U.min(),De.empty(),0)}static newUnknownDocument(e,t){return new ce(e,3,t,U.min(),U.min(),De.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(U.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=De.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=De.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=U.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ce&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ce(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,t){this.position=e,this.inclusive=t}}function bc(r,e,t){let n=0;for(let i=0;i<r.position.length;i++){const s=e[i],a=r.position[i];if(s.field.isKeyField()?n=O.comparator(O.fromName(a.referenceValue),t.key):n=Pt(a,t.data.field(s.field)),s.dir==="desc"&&(n*=-1),n!==0)break}return n}function Pc(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!Qe(r.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nr{constructor(e,t="asc"){this.field=e,this.dir=t}}function uy(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fh{}class H extends Fh{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new cy(e,t,n):t==="array-contains"?new dy(e,n):t==="in"?new Gh(e,n):t==="not-in"?new fy(e,n):t==="array-contains-any"?new my(e,n):new H(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new ly(e,n):new hy(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(Pt(t,this.value)):t!==null&&Xt(this.value)===Xt(t)&&this.matchesComparison(Pt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return M()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ee extends Fh{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ee(e,t)}matches(e){return Vn(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Vn(r){return r.op==="and"}function go(r){return r.op==="or"}function Ho(r){return Uh(r)&&Vn(r)}function Uh(r){for(const e of r.filters)if(e instanceof ee)return!1;return!0}function _o(r){if(r instanceof H)return r.field.canonicalString()+r.op.toString()+Cn(r.value);if(Ho(r))return r.filters.map((e=>_o(e))).join(",");{const e=r.filters.map((t=>_o(t))).join(",");return`${r.op}(${e})`}}function Bh(r,e){return r instanceof H?(function(n,i){return i instanceof H&&n.op===i.op&&n.field.isEqual(i.field)&&Qe(n.value,i.value)})(r,e):r instanceof ee?(function(n,i){return i instanceof ee&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce(((s,a,u)=>s&&Bh(a,i.filters[u])),!0):!1})(r,e):void M()}function qh(r,e){const t=r.filters.concat(e);return ee.create(t,r.op)}function jh(r){return r instanceof H?(function(t){return`${t.field.canonicalString()} ${t.op} ${Cn(t.value)}`})(r):r instanceof ee?(function(t){return t.op.toString()+" {"+t.getFilters().map(jh).join(" ,")+"}"})(r):"Filter"}class cy extends H{constructor(e,t,n){super(e,t,n),this.key=O.fromName(n.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class ly extends H{constructor(e,t){super(e,"in",t),this.keys=zh("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class hy extends H{constructor(e,t){super(e,"not-in",t),this.keys=zh("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function zh(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((n=>O.fromName(n.referenceValue)))}class dy extends H{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return xr(t)&&kr(t.arrayValue,this.value)}}class Gh extends H{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&kr(this.value.arrayValue,t)}}class fy extends H{constructor(e,t){super(e,"not-in",t)}matches(e){if(kr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!kr(this.value.arrayValue,t)}}class my extends H{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!xr(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>kr(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class py{constructor(e,t=null,n=[],i=[],s=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=a,this.endAt=u,this.ue=null}}function yo(r,e=null,t=[],n=[],i=null,s=null,a=null){return new py(r,e,t,n,i,s,a)}function en(r){const e=j(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>_o(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(s){return s.field.canonicalString()+s.dir})(n))).join(","),ss(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>Cn(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>Cn(n))).join(",")),e.ue=t}return e.ue}function qr(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!uy(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Bh(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Pc(r.startAt,e.startAt)&&Pc(r.endAt,e.endAt)}function qi(r){return O.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function ji(r,e){return r.filters.filter((t=>t instanceof H&&t.field.isEqual(e)))}function Sc(r,e,t){let n=Si,i=!0;for(const s of ji(r,e)){let a=Si,u=!0;switch(s.op){case"<":case"<=":a=oy(s.value);break;case"==":case"in":case">=":a=s.value;break;case">":a=s.value,u=!1;break;case"!=":case"not-in":a=Si}Ac({value:n,inclusive:i},{value:a,inclusive:u})<0&&(n=a,i=u)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const a=t.position[s];Ac({value:n,inclusive:i},{value:a,inclusive:t.inclusive})<0&&(n=a,i=t.inclusive);break}}return{value:n,inclusive:i}}function Cc(r,e,t){let n=It,i=!0;for(const s of ji(r,e)){let a=It,u=!0;switch(s.op){case">=":case">":a=ay(s.value),u=!1;break;case"==":case"in":case"<=":a=s.value;break;case"<":a=s.value,u=!1;break;case"!=":case"not-in":a=It}Rc({value:n,inclusive:i},{value:a,inclusive:u})>0&&(n=a,i=u)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const a=t.position[s];Rc({value:n,inclusive:i},{value:a,inclusive:t.inclusive})>0&&(n=a,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,t=null,n=[],i=[],s=null,a="F",u=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=a,this.startAt=u,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function gy(r,e,t,n,i,s,a,u){return new Dt(r,e,t,n,i,s,a,u)}function jr(r){return new Dt(r)}function Vc(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function Qo(r){return r.collectionGroup!==null}function wn(r){const e=j(r);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new te(oe.comparator);return a.filters.forEach((c=>{c.getFlattenedFilters().forEach((d=>{d.isInequality()&&(u=u.add(d.field))}))})),u})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new Nr(s,n))})),t.has(oe.keyField().canonicalString())||e.ce.push(new Nr(oe.keyField(),n))}return e.ce}function Fe(r){const e=j(r);return e.le||(e.le=_y(e,wn(r))),e.le}function _y(r,e){if(r.limitType==="F")return yo(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new Nr(i.field,s)}));const t=r.endAt?new St(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new St(r.startAt.position,r.startAt.inclusive):null;return yo(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function Io(r,e){const t=r.filters.concat([e]);return new Dt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),t,r.limit,r.limitType,r.startAt,r.endAt)}function zi(r,e,t){return new Dt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function us(r,e){return qr(Fe(r),Fe(e))&&r.limitType===e.limitType}function $h(r){return`${en(Fe(r))}|lt:${r.limitType}`}function gn(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((i=>jh(i))).join(", ")}]`),ss(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((i=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(i))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((i=>Cn(i))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((i=>Cn(i))).join(",")),`Target(${n})`})(Fe(r))}; limitType=${r.limitType})`}function zr(r,e){return e.isFoundDocument()&&(function(n,i){const s=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):O.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)})(r,e)&&(function(n,i){for(const s of wn(n))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(r,e)&&(function(n,i){for(const s of n.filters)if(!s.matches(i))return!1;return!0})(r,e)&&(function(n,i){return!(n.startAt&&!(function(a,u,c){const d=bc(a,u,c);return a.inclusive?d<=0:d<0})(n.startAt,wn(n),i)||n.endAt&&!(function(a,u,c){const d=bc(a,u,c);return a.inclusive?d>=0:d>0})(n.endAt,wn(n),i))})(r,e)}function yy(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function Kh(r){return(e,t)=>{let n=!1;for(const i of wn(r)){const s=Iy(i,e,t);if(s!==0)return s;n=n||i.field.isKeyField()}return 0}}function Iy(r,e,t){const n=r.field.isKeyField()?O.comparator(e.key,t.key):(function(s,a,u){const c=a.data.field(s),d=u.data.field(s);return c!==null&&d!==null?Pt(c,d):M()})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return M()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,s]of n)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){zn(this.inner,((t,n)=>{for(const[i,s]of n)e(i,s)}))}isEmpty(){return xh(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vy=new se(O.comparator);function xe(){return vy}const Wh=new se(O.comparator);function pr(...r){let e=Wh;for(const t of r)e=e.insert(t.key,t);return e}function Hh(r){let e=Wh;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function Ge(){return Er()}function Qh(){return Er()}function Er(){return new kt((r=>r.toString()),((r,e)=>r.isEqual(e)))}const Ty=new se(O.comparator),Ey=new te(O.comparator);function $(...r){let e=Ey;for(const t of r)e=e.add(t);return e}const wy=new te(G);function Ay(){return wy}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Vr(e)?"-0":e}}function Jh(r){return{integerValue:""+r}}function Yh(r,e){return F_(e)?Jh(e):Jo(r,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(){this._=void 0}}function Ry(r,e,t){return r instanceof Dn?(function(i,s){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&os(s)&&(s=Wo(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}})(t,e):r instanceof kn?Zh(r,e):r instanceof xn?ed(r,e):(function(i,s){const a=Xh(i,s),u=Dc(a)+Dc(i.Pe);return po(a)&&po(i.Pe)?Jh(u):Jo(i.serializer,u)})(r,e)}function by(r,e,t){return r instanceof kn?Zh(r,e):r instanceof xn?ed(r,e):t}function Xh(r,e){return r instanceof Nn?(function(n){return po(n)||(function(s){return!!s&&"doubleValue"in s})(n)})(e)?e:{integerValue:0}:null}class Dn extends cs{}class kn extends cs{constructor(e){super(),this.elements=e}}function Zh(r,e){const t=td(e);for(const n of r.elements)t.some((i=>Qe(i,n)))||t.push(n);return{arrayValue:{values:t}}}class xn extends cs{constructor(e){super(),this.elements=e}}function ed(r,e){let t=td(e);for(const n of r.elements)t=t.filter((i=>!Qe(i,n)));return{arrayValue:{values:t}}}class Nn extends cs{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Dc(r){return ie(r.integerValue||r.doubleValue)}function td(r){return xr(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t){this.field=e,this.transform=t}}function Py(r,e){return r.field.isEqual(e.field)&&(function(n,i){return n instanceof kn&&i instanceof kn||n instanceof xn&&i instanceof xn?Sn(n.elements,i.elements,Qe):n instanceof Nn&&i instanceof Nn?Qe(n.Pe,i.Pe):n instanceof Dn&&i instanceof Dn})(r.transform,e.transform)}class Sy{constructor(e,t){this.version=e,this.transformResults=t}}class Ne{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ne}static exists(e){return new Ne(void 0,e)}static updateTime(e){return new Ne(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Vi(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class ls{}function nd(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new Xo(r.key,Ne.none()):new Gn(r.key,r.data,Ne.none());{const t=r.data,n=De.empty();let i=new te(oe.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?n.delete(s):n.set(s,a),i=i.add(s)}return new xt(r.key,n,new Le(i.toArray()),Ne.none())}}function Cy(r,e,t){r instanceof Gn?(function(i,s,a){const u=i.value.clone(),c=xc(i.fieldTransforms,s,a.transformResults);u.setAll(c),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(r,e,t):r instanceof xt?(function(i,s,a){if(!Vi(i.precondition,s))return void s.convertToUnknownDocument(a.version);const u=xc(i.fieldTransforms,s,a.transformResults),c=s.data;c.setAll(rd(i)),c.setAll(u),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(r,e,t):(function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function wr(r,e,t,n){return r instanceof Gn?(function(s,a,u,c){if(!Vi(s.precondition,a))return u;const d=s.value.clone(),f=Nc(s.fieldTransforms,c,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(r,e,t,n):r instanceof xt?(function(s,a,u,c){if(!Vi(s.precondition,a))return u;const d=Nc(s.fieldTransforms,c,a),f=a.data;return f.setAll(rd(s)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),u===null?null:u.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((p=>p.field)))})(r,e,t,n):(function(s,a,u){return Vi(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u})(r,e,t)}function Vy(r,e){let t=null;for(const n of r.fieldTransforms){const i=e.data.field(n.field),s=Xh(n.transform,i||null);s!=null&&(t===null&&(t=De.empty()),t.set(n.field,s))}return t||null}function kc(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&Sn(n,i,((s,a)=>Py(s,a)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class Gn extends ls{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class xt extends ls{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function rd(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function xc(r,e,t){const n=new Map;L(r.length===t.length);for(let i=0;i<t.length;i++){const s=r[i],a=s.transform,u=e.data.field(s.field);n.set(s.field,by(a,u,t[i]))}return n}function Nc(r,e,t){const n=new Map;for(const i of r){const s=i.transform,a=t.data.field(i.field);n.set(i.field,Ry(s,a,e))}return n}class Xo extends ls{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class id extends ls{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&Cy(s,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=wr(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=wr(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Qh();return this.mutations.forEach((i=>{const s=e.get(i.key),a=s.overlayedDocument;let u=this.applyToLocalView(a,s.mutatedFields);u=t.has(i.key)?null:u;const c=nd(a,u);c!==null&&n.set(i.key,c),a.isValidDocument()||a.convertToNoDocument(U.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),$())}isEqual(e){return this.batchId===e.batchId&&Sn(this.mutations,e.mutations,((t,n)=>kc(t,n)))&&Sn(this.baseMutations,e.baseMutations,((t,n)=>kc(t,n)))}}class ea{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){L(e.mutations.length===n.length);let i=(function(){return Ty})();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,n[a].version);return new ea(e,t,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var le,J;function ky(r){switch(r){default:return M();case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0}}function sd(r){if(r===void 0)return be("GRPC error has no .code"),S.UNKNOWN;switch(r){case le.OK:return S.OK;case le.CANCELLED:return S.CANCELLED;case le.UNKNOWN:return S.UNKNOWN;case le.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case le.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case le.INTERNAL:return S.INTERNAL;case le.UNAVAILABLE:return S.UNAVAILABLE;case le.UNAUTHENTICATED:return S.UNAUTHENTICATED;case le.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case le.NOT_FOUND:return S.NOT_FOUND;case le.ALREADY_EXISTS:return S.ALREADY_EXISTS;case le.PERMISSION_DENIED:return S.PERMISSION_DENIED;case le.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case le.ABORTED:return S.ABORTED;case le.OUT_OF_RANGE:return S.OUT_OF_RANGE;case le.UNIMPLEMENTED:return S.UNIMPLEMENTED;case le.DATA_LOSS:return S.DATA_LOSS;default:return M()}}(J=le||(le={}))[J.OK=0]="OK",J[J.CANCELLED=1]="CANCELLED",J[J.UNKNOWN=2]="UNKNOWN",J[J.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",J[J.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",J[J.NOT_FOUND=5]="NOT_FOUND",J[J.ALREADY_EXISTS=6]="ALREADY_EXISTS",J[J.PERMISSION_DENIED=7]="PERMISSION_DENIED",J[J.UNAUTHENTICATED=16]="UNAUTHENTICATED",J[J.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",J[J.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",J[J.ABORTED=10]="ABORTED",J[J.OUT_OF_RANGE=11]="OUT_OF_RANGE",J[J.UNIMPLEMENTED=12]="UNIMPLEMENTED",J[J.INTERNAL=13]="INTERNAL",J[J.UNAVAILABLE=14]="UNAVAILABLE",J[J.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xy(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=new Kt([4294967295,4294967295],0);function Oc(r){const e=xy().encode(r),t=new gh;return t.update(e),new Uint8Array(t.digest())}function Mc(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Kt([t,n],0),new Kt([i,s],0)]}class na{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new gr(`Invalid padding: ${t}`);if(n<0)throw new gr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new gr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new gr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Kt.fromNumber(this.Ie)}Ee(e,t,n){let i=e.add(t.multiply(Kt.fromNumber(n)));return i.compare(Ny)===1&&(i=new Kt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Oc(e),[n,i]=Mc(t);for(let s=0;s<this.hashCount;s++){const a=this.Ee(n,i,s);if(!this.de(a))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new na(s,i,t);return n.forEach((u=>a.insert(u))),a}insert(e){if(this.Ie===0)return;const t=Oc(e),[n,i]=Mc(t);for(let s=0;s<this.hashCount;s++){const a=this.Ee(n,i,s);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class gr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,Gr.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new hs(U.min(),i,new se(G),xe(),$())}}class Gr{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Gr(n,t,$(),$(),$())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Di{constructor(e,t,n,i){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=i}}class od{constructor(e,t){this.targetId=e,this.me=t}}class ad{constructor(e,t,n=he.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class Lc{constructor(){this.fe=0,this.ge=Uc(),this.pe=he.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=$(),t=$(),n=$();return this.ge.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:M()}})),new Gr(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=Uc()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,L(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Oy{constructor(e){this.Le=e,this.Be=new Map,this.ke=xe(),this.qe=Fc(),this.Qe=new se(G)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,(t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:M()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach(((n,i)=>{this.ze(i)&&t(i)}))}He(e){const t=e.targetId,n=e.me.count,i=this.Je(t);if(i){const s=i.target;if(qi(s))if(n===0){const a=new O(s.path);this.Ue(t,a,ce.newNoDocument(a,U.min()))}else L(n===1);else{const a=this.Ye(t);if(a!==n){const u=this.Ze(e),c=u?this.Xe(u,e,a):1;if(c!==0){this.je(t);const d=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t;let a,u;try{a=bt(n).toUint8Array()}catch(c){if(c instanceof Nh)return Pn("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{u=new na(a,i,s)}catch(c){return Pn(c instanceof gr?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return u.Ie===0?null:u}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let i=0;return n.forEach((s=>{const a=this.Le.tt(),u=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(u)||(this.Ue(t,s,null),i++)})),i}rt(e){const t=new Map;this.Be.forEach(((s,a)=>{const u=this.Je(a);if(u){if(s.current&&qi(u.target)){const c=new O(u.target.path);this.ke.get(c)!==null||this.it(a,c)||this.Ue(a,c,ce.newNoDocument(c,e))}s.be&&(t.set(a,s.ve()),s.Ce())}}));let n=$();this.qe.forEach(((s,a)=>{let u=!0;a.forEachWhile((c=>{const d=this.Je(c);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)})),u&&(n=n.add(s))})),this.ke.forEach(((s,a)=>a.setReadTime(e)));const i=new hs(e,t,this.Qe,this.ke,n);return this.ke=xe(),this.qe=Fc(),this.Qe=new se(G),i}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Lc,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new te(G),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||C("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Lc),this.Le.getRemoteKeysForTarget(e).forEach((t=>{this.Ue(e,t,null)}))}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Fc(){return new se(O.comparator)}function Uc(){return new se(O.comparator)}const My={asc:"ASCENDING",desc:"DESCENDING"},Ly={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Fy={and:"AND",or:"OR"};class Uy{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function vo(r,e){return r.useProto3Json||ss(e)?e:{value:e}}function On(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function ud(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function By(r,e){return On(r,e.toTimestamp())}function Se(r){return L(!!r),U.fromTimestamp((function(t){const n=st(t);return new ae(n.seconds,n.nanos)})(r))}function ra(r,e){return To(r,e).canonicalString()}function To(r,e){const t=(function(i){return new X(["projects",i.projectId,"databases",i.database])})(r).child("documents");return e===void 0?t:t.child(e)}function cd(r){const e=X.fromString(r);return L(yd(e)),e}function Gi(r,e){return ra(r.databaseId,e.path)}function Wt(r,e){const t=cd(e);if(t.get(1)!==r.databaseId.projectId)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new O(dd(t))}function ld(r,e){return ra(r.databaseId,e)}function hd(r){const e=cd(r);return e.length===4?X.emptyPath():dd(e)}function Eo(r){return new X(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function dd(r){return L(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Bc(r,e,t){return{name:Gi(r,e),fields:t.value.mapValue.fields}}function qy(r,e,t){const n=Wt(r,e.name),i=Se(e.updateTime),s=e.createTime?Se(e.createTime):U.min(),a=new De({mapValue:{fields:e.fields}}),u=ce.newFoundDocument(n,i,s,a);return t&&u.setHasCommittedMutations(),t?u.setHasCommittedMutations():u}function jy(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:M()})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(d,f){return d.useProto3Json?(L(f===void 0||typeof f=="string"),he.fromBase64String(f||"")):(L(f===void 0||f instanceof Buffer||f instanceof Uint8Array),he.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&(function(d){const f=d.code===void 0?S.UNKNOWN:sd(d.code);return new k(f,d.message||"")})(a);t=new ad(n,i,s,u||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=Wt(r,n.document.name),s=Se(n.document.updateTime),a=n.document.createTime?Se(n.document.createTime):U.min(),u=new De({mapValue:{fields:n.document.fields}}),c=ce.newFoundDocument(i,s,a,u),d=n.targetIds||[],f=n.removedTargetIds||[];t=new Di(d,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=Wt(r,n.document),s=n.readTime?Se(n.readTime):U.min(),a=ce.newNoDocument(i,s),u=n.removedTargetIds||[];t=new Di([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=Wt(r,n.document),s=n.removedTargetIds||[];t=new Di([],s,i,null)}else{if(!("filter"in e))return M();{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:s}=n,a=new Dy(i,s),u=n.targetId;t=new od(u,a)}}return t}function $i(r,e){let t;if(e instanceof Gn)t={update:Bc(r,e.key,e.value)};else if(e instanceof Xo)t={delete:Gi(r,e.key)};else if(e instanceof xt)t={update:Bc(r,e.key,e.data),updateMask:Hy(e.fieldMask)};else{if(!(e instanceof id))return M();t={verify:Gi(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(s,a){const u=a.transform;if(u instanceof Dn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof kn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof xn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof Nn)return{fieldPath:a.field.canonicalString(),increment:u.Pe};throw M()})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:By(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:M()})(r,e.precondition)),t}function wo(r,e){const t=e.currentDocument?(function(s){return s.updateTime!==void 0?Ne.updateTime(Se(s.updateTime)):s.exists!==void 0?Ne.exists(s.exists):Ne.none()})(e.currentDocument):Ne.none(),n=e.updateTransforms?e.updateTransforms.map((i=>(function(a,u){let c=null;if("setToServerValue"in u)L(u.setToServerValue==="REQUEST_TIME"),c=new Dn;else if("appendMissingElements"in u){const f=u.appendMissingElements.values||[];c=new kn(f)}else if("removeAllFromArray"in u){const f=u.removeAllFromArray.values||[];c=new xn(f)}else"increment"in u?c=new Nn(a,u.increment):M();const d=oe.fromServerFormat(u.fieldPath);return new Yo(d,c)})(r,i))):[];if(e.update){e.update.name;const i=Wt(r,e.update.name),s=new De({mapValue:{fields:e.update.fields}});if(e.updateMask){const a=(function(c){const d=c.fieldPaths||[];return new Le(d.map((f=>oe.fromServerFormat(f))))})(e.updateMask);return new xt(i,s,a,t,n)}return new Gn(i,s,t,n)}if(e.delete){const i=Wt(r,e.delete);return new Xo(i,t)}if(e.verify){const i=Wt(r,e.verify);return new id(i,t)}return M()}function zy(r,e){return r&&r.length>0?(L(e!==void 0),r.map((t=>(function(i,s){let a=i.updateTime?Se(i.updateTime):Se(s);return a.isEqual(U.min())&&(a=Se(s)),new Sy(a,i.transformResults||[])})(t,e)))):[]}function fd(r,e){return{documents:[ld(r,e.path)]}}function md(r,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=ld(r,i);const s=(function(d){if(d.length!==0)return _d(ee.create(d,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const a=(function(d){if(d.length!==0)return d.map((f=>(function(I){return{field:_n(I.field),direction:$y(I.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const u=vo(r,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{_t:t,parent:i}}function pd(r){let e=hd(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){L(n===1);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=(function(p){const I=gd(p);return I instanceof ee&&Ho(I)?I.getFilters():[I]})(t.where));let a=[];t.orderBy&&(a=(function(p){return p.map((I=>(function(V){return new Nr(yn(V.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(V.direction))})(I)))})(t.orderBy));let u=null;t.limit&&(u=(function(p){let I;return I=typeof p=="object"?p.value:p,ss(I)?null:I})(t.limit));let c=null;t.startAt&&(c=(function(p){const I=!!p.before,b=p.values||[];return new St(b,I)})(t.startAt));let d=null;return t.endAt&&(d=(function(p){const I=!p.before,b=p.values||[];return new St(b,I)})(t.endAt)),gy(e,i,a,s,u,"F",c,d)}function Gy(r,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return M()}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function gd(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=yn(t.unaryFilter.field);return H.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=yn(t.unaryFilter.field);return H.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=yn(t.unaryFilter.field);return H.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=yn(t.unaryFilter.field);return H.create(a,"!=",{nullValue:"NULL_VALUE"});default:return M()}})(r):r.fieldFilter!==void 0?(function(t){return H.create(yn(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return M()}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ee.create(t.compositeFilter.filters.map((n=>gd(n))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M()}})(t.compositeFilter.op))})(r):M()}function $y(r){return My[r]}function Ky(r){return Ly[r]}function Wy(r){return Fy[r]}function _n(r){return{fieldPath:r.canonicalString()}}function yn(r){return oe.fromServerFormat(r.fieldPath)}function _d(r){return r instanceof H?(function(t){if(t.op==="=="){if(wc(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NAN"}};if(Ec(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(wc(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NOT_NAN"}};if(Ec(t.value))return{unaryFilter:{field:_n(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_n(t.field),op:Ky(t.op),value:t.value}}})(r):r instanceof ee?(function(t){const n=t.getFilters().map((i=>_d(i)));return n.length===1?n[0]:{compositeFilter:{op:Wy(t.op),filters:n}}})(r):M()}function Hy(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function yd(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e,t,n,i,s=U.min(),a=U.min(),u=he.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=c}withSequenceNumber(e){return new nt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new nt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new nt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new nt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(e){this.ct=e}}function Qy(r,e){let t;if(e.document)t=qy(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=O.fromSegments(e.noDocument.path),i=nn(e.noDocument.readTime);t=ce.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return M();{const n=O.fromSegments(e.unknownDocument.path),i=nn(e.unknownDocument.version);t=ce.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime((function(i){const s=new ae(i[0],i[1]);return U.fromTimestamp(s)})(e.readTime)),t}function qc(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ki(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(s,a){return{name:Gi(s,a.key),fields:a.data.value.mapValue.fields,updateTime:On(s,a.version.toTimestamp()),createTime:On(s,a.createTime.toTimestamp())}})(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:tn(e.version)};else{if(!e.isUnknownDocument())return M();n.unknownDocument={path:t.path.toArray(),version:tn(e.version)}}return n}function Ki(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function tn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function nn(r){const e=new ae(r.seconds,r.nanoseconds);return U.fromTimestamp(e)}function jt(r,e){const t=(e.baseMutations||[]).map((s=>wo(r.ct,s)));for(let s=0;s<e.mutations.length-1;++s){const a=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const u=e.mutations[s+1];a.updateTransforms=u.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const n=e.mutations.map((s=>wo(r.ct,s))),i=ae.fromMillis(e.localWriteTimeMs);return new Zo(e.batchId,i,t,n)}function _r(r){const e=nn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?nn(r.lastLimboFreeSnapshotVersion):U.min();let n;return n=(function(s){return s.documents!==void 0})(r.query)?(function(s){return L(s.documents.length===1),Fe(jr(hd(s.documents[0])))})(r.query):(function(s){return Fe(pd(s))})(r.query),new nt(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,he.fromBase64String(r.resumeToken))}function vd(r,e){const t=tn(e.snapshotVersion),n=tn(e.lastLimboFreeSnapshotVersion);let i;i=qi(e.target)?fd(r.ct,e.target):md(r.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:en(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function Td(r){const e=pd({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?zi(e,e.limit,"L"):e}function Xs(r,e){return new ta(e.largestBatchId,wo(r.ct,e.overlayMutation))}function jc(r,e){const t=e.path.lastSegment();return[r,Pe(e.path.popLast()),t]}function zc(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:tn(n.readTime),documentKey:Pe(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jy{getBundleMetadata(e,t){return Gc(e).get(t).next((n=>{if(n)return(function(s){return{id:s.bundleId,createTime:nn(s.createTime),version:s.version}})(n)}))}saveBundleMetadata(e,t){return Gc(e).put((function(i){return{bundleId:i.id,createTime:tn(Se(i.createTime)),version:i.version}})(t))}getNamedQuery(e,t){return $c(e).get(t).next((n=>{if(n)return(function(s){return{name:s.name,query:Td(s.bundledQuery),readTime:nn(s.readTime)}})(n)}))}saveNamedQuery(e,t){return $c(e).put((function(i){return{name:i.name,readTime:tn(Se(i.readTime)),bundledQuery:i.bundledQuery}})(t))}}function Gc(r){return fe(r,"bundles")}function $c(r){return fe(r,"namedQueries")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new ds(e,n)}getOverlay(e,t){return cr(e).get(jc(this.userId,t)).next((n=>n?Xs(this.serializer,n):null))}getOverlays(e,t){const n=Ge();return A.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&n.set(i,s)})))).next((()=>n))}saveOverlays(e,t,n){const i=[];return n.forEach(((s,a)=>{const u=new ta(t,a);i.push(this.ht(e,u))})),A.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach((a=>i.add(Pe(a.getCollectionPath()))));const s=[];return i.forEach((a=>{const u=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);s.push(cr(e).j("collectionPathOverlayIndex",u))})),A.waitFor(s)}getOverlaysForCollection(e,t,n){const i=Ge(),s=Pe(t),a=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return cr(e).U("collectionPathOverlayIndex",a).next((u=>{for(const c of u){const d=Xs(this.serializer,c);i.set(d.getKey(),d)}return i}))}getOverlaysForCollectionGroup(e,t,n,i){const s=Ge();let a;const u=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return cr(e).J({index:"collectionGroupOverlayIndex",range:u},((c,d,f)=>{const p=Xs(this.serializer,d);s.size()<i||p.largestBatchId===a?(s.set(p.getKey(),p),a=p.largestBatchId):f.done()})).next((()=>s))}ht(e,t){return cr(e).put((function(i,s,a){const[u,c,d]=jc(s,a.mutation.key);return{userId:s,collectionPath:c,documentId:d,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:$i(i.ct,a.mutation)}})(this.serializer,this.userId,t))}}function cr(r){return fe(r,"documentOverlays")}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{Pt(e){return fe(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next((t=>{const n=t?.value;return n?he.fromUint8Array(n):he.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(ie(e.integerValue));else if("doubleValue"in e){const n=ie(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),Vr(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=st(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(bt(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?Oh(e)?this.dt(t,Number.MAX_SAFE_INTEGER):as(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):M()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const i of Object.keys(n))this.Vt(i,t),this.Tt(n[i],t)}wt(e,t){var n,i;const s=e.fields||{};this.dt(t,53);const a="value",u=((i=(n=s[a].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(ie(u)),this.Vt(a,t),this.Tt(s[a],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const i of n)this.Tt(i,t)}yt(e,t){this.dt(t,37),O.fromName(e).path.forEach((n=>{this.dt(t,60),this.Dt(n,t)}))}dt(e,t){e.At(t)}ft(e){e.At(2)}}zt.vt=new zt;function Xy(r){if(r===0)return 8;let e=0;return r>>4==0&&(e+=4,r<<=4),r>>6==0&&(e+=2,r<<=2),r>>7==0&&(e+=1),e}function Kc(r){const e=64-(function(n){let i=0;for(let s=0;s<8;++s){const a=Xy(255&n[s]);if(i+=a,a!==8)break}return i})(r);return Math.ceil(e/8)}class Zy{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),n=Kc(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),n=Kc(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=(function(s){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,s,!1),new Uint8Array(a.buffer)})(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class eI{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class tI{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class lr{constructor(){this.jt=new Zy,this.Ht=new eI(this.jt),this.Jt=new tI(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(e,t,n,i){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new Gt(this.indexId,this.documentKey,this.arrayValue,n)}}function dt(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=Wc(r.arrayValue,e.arrayValue),t!==0?t:(t=Wc(r.directionalValue,e.directionalValue),t!==0?t:O.comparator(r.documentKey,e.documentKey)))}function Wc(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(e){this.Xt=new te(((t,n)=>oe.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(L(e.collectionGroup===this.collectionId),this.nn)return!1;const t=ho(e);if(t!==void 0&&!this.sn(t))return!1;const n=Bt(e);let i=new Set,s=0,a=0;for(;s<n.length&&this.sn(n[s]);++s)i=i.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.Xt.size>0){const u=this.Xt.getIterator().getNext();if(!i.has(u.field.canonicalString())){const c=n[s];if(!this.on(u,c)||!this._n(this.en[a++],c))return!1}++s}for(;s<n.length;++s){const u=n[s];if(a>=this.en.length||!this._n(this.en[a++],u))return!1}return!0}an(){if(this.nn)return null;let e=new te(oe.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new bi(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new bi(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new bi(n.field,n.dir==="asc"?0:1)));return new Bi(Bi.UNKNOWN_ID,this.collectionId,t,Cr.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ed(r){var e,t;if(L(r instanceof H||r instanceof ee),r instanceof H){if(r instanceof Gh){const i=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map((s=>H.create(r.field,"==",s))))||[];return ee.create(i,"or")}return r}const n=r.filters.map((i=>Ed(i)));return ee.create(n,r.op)}function nI(r){if(r.getFilters().length===0)return[];const e=bo(Ed(r));return L(wd(e)),Ao(e)||Ro(e)?[e]:e.getFilters()}function Ao(r){return r instanceof H}function Ro(r){return r instanceof ee&&Ho(r)}function wd(r){return Ao(r)||Ro(r)||(function(t){if(t instanceof ee&&go(t)){for(const n of t.getFilters())if(!Ao(n)&&!Ro(n))return!1;return!0}return!1})(r)}function bo(r){if(L(r instanceof H||r instanceof ee),r instanceof H)return r;if(r.filters.length===1)return bo(r.filters[0]);const e=r.filters.map((n=>bo(n)));let t=ee.create(e,r.op);return t=Wi(t),wd(t)?t:(L(t instanceof ee),L(Vn(t)),L(t.filters.length>1),t.filters.reduce(((n,i)=>ia(n,i))))}function ia(r,e){let t;return L(r instanceof H||r instanceof ee),L(e instanceof H||e instanceof ee),t=r instanceof H?e instanceof H?(function(i,s){return ee.create([i,s],"and")})(r,e):Qc(r,e):e instanceof H?Qc(e,r):(function(i,s){if(L(i.filters.length>0&&s.filters.length>0),Vn(i)&&Vn(s))return qh(i,s.getFilters());const a=go(i)?i:s,u=go(i)?s:i,c=a.filters.map((d=>ia(d,u)));return ee.create(c,"or")})(r,e),Wi(t)}function Qc(r,e){if(Vn(e))return qh(e,r.getFilters());{const t=e.filters.map((n=>ia(r,n)));return ee.create(t,"or")}}function Wi(r){if(L(r instanceof H||r instanceof ee),r instanceof H)return r;const e=r.getFilters();if(e.length===1)return Wi(e[0]);if(Uh(r))return r;const t=e.map((i=>Wi(i))),n=[];return t.forEach((i=>{i instanceof H?n.push(i):i instanceof ee&&(i.op===r.op?n.push(...i.filters):n.push(i))})),n.length===1?n[0]:ee.create(n,r.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(){this.un=new sa}addToCollectionParentIndex(e,t){return this.un.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(Oe.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(Oe.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class sa{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new te(X.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new te(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=new Uint8Array(0);class iI{constructor(e,t){this.databaseId=t,this.cn=new sa,this.ln=new kt((n=>en(n)),((n,i)=>qr(n,i))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener((()=>{this.cn.add(t)}));const s={collectionId:n,parent:Pe(i)};return Jc(e).put(s)}return A.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[Ah(t),""],!1,!0);return Jc(e).U(i).next((s=>{for(const a of s){if(a.collectionId!==t)break;n.push(ze(a.parent))}return n}))}addFieldIndex(e,t){const n=hr(e),i=(function(u){return{indexId:u.indexId,collectionGroup:u.collectionGroup,fields:u.fields.map((c=>[c.fieldPath.canonicalString(),c.kind]))}})(t);delete i.indexId;const s=n.add(i);if(t.indexState){const a=fn(e);return s.next((u=>{a.put(zc(u,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return s.next()}deleteFieldIndex(e,t){const n=hr(e),i=fn(e),s=dn(e);return n.delete(t.indexId).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=hr(e),n=dn(e),i=fn(e);return t.j().next((()=>n.j())).next((()=>i.j()))}createTargetIndexes(e,t){return A.forEach(this.hn(t),(n=>this.getIndexType(e,n).next((i=>{if(i===0||i===1){const s=new Hc(n).an();if(s!=null)return this.addFieldIndex(e,s)}}))))}getDocumentsMatchingTarget(e,t){const n=dn(e);let i=!0;const s=new Map;return A.forEach(this.hn(t),(a=>this.Pn(e,a).next((u=>{i&&(i=!!u),s.set(a,u)})))).next((()=>{if(i){let a=$();const u=[];return A.forEach(s,((c,d)=>{C("IndexedDbIndexManager",`Using index ${(function(F){return`id=${F.indexId}|cg=${F.collectionGroup}|f=${F.fields.map((Q=>`${Q.fieldPath}:${Q.kind}`)).join(",")}`})(c)} to execute ${en(t)}`);const f=(function(F,Q){const Z=ho(Q);if(Z===void 0)return null;for(const K of ji(F,Z.fieldPath))switch(K.op){case"array-contains-any":return K.value.arrayValue.values||[];case"array-contains":return[K.value]}return null})(d,c),p=(function(F,Q){const Z=new Map;for(const K of Bt(Q))for(const v of ji(F,K.fieldPath))switch(v.op){case"==":case"in":Z.set(K.fieldPath.canonicalString(),v.value);break;case"not-in":case"!=":return Z.set(K.fieldPath.canonicalString(),v.value),Array.from(Z.values())}return null})(d,c),I=(function(F,Q){const Z=[];let K=!0;for(const v of Bt(Q)){const g=v.kind===0?Sc(F,v.fieldPath,F.startAt):Cc(F,v.fieldPath,F.startAt);Z.push(g.value),K&&(K=g.inclusive)}return new St(Z,K)})(d,c),b=(function(F,Q){const Z=[];let K=!0;for(const v of Bt(Q)){const g=v.kind===0?Cc(F,v.fieldPath,F.endAt):Sc(F,v.fieldPath,F.endAt);Z.push(g.value),K&&(K=g.inclusive)}return new St(Z,K)})(d,c),V=this.In(c,d,I),x=this.In(c,d,b),D=this.Tn(c,d,p),z=this.En(c.indexId,f,V,I.inclusive,x,b.inclusive,D);return A.forEach(z,(B=>n.G(B,t.limit).next((F=>{F.forEach((Q=>{const Z=O.fromSegments(Q.documentKey);a.has(Z)||(a=a.add(Z),u.push(Z))}))}))))})).next((()=>u))}return A.resolve(null)}))}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=nI(ee.create(e.filters,"and")).map((n=>yo(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.ln.set(e,t),t)}En(e,t,n,i,s,a,u){const c=(t!=null?t.length:1)*Math.max(n.length,s.length),d=c/(t!=null?t.length:1),f=[];for(let p=0;p<c;++p){const I=t?this.dn(t[p/d]):_i,b=this.An(e,I,n[p%d],i),V=this.Rn(e,I,s[p%d],a),x=u.map((D=>this.An(e,I,D,!0)));f.push(...this.createRange(b,V,x))}return f}An(e,t,n,i){const s=new Gt(e,O.empty(),t,n);return i?s:s.Zt()}Rn(e,t,n,i){const s=new Gt(e,O.empty(),t,n);return i?s.Zt():s}Pn(e,t){const n=new Hc(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next((s=>{let a=null;for(const u of s)n.rn(u)&&(!a||u.fields.length>a.fields.length)&&(a=u);return a}))}getIndexType(e,t){let n=2;const i=this.hn(t);return A.forEach(i,(s=>this.Pn(e,s).next((a=>{a?n!==0&&a.fields.length<(function(c){let d=new te(oe.comparator),f=!1;for(const p of c.filters)for(const I of p.getFlattenedFilters())I.field.isKeyField()||(I.op==="array-contains"||I.op==="array-contains-any"?f=!0:d=d.add(I.field));for(const p of c.orderBy)p.field.isKeyField()||(d=d.add(p.field));return d.size+(f?1:0)})(s)&&(n=1):n=0})))).next((()=>(function(a){return a.limit!==null})(t)&&i.length>1&&n===2?1:n))}Vn(e,t){const n=new lr;for(const i of Bt(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const a=n.Yt(i.kind);zt.vt.It(s,a)}return n.zt()}dn(e){const t=new lr;return zt.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new lr;return zt.vt.It(Zt(this.databaseId,t),n.Yt((function(s){const a=Bt(s);return a.length===0?0:a[a.length-1].kind})(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let i=[];i.push(new lr);let s=0;for(const a of Bt(e)){const u=n[s++];for(const c of i)if(this.fn(t,a.fieldPath)&&xr(u))i=this.gn(i,a,u);else{const d=c.Yt(a.kind);zt.vt.It(u,d)}}return this.pn(i)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const i=[...e],s=[];for(const a of n.arrayValue.values||[])for(const u of i){const c=new lr;c.seed(u.zt()),zt.vt.It(a,c.Yt(t.kind)),s.push(c)}return s}fn(e,t){return!!e.filters.find((n=>n instanceof H&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=hr(e),i=fn(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next((s=>{const a=[];return A.forEach(s,(u=>i.get([u.indexId,this.uid]).next((c=>{a.push((function(f,p){const I=p?new Cr(p.sequenceNumber,new Oe(nn(p.readTime),new O(ze(p.documentKey)),p.largestBatchId)):Cr.empty(),b=f.fields.map((([V,x])=>new bi(oe.fromServerFormat(V),x)));return new Bi(f.indexId,f.collectionGroup,b,I)})(u,c))})))).next((()=>a))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,i)=>{const s=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:G(n.collectionGroup,i.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const i=hr(e),s=fn(e);return this.yn(e).next((a=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next((u=>A.forEach(u,(c=>s.put(zc(c.indexId,this.uid,a,n))))))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,((i,s)=>{const a=n.get(i.collectionGroup);return(a?A.resolve(a):this.getFieldIndexes(e,i.collectionGroup)).next((u=>(n.set(i.collectionGroup,u),A.forEach(u,(c=>this.wn(e,i,c).next((d=>{const f=this.Sn(s,c);return d.isEqual(f)?A.resolve():this.bn(e,s,c,d,f)})))))))}))}Dn(e,t,n,i){return dn(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,i){return dn(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const i=dn(e);let s=new te(dt);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},((a,u)=>{s=s.add(new Gt(n.indexId,t,u.arrayValue,u.directionalValue))})).next((()=>s))}Sn(e,t){let n=new te(dt);const i=this.Vn(t,e);if(i==null)return n;const s=ho(t);if(s!=null){const a=e.data.field(s.fieldPath);if(xr(a))for(const u of a.arrayValue.values||[])n=n.add(new Gt(t.indexId,e.key,this.dn(u),i))}else n=n.add(new Gt(t.indexId,e.key,_i,i));return n}bn(e,t,n,i,s){C("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const a=[];return(function(c,d,f,p,I){const b=c.getIterator(),V=d.getIterator();let x=hn(b),D=hn(V);for(;x||D;){let z=!1,B=!1;if(x&&D){const F=f(x,D);F<0?B=!0:F>0&&(z=!0)}else x!=null?B=!0:z=!0;z?(p(D),D=hn(V)):B?(I(x),x=hn(b)):(x=hn(b),D=hn(V))}})(i,s,dt,(u=>{a.push(this.Dn(e,t,n,u))}),(u=>{a.push(this.vn(e,t,n,u))})),A.waitFor(a)}yn(e){let t=1;return fn(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,i,s)=>{s.done(),t=i.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((a,u)=>dt(a,u))).filter(((a,u,c)=>!u||dt(a,c[u-1])!==0));const i=[];i.push(e);for(const a of n){const u=dt(a,e),c=dt(a,t);if(u===0)i[0]=e.Zt();else if(u>0&&c<0)i.push(a),i.push(a.Zt());else if(c>0)break}i.push(t);const s=[];for(let a=0;a<i.length;a+=2){if(this.Cn(i[a],i[a+1]))return[];const u=[i[a].indexId,this.uid,i[a].arrayValue,i[a].directionalValue,_i,[]],c=[i[a+1].indexId,this.uid,i[a+1].arrayValue,i[a+1].directionalValue,_i,[]];s.push(IDBKeyRange.bound(u,c))}return s}Cn(e,t){return dt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Yc)}getMinOffset(e,t){return A.mapArray(this.hn(t),(n=>this.Pn(e,n).next((i=>i||M())))).next(Yc)}}function Jc(r){return fe(r,"collectionParents")}function dn(r){return fe(r,"indexEntries")}function hr(r){return fe(r,"indexConfiguration")}function fn(r){return fe(r,"indexState")}function Yc(r){L(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const i=r[n].indexState.offset;Go(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new Oe(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class Ve{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new Ve(e,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(r,e,t){const n=r.store("mutations"),i=r.store("documentMutations"),s=[],a=IDBKeyRange.only(t.batchId);let u=0;const c=n.J({range:a},((f,p,I)=>(u++,I.delete())));s.push(c.next((()=>{L(u===1)})));const d=[];for(const f of t.mutations){const p=Ch(e,f.key.path,t.batchId);s.push(i.delete(p)),d.push(f.key)}return A.waitFor(s).next((()=>d))}function Hi(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw M();e=r.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ve.DEFAULT_COLLECTION_PERCENTILE=10,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ve.DEFAULT=new Ve(41943040,Ve.DEFAULT_COLLECTION_PERCENTILE,Ve.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ve.DISABLED=new Ve(-1,0,0);class fs{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Fn={}}static lt(e,t,n,i){L(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new fs(s,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return ft(e).J({index:"userMutationsIndex",range:n},((i,s,a)=>{t=!1,a.done()})).next((()=>t))}addMutationBatch(e,t,n,i){const s=In(e),a=ft(e);return a.add({}).next((u=>{L(typeof u=="number");const c=new Zo(u,t,n,i),d=(function(b,V,x){const D=x.baseMutations.map((B=>$i(b.ct,B))),z=x.mutations.map((B=>$i(b.ct,B)));return{userId:V,batchId:x.batchId,localWriteTimeMs:x.localWriteTime.toMillis(),baseMutations:D,mutations:z}})(this.serializer,this.userId,c),f=[];let p=new te(((I,b)=>G(I.canonicalString(),b.canonicalString())));for(const I of i){const b=Ch(this.userId,I.key.path,u);p=p.add(I.key.path.popLast()),f.push(a.put(d)),f.push(s.put(b,B_))}return p.forEach((I=>{f.push(this.indexManager.addToCollectionParentIndex(e,I))})),e.addOnCommittedListener((()=>{this.Fn[u]=c.keys()})),A.waitFor(f).next((()=>c))}))}lookupMutationBatch(e,t){return ft(e).get(t).next((n=>n?(L(n.userId===this.userId),jt(this.serializer,n)):null))}Mn(e,t){return this.Fn[t]?A.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const i=n.keys();return this.Fn[t]=i,i}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return ft(e).J({index:"userMutationsIndex",range:i},((a,u,c)=>{u.userId===this.userId&&(L(u.batchId>=n),s=jt(this.serializer,u)),c.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return ft(e).J({index:"userMutationsIndex",range:t,reverse:!0},((i,s,a)=>{n=s.batchId,a.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return ft(e).U("userMutationsIndex",t).next((n=>n.map((i=>jt(this.serializer,i)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Pi(this.userId,t.path),i=IDBKeyRange.lowerBound(n),s=[];return In(e).J({range:i},((a,u,c)=>{const[d,f,p]=a,I=ze(f);if(d===this.userId&&t.path.isEqual(I))return ft(e).get(p).next((b=>{if(!b)throw M();L(b.userId===this.userId),s.push(jt(this.serializer,b))}));c.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(G);const i=[];return t.forEach((s=>{const a=Pi(this.userId,s.path),u=IDBKeyRange.lowerBound(a),c=In(e).J({range:u},((d,f,p)=>{const[I,b,V]=d,x=ze(b);I===this.userId&&s.path.isEqual(x)?n=n.add(V):p.done()}));i.push(c)})),A.waitFor(i).next((()=>this.xn(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,s=Pi(this.userId,n),a=IDBKeyRange.lowerBound(s);let u=new te(G);return In(e).J({range:a},((c,d,f)=>{const[p,I,b]=c,V=ze(I);p===this.userId&&n.isPrefixOf(V)?V.length===i&&(u=u.add(b)):f.done()})).next((()=>this.xn(e,u)))}xn(e,t){const n=[],i=[];return t.forEach((s=>{i.push(ft(e).get(s).next((a=>{if(a===null)throw M();L(a.userId===this.userId),n.push(jt(this.serializer,a))})))})),A.waitFor(i).next((()=>n))}removeMutationBatch(e,t){return Ad(e._e,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.On(t.batchId)})),A.forEach(n,(i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound((function(a){return[a]})(this.userId)),i=[];return In(e).J({range:n},((s,a,u)=>{if(s[0]===this.userId){const c=ze(s[1]);i.push(c)}else u.done()})).next((()=>{L(i.length===0)}))}))}containsKey(e,t){return Rd(e,this.userId,t)}Nn(e){return bd(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""}))}}function Rd(r,e,t){const n=Pi(e,t.path),i=n[1],s=IDBKeyRange.lowerBound(n);let a=!1;return In(r).J({range:s,H:!0},((u,c,d)=>{const[f,p,I]=u;f===e&&p===i&&(a=!0),d.done()})).next((()=>a))}function ft(r){return fe(r,"mutations")}function In(r){return fe(r,"documentMutations")}function bd(r){return fe(r,"mutationQueues")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new rn(0)}static kn(){return new rn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next((t=>{const n=new rn(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.qn(e).next((t=>U.fromTimestamp(new ae(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.qn(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.qn(e).next((i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i))))}addTargetData(e,t){return this.Kn(e,t).next((()=>this.qn(e).next((n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>mn(e).delete(t.targetId))).next((()=>this.qn(e))).next((n=>(L(n.targetCount>0),n.targetCount-=1,this.Qn(e,n))))}removeTargets(e,t,n){let i=0;const s=[];return mn(e).J(((a,u)=>{const c=_r(u);c.sequenceNumber<=t&&n.get(c.targetId)===null&&(i++,s.push(this.removeTargetData(e,c)))})).next((()=>A.waitFor(s))).next((()=>i))}forEachTarget(e,t){return mn(e).J(((n,i)=>{const s=_r(i);t(s)}))}qn(e){return Zc(e).get("targetGlobalKey").next((t=>(L(t!==null),t)))}Qn(e,t){return Zc(e).put("targetGlobalKey",t)}Kn(e,t){return mn(e).put(vd(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next((t=>t.targetCount))}getTargetData(e,t){const n=en(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return mn(e).J({range:i,index:"queryTargetsIndex"},((a,u,c)=>{const d=_r(u);qr(t,d.target)&&(s=d,c.done())})).next((()=>s))}addMatchingKeys(e,t,n){const i=[],s=yt(e);return t.forEach((a=>{const u=Pe(a.path);i.push(s.put({targetId:n,path:u})),i.push(this.referenceDelegate.addReference(e,n,a))})),A.waitFor(i)}removeMatchingKeys(e,t,n){const i=yt(e);return A.forEach(t,(s=>{const a=Pe(s.path);return A.waitFor([i.delete([n,a]),this.referenceDelegate.removeReference(e,n,s)])}))}removeMatchingKeysForTargetId(e,t){const n=yt(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=yt(e);let s=$();return i.J({range:n,H:!0},((a,u,c)=>{const d=ze(a[1]),f=new O(d);s=s.add(f)})).next((()=>s))}containsKey(e,t){const n=Pe(t.path),i=IDBKeyRange.bound([n],[Ah(n)],!1,!0);let s=0;return yt(e).J({index:"documentTargetsIndex",H:!0,range:i},(([a,u],c,d)=>{a!==0&&(s++,d.done())})).next((()=>s>0))}ot(e,t){return mn(e).get(t).next((n=>n?_r(n):null))}}function mn(r){return fe(r,"targets")}function Zc(r){return fe(r,"targetGlobal")}function yt(r){return fe(r,"targetDocuments")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function el([r,e],[t,n]){const i=G(r,t);return i===0?G(e,n):i}class oI{constructor(e){this.Un=e,this.buffer=new te(el),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();el(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class aI{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){C("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Vt(t)?C("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await sn(t)}await this.Hn(3e5)}))}}class uI{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Me.oe);const n=new oI(t);return this.Jn.forEachTarget(e,(i=>n.zn(i.sequenceNumber))).next((()=>this.Jn.Zn(e,(i=>n.zn(i))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(C("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(Xc)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(C("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Xc):this.Xn(e,t)))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,i,s,a,u,c,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(C("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,a=Date.now(),this.nthSequenceNumber(e,i)))).next((p=>(n=p,u=Date.now(),this.removeTargets(e,n,t)))).next((p=>(s=p,c=Date.now(),this.removeOrphanedDocuments(e,n)))).next((p=>(d=Date.now(),pn()<=W.DEBUG&&C("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(u-a)+`ms
	Removed ${s} targets in `+(c-u)+`ms
	Removed ${p} documents in `+(d-c)+`ms
Total Duration: ${d-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p}))))}}function cI(r,e){return new uI(r,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI{constructor(e,t){this.db=e,this.garbageCollector=cI(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((i=>n+i))))}er(e){let t=0;return this.Zn(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,((n,i)=>t(i)))}addReference(e,t,n){return yi(e,n)}removeReference(e,t,n){return yi(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return yi(e,t)}nr(e,t){return(function(i,s){let a=!1;return bd(i).Y((u=>Rd(i,u,s).next((c=>(c&&(a=!0),A.resolve(!c)))))).next((()=>a))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,((a,u)=>{if(u<=t){const c=this.nr(e,a).next((d=>{if(!d)return s++,n.getEntry(e,a).next((()=>(n.removeEntry(a,U.min()),yt(e).delete((function(p){return[0,Pe(p.path)]})(a)))))}));i.push(c)}})).next((()=>A.waitFor(i))).next((()=>n.apply(e))).next((()=>s))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return yi(e,t)}tr(e,t){const n=yt(e);let i,s=Me.oe;return n.J({index:"documentTargetsIndex"},(([a,u],{path:c,sequenceNumber:d})=>{a===0?(s!==Me.oe&&t(new O(ze(i)),s),s=d,i=c):s=Me.oe})).next((()=>{s!==Me.oe&&t(new O(ze(i)),s)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function yi(r,e){return yt(r).put((function(n,i){return{targetId:0,path:Pe(n.path),sequenceNumber:i}})(e,r.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pd{constructor(){this.changes=new kt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ce.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return Ft(e).put(n)}removeEntry(e,t,n){return Ft(e).delete((function(s,a){const u=s.path.toArray();return[u.slice(0,u.length-2),u[u.length-2],Ki(a),u[u.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.rr(e,n))))}getEntry(e,t){let n=ce.newInvalidDocument(t);return Ft(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(dr(t))},((i,s)=>{n=this.ir(t,s)})).next((()=>n))}sr(e,t){let n={size:0,document:ce.newInvalidDocument(t)};return Ft(e).J({index:"documentKeyIndex",range:IDBKeyRange.only(dr(t))},((i,s)=>{n={document:this.ir(t,s),size:Hi(s)}})).next((()=>n))}getEntries(e,t){let n=xe();return this._r(e,t,((i,s)=>{const a=this.ir(i,s);n=n.insert(i,a)})).next((()=>n))}ar(e,t){let n=xe(),i=new se(O.comparator);return this._r(e,t,((s,a)=>{const u=this.ir(s,a);n=n.insert(s,u),i=i.insert(s,Hi(a))})).next((()=>({documents:n,ur:i})))}_r(e,t,n){if(t.isEmpty())return A.resolve();let i=new te(rl);t.forEach((c=>i=i.add(c)));const s=IDBKeyRange.bound(dr(i.first()),dr(i.last())),a=i.getIterator();let u=a.getNext();return Ft(e).J({index:"documentKeyIndex",range:s},((c,d,f)=>{const p=O.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;u&&rl(u,p)<0;)n(u,null),u=a.getNext();u&&u.isEqual(p)&&(n(u,d),u=a.hasNext()?a.getNext():null),u?f.$(dr(u)):f.done()})).next((()=>{for(;u;)n(u,null),u=a.hasNext()?a.getNext():null}))}getDocumentsMatchingQuery(e,t,n,i,s){const a=t.path,u=[a.popLast().toArray(),a.lastSegment(),Ki(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],c=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Ft(e).U(IDBKeyRange.bound(u,c,!0)).next((d=>{s?.incrementDocumentReadCount(d.length);let f=xe();for(const p of d){const I=this.ir(O.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);I.isFoundDocument()&&(zr(t,I)||i.has(I.key))&&(f=f.insert(I.key,I))}return f}))}getAllFromCollectionGroup(e,t,n,i){let s=xe();const a=nl(t,n),u=nl(t,Oe.max());return Ft(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(a,u,!0)},((c,d,f)=>{const p=this.ir(O.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);s=s.insert(p.key,p),s.size===i&&f.done()})).next((()=>s))}newChangeBuffer(e){return new dI(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return tl(e).get("remoteDocumentGlobalKey").next((t=>(L(!!t),t)))}rr(e,t){return tl(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const n=Qy(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(U.min())))return n}return ce.newInvalidDocument(e)}}function Sd(r){return new hI(r)}class dI extends Pd{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new kt((n=>n.toString()),((n,i)=>n.isEqual(i)))}applyChanges(e){const t=[];let n=0,i=new te(((s,a)=>G(s.canonicalString(),a.canonicalString())));return this.changes.forEach(((s,a)=>{const u=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,u.readTime)),a.isValidDocument()){const c=qc(this.cr.serializer,a);i=i.add(s.path.popLast());const d=Hi(c);n+=d-u.size,t.push(this.cr.addEntry(e,s,c))}else if(n-=u.size,this.trackRemovals){const c=qc(this.cr.serializer,a.convertToNoDocument(U.min()));t.push(this.cr.addEntry(e,s,c))}})),i.forEach((s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))})),t.push(this.cr.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next((n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.cr.ar(e,t).next((({documents:n,ur:i})=>(i.forEach(((s,a)=>{this.lr.set(s,{size:a,readTime:n.get(s).readTime})})),n)))}}function tl(r){return fe(r,"remoteDocumentGlobal")}function Ft(r){return fe(r,"remoteDocumentsV14")}function dr(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function nl(r,e){const t=e.documentKey.path.toArray();return[r,Ki(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function rl(r,e){const t=r.path.toArray(),n=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<n.length-2;++s)if(i=G(t[s],n[s]),i)return i;return i=G(t.length,n.length),i||(i=G(t[t.length-2],n[n.length-2]),i||G(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(n=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(n!==null&&wr(n.mutation,i,Le.empty(),ae.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,$()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=$()){const i=Ge();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,n).next((s=>{let a=pr();return s.forEach(((u,c)=>{a=a.insert(u,c.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const n=Ge();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,$())))}populateOverlays(e,t,n){const i=[];return n.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((a,u)=>{t.set(a,u)}))}))}computeViews(e,t,n,i){let s=xe();const a=Er(),u=(function(){return Er()})();return t.forEach(((c,d)=>{const f=n.get(d.key);i.has(d.key)&&(f===void 0||f.mutation instanceof xt)?s=s.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),wr(f.mutation,d,f.mutation.getFieldMask(),ae.now())):a.set(d.key,Le.empty())})),this.recalculateAndSaveOverlays(e,s).next((c=>(c.forEach(((d,f)=>a.set(d,f))),t.forEach(((d,f)=>{var p;return u.set(d,new fI(f,(p=a.get(d))!==null&&p!==void 0?p:null))})),u)))}recalculateAndSaveOverlays(e,t){const n=Er();let i=new se(((a,u)=>a-u)),s=$();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const u of a)u.keys().forEach((c=>{const d=t.get(c);if(d===null)return;let f=n.get(c)||Le.empty();f=u.applyToLocalView(d,f),n.set(c,f);const p=(i.get(u.batchId)||$()).add(c);i=i.insert(u.batchId,p)}))})).next((()=>{const a=[],u=i.getReverseIterator();for(;u.hasNext();){const c=u.getNext(),d=c.key,f=c.value,p=Qh();f.forEach((I=>{if(!s.has(I)){const b=nd(t.get(I),n.get(I));b!==null&&p.set(I,b),s=s.add(I)}})),a.push(this.documentOverlayCache.saveOverlays(e,d,p))}return A.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,i){return(function(a){return O.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Qo(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next((s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):A.resolve(Ge());let u=-1,c=s;return a.next((d=>A.forEach(d,((f,p)=>(u<p.largestBatchId&&(u=p.largestBatchId),s.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next((I=>{c=c.insert(f,I)}))))).next((()=>this.populateOverlays(e,d,s))).next((()=>this.computeViews(e,c,d,$()))).next((f=>({batchId:u,changes:Hh(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next((n=>{let i=pr();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const s=t.collectionGroup;let a=pr();return this.indexManager.getCollectionParents(e,s).next((u=>A.forEach(u,(c=>{const d=(function(p,I){return new Dt(I,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,n,i).next((f=>{f.forEach(((p,I)=>{a=a.insert(p,I)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i)))).next((a=>{s.forEach(((c,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,ce.newInvalidDocument(f)))}));let u=pr();return a.forEach(((c,d)=>{const f=s.get(c);f!==void 0&&wr(f.mutation,d,Le.empty(),ae.now()),zr(t,d)&&(u=u.insert(c,d))})),u}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return A.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:Se(i.createTime)}})(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(i){return{name:i.name,query:Td(i.bundledQuery),readTime:Se(i.readTime)}})(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pI{constructor(){this.overlays=new se(O.comparator),this.Ir=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=Ge();return A.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&n.set(i,s)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((i,s)=>{this.ht(e,t,s)})),A.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.Ir.get(n);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Ir.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const i=Ge(),s=t.length+1,a=new O(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const c=u.getNext().value,d=c.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&c.largestBatchId>n&&i.set(c.getKey(),c)}return A.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new se(((d,f)=>d-f));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>n){let f=s.get(d.largestBatchId);f===null&&(f=Ge(),s=s.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const u=Ge(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((d,f)=>u.set(d,f))),!(u.size()>=i)););return A.resolve(u)}ht(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const a=this.Ir.get(i.largestBatchId).delete(n.key);this.Ir.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new ta(t,n));let s=this.Ir.get(t);s===void 0&&(s=$(),this.Ir.set(t,s)),this.Ir.set(t,s.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gI{constructor(){this.sessionToken=he.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(){this.Tr=new te(me.Er),this.dr=new te(me.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new me(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Vr(new me(e,t))}mr(e,t){e.forEach((n=>this.removeReference(n,t)))}gr(e){const t=new O(new X([])),n=new me(t,e),i=new me(t,e+1),s=[];return this.dr.forEachInRange([n,i],(a=>{this.Vr(a),s.push(a.key)})),s}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new O(new X([])),n=new me(t,e),i=new me(t,e+1);let s=$();return this.dr.forEachInRange([n,i],(a=>{s=s.add(a.key)})),s}containsKey(e){const t=new me(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class me{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return O.comparator(e.key,t.key)||G(e.wr,t.wr)}static Ar(e,t){return G(e.wr,t.wr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new te(me.Er)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Zo(s,t,n,i);this.mutationQueue.push(a);for(const u of i)this.br=this.br.add(new me(u.key,s)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return A.resolve(a)}lookupMutationBatch(e,t){return A.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.vr(n),s=i<0?0:i;return A.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new me(t,0),i=new me(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([n,i],(a=>{const u=this.Dr(a.wr);s.push(u)})),A.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new te(G);return t.forEach((i=>{const s=new me(i,0),a=new me(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,a],(u=>{n=n.add(u.wr)}))})),A.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let s=n;O.isDocumentKey(s)||(s=s.child(""));const a=new me(new O(s),0);let u=new te(G);return this.br.forEachWhile((c=>{const d=c.key.path;return!!n.isPrefixOf(d)&&(d.length===i&&(u=u.add(c.wr)),!0)}),a),A.resolve(this.Cr(u))}Cr(e){const t=[];return e.forEach((n=>{const i=this.Dr(n);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){L(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return A.forEach(t.mutations,(i=>{const s=new me(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.br=n}))}On(e){}containsKey(e,t){const n=new me(t,0),i=this.br.firstAfterOrEqual(n);return A.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{constructor(e){this.Mr=e,this.docs=(function(){return new se(O.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),s=i?i.size:0,a=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():ce.newInvalidDocument(t))}getEntries(e,t){let n=xe();return t.forEach((i=>{const s=this.docs.get(i);n=n.insert(i,s?s.document.mutableCopy():ce.newInvalidDocument(i))})),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=xe();const a=t.path,u=new O(a.child("")),c=this.docs.getIteratorFrom(u);for(;c.hasNext();){const{key:d,value:{document:f}}=c.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||Go(Rh(f),n)<=0||(i.has(f.key)||zr(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return A.resolve(s)}getAllFromCollectionGroup(e,t,n,i){M()}Or(e,t){return A.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new II(this)}getSize(e){return A.resolve(this.size)}}class II extends Pd{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(n)})),A.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vI{constructor(e){this.persistence=e,this.Nr=new kt((t=>en(t)),qr),this.lastRemoteSnapshotVersion=U.min(),this.highestTargetId=0,this.Lr=0,this.Br=new oa,this.targetCount=0,this.kr=rn.Bn()}forEachTarget(e,t){return this.Nr.forEach(((n,i)=>t(i))),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),A.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new rn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.Kn(t),A.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let i=0;const s=[];return this.Nr.forEach(((a,u)=>{u.sequenceNumber<=t&&n.get(u.targetId)===null&&(this.Nr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,u.targetId)),i++)})),A.waitFor(s).next((()=>i))}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((a=>{s.push(i.markPotentiallyOrphaned(e,a))})),A.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vd{constructor(e,t){this.qr={},this.overlays={},this.Qr=new Me(0),this.Kr=!1,this.Kr=!0,this.$r=new gI,this.referenceDelegate=e(this),this.Ur=new vI(this),this.indexManager=new rI,this.remoteDocumentCache=(function(i){return new yI(i)})((n=>this.referenceDelegate.Wr(n))),this.serializer=new Id(t),this.Gr=new mI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new pI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new _I(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){C("MemoryPersistence","Starting transaction:",e);const i=new TI(this.Qr.next());return this.referenceDelegate.zr(),n(i).next((s=>this.referenceDelegate.jr(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Hr(e,t){return A.or(Object.values(this.qr).map((n=>()=>n.containsKey(e,t))))}}class TI extends Ph{constructor(e){super(),this.currentSequenceNumber=e}}class ms{constructor(e){this.persistence=e,this.Jr=new oa,this.Yr=null}static Zr(e){return new ms(e)}get Xr(){if(this.Yr)return this.Yr;throw M()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),A.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((i=>this.Xr.add(i.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.Xr.add(s.toString())))})).next((()=>n.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.Xr,(n=>{const i=O.fromPath(n);return this.ei(e,i).next((s=>{s||t.removeEntry(i,U.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return A.or([()=>A.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{constructor(e){this.serializer=e}O(e,t,n,i){const s=new is("createOrUpgrade",t);n<1&&i>=1&&((function(c){c.createObjectStore("owner")})(e),(function(c){c.createObjectStore("mutationQueues",{keyPath:"userId"}),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",_c,{unique:!0}),c.createObjectStore("documentMutations")})(e),il(e),(function(c){c.createObjectStore("remoteDocuments")})(e));let a=A.resolve();return n<3&&i>=3&&(n!==0&&((function(c){c.deleteObjectStore("targetDocuments"),c.deleteObjectStore("targets"),c.deleteObjectStore("targetGlobal")})(e),il(e)),a=a.next((()=>(function(c){const d=c.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:U.min().toTimestamp(),targetCount:0};return d.put("targetGlobalKey",f)})(s)))),n<4&&i>=4&&(n!==0&&(a=a.next((()=>(function(c,d){return d.store("mutations").U().next((f=>{c.deleteObjectStore("mutations"),c.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",_c,{unique:!0});const p=d.store("mutations"),I=f.map((b=>p.put(b)));return A.waitFor(I)}))})(e,s)))),a=a.next((()=>{(function(c){c.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)}))),n<5&&i>=5&&(a=a.next((()=>this.ni(s)))),n<6&&i>=6&&(a=a.next((()=>((function(c){c.createObjectStore("remoteDocumentGlobal")})(e),this.ri(s))))),n<7&&i>=7&&(a=a.next((()=>this.ii(s)))),n<8&&i>=8&&(a=a.next((()=>this.si(e,s)))),n<9&&i>=9&&(a=a.next((()=>{(function(c){c.objectStoreNames.contains("remoteDocumentChanges")&&c.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&i>=10&&(a=a.next((()=>this.oi(s)))),n<11&&i>=11&&(a=a.next((()=>{(function(c){c.createObjectStore("bundles",{keyPath:"bundleId"})})(e),(function(c){c.createObjectStore("namedQueries",{keyPath:"name"})})(e)}))),n<12&&i>=12&&(a=a.next((()=>{(function(c){const d=c.createObjectStore("documentOverlays",{keyPath:X_});d.createIndex("collectionPathOverlayIndex",Z_,{unique:!1}),d.createIndex("collectionGroupOverlayIndex",ey,{unique:!1})})(e)}))),n<13&&i>=13&&(a=a.next((()=>(function(c){const d=c.createObjectStore("remoteDocumentsV14",{keyPath:q_});d.createIndex("documentKeyIndex",j_),d.createIndex("collectionGroupIndex",z_)})(e))).next((()=>this._i(e,s))).next((()=>e.deleteObjectStore("remoteDocuments")))),n<14&&i>=14&&(a=a.next((()=>this.ai(e,s)))),n<15&&i>=15&&(a=a.next((()=>(function(c){c.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),c.createObjectStore("indexState",{keyPath:H_}).createIndex("sequenceNumberIndex",Q_,{unique:!1}),c.createObjectStore("indexEntries",{keyPath:J_}).createIndex("documentKeyIndex",Y_,{unique:!1})})(e)))),n<16&&i>=16&&(a=a.next((()=>{t.objectStore("indexState").clear()})).next((()=>{t.objectStore("indexEntries").clear()}))),n<17&&i>=17&&(a=a.next((()=>{(function(c){c.createObjectStore("globals",{keyPath:"name"})})(e)}))),a}ri(e){let t=0;return e.store("remoteDocuments").J(((n,i)=>{t+=Hi(i)})).next((()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)}))}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next((i=>A.forEach(i,(s=>{const a=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",a).next((u=>A.forEach(u,(c=>{L(c.userId===s.userId);const d=jt(this.serializer,c);return Ad(e,s.userId,d).next((()=>{}))}))))}))))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next((i=>{const s=[];return n.J(((a,u)=>{const c=new X(a),d=(function(p){return[0,Pe(p)]})(c);s.push(t.get(d).next((f=>f?A.resolve():(p=>t.put({targetId:0,path:Pe(p),sequenceNumber:i.highestListenSequenceNumber}))(c))))})).next((()=>A.waitFor(s)))}))}si(e,t){e.createObjectStore("collectionParents",{keyPath:W_});const n=t.store("collectionParents"),i=new sa,s=a=>{if(i.add(a)){const u=a.lastSegment(),c=a.popLast();return n.put({collectionId:u,parent:Pe(c)})}};return t.store("remoteDocuments").J({H:!0},((a,u)=>{const c=new X(a);return s(c.popLast())})).next((()=>t.store("documentMutations").J({H:!0},(([a,u,c],d)=>{const f=ze(u);return s(f.popLast())}))))}oi(e){const t=e.store("targets");return t.J(((n,i)=>{const s=_r(i),a=vd(this.serializer,s);return t.put(a)}))}_i(e,t){const n=t.store("remoteDocuments"),i=[];return n.J(((s,a)=>{const u=t.store("remoteDocumentsV14"),c=(function(p){return p.document?new O(X.fromString(p.document.name).popFirst(5)):p.noDocument?O.fromSegments(p.noDocument.path):p.unknownDocument?O.fromSegments(p.unknownDocument.path):M()})(a).path.toArray(),d={prefixPath:c.slice(0,c.length-2),collectionGroup:c[c.length-2],documentId:c[c.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};i.push(u.put(d))})).next((()=>A.waitFor(i)))}ai(e,t){const n=t.store("mutations"),i=Sd(this.serializer),s=new Vd(ms.Zr,this.serializer.ct);return n.U().next((a=>{const u=new Map;return a.forEach((c=>{var d;let f=(d=u.get(c.userId))!==null&&d!==void 0?d:$();jt(this.serializer,c).keys().forEach((p=>f=f.add(p))),u.set(c.userId,f)})),A.forEach(u,((c,d)=>{const f=new ge(d),p=ds.lt(this.serializer,f),I=s.getIndexManager(f),b=fs.lt(f,this.serializer,I,s.referenceDelegate);return new Cd(i,b,p,I).recalculateAndSaveOverlaysForDocumentKeys(new fo(t,Me.oe),c).next()}))}))}}function il(r){r.createObjectStore("targetDocuments",{keyPath:$_}).createIndex("documentTargetsIndex",K_,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",G_,{unique:!0}),r.createObjectStore("targetGlobal")}const Zs="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class aa{constructor(e,t,n,i,s,a,u,c,d,f,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=s,this.window=a,this.document=u,this.ci=d,this.li=f,this.hi=p,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=I=>Promise.resolve(),!aa.D())throw new k(S.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new lI(this,i),this.Ai=t+"main",this.serializer=new Id(c),this.Ri=new At(this.Ai,this.hi,new EI(this.serializer)),this.$r=new Yy,this.Ur=new sI(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Sd(this.serializer),this.Gr=new Jy,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&be("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new k(S.FAILED_PRECONDITION,Zs);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Ur.getHighestSequenceNumber(e)))})).then((e=>{this.Qr=new Me(e,this.ci)})).then((()=>{this.Kr=!0})).catch((e=>(this.Ri&&this.Ri.close(),Promise.reject(e))))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget((async()=>{this.started&&await this.mi()})))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>Ii(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.wi(e).next((t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))))}))})).next((()=>this.Si(e))).next((t=>this.isPrimary&&!t?this.bi(e).next((()=>!1)):!!t&&this.Di(e).next((()=>!0)))))).catch((e=>{if(Vt(e))return C("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return C("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.ui.enqueueRetryable((()=>this.di(e))),this.isPrimary=e}))}wi(e){return fr(e).get("owner").next((t=>A.resolve(this.vi(t))))}Ci(e){return Ii(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=fe(t,"clientMetadata");return n.U().next((i=>{const s=this.xi(i,18e5),a=i.filter((u=>s.indexOf(u)===-1));return A.forEach(a,(u=>n.delete(u.clientId))).next((()=>a))}))})).catch((()=>[]));if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.mi().then((()=>this.Fi())).then((()=>this.pi()))))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?A.resolve(!0):fr(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new k(S.FAILED_PRECONDITION,Zs);return!1}}return!(!this.networkEnabled||!this.inForeground)||Ii(e).U().next((n=>this.xi(n,5e3).find((i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,a=!this.inForeground&&i.inForeground,u=this.networkEnabled===i.networkEnabled;if(s||a&&u)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&C("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],(e=>{const t=new fo(e,Me.oe);return this.bi(t).next((()=>this.Ci(t)))})),this.Ri.close(),this.qi()}xi(e,t){return e.filter((n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId)))}Qi(){return this.runTransaction("getActiveClients","readonly",(e=>Ii(e).U().next((t=>this.xi(t,18e5).map((n=>n.clientId))))))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return fs.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new iI(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return ds.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){C("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=(function(c){return c===17?ry:c===16?ny:c===15?Ko:c===14?kh:c===13?Dh:c===12?ty:c===11?Vh:void M()})(this.hi);let a;return this.Ri.runTransaction(e,i,s,(u=>(a=new fo(u,this.Qr?this.Qr.next():Me.oe),t==="readwrite-primary"?this.wi(a).next((c=>!!c||this.Si(a))).next((c=>{if(!c)throw be(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))),new k(S.FAILED_PRECONDITION,bh);return n(a)})).next((c=>this.Di(a).next((()=>c)))):this.Ki(a).next((()=>n(a)))))).then((u=>(a.raiseOnCommittedEvent(),u)))}Ki(e){return fr(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new k(S.FAILED_PRECONDITION,Zs)}))}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return fr(e).put("owner",t)}static D(){return At.D()}bi(e){const t=fr(e);return t.get("owner").next((n=>this.vi(n)?(C("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):A.resolve()))}Mi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(be(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.mi())))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;Cl()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return C("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return be("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){be("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function fr(r){return fe(r,"owner")}function Ii(r){return fe(r,"clientMetadata")}function wI(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ua{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=i}static Wi(e,t){let n=$(),i=$();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new ua(e,t.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return Cl()?8:Sh(de())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,i){const s={result:null};return this.Yi(e,t).next((a=>{s.result=a})).next((()=>{if(!s.result)return this.Zi(e,t,i,n).next((a=>{s.result=a}))})).next((()=>{if(s.result)return;const a=new AI;return this.Xi(e,t,a).next((u=>{if(s.result=u,this.zi)return this.es(e,t,a,u.size)}))})).next((()=>s.result))}es(e,t,n,i){return n.documentReadCount<this.ji?(pn()<=W.DEBUG&&C("QueryEngine","SDK will not create cache indexes for query:",gn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),A.resolve()):(pn()<=W.DEBUG&&C("QueryEngine","Query:",gn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Hi*i?(pn()<=W.DEBUG&&C("QueryEngine","The SDK decides to create cache indexes for query:",gn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Fe(t))):A.resolve())}Yi(e,t){if(Vc(t))return A.resolve(null);let n=Fe(t);return this.indexManager.getIndexType(e,n).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=zi(t,null,"F"),n=Fe(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((s=>{const a=$(...s);return this.Ji.getDocuments(e,a).next((u=>this.indexManager.getMinOffset(e,n).next((c=>{const d=this.ts(t,u);return this.ns(t,d,a,c.readTime)?this.Yi(e,zi(t,null,"F")):this.rs(e,d,t,c)}))))})))))}Zi(e,t,n,i){return Vc(t)||i.isEqual(U.min())?A.resolve(null):this.Ji.getDocuments(e,n).next((s=>{const a=this.ts(t,s);return this.ns(t,a,n,i)?A.resolve(null):(pn()<=W.DEBUG&&C("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),gn(t)),this.rs(e,a,t,x_(i,-1)).next((u=>u)))}))}ts(e,t){let n=new te(Kh(e));return t.forEach(((i,s)=>{zr(e,s)&&(n=n.add(s))})),n}ns(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,n){return pn()<=W.DEBUG&&C("QueryEngine","Using full collection scan to execute query:",gn(t)),this.Ji.getDocumentsMatchingQuery(e,t,Oe.min(),n)}rs(e,t,n,i){return this.Ji.getDocumentsMatchingQuery(e,n,i).next((s=>(t.forEach((a=>{s=s.insert(a.key,a)})),s)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{constructor(e,t,n,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new se(G),this._s=new kt((s=>en(s)),qr),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Cd(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function kd(r,e,t,n){return new RI(r,e,t,n)}async function xd(r,e){const t=j(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next((s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(n)))).next((s=>{const a=[],u=[];let c=$();for(const d of i){a.push(d.batchId);for(const f of d.mutations)c=c.add(f.key)}for(const d of s){u.push(d.batchId);for(const f of d.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(n,c).next((d=>({hs:d,removedBatchIds:a,addedBatchIds:u})))}))}))}function bI(r,e){const t=j(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return(function(u,c,d,f){const p=d.batch,I=p.keys();let b=A.resolve();return I.forEach((V=>{b=b.next((()=>f.getEntry(c,V))).next((x=>{const D=d.docVersions.get(V);L(D!==null),x.version.compareTo(D)<0&&(p.applyToRemoteDocument(x,d),x.isValidDocument()&&(x.setReadTime(d.commitVersion),f.addEntry(x)))}))})),b.next((()=>u.mutationQueue.removeMutationBatch(c,p)))})(t,n,e,s).next((()=>s.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(u){let c=$();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(c=c.add(u.batch.mutations[d].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(n,i)))}))}function Nd(r){const e=j(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ur.getLastRemoteSnapshotVersion(t)))}function PI(r,e){const t=j(r),n=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const u=[];e.targetChanges.forEach(((f,p)=>{const I=i.get(p);if(!I)return;u.push(t.Ur.removeMatchingKeys(s,f.removedDocuments,p).next((()=>t.Ur.addMatchingKeys(s,f.addedDocuments,p))));let b=I.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?b=b.withResumeToken(he.EMPTY_BYTE_STRING,U.min()).withLastLimboFreeSnapshotVersion(U.min()):f.resumeToken.approximateByteSize()>0&&(b=b.withResumeToken(f.resumeToken,n)),i=i.insert(p,b),(function(x,D,z){return x.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-x.snapshotVersion.toMicroseconds()>=3e8?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0})(I,b,f)&&u.push(t.Ur.updateTargetData(s,b))}));let c=xe(),d=$();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))})),u.push(SI(s,a,e.documentUpdates).next((f=>{c=f.Ps,d=f.Is}))),!n.isEqual(U.min())){const f=t.Ur.getLastRemoteSnapshotVersion(s).next((p=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,n)));u.push(f)}return A.waitFor(u).next((()=>a.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,c,d))).next((()=>c))})).then((s=>(t.os=i,s)))}function SI(r,e,t){let n=$(),i=$();return t.forEach((s=>n=n.add(s))),e.getEntries(r,n).next((s=>{let a=xe();return t.forEach(((u,c)=>{const d=s.get(u);c.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(u)),c.isNoDocument()&&c.version.isEqual(U.min())?(e.removeEntry(u,c.readTime),a=a.insert(u,c)):!d.isValidDocument()||c.version.compareTo(d.version)>0||c.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(c),a=a.insert(u,c)):C("LocalStore","Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",c.version)})),{Ps:a,Is:i}}))}function CI(r,e){const t=j(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function VI(r,e){const t=j(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let i;return t.Ur.getTargetData(n,e).next((s=>s?(i=s,A.resolve(i)):t.Ur.allocateTargetId(n).next((a=>(i=new nt(e,a,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,i).next((()=>i)))))))})).then((n=>{const i=t.os.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n}))}async function Po(r,e,t){const n=j(r),i=n.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",s,(a=>n.persistence.referenceDelegate.removeTarget(a,i)))}catch(a){if(!Vt(a))throw a;C("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}n.os=n.os.remove(e),n._s.delete(i.target)}function sl(r,e,t){const n=j(r);let i=U.min(),s=$();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(c,d,f){const p=j(c),I=p._s.get(f);return I!==void 0?A.resolve(p.os.get(I)):p.Ur.getTargetData(d,f)})(n,a,Fe(e)).next((u=>{if(u)return i=u.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(a,u.targetId).next((c=>{s=c}))})).next((()=>n.ss.getDocumentsMatchingQuery(a,e,t?i:U.min(),t?s:$()))).next((u=>(DI(n,yy(e),u),{documents:u,Ts:s})))))}function DI(r,e,t){let n=r.us.get(e)||U.min();t.forEach(((i,s)=>{s.readTime.compareTo(n)>0&&(n=s.readTime)})),r.us.set(e,n)}class ol{constructor(){this.activeTargetIds=Ay()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Od{constructor(){this.so=new ol,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new ol,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kI{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){C("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){C("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let vi=null;function eo(){return vi===null?vi=(function(){return 268435456+Math.round(2147483648*Math.random())})():vi++,"0x"+vi.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NI{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ee="WebChannelConnection";class OI extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,n,i,s,a){const u=eo(),c=this.xo(t,n.toUriEncodedString());C("RestConnection",`Sending RPC '${t}' ${u}:`,c,i);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,s,a),this.No(t,c,d,i).then((f=>(C("RestConnection",`Received RPC '${t}' ${u}: `,f),f)),(f=>{throw Pn("RestConnection",`RPC '${t}' ${u} failed with error: `,f,"url: ",c,"request:",i),f}))}Lo(t,n,i,s,a,u){return this.Mo(t,n,i,s,a)}Oo(t,n,i){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+jn})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach(((s,a)=>t[a]=s)),i&&i.headers.forEach(((s,a)=>t[a]=s))}xo(t,n){const i=xI[t];return`${this.Do}/v1/${n}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,i){const s=eo();return new Promise(((a,u)=>{const c=new _h;c.setWithCredentials(!0),c.listenOnce(yh.COMPLETE,(()=>{try{switch(c.getLastErrorCode()){case Ri.NO_ERROR:const f=c.getResponseJson();C(Ee,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),a(f);break;case Ri.TIMEOUT:C(Ee,`RPC '${e}' ${s} timed out`),u(new k(S.DEADLINE_EXCEEDED,"Request time out"));break;case Ri.HTTP_ERROR:const p=c.getStatus();if(C(Ee,`RPC '${e}' ${s} failed with status:`,p,"response text:",c.getResponseText()),p>0){let I=c.getResponseJson();Array.isArray(I)&&(I=I[0]);const b=I?.error;if(b&&b.status&&b.message){const V=(function(D){const z=D.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(z)>=0?z:S.UNKNOWN})(b.status);u(new k(V,b.message))}else u(new k(S.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new k(S.UNAVAILABLE,"Connection failed."));break;default:M()}}finally{C(Ee,`RPC '${e}' ${s} completed.`)}}));const d=JSON.stringify(i);C(Ee,`RPC '${e}' ${s} sending request:`,i),c.send(t,"POST",d,n,15)}))}Bo(e,t,n){const i=eo(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Th(),u=vh(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(c.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,t,n),c.encodeInitMessageHeaders=!0;const f=s.join("");C(Ee,`Creating RPC '${e}' stream ${i}: ${f}`,c);const p=a.createWebChannel(f,c);let I=!1,b=!1;const V=new NI({Io:D=>{b?C(Ee,`Not sending because RPC '${e}' stream ${i} is closed:`,D):(I||(C(Ee,`Opening RPC '${e}' stream ${i} transport.`),p.open(),I=!0),C(Ee,`RPC '${e}' stream ${i} sending:`,D),p.send(D))},To:()=>p.close()}),x=(D,z,B)=>{D.listen(z,(F=>{try{B(F)}catch(Q){setTimeout((()=>{throw Q}),0)}}))};return x(p,mr.EventType.OPEN,(()=>{b||(C(Ee,`RPC '${e}' stream ${i} transport opened.`),V.yo())})),x(p,mr.EventType.CLOSE,(()=>{b||(b=!0,C(Ee,`RPC '${e}' stream ${i} transport closed`),V.So())})),x(p,mr.EventType.ERROR,(D=>{b||(b=!0,Pn(Ee,`RPC '${e}' stream ${i} transport errored:`,D),V.So(new k(S.UNAVAILABLE,"The operation could not be completed")))})),x(p,mr.EventType.MESSAGE,(D=>{var z;if(!b){const B=D.data[0];L(!!B);const F=B,Q=F.error||((z=F[0])===null||z===void 0?void 0:z.error);if(Q){C(Ee,`RPC '${e}' stream ${i} received error:`,Q);const Z=Q.status;let K=(function(y){const T=le[y];if(T!==void 0)return sd(T)})(Z),v=Q.message;K===void 0&&(K=S.INTERNAL,v="Unknown error status: "+Z+" with message "+Q.message),b=!0,V.So(new k(K,v)),p.close()}else C(Ee,`RPC '${e}' stream ${i} received:`,B),V.bo(B)}})),x(u,Ih.STAT_EVENT,(D=>{D.stat===lo.PROXY?C(Ee,`RPC '${e}' stream ${i} detected buffering proxy`):D.stat===lo.NOPROXY&&C(Ee,`RPC '${e}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{V.wo()}),0),V}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MI(){return typeof window<"u"?window:null}function ki(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ps(r){return new Uy(r,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Md{constructor(e,t,n=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-n);i>0&&C("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{constructor(e,t,n,i,s,a,u,c){this.ui=e,this.Ho=n,this.Jo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Md(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(be(t.toString()),be("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,i])=>{this.Yo===t&&this.P_(n,i)}),(n=>{e((()=>{const i=new k(S.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(i)}))}))}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo((()=>{n((()=>this.listener.Eo()))})),this.stream.Ro((()=>{n((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((i=>{n((()=>this.I_(i)))})),this.stream.onMessage((i=>{n((()=>++this.e_==1?this.E_(i):this.onNext(i)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(e){return C("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget((()=>this.Yo===e?t():(C("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class LI extends Ld{constructor(e,t,n,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,a),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=jy(this.serializer,e),n=(function(s){if(!("targetChange"in s))return U.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?U.min():a.readTime?Se(a.readTime):U.min()})(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=Eo(this.serializer),t.addTarget=(function(s,a){let u;const c=a.target;if(u=qi(c)?{documents:fd(s,c)}:{query:md(s,c)._t},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=ud(s,a.resumeToken);const d=vo(s,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(U.min())>0){u.readTime=On(s,a.snapshotVersion.toTimestamp());const d=vo(s,a.expectedCount);d!==null&&(u.expectedCount=d)}return u})(this.serializer,e);const n=Gy(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=Eo(this.serializer),t.removeTarget=e,this.a_(t)}}class FI extends Ld{constructor(e,t,n,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,a),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return L(!!e.streamToken),this.lastStreamToken=e.streamToken,L(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){L(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=zy(e.writeResults,e.commitTime),n=Se(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=Eo(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>$i(this.serializer,n)))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UI extends class{}{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,a])=>this.connection.Mo(e,To(t,n),i,s,a))).catch((s=>{throw s.name==="FirebaseError"?(s.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new k(S.UNKNOWN,s.toString())}))}Lo(e,t,n,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,u])=>this.connection.Lo(e,To(t,n),i,a,u,s))).catch((a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new k(S.UNKNOWN,a.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class BI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(be(t),this.D_=!1):C("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qI{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o((a=>{n.enqueueAndForget((async()=>{on(this)&&(C("RemoteStore","Restarting streams for network reachability change."),await(async function(c){const d=j(c);d.L_.add(4),await $r(d),d.q_.set("Unknown"),d.L_.delete(4),await gs(d)})(this))}))})),this.q_=new BI(n,i)}}async function gs(r){if(on(r))for(const e of r.B_)await e(!0)}async function $r(r){for(const e of r.B_)await e(!1)}function Fd(r,e){const t=j(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),da(t)?ha(t):$n(t).r_()&&la(t,e))}function ca(r,e){const t=j(r),n=$n(t);t.N_.delete(e),n.r_()&&Ud(t,e),t.N_.size===0&&(n.r_()?n.o_():on(t)&&t.q_.set("Unknown"))}function la(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(U.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}$n(r).A_(e)}function Ud(r,e){r.Q_.xe(e),$n(r).R_(e)}function ha(r){r.Q_=new Oy({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),$n(r).start(),r.q_.v_()}function da(r){return on(r)&&!$n(r).n_()&&r.N_.size>0}function on(r){return j(r).L_.size===0}function Bd(r){r.Q_=void 0}async function jI(r){r.q_.set("Online")}async function zI(r){r.N_.forEach(((e,t)=>{la(r,e)}))}async function GI(r,e){Bd(r),da(r)?(r.q_.M_(e),ha(r)):r.q_.set("Unknown")}async function $I(r,e,t){if(r.q_.set("Online"),e instanceof ad&&e.state===2&&e.cause)try{await(async function(i,s){const a=s.cause;for(const u of s.targetIds)i.N_.has(u)&&(await i.remoteSyncer.rejectListen(u,a),i.N_.delete(u),i.Q_.removeTarget(u))})(r,e)}catch(n){C("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await Qi(r,n)}else if(e instanceof Di?r.Q_.Ke(e):e instanceof od?r.Q_.He(e):r.Q_.We(e),!t.isEqual(U.min()))try{const n=await Nd(r.localStore);t.compareTo(n)>=0&&await(function(s,a){const u=s.Q_.rt(a);return u.targetChanges.forEach(((c,d)=>{if(c.resumeToken.approximateByteSize()>0){const f=s.N_.get(d);f&&s.N_.set(d,f.withResumeToken(c.resumeToken,a))}})),u.targetMismatches.forEach(((c,d)=>{const f=s.N_.get(c);if(!f)return;s.N_.set(c,f.withResumeToken(he.EMPTY_BYTE_STRING,f.snapshotVersion)),Ud(s,c);const p=new nt(f.target,c,d,f.sequenceNumber);la(s,p)})),s.remoteSyncer.applyRemoteEvent(u)})(r,t)}catch(n){C("RemoteStore","Failed to raise snapshot:",n),await Qi(r,n)}}async function Qi(r,e,t){if(!Vt(e))throw e;r.L_.add(1),await $r(r),r.q_.set("Offline"),t||(t=()=>Nd(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{C("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await gs(r)}))}function qd(r,e){return e().catch((t=>Qi(r,t,e)))}async function Kr(r){const e=j(r),t=Ct(e);let n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;KI(e);)try{const i=await CI(e.localStore,n);if(i===null){e.O_.length===0&&t.o_();break}n=i.batchId,WI(e,i)}catch(i){await Qi(e,i)}jd(e)&&zd(e)}function KI(r){return on(r)&&r.O_.length<10}function WI(r,e){r.O_.push(e);const t=Ct(r);t.r_()&&t.V_&&t.m_(e.mutations)}function jd(r){return on(r)&&!Ct(r).n_()&&r.O_.length>0}function zd(r){Ct(r).start()}async function HI(r){Ct(r).p_()}async function QI(r){const e=Ct(r);for(const t of r.O_)e.m_(t.mutations)}async function JI(r,e,t){const n=r.O_.shift(),i=ea.from(n,e,t);await qd(r,(()=>r.remoteSyncer.applySuccessfulWrite(i))),await Kr(r)}async function YI(r,e){e&&Ct(r).V_&&await(async function(n,i){if((function(a){return ky(a)&&a!==S.ABORTED})(i.code)){const s=n.O_.shift();Ct(n).s_(),await qd(n,(()=>n.remoteSyncer.rejectFailedWrite(s.batchId,i))),await Kr(n)}})(r,e),jd(r)&&zd(r)}async function ul(r,e){const t=j(r);t.asyncQueue.verifyOperationInProgress(),C("RemoteStore","RemoteStore received new credentials");const n=on(t);t.L_.add(3),await $r(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await gs(t)}async function XI(r,e){const t=j(r);e?(t.L_.delete(2),await gs(t)):e||(t.L_.add(2),await $r(t),t.q_.set("Unknown"))}function $n(r){return r.K_||(r.K_=(function(t,n,i){const s=j(t);return s.w_(),new LI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(r.datastore,r.asyncQueue,{Eo:jI.bind(null,r),Ro:zI.bind(null,r),mo:GI.bind(null,r),d_:$I.bind(null,r)}),r.B_.push((async e=>{e?(r.K_.s_(),da(r)?ha(r):r.q_.set("Unknown")):(await r.K_.stop(),Bd(r))}))),r.K_}function Ct(r){return r.U_||(r.U_=(function(t,n,i){const s=j(t);return s.w_(),new FI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:HI.bind(null,r),mo:YI.bind(null,r),f_:QI.bind(null,r),g_:JI.bind(null,r)}),r.B_.push((async e=>{e?(r.U_.s_(),await Kr(r)):(await r.U_.stop(),r.O_.length>0&&(C("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))}))),r.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fa{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new Ke,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){const a=Date.now()+n,u=new fa(e,t,a,i,s);return u.start(n),u}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function ma(r,e){if(be("AsyncQueue",`${e}: ${r}`),Vt(r))return new k(S.UNAVAILABLE,`${e}: ${r}`);throw r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class An{constructor(e){this.comparator=e?(t,n)=>e(t,n)||O.comparator(t.key,n.key):(t,n)=>O.comparator(t.key,n.key),this.keyedMap=pr(),this.sortedSet=new se(this.comparator)}static emptySet(e){return new An(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof An)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new An;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(){this.W_=new se(O.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):M():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal(((t,n)=>{e.push(n)})),e}}class Mn{constructor(e,t,n,i,s,a,u,c,d){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=c,this.hasCachedResults=d}static fromInitialDocuments(e,t,n,i,s){const a=[];return t.forEach((u=>{a.push({type:0,doc:u})})),new Mn(e,t,An.emptySet(t),a,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&us(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZI{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((e=>e.J_()))}}class ev{constructor(){this.queries=ll(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){const i=j(t),s=i.queries;i.queries=ll(),s.forEach(((a,u)=>{for(const c of u.j_)c.onError(n)}))})(this,new k(S.ABORTED,"Firestore shutting down"))}}function ll(){return new kt((r=>$h(r)),us)}async function pa(r,e){const t=j(r);let n=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(n=2):(s=new ZI,n=e.J_()?0:1);try{switch(n){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const u=ma(a,`Initialization of query '${gn(e.query)}' failed`);return void e.onError(u)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&_a(t)}async function ga(r,e){const t=j(r),n=e.query;let i=3;const s=t.queries.get(n);if(s){const a=s.j_.indexOf(e);a>=0&&(s.j_.splice(a,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function tv(r,e){const t=j(r);let n=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const u of a.j_)u.X_(i)&&(n=!0);a.z_=i}}n&&_a(t)}function nv(r,e,t){const n=j(r),i=n.queries.get(e);if(i)for(const s of i.j_)s.onError(t);n.queries.delete(e)}function _a(r){r.Y_.forEach((e=>{e.next()}))}var So,hl;(hl=So||(So={})).ea="default",hl.Cache="cache";class ya{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const n=[];for(const i of e.docChanges)i.type!==3&&n.push(i);e=new Mn(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=Mn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==So.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(e){this.key=e}}class $d{constructor(e){this.key=e}}class rv{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=$(),this.mutatedKeys=$(),this.Aa=Kh(e),this.Ra=new An(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new cl,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,u=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((f,p)=>{const I=i.get(f),b=zr(this.query,p)?p:null,V=!!I&&this.mutatedKeys.has(I.key),x=!!b&&(b.hasLocalMutations||this.mutatedKeys.has(b.key)&&b.hasCommittedMutations);let D=!1;I&&b?I.data.isEqual(b.data)?V!==x&&(n.track({type:3,doc:b}),D=!0):this.ga(I,b)||(n.track({type:2,doc:b}),D=!0,(c&&this.Aa(b,c)>0||d&&this.Aa(b,d)<0)&&(u=!0)):!I&&b?(n.track({type:0,doc:b}),D=!0):I&&!b&&(n.track({type:1,doc:I}),D=!0,(c||d)&&(u=!0)),D&&(b?(a=a.add(b),s=x?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),n.track({type:1,doc:f})}return{Ra:a,fa:n,ns:u,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort(((f,p)=>(function(b,V){const x=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return M()}};return x(b)-x(V)})(f.type,p.type)||this.Aa(f.doc,p.doc))),this.pa(n),i=i!=null&&i;const u=t&&!i?this.ya():[],c=this.da.size===0&&this.current&&!i?1:0,d=c!==this.Ea;return this.Ea=c,a.length!==0||d?{snapshot:new Mn(this.query,e.Ra,s,a,e.mutatedKeys,c===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:u}:{wa:u}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new cl,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach((t=>this.Ta=this.Ta.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ta=this.Ta.delete(t))),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=$(),this.Ra.forEach((n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))}));const t=[];return e.forEach((n=>{this.da.has(n)||t.push(new $d(n))})),this.da.forEach((n=>{e.has(n)||t.push(new Gd(n))})),t}ba(e){this.Ta=e.Ts,this.da=$();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return Mn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class iv{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class sv{constructor(e){this.key=e,this.va=!1}}class ov{constructor(e,t,n,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new kt((u=>$h(u)),us),this.Ma=new Map,this.xa=new Set,this.Oa=new se(O.comparator),this.Na=new Map,this.La=new oa,this.Ba={},this.ka=new Map,this.qa=rn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function av(r,e,t=!0){const n=Yd(r);let i;const s=n.Fa.get(e);return s?(n.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await Kd(n,e,t,!0),i}async function uv(r,e){const t=Yd(r);await Kd(t,e,!0,!1)}async function Kd(r,e,t,n){const i=await VI(r.localStore,Fe(e)),s=i.targetId,a=r.sharedClientState.addLocalQueryTarget(s,t);let u;return n&&(u=await cv(r,e,s,a==="current",i.resumeToken)),r.isPrimaryClient&&t&&Fd(r.remoteStore,i),u}async function cv(r,e,t,n,i){r.Ka=(p,I,b)=>(async function(x,D,z,B){let F=D.view.ma(z);F.ns&&(F=await sl(x.localStore,D.query,!1).then((({documents:v})=>D.view.ma(v,F))));const Q=B&&B.targetChanges.get(D.targetId),Z=B&&B.targetMismatches.get(D.targetId)!=null,K=D.view.applyChanges(F,x.isPrimaryClient,Q,Z);return fl(x,D.targetId,K.wa),K.snapshot})(r,p,I,b);const s=await sl(r.localStore,e,!0),a=new rv(e,s.Ts),u=a.ma(s.documents),c=Gr.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",i),d=a.applyChanges(u,r.isPrimaryClient,c);fl(r,t,d.wa);const f=new iv(e,t,a);return r.Fa.set(e,f),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),d.snapshot}async function lv(r,e,t){const n=j(r),i=n.Fa.get(e),s=n.Ma.get(i.targetId);if(s.length>1)return n.Ma.set(i.targetId,s.filter((a=>!us(a,e)))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await Po(n.localStore,i.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(i.targetId),t&&ca(n.remoteStore,i.targetId),Co(n,i.targetId)})).catch(sn)):(Co(n,i.targetId),await Po(n.localStore,i.targetId,!0))}async function hv(r,e){const t=j(r),n=t.Fa.get(e),i=t.Ma.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),ca(t.remoteStore,n.targetId))}async function dv(r,e,t){const n=Xd(r);try{const i=await(function(a,u){const c=j(a),d=ae.now(),f=u.reduce(((b,V)=>b.add(V.key)),$());let p,I;return c.persistence.runTransaction("Locally write mutations","readwrite",(b=>{let V=xe(),x=$();return c.cs.getEntries(b,f).next((D=>{V=D,V.forEach(((z,B)=>{B.isValidDocument()||(x=x.add(z))}))})).next((()=>c.localDocuments.getOverlayedDocuments(b,V))).next((D=>{p=D;const z=[];for(const B of u){const F=Vy(B,p.get(B.key).overlayedDocument);F!=null&&z.push(new xt(B.key,F,Lh(F.value.mapValue),Ne.exists(!0)))}return c.mutationQueue.addMutationBatch(b,d,z,u)})).next((D=>{I=D;const z=D.applyToLocalDocumentSet(p,x);return c.documentOverlayCache.saveOverlays(b,D.batchId,z)}))})).then((()=>({batchId:I.batchId,changes:Hh(p)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),(function(a,u,c){let d=a.Ba[a.currentUser.toKey()];d||(d=new se(G)),d=d.insert(u,c),a.Ba[a.currentUser.toKey()]=d})(n,i.batchId,t),await Wr(n,i.changes),await Kr(n.remoteStore)}catch(i){const s=ma(i,"Failed to persist write");t.reject(s)}}async function Wd(r,e){const t=j(r);try{const n=await PI(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const a=t.Na.get(s);a&&(L(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.va=!0:i.modifiedDocuments.size>0?L(a.va):i.removedDocuments.size>0&&(L(a.va),a.va=!1))})),await Wr(t,n,e)}catch(n){await sn(n)}}function dl(r,e,t){const n=j(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.Fa.forEach(((s,a)=>{const u=a.view.Z_(e);u.snapshot&&i.push(u.snapshot)})),(function(a,u){const c=j(a);c.onlineState=u;let d=!1;c.queries.forEach(((f,p)=>{for(const I of p.j_)I.Z_(u)&&(d=!0)})),d&&_a(c)})(n.eventManager,e),i.length&&n.Ca.d_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function fv(r,e,t){const n=j(r);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n.Na.get(e),s=i&&i.key;if(s){let a=new se(O.comparator);a=a.insert(s,ce.newNoDocument(s,U.min()));const u=$().add(s),c=new hs(U.min(),new Map,new se(G),a,u);await Wd(n,c),n.Oa=n.Oa.remove(s),n.Na.delete(e),Ia(n)}else await Po(n.localStore,e,!1).then((()=>Co(n,e,t))).catch(sn)}async function mv(r,e){const t=j(r),n=e.batch.batchId;try{const i=await bI(t.localStore,e);Qd(t,n,null),Hd(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Wr(t,i)}catch(i){await sn(i)}}async function pv(r,e,t){const n=j(r);try{const i=await(function(a,u){const c=j(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let f;return c.mutationQueue.lookupMutationBatch(d,u).next((p=>(L(p!==null),f=p.keys(),c.mutationQueue.removeMutationBatch(d,p)))).next((()=>c.mutationQueue.performConsistencyCheck(d))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(d,f,u))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f))).next((()=>c.localDocuments.getDocuments(d,f)))}))})(n.localStore,e);Qd(n,e,t),Hd(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Wr(n,i)}catch(i){await sn(i)}}function Hd(r,e){(r.ka.get(e)||[]).forEach((t=>{t.resolve()})),r.ka.delete(e)}function Qd(r,e,t){const n=j(r);let i=n.Ba[n.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),n.Ba[n.currentUser.toKey()]=i}}function Co(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach((n=>{r.La.containsKey(n)||Jd(r,n)}))}function Jd(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(ca(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),Ia(r))}function fl(r,e,t){for(const n of t)n instanceof Gd?(r.La.addReference(n.key,e),gv(r,n)):n instanceof $d?(C("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||Jd(r,n.key)):M()}function gv(r,e){const t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(C("SyncEngine","New document in limbo: "+t),r.xa.add(n),Ia(r))}function Ia(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new O(X.fromString(e)),n=r.qa.next();r.Na.set(n,new sv(t)),r.Oa=r.Oa.insert(t,n),Fd(r.remoteStore,new nt(Fe(jr(t.path)),n,"TargetPurposeLimboResolution",Me.oe))}}async function Wr(r,e,t){const n=j(r),i=[],s=[],a=[];n.Fa.isEmpty()||(n.Fa.forEach(((u,c)=>{a.push(n.Ka(c,e,t).then((d=>{var f;if((d||t)&&n.isPrimaryClient){const p=d?!d.fromCache:(f=t?.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(d){i.push(d);const p=ua.Wi(c.targetId,d);s.push(p)}})))})),await Promise.all(a),n.Ca.d_(i),await(async function(c,d){const f=j(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>A.forEach(d,(I=>A.forEach(I.$i,(b=>f.persistence.referenceDelegate.addReference(p,I.targetId,b))).next((()=>A.forEach(I.Ui,(b=>f.persistence.referenceDelegate.removeReference(p,I.targetId,b)))))))))}catch(p){if(!Vt(p))throw p;C("LocalStore","Failed to update sequence numbers: "+p)}for(const p of d){const I=p.targetId;if(!p.fromCache){const b=f.os.get(I),V=b.snapshotVersion,x=b.withLastLimboFreeSnapshotVersion(V);f.os=f.os.insert(I,x)}}})(n.localStore,s))}async function _v(r,e){const t=j(r);if(!t.currentUser.isEqual(e)){C("SyncEngine","User change. New user:",e.toKey());const n=await xd(t.localStore,e);t.currentUser=e,(function(s,a){s.ka.forEach((u=>{u.forEach((c=>{c.reject(new k(S.CANCELLED,a))}))})),s.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Wr(t,n.hs)}}function yv(r,e){const t=j(r),n=t.Na.get(e);if(n&&n.va)return $().add(n.key);{let i=$();const s=t.Ma.get(e);if(!s)return i;for(const a of s){const u=t.Fa.get(a);i=i.unionWith(u.view.Va)}return i}}function Yd(r){const e=j(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Wd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=yv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=fv.bind(null,e),e.Ca.d_=tv.bind(null,e.eventManager),e.Ca.$a=nv.bind(null,e.eventManager),e}function Xd(r){const e=j(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=mv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=pv.bind(null,e),e}class Or{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ps(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return kd(this.persistence,new Dd,e.initialUser,this.serializer)}Ga(e){return new Vd(ms.Zr,this.serializer)}Wa(e){return new Od}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Or.provider={build:()=>new Or};class Iv extends Or{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Xd(this.Ja.syncEngine),await Kr(this.Ja.remoteStore),await this.persistence.yi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}za(e){return kd(this.persistence,new Dd,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new aI(n,e.asyncQueue,t)}Ha(e,t){const n=new L_(t,this.persistence);return new M_(e.asyncQueue,n)}Ga(e){const t=wI(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Ve.withCacheSize(this.cacheSizeBytes):Ve.DEFAULT;return new aa(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,MI(),ki(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new Od}}class Ji{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>dl(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=_v.bind(null,this.syncEngine),await XI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new ev})()}createDatastore(e){const t=ps(e.databaseInfo.databaseId),n=(function(s){return new OI(s)})(e.databaseInfo);return(function(s,a,u,c){return new UI(s,a,u,c)})(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,i,s,a,u){return new qI(n,i,s,a,u)})(this.localStore,this.datastore,e.asyncQueue,(t=>dl(this.syncEngine,t,0)),(function(){return al.D()?new al:new kI})())}createSyncEngine(e,t){return(function(i,s,a,u,c,d,f){const p=new ov(i,s,a,u,c,d);return f&&(p.Qa=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const s=j(i);C("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await $r(s),s.k_.shutdown(),s.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ji.provider={build:()=>new Ji};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):be("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=ge.UNAUTHENTICATED,this.clientId=wh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,(async a=>{C("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(C("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ke;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=ma(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function to(r,e){r.asyncQueue.verifyOperationInProgress(),C("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async i=>{n.isEqual(i)||(await xd(e.localStore,i),n=i)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function ml(r,e){r.asyncQueue.verifyOperationInProgress();const t=await Tv(r);C("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>ul(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,i)=>ul(e.remoteStore,i))),r._onlineComponents=e}async function Tv(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){C("FirestoreClient","Using user provided OfflineComponentProvider");try{await to(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===S.FAILED_PRECONDITION||i.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;Pn("Error using user provided cache. Falling back to memory cache: "+t),await to(r,new Or)}}else C("FirestoreClient","Using default OfflineComponentProvider"),await to(r,new Or);return r._offlineComponents}async function Zd(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(C("FirestoreClient","Using user provided OnlineComponentProvider"),await ml(r,r._uninitializedComponentsProvider._online)):(C("FirestoreClient","Using default OnlineComponentProvider"),await ml(r,new Ji))),r._onlineComponents}function Ev(r){return Zd(r).then((e=>e.syncEngine))}async function Yi(r){const e=await Zd(r),t=e.eventManager;return t.onListen=av.bind(null,e.syncEngine),t.onUnlisten=lv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=uv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=hv.bind(null,e.syncEngine),t}function wv(r,e,t={}){const n=new Ke;return r.asyncQueue.enqueueAndForget((async()=>(function(s,a,u,c,d){const f=new va({next:I=>{f.Za(),a.enqueueAndForget((()=>ga(s,p)));const b=I.docs.has(u);!b&&I.fromCache?d.reject(new k(S.UNAVAILABLE,"Failed to get document because the client is offline.")):b&&I.fromCache&&c&&c.source==="server"?d.reject(new k(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(I)},error:I=>d.reject(I)}),p=new ya(jr(u.path),f,{includeMetadataChanges:!0,_a:!0});return pa(s,p)})(await Yi(r),r.asyncQueue,e,t,n))),n.promise}function Av(r,e,t={}){const n=new Ke;return r.asyncQueue.enqueueAndForget((async()=>(function(s,a,u,c,d){const f=new va({next:I=>{f.Za(),a.enqueueAndForget((()=>ga(s,p))),I.fromCache&&c.source==="server"?d.reject(new k(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(I)},error:I=>d.reject(I)}),p=new ya(u,f,{includeMetadataChanges:!0,_a:!0});return pa(s,p)})(await Yi(r),r.asyncQueue,e,t,n))),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ef(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tf(r,e,t){if(!t)throw new k(S.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function Rv(r,e,t,n){if(e===!0&&n===!0)throw new k(S.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function gl(r){if(!O.isDocumentKey(r))throw new k(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function _l(r){if(O.isDocumentKey(r))throw new k(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${r} has ${r.length}.`)}function _s(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":M()}function We(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new k(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=_s(r);throw new k(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yl{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new k(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Rv("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=ef((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,i){return n.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ys{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new yl({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new yl(e),e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new A_;switch(n.type){case"firstParty":return new S_(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new k(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=pl.get(t);n&&(C("ComponentProvider","Removing Datastore"),pl.delete(t),n.terminate())})(this),Promise.resolve()}}function bv(r,e,t,n={}){var i;const s=(r=We(r,ys))._getSettings(),a=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&Pn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),n.mockUserToken){let u,c;if(typeof n.mockUserToken=="string")u=n.mockUserToken,c=ge.MOCK_USER;else{u=sm(n.mockUserToken,(i=r._app)===null||i===void 0?void 0:i.options.projectId);const d=n.mockUserToken.sub||n.mockUserToken.user_id;if(!d)throw new k(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new ge(d)}r._authCredentials=new R_(new Eh(u,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new qe(this.firestore,e,this._query)}}class Ce{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Rt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ce(this.firestore,e,this._key)}}class Rt extends qe{constructor(e,t,n){super(e,t,jr(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ce(this.firestore,null,new O(e))}withConverter(e){return new Rt(this.firestore,e,this._path)}}function eT(r,e,...t){if(r=we(r),tf("collection","path",e),r instanceof ys){const n=X.fromString(e,...t);return _l(n),new Rt(r,null,n)}{if(!(r instanceof Ce||r instanceof Rt))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return _l(n),new Rt(r.firestore,null,n)}}function tT(r,e,...t){if(r=we(r),arguments.length===1&&(e=wh.newId()),tf("doc","path",e),r instanceof ys){const n=X.fromString(e,...t);return gl(n),new Ce(r,null,new O(n))}{if(!(r instanceof Ce||r instanceof Rt))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(X.fromString(e,...t));return gl(n),new Ce(r.firestore,r instanceof Rt?r.converter:null,new O(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Md(this,"async_queue_retry"),this.Vu=()=>{const n=ki();n&&C("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;const t=ki();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=ki();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new Ke;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!Vt(e))throw e;C("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((n=>{this.Eu=n,this.du=!1;const i=(function(a){let u=a.message||"";return a.stack&&(u=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),u})(n);throw be("INTERNAL UNHANDLED ERROR: ",i),n})).then((n=>(this.du=!1,n))))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=fa.createAndSchedule(this,e,t,n,(s=>this.yu(s)));return this.Tu.push(i),i}fu(){this.Eu&&M()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function vl(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of n)if(s in i&&typeof i[s]=="function")return!0;return!1})(r,["next","error","complete"])}class Ln extends ys{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new Il,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Il(e),this._firestoreClient=void 0,await e}}}function nT(r,e,t){t||(t="(default)");const n=es(r,"firestore");if(n.isInitialized(t)){const i=n.getImmediate({identifier:t}),s=n.getOptions(t);if(Ar(s,e))return i;throw new k(S.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new k(S.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function rT(r,e){const t=typeof r=="object"?r:xl(),n=typeof r=="string"?r:"(default)",i=es(t,"firestore").getImmediate({identifier:n});if(!i._initialized){const s=rm("firestore");s&&bv(i,...s)}return i}function Is(r){if(r._terminated)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Pv(r),r._firestoreClient}function Pv(r){var e,t,n;const i=r._freezeSettings(),s=(function(u,c,d,f){return new sy(u,c,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,ef(f.experimentalLongPollingOptions),f.useFetchStreams)})(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new vv(r._authCredentials,r._appCheckCredentials,r._queue,s,r._componentsProvider&&(function(u){const c=u?._online.build();return{_offline:u?._offline.build(c),_online:c}})(r._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Fn(he.fromBase64String(e))}catch(t){throw new k(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Fn(he.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ta{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new k(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new oe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ea{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new k(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new k(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0})(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sv=/^__.*__$/;class Cv{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new xt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Gn(e,this.data,t,this.fieldTransforms)}}function nf(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M()}}class Aa{constructor(e,t,n,i,s,a){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Aa(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.Ou(e),i}Nu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Xi(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(nf(this.Cu)&&Sv.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Vv{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||ps(e)}Qu(e,t,n,i=!1){return new Aa({Cu:e,methodName:t,qu:n,path:oe.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ra(r){const e=r._freezeSettings(),t=ps(r._databaseId);return new Vv(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Dv(r,e,t,n,i,s={}){const a=r.Qu(s.merge||s.mergeFields?2:0,e,t,i);af("Data must be an object, but it was:",a,n);const u=sf(n,a);let c,d;if(s.merge)c=new Le(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const p of s.mergeFields){const I=kv(e,p,t);if(!a.contains(I))throw new k(S.INVALID_ARGUMENT,`Field '${I}' is specified in your field mask but missing from your input data.`);Nv(f,I)||f.push(I)}c=new Le(f),d=a.fieldTransforms.filter((p=>c.covers(p.field)))}else c=null,d=a.fieldTransforms;return new Cv(new De(u),c,d)}class ba extends vs{_toFieldTransform(e){return new Yo(e.path,new Dn)}isEqual(e){return e instanceof ba}}class Pa extends vs{constructor(e,t){super(e),this.$u=t}_toFieldTransform(e){const t=new Nn(e.serializer,Yh(e.serializer,this.$u));return new Yo(e.path,t)}isEqual(e){return e instanceof Pa&&this.$u===e.$u}}function rf(r,e,t,n=!1){return Sa(t,r.Qu(n?4:3,e))}function Sa(r,e){if(of(r=we(r)))return af("Unsupported field value:",e,r),sf(r,e);if(r instanceof vs)return(function(n,i){if(!nf(i.Cu))throw i.Bu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return(function(n,i){const s=[];let a=0;for(const u of n){let c=Sa(u,i.Lu(a));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),a++}return{arrayValue:{values:s}}})(r,e)}return(function(n,i){if((n=we(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Yh(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=ae.fromDate(n);return{timestampValue:On(i.serializer,s)}}if(n instanceof ae){const s=new ae(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:On(i.serializer,s)}}if(n instanceof Ea)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof Fn)return{bytesValue:ud(i.serializer,n._byteString)};if(n instanceof Ce){const s=i.databaseId,a=n.firestore._databaseId;if(!a.isEqual(s))throw i.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:ra(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof wa)return(function(a,u){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map((c=>{if(typeof c!="number")throw u.Bu("VectorValues must only contain numeric values.");return Jo(u.serializer,c)}))}}}}}})(n,i);throw i.Bu(`Unsupported field value: ${_s(n)}`)})(r,e)}function sf(r,e){const t={};return xh(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):zn(r,((n,i)=>{const s=Sa(i,e.Mu(n));s!=null&&(t[n]=s)})),{mapValue:{fields:t}}}function of(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ae||r instanceof Ea||r instanceof Fn||r instanceof Ce||r instanceof vs||r instanceof wa)}function af(r,e,t){if(!of(t)||!(function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)})(t)){const n=_s(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function kv(r,e,t){if((e=we(e))instanceof Ta)return e._internalPath;if(typeof e=="string")return uf(r,e);throw Xi("Field path arguments must be of type string or ",r,!1,void 0,t)}const xv=new RegExp("[~\\*/\\[\\]]");function uf(r,e,t){if(e.search(xv)>=0)throw Xi(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Ta(...e.split("."))._internalPath}catch{throw Xi(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function Xi(r,e,t,n,i){const s=n&&!n.isEmpty(),a=i!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let c="";return(s||a)&&(c+=" (found",s&&(c+=` in field ${n}`),a&&(c+=` in document ${i}`),c+=")"),new k(S.INVALID_ARGUMENT,u+r+c)}function Nv(r,e){return r.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ca{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ce(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Ov(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Va("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Ov extends Ca{data(){return super.data()}}function Va(r,e){return typeof e=="string"?uf(r,e):e instanceof Ta?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cf(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new k(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Da{}class Hr extends Da{}function iT(r,e,...t){let n=[];e instanceof Da&&n.push(e),n=n.concat(t),(function(s){const a=s.filter((c=>c instanceof xa)).length,u=s.filter((c=>c instanceof ka)).length;if(a>1||a>0&&u>0)throw new k(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const i of n)r=i._apply(r);return r}class ka extends Hr{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new ka(e,t,n)}_apply(e){const t=this._parse(e);return hf(e._query,t),new qe(e.firestore,e.converter,Io(e._query,t))}_parse(e){const t=Ra(e.firestore);return(function(s,a,u,c,d,f,p){let I;if(d.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new k(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){El(p,f);const b=[];for(const V of p)b.push(Tl(c,s,V));I={arrayValue:{values:b}}}else I=Tl(c,s,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||El(p,f),I=rf(u,a,p,f==="in"||f==="not-in");return H.create(d,f,I)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class xa extends Da{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new xa(e,t)}_parse(e){const t=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return t.length===1?t[0]:ee.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(i,s){let a=i;const u=s.getFlattenedFilters();for(const c of u)hf(a,c),a=Io(a,c)})(e._query,t),new qe(e.firestore,e.converter,Io(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Na extends Hr{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Na(e,t)}_apply(e){const t=(function(i,s,a){if(i.startAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Nr(s,a)})(e._query,this._field,this._direction);return new qe(e.firestore,e.converter,(function(i,s){const a=i.explicitOrderBy.concat([s]);return new Dt(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)})(e._query,t))}}function sT(r,e="asc"){const t=e,n=Va("orderBy",r);return Na._create(n,t)}class Oa extends Hr{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Oa(e,t,n)}_apply(e){return new qe(e.firestore,e.converter,zi(e._query,this._limit,this._limitType))}}function oT(r){return Oa._create("limit",r,"F")}class Ma extends Hr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new Ma(e,t,n)}_apply(e){const t=lf(e,this.type,this._docOrFields,this._inclusive);return new qe(e.firestore,e.converter,(function(i,s){return new Dt(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,s,i.endAt)})(e._query,t))}}function aT(...r){return Ma._create("startAt",r,!0)}class La extends Hr{constructor(e,t,n){super(),this.type=e,this._docOrFields=t,this._inclusive=n}static _create(e,t,n){return new La(e,t,n)}_apply(e){const t=lf(e,this.type,this._docOrFields,this._inclusive);return new qe(e.firestore,e.converter,(function(i,s){return new Dt(i.path,i.collectionGroup,i.explicitOrderBy.slice(),i.filters.slice(),i.limit,i.limitType,i.startAt,s)})(e._query,t))}}function uT(...r){return La._create("endAt",r,!0)}function lf(r,e,t,n){if(t[0]=we(t[0]),t[0]instanceof Ca)return(function(s,a,u,c,d){if(!c)throw new k(S.NOT_FOUND,`Can't use a DocumentSnapshot that doesn't exist for ${u}().`);const f=[];for(const p of wn(s))if(p.field.isKeyField())f.push(Zt(a,c.key));else{const I=c.data.field(p.field);if(os(I))throw new k(S.INVALID_ARGUMENT,'Invalid query. You are trying to start or end a query using a document for which the field "'+p.field+'" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');if(I===null){const b=p.field.canonicalString();throw new k(S.INVALID_ARGUMENT,`Invalid query. You are trying to start or end a query using a document for which the field '${b}' (used as the orderBy) does not exist.`)}f.push(I)}return new St(f,d)})(r._query,r.firestore._databaseId,e,t[0]._document,n);{const i=Ra(r.firestore);return(function(a,u,c,d,f,p){const I=a.explicitOrderBy;if(f.length>I.length)throw new k(S.INVALID_ARGUMENT,`Too many arguments provided to ${d}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);const b=[];for(let V=0;V<f.length;V++){const x=f[V];if(I[V].field.isKeyField()){if(typeof x!="string")throw new k(S.INVALID_ARGUMENT,`Invalid query. Expected a string for document ID in ${d}(), but got a ${typeof x}`);if(!Qo(a)&&x.indexOf("/")!==-1)throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection and ordering by documentId(), the value passed to ${d}() must be a plain document ID, but '${x}' contains a slash.`);const D=a.path.child(X.fromString(x));if(!O.isDocumentKey(D))throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group and ordering by documentId(), the value passed to ${d}() must result in a valid document path, but '${D}' is not because it contains an odd number of segments.`);const z=new O(D);b.push(Zt(u,z))}else{const D=rf(c,d,x);b.push(D)}}return new St(b,p)})(r._query,r.firestore._databaseId,i,e,t,n)}}function Tl(r,e,t){if(typeof(t=we(t))=="string"){if(t==="")throw new k(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Qo(e)&&t.indexOf("/")!==-1)throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(X.fromString(t));if(!O.isDocumentKey(n))throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Zt(r,new O(n))}if(t instanceof Ce)return Zt(r,t._key);throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${_s(t)}.`)}function El(r,e){if(!Array.isArray(r)||r.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function hf(r,e){const t=(function(i,s){for(const a of i)for(const u of a.getFlattenedFilters())if(s.indexOf(u.op)>=0)return u.op;return null})(r.filters,(function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Mv{convertValue(e,t="none"){switch(Xt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ie(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(bt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw M()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return zn(e,((i,s)=>{n[i]=this.convertValue(s,t)})),n}convertVectorValue(e){var t,n,i;const s=(i=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map((a=>ie(a.doubleValue)));return new wa(s)}convertGeoPoint(e){return new Ea(ie(e.latitude),ie(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Wo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Dr(e));default:return null}}convertTimestamp(e){const t=st(e);return new ae(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=X.fromString(e);L(yd(n));const i=new Yt(n.get(1),n.get(3)),s=new O(n.popFirst(5));return i.isEqual(t)||be(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lv(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class df extends Ca{constructor(e,t,n,i,s,a){super(e,t,n,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new xi(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Va("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class xi extends df{data(e={}){return super.data(e)}}class ff{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new yr(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new xi(this._firestore,this._userDataWriter,n.key,n,new yr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new k(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map((u=>{const c=new xi(i._firestore,i._userDataWriter,u.doc.key,u.doc,new yr(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);return u.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}}))}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((u=>s||u.type!==3)).map((u=>{const c=new xi(i._firestore,i._userDataWriter,u.doc.key,u.doc,new yr(i._snapshot.mutatedKeys.has(u.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,f=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),f=a.indexOf(u.doc.key)),{type:Fv(u.type),doc:c,oldIndex:d,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Fv(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return M()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cT(r){r=We(r,Ce);const e=We(r.firestore,Ln);return wv(Is(e),r._key).then((t=>mf(e,r,t)))}class Fa extends Mv{constructor(e){super(),this.firestore=e}convertBytes(e){return new Fn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ce(this.firestore,null,t)}}function lT(r){r=We(r,qe);const e=We(r.firestore,Ln),t=Is(e),n=new Fa(e);return cf(r._query),Av(t,r._query).then((i=>new ff(e,n,r,i)))}function hT(r,e,t){r=We(r,Ce);const n=We(r.firestore,Ln),i=Lv(r.converter,e,t);return Uv(n,[Dv(Ra(n),"setDoc",r._key,i,r.converter!==null,t).toMutation(r._key,Ne.none())])}function dT(r,...e){var t,n,i;r=we(r);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||vl(e[a])||(s=e[a],a++);const u={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(vl(e[a])){const p=e[a];e[a]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[a+1]=(n=p.error)===null||n===void 0?void 0:n.bind(p),e[a+2]=(i=p.complete)===null||i===void 0?void 0:i.bind(p)}let c,d,f;if(r instanceof Ce)d=We(r.firestore,Ln),f=jr(r._key.path),c={next:p=>{e[a]&&e[a](mf(d,r,p))},error:e[a+1],complete:e[a+2]};else{const p=We(r,qe);d=We(p.firestore,Ln),f=p._query;const I=new Fa(d);c={next:b=>{e[a]&&e[a](new ff(d,I,p,b))},error:e[a+1],complete:e[a+2]},cf(r._query)}return(function(I,b,V,x){const D=new va(x),z=new ya(b,D,V);return I.asyncQueue.enqueueAndForget((async()=>pa(await Yi(I),z))),()=>{D.Za(),I.asyncQueue.enqueueAndForget((async()=>ga(await Yi(I),z)))}})(Is(d),f,u,c)}function Uv(r,e){return(function(n,i){const s=new Ke;return n.asyncQueue.enqueueAndForget((async()=>dv(await Ev(n),i,s))),s.promise})(Is(r),e)}function mf(r,e,t){const n=t.docs.get(e._key),i=new Fa(r);return new df(r,i,e._key,n,new yr(t.hasPendingWrites,t.fromCache),e.converter)}class Bv{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=jv(),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function fT(r){return new Bv(r)}class qv{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ji.provider,this._offlineComponentProvider={build:t=>new Iv(t,e?.cacheSizeBytes,this.forceOwnership)}}}function jv(r){return new qv(void 0)}function mT(){return new ba("serverTimestamp")}function pT(r){return new Pa("increment",r)}(function(e,t=!0){(function(i){jn=i})(Un),Rn(new Ht("firestore",((n,{instanceIdentifier:i,options:s})=>{const a=n.getProvider("app").getImmediate(),u=new Ln(new b_(n.getProvider("auth-internal")),new V_(n.getProvider("app-check-internal")),(function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new k(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Yt(d.options.projectId,f)})(a,i),a);return s=Object.assign({useFetchStreams:t},s),u._setSettings(s),u}),"PUBLIC").setMultipleInstances(!0)),Et(mc,"4.7.3",e),Et(mc,"4.7.3","esm2017")})();export{ko as A,Gv as B,pt as G,Qu as _,xl as a,nT as b,jv as c,Jv as d,rT as e,Qv as f,zv as g,Hv as h,yp as i,Wv as j,cT as k,tT as l,hT as m,pT as n,$v as o,fT as p,eT as q,lT as r,Kv as s,iT as t,oT as u,uT as v,aT as w,sT as x,mT as y,dT as z};
