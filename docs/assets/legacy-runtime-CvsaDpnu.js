var Mc={};/**
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
 */const El=function(r){const e=[];let t=0;for(let n=0;n<r.length;n++){let i=r.charCodeAt(n);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&n+1<r.length&&(r.charCodeAt(n+1)&64512)===56320?(i=65536+((i&1023)<<10)+(r.charCodeAt(++n)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Of=function(r){const e=[];let t=0,n=0;for(;t<r.length;){const i=r[t++];if(i<128)e[n++]=String.fromCharCode(i);else if(i>191&&i<224){const s=r[t++];e[n++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=r[t++],a=r[t++],c=r[t++],u=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(u&1023))}else{const s=r[t++],a=r[t++];e[n++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},Tl={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(r,e){if(!Array.isArray(r))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let i=0;i<r.length;i+=3){const s=r[i],a=i+1<r.length,c=a?r[i+1]:0,u=i+2<r.length,d=u?r[i+2]:0,f=s>>2,p=(s&3)<<4|c>>4;let T=(c&15)<<2|d>>6,S=d&63;u||(S=64,a||(T=64)),n.push(t[f],t[p],t[T],t[S])}return n.join("")},encodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(r):this.encodeByteArray(El(r),e)},decodeString(r,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(r):Of(this.decodeStringToByteArray(r,e))},decodeStringToByteArray(r,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let i=0;i<r.length;){const s=t[r.charAt(i++)],c=i<r.length?t[r.charAt(i)]:0;++i;const d=i<r.length?t[r.charAt(i)]:64;++i;const p=i<r.length?t[r.charAt(i)]:64;if(++i,s==null||c==null||d==null||p==null)throw new Mf;const T=s<<2|c>>4;if(n.push(T),d!==64){const S=c<<4&240|d>>2;if(n.push(S),p!==64){const k=d<<6&192|p;n.push(k)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let r=0;r<this.ENCODED_VALS.length;r++)this.byteToCharMap_[r]=this.ENCODED_VALS.charAt(r),this.charToByteMap_[this.byteToCharMap_[r]]=r,this.byteToCharMapWebSafe_[r]=this.ENCODED_VALS_WEBSAFE.charAt(r),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[r]]=r,r>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(r)]=r,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(r)]=r)}}};class Mf extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Lf=function(r){const e=El(r);return Tl.encodeByteArray(e,!0)},gs=function(r){return Lf(r).replace(/\./g,"")},wl=function(r){try{return Tl.decodeString(r,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function Ff(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Uf=()=>Ff().__FIREBASE_DEFAULTS__,Bf=()=>{if(typeof process>"u"||typeof Mc>"u")return;const r=Mc.__FIREBASE_DEFAULTS__;if(r)return JSON.parse(r)},qf=()=>{if(typeof document>"u")return;let r;try{r=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=r&&wl(r[1]);return e&&JSON.parse(e)},Ns=()=>{try{return Uf()||Bf()||qf()}catch(r){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${r}`);return}},Al=r=>{var e,t;return(t=(e=Ns())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[r]},jf=r=>{const e=Al(r);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),n]:[e.substring(0,t),n]},bl=()=>{var r;return(r=Ns())===null||r===void 0?void 0:r.config},Rl=r=>{var e;return(e=Ns())===null||e===void 0?void 0:e[`_${r}`]};/**
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
 */class zf{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,n)=>{t?this.reject(t):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,n))}}}/**
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
 */function $f(r,e){if(r.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},n=e||"demo-project",i=r.iat||0,s=r.sub||r.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${n}`,aud:n,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},r);return[gs(JSON.stringify(t)),gs(JSON.stringify(a)),""].join(".")}/**
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
 */function Pe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Kf(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Pe())}function Gf(){var r;const e=(r=Ns())===null||r===void 0?void 0:r.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Hf(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Wf(){const r=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof r=="object"&&r.id!==void 0}function Qf(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Jf(){const r=Pe();return r.indexOf("MSIE ")>=0||r.indexOf("Trident/")>=0}function Sl(){return!Gf()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Pl(){try{return typeof indexedDB=="object"}catch{return!1}}function Yf(){return new Promise((r,e)=>{try{let t=!0;const n="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(n);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(n),r(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const Xf="FirebaseError";class Nt extends Error{constructor(e,t,n){super(t),this.code=e,this.customData=n,this.name=Xf,Object.setPrototypeOf(this,Nt.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,_i.prototype.create)}}class _i{constructor(e,t,n){this.service=e,this.serviceName=t,this.errors=n}create(e,...t){const n=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?Zf(s,n):"Error",c=`${this.serviceName}: ${a} (${i}).`;return new Nt(i,c,n)}}function Zf(r,e){return r.replace(em,(t,n)=>{const i=e[n];return i!=null?String(i):`<${n}?>`})}const em=/\{\$([^}]+)}/g;function tm(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}function ri(r,e){if(r===e)return!0;const t=Object.keys(r),n=Object.keys(e);for(const i of t){if(!n.includes(i))return!1;const s=r[i],a=e[i];if(Lc(s)&&Lc(a)){if(!ri(s,a))return!1}else if(s!==a)return!1}for(const i of n)if(!t.includes(i))return!1;return!0}function Lc(r){return r!==null&&typeof r=="object"}/**
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
 */function yi(r){const e=[];for(const[t,n]of Object.entries(r))Array.isArray(n)?n.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function nm(r,e){const t=new rm(r,e);return t.subscribe.bind(t)}class rm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,n){let i;if(e===void 0&&t===void 0&&n===void 0)throw new Error("Missing Observer.");im(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:n},i.next===void 0&&(i.next=po),i.error===void 0&&(i.error=po),i.complete===void 0&&(i.complete=po);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function im(r,e){if(typeof r!="object"||r===null)return!1;for(const t of e)if(t in r&&typeof r[t]=="function")return!0;return!1}function po(){}/**
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
 */function tt(r){return r&&r._delegate?r._delegate:r}class Rn{constructor(e,t,n){this.name=e,this.instanceFactory=t,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const _n="[DEFAULT]";/**
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
 */class sm{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const n=new zf;if(this.instancesDeferred.set(t,n),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&n.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const n=this.normalizeInstanceIdentifier(e?.identifier),i=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(am(e))try{this.getOrInitializeService({instanceIdentifier:_n})}catch{}for(const[t,n]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});n.resolve(s)}catch{}}}}clearInstance(e=_n){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=_n){return this.instances.has(e)}getOptions(e=_n){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:n,options:t});for(const[s,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(s);n===c&&a.resolve(i)}return i}onInit(e,t){var n;const i=this.normalizeInstanceIdentifier(t),s=(n=this.onInitCallbacks.get(i))!==null&&n!==void 0?n:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const n=this.onInitCallbacks.get(t);if(n)for(const i of n)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:om(e),options:t}),this.instances.set(e,n),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=_n){return this.component?this.component.multipleInstances?e:_n:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function om(r){return r===_n?void 0:r}function am(r){return r.instantiationMode==="EAGER"}/**
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
 */class cm{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new sm(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var te;(function(r){r[r.DEBUG=0]="DEBUG",r[r.VERBOSE=1]="VERBOSE",r[r.INFO=2]="INFO",r[r.WARN=3]="WARN",r[r.ERROR=4]="ERROR",r[r.SILENT=5]="SILENT"})(te||(te={}));const um={debug:te.DEBUG,verbose:te.VERBOSE,info:te.INFO,warn:te.WARN,error:te.ERROR,silent:te.SILENT},lm=te.INFO,hm={[te.DEBUG]:"log",[te.VERBOSE]:"log",[te.INFO]:"info",[te.WARN]:"warn",[te.ERROR]:"error"},dm=(r,e,...t)=>{if(e<r.logLevel)return;const n=new Date().toISOString(),i=hm[e];if(i)console[i](`[${n}]  ${r.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ta{constructor(e){this.name=e,this._logLevel=lm,this._logHandler=dm,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in te))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?um[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,te.DEBUG,...e),this._logHandler(this,te.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,te.VERBOSE,...e),this._logHandler(this,te.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,te.INFO,...e),this._logHandler(this,te.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,te.WARN,...e),this._logHandler(this,te.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,te.ERROR,...e),this._logHandler(this,te.ERROR,...e)}}const fm=(r,e)=>e.some(t=>r instanceof t);let Fc,Uc;function mm(){return Fc||(Fc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function pm(){return Uc||(Uc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Cl=new WeakMap,So=new WeakMap,Vl=new WeakMap,go=new WeakMap,na=new WeakMap;function gm(r){const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("success",s),r.removeEventListener("error",a)},s=()=>{t(Qt(r.result)),i()},a=()=>{n(r.error),i()};r.addEventListener("success",s),r.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Cl.set(t,r)}).catch(()=>{}),na.set(e,r),e}function _m(r){if(So.has(r))return;const e=new Promise((t,n)=>{const i=()=>{r.removeEventListener("complete",s),r.removeEventListener("error",a),r.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{n(r.error||new DOMException("AbortError","AbortError")),i()};r.addEventListener("complete",s),r.addEventListener("error",a),r.addEventListener("abort",a)});So.set(r,e)}let Po={get(r,e,t){if(r instanceof IDBTransaction){if(e==="done")return So.get(r);if(e==="objectStoreNames")return r.objectStoreNames||Vl.get(r);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Qt(r[e])},set(r,e,t){return r[e]=t,!0},has(r,e){return r instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in r}};function ym(r){Po=r(Po)}function Im(r){return r===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const n=r.call(_o(this),e,...t);return Vl.set(n,e.sort?e.sort():[e]),Qt(n)}:pm().includes(r)?function(...e){return r.apply(_o(this),e),Qt(Cl.get(this))}:function(...e){return Qt(r.apply(_o(this),e))}}function vm(r){return typeof r=="function"?Im(r):(r instanceof IDBTransaction&&_m(r),fm(r,mm())?new Proxy(r,Po):r)}function Qt(r){if(r instanceof IDBRequest)return gm(r);if(go.has(r))return go.get(r);const e=vm(r);return e!==r&&(go.set(r,e),na.set(e,r)),e}const _o=r=>na.get(r);function Em(r,e,{blocked:t,upgrade:n,blocking:i,terminated:s}={}){const a=indexedDB.open(r,e),c=Qt(a);return n&&a.addEventListener("upgradeneeded",u=>{n(Qt(a.result),u.oldVersion,u.newVersion,Qt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}const Tm=["get","getKey","getAll","getAllKeys","count"],wm=["put","add","delete","clear"],yo=new Map;function Bc(r,e){if(!(r instanceof IDBDatabase&&!(e in r)&&typeof e=="string"))return;if(yo.get(e))return yo.get(e);const t=e.replace(/FromIndex$/,""),n=e!==t,i=wm.includes(t);if(!(t in(n?IDBIndex:IDBObjectStore).prototype)||!(i||Tm.includes(t)))return;const s=async function(a,...c){const u=this.transaction(a,i?"readwrite":"readonly");let d=u.store;return n&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&u.done]))[0]};return yo.set(e,s),s}ym(r=>({...r,get:(e,t,n)=>Bc(e,t)||r.get(e,t,n),has:(e,t)=>!!Bc(e,t)||r.has(e,t)}));/**
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
 */class Am{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(bm(t)){const n=t.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(t=>t).join(" ")}}function bm(r){const e=r.getComponent();return e?.type==="VERSION"}const Co="@firebase/app",qc="0.10.13";/**
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
 */const kt=new ta("@firebase/app"),Rm="@firebase/app-compat",Sm="@firebase/analytics-compat",Pm="@firebase/analytics",Cm="@firebase/app-check-compat",Vm="@firebase/app-check",km="@firebase/auth",Dm="@firebase/auth-compat",xm="@firebase/database",Nm="@firebase/data-connect",Om="@firebase/database-compat",Mm="@firebase/functions",Lm="@firebase/functions-compat",Fm="@firebase/installations",Um="@firebase/installations-compat",Bm="@firebase/messaging",qm="@firebase/messaging-compat",jm="@firebase/performance",zm="@firebase/performance-compat",$m="@firebase/remote-config",Km="@firebase/remote-config-compat",Gm="@firebase/storage",Hm="@firebase/storage-compat",Wm="@firebase/firestore",Qm="@firebase/vertexai-preview",Jm="@firebase/firestore-compat",Ym="firebase",Xm="10.14.1";/**
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
 */const Vo="[DEFAULT]",Zm={[Co]:"fire-core",[Rm]:"fire-core-compat",[Pm]:"fire-analytics",[Sm]:"fire-analytics-compat",[Vm]:"fire-app-check",[Cm]:"fire-app-check-compat",[km]:"fire-auth",[Dm]:"fire-auth-compat",[xm]:"fire-rtdb",[Nm]:"fire-data-connect",[Om]:"fire-rtdb-compat",[Mm]:"fire-fn",[Lm]:"fire-fn-compat",[Fm]:"fire-iid",[Um]:"fire-iid-compat",[Bm]:"fire-fcm",[qm]:"fire-fcm-compat",[jm]:"fire-perf",[zm]:"fire-perf-compat",[$m]:"fire-rc",[Km]:"fire-rc-compat",[Gm]:"fire-gcs",[Hm]:"fire-gcs-compat",[Wm]:"fire-fst",[Jm]:"fire-fst-compat",[Qm]:"fire-vertex","fire-js":"fire-js",[Ym]:"fire-js-all"};/**
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
 */const ii=new Map,ep=new Map,ko=new Map;function jc(r,e){try{r.container.addComponent(e)}catch(t){kt.debug(`Component ${e.name} failed to register with FirebaseApp ${r.name}`,t)}}function sr(r){const e=r.name;if(ko.has(e))return kt.debug(`There were multiple attempts to register component ${e}.`),!1;ko.set(e,r);for(const t of ii.values())jc(t,r);for(const t of ep.values())jc(t,r);return!0}function Os(r,e){const t=r.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),r.container.getProvider(e)}function gt(r){return r.settings!==void 0}/**
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
 */const tp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Jt=new _i("app","Firebase",tp);/**
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
 */class np{constructor(e,t,n){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Rn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Jt.create("app-deleted",{appName:this._name})}}/**
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
 */const yr=Xm;function kl(r,e={}){let t=r;typeof e!="object"&&(e={name:e});const n=Object.assign({name:Vo,automaticDataCollectionEnabled:!1},e),i=n.name;if(typeof i!="string"||!i)throw Jt.create("bad-app-name",{appName:String(i)});if(t||(t=bl()),!t)throw Jt.create("no-options");const s=ii.get(i);if(s){if(ri(t,s.options)&&ri(n,s.config))return s;throw Jt.create("duplicate-app",{appName:i})}const a=new cm(i);for(const u of ko.values())a.addComponent(u);const c=new np(t,n,a);return ii.set(i,c),c}function ra(r=Vo){const e=ii.get(r);if(!e&&r===Vo&&bl())return kl();if(!e)throw Jt.create("no-app",{appName:r});return e}function rp(){return Array.from(ii.values())}function Yt(r,e,t){var n;let i=(n=Zm[r])!==null&&n!==void 0?n:r;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const c=[`Unable to register library "${i}" with version "${e}":`];s&&c.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),kt.warn(c.join(" "));return}sr(new Rn(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const ip="firebase-heartbeat-database",sp=1,si="firebase-heartbeat-store";let Io=null;function Dl(){return Io||(Io=Em(ip,sp,{upgrade:(r,e)=>{switch(e){case 0:try{r.createObjectStore(si)}catch(t){console.warn(t)}}}}).catch(r=>{throw Jt.create("idb-open",{originalErrorMessage:r.message})})),Io}async function op(r){try{const t=(await Dl()).transaction(si),n=await t.objectStore(si).get(xl(r));return await t.done,n}catch(e){if(e instanceof Nt)kt.warn(e.message);else{const t=Jt.create("idb-get",{originalErrorMessage:e?.message});kt.warn(t.message)}}}async function zc(r,e){try{const n=(await Dl()).transaction(si,"readwrite");await n.objectStore(si).put(e,xl(r)),await n.done}catch(t){if(t instanceof Nt)kt.warn(t.message);else{const n=Jt.create("idb-set",{originalErrorMessage:t?.message});kt.warn(n.message)}}}function xl(r){return`${r.name}!${r.options.appId}`}/**
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
 */const ap=1024,cp=720*60*60*1e3;class up{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new hp(t),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=$c();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s)?void 0:(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=cp}),this._storage.overwrite(this._heartbeatsCache))}catch(n){kt.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=$c(),{heartbeatsToSend:n,unsentEntries:i}=lp(this._heartbeatsCache.heartbeats),s=gs(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return kt.warn(t),""}}}function $c(){return new Date().toISOString().substring(0,10)}function lp(r,e=ap){const t=[];let n=r.slice();for(const i of r){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),Kc(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Kc(t)>e){t.pop();break}n=n.slice(1)}return{heartbeatsToSend:t,unsentEntries:n}}class hp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Pl()?Yf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await op(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return zc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return zc(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function Kc(r){return gs(JSON.stringify({version:2,heartbeats:r})).length}/**
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
 */function dp(r){sr(new Rn("platform-logger",e=>new Am(e),"PRIVATE")),sr(new Rn("heartbeat",e=>new up(e),"PRIVATE")),Yt(Co,qc,r),Yt(Co,qc,"esm2017"),Yt("fire-js","")}dp("");var fp="firebase",mp="10.14.1";/**
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
 */Yt(fp,mp,"app");function ia(r,e){var t={};for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&e.indexOf(n)<0&&(t[n]=r[n]);if(r!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,n=Object.getOwnPropertySymbols(r);i<n.length;i++)e.indexOf(n[i])<0&&Object.prototype.propertyIsEnumerable.call(r,n[i])&&(t[n[i]]=r[n[i]]);return t}function Nl(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const pp=Nl,Ol=new _i("auth","Firebase",Nl());/**
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
 */const _s=new ta("@firebase/auth");function gp(r,...e){_s.logLevel<=te.WARN&&_s.warn(`Auth (${yr}): ${r}`,...e)}function rs(r,...e){_s.logLevel<=te.ERROR&&_s.error(`Auth (${yr}): ${r}`,...e)}/**
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
 */function vt(r,...e){throw oa(r,...e)}function lt(r,...e){return oa(r,...e)}function sa(r,e,t){const n=Object.assign(Object.assign({},pp()),{[e]:t});return new _i("auth","Firebase",n).create(e,{appName:r.name})}function Xt(r){return sa(r,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ml(r,e,t){const n=t;if(!(e instanceof n))throw n.name!==e.constructor.name&&vt(r,"argument-error"),sa(r,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function oa(r,...e){if(typeof r!="string"){const t=e[0],n=[...e.slice(1)];return n[0]&&(n[0].appName=r.name),r._errorFactory.create(t,...n)}return Ol.create(r,...e)}function H(r,e,...t){if(!r)throw oa(e,...t)}function Rt(r){const e="INTERNAL ASSERTION FAILED: "+r;throw rs(e),new Error(e)}function Dt(r,e){r||Rt(e)}/**
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
 */function Do(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.href)||""}function _p(){return Gc()==="http:"||Gc()==="https:"}function Gc(){var r;return typeof self<"u"&&((r=self.location)===null||r===void 0?void 0:r.protocol)||null}/**
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
 */function yp(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(_p()||Wf()||"connection"in navigator)?navigator.onLine:!0}function Ip(){if(typeof navigator>"u")return null;const r=navigator;return r.languages&&r.languages[0]||r.language||null}/**
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
 */class Ii{constructor(e,t){this.shortDelay=e,this.longDelay=t,Dt(t>e,"Short delay should be less than long delay!"),this.isMobile=Kf()||Qf()}get(){return yp()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function aa(r,e){Dt(r.emulator,"Emulator should always be set here");const{url:t}=r.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class Ll{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Rt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Rt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Rt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const vp={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Ep=new Ii(3e4,6e4);function ca(r,e){return r.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:r.tenantId}):e}async function Ir(r,e,t,n,i={}){return Fl(r,i,async()=>{let s={},a={};n&&(e==="GET"?a=n:s={body:JSON.stringify(n)});const c=yi(Object.assign({key:r.config.apiKey},a)).slice(1),u=await r._getAdditionalHeaders();u["Content-Type"]="application/json",r.languageCode&&(u["X-Firebase-Locale"]=r.languageCode);const d=Object.assign({method:e,headers:u},s);return Hf()||(d.referrerPolicy="no-referrer"),Ll.fetch()(Ul(r,r.config.apiHost,t,c),d)})}async function Fl(r,e,t){r._canInitEmulator=!1;const n=Object.assign(Object.assign({},vp),e);try{const i=new wp(r),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Ji(r,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[u,d]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ji(r,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw Ji(r,"email-already-in-use",a);if(u==="USER_DISABLED")throw Ji(r,"user-disabled",a);const f=n[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw sa(r,f,d);vt(r,f)}}catch(i){if(i instanceof Nt)throw i;vt(r,"network-request-failed",{message:String(i)})}}async function Tp(r,e,t,n,i={}){const s=await Ir(r,e,t,n,i);return"mfaPendingCredential"in s&&vt(r,"multi-factor-auth-required",{_serverResponse:s}),s}function Ul(r,e,t,n){const i=`${e}${t}?${n}`;return r.config.emulator?aa(r.config,i):`${r.config.apiScheme}://${i}`}class wp{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,n)=>{this.timer=setTimeout(()=>n(lt(this.auth,"network-request-failed")),Ep.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Ji(r,e,t){const n={appName:r.name};t.email&&(n.email=t.email),t.phoneNumber&&(n.phoneNumber=t.phoneNumber);const i=lt(r,e,n);return i.customData._tokenResponse=t,i}/**
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
 */async function Ap(r,e){return Ir(r,"POST","/v1/accounts:delete",e)}async function Bl(r,e){return Ir(r,"POST","/v1/accounts:lookup",e)}/**
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
 */function Yr(r){if(r)try{const e=new Date(Number(r));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function bp(r,e=!1){const t=tt(r),n=await t.getIdToken(e),i=ua(n);H(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s?.sign_in_provider;return{claims:i,token:n,authTime:Yr(vo(i.auth_time)),issuedAtTime:Yr(vo(i.iat)),expirationTime:Yr(vo(i.exp)),signInProvider:a||null,signInSecondFactor:s?.sign_in_second_factor||null}}function vo(r){return Number(r)*1e3}function ua(r){const[e,t,n]=r.split(".");if(e===void 0||t===void 0||n===void 0)return rs("JWT malformed, contained fewer than 3 sections"),null;try{const i=wl(t);return i?JSON.parse(i):(rs("Failed to decode base64 JWT payload"),null)}catch(i){return rs("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Hc(r){const e=ua(r);return H(e,"internal-error"),H(typeof e.exp<"u","internal-error"),H(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function oi(r,e,t=!1){if(t)return e;try{return await e}catch(n){throw n instanceof Nt&&Rp(n)&&r.auth.currentUser===r&&await r.auth.signOut(),n}}function Rp({code:r}){return r==="auth/user-disabled"||r==="auth/user-token-expired"}/**
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
 */class Sp{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class xo{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Yr(this.lastLoginAt),this.creationTime=Yr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function ys(r){var e;const t=r.auth,n=await r.getIdToken(),i=await oi(r,Bl(t,{idToken:n}));H(i?.users.length,t,"internal-error");const s=i.users[0];r._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?ql(s.providerUserInfo):[],c=Cp(r.providerData,a),u=r.isAnonymous,d=!(r.email&&s.passwordHash)&&!c?.length,f=u?d:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new xo(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(r,p)}async function Pp(r){const e=tt(r);await ys(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Cp(r,e){return[...r.filter(n=>!e.some(i=>i.providerId===n.providerId)),...e]}function ql(r){return r.map(e=>{var{providerId:t}=e,n=ia(e,["providerId"]);return{providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}})}/**
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
 */async function Vp(r,e){const t=await Fl(r,{},async()=>{const n=yi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=r.config,a=Ul(r,i,"/v1/token",`key=${s}`),c=await r._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Ll.fetch()(a,{method:"POST",headers:c,body:n})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function kp(r,e){return Ir(r,"POST","/v2/accounts:revokeToken",ca(r,e))}/**
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
 */class tr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){H(e.idToken,"internal-error"),H(typeof e.idToken<"u","internal-error"),H(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){H(e.length!==0,"internal-error");const t=Hc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(H(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:n,refreshToken:i,expiresIn:s}=await Vp(e,t);this.updateTokensAndExpiration(n,i,Number(s))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(e,t){const{refreshToken:n,accessToken:i,expirationTime:s}=t,a=new tr;return n&&(H(typeof n=="string","internal-error",{appName:e}),a.refreshToken=n),i&&(H(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(H(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new tr,this.toJSON())}_performRefresh(){return Rt("not implemented")}}/**
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
 */function qt(r,e){H(typeof r=="string"||typeof r>"u","internal-error",{appName:e})}class St{constructor(e){var{uid:t,auth:n,stsTokenManager:i}=e,s=ia(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Sp(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new xo(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await oi(this,this.stsTokenManager.getToken(this.auth,e));return H(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return bp(this,e)}reload(){return Pp(this)}_assign(e){this!==e&&(H(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new St(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){H(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await ys(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(gt(this.auth.app))return Promise.reject(Xt(this.auth));const e=await this.getIdToken();return await oi(this,Ap(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var n,i,s,a,c,u,d,f;const p=(n=t.displayName)!==null&&n!==void 0?n:void 0,T=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,D=(c=t.tenantId)!==null&&c!==void 0?c:void 0,x=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,z=(d=t.createdAt)!==null&&d!==void 0?d:void 0,K=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:j,emailVerified:X,isAnonymous:se,providerData:Y,stsTokenManager:I}=t;H(j&&I,e,"internal-error");const g=tr.fromJSON(this.name,I);H(typeof j=="string",e,"internal-error"),qt(p,e.name),qt(T,e.name),H(typeof X=="boolean",e,"internal-error"),H(typeof se=="boolean",e,"internal-error"),qt(S,e.name),qt(k,e.name),qt(D,e.name),qt(x,e.name),qt(z,e.name),qt(K,e.name);const y=new St({uid:j,auth:e,email:T,emailVerified:X,displayName:p,isAnonymous:se,photoURL:k,phoneNumber:S,tenantId:D,stsTokenManager:g,createdAt:z,lastLoginAt:K});return Y&&Array.isArray(Y)&&(y.providerData=Y.map(v=>Object.assign({},v))),x&&(y._redirectEventId=x),y}static async _fromIdTokenResponse(e,t,n=!1){const i=new tr;i.updateFromServerResponse(t);const s=new St({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:n});return await ys(s),s}static async _fromGetAccountInfoResponse(e,t,n){const i=t.users[0];H(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?ql(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!s?.length,c=new tr;c.updateFromIdToken(n);const u=new St({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new xo(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(u,d),u}}/**
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
 */const Wc=new Map;function Pt(r){Dt(r instanceof Function,"Expected a class definition");let e=Wc.get(r);return e?(Dt(e instanceof r,"Instance stored in cache mismatched with class"),e):(e=new r,Wc.set(r,e),e)}/**
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
 */class jl{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}jl.type="NONE";const Qc=jl;/**
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
 */function is(r,e,t){return`firebase:${r}:${e}:${t}`}class nr{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;const{config:i,name:s}=this.auth;this.fullUserKey=is(this.userKey,i.apiKey,s),this.fullPersistenceKey=is("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?St._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,n="authUser"){if(!t.length)return new nr(Pt(Qc),e,n);const i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let s=i[0]||Pt(Qc);const a=is(n,e.config.apiKey,e.name);let c=null;for(const d of t)try{const f=await d._get(a);if(f){const p=St._fromJSON(e,f);d!==s&&(c=p),s=d;break}}catch{}const u=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new nr(s,e,n):(s=u[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch{}})),new nr(s,e,n))}}/**
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
 */function Jc(r){const e=r.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Gl(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(zl(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Wl(e))return"Blackberry";if(Ql(e))return"Webos";if($l(e))return"Safari";if((e.includes("chrome/")||Kl(e))&&!e.includes("edge/"))return"Chrome";if(Hl(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,n=r.match(t);if(n?.length===2)return n[1]}return"Other"}function zl(r=Pe()){return/firefox\//i.test(r)}function $l(r=Pe()){const e=r.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Kl(r=Pe()){return/crios\//i.test(r)}function Gl(r=Pe()){return/iemobile/i.test(r)}function Hl(r=Pe()){return/android/i.test(r)}function Wl(r=Pe()){return/blackberry/i.test(r)}function Ql(r=Pe()){return/webos/i.test(r)}function la(r=Pe()){return/iphone|ipad|ipod/i.test(r)||/macintosh/i.test(r)&&/mobile/i.test(r)}function Dp(r=Pe()){var e;return la(r)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function xp(){return Jf()&&document.documentMode===10}function Jl(r=Pe()){return la(r)||Hl(r)||Ql(r)||Wl(r)||/windows phone/i.test(r)||Gl(r)}/**
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
 */function Yl(r,e=[]){let t;switch(r){case"Browser":t=Jc(Pe());break;case"Worker":t=`${Jc(Pe())}-${r}`;break;default:t=r}const n=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${yr}/${n}`}/**
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
 */class Np{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const n=s=>new Promise((a,c)=>{try{const u=e(s);a(u)}catch(u){c(u)}});n.onAbort=t,this.queue.push(n);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(n){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:n?.message})}}}/**
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
 */async function Op(r,e={}){return Ir(r,"GET","/v2/passwordPolicy",ca(r,e))}/**
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
 */const Mp=6;class Lp{constructor(e){var t,n,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Mp,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(n=e.allowedNonAlphanumericCharacters)===null||n===void 0?void 0:n.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,n,i,s,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(n=u.meetsMaxPasswordLength)!==null&&n!==void 0?n:!0),u.isValid&&(u.isValid=(i=u.containsLowercaseLetter)!==null&&i!==void 0?i:!0),u.isValid&&(u.isValid=(s=u.containsUppercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const n=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let i=0;i<e.length;i++)n=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,n>="a"&&n<="z",n>="A"&&n<="Z",n>="0"&&n<="9",this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=n)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
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
 */class Fp{constructor(e,t,n,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Yc(this),this.idTokenSubscription=new Yc(this),this.beforeStateQueue=new Np(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ol,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Pt(t)),this._initializationPromise=this.queue(async()=>{var n,i;if(!this._deleted&&(this.persistenceManager=await nr.create(this,e),!this._deleted)){if(!((n=this._popupRedirectResolver)===null||n===void 0)&&n._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((i=this.currentUser)===null||i===void 0?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Bl(this,{idToken:e}),n=await St._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(gt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let i=n,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i?._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&u?.user&&(i=u.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return H(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ys(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Ip()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(gt(this.app))return Promise.reject(Xt(this));const t=e?tt(e):null;return t&&H(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&H(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return gt(this.app)?Promise.reject(Xt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return gt(this.app)?Promise.reject(Xt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Pt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Op(this),t=new Lp(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new _i("auth","Firebase",e())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),n={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(n.tenantId=this.tenantId),await kp(this,n)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Pt(e)||this._popupRedirectResolver;H(t,this,"argument-error"),this.redirectPersistenceManager=await nr.create(this,[Pt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,n;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const n=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==n&&(this.lastNotifiedUid=n,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(H(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,n,i);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return H(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Yl(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&gp(`Error while retrieving App Check token: ${t.error}`),t?.token}}function vr(r){return tt(r)}class Yc{constructor(e){this.auth=e,this.observer=null,this.addObserver=nm(t=>this.observer=t)}get next(){return H(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let ha={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Up(r){ha=r}function Bp(r){return ha.loadJS(r)}function qp(){return ha.gapiScript}function jp(r){return`__${r}${Math.floor(Math.random()*1e6)}`}/**
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
 */function zp(r,e){const t=Os(r,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(ri(s,e??{}))return i;vt(i,"already-initialized")}return t.initialize({options:e})}function $p(r,e){const t=e?.persistence||[],n=(Array.isArray(t)?t:[t]).map(Pt);e?.errorMap&&r._updateErrorMap(e.errorMap),r._initializeWithPersistence(n,e?.popupRedirectResolver)}function Kp(r,e,t){const n=vr(r);H(n._canInitEmulator,n,"emulator-config-failed"),H(/^https?:\/\//.test(e),n,"invalid-emulator-scheme");const i=!1,s=Xl(e),{host:a,port:c}=Gp(e),u=c===null?"":`:${c}`;n.config.emulator={url:`${s}//${a}${u}/`},n.settings.appVerificationDisabledForTesting=!0,n.emulatorConfig=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})}),Hp()}function Xl(r){const e=r.indexOf(":");return e<0?"":r.substr(0,e+1)}function Gp(r){const e=Xl(r),t=/(\/\/)?([^?#/]+)/.exec(r.substr(e.length));if(!t)return{host:"",port:null};const n=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(n);if(i){const s=i[1];return{host:s,port:Xc(n.substr(s.length+1))}}else{const[s,a]=n.split(":");return{host:s,port:Xc(a)}}}function Xc(r){if(!r)return null;const e=Number(r);return isNaN(e)?null:e}function Hp(){function r(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",r):r())}/**
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
 */class Zl{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Rt("not implemented")}_getIdTokenResponse(e){return Rt("not implemented")}_linkToIdToken(e,t){return Rt("not implemented")}_getReauthenticationResolver(e){return Rt("not implemented")}}/**
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
 */async function rr(r,e){return Tp(r,"POST","/v1/accounts:signInWithIdp",ca(r,e))}/**
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
 */const Wp="http://localhost";class Sn extends Zl{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Sn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):vt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:n,signInMethod:i}=t,s=ia(t,["providerId","signInMethod"]);if(!n||!i)return null;const a=new Sn(n,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return rr(e,t)}_linkToIdToken(e,t){const n=this.buildRequest();return n.idToken=t,rr(e,n)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,rr(e,t)}buildRequest(){const e={requestUri:Wp,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=yi(t)}return e}}/**
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
 */class Ms{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class vi extends Ms{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class $t extends vi{constructor(){super("facebook.com")}static credential(e){return Sn._fromParams({providerId:$t.PROVIDER_ID,signInMethod:$t.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return $t.credentialFromTaggedObject(e)}static credentialFromError(e){return $t.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return $t.credential(e.oauthAccessToken)}catch{return null}}}$t.FACEBOOK_SIGN_IN_METHOD="facebook.com";$t.PROVIDER_ID="facebook.com";/**
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
 */class bt extends vi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Sn._fromParams({providerId:bt.PROVIDER_ID,signInMethod:bt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return bt.credentialFromTaggedObject(e)}static credentialFromError(e){return bt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:n}=e;if(!t&&!n)return null;try{return bt.credential(t,n)}catch{return null}}}bt.GOOGLE_SIGN_IN_METHOD="google.com";bt.PROVIDER_ID="google.com";/**
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
 */class Kt extends vi{constructor(){super("github.com")}static credential(e){return Sn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Kt.credential(e.oauthAccessToken)}catch{return null}}}Kt.GITHUB_SIGN_IN_METHOD="github.com";Kt.PROVIDER_ID="github.com";/**
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
 */class Gt extends vi{constructor(){super("twitter.com")}static credential(e,t){return Sn._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:n}=e;if(!t||!n)return null;try{return Gt.credential(t,n)}catch{return null}}}Gt.TWITTER_SIGN_IN_METHOD="twitter.com";Gt.PROVIDER_ID="twitter.com";/**
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
 */class or{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,n,i=!1){const s=await St._fromIdTokenResponse(e,n,i),a=Zc(n);return new or({user:s,providerId:a,_tokenResponse:n,operationType:t})}static async _forOperation(e,t,n){await e._updateTokensIfNecessary(n,!0);const i=Zc(n);return new or({user:e,providerId:i,_tokenResponse:n,operationType:t})}}function Zc(r){return r.providerId?r.providerId:"phoneNumber"in r?"phone":null}/**
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
 */class Is extends Nt{constructor(e,t,n,i){var s;super(t.code,t.message),this.operationType=n,this.user=i,Object.setPrototypeOf(this,Is.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:n}}static _fromErrorAndOperation(e,t,n,i){return new Is(e,t,n,i)}}function eh(r,e,t,n){return(e==="reauthenticate"?t._getReauthenticationResolver(r):t._getIdTokenResponse(r)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Is._fromErrorAndOperation(r,s,e,n):s})}async function Qp(r,e,t=!1){const n=await oi(r,e._linkToIdToken(r.auth,await r.getIdToken()),t);return or._forOperation(r,"link",n)}/**
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
 */async function Jp(r,e,t=!1){const{auth:n}=r;if(gt(n.app))return Promise.reject(Xt(n));const i="reauthenticate";try{const s=await oi(r,eh(n,i,e,r),t);H(s.idToken,n,"internal-error");const a=ua(s.idToken);H(a,n,"internal-error");const{sub:c}=a;return H(r.uid===c,n,"user-mismatch"),or._forOperation(r,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&vt(n,"user-mismatch"),s}}/**
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
 */async function Yp(r,e,t=!1){if(gt(r.app))return Promise.reject(Xt(r));const n="signIn",i=await eh(r,n,e),s=await or._fromIdTokenResponse(r,n,i);return t||await r._updateCurrentUser(s.user),s}function Xp(r,e,t,n){return tt(r).onIdTokenChanged(e,t,n)}function Zp(r,e,t){return tt(r).beforeAuthStateChanged(e,t)}function eg(r,e,t,n){return tt(r).onAuthStateChanged(e,t,n)}function tg(r){return tt(r).signOut()}const vs="__sak";/**
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
 */class th{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(vs,"1"),this.storage.removeItem(vs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const ng=1e3,rg=10;class nh extends th{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Jl(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const n=this.storage.getItem(t),i=this.localCache[t];n!==i&&e(t,i,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const n=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(n);!t&&this.localCache[n]===a||this.notifyListeners(n,a)},s=this.storage.getItem(n);xp()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,rg):i()}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:n}),!0)})},ng)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}nh.type="LOCAL";const ig=nh;/**
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
 */class rh extends th{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}rh.type="SESSION";const ih=rh;/**
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
 */function sg(r){return Promise.all(r.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Ls{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const n=new Ls(e);return this.receivers.push(n),n}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:n,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!a?.size)return;t.ports[0].postMessage({status:"ack",eventId:n,eventType:i});const c=Array.from(a).map(async d=>d(t.origin,s)),u=await sg(c);t.ports[0].postMessage({status:"done",eventId:n,eventType:i,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ls.receivers=[];/**
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
 */function da(r="",e=10){let t="";for(let n=0;n<e;n++)t+=Math.floor(Math.random()*10);return r+t}/**
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
 */class og{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,u)=>{const d=da("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},n);a={messageChannel:i,onMessage(p){const T=p;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(T.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
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
 */function It(){return window}function ag(r){It().location.href=r}/**
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
 */function sh(){return typeof It().WorkerGlobalScope<"u"&&typeof It().importScripts=="function"}async function cg(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ug(){var r;return((r=navigator?.serviceWorker)===null||r===void 0?void 0:r.controller)||null}function lg(){return sh()?self:null}/**
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
 */const oh="firebaseLocalStorageDb",hg=1,Es="firebaseLocalStorage",ah="fbase_key";class Ei{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Fs(r,e){return r.transaction([Es],e?"readwrite":"readonly").objectStore(Es)}function dg(){const r=indexedDB.deleteDatabase(oh);return new Ei(r).toPromise()}function No(){const r=indexedDB.open(oh,hg);return new Promise((e,t)=>{r.addEventListener("error",()=>{t(r.error)}),r.addEventListener("upgradeneeded",()=>{const n=r.result;try{n.createObjectStore(Es,{keyPath:ah})}catch(i){t(i)}}),r.addEventListener("success",async()=>{const n=r.result;n.objectStoreNames.contains(Es)?e(n):(n.close(),await dg(),e(await No()))})})}async function eu(r,e,t){const n=Fs(r,!0).put({[ah]:e,value:t});return new Ei(n).toPromise()}async function fg(r,e){const t=Fs(r,!1).get(e),n=await new Ei(t).toPromise();return n===void 0?null:n.value}function tu(r,e){const t=Fs(r,!0).delete(e);return new Ei(t).toPromise()}const mg=800,pg=3;class ch{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await No(),this.db)}async _withRetries(e){let t=0;for(;;)try{const n=await this._openDb();return await e(n)}catch(n){if(t++>pg)throw n;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return sh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ls._getInstance(lg()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await cg(),!this.activeServiceWorker)return;this.sender=new og(this.activeServiceWorker);const n=await this.sender._send("ping",{},800);n&&!((e=n[0])===null||e===void 0)&&e.fulfilled&&!((t=n[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ug()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await No();return await eu(e,vs,"1"),await tu(e,vs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>eu(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(n=>fg(n,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>tu(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Fs(i,!1).getAll();return new Ei(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],n=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)n.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!n.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const n=this.listeners[e];if(n)for(const i of Array.from(n))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),mg)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ch.type="LOCAL";const gg=ch;new Ii(3e4,6e4);/**
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
 */function fa(r,e){return e?Pt(e):(H(r._popupRedirectResolver,r,"argument-error"),r._popupRedirectResolver)}/**
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
 */class ma extends Zl{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return rr(e,this._buildIdpRequest())}_linkToIdToken(e,t){return rr(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return rr(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function _g(r){return Yp(r.auth,new ma(r),r.bypassAuthState)}function yg(r){const{auth:e,user:t}=r;return H(t,e,"internal-error"),Jp(t,new ma(r),r.bypassAuthState)}async function Ig(r){const{auth:e,user:t}=r;return H(t,e,"internal-error"),Qp(t,new ma(r),r.bypassAuthState)}/**
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
 */class uh{constructor(e,t,n,i,s=!1){this.auth=e,this.resolver=n,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(n){this.reject(n)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:n,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:n,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return _g;case"linkViaPopup":case"linkViaRedirect":return Ig;case"reauthViaPopup":case"reauthViaRedirect":return yg;default:vt(this.auth,"internal-error")}}resolve(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Dt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const vg=new Ii(2e3,1e4);async function Eg(r,e,t){if(gt(r.app))return Promise.reject(lt(r,"operation-not-supported-in-this-environment"));const n=vr(r);Ml(r,e,Ms);const i=fa(n,t);return new wn(n,"signInViaPopup",e,i).executeNotNull()}class wn extends uh{constructor(e,t,n,i,s){super(e,t,i,s),this.provider=n,this.authWindow=null,this.pollId=null,wn.currentPopupAction&&wn.currentPopupAction.cancel(),wn.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return H(e,this.auth,"internal-error"),e}async onExecution(){Dt(this.filter.length===1,"Popup operations only handle one event");const e=da();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(lt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(lt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,wn.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,n;if(!((n=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||n===void 0)&&n.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(lt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,vg.get())};e()}}wn.currentPopupAction=null;/**
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
 */const Tg="pendingRedirect",ss=new Map;class wg extends uh{constructor(e,t,n=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,n),this.eventId=null}async execute(){let e=ss.get(this.auth._key());if(!e){try{const n=await Ag(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(n)}catch(t){e=()=>Promise.reject(t)}ss.set(this.auth._key(),e)}return this.bypassAuthState||ss.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Ag(r,e){const t=hh(e),n=lh(r);if(!await n._isAvailable())return!1;const i=await n._get(t)==="true";return await n._remove(t),i}async function bg(r,e){return lh(r)._set(hh(e),"true")}function Rg(r,e){ss.set(r._key(),e)}function lh(r){return Pt(r._redirectPersistence)}function hh(r){return is(Tg,r.config.apiKey,r.name)}/**
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
 */function nu(r,e,t){return Sg(r,e,t)}async function Sg(r,e,t){if(gt(r.app))return Promise.reject(Xt(r));const n=vr(r);Ml(r,e,Ms),await n._initializationPromise;const i=fa(n,t);return await bg(i,n),i._openRedirect(n,e,"signInViaRedirect")}async function Pg(r,e){return await vr(r)._initializationPromise,dh(r,e,!1)}async function dh(r,e,t=!1){if(gt(r.app))return Promise.reject(Xt(r));const n=vr(r),i=fa(n,e),a=await new wg(n,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await n._persistUserIfCurrent(a.user),await n._setRedirectUser(null,e)),a}/**
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
 */const Cg=600*1e3;class Vg{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!kg(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var n;if(e.error&&!fh(e)){const i=((n=e.error.code)===null||n===void 0?void 0:n.split("auth/")[1])||"internal-error";t.onError(lt(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Cg&&this.cachedEventUids.clear(),this.cachedEventUids.has(ru(e))}saveEventToCache(e){this.cachedEventUids.add(ru(e)),this.lastProcessedEventTime=Date.now()}}function ru(r){return[r.type,r.eventId,r.sessionId,r.tenantId].filter(e=>e).join("-")}function fh({type:r,error:e}){return r==="unknown"&&e?.code==="auth/no-auth-event"}function kg(r){switch(r.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return fh(r);default:return!1}}/**
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
 */async function Dg(r,e={}){return Ir(r,"GET","/v1/projects",e)}/**
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
 */const xg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ng=/^https?/;async function Og(r){if(r.config.emulator)return;const{authorizedDomains:e}=await Dg(r);for(const t of e)try{if(Mg(t))return}catch{}vt(r,"unauthorized-domain")}function Mg(r){const e=Do(),{protocol:t,hostname:n}=new URL(e);if(r.startsWith("chrome-extension://")){const a=new URL(r);return a.hostname===""&&n===""?t==="chrome-extension:"&&r.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===n}if(!Ng.test(t))return!1;if(xg.test(r))return n===r;const i=r.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(n)}/**
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
 */const Lg=new Ii(3e4,6e4);function iu(){const r=It().___jsl;if(r?.H){for(const e of Object.keys(r.H))if(r.H[e].r=r.H[e].r||[],r.H[e].L=r.H[e].L||[],r.H[e].r=[...r.H[e].L],r.CP)for(let t=0;t<r.CP.length;t++)r.CP[t]=null}}function Fg(r){return new Promise((e,t)=>{var n,i,s;function a(){iu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{iu(),t(lt(r,"network-request-failed"))},timeout:Lg.get()})}if(!((i=(n=It().gapi)===null||n===void 0?void 0:n.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=It().gapi)===null||s===void 0)&&s.load)a();else{const c=jp("iframefcb");return It()[c]=()=>{gapi.load?a():t(lt(r,"network-request-failed"))},Bp(`${qp()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw os=null,e})}let os=null;function Ug(r){return os=os||Fg(r),os}/**
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
 */const Bg=new Ii(5e3,15e3),qg="__/auth/iframe",jg="emulator/auth/iframe",zg={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},$g=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Kg(r){const e=r.config;H(e.authDomain,r,"auth-domain-config-required");const t=e.emulator?aa(e,jg):`https://${r.config.authDomain}/${qg}`,n={apiKey:e.apiKey,appName:r.name,v:yr},i=$g.get(r.config.apiHost);i&&(n.eid=i);const s=r._getFrameworks();return s.length&&(n.fw=s.join(",")),`${t}?${yi(n).slice(1)}`}async function Gg(r){const e=await Ug(r),t=It().gapi;return H(t,r,"internal-error"),e.open({where:document.body,url:Kg(r),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:zg,dontclear:!0},n=>new Promise(async(i,s)=>{await n.restyle({setHideOnLeave:!1});const a=lt(r,"network-request-failed"),c=It().setTimeout(()=>{s(a)},Bg.get());function u(){It().clearTimeout(c),i(n)}n.ping(u).then(u,()=>{s(a)})}))}/**
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
 */const Hg={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Wg=500,Qg=600,Jg="_blank",Yg="http://localhost";class su{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Xg(r,e,t,n=Wg,i=Qg){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-n)/2,0).toString();let c="";const u=Object.assign(Object.assign({},Hg),{width:n.toString(),height:i.toString(),top:s,left:a}),d=Pe().toLowerCase();t&&(c=Kl(d)?Jg:t),zl(d)&&(e=e||Yg,u.scrollbars="yes");const f=Object.entries(u).reduce((T,[S,k])=>`${T}${S}=${k},`,"");if(Dp(d)&&c!=="_self")return Zg(e||"",c),new su(null);const p=window.open(e||"",c,f);H(p,r,"popup-blocked");try{p.focus()}catch{}return new su(p)}function Zg(r,e){const t=document.createElement("a");t.href=r,t.target=e;const n=document.createEvent("MouseEvent");n.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(n)}/**
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
 */const e_="__/auth/handler",t_="emulator/auth/handler",n_=encodeURIComponent("fac");async function ou(r,e,t,n,i,s){H(r.config.authDomain,r,"auth-domain-config-required"),H(r.config.apiKey,r,"invalid-api-key");const a={apiKey:r.config.apiKey,appName:r.name,authType:t,redirectUrl:n,v:yr,eventId:i};if(e instanceof Ms){e.setDefaultLanguage(r.languageCode),a.providerId=e.providerId||"",tm(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))a[f]=p}if(e instanceof vi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(a.scopes=f.join(","))}r.tenantId&&(a.tid=r.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await r._getAppCheckToken(),d=u?`#${n_}=${encodeURIComponent(u)}`:"";return`${r_(r)}?${yi(c).slice(1)}${d}`}function r_({config:r}){return r.emulator?aa(r,t_):`https://${r.authDomain}/${e_}`}/**
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
 */const Eo="webStorageSupport";class i_{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ih,this._completeRedirectFn=dh,this._overrideRedirectResult=Rg}async _openPopup(e,t,n,i){var s;Dt((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await ou(e,t,n,Do(),i);return Xg(e,a,da())}async _openRedirect(e,t,n,i){await this._originValidation(e);const s=await ou(e,t,n,Do(),i);return ag(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Dt(s,"If manager is not set, promise should be"),s)}const n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){const t=await Gg(e),n=new Vg(e);return t.register("authEvent",i=>(H(i?.authEvent,e,"invalid-auth-event"),{status:n.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Eo,{type:Eo},i=>{var s;const a=(s=i?.[0])===null||s===void 0?void 0:s[Eo];a!==void 0&&t(!!a),vt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Og(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Jl()||$l()||la()}}const s_=i_;var au="@firebase/auth",cu="1.7.9";/**
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
 */class o_{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(n=>{e(n?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){H(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function a_(r){switch(r){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function c_(r){sr(new Rn("auth",(e,{options:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=n.options;H(a&&!a.includes(":"),"invalid-api-key",{appName:n.name});const u={apiKey:a,authDomain:c,clientPlatform:r,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Yl(r)},d=new Fp(n,i,s,u);return $p(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,n)=>{e.getProvider("auth-internal").initialize()})),sr(new Rn("auth-internal",e=>{const t=vr(e.getProvider("auth").getImmediate());return(n=>new o_(n))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Yt(au,cu,a_(r)),Yt(au,cu,"esm2017")}/**
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
 */const u_=300,l_=Rl("authIdTokenMaxAge")||u_;let uu=null;const h_=r=>async e=>{const t=e&&await e.getIdTokenResult(),n=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(n&&n>l_)return;const i=t?.token;uu!==i&&(uu=i,await fetch(r,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function d_(r=ra()){const e=Os(r,"auth");if(e.isInitialized())return e.getImmediate();const t=zp(r,{popupRedirectResolver:s_,persistence:[gg,ig,ih]}),n=Rl("authTokenSyncURL");if(n&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(n,location.origin);if(location.origin===s.origin){const a=h_(s.toString());Zp(t,a,()=>a(t.currentUser)),Xp(t,c=>a(c))}}const i=Al("auth");return i&&Kp(t,`http://${i}`),t}function f_(){var r,e;return(e=(r=document.getElementsByTagName("head"))===null||r===void 0?void 0:r[0])!==null&&e!==void 0?e:document}Up({loadJS(r){return new Promise((e,t)=>{const n=document.createElement("script");n.setAttribute("src",r),n.onload=e,n.onerror=i=>{const s=lt("internal-error");s.customData=i,t(s)},n.type="text/javascript",n.charset="UTF-8",f_().appendChild(n)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});c_("Browser");var lu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var An,mh;(function(){var r;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function y(){}y.prototype=g.prototype,I.D=g.prototype,I.prototype=new y,I.prototype.constructor=I,I.C=function(v,E,w){for(var _=Array(arguments.length-2),Je=2;Je<arguments.length;Je++)_[Je-2]=arguments[Je];return g.prototype[E].apply(v,_)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,g,y){y||(y=0);var v=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)v[E]=g.charCodeAt(y++)|g.charCodeAt(y++)<<8|g.charCodeAt(y++)<<16|g.charCodeAt(y++)<<24;else for(E=0;16>E;++E)v[E]=g[y++]|g[y++]<<8|g[y++]<<16|g[y++]<<24;g=I.g[0],y=I.g[1],E=I.g[2];var w=I.g[3],_=g+(w^y&(E^w))+v[0]+3614090360&4294967295;g=y+(_<<7&4294967295|_>>>25),_=w+(E^g&(y^E))+v[1]+3905402710&4294967295,w=g+(_<<12&4294967295|_>>>20),_=E+(y^w&(g^y))+v[2]+606105819&4294967295,E=w+(_<<17&4294967295|_>>>15),_=y+(g^E&(w^g))+v[3]+3250441966&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(w^y&(E^w))+v[4]+4118548399&4294967295,g=y+(_<<7&4294967295|_>>>25),_=w+(E^g&(y^E))+v[5]+1200080426&4294967295,w=g+(_<<12&4294967295|_>>>20),_=E+(y^w&(g^y))+v[6]+2821735955&4294967295,E=w+(_<<17&4294967295|_>>>15),_=y+(g^E&(w^g))+v[7]+4249261313&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(w^y&(E^w))+v[8]+1770035416&4294967295,g=y+(_<<7&4294967295|_>>>25),_=w+(E^g&(y^E))+v[9]+2336552879&4294967295,w=g+(_<<12&4294967295|_>>>20),_=E+(y^w&(g^y))+v[10]+4294925233&4294967295,E=w+(_<<17&4294967295|_>>>15),_=y+(g^E&(w^g))+v[11]+2304563134&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(w^y&(E^w))+v[12]+1804603682&4294967295,g=y+(_<<7&4294967295|_>>>25),_=w+(E^g&(y^E))+v[13]+4254626195&4294967295,w=g+(_<<12&4294967295|_>>>20),_=E+(y^w&(g^y))+v[14]+2792965006&4294967295,E=w+(_<<17&4294967295|_>>>15),_=y+(g^E&(w^g))+v[15]+1236535329&4294967295,y=E+(_<<22&4294967295|_>>>10),_=g+(E^w&(y^E))+v[1]+4129170786&4294967295,g=y+(_<<5&4294967295|_>>>27),_=w+(y^E&(g^y))+v[6]+3225465664&4294967295,w=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(w^g))+v[11]+643717713&4294967295,E=w+(_<<14&4294967295|_>>>18),_=y+(w^g&(E^w))+v[0]+3921069994&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^w&(y^E))+v[5]+3593408605&4294967295,g=y+(_<<5&4294967295|_>>>27),_=w+(y^E&(g^y))+v[10]+38016083&4294967295,w=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(w^g))+v[15]+3634488961&4294967295,E=w+(_<<14&4294967295|_>>>18),_=y+(w^g&(E^w))+v[4]+3889429448&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^w&(y^E))+v[9]+568446438&4294967295,g=y+(_<<5&4294967295|_>>>27),_=w+(y^E&(g^y))+v[14]+3275163606&4294967295,w=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(w^g))+v[3]+4107603335&4294967295,E=w+(_<<14&4294967295|_>>>18),_=y+(w^g&(E^w))+v[8]+1163531501&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(E^w&(y^E))+v[13]+2850285829&4294967295,g=y+(_<<5&4294967295|_>>>27),_=w+(y^E&(g^y))+v[2]+4243563512&4294967295,w=g+(_<<9&4294967295|_>>>23),_=E+(g^y&(w^g))+v[7]+1735328473&4294967295,E=w+(_<<14&4294967295|_>>>18),_=y+(w^g&(E^w))+v[12]+2368359562&4294967295,y=E+(_<<20&4294967295|_>>>12),_=g+(y^E^w)+v[5]+4294588738&4294967295,g=y+(_<<4&4294967295|_>>>28),_=w+(g^y^E)+v[8]+2272392833&4294967295,w=g+(_<<11&4294967295|_>>>21),_=E+(w^g^y)+v[11]+1839030562&4294967295,E=w+(_<<16&4294967295|_>>>16),_=y+(E^w^g)+v[14]+4259657740&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^w)+v[1]+2763975236&4294967295,g=y+(_<<4&4294967295|_>>>28),_=w+(g^y^E)+v[4]+1272893353&4294967295,w=g+(_<<11&4294967295|_>>>21),_=E+(w^g^y)+v[7]+4139469664&4294967295,E=w+(_<<16&4294967295|_>>>16),_=y+(E^w^g)+v[10]+3200236656&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^w)+v[13]+681279174&4294967295,g=y+(_<<4&4294967295|_>>>28),_=w+(g^y^E)+v[0]+3936430074&4294967295,w=g+(_<<11&4294967295|_>>>21),_=E+(w^g^y)+v[3]+3572445317&4294967295,E=w+(_<<16&4294967295|_>>>16),_=y+(E^w^g)+v[6]+76029189&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(y^E^w)+v[9]+3654602809&4294967295,g=y+(_<<4&4294967295|_>>>28),_=w+(g^y^E)+v[12]+3873151461&4294967295,w=g+(_<<11&4294967295|_>>>21),_=E+(w^g^y)+v[15]+530742520&4294967295,E=w+(_<<16&4294967295|_>>>16),_=y+(E^w^g)+v[2]+3299628645&4294967295,y=E+(_<<23&4294967295|_>>>9),_=g+(E^(y|~w))+v[0]+4096336452&4294967295,g=y+(_<<6&4294967295|_>>>26),_=w+(y^(g|~E))+v[7]+1126891415&4294967295,w=g+(_<<10&4294967295|_>>>22),_=E+(g^(w|~y))+v[14]+2878612391&4294967295,E=w+(_<<15&4294967295|_>>>17),_=y+(w^(E|~g))+v[5]+4237533241&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~w))+v[12]+1700485571&4294967295,g=y+(_<<6&4294967295|_>>>26),_=w+(y^(g|~E))+v[3]+2399980690&4294967295,w=g+(_<<10&4294967295|_>>>22),_=E+(g^(w|~y))+v[10]+4293915773&4294967295,E=w+(_<<15&4294967295|_>>>17),_=y+(w^(E|~g))+v[1]+2240044497&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~w))+v[8]+1873313359&4294967295,g=y+(_<<6&4294967295|_>>>26),_=w+(y^(g|~E))+v[15]+4264355552&4294967295,w=g+(_<<10&4294967295|_>>>22),_=E+(g^(w|~y))+v[6]+2734768916&4294967295,E=w+(_<<15&4294967295|_>>>17),_=y+(w^(E|~g))+v[13]+1309151649&4294967295,y=E+(_<<21&4294967295|_>>>11),_=g+(E^(y|~w))+v[4]+4149444226&4294967295,g=y+(_<<6&4294967295|_>>>26),_=w+(y^(g|~E))+v[11]+3174756917&4294967295,w=g+(_<<10&4294967295|_>>>22),_=E+(g^(w|~y))+v[2]+718787259&4294967295,E=w+(_<<15&4294967295|_>>>17),_=y+(w^(E|~g))+v[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+w&4294967295}n.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var y=g-this.blockSize,v=this.B,E=this.h,w=0;w<g;){if(E==0)for(;w<=y;)i(this,I,w),w+=this.blockSize;if(typeof I=="string"){for(;w<g;)if(v[E++]=I.charCodeAt(w++),E==this.blockSize){i(this,v),E=0;break}}else for(;w<g;)if(v[E++]=I[w++],E==this.blockSize){i(this,v),E=0;break}}this.h=E,this.o+=g},n.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var y=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=y&255,y/=256;for(this.u(I),I=Array(16),g=y=0;4>g;++g)for(var v=0;32>v;v+=8)I[y++]=this.g[g]>>>v&255;return I};function s(I,g){var y=c;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=g(I)}function a(I,g){this.h=g;for(var y=[],v=!0,E=I.length-1;0<=E;E--){var w=I[E]|0;v&&w==g||(y[E]=w,v=!1)}this.g=y}var c={};function u(I){return-128<=I&&128>I?s(I,function(g){return new a([g|0],0>g?-1:0)}):new a([I|0],0>I?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return p;if(0>I)return x(d(-I));for(var g=[],y=1,v=0;I>=y;v++)g[v]=I/y|0,y*=4294967296;return new a(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return x(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=d(Math.pow(g,8)),v=p,E=0;E<I.length;E+=8){var w=Math.min(8,I.length-E),_=parseInt(I.substring(E,E+w),g);8>w?(w=d(Math.pow(g,w)),v=v.j(w).add(d(_))):(v=v.j(y),v=v.add(d(_)))}return v}var p=u(0),T=u(1),S=u(16777216);r=a.prototype,r.m=function(){if(D(this))return-x(this).m();for(var I=0,g=1,y=0;y<this.g.length;y++){var v=this.i(y);I+=(0<=v?v:4294967296+v)*g,g*=4294967296}return I},r.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(k(this))return"0";if(D(this))return"-"+x(this).toString(I);for(var g=d(Math.pow(I,6)),y=this,v="";;){var E=X(y,g).g;y=z(y,E.j(g));var w=((0<y.g.length?y.g[0]:y.h)>>>0).toString(I);if(y=E,k(y))return w+v;for(;6>w.length;)w="0"+w;v=w+v}},r.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function k(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function D(I){return I.h==-1}r.l=function(I){return I=z(this,I),D(I)?-1:k(I)?0:1};function x(I){for(var g=I.g.length,y=[],v=0;v<g;v++)y[v]=~I.g[v];return new a(y,~I.h).add(T)}r.abs=function(){return D(this)?x(this):this},r.add=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],v=0,E=0;E<=g;E++){var w=v+(this.i(E)&65535)+(I.i(E)&65535),_=(w>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);v=_>>>16,w&=65535,_&=65535,y[E]=_<<16|w}return new a(y,y[y.length-1]&-2147483648?-1:0)};function z(I,g){return I.add(x(g))}r.j=function(I){if(k(this)||k(I))return p;if(D(this))return D(I)?x(this).j(x(I)):x(x(this).j(I));if(D(I))return x(this.j(x(I)));if(0>this.l(S)&&0>I.l(S))return d(this.m()*I.m());for(var g=this.g.length+I.g.length,y=[],v=0;v<2*g;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var E=0;E<I.g.length;E++){var w=this.i(v)>>>16,_=this.i(v)&65535,Je=I.i(E)>>>16,ht=I.i(E)&65535;y[2*v+2*E]+=_*ht,K(y,2*v+2*E),y[2*v+2*E+1]+=w*ht,K(y,2*v+2*E+1),y[2*v+2*E+1]+=_*Je,K(y,2*v+2*E+1),y[2*v+2*E+2]+=w*Je,K(y,2*v+2*E+2)}for(v=0;v<g;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=g;v<2*g;v++)y[v]=0;return new a(y,0)};function K(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function j(I,g){this.g=I,this.h=g}function X(I,g){if(k(g))throw Error("division by zero");if(k(I))return new j(p,p);if(D(I))return g=X(x(I),g),new j(x(g.g),x(g.h));if(D(g))return g=X(I,x(g)),new j(x(g.g),g.h);if(30<I.g.length){if(D(I)||D(g))throw Error("slowDivide_ only works with positive integers.");for(var y=T,v=g;0>=v.l(I);)y=se(y),v=se(v);var E=Y(y,1),w=Y(v,1);for(v=Y(v,2),y=Y(y,2);!k(v);){var _=w.add(v);0>=_.l(I)&&(E=E.add(y),w=_),v=Y(v,1),y=Y(y,1)}return g=z(I,E.j(g)),new j(E,g)}for(E=p;0<=I.l(g);){for(y=Math.max(1,Math.floor(I.m()/g.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),w=d(y),_=w.j(g);D(_)||0<_.l(I);)y-=v,w=d(y),_=w.j(g);k(w)&&(w=T),E=E.add(w),I=z(I,_)}return new j(E,I)}r.A=function(I){return X(this,I).h},r.and=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)&I.i(v);return new a(y,this.h&I.h)},r.or=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)|I.i(v);return new a(y,this.h|I.h)},r.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),y=[],v=0;v<g;v++)y[v]=this.i(v)^I.i(v);return new a(y,this.h^I.h)};function se(I){for(var g=I.g.length+1,y=[],v=0;v<g;v++)y[v]=I.i(v)<<1|I.i(v-1)>>>31;return new a(y,I.h)}function Y(I,g){var y=g>>5;g%=32;for(var v=I.g.length-y,E=[],w=0;w<v;w++)E[w]=0<g?I.i(w+y)>>>g|I.i(w+y+1)<<32-g:I.i(w+y);return new a(E,I.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,mh=n,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=f,An=a}).apply(typeof lu<"u"?lu:typeof self<"u"?self:typeof window<"u"?window:{});var Yi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ph,Gr,gh,as,Oo,_h,yh,Ih;(function(){var r,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,l,h){return o==Array.prototype||o==Object.prototype||(o[l]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Yi=="object"&&Yi];for(var l=0;l<o.length;++l){var h=o[l];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var n=t(this);function i(o,l){if(l)e:{var h=n;o=o.split(".");for(var m=0;m<o.length-1;m++){var A=o[m];if(!(A in h))break e;h=h[A]}o=o[o.length-1],m=h[o],l=l(m),l!=m&&l!=null&&e(h,o,{configurable:!0,writable:!0,value:l})}}function s(o,l){o instanceof String&&(o+="");var h=0,m=!1,A={next:function(){if(!m&&h<o.length){var R=h++;return{value:l(R,o[R]),done:!1}}return m=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}i("Array.prototype.values",function(o){return o||function(){return s(this,function(l,h){return h})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(o){var l=typeof o;return l=l!="object"?l:o?Array.isArray(o)?"array":l:"null",l=="array"||l=="object"&&typeof o.length=="number"}function d(o){var l=typeof o;return l=="object"&&o!=null||l=="function"}function f(o,l,h){return o.call.apply(o.bind,arguments)}function p(o,l,h){if(!o)throw Error();if(2<arguments.length){var m=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,m),o.apply(l,A)}}return function(){return o.apply(l,arguments)}}function T(o,l,h){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,T.apply(null,arguments)}function S(o,l){var h=Array.prototype.slice.call(arguments,1);return function(){var m=h.slice();return m.push.apply(m,arguments),o.apply(this,m)}}function k(o,l){function h(){}h.prototype=l.prototype,o.aa=l.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(m,A,R){for(var M=Array(arguments.length-2),le=2;le<arguments.length;le++)M[le-2]=arguments[le];return l.prototype[A].apply(m,M)}}function D(o){const l=o.length;if(0<l){const h=Array(l);for(let m=0;m<l;m++)h[m]=o[m];return h}return[]}function x(o,l){for(let h=1;h<arguments.length;h++){const m=arguments[h];if(u(m)){const A=o.length||0,R=m.length||0;o.length=A+R;for(let M=0;M<R;M++)o[A+M]=m[M]}else o.push(m)}}class z{constructor(l,h){this.i=l,this.j=h,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function K(o){return/^[\s\xa0]*$/.test(o)}function j(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function X(o){return X[" "](o),o}X[" "]=function(){};var se=j().indexOf("Gecko")!=-1&&!(j().toLowerCase().indexOf("webkit")!=-1&&j().indexOf("Edge")==-1)&&!(j().indexOf("Trident")!=-1||j().indexOf("MSIE")!=-1)&&j().indexOf("Edge")==-1;function Y(o,l,h){for(const m in o)l.call(h,o[m],m,o)}function I(o,l){for(const h in o)l.call(void 0,o[h],h,o)}function g(o){const l={};for(const h in o)l[h]=o[h];return l}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,l){let h,m;for(let A=1;A<arguments.length;A++){m=arguments[A];for(h in m)o[h]=m[h];for(let R=0;R<y.length;R++)h=y[R],Object.prototype.hasOwnProperty.call(m,h)&&(o[h]=m[h])}}function E(o){var l=1;o=o.split(":");const h=[];for(;0<l&&o.length;)h.push(o.shift()),l--;return o.length&&h.push(o.join(":")),h}function w(o){c.setTimeout(()=>{throw o},0)}function _(){var o=de;let l=null;return o.g&&(l=o.g,o.g=o.g.next,o.g||(o.h=null),l.next=null),l}class Je{constructor(){this.h=this.g=null}add(l,h){const m=ht.get();m.set(l,h),this.h?this.h.next=m:this.g=m,this.h=m}}var ht=new z(()=>new Re,o=>o.reset());class Re{constructor(){this.next=this.g=this.h=null}set(l,h){this.h=l,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let Le,Ot=!1,de=new Je,ee=()=>{const o=c.Promise.resolve(void 0);Le=()=>{o.then(Ie)}};var Ie=()=>{for(var o;o=_();){try{o.h.call(o.g)}catch(h){w(h)}var l=ht;l.j(o),100>l.h&&(l.h++,o.next=l.g,l.g=o)}Ot=!1};function je(){this.s=this.s,this.C=this.C}je.prototype.s=!1,je.prototype.ma=function(){this.s||(this.s=!0,this.N())},je.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function we(o,l){this.type=o,this.g=this.target=l,this.defaultPrevented=!1}we.prototype.h=function(){this.defaultPrevented=!0};var Ci=(function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,l=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const h=()=>{};c.addEventListener("test",h,l),c.removeEventListener("test",h,l)}catch{}return o})();function Mt(o,l){if(we.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,m=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=l,l=o.relatedTarget){if(se){e:{try{X(l.nodeName);var A=!0;break e}catch{}A=!1}A||(l=null)}}else h=="mouseover"?l=o.fromElement:h=="mouseout"&&(l=o.toElement);this.relatedTarget=l,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Vi[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Mt.aa.h.call(this)}}k(Mt,we);var Vi={2:"touch",3:"pen",4:"mouse"};Mt.prototype.h=function(){Mt.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var dt="closure_listenable_"+(1e6*Math.random()|0),cn=0;function br(o,l,h,m,A){this.listener=o,this.proxy=null,this.src=l,this.type=h,this.capture=!!m,this.ha=A,this.key=++cn,this.da=this.fa=!1}function Ln(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Fn(o){this.src=o,this.g={},this.h=0}Fn.prototype.add=function(o,l,h,m,A){var R=o.toString();o=this.g[R],o||(o=this.g[R]=[],this.h++);var M=ze(o,l,m,A);return-1<M?(l=o[M],h||(l.fa=!1)):(l=new br(l,this.src,R,!!m,A),l.fa=h,o.push(l)),l};function Rr(o,l){var h=l.type;if(h in o.g){var m=o.g[h],A=Array.prototype.indexOf.call(m,l,void 0),R;(R=0<=A)&&Array.prototype.splice.call(m,A,1),R&&(Ln(l),o.g[h].length==0&&(delete o.g[h],o.h--))}}function ze(o,l,h,m){for(var A=0;A<o.length;++A){var R=o[A];if(!R.da&&R.listener==l&&R.capture==!!h&&R.ha==m)return A}return-1}var Sr="closure_lm_"+(1e6*Math.random()|0),ft={};function ki(o,l,h,m,A){if(Array.isArray(l)){for(var R=0;R<l.length;R++)ki(o,l[R],h,m,A);return null}return h=Ni(h),o&&o[dt]?o.K(l,h,d(m)?!!m.capture:!1,A):Pr(o,l,h,!1,m,A)}function Pr(o,l,h,m,A,R){if(!l)throw Error("Invalid event type");var M=d(A)?!!A.capture:!!A,le=Bn(o);if(le||(o[Sr]=le=new Fn(o)),h=le.add(l,h,m,M,R),h.proxy)return h;if(m=Di(),h.proxy=m,m.src=o,m.listener=h,o.addEventListener)Ci||(A=M),A===void 0&&(A=!1),o.addEventListener(l.toString(),m,A);else if(o.attachEvent)o.attachEvent(Vr(l.toString()),m);else if(o.addListener&&o.removeListener)o.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Di(){function o(h){return l.call(o.src,o.listener,h)}const l=xi;return o}function Cr(o,l,h,m,A){if(Array.isArray(l))for(var R=0;R<l.length;R++)Cr(o,l[R],h,m,A);else m=d(m)?!!m.capture:!!m,h=Ni(h),o&&o[dt]?(o=o.i,l=String(l).toString(),l in o.g&&(R=o.g[l],h=ze(R,h,m,A),-1<h&&(Ln(R[h]),Array.prototype.splice.call(R,h,1),R.length==0&&(delete o.g[l],o.h--)))):o&&(o=Bn(o))&&(l=o.g[l.toString()],o=-1,l&&(o=ze(l,h,m,A)),(h=-1<o?l[o]:null)&&Un(h))}function Un(o){if(typeof o!="number"&&o&&!o.da){var l=o.src;if(l&&l[dt])Rr(l.i,o);else{var h=o.type,m=o.proxy;l.removeEventListener?l.removeEventListener(h,m,o.capture):l.detachEvent?l.detachEvent(Vr(h),m):l.addListener&&l.removeListener&&l.removeListener(m),(h=Bn(l))?(Rr(h,o),h.h==0&&(h.src=null,l[Sr]=null)):Ln(o)}}}function Vr(o){return o in ft?ft[o]:ft[o]="on"+o}function xi(o,l){if(o.da)o=!0;else{l=new Mt(l,this);var h=o.listener,m=o.ha||o.src;o.fa&&Un(o),o=h.call(m,l)}return o}function Bn(o){return o=o[Sr],o instanceof Fn?o:null}var qn="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ni(o){return typeof o=="function"?o:(o[qn]||(o[qn]=function(l){return o.handleEvent(l)}),o[qn])}function Ve(){je.call(this),this.i=new Fn(this),this.M=this,this.F=null}k(Ve,je),Ve.prototype[dt]=!0,Ve.prototype.removeEventListener=function(o,l,h,m){Cr(this,o,l,h,m)};function De(o,l){var h,m=o.F;if(m)for(h=[];m;m=m.F)h.push(m);if(o=o.M,m=l.type||l,typeof l=="string")l=new we(l,o);else if(l instanceof we)l.target=l.target||o;else{var A=l;l=new we(m,o),v(l,A)}if(A=!0,h)for(var R=h.length-1;0<=R;R--){var M=l.g=h[R];A=at(M,m,!0,l)&&A}if(M=l.g=o,A=at(M,m,!0,l)&&A,A=at(M,m,!1,l)&&A,h)for(R=0;R<h.length;R++)M=l.g=h[R],A=at(M,m,!1,l)&&A}Ve.prototype.N=function(){if(Ve.aa.N.call(this),this.i){var o=this.i,l;for(l in o.g){for(var h=o.g[l],m=0;m<h.length;m++)Ln(h[m]);delete o.g[l],o.h--}}this.F=null},Ve.prototype.K=function(o,l,h,m){return this.i.add(String(o),l,!1,h,m)},Ve.prototype.L=function(o,l,h,m){return this.i.add(String(o),l,!0,h,m)};function at(o,l,h,m){if(l=o.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,R=0;R<l.length;++R){var M=l[R];if(M&&!M.da&&M.capture==h){var le=M.listener,Ne=M.ha||M.src;M.fa&&Rr(o.i,M),A=le.call(Ne,m)!==!1&&A}}return A&&!m.defaultPrevented}function mt(o,l,h){if(typeof o=="function")h&&(o=T(o,h));else if(o&&typeof o.handleEvent=="function")o=T(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(o,l||0)}function Oi(o){o.g=mt(()=>{o.g=null,o.i&&(o.i=!1,Oi(o))},o.l);const l=o.h;o.h=null,o.m.apply(null,l)}class Zs extends je{constructor(l,h){super(),this.m=l,this.l=h,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Oi(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function $e(o){je.call(this),this.h=o,this.g={}}k($e,je);var jn=[];function Mi(o){Y(o.g,function(l,h){this.g.hasOwnProperty(h)&&Un(l)},o),o.g={}}$e.prototype.N=function(){$e.aa.N.call(this),Mi(this)},$e.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var un=c.JSON.stringify,eo=c.JSON.parse,to=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function ln(){}ln.prototype.h=null;function P(o){return o.h||(o.h=o.i())}function N(){}var O={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function L(){we.call(this,"d")}k(L,we);function W(){we.call(this,"c")}k(W,we);var G={},oe=null;function fe(){return oe=oe||new Ve}G.La="serverreachability";function Fe(o){we.call(this,G.La,o)}k(Fe,we);function Se(o){const l=fe();De(l,new Fe(l))}G.STAT_EVENT="statevent";function Te(o,l){we.call(this,G.STAT_EVENT,o),this.stat=l}k(Te,we);function ne(o){const l=fe();De(l,new Te(l,o))}G.Ma="timingevent";function kr(o,l){we.call(this,G.Ma,o),this.size=l}k(kr,we);function xe(o,l){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},l)}function rt(){this.g=!0}rt.prototype.xa=function(){this.g=!1};function hn(o,l,h,m,A,R){o.info(function(){if(o.g)if(R)for(var M="",le=R.split("&"),Ne=0;Ne<le.length;Ne++){var ae=le[Ne].split("=");if(1<ae.length){var Ue=ae[0];ae=ae[1];var Be=Ue.split("_");M=2<=Be.length&&Be[1]=="type"?M+(Ue+"="+ae+"&"):M+(Ue+"=redacted&")}}else M=null;else M=R;return"XMLHTTP REQ ("+m+") [attempt "+A+"]: "+l+`
`+h+`
`+M})}function dn(o,l,h,m,A,R,M){o.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+A+"]: "+l+`
`+h+`
`+R+" "+M})}function pt(o,l,h,m){o.info(function(){return"XMLHTTP TEXT ("+l+"): "+Li(o,h)+(m?" "+m:"")})}function no(o,l){o.info(function(){return"TIMEOUT: "+l})}rt.prototype.info=function(){};function Li(o,l){if(!o.g)return l;if(!l)return null;try{var h=JSON.parse(l);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var m=h[o];if(!(2>m.length)){var A=m[1];if(Array.isArray(A)&&!(1>A.length)){var R=A[0];if(R!="noop"&&R!="stop"&&R!="close")for(var M=1;M<A.length;M++)A[M]=""}}}}return un(h)}catch{return l}}var Tt={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Lt={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Dr;function Ft(){}k(Ft,ln),Ft.prototype.g=function(){return new XMLHttpRequest},Ft.prototype.i=function(){return{}},Dr=new Ft;function ct(o,l,h,m){this.j=o,this.i=l,this.l=h,this.R=m||1,this.U=new $e(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Xa}function Xa(){this.i=null,this.g="",this.h=!1}var Za={},ro={};function io(o,l,h){o.L=1,o.v=qi(wt(l)),o.m=h,o.P=!0,ec(o,null)}function ec(o,l){o.F=Date.now(),Fi(o),o.A=wt(o.v);var h=o.A,m=o.R;Array.isArray(m)||(m=[String(m)]),mc(h.i,"t",m),o.C=0,h=o.j.J,o.h=new Xa,o.g=Dc(o.j,h?l:null,!o.m),0<o.O&&(o.M=new Zs(T(o.Y,o,o.g),o.O)),l=o.U,h=o.g,m=o.ca;var A="readystatechange";Array.isArray(A)||(A&&(jn[0]=A.toString()),A=jn);for(var R=0;R<A.length;R++){var M=ki(h,A[R],m||l.handleEvent,!1,l.h||l);if(!M)break;l.g[M.key]=M}l=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,l)):(o.u="GET",o.g.ea(o.A,o.u,null,l)),Se(),hn(o.i,o.u,o.A,o.l,o.R,o.m)}ct.prototype.ca=function(o){o=o.target;const l=this.M;l&&At(o)==3?l.j():this.Y(o)},ct.prototype.Y=function(o){try{if(o==this.g)e:{const Be=At(this.g);var l=this.g.Ba();const Kn=this.g.Z();if(!(3>Be)&&(Be!=3||this.g&&(this.h.h||this.g.oa()||Ec(this.g)))){this.J||Be!=4||l==7||(l==8||0>=Kn?Se(3):Se(2)),so(this);var h=this.g.Z();this.X=h;t:if(tc(this)){var m=Ec(this.g);o="";var A=m.length,R=At(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){fn(this),xr(this);var M="";break t}this.h.i=new c.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,o+=this.h.i.decode(m[l],{stream:!(R&&l==A-1)});m.length=0,this.h.g+=o,this.C=0,M=this.h.g}else M=this.g.oa();if(this.o=h==200,dn(this.i,this.u,this.A,this.l,this.R,Be,h),this.o){if(this.T&&!this.K){t:{if(this.g){var le,Ne=this.g;if((le=Ne.g?Ne.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!K(le)){var ae=le;break t}}ae=null}if(h=ae)pt(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,oo(this,h);else{this.o=!1,this.s=3,ne(12),fn(this),xr(this);break e}}if(this.P){h=!0;let ut;for(;!this.J&&this.C<M.length;)if(ut=gf(this,M),ut==ro){Be==4&&(this.s=4,ne(14),h=!1),pt(this.i,this.l,null,"[Incomplete Response]");break}else if(ut==Za){this.s=4,ne(15),pt(this.i,this.l,M,"[Invalid Chunk]"),h=!1;break}else pt(this.i,this.l,ut,null),oo(this,ut);if(tc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Be!=4||M.length!=0||this.h.h||(this.s=1,ne(16),h=!1),this.o=this.o&&h,!h)pt(this.i,this.l,M,"[Invalid Chunked Response]"),fn(this),xr(this);else if(0<M.length&&!this.W){this.W=!0;var Ue=this.j;Ue.g==this&&Ue.ba&&!Ue.M&&(Ue.j.info("Great, no buffering proxy detected. Bytes received: "+M.length),fo(Ue),Ue.M=!0,ne(11))}}else pt(this.i,this.l,M,null),oo(this,M);Be==4&&fn(this),this.o&&!this.J&&(Be==4?Pc(this.j,this):(this.o=!1,Fi(this)))}else xf(this.g),h==400&&0<M.indexOf("Unknown SID")?(this.s=3,ne(12)):(this.s=0,ne(13)),fn(this),xr(this)}}}catch{}finally{}};function tc(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function gf(o,l){var h=o.C,m=l.indexOf(`
`,h);return m==-1?ro:(h=Number(l.substring(h,m)),isNaN(h)?Za:(m+=1,m+h>l.length?ro:(l=l.slice(m,m+h),o.C=m+h,l)))}ct.prototype.cancel=function(){this.J=!0,fn(this)};function Fi(o){o.S=Date.now()+o.I,nc(o,o.I)}function nc(o,l){if(o.B!=null)throw Error("WatchDog timer not null");o.B=xe(T(o.ba,o),l)}function so(o){o.B&&(c.clearTimeout(o.B),o.B=null)}ct.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(no(this.i,this.A),this.L!=2&&(Se(),ne(17)),fn(this),this.s=2,xr(this)):nc(this,this.S-o)};function xr(o){o.j.G==0||o.J||Pc(o.j,o)}function fn(o){so(o);var l=o.M;l&&typeof l.ma=="function"&&l.ma(),o.M=null,Mi(o.U),o.g&&(l=o.g,o.g=null,l.abort(),l.ma())}function oo(o,l){try{var h=o.j;if(h.G!=0&&(h.g==o||ao(h.h,o))){if(!o.K&&ao(h.h,o)&&h.G==3){try{var m=h.Da.g.parse(l)}catch{m=null}if(Array.isArray(m)&&m.length==3){var A=m;if(A[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Hi(h),Ki(h);else break e;ho(h),ne(18)}}else h.za=A[1],0<h.za-h.T&&37500>A[2]&&h.F&&h.v==0&&!h.C&&(h.C=xe(T(h.Za,h),6e3));if(1>=sc(h.h)&&h.ca){try{h.ca()}catch{}h.ca=void 0}}else pn(h,11)}else if((o.K||h.g==o)&&Hi(h),!K(l))for(A=h.Da.g.parse(l),l=0;l<A.length;l++){let ae=A[l];if(h.T=ae[0],ae=ae[1],h.G==2)if(ae[0]=="c"){h.K=ae[1],h.ia=ae[2];const Ue=ae[3];Ue!=null&&(h.la=Ue,h.j.info("VER="+h.la));const Be=ae[4];Be!=null&&(h.Aa=Be,h.j.info("SVER="+h.Aa));const Kn=ae[5];Kn!=null&&typeof Kn=="number"&&0<Kn&&(m=1.5*Kn,h.L=m,h.j.info("backChannelRequestTimeoutMs_="+m)),m=h;const ut=o.g;if(ut){const Qi=ut.g?ut.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Qi){var R=m.h;R.g||Qi.indexOf("spdy")==-1&&Qi.indexOf("quic")==-1&&Qi.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(co(R,R.h),R.h=null))}if(m.D){const mo=ut.g?ut.g.getResponseHeader("X-HTTP-Session-Id"):null;mo&&(m.ya=mo,me(m.I,m.D,mo))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),m=h;var M=o;if(m.qa=kc(m,m.J?m.ia:null,m.W),M.K){oc(m.h,M);var le=M,Ne=m.L;Ne&&(le.I=Ne),le.B&&(so(le),Fi(le)),m.g=M}else Rc(m);0<h.i.length&&Gi(h)}else ae[0]!="stop"&&ae[0]!="close"||pn(h,7);else h.G==3&&(ae[0]=="stop"||ae[0]=="close"?ae[0]=="stop"?pn(h,7):lo(h):ae[0]!="noop"&&h.l&&h.l.ta(ae),h.v=0)}}Se(4)}catch{}}var _f=class{constructor(o,l){this.g=o,this.map=l}};function rc(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ic(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function sc(o){return o.h?1:o.g?o.g.size:0}function ao(o,l){return o.h?o.h==l:o.g?o.g.has(l):!1}function co(o,l){o.g?o.g.add(l):o.h=l}function oc(o,l){o.h&&o.h==l?o.h=null:o.g&&o.g.has(l)&&o.g.delete(l)}rc.prototype.cancel=function(){if(this.i=ac(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ac(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let l=o.i;for(const h of o.g.values())l=l.concat(h.D);return l}return D(o.i)}function yf(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(u(o)){for(var l=[],h=o.length,m=0;m<h;m++)l.push(o[m]);return l}l=[],h=0;for(m in o)l[h++]=o[m];return l}function If(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(u(o)||typeof o=="string"){var l=[];o=o.length;for(var h=0;h<o;h++)l.push(h);return l}l=[],h=0;for(const m in o)l[h++]=m;return l}}}function cc(o,l){if(o.forEach&&typeof o.forEach=="function")o.forEach(l,void 0);else if(u(o)||typeof o=="string")Array.prototype.forEach.call(o,l,void 0);else for(var h=If(o),m=yf(o),A=m.length,R=0;R<A;R++)l.call(void 0,m[R],h&&h[R],o)}var uc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function vf(o,l){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var m=o[h].indexOf("="),A=null;if(0<=m){var R=o[h].substring(0,m);A=o[h].substring(m+1)}else R=o[h];l(R,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function mn(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof mn){this.h=o.h,Ui(this,o.j),this.o=o.o,this.g=o.g,Bi(this,o.s),this.l=o.l;var l=o.i,h=new Mr;h.i=l.i,l.g&&(h.g=new Map(l.g),h.h=l.h),lc(this,h),this.m=o.m}else o&&(l=String(o).match(uc))?(this.h=!1,Ui(this,l[1]||"",!0),this.o=Nr(l[2]||""),this.g=Nr(l[3]||"",!0),Bi(this,l[4]),this.l=Nr(l[5]||"",!0),lc(this,l[6]||"",!0),this.m=Nr(l[7]||"")):(this.h=!1,this.i=new Mr(null,this.h))}mn.prototype.toString=function(){var o=[],l=this.j;l&&o.push(Or(l,hc,!0),":");var h=this.g;return(h||l=="file")&&(o.push("//"),(l=this.o)&&o.push(Or(l,hc,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Or(h,h.charAt(0)=="/"?wf:Tf,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Or(h,bf)),o.join("")};function wt(o){return new mn(o)}function Ui(o,l,h){o.j=h?Nr(l,!0):l,o.j&&(o.j=o.j.replace(/:$/,""))}function Bi(o,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);o.s=l}else o.s=null}function lc(o,l,h){l instanceof Mr?(o.i=l,Rf(o.i,o.h)):(h||(l=Or(l,Af)),o.i=new Mr(l,o.h))}function me(o,l,h){o.i.set(l,h)}function qi(o){return me(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Nr(o,l){return o?l?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Or(o,l,h){return typeof o=="string"?(o=encodeURI(o).replace(l,Ef),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Ef(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var hc=/[#\/\?@]/g,Tf=/[#\?:]/g,wf=/[#\?]/g,Af=/[#\?@]/g,bf=/#/g;function Mr(o,l){this.h=this.g=null,this.i=o||null,this.j=!!l}function Ut(o){o.g||(o.g=new Map,o.h=0,o.i&&vf(o.i,function(l,h){o.add(decodeURIComponent(l.replace(/\+/g," ")),h)}))}r=Mr.prototype,r.add=function(o,l){Ut(this),this.i=null,o=zn(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(l),this.h+=1,this};function dc(o,l){Ut(o),l=zn(o,l),o.g.has(l)&&(o.i=null,o.h-=o.g.get(l).length,o.g.delete(l))}function fc(o,l){return Ut(o),l=zn(o,l),o.g.has(l)}r.forEach=function(o,l){Ut(this),this.g.forEach(function(h,m){h.forEach(function(A){o.call(l,A,m,this)},this)},this)},r.na=function(){Ut(this);const o=Array.from(this.g.values()),l=Array.from(this.g.keys()),h=[];for(let m=0;m<l.length;m++){const A=o[m];for(let R=0;R<A.length;R++)h.push(l[m])}return h},r.V=function(o){Ut(this);let l=[];if(typeof o=="string")fc(this,o)&&(l=l.concat(this.g.get(zn(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)l=l.concat(o[h])}return l},r.set=function(o,l){return Ut(this),this.i=null,o=zn(this,o),fc(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[l]),this.h+=1,this},r.get=function(o,l){return o?(o=this.V(o),0<o.length?String(o[0]):l):l};function mc(o,l,h){dc(o,l),0<h.length&&(o.i=null,o.g.set(zn(o,l),D(h)),o.h+=h.length)}r.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],l=Array.from(this.g.keys());for(var h=0;h<l.length;h++){var m=l[h];const R=encodeURIComponent(String(m)),M=this.V(m);for(m=0;m<M.length;m++){var A=R;M[m]!==""&&(A+="="+encodeURIComponent(String(M[m]))),o.push(A)}}return this.i=o.join("&")};function zn(o,l){return l=String(l),o.j&&(l=l.toLowerCase()),l}function Rf(o,l){l&&!o.j&&(Ut(o),o.i=null,o.g.forEach(function(h,m){var A=m.toLowerCase();m!=A&&(dc(this,m),mc(this,A,h))},o)),o.j=l}function Sf(o,l){const h=new rt;if(c.Image){const m=new Image;m.onload=S(Bt,h,"TestLoadImage: loaded",!0,l,m),m.onerror=S(Bt,h,"TestLoadImage: error",!1,l,m),m.onabort=S(Bt,h,"TestLoadImage: abort",!1,l,m),m.ontimeout=S(Bt,h,"TestLoadImage: timeout",!1,l,m),c.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=o}else l(!1)}function Pf(o,l){const h=new rt,m=new AbortController,A=setTimeout(()=>{m.abort(),Bt(h,"TestPingServer: timeout",!1,l)},1e4);fetch(o,{signal:m.signal}).then(R=>{clearTimeout(A),R.ok?Bt(h,"TestPingServer: ok",!0,l):Bt(h,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),Bt(h,"TestPingServer: error",!1,l)})}function Bt(o,l,h,m,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),m(h)}catch{}}function Cf(){this.g=new to}function Vf(o,l,h){const m=h||"";try{cc(o,function(A,R){let M=A;d(A)&&(M=un(A)),l.push(m+R+"="+encodeURIComponent(M))})}catch(A){throw l.push(m+"type="+encodeURIComponent("_badmap")),A}}function ji(o){this.l=o.Ub||null,this.j=o.eb||!1}k(ji,ln),ji.prototype.g=function(){return new zi(this.l,this.j)},ji.prototype.i=(function(o){return function(){return o}})({});function zi(o,l){Ve.call(this),this.D=o,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(zi,Ve),r=zi.prototype,r.open=function(o,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=l,this.readyState=1,Fr(this)},r.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(l.body=o),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},r.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Lr(this)),this.readyState=0},r.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Fr(this)),this.g&&(this.readyState=3,Fr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;pc(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function pc(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}r.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var l=o.value?o.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!o.done}))&&(this.response=this.responseText+=l)}o.done?Lr(this):Fr(this),this.readyState==3&&pc(this)}},r.Ra=function(o){this.g&&(this.response=this.responseText=o,Lr(this))},r.Qa=function(o){this.g&&(this.response=o,Lr(this))},r.ga=function(){this.g&&Lr(this)};function Lr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Fr(o)}r.setRequestHeader=function(o,l){this.u.append(o,l)},r.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},r.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],l=this.h.entries();for(var h=l.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=l.next();return o.join(`\r
`)};function Fr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(zi.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function gc(o){let l="";return Y(o,function(h,m){l+=m,l+=":",l+=h,l+=`\r
`}),l}function uo(o,l,h){e:{for(m in h){var m=!1;break e}m=!0}m||(h=gc(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):me(o,l,h))}function ve(o){Ve.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(ve,Ve);var kf=/^https?$/i,Df=["POST","PUT"];r=ve.prototype,r.Ha=function(o){this.J=o},r.ea=function(o,l,h,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);l=l?l.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Dr.g(),this.v=this.o?P(this.o):P(Dr),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(l,String(o),!0),this.B=!1}catch(R){_c(this,R);return}if(o=h||"",h=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var A in m)h.set(A,m[A]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const R of m.keys())h.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(h.keys()).find(R=>R.toLowerCase()=="content-type"),A=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Df,l,void 0))||m||A||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,M]of h)this.g.setRequestHeader(R,M);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{vc(this),this.u=!0,this.g.send(o),this.u=!1}catch(R){_c(this,R)}};function _c(o,l){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=l,o.m=5,yc(o),$i(o)}function yc(o){o.A||(o.A=!0,De(o,"complete"),De(o,"error"))}r.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,De(this,"complete"),De(this,"abort"),$i(this))},r.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),$i(this,!0)),ve.aa.N.call(this)},r.Ea=function(){this.s||(this.B||this.u||this.j?Ic(this):this.bb())},r.bb=function(){Ic(this)};function Ic(o){if(o.h&&typeof a<"u"&&(!o.v[1]||At(o)!=4||o.Z()!=2)){if(o.u&&At(o)==4)mt(o.Ea,0,o);else if(De(o,"readystatechange"),At(o)==4){o.h=!1;try{const M=o.Z();e:switch(M){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var h;if(!(h=l)){var m;if(m=M===0){var A=String(o.D).match(uc)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),m=!kf.test(A?A.toLowerCase():"")}h=m}if(h)De(o,"complete"),De(o,"success");else{o.m=6;try{var R=2<At(o)?o.g.statusText:""}catch{R=""}o.l=R+" ["+o.Z()+"]",yc(o)}}finally{$i(o)}}}}function $i(o,l){if(o.g){vc(o);const h=o.g,m=o.v[0]?()=>{}:null;o.g=null,o.v=null,l||De(o,"ready");try{h.onreadystatechange=m}catch{}}}function vc(o){o.I&&(c.clearTimeout(o.I),o.I=null)}r.isActive=function(){return!!this.g};function At(o){return o.g?o.g.readyState:0}r.Z=function(){try{return 2<At(this)?this.g.status:-1}catch{return-1}},r.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},r.Oa=function(o){if(this.g){var l=this.g.responseText;return o&&l.indexOf(o)==0&&(l=l.substring(o.length)),eo(l)}};function Ec(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function xf(o){const l={};o=(o.g&&2<=At(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<o.length;m++){if(K(o[m]))continue;var h=E(o[m]);const A=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();const R=l[A]||[];l[A]=R,R.push(h)}I(l,function(m){return m.join(", ")})}r.Ba=function(){return this.m},r.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ur(o,l,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||l}function Tc(o){this.Aa=0,this.i=[],this.j=new rt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ur("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ur("baseRetryDelayMs",5e3,o),this.cb=Ur("retryDelaySeedMs",1e4,o),this.Wa=Ur("forwardChannelMaxRetries",2,o),this.wa=Ur("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new rc(o&&o.concurrentRequestLimit),this.Da=new Cf,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}r=Tc.prototype,r.la=8,r.G=1,r.connect=function(o,l,h,m){ne(0),this.W=o,this.H=l||{},h&&m!==void 0&&(this.H.OSID=h,this.H.OAID=m),this.F=this.X,this.I=kc(this,null,this.W),Gi(this)};function lo(o){if(wc(o),o.G==3){var l=o.U++,h=wt(o.I);if(me(h,"SID",o.K),me(h,"RID",l),me(h,"TYPE","terminate"),Br(o,h),l=new ct(o,o.j,l),l.L=2,l.v=qi(wt(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!h&&c.Image&&(new Image().src=l.v,h=!0),h||(l.g=Dc(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Fi(l)}Vc(o)}function Ki(o){o.g&&(fo(o),o.g.cancel(),o.g=null)}function wc(o){Ki(o),o.u&&(c.clearTimeout(o.u),o.u=null),Hi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Gi(o){if(!ic(o.h)&&!o.s){o.s=!0;var l=o.Ga;Le||ee(),Ot||(Le(),Ot=!0),de.add(l,o),o.B=0}}function Nf(o,l){return sc(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=l.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=xe(T(o.Ga,o,l),Cc(o,o.B)),o.B++,!0)}r.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const A=new ct(this,this.j,o);let R=this.o;if(this.S&&(R?(R=g(R),v(R,this.S)):R=this.S),this.m!==null||this.O||(A.H=R,R=null),this.P)e:{for(var l=0,h=0;h<this.i.length;h++){t:{var m=this.i[h];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(l+=m,4096<l){l=h;break e}if(l===4096||h===this.i.length-1){l=h+1;break e}}l=1e3}else l=1e3;l=bc(this,A,l),h=wt(this.I),me(h,"RID",o),me(h,"CVER",22),this.D&&me(h,"X-HTTP-Session-Id",this.D),Br(this,h),R&&(this.O?l="headers="+encodeURIComponent(String(gc(R)))+"&"+l:this.m&&uo(h,this.m,R)),co(this.h,A),this.Ua&&me(h,"TYPE","init"),this.P?(me(h,"$req",l),me(h,"SID","null"),A.T=!0,io(A,h,null)):io(A,h,l),this.G=2}}else this.G==3&&(o?Ac(this,o):this.i.length==0||ic(this.h)||Ac(this))};function Ac(o,l){var h;l?h=l.l:h=o.U++;const m=wt(o.I);me(m,"SID",o.K),me(m,"RID",h),me(m,"AID",o.T),Br(o,m),o.m&&o.o&&uo(m,o.m,o.o),h=new ct(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),l&&(o.i=l.D.concat(o.i)),l=bc(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),co(o.h,h),io(h,m,l)}function Br(o,l){o.H&&Y(o.H,function(h,m){me(l,m,h)}),o.l&&cc({},function(h,m){me(l,m,h)})}function bc(o,l,h){h=Math.min(o.i.length,h);var m=o.l?T(o.l.Na,o.l,o):null;e:{var A=o.i;let R=-1;for(;;){const M=["count="+h];R==-1?0<h?(R=A[0].g,M.push("ofs="+R)):R=0:M.push("ofs="+R);let le=!0;for(let Ne=0;Ne<h;Ne++){let ae=A[Ne].g;const Ue=A[Ne].map;if(ae-=R,0>ae)R=Math.max(0,A[Ne].g-100),le=!1;else try{Vf(Ue,M,"req"+ae+"_")}catch{m&&m(Ue)}}if(le){m=M.join("&");break e}}}return o=o.i.splice(0,h),l.D=o,m}function Rc(o){if(!o.g&&!o.u){o.Y=1;var l=o.Fa;Le||ee(),Ot||(Le(),Ot=!0),de.add(l,o),o.v=0}}function ho(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=xe(T(o.Fa,o),Cc(o,o.v)),o.v++,!0)}r.Fa=function(){if(this.u=null,Sc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=xe(T(this.ab,this),o)}},r.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ne(10),Ki(this),Sc(this))};function fo(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Sc(o){o.g=new ct(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var l=wt(o.qa);me(l,"RID","rpc"),me(l,"SID",o.K),me(l,"AID",o.T),me(l,"CI",o.F?"0":"1"),!o.F&&o.ja&&me(l,"TO",o.ja),me(l,"TYPE","xmlhttp"),Br(o,l),o.m&&o.o&&uo(l,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=qi(wt(l)),h.m=null,h.P=!0,ec(h,o)}r.Za=function(){this.C!=null&&(this.C=null,Ki(this),ho(this),ne(19))};function Hi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Pc(o,l){var h=null;if(o.g==l){Hi(o),fo(o),o.g=null;var m=2}else if(ao(o.h,l))h=l.D,oc(o.h,l),m=1;else return;if(o.G!=0){if(l.o)if(m==1){h=l.m?l.m.length:0,l=Date.now()-l.F;var A=o.B;m=fe(),De(m,new kr(m,h)),Gi(o)}else Rc(o);else if(A=l.s,A==3||A==0&&0<l.X||!(m==1&&Nf(o,l)||m==2&&ho(o)))switch(h&&0<h.length&&(l=o.h,l.i=l.i.concat(h)),A){case 1:pn(o,5);break;case 4:pn(o,10);break;case 3:pn(o,6);break;default:pn(o,2)}}}function Cc(o,l){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*l}function pn(o,l){if(o.j.info("Error code "+l),l==2){var h=T(o.fb,o),m=o.Xa;const A=!m;m=new mn(m||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ui(m,"https"),qi(m),A?Sf(m.toString(),h):Pf(m.toString(),h)}else ne(2);o.G=0,o.l&&o.l.sa(l),Vc(o),wc(o)}r.fb=function(o){o?(this.j.info("Successfully pinged google.com"),ne(2)):(this.j.info("Failed to ping google.com"),ne(1))};function Vc(o){if(o.G=0,o.ka=[],o.l){const l=ac(o.h);(l.length!=0||o.i.length!=0)&&(x(o.ka,l),x(o.ka,o.i),o.h.i.length=0,D(o.i),o.i.length=0),o.l.ra()}}function kc(o,l,h){var m=h instanceof mn?wt(h):new mn(h);if(m.g!="")l&&(m.g=l+"."+m.g),Bi(m,m.s);else{var A=c.location;m=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var R=new mn(null);m&&Ui(R,m),l&&(R.g=l),A&&Bi(R,A),h&&(R.l=h),m=R}return h=o.D,l=o.ya,h&&l&&me(m,h,l),me(m,"VER",o.la),Br(o,m),m}function Dc(o,l,h){if(l&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=o.Ca&&!o.pa?new ve(new ji({eb:h})):new ve(o.pa),l.Ha(o.J),l}r.isActive=function(){return!!this.l&&this.l.isActive(this)};function xc(){}r=xc.prototype,r.ua=function(){},r.ta=function(){},r.sa=function(){},r.ra=function(){},r.isActive=function(){return!0},r.Na=function(){};function Wi(){}Wi.prototype.g=function(o,l){return new Ye(o,l)};function Ye(o,l){Ve.call(this),this.g=new Tc(l),this.l=o,this.h=l&&l.messageUrlParams||null,o=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(o?o["X-WebChannel-Content-Type"]=l.messageContentType:o={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(o?o["X-WebChannel-Client-Profile"]=l.va:o={"X-WebChannel-Client-Profile":l.va}),this.g.S=o,(o=l&&l.Sb)&&!K(o)&&(this.g.m=o),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!K(l)&&(this.g.D=l,o=this.h,o!==null&&l in o&&(o=this.h,l in o&&delete o[l])),this.j=new $n(this)}k(Ye,Ve),Ye.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ye.prototype.close=function(){lo(this.g)},Ye.prototype.o=function(o){var l=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=un(o),o=h);l.i.push(new _f(l.Ya++,o)),l.G==3&&Gi(l)},Ye.prototype.N=function(){this.g.l=null,delete this.j,lo(this.g),delete this.g,Ye.aa.N.call(this)};function Nc(o){L.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var l=o.__sm__;if(l){e:{for(const h in l){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,l=l!==null&&o in l?l[o]:void 0),this.data=l}else this.data=o}k(Nc,L);function Oc(){W.call(this),this.status=1}k(Oc,W);function $n(o){this.g=o}k($n,xc),$n.prototype.ua=function(){De(this.g,"a")},$n.prototype.ta=function(o){De(this.g,new Nc(o))},$n.prototype.sa=function(o){De(this.g,new Oc)},$n.prototype.ra=function(){De(this.g,"b")},Wi.prototype.createWebChannel=Wi.prototype.g,Ye.prototype.send=Ye.prototype.o,Ye.prototype.open=Ye.prototype.m,Ye.prototype.close=Ye.prototype.close,Ih=function(){return new Wi},yh=function(){return fe()},_h=G,Oo={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Tt.NO_ERROR=0,Tt.TIMEOUT=8,Tt.HTTP_ERROR=6,as=Tt,Lt.COMPLETE="complete",gh=Lt,N.EventType=O,O.OPEN="a",O.CLOSE="b",O.ERROR="c",O.MESSAGE="d",Ve.prototype.listen=Ve.prototype.K,Gr=N,ve.prototype.listenOnce=ve.prototype.L,ve.prototype.getLastError=ve.prototype.Ka,ve.prototype.getLastErrorCode=ve.prototype.Ba,ve.prototype.getStatus=ve.prototype.Z,ve.prototype.getResponseJson=ve.prototype.Oa,ve.prototype.getResponseText=ve.prototype.oa,ve.prototype.send=ve.prototype.ea,ve.prototype.setWithCredentials=ve.prototype.Ha,ph=ve}).apply(typeof Yi<"u"?Yi:typeof self<"u"?self:typeof window<"u"?window:{});const hu="@firebase/firestore";/**
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
 */class Oe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Oe.UNAUTHENTICATED=new Oe(null),Oe.GOOGLE_CREDENTIALS=new Oe("google-credentials-uid"),Oe.FIRST_PARTY=new Oe("first-party-uid"),Oe.MOCK_USER=new Oe("mock-user");/**
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
 */let Er="10.14.0";/**
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
 */const Pn=new ta("@firebase/firestore");function Jn(){return Pn.logLevel}function V(r,...e){if(Pn.logLevel<=te.DEBUG){const t=e.map(pa);Pn.debug(`Firestore (${Er}): ${r}`,...t)}}function Ke(r,...e){if(Pn.logLevel<=te.ERROR){const t=e.map(pa);Pn.error(`Firestore (${Er}): ${r}`,...t)}}function ar(r,...e){if(Pn.logLevel<=te.WARN){const t=e.map(pa);Pn.warn(`Firestore (${Er}): ${r}`,...t)}}function pa(r){if(typeof r=="string")return r;try{/**
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
 */function B(r="Unexpected state"){const e=`FIRESTORE (${Er}) INTERNAL ASSERTION FAILED: `+r;throw Ke(e),new Error(e)}function q(r,e){r||B()}function Q(r,e){return r}/**
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
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class U extends Nt{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Vt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
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
 */class vh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class m_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Oe.UNAUTHENTICATED)))}shutdown(){}}class p_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class g_{constructor(e){this.t=e,this.currentUser=Oe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){q(this.o===void 0);let n=this.i;const i=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let s=new Vt;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Vt,e.enqueueRetryable((()=>i(this.currentUser)))};const a=()=>{const u=s;e.enqueueRetryable((async()=>{await u.promise,await i(this.currentUser)}))},c=u=>{V("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((u=>c(u))),setTimeout((()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(V("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Vt)}}),0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((n=>this.i!==e?(V("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(q(typeof n.accessToken=="string"),new vh(n.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return q(e===null||typeof e=="string"),new Oe(e)}}class __{constructor(e,t,n){this.l=e,this.h=t,this.P=n,this.type="FirstParty",this.user=Oe.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class y_{constructor(e,t,n){this.l=e,this.h=t,this.P=n}getToken(){return Promise.resolve(new __(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable((()=>t(Oe.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class I_{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class v_{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){q(this.o===void 0);const n=s=>{s.error!=null&&V("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.R;return this.R=s.token,V("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable((()=>n(s)))};const i=s=>{V("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit((s=>i(s))),setTimeout((()=>{if(!this.appCheck){const s=this.A.getImmediate({optional:!0});s?i(s):V("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(q(typeof t.token=="string"),this.R=t.token,new I_(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function E_(r){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(r);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<r;n++)t[n]=Math.floor(256*Math.random());return t}/**
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
 */class Eh{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let n="";for(;n.length<20;){const i=E_(40);for(let s=0;s<i.length;++s)n.length<20&&i[s]<t&&(n+=e.charAt(i[s]%e.length))}return n}}function J(r,e){return r<e?-1:r>e?1:0}function cr(r,e,t){return r.length===e.length&&r.every(((n,i)=>t(n,e[i])))}function Th(r){return r+"\0"}/**
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
 */class ye{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new U(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ye.fromMillis(Date.now())}static fromDate(e){return ye.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor(1e6*(e-1e3*t));return new ye(t,n)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class ${constructor(e){this.timestamp=e}static fromTimestamp(e){return new $(e)}static min(){return new $(new ye(0,0))}static max(){return new $(new ye(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class ai{constructor(e,t,n){t===void 0?t=0:t>e.length&&B(),n===void 0?n=e.length-t:n>e.length-t&&B(),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return ai.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ai?e.forEach((n=>{t.push(n)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const s=e.get(i),a=t.get(i);if(s<a)return-1;if(s>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class he extends ai{construct(e,t,n){return new he(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new U(C.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter((i=>i.length>0)))}return new he(t)}static emptyPath(){return new he([])}}const T_=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class _e extends ai{construct(e,t,n){return new _e(e,t,n)}static isValidIdentifier(e){return T_.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),_e.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new _e(["__name__"])}static fromServerFormat(e){const t=[];let n="",i=0;const s=()=>{if(n.length===0)throw new U(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let a=!1;for(;i<e.length;){const c=e[i];if(c==="\\"){if(i+1===e.length)throw new U(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new U(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(n+=c,i++):(s(),i++)}if(s(),a)throw new U(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new _e(t)}static emptyPath(){return new _e([])}}/**
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
 */class F{constructor(e){this.path=e}static fromPath(e){return new F(he.fromString(e))}static fromName(e){return new F(he.fromString(e).popFirst(5))}static empty(){return new F(he.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&he.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return he.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new F(new he(e.slice()))}}/**
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
 */class Ts{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function Mo(r){return r.fields.find((e=>e.kind===2))}function yn(r){return r.fields.filter((e=>e.kind!==2))}Ts.UNKNOWN_ID=-1;class cs{constructor(e,t){this.fieldPath=e,this.kind=t}}class ci{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new ci(0,nt.min())}}function w_(r,e){const t=r.toTimestamp().seconds,n=r.toTimestamp().nanoseconds+1,i=$.fromTimestamp(n===1e9?new ye(t+1,0):new ye(t,n));return new nt(i,F.empty(),e)}function wh(r){return new nt(r.readTime,r.key,-1)}class nt{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new nt($.min(),F.empty(),-1)}static max(){return new nt($.max(),F.empty(),-1)}}function ga(r,e){let t=r.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(r.documentKey,e.documentKey),t!==0?t:J(r.largestBatchId,e.largestBatchId))}/**
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
 */const Ah="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class bh{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function On(r){if(r.code!==C.FAILED_PRECONDITION||r.message!==Ah)throw r;V("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class b{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new b(((n,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(n,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(n,i)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof b?t:b.resolve(t)}catch(t){return b.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):b.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):b.reject(t)}static resolve(e){return new b(((t,n)=>{t(e)}))}static reject(e){return new b(((t,n)=>{n(e)}))}static waitFor(e){return new b(((t,n)=>{let i=0,s=0,a=!1;e.forEach((c=>{++i,c.next((()=>{++s,a&&s===i&&t()}),(u=>n(u)))})),a=!0,s===i&&t()}))}static or(e){let t=b.resolve(!1);for(const n of e)t=t.next((i=>i?b.resolve(i):n()));return t}static forEach(e,t){const n=[];return e.forEach(((i,s)=>{n.push(t.call(this,i,s))})),this.waitFor(n)}static mapArray(e,t){return new b(((n,i)=>{const s=e.length,a=new Array(s);let c=0;for(let u=0;u<s;u++){const d=u;t(e[d]).next((f=>{a[d]=f,++c,c===s&&n(a)}),(f=>i(f)))}}))}static doWhile(e,t){return new b(((n,i)=>{const s=()=>{e()===!0?t().next((()=>{s()}),i):n()};s()}))}}/**
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
 */class Us{constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.V=new Vt,this.transaction.oncomplete=()=>{this.V.resolve()},this.transaction.onabort=()=>{t.error?this.V.reject(new Xr(e,t.error)):this.V.resolve()},this.transaction.onerror=n=>{const i=_a(n.target.error);this.V.reject(new Xr(e,i))}}static open(e,t,n,i){try{return new Us(t,e.transaction(i,n))}catch(s){throw new Xr(t,s)}}get m(){return this.V.promise}abort(e){e&&this.V.reject(e),this.aborted||(V("SimpleDb","Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}g(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new b_(t)}}class Zt{constructor(e,t,n){this.name=e,this.version=t,this.p=n,Zt.S(Pe())===12.2&&Ke("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}static delete(e){return V("SimpleDb","Removing database:",e),In(window.indexedDB.deleteDatabase(e)).toPromise()}static D(){if(!Pl())return!1;if(Zt.v())return!0;const e=Pe(),t=Zt.S(e),n=0<t&&t<10,i=Rh(e),s=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||s)}static v(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.C)==="YES"}static F(e,t){return e.store(t)}static S(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}async M(e){return this.db||(V("SimpleDb","Opening database:",this.name),this.db=await new Promise(((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=s=>{const a=s.target.result;t(a)},i.onblocked=()=>{n(new Xr(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=s=>{const a=s.target.error;a.name==="VersionError"?n(new U(C.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):a.name==="InvalidStateError"?n(new U(C.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+a)):n(new Xr(e,a))},i.onupgradeneeded=s=>{V("SimpleDb",'Database "'+this.name+'" requires upgrade from version:',s.oldVersion);const a=s.target.result;this.p.O(a,i.transaction,s.oldVersion,this.version).next((()=>{V("SimpleDb","Database upgrade to version "+this.version+" complete")}))}}))),this.N&&(this.db.onversionchange=t=>this.N(t)),this.db}L(e){this.N=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,n,i){const s=t==="readonly";let a=0;for(;;){++a;try{this.db=await this.M(e);const c=Us.open(this.db,e,s?"readonly":"readwrite",n),u=i(c).next((d=>(c.g(),d))).catch((d=>(c.abort(d),b.reject(d)))).toPromise();return u.catch((()=>{})),await c.m,u}catch(c){const u=c,d=u.name!=="FirebaseError"&&a<3;if(V("SimpleDb","Transaction failed with error:",u.message,"Retrying:",d),this.close(),!d)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Rh(r){const e=r.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class A_{constructor(e){this.B=e,this.k=!1,this.q=null}get isDone(){return this.k}get K(){return this.q}set cursor(e){this.B=e}done(){this.k=!0}$(e){this.q=e}delete(){return In(this.B.delete())}}class Xr extends U{constructor(e,t){super(C.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function sn(r){return r.name==="IndexedDbTransactionError"}class b_{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(V("SimpleDb","PUT",this.store.name,e,t),n=this.store.put(t,e)):(V("SimpleDb","PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),In(n)}add(e){return V("SimpleDb","ADD",this.store.name,e,e),In(this.store.add(e))}get(e){return In(this.store.get(e)).next((t=>(t===void 0&&(t=null),V("SimpleDb","GET",this.store.name,e,t),t)))}delete(e){return V("SimpleDb","DELETE",this.store.name,e),In(this.store.delete(e))}count(){return V("SimpleDb","COUNT",this.store.name),In(this.store.count())}U(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const s=i.getAll(n.range);return new b(((a,c)=>{s.onerror=u=>{c(u.target.error)},s.onsuccess=u=>{a(u.target.result)}}))}{const s=this.cursor(n),a=[];return this.W(s,((c,u)=>{a.push(u)})).next((()=>a))}}G(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new b(((i,s)=>{n.onerror=a=>{s(a.target.error)},n.onsuccess=a=>{i(a.target.result)}}))}j(e,t){V("SimpleDb","DELETE ALL",this.store.name);const n=this.options(e,t);n.H=!1;const i=this.cursor(n);return this.W(i,((s,a,c)=>c.delete()))}J(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.W(i,t)}Y(e){const t=this.cursor({});return new b(((n,i)=>{t.onerror=s=>{const a=_a(s.target.error);i(a)},t.onsuccess=s=>{const a=s.target.result;a?e(a.primaryKey,a.value).next((c=>{c?a.continue():n()})):n()}}))}W(e,t){const n=[];return new b(((i,s)=>{e.onerror=a=>{s(a.target.error)},e.onsuccess=a=>{const c=a.target.result;if(!c)return void i();const u=new A_(c),d=t(c.primaryKey,c.value,u);if(d instanceof b){const f=d.catch((p=>(u.done(),b.reject(p))));n.push(f)}u.isDone?i():u.K===null?c.continue():c.continue(u.K)}})).next((()=>b.waitFor(n)))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.H?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function In(r){return new b(((e,t)=>{r.onsuccess=n=>{const i=n.target.result;e(i)},r.onerror=n=>{const i=_a(n.target.error);t(i)}}))}let du=!1;function _a(r){const e=Zt.S(Pe());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(r.message.indexOf(t)>=0){const n=new U("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return du||(du=!0,setTimeout((()=>{throw n}),0)),n}}return r}class R_{constructor(e,t){this.asyncQueue=e,this.Z=t,this.task=null}start(){this.X(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}X(e){V("IndexBackfiller",`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{V("IndexBackfiller",`Documents written: ${await this.Z.ee()}`)}catch(t){sn(t)?V("IndexBackfiller","Ignoring IndexedDB error during index backfill: ",t):await On(t)}await this.X(6e4)}))}}class S_{constructor(e,t){this.localStore=e,this.persistence=t}async ee(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.te(t,e)))}te(e,t){const n=new Set;let i=t,s=!0;return b.doWhile((()=>s===!0&&i>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((a=>{if(a!==null&&!n.has(a))return V("IndexBackfiller",`Processing collection: ${a}`),this.ne(e,a,i).next((c=>{i-=c,n.add(a)}));s=!1})))).next((()=>t-i))}ne(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next((s=>{const a=s.changes;return this.localStore.indexManager.updateIndexEntries(e,a).next((()=>this.re(i,s))).next((c=>(V("IndexBackfiller",`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>a.size))}))))}re(e,t){let n=e;return t.changes.forEach(((i,s)=>{const a=wh(s);ga(a,n)>0&&(n=a)})),new nt(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class it{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this.ie(n),this.se=n=>t.writeSequenceNumber(n))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}it.oe=-1;function Bs(r){return r==null}function ui(r){return r===0&&1/r==-1/0}function P_(r){return typeof r=="number"&&Number.isInteger(r)&&!ui(r)&&r<=Number.MAX_SAFE_INTEGER&&r>=Number.MIN_SAFE_INTEGER}/**
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
 */function Ge(r){let e="";for(let t=0;t<r.length;t++)e.length>0&&(e=fu(e)),e=C_(r.get(t),e);return fu(e)}function C_(r,e){let t=e;const n=r.length;for(let i=0;i<n;i++){const s=r.charAt(i);switch(s){case"\0":t+="";break;case"":t+="";break;default:t+=s}}return t}function fu(r){return r+""}function _t(r){const e=r.length;if(q(e>=2),e===2)return q(r.charAt(0)===""&&r.charAt(1)===""),he.emptyPath();const t=e-2,n=[];let i="";for(let s=0;s<e;){const a=r.indexOf("",s);switch((a<0||a>t)&&B(),r.charAt(a+1)){case"":const c=r.substring(s,a);let u;i.length===0?u=c:(i+=c,u=i,i=""),n.push(u);break;case"":i+=r.substring(s,a),i+="\0";break;case"":i+=r.substring(s,a+1);break;default:B()}s=a+2}return new he(n)}/**
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
 */const mu=["userId","batchId"];/**
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
 */function us(r,e){return[r,Ge(e)]}function Sh(r,e,t){return[r,Ge(e),t]}const V_={},k_=["prefixPath","collectionGroup","readTime","documentId"],D_=["prefixPath","collectionGroup","documentId"],x_=["collectionGroup","readTime","prefixPath","documentId"],N_=["canonicalId","targetId"],O_=["targetId","path"],M_=["path","targetId"],L_=["collectionId","parent"],F_=["indexId","uid"],U_=["uid","sequenceNumber"],B_=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],q_=["indexId","uid","orderedDocumentKey"],j_=["userId","collectionPath","documentId"],z_=["userId","collectionPath","largestBatchId"],$_=["userId","collectionGroup","largestBatchId"],Ph=["mutationQueues","mutations","documentMutations","remoteDocuments","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries"],K_=[...Ph,"documentOverlays"],Ch=["mutationQueues","mutations","documentMutations","remoteDocumentsV14","targets","owner","targetGlobal","targetDocuments","clientMetadata","remoteDocumentGlobal","collectionParents","bundles","namedQueries","documentOverlays"],Vh=Ch,ya=[...Vh,"indexConfiguration","indexState","indexEntries"],G_=ya,H_=[...ya,"globals"];/**
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
 */class Lo extends bh{constructor(e,t){super(),this._e=e,this.currentSequenceNumber=t}}function Ce(r,e){const t=Q(r);return Zt.F(t._e,e)}/**
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
 */function pu(r){let e=0;for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e++;return e}function Tr(r,e){for(const t in r)Object.prototype.hasOwnProperty.call(r,t)&&e(t,r[t])}function kh(r){for(const e in r)if(Object.prototype.hasOwnProperty.call(r,e))return!1;return!0}/**
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
 */class ge{constructor(e,t){this.comparator=e,this.root=t||Me.EMPTY}insert(e,t){return new ge(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Me.BLACK,null,null))}remove(e){return new ge(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,n)=>(e(t,n),!1)))}toString(){const e=[];return this.inorderTraversal(((t,n)=>(e.push(`${t}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Xi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Xi(this.root,e,this.comparator,!1)}getReverseIterator(){return new Xi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Xi(this.root,e,this.comparator,!0)}}class Xi{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?n(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Me{constructor(e,t,n,i,s){this.key=e,this.value=t,this.color=n??Me.RED,this.left=i??Me.EMPTY,this.right=s??Me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,s){return new Me(e??this.key,t??this.value,n??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const s=n(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,n),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Me.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw B();const e=this.left.check();if(e!==this.right.check())throw B();return e+(this.isRed()?0:1)}}Me.EMPTY=null,Me.RED=!0,Me.BLACK=!1;Me.EMPTY=new class{constructor(){this.size=0}get key(){throw B()}get value(){throw B()}get color(){throw B()}get left(){throw B()}get right(){throw B()}copy(e,t,n,i,s){return this}insert(e,t,n){return new Me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class ue{constructor(e){this.comparator=e,this.data=new ge(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,n)=>(e(t),!1)))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new gu(this.data.getIterator())}getIteratorFrom(e){return new gu(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((n=>{t=t.add(n)})),t}isEqual(e){if(!(e instanceof ue)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ue(this.comparator);return t.data=e,t}}class gu{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Gn(r){return r.hasNext()?r.getNext():void 0}/**
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
 */class st{constructor(e){this.fields=e,e.sort(_e.comparator)}static empty(){return new st([])}unionWith(e){let t=new ue(_e.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new st(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return cr(this.fields,e.fields,((t,n)=>t.isEqual(n)))}}/**
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
 */class Dh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class be{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Dh("Invalid base64 string: "+s):s}})(e);return new be(t)}static fromUint8Array(e){const t=(function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s})(e);return new be(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}be.EMPTY_BYTE_STRING=new be("");const W_=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function xt(r){if(q(!!r),typeof r=="string"){let e=0;const t=W_.exec(r);if(q(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(r);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:pe(r.seconds),nanos:pe(r.nanos)}}function pe(r){return typeof r=="number"?r:typeof r=="string"?Number(r):0}function tn(r){return typeof r=="string"?be.fromBase64String(r):be.fromUint8Array(r)}/**
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
 */function Ia(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function va(r){const e=r.mapValue.fields.__previous_value__;return Ia(e)?va(e):e}function li(r){const e=xt(r.mapValue.fields.__local_write_time__.timestampValue);return new ye(e.seconds,e.nanos)}/**
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
 */class Q_{constructor(e,t,n,i,s,a,c,u,d){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=d}}class Cn{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new Cn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Cn&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Wt={mapValue:{fields:{__type__:{stringValue:"__max__"}}}},ls={nullValue:"NULL_VALUE"};function Vn(r){return"nullValue"in r?0:"booleanValue"in r?1:"integerValue"in r||"doubleValue"in r?2:"timestampValue"in r?3:"stringValue"in r?5:"bytesValue"in r?6:"referenceValue"in r?7:"geoPointValue"in r?8:"arrayValue"in r?9:"mapValue"in r?Ia(r)?4:xh(r)?9007199254740991:qs(r)?10:11:B()}function Et(r,e){if(r===e)return!0;const t=Vn(r);if(t!==Vn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return r.booleanValue===e.booleanValue;case 4:return li(r).isEqual(li(e));case 3:return(function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=xt(i.timestampValue),c=xt(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(r,e);case 5:return r.stringValue===e.stringValue;case 6:return(function(i,s){return tn(i.bytesValue).isEqual(tn(s.bytesValue))})(r,e);case 7:return r.referenceValue===e.referenceValue;case 8:return(function(i,s){return pe(i.geoPointValue.latitude)===pe(s.geoPointValue.latitude)&&pe(i.geoPointValue.longitude)===pe(s.geoPointValue.longitude)})(r,e);case 2:return(function(i,s){if("integerValue"in i&&"integerValue"in s)return pe(i.integerValue)===pe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=pe(i.doubleValue),c=pe(s.doubleValue);return a===c?ui(a)===ui(c):isNaN(a)&&isNaN(c)}return!1})(r,e);case 9:return cr(r.arrayValue.values||[],e.arrayValue.values||[],Et);case 10:case 11:return(function(i,s){const a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(pu(a)!==pu(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!Et(a[u],c[u])))return!1;return!0})(r,e);default:return B()}}function hi(r,e){return(r.values||[]).find((t=>Et(t,e)))!==void 0}function nn(r,e){if(r===e)return 0;const t=Vn(r),n=Vn(e);if(t!==n)return J(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(r.booleanValue,e.booleanValue);case 2:return(function(s,a){const c=pe(s.integerValue||s.doubleValue),u=pe(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1})(r,e);case 3:return _u(r.timestampValue,e.timestampValue);case 4:return _u(li(r),li(e));case 5:return J(r.stringValue,e.stringValue);case 6:return(function(s,a){const c=tn(s),u=tn(a);return c.compareTo(u)})(r.bytesValue,e.bytesValue);case 7:return(function(s,a){const c=s.split("/"),u=a.split("/");for(let d=0;d<c.length&&d<u.length;d++){const f=J(c[d],u[d]);if(f!==0)return f}return J(c.length,u.length)})(r.referenceValue,e.referenceValue);case 8:return(function(s,a){const c=J(pe(s.latitude),pe(a.latitude));return c!==0?c:J(pe(s.longitude),pe(a.longitude))})(r.geoPointValue,e.geoPointValue);case 9:return yu(r.arrayValue,e.arrayValue);case 10:return(function(s,a){var c,u,d,f;const p=s.fields||{},T=a.fields||{},S=(c=p.value)===null||c===void 0?void 0:c.arrayValue,k=(u=T.value)===null||u===void 0?void 0:u.arrayValue,D=J(((d=S?.values)===null||d===void 0?void 0:d.length)||0,((f=k?.values)===null||f===void 0?void 0:f.length)||0);return D!==0?D:yu(S,k)})(r.mapValue,e.mapValue);case 11:return(function(s,a){if(s===Wt.mapValue&&a===Wt.mapValue)return 0;if(s===Wt.mapValue)return 1;if(a===Wt.mapValue)return-1;const c=s.fields||{},u=Object.keys(c),d=a.fields||{},f=Object.keys(d);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const T=J(u[p],f[p]);if(T!==0)return T;const S=nn(c[u[p]],d[f[p]]);if(S!==0)return S}return J(u.length,f.length)})(r.mapValue,e.mapValue);default:throw B()}}function _u(r,e){if(typeof r=="string"&&typeof e=="string"&&r.length===e.length)return J(r,e);const t=xt(r),n=xt(e),i=J(t.seconds,n.seconds);return i!==0?i:J(t.nanos,n.nanos)}function yu(r,e){const t=r.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const s=nn(t[i],n[i]);if(s)return s}return J(t.length,n.length)}function ur(r){return Fo(r)}function Fo(r){return"nullValue"in r?"null":"booleanValue"in r?""+r.booleanValue:"integerValue"in r?""+r.integerValue:"doubleValue"in r?""+r.doubleValue:"timestampValue"in r?(function(t){const n=xt(t);return`time(${n.seconds},${n.nanos})`})(r.timestampValue):"stringValue"in r?r.stringValue:"bytesValue"in r?(function(t){return tn(t).toBase64()})(r.bytesValue):"referenceValue"in r?(function(t){return F.fromName(t).toString()})(r.referenceValue):"geoPointValue"in r?(function(t){return`geo(${t.latitude},${t.longitude})`})(r.geoPointValue):"arrayValue"in r?(function(t){let n="[",i=!0;for(const s of t.values||[])i?i=!1:n+=",",n+=Fo(s);return n+"]"})(r.arrayValue):"mapValue"in r?(function(t){const n=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of n)s?s=!1:i+=",",i+=`${a}:${Fo(t.fields[a])}`;return i+"}"})(r.mapValue):B()}function Ea(r,e){return{referenceValue:`projects/${r.projectId}/databases/${r.database}/documents/${e.path.canonicalString()}`}}function Uo(r){return!!r&&"integerValue"in r}function di(r){return!!r&&"arrayValue"in r}function Iu(r){return!!r&&"nullValue"in r}function vu(r){return!!r&&"doubleValue"in r&&isNaN(Number(r.doubleValue))}function hs(r){return!!r&&"mapValue"in r}function qs(r){var e,t;return((t=(((e=r?.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Zr(r){if(r.geoPointValue)return{geoPointValue:Object.assign({},r.geoPointValue)};if(r.timestampValue&&typeof r.timestampValue=="object")return{timestampValue:Object.assign({},r.timestampValue)};if(r.mapValue){const e={mapValue:{fields:{}}};return Tr(r.mapValue.fields,((t,n)=>e.mapValue.fields[t]=Zr(n))),e}if(r.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(r.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Zr(r.arrayValue.values[t]);return e}return Object.assign({},r)}function xh(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}const Nh={mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{}}}}};function J_(r){return"nullValue"in r?ls:"booleanValue"in r?{booleanValue:!1}:"integerValue"in r||"doubleValue"in r?{doubleValue:NaN}:"timestampValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in r?{stringValue:""}:"bytesValue"in r?{bytesValue:""}:"referenceValue"in r?Ea(Cn.empty(),F.empty()):"geoPointValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in r?{arrayValue:{}}:"mapValue"in r?qs(r)?Nh:{mapValue:{}}:B()}function Y_(r){return"nullValue"in r?{booleanValue:!1}:"booleanValue"in r?{doubleValue:NaN}:"integerValue"in r||"doubleValue"in r?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in r?{stringValue:""}:"stringValue"in r?{bytesValue:""}:"bytesValue"in r?Ea(Cn.empty(),F.empty()):"referenceValue"in r?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in r?{arrayValue:{}}:"arrayValue"in r?Nh:"mapValue"in r?qs(r)?{mapValue:{}}:Wt:B()}function Eu(r,e){const t=nn(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?-1:!r.inclusive&&e.inclusive?1:0}function Tu(r,e){const t=nn(r.value,e.value);return t!==0?t:r.inclusive&&!e.inclusive?1:!r.inclusive&&e.inclusive?-1:0}/**
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
 */class Qe{constructor(e){this.value=e}static empty(){return new Qe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!hs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Zr(t)}setAll(e){let t=_e.emptyPath(),n={},i=[];e.forEach(((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,n,i),n={},i=[],t=c.popLast()}a?n[c.lastSegment()]=Zr(a):i.push(c.lastSegment())}));const s=this.getFieldsMap(t);this.applyChanges(s,n,i)}delete(e){const t=this.field(e.popLast());hs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Et(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];hs(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){Tr(t,((i,s)=>e[i]=s));for(const i of n)delete e[i]}clone(){return new Qe(Zr(this.value))}}function Oh(r){const e=[];return Tr(r.fields,((t,n)=>{const i=new _e([t]);if(hs(n)){const s=Oh(n.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)})),new st(e)}/**
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
 */class Ee{constructor(e,t,n,i,s,a,c){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Ee(e,0,$.min(),$.min(),$.min(),Qe.empty(),0)}static newFoundDocument(e,t,n,i){return new Ee(e,1,t,$.min(),n,i,0)}static newNoDocument(e,t){return new Ee(e,2,t,$.min(),$.min(),Qe.empty(),0)}static newUnknownDocument(e,t){return new Ee(e,3,t,$.min(),$.min(),Qe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual($.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Qe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Qe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=$.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Ee&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Ee(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class lr{constructor(e,t){this.position=e,this.inclusive=t}}function wu(r,e,t){let n=0;for(let i=0;i<r.position.length;i++){const s=e[i],a=r.position[i];if(s.field.isKeyField()?n=F.comparator(F.fromName(a.referenceValue),t.key):n=nn(a,t.data.field(s.field)),s.dir==="desc"&&(n*=-1),n!==0)break}return n}function Au(r,e){if(r===null)return e===null;if(e===null||r.inclusive!==e.inclusive||r.position.length!==e.position.length)return!1;for(let t=0;t<r.position.length;t++)if(!Et(r.position[t],e.position[t]))return!1;return!0}/**
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
 */class ws{constructor(e,t="asc"){this.field=e,this.dir=t}}function X_(r,e){return r.dir===e.dir&&r.field.isEqual(e.field)}/**
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
 */class Mh{}class re extends Mh{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new Z_(e,t,n):t==="array-contains"?new ny(e,n):t==="in"?new jh(e,n):t==="not-in"?new ry(e,n):t==="array-contains-any"?new iy(e,n):new re(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new ey(e,n):new ty(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(nn(t,this.value)):t!==null&&Vn(this.value)===Vn(t)&&this.matchesComparison(nn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ce extends Mh{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new ce(e,t)}matches(e){return hr(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function hr(r){return r.op==="and"}function Bo(r){return r.op==="or"}function Ta(r){return Lh(r)&&hr(r)}function Lh(r){for(const e of r.filters)if(e instanceof ce)return!1;return!0}function qo(r){if(r instanceof re)return r.field.canonicalString()+r.op.toString()+ur(r.value);if(Ta(r))return r.filters.map((e=>qo(e))).join(",");{const e=r.filters.map((t=>qo(t))).join(",");return`${r.op}(${e})`}}function Fh(r,e){return r instanceof re?(function(n,i){return i instanceof re&&n.op===i.op&&n.field.isEqual(i.field)&&Et(n.value,i.value)})(r,e):r instanceof ce?(function(n,i){return i instanceof ce&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce(((s,a,c)=>s&&Fh(a,i.filters[c])),!0):!1})(r,e):void B()}function Uh(r,e){const t=r.filters.concat(e);return ce.create(t,r.op)}function Bh(r){return r instanceof re?(function(t){return`${t.field.canonicalString()} ${t.op} ${ur(t.value)}`})(r):r instanceof ce?(function(t){return t.op.toString()+" {"+t.getFilters().map(Bh).join(" ,")+"}"})(r):"Filter"}class Z_ extends re{constructor(e,t,n){super(e,t,n),this.key=F.fromName(n.referenceValue)}matches(e){const t=F.comparator(e.key,this.key);return this.matchesComparison(t)}}class ey extends re{constructor(e,t){super(e,"in",t),this.keys=qh("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class ty extends re{constructor(e,t){super(e,"not-in",t),this.keys=qh("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function qh(r,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map((n=>F.fromName(n.referenceValue)))}class ny extends re{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return di(t)&&hi(t.arrayValue,this.value)}}class jh extends re{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&hi(this.value.arrayValue,t)}}class ry extends re{constructor(e,t){super(e,"not-in",t)}matches(e){if(hi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!hi(this.value.arrayValue,t)}}class iy extends re{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!di(t)||!t.arrayValue.values)&&t.arrayValue.values.some((n=>hi(this.value.arrayValue,n)))}}/**
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
 */class sy{constructor(e,t=null,n=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.ue=null}}function jo(r,e=null,t=[],n=[],i=null,s=null,a=null){return new sy(r,e,t,n,i,s,a)}function kn(r){const e=Q(r);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((n=>qo(n))).join(","),t+="|ob:",t+=e.orderBy.map((n=>(function(s){return s.field.canonicalString()+s.dir})(n))).join(","),Bs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((n=>ur(n))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((n=>ur(n))).join(",")),e.ue=t}return e.ue}function Ti(r,e){if(r.limit!==e.limit||r.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<r.orderBy.length;t++)if(!X_(r.orderBy[t],e.orderBy[t]))return!1;if(r.filters.length!==e.filters.length)return!1;for(let t=0;t<r.filters.length;t++)if(!Fh(r.filters[t],e.filters[t]))return!1;return r.collectionGroup===e.collectionGroup&&!!r.path.isEqual(e.path)&&!!Au(r.startAt,e.startAt)&&Au(r.endAt,e.endAt)}function As(r){return F.isDocumentKey(r.path)&&r.collectionGroup===null&&r.filters.length===0}function bs(r,e){return r.filters.filter((t=>t instanceof re&&t.field.isEqual(e)))}function bu(r,e,t){let n=ls,i=!0;for(const s of bs(r,e)){let a=ls,c=!0;switch(s.op){case"<":case"<=":a=J_(s.value);break;case"==":case"in":case">=":a=s.value;break;case">":a=s.value,c=!1;break;case"!=":case"not-in":a=ls}Eu({value:n,inclusive:i},{value:a,inclusive:c})<0&&(n=a,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const a=t.position[s];Eu({value:n,inclusive:i},{value:a,inclusive:t.inclusive})<0&&(n=a,i=t.inclusive);break}}return{value:n,inclusive:i}}function Ru(r,e,t){let n=Wt,i=!0;for(const s of bs(r,e)){let a=Wt,c=!0;switch(s.op){case">=":case">":a=Y_(s.value),c=!1;break;case"==":case"in":case"<=":a=s.value;break;case"<":a=s.value,c=!1;break;case"!=":case"not-in":a=Wt}Tu({value:n,inclusive:i},{value:a,inclusive:c})>0&&(n=a,i=c)}if(t!==null){for(let s=0;s<r.orderBy.length;++s)if(r.orderBy[s].field.isEqual(e)){const a=t.position[s];Tu({value:n,inclusive:i},{value:a,inclusive:t.inclusive})>0&&(n=a,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
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
 */class js{constructor(e,t=null,n=[],i=[],s=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function oy(r,e,t,n,i,s,a,c){return new js(r,e,t,n,i,s,a,c)}function wi(r){return new js(r)}function Su(r){return r.filters.length===0&&r.limit===null&&r.startAt==null&&r.endAt==null&&(r.explicitOrderBy.length===0||r.explicitOrderBy.length===1&&r.explicitOrderBy[0].field.isKeyField())}function ay(r){return r.collectionGroup!==null}function ei(r){const e=Q(r);if(e.ce===null){e.ce=[];const t=new Set;for(const s of e.explicitOrderBy)e.ce.push(s),t.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ue(_e.comparator);return a.filters.forEach((u=>{u.getFlattenedFilters().forEach((d=>{d.isInequality()&&(c=c.add(d.field))}))})),c})(e).forEach((s=>{t.has(s.canonicalString())||s.isKeyField()||e.ce.push(new ws(s,n))})),t.has(_e.keyField().canonicalString())||e.ce.push(new ws(_e.keyField(),n))}return e.ce}function ot(r){const e=Q(r);return e.le||(e.le=cy(e,ei(r))),e.le}function cy(r,e){if(r.limitType==="F")return jo(r.path,r.collectionGroup,e,r.filters,r.limit,r.startAt,r.endAt);{e=e.map((i=>{const s=i.dir==="desc"?"asc":"desc";return new ws(i.field,s)}));const t=r.endAt?new lr(r.endAt.position,r.endAt.inclusive):null,n=r.startAt?new lr(r.startAt.position,r.startAt.inclusive):null;return jo(r.path,r.collectionGroup,e,r.filters,r.limit,t,n)}}function zo(r,e,t){return new js(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),e,t,r.startAt,r.endAt)}function zs(r,e){return Ti(ot(r),ot(e))&&r.limitType===e.limitType}function zh(r){return`${kn(ot(r))}|lt:${r.limitType}`}function Yn(r){return`Query(target=${(function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map((i=>Bh(i))).join(", ")}]`),Bs(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map((i=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(i))).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map((i=>ur(i))).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map((i=>ur(i))).join(",")),`Target(${n})`})(ot(r))}; limitType=${r.limitType})`}function Ai(r,e){return e.isFoundDocument()&&(function(n,i){const s=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(s):F.isDocumentKey(n.path)?n.path.isEqual(s):n.path.isImmediateParentOf(s)})(r,e)&&(function(n,i){for(const s of ei(n))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0})(r,e)&&(function(n,i){for(const s of n.filters)if(!s.matches(i))return!1;return!0})(r,e)&&(function(n,i){return!(n.startAt&&!(function(a,c,u){const d=wu(a,c,u);return a.inclusive?d<=0:d<0})(n.startAt,ei(n),i)||n.endAt&&!(function(a,c,u){const d=wu(a,c,u);return a.inclusive?d>=0:d>0})(n.endAt,ei(n),i))})(r,e)}function uy(r){return r.collectionGroup||(r.path.length%2==1?r.path.lastSegment():r.path.get(r.path.length-2))}function $h(r){return(e,t)=>{let n=!1;for(const i of ei(r)){const s=ly(i,e,t);if(s!==0)return s;n=n||i.field.isKeyField()}return 0}}function ly(r,e,t){const n=r.field.isKeyField()?F.comparator(e.key,t.key):(function(s,a,c){const u=a.data.field(s),d=c.data.field(s);return u!==null&&d!==null?nn(u,d):B()})(r.field,e,t);switch(r.dir){case"asc":return n;case"desc":return-1*n;default:return B()}}/**
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
 */class on{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,s]of n)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Tr(this.inner,((t,n)=>{for(const[i,s]of n)e(i,s)}))}isEmpty(){return kh(this.inner)}size(){return this.innerSize}}/**
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
 */const hy=new ge(F.comparator);function Xe(){return hy}const Kh=new ge(F.comparator);function Hr(...r){let e=Kh;for(const t of r)e=e.insert(t.key,t);return e}function Gh(r){let e=Kh;return r.forEach(((t,n)=>e=e.insert(t,n.overlayedDocument))),e}function yt(){return ti()}function Hh(){return ti()}function ti(){return new on((r=>r.toString()),((r,e)=>r.isEqual(e)))}const dy=new ge(F.comparator),fy=new ue(F.comparator);function Z(...r){let e=fy;for(const t of r)e=e.add(t);return e}const my=new ue(J);function py(){return my}/**
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
 */function wa(r,e){if(r.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ui(e)?"-0":e}}function Wh(r){return{integerValue:""+r}}function gy(r,e){return P_(e)?Wh(e):wa(r,e)}/**
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
 */class $s{constructor(){this._=void 0}}function _y(r,e,t){return r instanceof dr?(function(i,s){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&Ia(s)&&(s=va(s)),s&&(a.fields.__previous_value__=s),{mapValue:a}})(t,e):r instanceof fr?Jh(r,e):r instanceof mr?Yh(r,e):(function(i,s){const a=Qh(i,s),c=Pu(a)+Pu(i.Pe);return Uo(a)&&Uo(i.Pe)?Wh(c):wa(i.serializer,c)})(r,e)}function yy(r,e,t){return r instanceof fr?Jh(r,e):r instanceof mr?Yh(r,e):t}function Qh(r,e){return r instanceof fi?(function(n){return Uo(n)||(function(s){return!!s&&"doubleValue"in s})(n)})(e)?e:{integerValue:0}:null}class dr extends $s{}class fr extends $s{constructor(e){super(),this.elements=e}}function Jh(r,e){const t=Xh(e);for(const n of r.elements)t.some((i=>Et(i,n)))||t.push(n);return{arrayValue:{values:t}}}class mr extends $s{constructor(e){super(),this.elements=e}}function Yh(r,e){let t=Xh(e);for(const n of r.elements)t=t.filter((i=>!Et(i,n)));return{arrayValue:{values:t}}}class fi extends $s{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function Pu(r){return pe(r.integerValue||r.doubleValue)}function Xh(r){return di(r)&&r.arrayValue.values?r.arrayValue.values.slice():[]}/**
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
 */class Zh{constructor(e,t){this.field=e,this.transform=t}}function Iy(r,e){return r.field.isEqual(e.field)&&(function(n,i){return n instanceof fr&&i instanceof fr||n instanceof mr&&i instanceof mr?cr(n.elements,i.elements,Et):n instanceof fi&&i instanceof fi?Et(n.Pe,i.Pe):n instanceof dr&&i instanceof dr})(r.transform,e.transform)}class vy{constructor(e,t){this.version=e,this.transformResults=t}}class Ze{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ze}static exists(e){return new Ze(void 0,e)}static updateTime(e){return new Ze(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function ds(r,e){return r.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(r.updateTime):r.exists===void 0||r.exists===e.isFoundDocument()}class Ks{}function ed(r,e){if(!r.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return r.isNoDocument()?new Aa(r.key,Ze.none()):new wr(r.key,r.data,Ze.none());{const t=r.data,n=Qe.empty();let i=new ue(_e.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?n.delete(s):n.set(s,a),i=i.add(s)}return new an(r.key,n,new st(i.toArray()),Ze.none())}}function Ey(r,e,t){r instanceof wr?(function(i,s,a){const c=i.value.clone(),u=Vu(i.fieldTransforms,s,a.transformResults);c.setAll(u),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()})(r,e,t):r instanceof an?(function(i,s,a){if(!ds(i.precondition,s))return void s.convertToUnknownDocument(a.version);const c=Vu(i.fieldTransforms,s,a.transformResults),u=s.data;u.setAll(td(i)),u.setAll(c),s.convertToFoundDocument(a.version,u).setHasCommittedMutations()})(r,e,t):(function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()})(0,e,t)}function ni(r,e,t,n){return r instanceof wr?(function(s,a,c,u){if(!ds(s.precondition,a))return c;const d=s.value.clone(),f=ku(s.fieldTransforms,u,a);return d.setAll(f),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null})(r,e,t,n):r instanceof an?(function(s,a,c,u){if(!ds(s.precondition,a))return c;const d=ku(s.fieldTransforms,u,a),f=a.data;return f.setAll(td(s)),f.setAll(d),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map((p=>p.field)))})(r,e,t,n):(function(s,a,c){return ds(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c})(r,e,t)}function Ty(r,e){let t=null;for(const n of r.fieldTransforms){const i=e.data.field(n.field),s=Qh(n.transform,i||null);s!=null&&(t===null&&(t=Qe.empty()),t.set(n.field,s))}return t||null}function Cu(r,e){return r.type===e.type&&!!r.key.isEqual(e.key)&&!!r.precondition.isEqual(e.precondition)&&!!(function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&cr(n,i,((s,a)=>Iy(s,a)))})(r.fieldTransforms,e.fieldTransforms)&&(r.type===0?r.value.isEqual(e.value):r.type!==1||r.data.isEqual(e.data)&&r.fieldMask.isEqual(e.fieldMask))}class wr extends Ks{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class an extends Ks{constructor(e,t,n,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function td(r){const e=new Map;return r.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const n=r.data.field(t);e.set(t,n)}})),e}function Vu(r,e,t){const n=new Map;q(r.length===t.length);for(let i=0;i<t.length;i++){const s=r[i],a=s.transform,c=e.data.field(s.field);n.set(s.field,yy(a,c,t[i]))}return n}function ku(r,e,t){const n=new Map;for(const i of r){const s=i.transform,a=t.data.field(i.field);n.set(i.field,_y(s,a,e))}return n}class Aa extends Ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class nd extends Ks{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class ba{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&Ey(s,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ni(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ni(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=Hh();return this.mutations.forEach((i=>{const s=e.get(i.key),a=s.overlayedDocument;let c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;const u=ed(a,c);u!==null&&n.set(i.key,u),a.isValidDocument()||a.convertToNoDocument($.min())})),n}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),Z())}isEqual(e){return this.batchId===e.batchId&&cr(this.mutations,e.mutations,((t,n)=>Cu(t,n)))&&cr(this.baseMutations,e.baseMutations,((t,n)=>Cu(t,n)))}}class Ra{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){q(e.mutations.length===n.length);let i=(function(){return dy})();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,n[a].version);return new Ra(e,t,n,i)}}/**
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
 */class Sa{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class wy{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Ae,ie;function Ay(r){switch(r){default:return B();case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0}}function rd(r){if(r===void 0)return Ke("GRPC error has no .code"),C.UNKNOWN;switch(r){case Ae.OK:return C.OK;case Ae.CANCELLED:return C.CANCELLED;case Ae.UNKNOWN:return C.UNKNOWN;case Ae.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case Ae.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case Ae.INTERNAL:return C.INTERNAL;case Ae.UNAVAILABLE:return C.UNAVAILABLE;case Ae.UNAUTHENTICATED:return C.UNAUTHENTICATED;case Ae.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case Ae.NOT_FOUND:return C.NOT_FOUND;case Ae.ALREADY_EXISTS:return C.ALREADY_EXISTS;case Ae.PERMISSION_DENIED:return C.PERMISSION_DENIED;case Ae.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case Ae.ABORTED:return C.ABORTED;case Ae.OUT_OF_RANGE:return C.OUT_OF_RANGE;case Ae.UNIMPLEMENTED:return C.UNIMPLEMENTED;case Ae.DATA_LOSS:return C.DATA_LOSS;default:return B()}}(ie=Ae||(Ae={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function by(){return new TextEncoder}/**
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
 */const Ry=new An([4294967295,4294967295],0);function Du(r){const e=by().encode(r),t=new mh;return t.update(e),new Uint8Array(t.digest())}function xu(r){const e=new DataView(r.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new An([t,n],0),new An([i,s],0)]}class Pa{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new Wr(`Invalid padding: ${t}`);if(n<0)throw new Wr(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new Wr(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new Wr(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=An.fromNumber(this.Ie)}Ee(e,t,n){let i=e.add(t.multiply(An.fromNumber(n)));return i.compare(Ry)===1&&(i=new An([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=Du(e),[n,i]=xu(t);for(let s=0;s<this.hashCount;s++){const a=this.Ee(n,i,s);if(!this.de(a))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new Pa(s,i,t);return n.forEach((c=>a.insert(c))),a}insert(e){if(this.Ie===0)return;const t=Du(e),[n,i]=xu(t);for(let s=0;s<this.hashCount;s++){const a=this.Ee(n,i,s);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class Wr extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Gs{constructor(e,t,n,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,bi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Gs($.min(),i,new ge(J),Xe(),Z())}}class bi{constructor(e,t,n,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new bi(n,t,Z(),Z(),Z())}}/**
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
 */class fs{constructor(e,t,n,i){this.Re=e,this.removedTargetIds=t,this.key=n,this.Ve=i}}class id{constructor(e,t){this.targetId=e,this.me=t}}class sd{constructor(e,t,n=be.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class Nu{constructor(){this.fe=0,this.ge=Mu(),this.pe=be.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Z(),t=Z(),n=Z();return this.ge.forEach(((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:B()}})),new bi(this.pe,this.ye,e,t,n)}Ce(){this.we=!1,this.ge=Mu()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,q(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Sy{constructor(e){this.Le=e,this.Be=new Map,this.ke=Xe(),this.qe=Ou(),this.Qe=new ge(J)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,(t=>{const n=this.Ge(t);switch(e.state){case 0:this.ze(t)&&n.De(e.resumeToken);break;case 1:n.Oe(),n.Se||n.Ce(),n.De(e.resumeToken);break;case 2:n.Oe(),n.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(n.Ne(),n.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),n.De(e.resumeToken));break;default:B()}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach(((n,i)=>{this.ze(i)&&t(i)}))}He(e){const t=e.targetId,n=e.me.count,i=this.Je(t);if(i){const s=i.target;if(As(s))if(n===0){const a=new F(s.path);this.Ue(t,a,Ee.newNoDocument(a,$.min()))}else q(n===1);else{const a=this.Ye(t);if(a!==n){const c=this.Ze(e),u=c?this.Xe(c,e,a):1;if(u!==0){this.je(t);const d=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,d)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:s=0}=t;let a,c;try{a=tn(n).toUint8Array()}catch(u){if(u instanceof Dh)return ar("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new Pa(a,i,s)}catch(u){return ar(u instanceof Wr?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ie===0?null:c}Xe(e,t,n){return t.me.count===n-this.nt(e,t.targetId)?0:2}nt(e,t){const n=this.Le.getRemoteKeysForTarget(t);let i=0;return n.forEach((s=>{const a=this.Le.tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,s,null),i++)})),i}rt(e){const t=new Map;this.Be.forEach(((s,a)=>{const c=this.Je(a);if(c){if(s.current&&As(c.target)){const u=new F(c.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,Ee.newNoDocument(u,e))}s.be&&(t.set(a,s.ve()),s.Ce())}}));let n=Z();this.qe.forEach(((s,a)=>{let c=!0;a.forEachWhile((u=>{const d=this.Je(u);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(n=n.add(s))})),this.ke.forEach(((s,a)=>a.setReadTime(e)));const i=new Gs(e,t,this.Qe,this.ke,n);return this.ke=Xe(),this.qe=Ou(),this.Qe=new ge(J),i}$e(e,t){if(!this.ze(e))return;const n=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,n),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,n){if(!this.ze(e))return;const i=this.Ge(e);this.it(e,t)?i.Fe(t,1):i.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),n&&(this.ke=this.ke.insert(t,n))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new Nu,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ue(J),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||V("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new Nu),this.Le.getRemoteKeysForTarget(e).forEach((t=>{this.Ue(e,t,null)}))}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Ou(){return new ge(F.comparator)}function Mu(){return new ge(F.comparator)}const Py={asc:"ASCENDING",desc:"DESCENDING"},Cy={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Vy={and:"AND",or:"OR"};class ky{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function $o(r,e){return r.useProto3Json||Bs(e)?e:{value:e}}function pr(r,e){return r.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function od(r,e){return r.useProto3Json?e.toBase64():e.toUint8Array()}function Dy(r,e){return pr(r,e.toTimestamp())}function He(r){return q(!!r),$.fromTimestamp((function(t){const n=xt(t);return new ye(n.seconds,n.nanos)})(r))}function Ca(r,e){return Ko(r,e).canonicalString()}function Ko(r,e){const t=(function(i){return new he(["projects",i.projectId,"databases",i.database])})(r).child("documents");return e===void 0?t:t.child(e)}function ad(r){const e=he.fromString(r);return q(gd(e)),e}function Rs(r,e){return Ca(r.databaseId,e.path)}function bn(r,e){const t=ad(e);if(t.get(1)!==r.databaseId.projectId)throw new U(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+r.databaseId.projectId);if(t.get(3)!==r.databaseId.database)throw new U(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+r.databaseId.database);return new F(ld(t))}function cd(r,e){return Ca(r.databaseId,e)}function ud(r){const e=ad(r);return e.length===4?he.emptyPath():ld(e)}function Go(r){return new he(["projects",r.databaseId.projectId,"databases",r.databaseId.database]).canonicalString()}function ld(r){return q(r.length>4&&r.get(4)==="documents"),r.popFirst(5)}function Lu(r,e,t){return{name:Rs(r,e),fields:t.value.mapValue.fields}}function xy(r,e,t){const n=bn(r,e.name),i=He(e.updateTime),s=e.createTime?He(e.createTime):$.min(),a=new Qe({mapValue:{fields:e.fields}}),c=Ee.newFoundDocument(n,i,s,a);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function Ny(r,e){let t;if("targetChange"in e){e.targetChange;const n=(function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:B()})(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=(function(d,f){return d.useProto3Json?(q(f===void 0||typeof f=="string"),be.fromBase64String(f||"")):(q(f===void 0||f instanceof Buffer||f instanceof Uint8Array),be.fromUint8Array(f||new Uint8Array))})(r,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&(function(d){const f=d.code===void 0?C.UNKNOWN:rd(d.code);return new U(f,d.message||"")})(a);t=new sd(n,i,s,c||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=bn(r,n.document.name),s=He(n.document.updateTime),a=n.document.createTime?He(n.document.createTime):$.min(),c=new Qe({mapValue:{fields:n.document.fields}}),u=Ee.newFoundDocument(i,s,a,c),d=n.targetIds||[],f=n.removedTargetIds||[];t=new fs(d,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=bn(r,n.document),s=n.readTime?He(n.readTime):$.min(),a=Ee.newNoDocument(i,s),c=n.removedTargetIds||[];t=new fs([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=bn(r,n.document),s=n.removedTargetIds||[];t=new fs([],s,i,null)}else{if(!("filter"in e))return B();{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:s}=n,a=new wy(i,s),c=n.targetId;t=new id(c,a)}}return t}function Ss(r,e){let t;if(e instanceof wr)t={update:Lu(r,e.key,e.value)};else if(e instanceof Aa)t={delete:Rs(r,e.key)};else if(e instanceof an)t={update:Lu(r,e.key,e.data),updateMask:By(e.fieldMask)};else{if(!(e instanceof nd))return B();t={verify:Rs(r,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((n=>(function(s,a){const c=a.transform;if(c instanceof dr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof fr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof mr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof fi)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw B()})(0,n)))),e.precondition.isNone||(t.currentDocument=(function(i,s){return s.updateTime!==void 0?{updateTime:Dy(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:B()})(r,e.precondition)),t}function Ho(r,e){const t=e.currentDocument?(function(s){return s.updateTime!==void 0?Ze.updateTime(He(s.updateTime)):s.exists!==void 0?Ze.exists(s.exists):Ze.none()})(e.currentDocument):Ze.none(),n=e.updateTransforms?e.updateTransforms.map((i=>(function(a,c){let u=null;if("setToServerValue"in c)q(c.setToServerValue==="REQUEST_TIME"),u=new dr;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];u=new fr(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];u=new mr(f)}else"increment"in c?u=new fi(a,c.increment):B();const d=_e.fromServerFormat(c.fieldPath);return new Zh(d,u)})(r,i))):[];if(e.update){e.update.name;const i=bn(r,e.update.name),s=new Qe({mapValue:{fields:e.update.fields}});if(e.updateMask){const a=(function(u){const d=u.fieldPaths||[];return new st(d.map((f=>_e.fromServerFormat(f))))})(e.updateMask);return new an(i,s,a,t,n)}return new wr(i,s,t,n)}if(e.delete){const i=bn(r,e.delete);return new Aa(i,t)}if(e.verify){const i=bn(r,e.verify);return new nd(i,t)}return B()}function Oy(r,e){return r&&r.length>0?(q(e!==void 0),r.map((t=>(function(i,s){let a=i.updateTime?He(i.updateTime):He(s);return a.isEqual($.min())&&(a=He(s)),new vy(a,i.transformResults||[])})(t,e)))):[]}function hd(r,e){return{documents:[cd(r,e.path)]}}function dd(r,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=cd(r,i);const s=(function(d){if(d.length!==0)return pd(ce.create(d,"and"))})(e.filters);s&&(t.structuredQuery.where=s);const a=(function(d){if(d.length!==0)return d.map((f=>(function(T){return{field:Xn(T.field),direction:Ly(T.dir)}})(f)))})(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=$o(r,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{_t:t,parent:i}}function fd(r){let e=ud(r.parent);const t=r.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){q(n===1);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=(function(p){const T=md(p);return T instanceof ce&&Ta(T)?T.getFilters():[T]})(t.where));let a=[];t.orderBy&&(a=(function(p){return p.map((T=>(function(k){return new ws(Zn(k.field),(function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(k.direction))})(T)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let T;return T=typeof p=="object"?p.value:p,Bs(T)?null:T})(t.limit));let u=null;t.startAt&&(u=(function(p){const T=!!p.before,S=p.values||[];return new lr(S,T)})(t.startAt));let d=null;return t.endAt&&(d=(function(p){const T=!p.before,S=p.values||[];return new lr(S,T)})(t.endAt)),oy(e,i,a,s,c,"F",u,d)}function My(r,e){const t=(function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B()}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function md(r){return r.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Zn(t.unaryFilter.field);return re.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=Zn(t.unaryFilter.field);return re.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Zn(t.unaryFilter.field);return re.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Zn(t.unaryFilter.field);return re.create(a,"!=",{nullValue:"NULL_VALUE"});default:return B()}})(r):r.fieldFilter!==void 0?(function(t){return re.create(Zn(t.fieldFilter.field),(function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return B()}})(t.fieldFilter.op),t.fieldFilter.value)})(r):r.compositeFilter!==void 0?(function(t){return ce.create(t.compositeFilter.filters.map((n=>md(n))),(function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return B()}})(t.compositeFilter.op))})(r):B()}function Ly(r){return Py[r]}function Fy(r){return Cy[r]}function Uy(r){return Vy[r]}function Xn(r){return{fieldPath:r.canonicalString()}}function Zn(r){return _e.fromServerFormat(r.fieldPath)}function pd(r){return r instanceof re?(function(t){if(t.op==="=="){if(vu(t.value))return{unaryFilter:{field:Xn(t.field),op:"IS_NAN"}};if(Iu(t.value))return{unaryFilter:{field:Xn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(vu(t.value))return{unaryFilter:{field:Xn(t.field),op:"IS_NOT_NAN"}};if(Iu(t.value))return{unaryFilter:{field:Xn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Xn(t.field),op:Fy(t.op),value:t.value}}})(r):r instanceof ce?(function(t){const n=t.getFilters().map((i=>pd(i)));return n.length===1?n[0]:{compositeFilter:{op:Uy(t.op),filters:n}}})(r):B()}function By(r){const e=[];return r.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function gd(r){return r.length>=4&&r.get(0)==="projects"&&r.get(2)==="databases"}/**
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
 */class Ct{constructor(e,t,n,i,s=$.min(),a=$.min(),c=be.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new Ct(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Ct(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Ct(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class _d{constructor(e){this.ct=e}}function qy(r,e){let t;if(e.document)t=xy(r.ct,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=F.fromSegments(e.noDocument.path),i=xn(e.noDocument.readTime);t=Ee.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return B();{const n=F.fromSegments(e.unknownDocument.path),i=xn(e.unknownDocument.version);t=Ee.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime((function(i){const s=new ye(i[0],i[1]);return $.fromTimestamp(s)})(e.readTime)),t}function Fu(r,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:Ps(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=(function(s,a){return{name:Rs(s,a.key),fields:a.data.value.mapValue.fields,updateTime:pr(s,a.version.toTimestamp()),createTime:pr(s,a.createTime.toTimestamp())}})(r.ct,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Dn(e.version)};else{if(!e.isUnknownDocument())return B();n.unknownDocument={path:t.path.toArray(),version:Dn(e.version)}}return n}function Ps(r){const e=r.toTimestamp();return[e.seconds,e.nanoseconds]}function Dn(r){const e=r.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function xn(r){const e=new ye(r.seconds,r.nanoseconds);return $.fromTimestamp(e)}function vn(r,e){const t=(e.baseMutations||[]).map((s=>Ho(r.ct,s)));for(let s=0;s<e.mutations.length-1;++s){const a=e.mutations[s];if(s+1<e.mutations.length&&e.mutations[s+1].transform!==void 0){const c=e.mutations[s+1];a.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(s+1,1),++s}}const n=e.mutations.map((s=>Ho(r.ct,s))),i=ye.fromMillis(e.localWriteTimeMs);return new ba(e.batchId,i,t,n)}function Qr(r){const e=xn(r.readTime),t=r.lastLimboFreeSnapshotVersion!==void 0?xn(r.lastLimboFreeSnapshotVersion):$.min();let n;return n=(function(s){return s.documents!==void 0})(r.query)?(function(s){return q(s.documents.length===1),ot(wi(ud(s.documents[0])))})(r.query):(function(s){return ot(fd(s))})(r.query),new Ct(n,r.targetId,"TargetPurposeListen",r.lastListenSequenceNumber,e,t,be.fromBase64String(r.resumeToken))}function yd(r,e){const t=Dn(e.snapshotVersion),n=Dn(e.lastLimboFreeSnapshotVersion);let i;i=As(e.target)?hd(r.ct,e.target):dd(r.ct,e.target)._t;const s=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:kn(e.target),readTime:t,resumeToken:s,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function Id(r){const e=fd({parent:r.parent,structuredQuery:r.structuredQuery});return r.limitType==="LAST"?zo(e,e.limit,"L"):e}function To(r,e){return new Sa(e.largestBatchId,Ho(r.ct,e.overlayMutation))}function Uu(r,e){const t=e.path.lastSegment();return[r,Ge(e.path.popLast()),t]}function Bu(r,e,t,n){return{indexId:r,uid:e,sequenceNumber:t,readTime:Dn(n.readTime),documentKey:Ge(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class jy{getBundleMetadata(e,t){return qu(e).get(t).next((n=>{if(n)return(function(s){return{id:s.bundleId,createTime:xn(s.createTime),version:s.version}})(n)}))}saveBundleMetadata(e,t){return qu(e).put((function(i){return{bundleId:i.id,createTime:Dn(He(i.createTime)),version:i.version}})(t))}getNamedQuery(e,t){return ju(e).get(t).next((n=>{if(n)return(function(s){return{name:s.name,query:Id(s.bundledQuery),readTime:xn(s.readTime)}})(n)}))}saveNamedQuery(e,t){return ju(e).put((function(i){return{name:i.name,readTime:Dn(He(i.readTime)),bundledQuery:i.bundledQuery}})(t))}}function qu(r){return Ce(r,"bundles")}function ju(r){return Ce(r,"namedQueries")}/**
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
 */class Hs{constructor(e,t){this.serializer=e,this.userId=t}static lt(e,t){const n=t.uid||"";return new Hs(e,n)}getOverlay(e,t){return qr(e).get(Uu(this.userId,t)).next((n=>n?To(this.serializer,n):null))}getOverlays(e,t){const n=yt();return b.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&n.set(i,s)})))).next((()=>n))}saveOverlays(e,t,n){const i=[];return n.forEach(((s,a)=>{const c=new Sa(t,a);i.push(this.ht(e,c))})),b.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach((a=>i.add(Ge(a.getCollectionPath()))));const s=[];return i.forEach((a=>{const c=IDBKeyRange.bound([this.userId,a,n],[this.userId,a,n+1],!1,!0);s.push(qr(e).j("collectionPathOverlayIndex",c))})),b.waitFor(s)}getOverlaysForCollection(e,t,n){const i=yt(),s=Ge(t),a=IDBKeyRange.bound([this.userId,s,n],[this.userId,s,Number.POSITIVE_INFINITY],!0);return qr(e).U("collectionPathOverlayIndex",a).next((c=>{for(const u of c){const d=To(this.serializer,u);i.set(d.getKey(),d)}return i}))}getOverlaysForCollectionGroup(e,t,n,i){const s=yt();let a;const c=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return qr(e).J({index:"collectionGroupOverlayIndex",range:c},((u,d,f)=>{const p=To(this.serializer,d);s.size()<i||p.largestBatchId===a?(s.set(p.getKey(),p),a=p.largestBatchId):f.done()})).next((()=>s))}ht(e,t){return qr(e).put((function(i,s,a){const[c,u,d]=Uu(s,a.mutation.key);return{userId:s,collectionPath:u,documentId:d,collectionGroup:a.mutation.key.getCollectionGroup(),largestBatchId:a.largestBatchId,overlayMutation:Ss(i.ct,a.mutation)}})(this.serializer,this.userId,t))}}function qr(r){return Ce(r,"documentOverlays")}/**
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
 */class zy{Pt(e){return Ce(e,"globals")}getSessionToken(e){return this.Pt(e).get("sessionToken").next((t=>{const n=t?.value;return n?be.fromUint8Array(n):be.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.Pt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class En{constructor(){}It(e,t){this.Tt(e,t),t.Et()}Tt(e,t){if("nullValue"in e)this.dt(t,5);else if("booleanValue"in e)this.dt(t,10),t.At(e.booleanValue?1:0);else if("integerValue"in e)this.dt(t,15),t.At(pe(e.integerValue));else if("doubleValue"in e){const n=pe(e.doubleValue);isNaN(n)?this.dt(t,13):(this.dt(t,15),ui(n)?t.At(0):t.At(n))}else if("timestampValue"in e){let n=e.timestampValue;this.dt(t,20),typeof n=="string"&&(n=xt(n)),t.Rt(`${n.seconds||""}`),t.At(n.nanos||0)}else if("stringValue"in e)this.Vt(e.stringValue,t),this.ft(t);else if("bytesValue"in e)this.dt(t,30),t.gt(tn(e.bytesValue)),this.ft(t);else if("referenceValue"in e)this.yt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.dt(t,45),t.At(n.latitude||0),t.At(n.longitude||0)}else"mapValue"in e?xh(e)?this.dt(t,Number.MAX_SAFE_INTEGER):qs(e)?this.wt(e.mapValue,t):(this.St(e.mapValue,t),this.ft(t)):"arrayValue"in e?(this.bt(e.arrayValue,t),this.ft(t)):B()}Vt(e,t){this.dt(t,25),this.Dt(e,t)}Dt(e,t){t.Rt(e)}St(e,t){const n=e.fields||{};this.dt(t,55);for(const i of Object.keys(n))this.Vt(i,t),this.Tt(n[i],t)}wt(e,t){var n,i;const s=e.fields||{};this.dt(t,53);const a="value",c=((i=(n=s[a].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.dt(t,15),t.At(pe(c)),this.Vt(a,t),this.Tt(s[a],t)}bt(e,t){const n=e.values||[];this.dt(t,50);for(const i of n)this.Tt(i,t)}yt(e,t){this.dt(t,37),F.fromName(e).path.forEach((n=>{this.dt(t,60),this.Dt(n,t)}))}dt(e,t){e.At(t)}ft(e){e.At(2)}}En.vt=new En;function $y(r){if(r===0)return 8;let e=0;return r>>4==0&&(e+=4,r<<=4),r>>6==0&&(e+=2,r<<=2),r>>7==0&&(e+=1),e}function zu(r){const e=64-(function(n){let i=0;for(let s=0;s<8;++s){const a=$y(255&n[s]);if(i+=a,a!==8)break}return i})(r);return Math.ceil(e/8)}class Ky{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Ct(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ft(n.value),n=t.next();this.Mt()}xt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Ot(n.value),n=t.next();this.Nt()}Lt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ft(n);else if(n<2048)this.Ft(960|n>>>6),this.Ft(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ft(480|n>>>12),this.Ft(128|63&n>>>6),this.Ft(128|63&n);else{const i=t.codePointAt(0);this.Ft(240|i>>>18),this.Ft(128|63&i>>>12),this.Ft(128|63&i>>>6),this.Ft(128|63&i)}}this.Mt()}Bt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Ot(n);else if(n<2048)this.Ot(960|n>>>6),this.Ot(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Ot(480|n>>>12),this.Ot(128|63&n>>>6),this.Ot(128|63&n);else{const i=t.codePointAt(0);this.Ot(240|i>>>18),this.Ot(128|63&i>>>12),this.Ot(128|63&i>>>6),this.Ot(128|63&i)}}this.Nt()}kt(e){const t=this.qt(e),n=zu(t);this.Qt(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}Kt(e){const t=this.qt(e),n=zu(t);this.Qt(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}$t(){this.Ut(255),this.Ut(255)}Wt(){this.Gt(255),this.Gt(255)}reset(){this.position=0}seed(e){this.Qt(e.length),this.buffer.set(e,this.position),this.position+=e.length}zt(){return this.buffer.slice(0,this.position)}qt(e){const t=(function(s){const a=new DataView(new ArrayBuffer(8));return a.setFloat64(0,s,!1),new Uint8Array(a.buffer)})(e),n=(128&t[0])!=0;t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Ft(e){const t=255&e;t===0?(this.Ut(0),this.Ut(255)):t===255?(this.Ut(255),this.Ut(0)):this.Ut(t)}Ot(e){const t=255&e;t===0?(this.Gt(0),this.Gt(255)):t===255?(this.Gt(255),this.Gt(0)):this.Gt(e)}Mt(){this.Ut(0),this.Ut(1)}Nt(){this.Gt(0),this.Gt(1)}Ut(e){this.Qt(1),this.buffer[this.position++]=e}Gt(e){this.Qt(1),this.buffer[this.position++]=~e}Qt(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class Gy{constructor(e){this.jt=e}gt(e){this.jt.Ct(e)}Rt(e){this.jt.Lt(e)}At(e){this.jt.kt(e)}Et(){this.jt.$t()}}class Hy{constructor(e){this.jt=e}gt(e){this.jt.xt(e)}Rt(e){this.jt.Bt(e)}At(e){this.jt.Kt(e)}Et(){this.jt.Wt()}}class jr{constructor(){this.jt=new Ky,this.Ht=new Gy(this.jt),this.Jt=new Hy(this.jt)}seed(e){this.jt.seed(e)}Yt(e){return e===0?this.Ht:this.Jt}zt(){return this.jt.zt()}reset(){this.jt.reset()}}/**
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
 */class Tn{constructor(e,t,n,i){this.indexId=e,this.documentKey=t,this.arrayValue=n,this.directionalValue=i}Zt(){const e=this.directionalValue.length,t=e===0||this.directionalValue[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.directionalValue,0),t!==e?n.set([0],this.directionalValue.length):++n[n.length-1],new Tn(this.indexId,this.documentKey,this.arrayValue,n)}}function jt(r,e){let t=r.indexId-e.indexId;return t!==0?t:(t=$u(r.arrayValue,e.arrayValue),t!==0?t:(t=$u(r.directionalValue,e.directionalValue),t!==0?t:F.comparator(r.documentKey,e.documentKey)))}function $u(r,e){for(let t=0;t<r.length&&t<e.length;++t){const n=r[t]-e[t];if(n!==0)return n}return r.length-e.length}/**
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
 */class Ku{constructor(e){this.Xt=new ue(((t,n)=>_e.comparator(t.field,n.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.en=e.orderBy,this.tn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Xt=this.Xt.add(n):this.tn.push(n)}}get nn(){return this.Xt.size>1}rn(e){if(q(e.collectionGroup===this.collectionId),this.nn)return!1;const t=Mo(e);if(t!==void 0&&!this.sn(t))return!1;const n=yn(e);let i=new Set,s=0,a=0;for(;s<n.length&&this.sn(n[s]);++s)i=i.add(n[s].fieldPath.canonicalString());if(s===n.length)return!0;if(this.Xt.size>0){const c=this.Xt.getIterator().getNext();if(!i.has(c.field.canonicalString())){const u=n[s];if(!this.on(c,u)||!this._n(this.en[a++],u))return!1}++s}for(;s<n.length;++s){const c=n[s];if(a>=this.en.length||!this._n(this.en[a++],c))return!1}return!0}an(){if(this.nn)return null;let e=new ue(_e.comparator);const t=[];for(const n of this.tn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new cs(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new cs(n.field,0))}for(const n of this.en)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new cs(n.field,n.dir==="asc"?0:1)));return new Ts(Ts.UNKNOWN_ID,this.collectionId,t,ci.empty())}sn(e){for(const t of this.tn)if(this.on(t,e))return!0;return!1}on(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}_n(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function vd(r){var e,t;if(q(r instanceof re||r instanceof ce),r instanceof re){if(r instanceof jh){const i=((t=(e=r.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map((s=>re.create(r.field,"==",s))))||[];return ce.create(i,"or")}return r}const n=r.filters.map((i=>vd(i)));return ce.create(n,r.op)}function Wy(r){if(r.getFilters().length===0)return[];const e=Jo(vd(r));return q(Ed(e)),Wo(e)||Qo(e)?[e]:e.getFilters()}function Wo(r){return r instanceof re}function Qo(r){return r instanceof ce&&Ta(r)}function Ed(r){return Wo(r)||Qo(r)||(function(t){if(t instanceof ce&&Bo(t)){for(const n of t.getFilters())if(!Wo(n)&&!Qo(n))return!1;return!0}return!1})(r)}function Jo(r){if(q(r instanceof re||r instanceof ce),r instanceof re)return r;if(r.filters.length===1)return Jo(r.filters[0]);const e=r.filters.map((n=>Jo(n)));let t=ce.create(e,r.op);return t=Cs(t),Ed(t)?t:(q(t instanceof ce),q(hr(t)),q(t.filters.length>1),t.filters.reduce(((n,i)=>Va(n,i))))}function Va(r,e){let t;return q(r instanceof re||r instanceof ce),q(e instanceof re||e instanceof ce),t=r instanceof re?e instanceof re?(function(i,s){return ce.create([i,s],"and")})(r,e):Gu(r,e):e instanceof re?Gu(e,r):(function(i,s){if(q(i.filters.length>0&&s.filters.length>0),hr(i)&&hr(s))return Uh(i,s.getFilters());const a=Bo(i)?i:s,c=Bo(i)?s:i,u=a.filters.map((d=>Va(d,c)));return ce.create(u,"or")})(r,e),Cs(t)}function Gu(r,e){if(hr(e))return Uh(e,r.getFilters());{const t=e.filters.map((n=>Va(r,n)));return ce.create(t,"or")}}function Cs(r){if(q(r instanceof re||r instanceof ce),r instanceof re)return r;const e=r.getFilters();if(e.length===1)return Cs(e[0]);if(Lh(r))return r;const t=e.map((i=>Cs(i))),n=[];return t.forEach((i=>{i instanceof re?n.push(i):i instanceof ce&&(i.op===r.op?n.push(...i.filters):n.push(i))})),n.length===1?n[0]:ce.create(n,r.op)}/**
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
 */class Qy{constructor(){this.un=new ka}addToCollectionParentIndex(e,t){return this.un.add(t),b.resolve()}getCollectionParents(e,t){return b.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return b.resolve()}deleteFieldIndex(e,t){return b.resolve()}deleteAllFieldIndexes(e){return b.resolve()}createTargetIndexes(e,t){return b.resolve()}getDocumentsMatchingTarget(e,t){return b.resolve(null)}getIndexType(e,t){return b.resolve(0)}getFieldIndexes(e,t){return b.resolve([])}getNextCollectionGroupToUpdate(e){return b.resolve(null)}getMinOffset(e,t){return b.resolve(nt.min())}getMinOffsetFromCollectionGroup(e,t){return b.resolve(nt.min())}updateCollectionGroup(e,t,n){return b.resolve()}updateIndexEntries(e,t){return b.resolve()}}class ka{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new ue(he.comparator),s=!i.has(n);return this.index[t]=i.add(n),s}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new ue(he.comparator)).toArray()}}/**
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
 */const Zi=new Uint8Array(0);class Jy{constructor(e,t){this.databaseId=t,this.cn=new ka,this.ln=new on((n=>kn(n)),((n,i)=>Ti(n,i))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.cn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener((()=>{this.cn.add(t)}));const s={collectionId:n,parent:Ge(i)};return Hu(e).put(s)}return b.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[Th(t),""],!1,!0);return Hu(e).U(i).next((s=>{for(const a of s){if(a.collectionId!==t)break;n.push(_t(a.parent))}return n}))}addFieldIndex(e,t){const n=zr(e),i=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((u=>[u.fieldPath.canonicalString(),u.kind]))}})(t);delete i.indexId;const s=n.add(i);if(t.indexState){const a=Wn(e);return s.next((c=>{a.put(Bu(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return s.next()}deleteFieldIndex(e,t){const n=zr(e),i=Wn(e),s=Hn(e);return n.delete(t.indexId).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=zr(e),n=Hn(e),i=Wn(e);return t.j().next((()=>n.j())).next((()=>i.j()))}createTargetIndexes(e,t){return b.forEach(this.hn(t),(n=>this.getIndexType(e,n).next((i=>{if(i===0||i===1){const s=new Ku(n).an();if(s!=null)return this.addFieldIndex(e,s)}}))))}getDocumentsMatchingTarget(e,t){const n=Hn(e);let i=!0;const s=new Map;return b.forEach(this.hn(t),(a=>this.Pn(e,a).next((c=>{i&&(i=!!c),s.set(a,c)})))).next((()=>{if(i){let a=Z();const c=[];return b.forEach(s,((u,d)=>{V("IndexedDbIndexManager",`Using index ${(function(j){return`id=${j.indexId}|cg=${j.collectionGroup}|f=${j.fields.map((X=>`${X.fieldPath}:${X.kind}`)).join(",")}`})(u)} to execute ${kn(t)}`);const f=(function(j,X){const se=Mo(X);if(se===void 0)return null;for(const Y of bs(j,se.fieldPath))switch(Y.op){case"array-contains-any":return Y.value.arrayValue.values||[];case"array-contains":return[Y.value]}return null})(d,u),p=(function(j,X){const se=new Map;for(const Y of yn(X))for(const I of bs(j,Y.fieldPath))switch(I.op){case"==":case"in":se.set(Y.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return se.set(Y.fieldPath.canonicalString(),I.value),Array.from(se.values())}return null})(d,u),T=(function(j,X){const se=[];let Y=!0;for(const I of yn(X)){const g=I.kind===0?bu(j,I.fieldPath,j.startAt):Ru(j,I.fieldPath,j.startAt);se.push(g.value),Y&&(Y=g.inclusive)}return new lr(se,Y)})(d,u),S=(function(j,X){const se=[];let Y=!0;for(const I of yn(X)){const g=I.kind===0?Ru(j,I.fieldPath,j.endAt):bu(j,I.fieldPath,j.endAt);se.push(g.value),Y&&(Y=g.inclusive)}return new lr(se,Y)})(d,u),k=this.In(u,d,T),D=this.In(u,d,S),x=this.Tn(u,d,p),z=this.En(u.indexId,f,k,T.inclusive,D,S.inclusive,x);return b.forEach(z,(K=>n.G(K,t.limit).next((j=>{j.forEach((X=>{const se=F.fromSegments(X.documentKey);a.has(se)||(a=a.add(se),c.push(se))}))}))))})).next((()=>c))}return b.resolve(null)}))}hn(e){let t=this.ln.get(e);return t||(e.filters.length===0?t=[e]:t=Wy(ce.create(e.filters,"and")).map((n=>jo(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt))),this.ln.set(e,t),t)}En(e,t,n,i,s,a,c){const u=(t!=null?t.length:1)*Math.max(n.length,s.length),d=u/(t!=null?t.length:1),f=[];for(let p=0;p<u;++p){const T=t?this.dn(t[p/d]):Zi,S=this.An(e,T,n[p%d],i),k=this.Rn(e,T,s[p%d],a),D=c.map((x=>this.An(e,T,x,!0)));f.push(...this.createRange(S,k,D))}return f}An(e,t,n,i){const s=new Tn(e,F.empty(),t,n);return i?s:s.Zt()}Rn(e,t,n,i){const s=new Tn(e,F.empty(),t,n);return i?s.Zt():s}Pn(e,t){const n=new Ku(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next((s=>{let a=null;for(const c of s)n.rn(c)&&(!a||c.fields.length>a.fields.length)&&(a=c);return a}))}getIndexType(e,t){let n=2;const i=this.hn(t);return b.forEach(i,(s=>this.Pn(e,s).next((a=>{a?n!==0&&a.fields.length<(function(u){let d=new ue(_e.comparator),f=!1;for(const p of u.filters)for(const T of p.getFlattenedFilters())T.field.isKeyField()||(T.op==="array-contains"||T.op==="array-contains-any"?f=!0:d=d.add(T.field));for(const p of u.orderBy)p.field.isKeyField()||(d=d.add(p.field));return d.size+(f?1:0)})(s)&&(n=1):n=0})))).next((()=>(function(a){return a.limit!==null})(t)&&i.length>1&&n===2?1:n))}Vn(e,t){const n=new jr;for(const i of yn(e)){const s=t.data.field(i.fieldPath);if(s==null)return null;const a=n.Yt(i.kind);En.vt.It(s,a)}return n.zt()}dn(e){const t=new jr;return En.vt.It(e,t.Yt(0)),t.zt()}mn(e,t){const n=new jr;return En.vt.It(Ea(this.databaseId,t),n.Yt((function(s){const a=yn(s);return a.length===0?0:a[a.length-1].kind})(e))),n.zt()}Tn(e,t,n){if(n===null)return[];let i=[];i.push(new jr);let s=0;for(const a of yn(e)){const c=n[s++];for(const u of i)if(this.fn(t,a.fieldPath)&&di(c))i=this.gn(i,a,c);else{const d=u.Yt(a.kind);En.vt.It(c,d)}}return this.pn(i)}In(e,t,n){return this.Tn(e,t,n.position)}pn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].zt();return t}gn(e,t,n){const i=[...e],s=[];for(const a of n.arrayValue.values||[])for(const c of i){const u=new jr;u.seed(c.zt()),En.vt.It(a,u.Yt(t.kind)),s.push(u)}return s}fn(e,t){return!!e.filters.find((n=>n instanceof re&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in")))}getFieldIndexes(e,t){const n=zr(e),i=Wn(e);return(t?n.U("collectionGroupIndex",IDBKeyRange.bound(t,t)):n.U()).next((s=>{const a=[];return b.forEach(s,(c=>i.get([c.indexId,this.uid]).next((u=>{a.push((function(f,p){const T=p?new ci(p.sequenceNumber,new nt(xn(p.readTime),new F(_t(p.documentKey)),p.largestBatchId)):ci.empty(),S=f.fields.map((([k,D])=>new cs(_e.fromServerFormat(k),D)));return new Ts(f.indexId,f.collectionGroup,S,T)})(c,u))})))).next((()=>a))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((n,i)=>{const s=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return s!==0?s:J(n.collectionGroup,i.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,n){const i=zr(e),s=Wn(e);return this.yn(e).next((a=>i.U("collectionGroupIndex",IDBKeyRange.bound(t,t)).next((c=>b.forEach(c,(u=>s.put(Bu(u.indexId,this.uid,a,n))))))))}updateIndexEntries(e,t){const n=new Map;return b.forEach(t,((i,s)=>{const a=n.get(i.collectionGroup);return(a?b.resolve(a):this.getFieldIndexes(e,i.collectionGroup)).next((c=>(n.set(i.collectionGroup,c),b.forEach(c,(u=>this.wn(e,i,u).next((d=>{const f=this.Sn(s,u);return d.isEqual(f)?b.resolve():this.bn(e,s,u,d,f)})))))))}))}Dn(e,t,n,i){return Hn(e).put({indexId:i.indexId,uid:this.uid,arrayValue:i.arrayValue,directionalValue:i.directionalValue,orderedDocumentKey:this.mn(n,t.key),documentKey:t.key.path.toArray()})}vn(e,t,n,i){return Hn(e).delete([i.indexId,this.uid,i.arrayValue,i.directionalValue,this.mn(n,t.key),t.key.path.toArray()])}wn(e,t,n){const i=Hn(e);let s=new ue(jt);return i.J({index:"documentKeyIndex",range:IDBKeyRange.only([n.indexId,this.uid,this.mn(n,t)])},((a,c)=>{s=s.add(new Tn(n.indexId,t,c.arrayValue,c.directionalValue))})).next((()=>s))}Sn(e,t){let n=new ue(jt);const i=this.Vn(t,e);if(i==null)return n;const s=Mo(t);if(s!=null){const a=e.data.field(s.fieldPath);if(di(a))for(const c of a.arrayValue.values||[])n=n.add(new Tn(t.indexId,e.key,this.dn(c),i))}else n=n.add(new Tn(t.indexId,e.key,Zi,i));return n}bn(e,t,n,i,s){V("IndexedDbIndexManager","Updating index entries for document '%s'",t.key);const a=[];return(function(u,d,f,p,T){const S=u.getIterator(),k=d.getIterator();let D=Gn(S),x=Gn(k);for(;D||x;){let z=!1,K=!1;if(D&&x){const j=f(D,x);j<0?K=!0:j>0&&(z=!0)}else D!=null?K=!0:z=!0;z?(p(x),x=Gn(k)):K?(T(D),D=Gn(S)):(D=Gn(S),x=Gn(k))}})(i,s,jt,(c=>{a.push(this.Dn(e,t,n,c))}),(c=>{a.push(this.vn(e,t,n,c))})),b.waitFor(a)}yn(e){let t=1;return Wn(e).J({index:"sequenceNumberIndex",reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((n,i,s)=>{s.done(),t=i.sequenceNumber+1})).next((()=>t))}createRange(e,t,n){n=n.sort(((a,c)=>jt(a,c))).filter(((a,c,u)=>!c||jt(a,u[c-1])!==0));const i=[];i.push(e);for(const a of n){const c=jt(a,e),u=jt(a,t);if(c===0)i[0]=e.Zt();else if(c>0&&u<0)i.push(a),i.push(a.Zt());else if(u>0)break}i.push(t);const s=[];for(let a=0;a<i.length;a+=2){if(this.Cn(i[a],i[a+1]))return[];const c=[i[a].indexId,this.uid,i[a].arrayValue,i[a].directionalValue,Zi,[]],u=[i[a+1].indexId,this.uid,i[a+1].arrayValue,i[a+1].directionalValue,Zi,[]];s.push(IDBKeyRange.bound(c,u))}return s}Cn(e,t){return jt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(Wu)}getMinOffset(e,t){return b.mapArray(this.hn(t),(n=>this.Pn(e,n).next((i=>i||B())))).next(Wu)}}function Hu(r){return Ce(r,"collectionParents")}function Hn(r){return Ce(r,"indexEntries")}function zr(r){return Ce(r,"indexConfiguration")}function Wn(r){return Ce(r,"indexState")}function Wu(r){q(r.length!==0);let e=r[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<r.length;n++){const i=r[n].indexState.offset;ga(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new nt(e.readTime,e.documentKey,t)}/**
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
 */const Qu={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0};class We{constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}static withCacheSize(e){return new We(e,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}}/**
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
 */function Td(r,e,t){const n=r.store("mutations"),i=r.store("documentMutations"),s=[],a=IDBKeyRange.only(t.batchId);let c=0;const u=n.J({range:a},((f,p,T)=>(c++,T.delete())));s.push(u.next((()=>{q(c===1)})));const d=[];for(const f of t.mutations){const p=Sh(e,f.key.path,t.batchId);s.push(i.delete(p)),d.push(f.key)}return b.waitFor(s).next((()=>d))}function Vs(r){if(!r)return 0;let e;if(r.document)e=r.document;else if(r.unknownDocument)e=r.unknownDocument;else{if(!r.noDocument)throw B();e=r.noDocument}return JSON.stringify(e).length}/**
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
 */We.DEFAULT_COLLECTION_PERCENTILE=10,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,We.DEFAULT=new We(41943040,We.DEFAULT_COLLECTION_PERCENTILE,We.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),We.DISABLED=new We(-1,0,0);class Ws{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Fn={}}static lt(e,t,n,i){q(e.uid!=="");const s=e.isAuthenticated()?e.uid:"";return new Ws(s,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return zt(e).J({index:"userMutationsIndex",range:n},((i,s,a)=>{t=!1,a.done()})).next((()=>t))}addMutationBatch(e,t,n,i){const s=er(e),a=zt(e);return a.add({}).next((c=>{q(typeof c=="number");const u=new ba(c,t,n,i),d=(function(S,k,D){const x=D.baseMutations.map((K=>Ss(S.ct,K))),z=D.mutations.map((K=>Ss(S.ct,K)));return{userId:k,batchId:D.batchId,localWriteTimeMs:D.localWriteTime.toMillis(),baseMutations:x,mutations:z}})(this.serializer,this.userId,u),f=[];let p=new ue(((T,S)=>J(T.canonicalString(),S.canonicalString())));for(const T of i){const S=Sh(this.userId,T.key.path,c);p=p.add(T.key.path.popLast()),f.push(a.put(d)),f.push(s.put(S,V_))}return p.forEach((T=>{f.push(this.indexManager.addToCollectionParentIndex(e,T))})),e.addOnCommittedListener((()=>{this.Fn[c]=u.keys()})),b.waitFor(f).next((()=>u))}))}lookupMutationBatch(e,t){return zt(e).get(t).next((n=>n?(q(n.userId===this.userId),vn(this.serializer,n)):null))}Mn(e,t){return this.Fn[t]?b.resolve(this.Fn[t]):this.lookupMutationBatch(e,t).next((n=>{if(n){const i=n.keys();return this.Fn[t]=i,i}return null}))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let s=null;return zt(e).J({index:"userMutationsIndex",range:i},((a,c,u)=>{c.userId===this.userId&&(q(c.batchId>=n),s=vn(this.serializer,c)),u.done()})).next((()=>s))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=-1;return zt(e).J({index:"userMutationsIndex",range:t,reverse:!0},((i,s,a)=>{n=s.batchId,a.done()})).next((()=>n))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,-1],[this.userId,Number.POSITIVE_INFINITY]);return zt(e).U("userMutationsIndex",t).next((n=>n.map((i=>vn(this.serializer,i)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=us(this.userId,t.path),i=IDBKeyRange.lowerBound(n),s=[];return er(e).J({range:i},((a,c,u)=>{const[d,f,p]=a,T=_t(f);if(d===this.userId&&t.path.isEqual(T))return zt(e).get(p).next((S=>{if(!S)throw B();q(S.userId===this.userId),s.push(vn(this.serializer,S))}));u.done()})).next((()=>s))}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ue(J);const i=[];return t.forEach((s=>{const a=us(this.userId,s.path),c=IDBKeyRange.lowerBound(a),u=er(e).J({range:c},((d,f,p)=>{const[T,S,k]=d,D=_t(S);T===this.userId&&s.path.isEqual(D)?n=n.add(k):p.done()}));i.push(u)})),b.waitFor(i).next((()=>this.xn(e,n)))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,s=us(this.userId,n),a=IDBKeyRange.lowerBound(s);let c=new ue(J);return er(e).J({range:a},((u,d,f)=>{const[p,T,S]=u,k=_t(T);p===this.userId&&n.isPrefixOf(k)?k.length===i&&(c=c.add(S)):f.done()})).next((()=>this.xn(e,c)))}xn(e,t){const n=[],i=[];return t.forEach((s=>{i.push(zt(e).get(s).next((a=>{if(a===null)throw B();q(a.userId===this.userId),n.push(vn(this.serializer,a))})))})),b.waitFor(i).next((()=>n))}removeMutationBatch(e,t){return Td(e._e,this.userId,t).next((n=>(e.addOnCommittedListener((()=>{this.On(t.batchId)})),b.forEach(n,(i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))))}On(e){delete this.Fn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return b.resolve();const n=IDBKeyRange.lowerBound((function(a){return[a]})(this.userId)),i=[];return er(e).J({range:n},((s,a,c)=>{if(s[0]===this.userId){const u=_t(s[1]);i.push(u)}else c.done()})).next((()=>{q(i.length===0)}))}))}containsKey(e,t){return wd(e,this.userId,t)}Nn(e){return Ad(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:-1,lastStreamToken:""}))}}function wd(r,e,t){const n=us(e,t.path),i=n[1],s=IDBKeyRange.lowerBound(n);let a=!1;return er(r).J({range:s,H:!0},((c,u,d)=>{const[f,p,T]=c;f===e&&p===i&&(a=!0),d.done()})).next((()=>a))}function zt(r){return Ce(r,"mutations")}function er(r){return Ce(r,"documentMutations")}function Ad(r){return Ce(r,"mutationQueues")}/**
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
 */class Nn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new Nn(0)}static kn(){return new Nn(-1)}}/**
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
 */class Yy{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.qn(e).next((t=>{const n=new Nn(t.highestTargetId);return t.highestTargetId=n.next(),this.Qn(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.qn(e).next((t=>$.fromTimestamp(new ye(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.qn(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,n){return this.qn(e).next((i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.Qn(e,i))))}addTargetData(e,t){return this.Kn(e,t).next((()=>this.qn(e).next((n=>(n.targetCount+=1,this.$n(t,n),this.Qn(e,n))))))}updateTargetData(e,t){return this.Kn(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>Qn(e).delete(t.targetId))).next((()=>this.qn(e))).next((n=>(q(n.targetCount>0),n.targetCount-=1,this.Qn(e,n))))}removeTargets(e,t,n){let i=0;const s=[];return Qn(e).J(((a,c)=>{const u=Qr(c);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(i++,s.push(this.removeTargetData(e,u)))})).next((()=>b.waitFor(s))).next((()=>i))}forEachTarget(e,t){return Qn(e).J(((n,i)=>{const s=Qr(i);t(s)}))}qn(e){return Ju(e).get("targetGlobalKey").next((t=>(q(t!==null),t)))}Qn(e,t){return Ju(e).put("targetGlobalKey",t)}Kn(e,t){return Qn(e).put(yd(this.serializer,t))}$n(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.qn(e).next((t=>t.targetCount))}getTargetData(e,t){const n=kn(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let s=null;return Qn(e).J({range:i,index:"queryTargetsIndex"},((a,c,u)=>{const d=Qr(c);Ti(t,d.target)&&(s=d,u.done())})).next((()=>s))}addMatchingKeys(e,t,n){const i=[],s=Ht(e);return t.forEach((a=>{const c=Ge(a.path);i.push(s.put({targetId:n,path:c})),i.push(this.referenceDelegate.addReference(e,n,a))})),b.waitFor(i)}removeMatchingKeys(e,t,n){const i=Ht(e);return b.forEach(t,(s=>{const a=Ge(s.path);return b.waitFor([i.delete([n,a]),this.referenceDelegate.removeReference(e,n,s)])}))}removeMatchingKeysForTargetId(e,t){const n=Ht(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=Ht(e);let s=Z();return i.J({range:n,H:!0},((a,c,u)=>{const d=_t(a[1]),f=new F(d);s=s.add(f)})).next((()=>s))}containsKey(e,t){const n=Ge(t.path),i=IDBKeyRange.bound([n],[Th(n)],!1,!0);let s=0;return Ht(e).J({index:"documentTargetsIndex",H:!0,range:i},(([a,c],u,d)=>{a!==0&&(s++,d.done())})).next((()=>s>0))}ot(e,t){return Qn(e).get(t).next((n=>n?Qr(n):null))}}function Qn(r){return Ce(r,"targets")}function Ju(r){return Ce(r,"targetGlobal")}function Ht(r){return Ce(r,"targetDocuments")}/**
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
 */function Yu([r,e],[t,n]){const i=J(r,t);return i===0?J(e,n):i}class Xy{constructor(e){this.Un=e,this.buffer=new ue(Yu),this.Wn=0}Gn(){return++this.Wn}zn(e){const t=[e,this.Gn()];if(this.buffer.size<this.Un)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Yu(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Zy{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.jn=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Hn(6e4)}stop(){this.jn&&(this.jn.cancel(),this.jn=null)}get started(){return this.jn!==null}Hn(e){V("LruGarbageCollector",`Garbage collection scheduled in ${e}ms`),this.jn=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.jn=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){sn(t)?V("LruGarbageCollector","Ignoring IndexedDB error during garbage collection: ",t):await On(t)}await this.Hn(3e5)}))}}class eI{constructor(e,t){this.Jn=e,this.params=t}calculateTargetCount(e,t){return this.Jn.Yn(e).next((n=>Math.floor(t/100*n)))}nthSequenceNumber(e,t){if(t===0)return b.resolve(it.oe);const n=new Xy(t);return this.Jn.forEachTarget(e,(i=>n.zn(i.sequenceNumber))).next((()=>this.Jn.Zn(e,(i=>n.zn(i))))).next((()=>n.maxValue))}removeTargets(e,t,n){return this.Jn.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Jn.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(V("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(Qu)):this.getCacheSize(e).next((n=>n<this.params.cacheSizeCollectionThreshold?(V("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Qu):this.Xn(e,t)))}getCacheSize(e){return this.Jn.getCacheSize(e)}Xn(e,t){let n,i,s,a,c,u,d;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(V("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,a=Date.now(),this.nthSequenceNumber(e,i)))).next((p=>(n=p,c=Date.now(),this.removeTargets(e,n,t)))).next((p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,n)))).next((p=>(d=Date.now(),Jn()<=te.DEBUG&&V("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(c-a)+`ms
	Removed ${s} targets in `+(u-c)+`ms
	Removed ${p} documents in `+(d-u)+`ms
Total Duration: ${d-f}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p}))))}}function tI(r,e){return new eI(r,e)}/**
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
 */class nI{constructor(e,t){this.db=e,this.garbageCollector=tI(this,t)}Yn(e){const t=this.er(e);return this.db.getTargetCache().getTargetCount(e).next((n=>t.next((i=>n+i))))}er(e){let t=0;return this.Zn(e,(n=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}Zn(e,t){return this.tr(e,((n,i)=>t(i)))}addReference(e,t,n){return es(e,n)}removeReference(e,t,n){return es(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return es(e,t)}nr(e,t){return(function(i,s){let a=!1;return Ad(i).Y((c=>wd(i,c,s).next((u=>(u&&(a=!0),b.resolve(!u)))))).next((()=>a))})(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let s=0;return this.tr(e,((a,c)=>{if(c<=t){const u=this.nr(e,a).next((d=>{if(!d)return s++,n.getEntry(e,a).next((()=>(n.removeEntry(a,$.min()),Ht(e).delete((function(p){return[0,Ge(p.path)]})(a)))))}));i.push(u)}})).next((()=>b.waitFor(i))).next((()=>n.apply(e))).next((()=>s))}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return es(e,t)}tr(e,t){const n=Ht(e);let i,s=it.oe;return n.J({index:"documentTargetsIndex"},(([a,c],{path:u,sequenceNumber:d})=>{a===0?(s!==it.oe&&t(new F(_t(i)),s),s=d,i=u):s=it.oe})).next((()=>{s!==it.oe&&t(new F(_t(i)),s)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function es(r,e){return Ht(r).put((function(n,i){return{targetId:0,path:Ge(n.path),sequenceNumber:i}})(e,r.currentSequenceNumber))}/**
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
 */class bd{constructor(){this.changes=new on((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Ee.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?b.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class rI{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return gn(e).put(n)}removeEntry(e,t,n){return gn(e).delete((function(s,a){const c=s.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],Ps(a),c[c.length-1]]})(t,n))}updateMetadata(e,t){return this.getMetadata(e).next((n=>(n.byteSize+=t,this.rr(e,n))))}getEntry(e,t){let n=Ee.newInvalidDocument(t);return gn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only($r(t))},((i,s)=>{n=this.ir(t,s)})).next((()=>n))}sr(e,t){let n={size:0,document:Ee.newInvalidDocument(t)};return gn(e).J({index:"documentKeyIndex",range:IDBKeyRange.only($r(t))},((i,s)=>{n={document:this.ir(t,s),size:Vs(s)}})).next((()=>n))}getEntries(e,t){let n=Xe();return this._r(e,t,((i,s)=>{const a=this.ir(i,s);n=n.insert(i,a)})).next((()=>n))}ar(e,t){let n=Xe(),i=new ge(F.comparator);return this._r(e,t,((s,a)=>{const c=this.ir(s,a);n=n.insert(s,c),i=i.insert(s,Vs(a))})).next((()=>({documents:n,ur:i})))}_r(e,t,n){if(t.isEmpty())return b.resolve();let i=new ue(el);t.forEach((u=>i=i.add(u)));const s=IDBKeyRange.bound($r(i.first()),$r(i.last())),a=i.getIterator();let c=a.getNext();return gn(e).J({index:"documentKeyIndex",range:s},((u,d,f)=>{const p=F.fromSegments([...d.prefixPath,d.collectionGroup,d.documentId]);for(;c&&el(c,p)<0;)n(c,null),c=a.getNext();c&&c.isEqual(p)&&(n(c,d),c=a.hasNext()?a.getNext():null),c?f.$($r(c)):f.done()})).next((()=>{for(;c;)n(c,null),c=a.hasNext()?a.getNext():null}))}getDocumentsMatchingQuery(e,t,n,i,s){const a=t.path,c=[a.popLast().toArray(),a.lastSegment(),Ps(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[a.popLast().toArray(),a.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return gn(e).U(IDBKeyRange.bound(c,u,!0)).next((d=>{s?.incrementDocumentReadCount(d.length);let f=Xe();for(const p of d){const T=this.ir(F.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);T.isFoundDocument()&&(Ai(t,T)||i.has(T.key))&&(f=f.insert(T.key,T))}return f}))}getAllFromCollectionGroup(e,t,n,i){let s=Xe();const a=Zu(t,n),c=Zu(t,nt.max());return gn(e).J({index:"collectionGroupIndex",range:IDBKeyRange.bound(a,c,!0)},((u,d,f)=>{const p=this.ir(F.fromSegments(d.prefixPath.concat(d.collectionGroup,d.documentId)),d);s=s.insert(p.key,p),s.size===i&&f.done()})).next((()=>s))}newChangeBuffer(e){return new iI(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return Xu(e).get("remoteDocumentGlobalKey").next((t=>(q(!!t),t)))}rr(e,t){return Xu(e).put("remoteDocumentGlobalKey",t)}ir(e,t){if(t){const n=qy(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual($.min())))return n}return Ee.newInvalidDocument(e)}}function Rd(r){return new rI(r)}class iI extends bd{constructor(e,t){super(),this.cr=e,this.trackRemovals=t,this.lr=new on((n=>n.toString()),((n,i)=>n.isEqual(i)))}applyChanges(e){const t=[];let n=0,i=new ue(((s,a)=>J(s.canonicalString(),a.canonicalString())));return this.changes.forEach(((s,a)=>{const c=this.lr.get(s);if(t.push(this.cr.removeEntry(e,s,c.readTime)),a.isValidDocument()){const u=Fu(this.cr.serializer,a);i=i.add(s.path.popLast());const d=Vs(u);n+=d-c.size,t.push(this.cr.addEntry(e,s,u))}else if(n-=c.size,this.trackRemovals){const u=Fu(this.cr.serializer,a.convertToNoDocument($.min()));t.push(this.cr.addEntry(e,s,u))}})),i.forEach((s=>{t.push(this.cr.indexManager.addToCollectionParentIndex(e,s))})),t.push(this.cr.updateMetadata(e,n)),b.waitFor(t)}getFromCache(e,t){return this.cr.sr(e,t).next((n=>(this.lr.set(t,{size:n.size,readTime:n.document.readTime}),n.document)))}getAllFromCache(e,t){return this.cr.ar(e,t).next((({documents:n,ur:i})=>(i.forEach(((s,a)=>{this.lr.set(s,{size:a,readTime:n.get(s).readTime})})),n)))}}function Xu(r){return Ce(r,"remoteDocumentGlobal")}function gn(r){return Ce(r,"remoteDocumentsV14")}function $r(r){const e=r.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Zu(r,e){const t=e.documentKey.path.toArray();return[r,Ps(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function el(r,e){const t=r.path.toArray(),n=e.path.toArray();let i=0;for(let s=0;s<t.length-2&&s<n.length-2;++s)if(i=J(t[s],n[s]),i)return i;return i=J(t.length,n.length),i||(i=J(t[t.length-2],n[n.length-2]),i||J(t[t.length-1],n[n.length-1]))}/**
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
 */class sI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Sd{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next((i=>(n=i,this.remoteDocumentCache.getEntry(e,t)))).next((i=>(n!==null&&ni(n.mutation,i,st.empty(),ye.now()),i)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.getLocalViewOfDocuments(e,n,Z()).next((()=>n))))}getLocalViewOfDocuments(e,t,n=Z()){const i=yt();return this.populateOverlays(e,i,t).next((()=>this.computeViews(e,t,i,n).next((s=>{let a=Hr();return s.forEach(((c,u)=>{a=a.insert(c,u.overlayedDocument)})),a}))))}getOverlayedDocuments(e,t){const n=yt();return this.populateOverlays(e,n,t).next((()=>this.computeViews(e,t,n,Z())))}populateOverlays(e,t,n){const i=[];return n.forEach((s=>{t.has(s)||i.push(s)})),this.documentOverlayCache.getOverlays(e,i).next((s=>{s.forEach(((a,c)=>{t.set(a,c)}))}))}computeViews(e,t,n,i){let s=Xe();const a=ti(),c=(function(){return ti()})();return t.forEach(((u,d)=>{const f=n.get(d.key);i.has(d.key)&&(f===void 0||f.mutation instanceof an)?s=s.insert(d.key,d):f!==void 0?(a.set(d.key,f.mutation.getFieldMask()),ni(f.mutation,d,f.mutation.getFieldMask(),ye.now())):a.set(d.key,st.empty())})),this.recalculateAndSaveOverlays(e,s).next((u=>(u.forEach(((d,f)=>a.set(d,f))),t.forEach(((d,f)=>{var p;return c.set(d,new sI(f,(p=a.get(d))!==null&&p!==void 0?p:null))})),c)))}recalculateAndSaveOverlays(e,t){const n=ti();let i=new ge(((a,c)=>a-c)),s=Z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((a=>{for(const c of a)c.keys().forEach((u=>{const d=t.get(u);if(d===null)return;let f=n.get(u)||st.empty();f=c.applyToLocalView(d,f),n.set(u,f);const p=(i.get(c.batchId)||Z()).add(u);i=i.insert(c.batchId,p)}))})).next((()=>{const a=[],c=i.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),d=u.key,f=u.value,p=Hh();f.forEach((T=>{if(!s.has(T)){const S=ed(t.get(T),n.get(T));S!==null&&p.set(T,S),s=s.add(T)}})),a.push(this.documentOverlayCache.saveOverlays(e,d,p))}return b.waitFor(a)})).next((()=>n))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((n=>this.recalculateAndSaveOverlays(e,n)))}getDocumentsMatchingQuery(e,t,n,i){return(function(a){return F.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):ay(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next((s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-s.size):b.resolve(yt());let c=-1,u=s;return a.next((d=>b.forEach(d,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),s.get(f)?b.resolve():this.remoteDocumentCache.getEntry(e,f).next((T=>{u=u.insert(f,T)}))))).next((()=>this.populateOverlays(e,d,s))).next((()=>this.computeViews(e,u,d,Z()))).next((f=>({batchId:c,changes:Gh(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next((n=>{let i=Hr();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i}))}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const s=t.collectionGroup;let a=Hr();return this.indexManager.getCollectionParents(e,s).next((c=>b.forEach(c,(u=>{const d=(function(p,T){return new js(T,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,n,i).next((f=>{f.forEach(((p,T)=>{a=a.insert(p,T)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(e,t,n,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next((a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,s,i)))).next((a=>{s.forEach(((u,d)=>{const f=d.getKey();a.get(f)===null&&(a=a.insert(f,Ee.newInvalidDocument(f)))}));let c=Hr();return a.forEach(((u,d)=>{const f=s.get(u);f!==void 0&&ni(f.mutation,d,st.empty(),ye.now()),Ai(t,d)&&(c=c.insert(u,d))})),c}))}}/**
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
 */class oI{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return b.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,(function(i){return{id:i.id,version:i.version,createTime:He(i.createTime)}})(t)),b.resolve()}getNamedQuery(e,t){return b.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,(function(i){return{name:i.name,query:Id(i.bundledQuery),readTime:He(i.readTime)}})(t)),b.resolve()}}/**
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
 */class aI{constructor(){this.overlays=new ge(F.comparator),this.Ir=new Map}getOverlay(e,t){return b.resolve(this.overlays.get(t))}getOverlays(e,t){const n=yt();return b.forEach(t,(i=>this.getOverlay(e,i).next((s=>{s!==null&&n.set(i,s)})))).next((()=>n))}saveOverlays(e,t,n){return n.forEach(((i,s)=>{this.ht(e,t,s)})),b.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.Ir.get(n);return i!==void 0&&(i.forEach((s=>this.overlays=this.overlays.remove(s))),this.Ir.delete(n)),b.resolve()}getOverlaysForCollection(e,t,n){const i=yt(),s=t.length+1,a=new F(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,d=u.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&u.largestBatchId>n&&i.set(u.getKey(),u)}return b.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let s=new ge(((d,f)=>d-f));const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>n){let f=s.get(d.largestBatchId);f===null&&(f=yt(),s=s.insert(d.largestBatchId,f)),f.set(d.getKey(),d)}}const c=yt(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach(((d,f)=>c.set(d,f))),!(c.size()>=i)););return b.resolve(c)}ht(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const a=this.Ir.get(i.largestBatchId).delete(n.key);this.Ir.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(n.key,new Sa(t,n));let s=this.Ir.get(t);s===void 0&&(s=Z(),this.Ir.set(t,s)),this.Ir.set(t,s.add(n.key))}}/**
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
 */class cI{constructor(){this.sessionToken=be.EMPTY_BYTE_STRING}getSessionToken(e){return b.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,b.resolve()}}/**
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
 */class Da{constructor(){this.Tr=new ue(ke.Er),this.dr=new ue(ke.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const n=new ke(e,t);this.Tr=this.Tr.add(n),this.dr=this.dr.add(n)}Rr(e,t){e.forEach((n=>this.addReference(n,t)))}removeReference(e,t){this.Vr(new ke(e,t))}mr(e,t){e.forEach((n=>this.removeReference(n,t)))}gr(e){const t=new F(new he([])),n=new ke(t,e),i=new ke(t,e+1),s=[];return this.dr.forEachInRange([n,i],(a=>{this.Vr(a),s.push(a.key)})),s}pr(){this.Tr.forEach((e=>this.Vr(e)))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new F(new he([])),n=new ke(t,e),i=new ke(t,e+1);let s=Z();return this.dr.forEachInRange([n,i],(a=>{s=s.add(a.key)})),s}containsKey(e){const t=new ke(e,0),n=this.Tr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class ke{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return F.comparator(e.key,t.key)||J(e.wr,t.wr)}static Ar(e,t){return J(e.wr,t.wr)||F.comparator(e.key,t.key)}}/**
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
 */class uI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ue(ke.Er)}checkEmpty(e){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const s=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new ba(s,t,n,i);this.mutationQueue.push(a);for(const c of i)this.br=this.br.add(new ke(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return b.resolve(a)}lookupMutationBatch(e,t){return b.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.vr(n),s=i<0?0:i;return b.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new ke(t,0),i=new ke(t,Number.POSITIVE_INFINITY),s=[];return this.br.forEachInRange([n,i],(a=>{const c=this.Dr(a.wr);s.push(c)})),b.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ue(J);return t.forEach((i=>{const s=new ke(i,0),a=new ke(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([s,a],(c=>{n=n.add(c.wr)}))})),b.resolve(this.Cr(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let s=n;F.isDocumentKey(s)||(s=s.child(""));const a=new ke(new F(s),0);let c=new ue(J);return this.br.forEachWhile((u=>{const d=u.key.path;return!!n.isPrefixOf(d)&&(d.length===i&&(c=c.add(u.wr)),!0)}),a),b.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach((n=>{const i=this.Dr(n);i!==null&&t.push(i)})),t}removeMutationBatch(e,t){q(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let n=this.br;return b.forEach(t.mutations,(i=>{const s=new ke(i.key,t.batchId);return n=n.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)})).next((()=>{this.br=n}))}On(e){}containsKey(e,t){const n=new ke(t,0),i=this.br.firstAfterOrEqual(n);return b.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,b.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class lI{constructor(e){this.Mr=e,this.docs=(function(){return new ge(F.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),s=i?i.size:0,a=this.Mr(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return b.resolve(n?n.document.mutableCopy():Ee.newInvalidDocument(t))}getEntries(e,t){let n=Xe();return t.forEach((i=>{const s=this.docs.get(i);n=n.insert(i,s?s.document.mutableCopy():Ee.newInvalidDocument(i))})),b.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let s=Xe();const a=t.path,c=new F(a.child("")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:d,value:{document:f}}=u.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||ga(wh(f),n)<=0||(i.has(f.key)||Ai(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return b.resolve(s)}getAllFromCollectionGroup(e,t,n,i){B()}Or(e,t){return b.forEach(this.docs,(n=>t(n)))}newChangeBuffer(e){return new hI(this)}getSize(e){return b.resolve(this.size)}}class hI extends bd{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach(((n,i)=>{i.isValidDocument()?t.push(this.cr.addEntry(e,i)):this.cr.removeEntry(n)})),b.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
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
 */class dI{constructor(e){this.persistence=e,this.Nr=new on((t=>kn(t)),Ti),this.lastRemoteSnapshotVersion=$.min(),this.highestTargetId=0,this.Lr=0,this.Br=new Da,this.targetCount=0,this.kr=Nn.Bn()}forEachTarget(e,t){return this.Nr.forEach(((n,i)=>t(i))),b.resolve()}getLastRemoteSnapshotVersion(e){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return b.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.Lr&&(this.Lr=t),b.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new Nn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,b.resolve()}updateTargetData(e,t){return this.Kn(t),b.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,b.resolve()}removeTargets(e,t,n){let i=0;const s=[];return this.Nr.forEach(((a,c)=>{c.sequenceNumber<=t&&n.get(c.targetId)===null&&(this.Nr.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)})),b.waitFor(s).next((()=>i))}getTargetCount(e){return b.resolve(this.targetCount)}getTargetData(e,t){const n=this.Nr.get(t)||null;return b.resolve(n)}addMatchingKeys(e,t,n){return this.Br.Rr(t,n),b.resolve()}removeMatchingKeys(e,t,n){this.Br.mr(t,n);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach((a=>{s.push(i.markPotentiallyOrphaned(e,a))})),b.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),b.resolve()}getMatchingKeysForTargetId(e,t){const n=this.Br.yr(t);return b.resolve(n)}containsKey(e,t){return b.resolve(this.Br.containsKey(t))}}/**
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
 */class Pd{constructor(e,t){this.qr={},this.overlays={},this.Qr=new it(0),this.Kr=!1,this.Kr=!0,this.$r=new cI,this.referenceDelegate=e(this),this.Ur=new dI(this),this.indexManager=new Qy,this.remoteDocumentCache=(function(i){return new lI(i)})((n=>this.referenceDelegate.Wr(n))),this.serializer=new _d(t),this.Gr=new oI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new aI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.qr[e.toKey()];return n||(n=new uI(t,this.referenceDelegate),this.qr[e.toKey()]=n),n}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,n){V("MemoryPersistence","Starting transaction:",e);const i=new fI(this.Qr.next());return this.referenceDelegate.zr(),n(i).next((s=>this.referenceDelegate.jr(i).next((()=>s)))).toPromise().then((s=>(i.raiseOnCommittedEvent(),s)))}Hr(e,t){return b.or(Object.values(this.qr).map((n=>()=>n.containsKey(e,t))))}}class fI extends bh{constructor(e){super(),this.currentSequenceNumber=e}}class Qs{constructor(e){this.persistence=e,this.Jr=new Da,this.Yr=null}static Zr(e){return new Qs(e)}get Xr(){if(this.Yr)return this.Yr;throw B()}addReference(e,t,n){return this.Jr.addReference(n,t),this.Xr.delete(n.toString()),b.resolve()}removeReference(e,t,n){return this.Jr.removeReference(n,t),this.Xr.add(n.toString()),b.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),b.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach((i=>this.Xr.add(i.toString())));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next((i=>{i.forEach((s=>this.Xr.add(s.toString())))})).next((()=>n.removeTargetData(e,t)))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.Xr,(n=>{const i=F.fromPath(n);return this.ei(e,i).next((s=>{s||t.removeEntry(i,$.min())}))})).next((()=>(this.Yr=null,t.apply(e))))}updateLimboDocument(e,t){return this.ei(e,t).next((n=>{n?this.Xr.delete(t.toString()):this.Xr.add(t.toString())}))}Wr(e){return 0}ei(e,t){return b.or([()=>b.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
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
 */class mI{constructor(e){this.serializer=e}O(e,t,n,i){const s=new Us("createOrUpgrade",t);n<1&&i>=1&&((function(u){u.createObjectStore("owner")})(e),(function(u){u.createObjectStore("mutationQueues",{keyPath:"userId"}),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",mu,{unique:!0}),u.createObjectStore("documentMutations")})(e),tl(e),(function(u){u.createObjectStore("remoteDocuments")})(e));let a=b.resolve();return n<3&&i>=3&&(n!==0&&((function(u){u.deleteObjectStore("targetDocuments"),u.deleteObjectStore("targets"),u.deleteObjectStore("targetGlobal")})(e),tl(e)),a=a.next((()=>(function(u){const d=u.store("targetGlobal"),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:$.min().toTimestamp(),targetCount:0};return d.put("targetGlobalKey",f)})(s)))),n<4&&i>=4&&(n!==0&&(a=a.next((()=>(function(u,d){return d.store("mutations").U().next((f=>{u.deleteObjectStore("mutations"),u.createObjectStore("mutations",{keyPath:"batchId",autoIncrement:!0}).createIndex("userMutationsIndex",mu,{unique:!0});const p=d.store("mutations"),T=f.map((S=>p.put(S)));return b.waitFor(T)}))})(e,s)))),a=a.next((()=>{(function(u){u.createObjectStore("clientMetadata",{keyPath:"clientId"})})(e)}))),n<5&&i>=5&&(a=a.next((()=>this.ni(s)))),n<6&&i>=6&&(a=a.next((()=>((function(u){u.createObjectStore("remoteDocumentGlobal")})(e),this.ri(s))))),n<7&&i>=7&&(a=a.next((()=>this.ii(s)))),n<8&&i>=8&&(a=a.next((()=>this.si(e,s)))),n<9&&i>=9&&(a=a.next((()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)}))),n<10&&i>=10&&(a=a.next((()=>this.oi(s)))),n<11&&i>=11&&(a=a.next((()=>{(function(u){u.createObjectStore("bundles",{keyPath:"bundleId"})})(e),(function(u){u.createObjectStore("namedQueries",{keyPath:"name"})})(e)}))),n<12&&i>=12&&(a=a.next((()=>{(function(u){const d=u.createObjectStore("documentOverlays",{keyPath:j_});d.createIndex("collectionPathOverlayIndex",z_,{unique:!1}),d.createIndex("collectionGroupOverlayIndex",$_,{unique:!1})})(e)}))),n<13&&i>=13&&(a=a.next((()=>(function(u){const d=u.createObjectStore("remoteDocumentsV14",{keyPath:k_});d.createIndex("documentKeyIndex",D_),d.createIndex("collectionGroupIndex",x_)})(e))).next((()=>this._i(e,s))).next((()=>e.deleteObjectStore("remoteDocuments")))),n<14&&i>=14&&(a=a.next((()=>this.ai(e,s)))),n<15&&i>=15&&(a=a.next((()=>(function(u){u.createObjectStore("indexConfiguration",{keyPath:"indexId",autoIncrement:!0}).createIndex("collectionGroupIndex","collectionGroup",{unique:!1}),u.createObjectStore("indexState",{keyPath:F_}).createIndex("sequenceNumberIndex",U_,{unique:!1}),u.createObjectStore("indexEntries",{keyPath:B_}).createIndex("documentKeyIndex",q_,{unique:!1})})(e)))),n<16&&i>=16&&(a=a.next((()=>{t.objectStore("indexState").clear()})).next((()=>{t.objectStore("indexEntries").clear()}))),n<17&&i>=17&&(a=a.next((()=>{(function(u){u.createObjectStore("globals",{keyPath:"name"})})(e)}))),a}ri(e){let t=0;return e.store("remoteDocuments").J(((n,i)=>{t+=Vs(i)})).next((()=>{const n={byteSize:t};return e.store("remoteDocumentGlobal").put("remoteDocumentGlobalKey",n)}))}ni(e){const t=e.store("mutationQueues"),n=e.store("mutations");return t.U().next((i=>b.forEach(i,(s=>{const a=IDBKeyRange.bound([s.userId,-1],[s.userId,s.lastAcknowledgedBatchId]);return n.U("userMutationsIndex",a).next((c=>b.forEach(c,(u=>{q(u.userId===s.userId);const d=vn(this.serializer,u);return Td(e,s.userId,d).next((()=>{}))}))))}))))}ii(e){const t=e.store("targetDocuments"),n=e.store("remoteDocuments");return e.store("targetGlobal").get("targetGlobalKey").next((i=>{const s=[];return n.J(((a,c)=>{const u=new he(a),d=(function(p){return[0,Ge(p)]})(u);s.push(t.get(d).next((f=>f?b.resolve():(p=>t.put({targetId:0,path:Ge(p),sequenceNumber:i.highestListenSequenceNumber}))(u))))})).next((()=>b.waitFor(s)))}))}si(e,t){e.createObjectStore("collectionParents",{keyPath:L_});const n=t.store("collectionParents"),i=new ka,s=a=>{if(i.add(a)){const c=a.lastSegment(),u=a.popLast();return n.put({collectionId:c,parent:Ge(u)})}};return t.store("remoteDocuments").J({H:!0},((a,c)=>{const u=new he(a);return s(u.popLast())})).next((()=>t.store("documentMutations").J({H:!0},(([a,c,u],d)=>{const f=_t(c);return s(f.popLast())}))))}oi(e){const t=e.store("targets");return t.J(((n,i)=>{const s=Qr(i),a=yd(this.serializer,s);return t.put(a)}))}_i(e,t){const n=t.store("remoteDocuments"),i=[];return n.J(((s,a)=>{const c=t.store("remoteDocumentsV14"),u=(function(p){return p.document?new F(he.fromString(p.document.name).popFirst(5)):p.noDocument?F.fromSegments(p.noDocument.path):p.unknownDocument?F.fromSegments(p.unknownDocument.path):B()})(a).path.toArray(),d={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:a.readTime||[0,0],unknownDocument:a.unknownDocument,noDocument:a.noDocument,document:a.document,hasCommittedMutations:!!a.hasCommittedMutations};i.push(c.put(d))})).next((()=>b.waitFor(i)))}ai(e,t){const n=t.store("mutations"),i=Rd(this.serializer),s=new Pd(Qs.Zr,this.serializer.ct);return n.U().next((a=>{const c=new Map;return a.forEach((u=>{var d;let f=(d=c.get(u.userId))!==null&&d!==void 0?d:Z();vn(this.serializer,u).keys().forEach((p=>f=f.add(p))),c.set(u.userId,f)})),b.forEach(c,((u,d)=>{const f=new Oe(d),p=Hs.lt(this.serializer,f),T=s.getIndexManager(f),S=Ws.lt(f,this.serializer,T,s.referenceDelegate);return new Sd(i,S,p,T).recalculateAndSaveOverlaysForDocumentKeys(new Lo(t,it.oe),u).next()}))}))}}function tl(r){r.createObjectStore("targetDocuments",{keyPath:O_}).createIndex("documentTargetsIndex",M_,{unique:!0}),r.createObjectStore("targets",{keyPath:"targetId"}).createIndex("queryTargetsIndex",N_,{unique:!0}),r.createObjectStore("targetGlobal")}const wo="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";class xa{constructor(e,t,n,i,s,a,c,u,d,f,p=17){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.ui=s,this.window=a,this.document=c,this.ci=d,this.li=f,this.hi=p,this.Qr=null,this.Kr=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Pi=null,this.inForeground=!1,this.Ii=null,this.Ti=null,this.Ei=Number.NEGATIVE_INFINITY,this.di=T=>Promise.resolve(),!xa.D())throw new U(C.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new nI(this,i),this.Ai=t+"main",this.serializer=new _d(u),this.Ri=new Zt(this.Ai,this.hi,new mI(this.serializer)),this.$r=new zy,this.Ur=new Yy(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Rd(this.serializer),this.Gr=new jy,this.window&&this.window.localStorage?this.Vi=this.window.localStorage:(this.Vi=null,f===!1&&Ke("IndexedDbPersistence","LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.mi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new U(C.FAILED_PRECONDITION,wo);return this.fi(),this.gi(),this.pi(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Ur.getHighestSequenceNumber(e)))})).then((e=>{this.Qr=new it(e,this.ci)})).then((()=>{this.Kr=!0})).catch((e=>(this.Ri&&this.Ri.close(),Promise.reject(e))))}yi(e){return this.di=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ri.L((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.ui.enqueueAndForget((async()=>{this.started&&await this.mi()})))}mi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>ts(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.wi(e).next((t=>{t||(this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))))}))})).next((()=>this.Si(e))).next((t=>this.isPrimary&&!t?this.bi(e).next((()=>!1)):!!t&&this.Di(e).next((()=>!0)))))).catch((e=>{if(sn(e))return V("IndexedDbPersistence","Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return V("IndexedDbPersistence","Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.ui.enqueueRetryable((()=>this.di(e))),this.isPrimary=e}))}wi(e){return Kr(e).get("owner").next((t=>b.resolve(this.vi(t))))}Ci(e){return ts(e).delete(this.clientId)}async Fi(){if(this.isPrimary&&!this.Mi(this.Ei,18e5)){this.Ei=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const n=Ce(t,"clientMetadata");return n.U().next((i=>{const s=this.xi(i,18e5),a=i.filter((c=>s.indexOf(c)===-1));return b.forEach(a,(c=>n.delete(c.clientId))).next((()=>a))}))})).catch((()=>[]));if(this.Vi)for(const t of e)this.Vi.removeItem(this.Oi(t.clientId))}}pi(){this.Ti=this.ui.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.mi().then((()=>this.Fi())).then((()=>this.pi()))))}vi(e){return!!e&&e.ownerId===this.clientId}Si(e){return this.li?b.resolve(!0):Kr(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)){if(this.vi(t)&&this.networkEnabled)return!0;if(!this.vi(t)){if(!t.allowTabSynchronization)throw new U(C.FAILED_PRECONDITION,wo);return!1}}return!(!this.networkEnabled||!this.inForeground)||ts(e).U().next((n=>this.xi(n,5e3).find((i=>{if(this.clientId!==i.clientId){const s=!this.networkEnabled&&i.networkEnabled,a=!this.inForeground&&i.inForeground,c=this.networkEnabled===i.networkEnabled;if(s||a&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&V("IndexedDbPersistence",`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.Kr=!1,this.Li(),this.Ti&&(this.Ti.cancel(),this.Ti=null),this.Bi(),this.ki(),await this.Ri.runTransaction("shutdown","readwrite",["owner","clientMetadata"],(e=>{const t=new Lo(e,it.oe);return this.bi(t).next((()=>this.Ci(t)))})),this.Ri.close(),this.qi()}xi(e,t){return e.filter((n=>this.Mi(n.updateTimeMs,t)&&!this.Ni(n.clientId)))}Qi(){return this.runTransaction("getActiveClients","readonly",(e=>ts(e).U().next((t=>this.xi(t,18e5).map((n=>n.clientId))))))}get started(){return this.Kr}getGlobalsCache(){return this.$r}getMutationQueue(e,t){return Ws.lt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new Jy(e,this.serializer.ct.databaseId)}getDocumentOverlayCache(e){return Hs.lt(this.serializer,e)}getBundleCache(){return this.Gr}runTransaction(e,t,n){V("IndexedDbPersistence","Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",s=(function(u){return u===17?H_:u===16?G_:u===15?ya:u===14?Vh:u===13?Ch:u===12?K_:u===11?Ph:void B()})(this.hi);let a;return this.Ri.runTransaction(e,i,s,(c=>(a=new Lo(c,this.Qr?this.Qr.next():it.oe),t==="readwrite-primary"?this.wi(a).next((u=>!!u||this.Si(a))).next((u=>{if(!u)throw Ke(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.ui.enqueueRetryable((()=>this.di(!1))),new U(C.FAILED_PRECONDITION,Ah);return n(a)})).next((u=>this.Di(a).next((()=>u)))):this.Ki(a).next((()=>n(a)))))).then((c=>(a.raiseOnCommittedEvent(),c)))}Ki(e){return Kr(e).get("owner").next((t=>{if(t!==null&&this.Mi(t.leaseTimestampMs,5e3)&&!this.Ni(t.ownerId)&&!this.vi(t)&&!(this.li||this.allowTabSynchronization&&t.allowTabSynchronization))throw new U(C.FAILED_PRECONDITION,wo)}))}Di(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Kr(e).put("owner",t)}static D(){return Zt.D()}bi(e){const t=Kr(e);return t.get("owner").next((n=>this.vi(n)?(V("IndexedDbPersistence","Releasing primary lease."),t.delete("owner")):b.resolve()))}Mi(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(Ke(`Detected an update time that is in the future: ${e} > ${n}`),!1))}fi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Ii=()=>{this.ui.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.mi())))},this.document.addEventListener("visibilitychange",this.Ii),this.inForeground=this.document.visibilityState==="visible")}Bi(){this.Ii&&(this.document.removeEventListener("visibilitychange",this.Ii),this.Ii=null)}gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Pi=()=>{this.Li();const t=/(?:Version|Mobile)\/1[456]/;Sl()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.ui.enterRestrictedMode(!0),this.ui.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Pi))}ki(){this.Pi&&(this.window.removeEventListener("pagehide",this.Pi),this.Pi=null)}Ni(e){var t;try{const n=((t=this.Vi)===null||t===void 0?void 0:t.getItem(this.Oi(e)))!==null;return V("IndexedDbPersistence",`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Ke("IndexedDbPersistence","Failed to get zombied client id.",n),!1}}Li(){if(this.Vi)try{this.Vi.setItem(this.Oi(this.clientId),String(Date.now()))}catch(e){Ke("Failed to set zombie client id.",e)}}qi(){if(this.Vi)try{this.Vi.removeItem(this.Oi(this.clientId))}catch{}}Oi(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Kr(r){return Ce(r,"owner")}function ts(r){return Ce(r,"clientMetadata")}function pI(r,e){let t=r.projectId;return r.isDefaultDatabase||(t+="."+r.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class Na{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.$i=n,this.Ui=i}static Wi(e,t){let n=Z(),i=Z();for(const s of t.docChanges)switch(s.type){case 0:n=n.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new Na(e,t.fromCache,n,i)}}/**
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
 */class gI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Cd{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=(function(){return Sl()?8:Rh(Pe())>0?6:4})()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,n,i){const s={result:null};return this.Yi(e,t).next((a=>{s.result=a})).next((()=>{if(!s.result)return this.Zi(e,t,i,n).next((a=>{s.result=a}))})).next((()=>{if(s.result)return;const a=new gI;return this.Xi(e,t,a).next((c=>{if(s.result=c,this.zi)return this.es(e,t,a,c.size)}))})).next((()=>s.result))}es(e,t,n,i){return n.documentReadCount<this.ji?(Jn()<=te.DEBUG&&V("QueryEngine","SDK will not create cache indexes for query:",Yn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),b.resolve()):(Jn()<=te.DEBUG&&V("QueryEngine","Query:",Yn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.Hi*i?(Jn()<=te.DEBUG&&V("QueryEngine","The SDK decides to create cache indexes for query:",Yn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ot(t))):b.resolve())}Yi(e,t){if(Su(t))return b.resolve(null);let n=ot(t);return this.indexManager.getIndexType(e,n).next((i=>i===0?null:(t.limit!==null&&i===1&&(t=zo(t,null,"F"),n=ot(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next((s=>{const a=Z(...s);return this.Ji.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,n).next((u=>{const d=this.ts(t,c);return this.ns(t,d,a,u.readTime)?this.Yi(e,zo(t,null,"F")):this.rs(e,d,t,u)}))))})))))}Zi(e,t,n,i){return Su(t)||i.isEqual($.min())?b.resolve(null):this.Ji.getDocuments(e,n).next((s=>{const a=this.ts(t,s);return this.ns(t,a,n,i)?b.resolve(null):(Jn()<=te.DEBUG&&V("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Yn(t)),this.rs(e,a,t,w_(i,-1)).next((c=>c)))}))}ts(e,t){let n=new ue($h(e));return t.forEach(((i,s)=>{Ai(e,s)&&(n=n.add(s))})),n}ns(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}Xi(e,t,n){return Jn()<=te.DEBUG&&V("QueryEngine","Using full collection scan to execute query:",Yn(t)),this.Ji.getDocumentsMatchingQuery(e,t,nt.min(),n)}rs(e,t,n,i){return this.Ji.getDocumentsMatchingQuery(e,n,i).next((s=>(t.forEach((a=>{s=s.insert(a.key,a)})),s)))}}/**
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
 */class _I{constructor(e,t,n,i){this.persistence=e,this.ss=t,this.serializer=i,this.os=new ge(J),this._s=new on((s=>kn(s)),Ti),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(n)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Sd(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.os)))}}function Vd(r,e,t,n){return new _I(r,e,t,n)}async function kd(r,e){const t=Q(r);return await t.persistence.runTransaction("Handle user change","readonly",(n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next((s=>(i=s,t.ls(e),t.mutationQueue.getAllMutationBatches(n)))).next((s=>{const a=[],c=[];let u=Z();for(const d of i){a.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}for(const d of s){c.push(d.batchId);for(const f of d.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next((d=>({hs:d,removedBatchIds:a,addedBatchIds:c})))}))}))}function yI(r,e){const t=Q(r);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(n=>{const i=e.batch.keys(),s=t.cs.newChangeBuffer({trackRemovals:!0});return(function(c,u,d,f){const p=d.batch,T=p.keys();let S=b.resolve();return T.forEach((k=>{S=S.next((()=>f.getEntry(u,k))).next((D=>{const x=d.docVersions.get(k);q(x!==null),D.version.compareTo(x)<0&&(p.applyToRemoteDocument(D,d),D.isValidDocument()&&(D.setReadTime(d.commitVersion),f.addEntry(D)))}))})),S.next((()=>c.mutationQueue.removeMutationBatch(u,p)))})(t,n,e,s).next((()=>s.apply(n))).next((()=>t.mutationQueue.performConsistencyCheck(n))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,(function(c){let u=Z();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(u=u.add(c.batch.mutations[d].key));return u})(e)))).next((()=>t.localDocuments.getDocuments(n,i)))}))}function Dd(r){const e=Q(r);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Ur.getLastRemoteSnapshotVersion(t)))}function II(r,e){const t=Q(r),n=e.snapshotVersion;let i=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(s=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});i=t.os;const c=[];e.targetChanges.forEach(((f,p)=>{const T=i.get(p);if(!T)return;c.push(t.Ur.removeMatchingKeys(s,f.removedDocuments,p).next((()=>t.Ur.addMatchingKeys(s,f.addedDocuments,p))));let S=T.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?S=S.withResumeToken(be.EMPTY_BYTE_STRING,$.min()).withLastLimboFreeSnapshotVersion($.min()):f.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(f.resumeToken,n)),i=i.insert(p,S),(function(D,x,z){return D.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-D.snapshotVersion.toMicroseconds()>=3e8?!0:z.addedDocuments.size+z.modifiedDocuments.size+z.removedDocuments.size>0})(T,S,f)&&c.push(t.Ur.updateTargetData(s,S))}));let u=Xe(),d=Z();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))})),c.push(vI(s,a,e.documentUpdates).next((f=>{u=f.Ps,d=f.Is}))),!n.isEqual($.min())){const f=t.Ur.getLastRemoteSnapshotVersion(s).next((p=>t.Ur.setTargetsMetadata(s,s.currentSequenceNumber,n)));c.push(f)}return b.waitFor(c).next((()=>a.apply(s))).next((()=>t.localDocuments.getLocalViewOfDocuments(s,u,d))).next((()=>u))})).then((s=>(t.os=i,s)))}function vI(r,e,t){let n=Z(),i=Z();return t.forEach((s=>n=n.add(s))),e.getEntries(r,n).next((s=>{let a=Xe();return t.forEach(((c,u)=>{const d=s.get(c);u.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),u.isNoDocument()&&u.version.isEqual($.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!d.isValidDocument()||u.version.compareTo(d.version)>0||u.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):V("LocalStore","Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",u.version)})),{Ps:a,Is:i}}))}function EI(r,e){const t=Q(r);return t.persistence.runTransaction("Get next mutation batch","readonly",(n=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e))))}function TI(r,e){const t=Q(r);return t.persistence.runTransaction("Allocate target","readwrite",(n=>{let i;return t.Ur.getTargetData(n,e).next((s=>s?(i=s,b.resolve(i)):t.Ur.allocateTargetId(n).next((a=>(i=new Ct(e,a,"TargetPurposeListen",n.currentSequenceNumber),t.Ur.addTargetData(n,i).next((()=>i)))))))})).then((n=>{const i=t.os.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.os=t.os.insert(n.targetId,n),t._s.set(e,n.targetId)),n}))}async function Yo(r,e,t){const n=Q(r),i=n.os.get(e),s=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",s,(a=>n.persistence.referenceDelegate.removeTarget(a,i)))}catch(a){if(!sn(a))throw a;V("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}n.os=n.os.remove(e),n._s.delete(i.target)}function nl(r,e,t){const n=Q(r);let i=$.min(),s=Z();return n.persistence.runTransaction("Execute query","readwrite",(a=>(function(u,d,f){const p=Q(u),T=p._s.get(f);return T!==void 0?b.resolve(p.os.get(T)):p.Ur.getTargetData(d,f)})(n,a,ot(e)).next((c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,n.Ur.getMatchingKeysForTargetId(a,c.targetId).next((u=>{s=u}))})).next((()=>n.ss.getDocumentsMatchingQuery(a,e,t?i:$.min(),t?s:Z()))).next((c=>(wI(n,uy(e),c),{documents:c,Ts:s})))))}function wI(r,e,t){let n=r.us.get(e)||$.min();t.forEach(((i,s)=>{s.readTime.compareTo(n)>0&&(n=s.readTime)})),r.us.set(e,n)}class rl{constructor(){this.activeTargetIds=py()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class xd{constructor(){this.so=new rl,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,n){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new rl,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class AI{_o(e){}shutdown(){}}/**
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
 */class il{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){V("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){V("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let ns=null;function Ao(){return ns===null?ns=(function(){return 268435456+Math.round(2147483648*Math.random())})():ns++,"0x"+ns.toString(16)}/**
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
 */const bI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class RI{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
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
 */const qe="WebChannelConnection";class SI extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const n=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Do=n+"://"+t.host,this.vo=`projects/${i}/databases/${s}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${s}`}get Fo(){return!1}Mo(t,n,i,s,a){const c=Ao(),u=this.xo(t,n.toUriEncodedString());V("RestConnection",`Sending RPC '${t}' ${c}:`,u,i);const d={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(d,s,a),this.No(t,u,d,i).then((f=>(V("RestConnection",`Received RPC '${t}' ${c}: `,f),f)),(f=>{throw ar("RestConnection",`RPC '${t}' ${c} failed with error: `,f,"url: ",u,"request:",i),f}))}Lo(t,n,i,s,a,c){return this.Mo(t,n,i,s,a)}Oo(t,n,i){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Er})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach(((s,a)=>t[a]=s)),i&&i.headers.forEach(((s,a)=>t[a]=s))}xo(t,n){const i=bI[t];return`${this.Do}/v1/${n}:${i}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,n,i){const s=Ao();return new Promise(((a,c)=>{const u=new ph;u.setWithCredentials(!0),u.listenOnce(gh.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case as.NO_ERROR:const f=u.getResponseJson();V(qe,`XHR for RPC '${e}' ${s} received:`,JSON.stringify(f)),a(f);break;case as.TIMEOUT:V(qe,`RPC '${e}' ${s} timed out`),c(new U(C.DEADLINE_EXCEEDED,"Request time out"));break;case as.HTTP_ERROR:const p=u.getStatus();if(V(qe,`RPC '${e}' ${s} failed with status:`,p,"response text:",u.getResponseText()),p>0){let T=u.getResponseJson();Array.isArray(T)&&(T=T[0]);const S=T?.error;if(S&&S.status&&S.message){const k=(function(x){const z=x.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(z)>=0?z:C.UNKNOWN})(S.status);c(new U(k,S.message))}else c(new U(C.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new U(C.UNAVAILABLE,"Connection failed."));break;default:B()}}finally{V(qe,`RPC '${e}' ${s} completed.`)}}));const d=JSON.stringify(i);V(qe,`RPC '${e}' ${s} sending request:`,i),u.send(t,"POST",d,n,15)}))}Bo(e,t,n){const i=Ao(),s=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Ih(),c=yh(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(u.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const f=s.join("");V(qe,`Creating RPC '${e}' stream ${i}: ${f}`,u);const p=a.createWebChannel(f,u);let T=!1,S=!1;const k=new RI({Io:x=>{S?V(qe,`Not sending because RPC '${e}' stream ${i} is closed:`,x):(T||(V(qe,`Opening RPC '${e}' stream ${i} transport.`),p.open(),T=!0),V(qe,`RPC '${e}' stream ${i} sending:`,x),p.send(x))},To:()=>p.close()}),D=(x,z,K)=>{x.listen(z,(j=>{try{K(j)}catch(X){setTimeout((()=>{throw X}),0)}}))};return D(p,Gr.EventType.OPEN,(()=>{S||(V(qe,`RPC '${e}' stream ${i} transport opened.`),k.yo())})),D(p,Gr.EventType.CLOSE,(()=>{S||(S=!0,V(qe,`RPC '${e}' stream ${i} transport closed`),k.So())})),D(p,Gr.EventType.ERROR,(x=>{S||(S=!0,ar(qe,`RPC '${e}' stream ${i} transport errored:`,x),k.So(new U(C.UNAVAILABLE,"The operation could not be completed")))})),D(p,Gr.EventType.MESSAGE,(x=>{var z;if(!S){const K=x.data[0];q(!!K);const j=K,X=j.error||((z=j[0])===null||z===void 0?void 0:z.error);if(X){V(qe,`RPC '${e}' stream ${i} received error:`,X);const se=X.status;let Y=(function(y){const v=Ae[y];if(v!==void 0)return rd(v)})(se),I=X.message;Y===void 0&&(Y=C.INTERNAL,I="Unknown error status: "+se+" with message "+X.message),S=!0,k.So(new U(Y,I)),p.close()}else V(qe,`RPC '${e}' stream ${i} received:`,K),k.bo(K)}})),D(c,_h.STAT_EVENT,(x=>{x.stat===Oo.PROXY?V(qe,`RPC '${e}' stream ${i} detected buffering proxy`):x.stat===Oo.NOPROXY&&V(qe,`RPC '${e}' stream ${i} detected no buffering proxy`)})),setTimeout((()=>{k.wo()}),0),k}}/**
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
 */function PI(){return typeof window<"u"?window:null}function ms(){return typeof document<"u"?document:null}/**
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
 */function Js(r){return new ky(r,!0)}/**
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
 */class Nd{constructor(e,t,n=1e3,i=1.5,s=6e4){this.ui=e,this.timerId=t,this.ko=n,this.qo=i,this.Qo=s,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),n=Math.max(0,Date.now()-this.Uo),i=Math.max(0,t-n);i>0&&V("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,(()=>(this.Uo=Date.now(),e()))),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
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
 */class Od{constructor(e,t,n,i,s,a,c,u){this.ui=e,this.Ho=n,this.Jo=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Nd(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,(()=>this.__())))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(Ke(t.toString()),Ke("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([n,i])=>{this.Yo===t&&this.P_(n,i)}),(n=>{e((()=>{const i=new U(C.UNKNOWN,"Fetching auth token failed: "+n.message);return this.I_(i)}))}))}P_(e,t){const n=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo((()=>{n((()=>this.listener.Eo()))})),this.stream.Ro((()=>{n((()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,(()=>(this.r_()&&(this.state=3),Promise.resolve()))),this.listener.Ro())))})),this.stream.mo((i=>{n((()=>this.I_(i)))})),this.stream.onMessage((i=>{n((()=>++this.e_==1?this.E_(i):this.onNext(i)))}))}i_(){this.state=5,this.t_.Go((async()=>{this.state=0,this.start()}))}I_(e){return V("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget((()=>this.Yo===e?t():(V("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class CI extends Od{constructor(e,t,n,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,a),this.serializer=s}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=Ny(this.serializer,e),n=(function(s){if(!("targetChange"in s))return $.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?$.min():a.readTime?He(a.readTime):$.min()})(e);return this.listener.d_(t,n)}A_(e){const t={};t.database=Go(this.serializer),t.addTarget=(function(s,a){let c;const u=a.target;if(c=As(u)?{documents:hd(s,u)}:{query:dd(s,u)._t},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=od(s,a.resumeToken);const d=$o(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo($.min())>0){c.readTime=pr(s,a.snapshotVersion.toTimestamp());const d=$o(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c})(this.serializer,e);const n=My(this.serializer,e);n&&(t.labels=n),this.a_(t)}R_(e){const t={};t.database=Go(this.serializer),t.removeTarget=e,this.a_(t)}}class VI extends Od{constructor(e,t,n,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,a),this.serializer=s}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return q(!!e.streamToken),this.lastStreamToken=e.streamToken,q(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){q(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=Oy(e.writeResults,e.commitTime),n=He(e.commitTime);return this.listener.g_(n,t)}p_(){const e={};e.database=Go(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map((n=>Ss(this.serializer,n)))};this.a_(t)}}/**
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
 */class kI extends class{}{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new U(C.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,n,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,a])=>this.connection.Mo(e,Ko(t,n),i,s,a))).catch((s=>{throw s.name==="FirebaseError"?(s.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new U(C.UNKNOWN,s.toString())}))}Lo(e,t,n,i,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,c])=>this.connection.Lo(e,Ko(t,n),i,a,c,s))).catch((a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new U(C.UNKNOWN,a.toString())}))}terminate(){this.y_=!0,this.connection.terminate()}}class DI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve()))))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(Ke(t),this.D_=!1):V("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
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
 */class xI{constructor(e,t,n,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=s,this.k_._o((a=>{n.enqueueAndForget((async()=>{Mn(this)&&(V("RemoteStore","Restarting streams for network reachability change."),await(async function(u){const d=Q(u);d.L_.add(4),await Ri(d),d.q_.set("Unknown"),d.L_.delete(4),await Ys(d)})(this))}))})),this.q_=new DI(n,i)}}async function Ys(r){if(Mn(r))for(const e of r.B_)await e(!0)}async function Ri(r){for(const e of r.B_)await e(!1)}function Md(r,e){const t=Q(r);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),Fa(t)?La(t):Ar(t).r_()&&Ma(t,e))}function Oa(r,e){const t=Q(r),n=Ar(t);t.N_.delete(e),n.r_()&&Ld(t,e),t.N_.size===0&&(n.r_()?n.o_():Mn(t)&&t.q_.set("Unknown"))}function Ma(r,e){if(r.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo($.min())>0){const t=r.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ar(r).A_(e)}function Ld(r,e){r.Q_.xe(e),Ar(r).R_(e)}function La(r){r.Q_=new Sy({getRemoteKeysForTarget:e=>r.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>r.N_.get(e)||null,tt:()=>r.datastore.serializer.databaseId}),Ar(r).start(),r.q_.v_()}function Fa(r){return Mn(r)&&!Ar(r).n_()&&r.N_.size>0}function Mn(r){return Q(r).L_.size===0}function Fd(r){r.Q_=void 0}async function NI(r){r.q_.set("Online")}async function OI(r){r.N_.forEach(((e,t)=>{Ma(r,e)}))}async function MI(r,e){Fd(r),Fa(r)?(r.q_.M_(e),La(r)):r.q_.set("Unknown")}async function LI(r,e,t){if(r.q_.set("Online"),e instanceof sd&&e.state===2&&e.cause)try{await(async function(i,s){const a=s.cause;for(const c of s.targetIds)i.N_.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.N_.delete(c),i.Q_.removeTarget(c))})(r,e)}catch(n){V("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),n),await ks(r,n)}else if(e instanceof fs?r.Q_.Ke(e):e instanceof id?r.Q_.He(e):r.Q_.We(e),!t.isEqual($.min()))try{const n=await Dd(r.localStore);t.compareTo(n)>=0&&await(function(s,a){const c=s.Q_.rt(a);return c.targetChanges.forEach(((u,d)=>{if(u.resumeToken.approximateByteSize()>0){const f=s.N_.get(d);f&&s.N_.set(d,f.withResumeToken(u.resumeToken,a))}})),c.targetMismatches.forEach(((u,d)=>{const f=s.N_.get(u);if(!f)return;s.N_.set(u,f.withResumeToken(be.EMPTY_BYTE_STRING,f.snapshotVersion)),Ld(s,u);const p=new Ct(f.target,u,d,f.sequenceNumber);Ma(s,p)})),s.remoteSyncer.applyRemoteEvent(c)})(r,t)}catch(n){V("RemoteStore","Failed to raise snapshot:",n),await ks(r,n)}}async function ks(r,e,t){if(!sn(e))throw e;r.L_.add(1),await Ri(r),r.q_.set("Offline"),t||(t=()=>Dd(r.localStore)),r.asyncQueue.enqueueRetryable((async()=>{V("RemoteStore","Retrying IndexedDB access"),await t(),r.L_.delete(1),await Ys(r)}))}function Ud(r,e){return e().catch((t=>ks(r,t,e)))}async function Si(r){const e=Q(r),t=rn(e);let n=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;FI(e);)try{const i=await EI(e.localStore,n);if(i===null){e.O_.length===0&&t.o_();break}n=i.batchId,UI(e,i)}catch(i){await ks(e,i)}Bd(e)&&qd(e)}function FI(r){return Mn(r)&&r.O_.length<10}function UI(r,e){r.O_.push(e);const t=rn(r);t.r_()&&t.V_&&t.m_(e.mutations)}function Bd(r){return Mn(r)&&!rn(r).n_()&&r.O_.length>0}function qd(r){rn(r).start()}async function BI(r){rn(r).p_()}async function qI(r){const e=rn(r);for(const t of r.O_)e.m_(t.mutations)}async function jI(r,e,t){const n=r.O_.shift(),i=Ra.from(n,e,t);await Ud(r,(()=>r.remoteSyncer.applySuccessfulWrite(i))),await Si(r)}async function zI(r,e){e&&rn(r).V_&&await(async function(n,i){if((function(a){return Ay(a)&&a!==C.ABORTED})(i.code)){const s=n.O_.shift();rn(n).s_(),await Ud(n,(()=>n.remoteSyncer.rejectFailedWrite(s.batchId,i))),await Si(n)}})(r,e),Bd(r)&&qd(r)}async function sl(r,e){const t=Q(r);t.asyncQueue.verifyOperationInProgress(),V("RemoteStore","RemoteStore received new credentials");const n=Mn(t);t.L_.add(3),await Ri(t),n&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Ys(t)}async function $I(r,e){const t=Q(r);e?(t.L_.delete(2),await Ys(t)):e||(t.L_.add(2),await Ri(t),t.q_.set("Unknown"))}function Ar(r){return r.K_||(r.K_=(function(t,n,i){const s=Q(t);return s.w_(),new CI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(r.datastore,r.asyncQueue,{Eo:NI.bind(null,r),Ro:OI.bind(null,r),mo:MI.bind(null,r),d_:LI.bind(null,r)}),r.B_.push((async e=>{e?(r.K_.s_(),Fa(r)?La(r):r.q_.set("Unknown")):(await r.K_.stop(),Fd(r))}))),r.K_}function rn(r){return r.U_||(r.U_=(function(t,n,i){const s=Q(t);return s.w_(),new VI(n,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)})(r.datastore,r.asyncQueue,{Eo:()=>Promise.resolve(),Ro:BI.bind(null,r),mo:zI.bind(null,r),f_:qI.bind(null,r),g_:jI.bind(null,r)}),r.B_.push((async e=>{e?(r.U_.s_(),await Si(r)):(await r.U_.stop(),r.O_.length>0&&(V("RemoteStore",`Stopping write stream with ${r.O_.length} pending writes`),r.O_=[]))}))),r.U_}/**
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
 */class Ua{constructor(e,t,n,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=s,this.deferred=new Vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,s){const a=Date.now()+n,c=new Ua(e,t,a,i,s);return c.start(n),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ba(r,e){if(Ke("AsyncQueue",`${e}: ${r}`),sn(r))return new U(C.UNAVAILABLE,`${e}: ${r}`);throw r}/**
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
 */class ir{constructor(e){this.comparator=e?(t,n)=>e(t,n)||F.comparator(t.key,n.key):(t,n)=>F.comparator(t.key,n.key),this.keyedMap=Hr(),this.sortedSet=new ge(this.comparator)}static emptySet(e){return new ir(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,n)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ir)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=n.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new ir;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
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
 */class ol{constructor(){this.W_=new ge(F.comparator)}track(e){const t=e.doc.key,n=this.W_.get(t);n?e.type!==0&&n.type===3?this.W_=this.W_.insert(t,e):e.type===3&&n.type!==1?this.W_=this.W_.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.W_=this.W_.remove(t):e.type===1&&n.type===2?this.W_=this.W_.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):B():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal(((t,n)=>{e.push(n)})),e}}class gr{constructor(e,t,n,i,s,a,c,u,d){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=d}static fromInitialDocuments(e,t,n,i,s){const a=[];return t.forEach((c=>{a.push({type:0,doc:c})})),new gr(e,t,ir.emptySet(t),a,n,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&zs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
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
 */class KI{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some((e=>e.J_()))}}class GI{constructor(){this.queries=al(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,n){const i=Q(t),s=i.queries;i.queries=al(),s.forEach(((a,c)=>{for(const u of c.j_)u.onError(n)}))})(this,new U(C.ABORTED,"Firestore shutting down"))}}function al(){return new on((r=>zh(r)),zs)}async function jd(r,e){const t=Q(r);let n=3;const i=e.query;let s=t.queries.get(i);s?!s.H_()&&e.J_()&&(n=2):(s=new KI,n=e.J_()?0:1);try{switch(n){case 0:s.z_=await t.onListen(i,!0);break;case 1:s.z_=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const c=Ba(a,`Initialization of query '${Yn(e.query)}' failed`);return void e.onError(c)}t.queries.set(i,s),s.j_.push(e),e.Z_(t.onlineState),s.z_&&e.X_(s.z_)&&qa(t)}async function zd(r,e){const t=Q(r),n=e.query;let i=3;const s=t.queries.get(n);if(s){const a=s.j_.indexOf(e);a>=0&&(s.j_.splice(a,1),s.j_.length===0?i=e.J_()?0:1:!s.H_()&&e.J_()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function HI(r,e){const t=Q(r);let n=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const c of a.j_)c.X_(i)&&(n=!0);a.z_=i}}n&&qa(t)}function WI(r,e,t){const n=Q(r),i=n.queries.get(e);if(i)for(const s of i.j_)s.onError(t);n.queries.delete(e)}function qa(r){r.Y_.forEach((e=>{e.next()}))}var Xo,cl;(cl=Xo||(Xo={})).ea="default",cl.Cache="cache";class $d{constructor(e,t,n){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=n||{}}X_(e){if(!this.options.includeMetadataChanges){const n=[];for(const i of e.docChanges)i.type!==3&&n.push(i);e=new gr(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const n=t!=="Offline";return(!this.options._a||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=gr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==Xo.Cache}}/**
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
 */class Kd{constructor(e){this.key=e}}class Gd{constructor(e){this.key=e}}class QI{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Z(),this.mutatedKeys=Z(),this.Aa=$h(e),this.Ra=new ir(this.Aa)}get Va(){return this.Ta}ma(e,t){const n=t?t.fa:new ol,i=t?t.Ra:this.Ra;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal(((f,p)=>{const T=i.get(f),S=Ai(this.query,p)?p:null,k=!!T&&this.mutatedKeys.has(T.key),D=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations);let x=!1;T&&S?T.data.isEqual(S.data)?k!==D&&(n.track({type:3,doc:S}),x=!0):this.ga(T,S)||(n.track({type:2,doc:S}),x=!0,(u&&this.Aa(S,u)>0||d&&this.Aa(S,d)<0)&&(c=!0)):!T&&S?(n.track({type:0,doc:S}),x=!0):T&&!S&&(n.track({type:1,doc:T}),x=!0,(u||d)&&(c=!0)),x&&(S?(a=a.add(S),s=D?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),n.track({type:1,doc:f})}return{Ra:a,fa:n,ns:c,mutatedKeys:s}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const s=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort(((f,p)=>(function(S,k){const D=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B()}};return D(S)-D(k)})(f.type,p.type)||this.Aa(f.doc,p.doc))),this.pa(n),i=i!=null&&i;const c=t&&!i?this.ya():[],u=this.da.size===0&&this.current&&!i?1:0,d=u!==this.Ea;return this.Ea=u,a.length!==0||d?{snapshot:new gr(this.query,e.Ra,s,a,e.mutatedKeys,u===0,d,!1,!!n&&n.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new ol,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach((t=>this.Ta=this.Ta.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ta=this.Ta.delete(t))),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Z(),this.Ra.forEach((n=>{this.Sa(n.key)&&(this.da=this.da.add(n.key))}));const t=[];return e.forEach((n=>{this.da.has(n)||t.push(new Gd(n))})),this.da.forEach((n=>{e.has(n)||t.push(new Kd(n))})),t}ba(e){this.Ta=e.Ts,this.da=Z();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return gr.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class JI{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class YI{constructor(e){this.key=e,this.va=!1}}class XI{constructor(e,t,n,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new on((c=>zh(c)),zs),this.Ma=new Map,this.xa=new Set,this.Oa=new ge(F.comparator),this.Na=new Map,this.La=new Da,this.Ba={},this.ka=new Map,this.qa=Nn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function ZI(r,e,t=!0){const n=Xd(r);let i;const s=n.Fa.get(e);return s?(n.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Da()):i=await Hd(n,e,t,!0),i}async function ev(r,e){const t=Xd(r);await Hd(t,e,!0,!1)}async function Hd(r,e,t,n){const i=await TI(r.localStore,ot(e)),s=i.targetId,a=r.sharedClientState.addLocalQueryTarget(s,t);let c;return n&&(c=await tv(r,e,s,a==="current",i.resumeToken)),r.isPrimaryClient&&t&&Md(r.remoteStore,i),c}async function tv(r,e,t,n,i){r.Ka=(p,T,S)=>(async function(D,x,z,K){let j=x.view.ma(z);j.ns&&(j=await nl(D.localStore,x.query,!1).then((({documents:I})=>x.view.ma(I,j))));const X=K&&K.targetChanges.get(x.targetId),se=K&&K.targetMismatches.get(x.targetId)!=null,Y=x.view.applyChanges(j,D.isPrimaryClient,X,se);return ll(D,x.targetId,Y.wa),Y.snapshot})(r,p,T,S);const s=await nl(r.localStore,e,!0),a=new QI(e,s.Ts),c=a.ma(s.documents),u=bi.createSynthesizedTargetChangeForCurrentChange(t,n&&r.onlineState!=="Offline",i),d=a.applyChanges(c,r.isPrimaryClient,u);ll(r,t,d.wa);const f=new JI(e,t,a);return r.Fa.set(e,f),r.Ma.has(t)?r.Ma.get(t).push(e):r.Ma.set(t,[e]),d.snapshot}async function nv(r,e,t){const n=Q(r),i=n.Fa.get(e),s=n.Ma.get(i.targetId);if(s.length>1)return n.Ma.set(i.targetId,s.filter((a=>!zs(a,e)))),void n.Fa.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await Yo(n.localStore,i.targetId,!1).then((()=>{n.sharedClientState.clearQueryState(i.targetId),t&&Oa(n.remoteStore,i.targetId),Zo(n,i.targetId)})).catch(On)):(Zo(n,i.targetId),await Yo(n.localStore,i.targetId,!0))}async function rv(r,e){const t=Q(r),n=t.Fa.get(e),i=t.Ma.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Oa(t.remoteStore,n.targetId))}async function iv(r,e,t){const n=Zd(r);try{const i=await(function(a,c){const u=Q(a),d=ye.now(),f=c.reduce(((S,k)=>S.add(k.key)),Z());let p,T;return u.persistence.runTransaction("Locally write mutations","readwrite",(S=>{let k=Xe(),D=Z();return u.cs.getEntries(S,f).next((x=>{k=x,k.forEach(((z,K)=>{K.isValidDocument()||(D=D.add(z))}))})).next((()=>u.localDocuments.getOverlayedDocuments(S,k))).next((x=>{p=x;const z=[];for(const K of c){const j=Ty(K,p.get(K.key).overlayedDocument);j!=null&&z.push(new an(K.key,j,Oh(j.value.mapValue),Ze.exists(!0)))}return u.mutationQueue.addMutationBatch(S,d,z,c)})).next((x=>{T=x;const z=x.applyToLocalDocumentSet(p,D);return u.documentOverlayCache.saveOverlays(S,x.batchId,z)}))})).then((()=>({batchId:T.batchId,changes:Gh(p)})))})(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),(function(a,c,u){let d=a.Ba[a.currentUser.toKey()];d||(d=new ge(J)),d=d.insert(c,u),a.Ba[a.currentUser.toKey()]=d})(n,i.batchId,t),await Pi(n,i.changes),await Si(n.remoteStore)}catch(i){const s=Ba(i,"Failed to persist write");t.reject(s)}}async function Wd(r,e){const t=Q(r);try{const n=await II(t.localStore,e);e.targetChanges.forEach(((i,s)=>{const a=t.Na.get(s);a&&(q(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?a.va=!0:i.modifiedDocuments.size>0?q(a.va):i.removedDocuments.size>0&&(q(a.va),a.va=!1))})),await Pi(t,n,e)}catch(n){await On(n)}}function ul(r,e,t){const n=Q(r);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.Fa.forEach(((s,a)=>{const c=a.view.Z_(e);c.snapshot&&i.push(c.snapshot)})),(function(a,c){const u=Q(a);u.onlineState=c;let d=!1;u.queries.forEach(((f,p)=>{for(const T of p.j_)T.Z_(c)&&(d=!0)})),d&&qa(u)})(n.eventManager,e),i.length&&n.Ca.d_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function sv(r,e,t){const n=Q(r);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n.Na.get(e),s=i&&i.key;if(s){let a=new ge(F.comparator);a=a.insert(s,Ee.newNoDocument(s,$.min()));const c=Z().add(s),u=new Gs($.min(),new Map,new ge(J),a,c);await Wd(n,u),n.Oa=n.Oa.remove(s),n.Na.delete(e),ja(n)}else await Yo(n.localStore,e,!1).then((()=>Zo(n,e,t))).catch(On)}async function ov(r,e){const t=Q(r),n=e.batch.batchId;try{const i=await yI(t.localStore,e);Jd(t,n,null),Qd(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Pi(t,i)}catch(i){await On(i)}}async function av(r,e,t){const n=Q(r);try{const i=await(function(a,c){const u=Q(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",(d=>{let f;return u.mutationQueue.lookupMutationBatch(d,c).next((p=>(q(p!==null),f=p.keys(),u.mutationQueue.removeMutationBatch(d,p)))).next((()=>u.mutationQueue.performConsistencyCheck(d))).next((()=>u.documentOverlayCache.removeOverlaysForBatchId(d,f,c))).next((()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,f))).next((()=>u.localDocuments.getDocuments(d,f)))}))})(n.localStore,e);Jd(n,e,t),Qd(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Pi(n,i)}catch(i){await On(i)}}function Qd(r,e){(r.ka.get(e)||[]).forEach((t=>{t.resolve()})),r.ka.delete(e)}function Jd(r,e,t){const n=Q(r);let i=n.Ba[n.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),n.Ba[n.currentUser.toKey()]=i}}function Zo(r,e,t=null){r.sharedClientState.removeLocalQueryTarget(e);for(const n of r.Ma.get(e))r.Fa.delete(n),t&&r.Ca.$a(n,t);r.Ma.delete(e),r.isPrimaryClient&&r.La.gr(e).forEach((n=>{r.La.containsKey(n)||Yd(r,n)}))}function Yd(r,e){r.xa.delete(e.path.canonicalString());const t=r.Oa.get(e);t!==null&&(Oa(r.remoteStore,t),r.Oa=r.Oa.remove(e),r.Na.delete(t),ja(r))}function ll(r,e,t){for(const n of t)n instanceof Kd?(r.La.addReference(n.key,e),cv(r,n)):n instanceof Gd?(V("SyncEngine","Document no longer in limbo: "+n.key),r.La.removeReference(n.key,e),r.La.containsKey(n.key)||Yd(r,n.key)):B()}function cv(r,e){const t=e.key,n=t.path.canonicalString();r.Oa.get(t)||r.xa.has(n)||(V("SyncEngine","New document in limbo: "+t),r.xa.add(n),ja(r))}function ja(r){for(;r.xa.size>0&&r.Oa.size<r.maxConcurrentLimboResolutions;){const e=r.xa.values().next().value;r.xa.delete(e);const t=new F(he.fromString(e)),n=r.qa.next();r.Na.set(n,new YI(t)),r.Oa=r.Oa.insert(t,n),Md(r.remoteStore,new Ct(ot(wi(t.path)),n,"TargetPurposeLimboResolution",it.oe))}}async function Pi(r,e,t){const n=Q(r),i=[],s=[],a=[];n.Fa.isEmpty()||(n.Fa.forEach(((c,u)=>{a.push(n.Ka(u,e,t).then((d=>{var f;if((d||t)&&n.isPrimaryClient){const p=d?!d.fromCache:(f=t?.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(d){i.push(d);const p=Na.Wi(u.targetId,d);s.push(p)}})))})),await Promise.all(a),n.Ca.d_(i),await(async function(u,d){const f=Q(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>b.forEach(d,(T=>b.forEach(T.$i,(S=>f.persistence.referenceDelegate.addReference(p,T.targetId,S))).next((()=>b.forEach(T.Ui,(S=>f.persistence.referenceDelegate.removeReference(p,T.targetId,S)))))))))}catch(p){if(!sn(p))throw p;V("LocalStore","Failed to update sequence numbers: "+p)}for(const p of d){const T=p.targetId;if(!p.fromCache){const S=f.os.get(T),k=S.snapshotVersion,D=S.withLastLimboFreeSnapshotVersion(k);f.os=f.os.insert(T,D)}}})(n.localStore,s))}async function uv(r,e){const t=Q(r);if(!t.currentUser.isEqual(e)){V("SyncEngine","User change. New user:",e.toKey());const n=await kd(t.localStore,e);t.currentUser=e,(function(s,a){s.ka.forEach((c=>{c.forEach((u=>{u.reject(new U(C.CANCELLED,a))}))})),s.ka.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Pi(t,n.hs)}}function lv(r,e){const t=Q(r),n=t.Na.get(e);if(n&&n.va)return Z().add(n.key);{let i=Z();const s=t.Ma.get(e);if(!s)return i;for(const a of s){const c=t.Fa.get(a);i=i.unionWith(c.view.Va)}return i}}function Xd(r){const e=Q(r);return e.remoteStore.remoteSyncer.applyRemoteEvent=Wd.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=lv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=sv.bind(null,e),e.Ca.d_=HI.bind(null,e.eventManager),e.Ca.$a=WI.bind(null,e.eventManager),e}function Zd(r){const e=Q(r);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ov.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=av.bind(null,e),e}class mi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Js(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Vd(this.persistence,new Cd,e.initialUser,this.serializer)}Ga(e){return new Pd(Qs.Zr,this.serializer)}Wa(e){return new xd}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}mi.provider={build:()=>new mi};class hv extends mi{constructor(e,t,n){super(),this.Ja=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Ja.initialize(this,e),await Zd(this.Ja.syncEngine),await Si(this.Ja.remoteStore),await this.persistence.yi((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}za(e){return Vd(this.persistence,new Cd,e.initialUser,this.serializer)}ja(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Zy(n,e.asyncQueue,t)}Ha(e,t){const n=new S_(t,this.persistence);return new R_(e.asyncQueue,n)}Ga(e){const t=pI(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?We.withCacheSize(this.cacheSizeBytes):We.DEFAULT;return new xa(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,PI(),ms(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Wa(e){return new xd}}class Ds{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>ul(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=uv.bind(null,this.syncEngine),await $I(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new GI})()}createDatastore(e){const t=Js(e.databaseInfo.databaseId),n=(function(s){return new SI(s)})(e.databaseInfo);return(function(s,a,c,u){return new kI(s,a,c,u)})(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return(function(n,i,s,a,c){return new xI(n,i,s,a,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>ul(this.syncEngine,t,0)),(function(){return il.D()?new il:new AI})())}createSyncEngine(e,t){return(function(i,s,a,c,u,d,f){const p=new XI(i,s,a,c,u,d);return f&&(p.Qa=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(i){const s=Q(i);V("RemoteStore","RemoteStore shutting down."),s.L_.add(5),await Ri(s),s.k_.shutdown(),s.q_.set("Unknown")})(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Ds.provider={build:()=>new Ds};/**
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
 */class ef{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):Ke("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
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
 */class dv{constructor(e,t,n,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=Oe.UNAUTHENTICATED,this.clientId=Eh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(n,(async a=>{V("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(n,(a=>(V("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Vt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Ba(t,"Failed to shutdown persistence");e.reject(n)}})),e.promise}}async function bo(r,e){r.asyncQueue.verifyOperationInProgress(),V("FirestoreClient","Initializing OfflineComponentProvider");const t=r.configuration;await e.initialize(t);let n=t.initialUser;r.setCredentialChangeListener((async i=>{n.isEqual(i)||(await kd(e.localStore,i),n=i)})),e.persistence.setDatabaseDeletedListener((()=>r.terminate())),r._offlineComponents=e}async function hl(r,e){r.asyncQueue.verifyOperationInProgress();const t=await fv(r);V("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,r.configuration),r.setCredentialChangeListener((n=>sl(e.remoteStore,n))),r.setAppCheckTokenChangeListener(((n,i)=>sl(e.remoteStore,i))),r._onlineComponents=e}async function fv(r){if(!r._offlineComponents)if(r._uninitializedComponentsProvider){V("FirestoreClient","Using user provided OfflineComponentProvider");try{await bo(r,r._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(i){return i.name==="FirebaseError"?i.code===C.FAILED_PRECONDITION||i.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11})(t))throw t;ar("Error using user provided cache. Falling back to memory cache: "+t),await bo(r,new mi)}}else V("FirestoreClient","Using default OfflineComponentProvider"),await bo(r,new mi);return r._offlineComponents}async function tf(r){return r._onlineComponents||(r._uninitializedComponentsProvider?(V("FirestoreClient","Using user provided OnlineComponentProvider"),await hl(r,r._uninitializedComponentsProvider._online)):(V("FirestoreClient","Using default OnlineComponentProvider"),await hl(r,new Ds))),r._onlineComponents}function mv(r){return tf(r).then((e=>e.syncEngine))}async function ea(r){const e=await tf(r),t=e.eventManager;return t.onListen=ZI.bind(null,e.syncEngine),t.onUnlisten=nv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=ev.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=rv.bind(null,e.syncEngine),t}function pv(r,e,t={}){const n=new Vt;return r.asyncQueue.enqueueAndForget((async()=>(function(s,a,c,u,d){const f=new ef({next:T=>{f.Za(),a.enqueueAndForget((()=>zd(s,p)));const S=T.docs.has(c);!S&&T.fromCache?d.reject(new U(C.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&T.fromCache&&u&&u.source==="server"?d.reject(new U(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),p=new $d(wi(c.path),f,{includeMetadataChanges:!0,_a:!0});return jd(s,p)})(await ea(r),r.asyncQueue,e,t,n))),n.promise}/**
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
 */function nf(r){const e={};return r.timeoutSeconds!==void 0&&(e.timeoutSeconds=r.timeoutSeconds),e}/**
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
 */const dl=new Map;/**
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
 */function gv(r,e,t){if(!t)throw new U(C.INVALID_ARGUMENT,`Function ${r}() cannot be called with an empty ${e}.`)}function _v(r,e,t,n){if(e===!0&&n===!0)throw new U(C.INVALID_ARGUMENT,`${r} and ${t} cannot be used together.`)}function fl(r){if(!F.isDocumentKey(r))throw new U(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${r} has ${r.length}.`)}function za(r){if(r===void 0)return"undefined";if(r===null)return"null";if(typeof r=="string")return r.length>20&&(r=`${r.substring(0,20)}...`),JSON.stringify(r);if(typeof r=="number"||typeof r=="boolean")return""+r;if(typeof r=="object"){if(r instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(r);return e?`a custom ${e} object`:"an object"}}return typeof r=="function"?"a function":B()}function en(r,e){if("_delegate"in r&&(r=r._delegate),!(r instanceof e)){if(e.name===r.constructor.name)throw new U(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=za(r);throw new U(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return r}/**
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
 */class ml{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new U(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}_v("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=nf((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new U(C.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new U(C.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new U(C.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,i){return n.timeoutSeconds===i.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class $a{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ml({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ml(e),e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new m_;switch(n.type){case"firstParty":return new y_(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new U(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const n=dl.get(t);n&&(V("ComponentProvider","Removing Datastore"),dl.delete(t),n.terminate())})(this),Promise.resolve()}}function yv(r,e,t,n={}){var i;const s=(r=en(r,$a))._getSettings(),a=`${e}:${t}`;if(s.host!=="firestore.googleapis.com"&&s.host!==a&&ar("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),r._setSettings(Object.assign(Object.assign({},s),{host:a,ssl:!1})),n.mockUserToken){let c,u;if(typeof n.mockUserToken=="string")c=n.mockUserToken,u=Oe.MOCK_USER;else{c=$f(n.mockUserToken,(i=r._app)===null||i===void 0?void 0:i.options.projectId);const d=n.mockUserToken.sub||n.mockUserToken.user_id;if(!d)throw new U(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Oe(d)}r._authCredentials=new p_(new vh(c,u))}}/**
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
 */class Xs{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Xs(this.firestore,e,this._query)}}class et{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new pi(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new et(this.firestore,e,this._key)}}class pi extends Xs{constructor(e,t,n){super(e,t,wi(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new et(this.firestore,null,new F(e))}withConverter(e){return new pi(this.firestore,e,this._path)}}function pl(r,e,...t){if(r=tt(r),arguments.length===1&&(e=Eh.newId()),gv("doc","path",e),r instanceof $a){const n=he.fromString(e,...t);return fl(n),new et(r,null,new F(n))}{if(!(r instanceof et||r instanceof pi))throw new U(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=r._path.child(he.fromString(e,...t));return fl(n),new et(r.firestore,r instanceof pi?r.converter:null,new F(n))}}/**
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
 */class gl{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Nd(this,"async_queue_retry"),this.Vu=()=>{const n=ms();n&&V("AsyncQueue","Visibility state changed to "+n.visibilityState),this.t_.jo()},this.mu=e;const t=ms();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=ms();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise((()=>{}));const t=new Vt;return this.gu((()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Pu.push(e),this.pu())))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!sn(e))throw e;V("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go((()=>this.pu()))}}gu(e){const t=this.mu.then((()=>(this.du=!0,e().catch((n=>{this.Eu=n,this.du=!1;const i=(function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c})(n);throw Ke("INTERNAL UNHANDLED ERROR: ",i),n})).then((n=>(this.du=!1,n))))));return this.mu=t,t}enqueueAfterDelay(e,t,n){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const i=Ua.createAndSchedule(this,e,t,n,(s=>this.yu(s)));return this.Tu.push(i),i}fu(){this.Eu&&B()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then((()=>{this.Tu.sort(((t,n)=>t.targetTimeMs-n.targetTimeMs));for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()}))}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}function _l(r){return(function(t,n){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of n)if(s in i&&typeof i[s]=="function")return!0;return!1})(r,["next","error","complete"])}class gi extends $a{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new gl,this._persistenceKey=i?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new gl(e),this._firestoreClient=void 0,await e}}}function Iv(r,e,t){t||(t="(default)");const n=Os(r,"firestore");if(n.isInitialized(t)){const i=n.getImmediate({identifier:t}),s=n.getOptions(t);if(ri(s,e))return i;throw new U(C.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new U(C.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new U(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return n.initialize({options:e,instanceIdentifier:t})}function vv(r,e){const t=typeof r=="object"?r:ra(),n=typeof r=="string"?r:"(default)",i=Os(t,"firestore").getImmediate({identifier:n});if(!i._initialized){const s=jf("firestore");s&&yv(i,...s)}return i}function Ka(r){if(r._terminated)throw new U(C.FAILED_PRECONDITION,"The client has already been terminated.");return r._firestoreClient||Ev(r),r._firestoreClient}function Ev(r){var e,t,n;const i=r._freezeSettings(),s=(function(c,u,d,f){return new Q_(c,u,d,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,nf(f.experimentalLongPollingOptions),f.useFetchStreams)})(r._databaseId,((e=r._app)===null||e===void 0?void 0:e.options.appId)||"",r._persistenceKey,i);r._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(r._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),r._firestoreClient=new dv(r._authCredentials,r._appCheckCredentials,r._queue,s,r._componentsProvider&&(function(c){const u=c?._online.build();return{_offline:c?._offline.build(u),_online:u}})(r._componentsProvider))}/**
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
 */class _r{constructor(e){this._byteString=e}static fromBase64String(e){try{return new _r(be.fromBase64String(e))}catch(t){throw new U(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new _r(be.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class Ga{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new _e(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Ha{constructor(e){this._methodName=e}}/**
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
 */class Wa{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}}/**
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
 */class Qa{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(n,i){if(n.length!==i.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==i[s])return!1;return!0})(this._values,e._values)}}/**
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
 */const Tv=/^__.*__$/;class wv{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new an(e,this.data,this.fieldMask,t,this.fieldTransforms):new wr(e,this.data,t,this.fieldTransforms)}}function rf(r){switch(r){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B()}}class Ja{constructor(e,t,n,i,s,a){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,s===void 0&&this.vu(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Ja(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.Ou(e),i}Nu(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Fu({path:n,xu:!1});return i.vu(),i}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return xs(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(rf(this.Cu)&&Tv.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Av{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Js(e)}Qu(e,t,n,i=!1){return new Ja({Cu:e,methodName:t,qu:n,path:_e.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function bv(r){const e=r._freezeSettings(),t=Js(r._databaseId);return new Av(r._databaseId,!!e.ignoreUndefinedProperties,t)}function Rv(r,e,t,n,i,s={}){const a=r.Qu(s.merge||s.mergeFields?2:0,e,t,i);cf("Data must be an object, but it was:",a,n);const c=of(n,a);let u,d;if(s.merge)u=new st(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const p of s.mergeFields){const T=Sv(e,p,t);if(!a.contains(T))throw new U(C.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);Cv(f,T)||f.push(T)}u=new st(f),d=a.fieldTransforms.filter((p=>u.covers(p.field)))}else u=null,d=a.fieldTransforms;return new wv(new Qe(c),u,d)}class Ya extends Ha{_toFieldTransform(e){return new Zh(e.path,new dr)}isEqual(e){return e instanceof Ya}}function sf(r,e){if(af(r=tt(r)))return cf("Unsupported field value:",e,r),of(r,e);if(r instanceof Ha)return(function(n,i){if(!rf(i.Cu))throw i.Bu(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${n._methodName}() is not currently supported inside arrays`);const s=n._toFieldTransform(i);s&&i.fieldTransforms.push(s)})(r,e),null;if(r===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),r instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return(function(n,i){const s=[];let a=0;for(const c of n){let u=sf(c,i.Lu(a));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),a++}return{arrayValue:{values:s}}})(r,e)}return(function(n,i){if((n=tt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return gy(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const s=ye.fromDate(n);return{timestampValue:pr(i.serializer,s)}}if(n instanceof ye){const s=new ye(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:pr(i.serializer,s)}}if(n instanceof Wa)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof _r)return{bytesValue:od(i.serializer,n._byteString)};if(n instanceof et){const s=i.databaseId,a=n.firestore._databaseId;if(!a.isEqual(s))throw i.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:Ca(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof Qa)return(function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map((u=>{if(typeof u!="number")throw c.Bu("VectorValues must only contain numeric values.");return wa(c.serializer,u)}))}}}}}})(n,i);throw i.Bu(`Unsupported field value: ${za(n)}`)})(r,e)}function of(r,e){const t={};return kh(r)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Tr(r,((n,i)=>{const s=sf(i,e.Mu(n));s!=null&&(t[n]=s)})),{mapValue:{fields:t}}}function af(r){return!(typeof r!="object"||r===null||r instanceof Array||r instanceof Date||r instanceof ye||r instanceof Wa||r instanceof _r||r instanceof et||r instanceof Ha||r instanceof Qa)}function cf(r,e,t){if(!af(t)||!(function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)})(t)){const n=za(t);throw n==="an object"?e.Bu(r+" a custom object"):e.Bu(r+" "+n)}}function Sv(r,e,t){if((e=tt(e))instanceof Ga)return e._internalPath;if(typeof e=="string")return uf(r,e);throw xs("Field path arguments must be of type string or ",r,!1,void 0,t)}const Pv=new RegExp("[~\\*/\\[\\]]");function uf(r,e,t){if(e.search(Pv)>=0)throw xs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,r,!1,void 0,t);try{return new Ga(...e.split("."))._internalPath}catch{throw xs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,r,!1,void 0,t)}}function xs(r,e,t,n,i){const s=n&&!n.isEmpty(),a=i!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(s||a)&&(u+=" (found",s&&(u+=` in field ${n}`),a&&(u+=` in document ${i}`),u+=")"),new U(C.INVALID_ARGUMENT,c+r+u)}function Cv(r,e){return r.some((t=>t.isEqual(e)))}/**
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
 */class lf{constructor(e,t,n,i,s){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new et(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Vv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(hf("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Vv extends lf{data(){return super.data()}}function hf(r,e){return typeof e=="string"?uf(r,e):e instanceof Ga?e._internalPath:e._delegate._internalPath}/**
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
 */function kv(r){if(r.limitType==="L"&&r.explicitOrderBy.length===0)throw new U(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Dv{convertValue(e,t="none"){switch(Vn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(tn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return Tr(e,((i,s)=>{n[i]=this.convertValue(s,t)})),n}convertVectorValue(e){var t,n,i;const s=(i=(n=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map((a=>pe(a.doubleValue)));return new Qa(s)}convertGeoPoint(e){return new Wa(pe(e.latitude),pe(e.longitude))}convertArray(e,t){return(e.values||[]).map((n=>this.convertValue(n,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const n=va(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(li(e));default:return null}}convertTimestamp(e){const t=xt(e);return new ye(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=he.fromString(e);q(gd(n));const i=new Cn(n.get(1),n.get(3)),s=new F(n.popFirst(5));return i.isEqual(t)||Ke(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function xv(r,e,t){let n;return n=r?t&&(t.merge||t.mergeFields)?r.toFirestore(e,t):r.toFirestore(e):e,n}/**
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
 */class Jr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class df extends lf{constructor(e,t,n,i,s,a){super(e,t,n,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ps(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(hf("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}}class ps extends df{data(e={}){return super.data(e)}}class Nv{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Jr(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((n=>{e.call(t,new ps(this._firestore,this._userDataWriter,n.key,n,new Jr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map((c=>{const u=new ps(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Jr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}}))}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter((c=>s||c.type!==3)).map((c=>{const u=new ps(i._firestore,i._userDataWriter,c.doc.key,c.doc,new Jr(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);let d=-1,f=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:Ov(c.type),doc:u,oldIndex:d,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Ov(r){switch(r){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B()}}/**
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
 */function Mv(r){r=en(r,et);const e=en(r.firestore,gi);return pv(Ka(e),r._key).then((t=>mf(e,r,t)))}class ff extends Dv{constructor(e){super(),this.firestore=e}convertBytes(e){return new _r(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new et(this.firestore,null,t)}}function yl(r,e,t){r=en(r,et);const n=en(r.firestore,gi),i=xv(r.converter,e,t);return Fv(n,[Rv(bv(n),"setDoc",r._key,i,r.converter!==null,t).toMutation(r._key,Ze.none())])}function Lv(r,...e){var t,n,i;r=tt(r);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||_l(e[a])||(s=e[a],a++);const c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(_l(e[a])){const p=e[a];e[a]=(t=p.next)===null||t===void 0?void 0:t.bind(p),e[a+1]=(n=p.error)===null||n===void 0?void 0:n.bind(p),e[a+2]=(i=p.complete)===null||i===void 0?void 0:i.bind(p)}let u,d,f;if(r instanceof et)d=en(r.firestore,gi),f=wi(r._key.path),u={next:p=>{e[a]&&e[a](mf(d,r,p))},error:e[a+1],complete:e[a+2]};else{const p=en(r,Xs);d=en(p.firestore,gi),f=p._query;const T=new ff(d);u={next:S=>{e[a]&&e[a](new Nv(d,T,p,S))},error:e[a+1],complete:e[a+2]},kv(r._query)}return(function(T,S,k,D){const x=new ef(D),z=new $d(S,x,k);return T.asyncQueue.enqueueAndForget((async()=>jd(await ea(T),z))),()=>{x.Za(),T.asyncQueue.enqueueAndForget((async()=>zd(await ea(T),z)))}})(Ka(d),f,c,u)}function Fv(r,e){return(function(n,i){const s=new Vt;return n.asyncQueue.enqueueAndForget((async()=>iv(await mv(n),i,s))),s.promise})(Ka(r),e)}function mf(r,e,t){const n=t.docs.get(e._key),i=new ff(r);return new df(r,i,e._key,n,new Jr(t.hasPendingWrites,t.fromCache),e.converter)}class Uv{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=pf(),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function Bv(r){return new Uv(r)}class qv{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ds.provider,this._offlineComponentProvider={build:t=>new hv(t,e?.cacheSizeBytes,this.forceOwnership)}}}function pf(r){return new qv(void 0)}function Il(){return new Ya("serverTimestamp")}(function(e,t=!0){(function(i){Er=i})(yr),sr(new Rn("firestore",((n,{instanceIdentifier:i,options:s})=>{const a=n.getProvider("app").getImmediate(),c=new gi(new g_(n.getProvider("auth-internal")),new v_(n.getProvider("app-check-internal")),(function(d,f){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new U(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Cn(d.options.projectId,f)})(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c}),"PUBLIC").setMultipleInstances(!0)),Yt(hu,"4.7.3",e),Yt(hu,"4.7.3","esm2017")})();let vl=!1,Ro;function Kv(){if(vl)return Ro;vl=!0;const r={apiKey:"AIzaSyBSLTU-VKtrVNeBoQC2ogVyLZU0g5N-YEU",authDomain:"hotlist-c0607.firebaseapp.com",projectId:"hotlist-c0607",storageBucket:"hotlist-c0607.firebasestorage.app",messagingSenderId:"490544213818",appId:"1:490544213818:web:032d50b02fe2be1e8eaa03"},e=rp().length?ra():kl(r),t=d_(e);try{Iv(e,{localCache:Bv({tabManager:pf()})})}catch{}const n=vv(e),i=P=>document.querySelector(P),s=i("#list"),a=i("#q"),c=i("#addBtn"),u=i("#editor"),d=i("#closePanel"),f=i("#serieSel"),p=i("#itensPreview"),T=i("#panelExport"),S=i("#shareAll"),k=i("#importFile"),D=i("#applyImport"),x=i("#clearImport"),z=i("#importSummary"),K=i("#btnSignIn"),j=i("#btnSignOut"),X=i("#userInfo"),se=i("#userName"),Y=i("#userPhoto"),I=i("#prevImg"),g=i("#nextImg"),y=i("#modal"),v=i("#modalImg"),E=i("#toast"),w="hw_series_v1",_="hw_checklist_v3",Je="hw_ui_tab_v7",ht=(P,N)=>{try{return JSON.parse(localStorage.getItem(P)||"null")??N}catch{return N}},Re=(P,N)=>localStorage.setItem(P,JSON.stringify(N)),Le=P=>{E&&(E.textContent=P,E.classList.add("show"),setTimeout(()=>E.classList.remove("show"),1600))},Ot=P=>{try{const N=new URL(P);return N.protocol==="http:"||N.protocol==="https:"}catch{return!1}};let de=ht(_,{}),ee=ht(w,[]),Ie=ee.length?0:-1,je=null,we=null,Ci="";function Mt(P){const N=Array.isArray(P)?[]:{};for(const[O,L]of Object.entries(P))L!==void 0&&(L&&typeof L=="object"&&!Array.isArray(L)?N[O]=Mt(L):N[O]=L);return N}function Vi(P){const N=String(P??"").trim();let O=N.match(/^(\d+)\s*[\/\-\|]\s*(\d+)\b/);return O?{has:!0,num:+O[1],den:+O[2]}:(O=N.match(/^(\d+)\b/),O?{has:!0,num:+O[1],den:null}:{has:!1,num:Number.POSITIVE_INFINITY,den:null})}function dt(P){return(P||[]).slice().sort((N,O)=>{const L=Vi(N?.n),W=Vi(O?.n);return L.has!==W.has?L.has?-1:1:L.num!==W.num?L.num-W.num:L.den!=null&&W.den!=null&&L.den!==W.den?L.den-W.den:(N?.modelo||"").localeCompare(O?.modelo||"","pt-BR",{sensitivity:"base"})})}function cn(P){const N=(P.series||[]).map(W=>({nome:W.nome,items:dt((W.items||[]).map(G=>Mt({n:G.n??void 0,modelo:G.modelo??void 0,img:G.img??void 0})))})).sort((W,G)=>W.nome.localeCompare(G.nome,"pt-BR",{sensitivity:"base"})),O=Object.entries(P.checks||{}).sort((W,G)=>W[0].localeCompare(G[0])),L={};for(const[W,G]of O)L[W]=!!G;return{series:N,checks:L}}function br(P){return JSON.stringify(P)}function Ln(P){const N=(P||"").toLowerCase(),O=N.includes("super treasure"),L=O||N.includes("(th)")||N.includes("treasure");return O?"linear-gradient(0deg,#ffb703,#fb5607 60%,#ff006e)":L?"#c82d6b":"transparent"}function Fn(){ee.forEach(P=>P.items=dt(P.items||[])),Re(w,ee)}function Rr(P,N){if(N){const oe=N.querySelectorAll(".row").length,fe=N.querySelectorAll(".row .tick.checked").length;P&&(P.textContent=`${fe}/${oe}`)}const O=document.querySelectorAll("#list .row").length,L=document.querySelectorAll("#list .row .tick.checked").length,W=i("#all"),G=i("#chk");W&&(W.textContent=String(O)),G&&(G.textContent=String(L))}function ze(){if(Fn(),!s)return;s.innerHTML="";let P=0,N=0;const O=(a?.value||"").toLowerCase().trim(),L=[];(ee||[]).forEach(oe=>{const fe=document.createElement("details");fe.className="series",fe.open=!0;const Fe=Math.random().toString(36).slice(2);fe.innerHTML=`<summary>
        <svg class='chev' width='16' height='16' viewBox='0 0 24 24'><path d='M9 6l6 6-6 6' stroke='currentColor' stroke-width='2' fill='none'/></svg>
        <div class='title'>${oe.nome}</div>
        <span class='badge' id='b-${Fe}'></span>
      </summary>`;const Se=document.createElement("div");Se.className="items";let Te=0,ne=0;dt(oe.items||[]).forEach(xe=>{if(!`${xe.modelo||""} ${xe.n||""} ${oe.nome}`.toLowerCase().includes(O))return;const rt=document.createElement("div");rt.className="row",rt.style.setProperty("--accent-col",Ln(xe.modelo||""));const hn=document.createElement("div");hn.className="thumb-wrap";const dn=document.createElement("img");dn.className="thumb",dn.alt=xe.modelo||"",dn.setAttribute("data-src",xe.img||""),dn.loading="lazy",hn.appendChild(dn);const pt=(xe.modelo||"").toLowerCase();if(pt.includes("(th)")||pt.includes("treasure")){const Ft=document.createElement("div"),ct=pt.includes("super");Ft.className="label"+(ct?" super":""),Ft.textContent=ct?"SUPER TH":"TH",hn.appendChild(Ft)}const no=L.push({img:xe.img||"",alt:xe.modelo||""})-1;hn.addEventListener("click",()=>ki(no)),rt.appendChild(hn);const Li=document.createElement("div");Li.innerHTML=`<div class='muted'>${xe.n||""}</div><div class='title'>${xe.modelo||""}</div>`,rt.appendChild(Li);const Tt=oe.nome+"__"+(xe.n||""),Lt=document.createElement("div");Lt.className="tick"+(de[Tt]?" checked":""),Lt.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>';const Dr=()=>fe.querySelector("#b-"+Fe);Lt.addEventListener("click",()=>{de[Tt]=!de[Tt],Lt.classList.toggle("checked"),Re(_,de),Rr(Dr(),Se),window.syncCloud&&window.syncCloud()}),rt.appendChild(Lt),Se.appendChild(rt),ne++,P++,de[Tt]&&(Te++,N++)}),fe.appendChild(Se);const kr=fe.querySelector("#b-"+Fe);kr&&(kr.textContent=`${Te}/${ne}`),s.appendChild(fe),setTimeout(()=>Sr(Se),0)}),window.__modalFeed=L;const W=i("#all"),G=i("#chk");W&&(W.textContent=String(P)),G&&(G.textContent=String(N))}function Sr(P){const N=[...P.querySelectorAll("img.thumb[data-src]")];if(!("IntersectionObserver"in window)){N.forEach(L=>{L.src=L.getAttribute("data-src")||"",L.removeAttribute("data-src")});return}const O=new IntersectionObserver((L,W)=>{L.forEach(G=>{if(G.isIntersecting){const oe=G.target;oe.src=oe.getAttribute("data-src")||"",oe.removeAttribute("data-src"),W.unobserve(oe)}})},{rootMargin:"200px"});N.forEach(L=>O.observe(L))}let ft=0;function ki(P){const N=window.__modalFeed||[];N.length&&(ft=Math.max(0,Math.min(P,N.length-1)),Pr(),y.classList.add("open"))}function Pr(){const P=window.__modalFeed||[];if(!P.length)return;const N=P[ft];v.src=N.img||"",v.alt=N.alt||""}function Di(){y.classList.remove("open")}function Cr(){const P=window.__modalFeed||[];P.length&&(ft=(ft+1)%P.length,Pr())}function Un(){const P=window.__modalFeed||[];P.length&&(ft=(ft-1+P.length)%P.length,Pr())}const Vr=P=>{P.stopPropagation(),Un()},xi=P=>{P.stopPropagation(),Cr()},Bn=P=>{P.target===y&&Di()},qn=P=>{if(y.classList.contains("open")){if(P.key==="Escape"){P.preventDefault(),Di();return}if(P.key==="ArrowLeft"){P.preventDefault(),Un();return}if(P.key==="ArrowRight"){P.preventDefault(),Cr();return}}};I?.addEventListener("click",Vr),g?.addEventListener("click",xi),y?.addEventListener("click",Bn),document.addEventListener("keydown",qn);function Ni(){const P=(a?.value||"").toLowerCase().trim(),N=[];return(ee||[]).forEach(O=>{dt(O.items||[]).forEach(L=>{if(!`${L.modelo||""} ${L.n||""} ${O.nome}`.toLowerCase().includes(P))return;const W=O.nome+"__"+(L.n||"");N.push({serie:O.nome,n:L.n,modelo:L.modelo,img:L.img,checked:!!de[W]})})}),N}function Ve(){const P=Ni();if(P.length===0){Le("Nada para compartilhar (lista vazia).");return}const N=P.filter(ne=>ne.checked),O=P.filter(ne=>!ne.checked),L=(a?.value||"").trim(),W=L?`Minha Hotlist (filtro: "${L}")`:"Minha Hotlist",G=N.map(ne=>`• ${ne.serie} — ${ne.n||""} ${ne.modelo}`),oe=O.map(ne=>`• ${ne.serie} — ${ne.n||""} ${ne.modelo}`),fe=80;let Fe=G.slice(0,Math.min(G.length,Math.floor(fe/2))),Se=oe.slice(0,fe-Fe.length-6);Fe.length<G.length&&Fe.push(`…(+${G.length-Fe.length} itens)`),Se.length<oe.length&&Se.push(`…(+${oe.length-Se.length} itens)`);const Te=["📦 "+W,`✅ Tenho: ${N.length}`,Fe.join(`
`),"",`❌ Falta: ${O.length}`,Se.join(`
`)].join(`
`);navigator.share?navigator.share({title:"Checklist Hot Wheels",text:Te}).catch(()=>{}):window.open(`https://wa.me/?text=${encodeURIComponent(Te)}`,"_blank")}a?.addEventListener("input",ze),c?.addEventListener("click",()=>{u.classList.add("open"),c.setAttribute("aria-expanded","true"),u.setAttribute("aria-hidden","false")}),d?.addEventListener("click",()=>{u.classList.remove("open"),c.setAttribute("aria-expanded","false"),u.setAttribute("aria-hidden","true")}),S?.addEventListener("click",Ve),[...document.querySelectorAll(".tab-btn")].forEach(P=>{P.addEventListener("click",()=>{const N=P.dataset.tab;document.querySelectorAll(".tab-btn").forEach(O=>O.classList.toggle("active",O.dataset.tab===N)),document.querySelectorAll(".pane").forEach(O=>O.classList.toggle("active",O.id===N)),Re(Je,N)})});const De=ht(Je,"tab-colecoes");document.querySelector(`.tab-btn[data-tab="${De}"]`)?.click(),f?.addEventListener("change",()=>{Ie=parseInt(f.value,10),at()}),i("#addSerie")?.addEventListener("click",()=>{const P=i("#serieNome"),N=(P?.value||"").trim();if(!N)return alert("Dê um nome à coleção.");ee.push({nome:N,items:[]}),Re(w,ee),P&&(P.value=""),Ie=ee.length-1,mt(),ze(),Le("Coleção criada"),window.syncCloud&&window.syncCloud()}),i("#delSerie")?.addEventListener("click",()=>{if(Ie<0||!ee[Ie])return alert("Escolha a coleção para excluir.");const P=ee[Ie].nome;if(!confirm(`Excluir a coleção "${P}"? Isso também removerá os checks desta coleção.`))return;const N={};Object.keys(de).forEach(O=>{O.startsWith(P+"__")||(N[O]=de[O])}),de=N,Re(_,de),ee.splice(Ie,1),Re(w,ee),Ie=ee.length?Math.max(0,Ie-1):-1,mt(),ze(),Le("Coleção excluída"),window.syncCloud&&window.syncCloud()}),i("#addItem")?.addEventListener("click",()=>{if(Ie<0||!ee[Ie])return alert("Crie e selecione uma coleção.");const P=document.querySelector("#itemNumero")?.value?.trim()||"",N=document.querySelector("#itemNome")?.value?.trim()||"",O=document.querySelector("#itemImg")?.value?.trim()||"";if(!P||!N)return alert("Informe número e modelo.");if(O&&!Ot(O))return alert("URL inválida. Use http(s)://");ee[Ie].items.push({n:P,modelo:N,img:O}),Re(w,ee),document.querySelector("#itemNumero").value="",document.querySelector("#itemNome").value="",document.querySelector("#itemImg").value="",at(),ze(),Le("Item adicionado"),window.syncCloud&&window.syncCloud()});function at(){if(!p||(p.innerHTML="",Ie<0||!ee[Ie]))return;const P=ee[Ie];dt(P.items||[]).forEach((N,O)=>{const L=document.createElement("div");L.className="mini",L.innerHTML=`
        <img src="${N.img||""}" alt=""/>
        <div style="width:100%">
          <div style="display:grid;gap:6px;margin-bottom:6px">
            <input data-k="n" value="${String(N.n??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;")}" placeholder="nº (ex.: 01/10)" disabled/>
            <input data-k="modelo" value="${String(N.modelo??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;")}" placeholder="modelo" disabled/>
            <input data-k="img" value="${String(N.img??"").replace(/&/g,"&amp;").replace(/"/g,"&quot;")}" placeholder="URL da imagem" disabled/>
          </div>
          <div class="toolbar" style="display:none;gap:6px">
            <button class="btn" data-act="save" type="button" style="flex:1">Salvar</button>
            <button class="btn ghost" data-act="cancel" type="button">Cancelar</button>
          </div>
        </div>`;const W=document.createElement("div");W.className="actions";const G=document.createElement("button");G.className="btn ghost",G.textContent="✏️",G.type="button";const oe=document.createElement("button");oe.className="btn ghost",oe.textContent="🗑️",oe.type="button",W.append(G,oe),L.appendChild(W);const fe=()=>[...L.querySelectorAll("input[data-k]")],Fe=()=>L.querySelector(".toolbar"),Se=Te=>{fe().forEach(ne=>ne.disabled=!Te),Fe().style.display=Te?"flex":"none",G.style.display=Te?"none":"inline-flex"};G.addEventListener("click",()=>Se(!0)),Fe().querySelector('[data-act="cancel"]').addEventListener("click",()=>{Se(!1),at()}),Fe().querySelector('[data-act="save"]').addEventListener("click",()=>{const Te={};if(fe().forEach(ne=>Te[ne.dataset.k]=ne.value.trim()),!Te.n||!Te.modelo)return alert("Informe número e modelo.");if(Te.img&&!Ot(Te.img))return alert("URL inválida. Use http(s)://");P.items[O]={n:Te.n,modelo:Te.modelo,img:Te.img},Re(w,ee),at(),ze(),Le("Item atualizado"),window.syncCloud&&window.syncCloud()}),oe.addEventListener("click",()=>{P.items.splice(O,1),Re(w,ee),at(),ze(),Le("Item removido"),window.syncCloud&&window.syncCloud()}),p.appendChild(L)})}function mt(){f&&(f.innerHTML="",ee.forEach((P,N)=>{const O=document.createElement("option");O.value=String(N),O.textContent=P.nome,f.appendChild(O)}),ee.length===0&&(Ie=-1),Ie<0&&ee.length&&(Ie=0),Ie>=0&&ee[Ie]&&(f.value=String(Ie)),at(),ze())}function Oi(){const P=new Date,N=O=>String(O).padStart(2,"0");return`${P.getFullYear()}${N(P.getMonth()+1)}${N(P.getDate())}`}function Zs(){const P={version:1,exportedAt:new Date().toISOString(),series:JSON.parse(JSON.stringify(ee)),checks:JSON.parse(JSON.stringify(de))},N=new Blob([JSON.stringify(P,null,2)],{type:"application/json"}),O=document.createElement("a");O.href=URL.createObjectURL(N),O.download=`hotlist-backup-${Oi()}.json`,document.body.appendChild(O),O.click(),O.remove(),URL.revokeObjectURL(O.href),Le("Backup exportado (.json)")}T?.addEventListener("click",Zs);let $e=null;x?.addEventListener("click",()=>{$e=null,k&&(k.value=""),D&&(D.disabled=!0),z&&(z.textContent=""),Le("Seleção limpa")}),k?.addEventListener("change",async P=>{$e=null,D&&(D.disabled=!0),z&&(z.textContent="");const N=P.target.files?.[0];if(N)try{const O=await N.text(),L=JSON.parse(O);if(typeof L!="object"||L===null||!Array.isArray(L.series)||typeof L.checks!="object")throw new Error("invalid");$e=L;const W=L.series.length,G=L.series.reduce((oe,fe)=>oe+(Array.isArray(fe.items)?fe.items.length:0),0);z&&(z.textContent=`Arquivo válido • Coleções: ${W} • Itens: ${G} • Exportado em: ${L.exportedAt||"?"}`),D&&(D.disabled=!1)}catch{z&&(z.textContent="Arquivo inválido. Use um .json exportado pelo próprio app."),D&&(D.disabled=!0)}}),D?.addEventListener("click",()=>{if(!$e)return;if((document.querySelector('input[name="mergeMode"]:checked')?.value||"merge")==="replace"){if(!confirm("Isso vai substituir TODAS as coleções, itens e marcados pelos do arquivo. Continuar?"))return;ee=JSON.parse(JSON.stringify($e.series)),de=JSON.parse(JSON.stringify($e.checks)),Re(w,ee),Re(_,de),mt(),ze(),Le("Importado (substituído)"),window.syncCloud&&window.syncCloud()}else{const N=new Map(ee.map(O=>[O.nome,O]));($e.series||[]).forEach(O=>{if(!N.has(O.nome))N.set(O.nome,{nome:O.nome,items:JSON.parse(JSON.stringify(O.items||[]))});else{const L=N.get(O.nome),W=new Set((L.items||[]).map(G=>String(G.n)+"|"+(G.modelo||"")));(O.items||[]).forEach(G=>{const oe=String(G.n)+"|"+(G.modelo||"");W.has(oe)||(L.items.push(JSON.parse(JSON.stringify(G))),W.add(oe))})}}),ee=Array.from(N.values()),de={...de,...$e.checks||{}},Re(w,ee),Re(_,de),mt(),ze(),Le("Importado (mesclado)"),window.syncCloud&&window.syncCloud()}$e=null,k&&(k.value=""),D&&(D.disabled=!0),z&&(z.textContent="")});const jn=new bt,Mi=window.matchMedia?.("(display-mode: standalone)")?.matches||window.navigator.standalone===!0;Pg(t).catch(()=>{}),K?.addEventListener("click",async()=>{try{if(Mi){await nu(t,jn);return}await Eg(t,jn)}catch(P){P?.code==="auth/popup-blocked"||P?.code==="auth/operation-not-supported-in-this-environment"?await nu(t,jn):P?.code==="auth/unauthorized-domain"?alert("Domínio não autorizado no Firebase Authentication. Adicione seu domínio em Authentication → Settings → Authorized domains."):alert("Falha ao entrar: "+(P?.message||P))}}),j?.addEventListener("click",()=>tg(t));function un(){return{series:ee,checks:de}}function eo(P=600){we&&window.clearTimeout(we),we=window.setTimeout(to,P)}async function to(){const P=t.currentUser;if(!P)return;const N=pl(n,"users",P.uid,"app","hotlist"),O=cn(un());Ci=br(O);const L={state:O,updatedAt:Il()};await yl(N,L,{merge:!0})}window.syncCloud=()=>Promise.resolve(eo()),eg(t,async P=>{if(P){K&&(K.style.display="none"),X&&(X.style.display="flex"),se&&(se.textContent=P.displayName||P.email||"Usuário"),Y&&(Y.src=P.photoURL||"");const N=pl(n,"users",P.uid,"app","hotlist"),O=await Mv(N);if(O.exists()){const L=O.data().state||{series:[],checks:{}},W=cn(L);ee=W.series,de=W.checks,Re(w,ee),Re(_,de),mt(),ze()}else{const L=cn(un());await yl(N,{state:L,updatedAt:Il()},{merge:!0})}je=Lv(N,L=>{if(!L.exists()||L.metadata.hasPendingWrites)return;const W=L.data().state||{series:[],checks:{}},G=cn(W),oe=br(G);if(oe===Ci)return;const fe=br(cn(un()));oe!==fe&&(ee=G.series,de=G.checks,Re(w,ee),Re(_,de),setTimeout(()=>{mt(),ze()},0))})}else K&&(K.style.display="inline-block"),X&&(X.style.display="none"),je&&(je(),je=null)});const ln=ht(Je,"tab-colecoes");return ln&&ln!=="tab-colecoes"&&document.querySelector(`.tab-btn[data-tab="${ln}"]`)?.click(),mt(),"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/hotlist/service-worker.js").catch(()=>{})}),Ro=()=>{je&&je(),I?.removeEventListener("click",Vr),g?.removeEventListener("click",xi),y?.removeEventListener("click",Bn),document.removeEventListener("keydown",qn)},Ro}export{Kv as initLegacyRuntime};
