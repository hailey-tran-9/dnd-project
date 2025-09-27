import{a as C,t as s,B as it,v as rt}from"./chunk-ZYFC6VSF-CcTFIW6Y.js";import{u as D,a as L}from"./react-redux-DItQxzwd.js";import{g as st}from"./index-35c79a8a-B373Vm6L.js";import{_ as R,e as Oe}from"./index.esm2017-T8jfeyBt.js";import{g as at,u as ye,r as _e,i as X}from"./index.esm2017-BgJZ7Iac.js";import{an as Le,ao as ie,ap as Re,aq as ot,ar as ct,as as Fe,at as oe,K as x,au as Z,av as lt,al as w,ak as Pe,i as q,aw as dt,ax as ut,A as pt,d as ht,r as mt,I as ue,F as qe,a7 as ft,N as xt,ah as gt,a4 as J,g as De,a5 as Me,ay as k,az as Be,aA as yt}from"./character-creation-slice-DVYpsuMn.js";import{B as T}from"./Button-DRBTarQj.js";import{S as _t,I as vt}from"./Selection-B6wnQ1jn.js";import{e as ce,n as ve,c as W}from"./util-BYEQYhcI.js";import{I as bt}from"./Input-D8yPxS1O.js";import{v as Et}from"./v4-C6aID195.js";import"./redux-toolkit.modern-lSMJCofG.js";function Ct(e){return typeof e=="object"&&e!==null}function Nt(e,t){if(!!!e)throw new Error("Unexpected invariant triggered.")}const jt=/\r\n|[\n\r]/g;function pe(e,t){let n=0,r=1;for(const i of e.body.matchAll(jt)){if(typeof i.index=="number"||Nt(!1),i.index>=t)break;n=i.index+i[0].length,r+=1}return{line:r,column:t+1-n}}function kt(e){return $e(e.source,pe(e.source,e.start))}function $e(e,t){const n=e.locationOffset.column-1,r="".padStart(n)+e.body,i=t.line-1,a=e.locationOffset.line-1,c=t.line+a,o=t.line===1?n:0,p=t.column+o,m=`${e.name}:${c}:${p}
`,u=r.split(/\r\n|[\n\r]/g),l=u[i];if(l.length>120){const h=Math.floor(p/80),f=p%80,g=[];for(let y=0;y<l.length;y+=80)g.push(l.slice(y,y+80));return m+be([[`${c} |`,g[0]],...g.slice(1,h+1).map(y=>["|",y]),["|","^".padStart(f)],["|",g[h+1]]])}return m+be([[`${c-1} |`,u[i-1]],[`${c} |`,l],["|","^".padStart(p)],[`${c+1} |`,u[i+1]]])}function be(e){const t=e.filter(([r,i])=>i!==void 0),n=Math.max(...t.map(([r])=>r.length));return t.map(([r,i])=>r.padStart(n)+(i?" "+i:"")).join(`
`)}function St(e){const t=e[0];return t==null||"kind"in t||"length"in t?{nodes:t,source:e[1],positions:e[2],path:e[3],originalError:e[4],extensions:e[5]}:t}class xe extends Error{constructor(t,...n){var r,i,a;const{nodes:c,source:o,positions:p,path:m,originalError:u,extensions:l}=St(n);super(t),this.name="GraphQLError",this.path=m??void 0,this.originalError=u??void 0,this.nodes=Ee(Array.isArray(c)?c:c?[c]:void 0);const h=Ee((r=this.nodes)===null||r===void 0?void 0:r.map(g=>g.loc).filter(g=>g!=null));this.source=o??(h==null||(i=h[0])===null||i===void 0?void 0:i.source),this.positions=p??(h==null?void 0:h.map(g=>g.start)),this.locations=p&&o?p.map(g=>pe(o,g)):h==null?void 0:h.map(g=>pe(g.source,g.start));const f=Ct(u==null?void 0:u.extensions)?u==null?void 0:u.extensions:void 0;this.extensions=(a=l??f)!==null&&a!==void 0?a:Object.create(null),Object.defineProperties(this,{message:{writable:!0,enumerable:!0},name:{enumerable:!1},nodes:{enumerable:!1},source:{enumerable:!1},positions:{enumerable:!1},originalError:{enumerable:!1}}),u!=null&&u.stack?Object.defineProperty(this,"stack",{value:u.stack,writable:!0,configurable:!0}):Error.captureStackTrace?Error.captureStackTrace(this,xe):Object.defineProperty(this,"stack",{value:Error().stack,writable:!0,configurable:!0})}get[Symbol.toStringTag](){return"GraphQLError"}toString(){let t=this.message;if(this.nodes)for(const n of this.nodes)n.loc&&(t+=`

`+kt(n.loc));else if(this.source&&this.locations)for(const n of this.locations)t+=`

`+$e(this.source,n);return t}toJSON(){const t={message:this.message};return this.locations!=null&&(t.locations=this.locations),this.path!=null&&(t.path=this.path),this.extensions!=null&&Object.keys(this.extensions).length>0&&(t.extensions=this.extensions),t}}function Ee(e){return e===void 0||e.length===0?void 0:e}function N(e,t,n){return new xe(`Syntax Error: ${n}`,{source:e,positions:[t]})}var he;(function(e){e.QUERY="QUERY",e.MUTATION="MUTATION",e.SUBSCRIPTION="SUBSCRIPTION",e.FIELD="FIELD",e.FRAGMENT_DEFINITION="FRAGMENT_DEFINITION",e.FRAGMENT_SPREAD="FRAGMENT_SPREAD",e.INLINE_FRAGMENT="INLINE_FRAGMENT",e.VARIABLE_DEFINITION="VARIABLE_DEFINITION",e.SCHEMA="SCHEMA",e.SCALAR="SCALAR",e.OBJECT="OBJECT",e.FIELD_DEFINITION="FIELD_DEFINITION",e.ARGUMENT_DEFINITION="ARGUMENT_DEFINITION",e.INTERFACE="INTERFACE",e.UNION="UNION",e.ENUM="ENUM",e.ENUM_VALUE="ENUM_VALUE",e.INPUT_OBJECT="INPUT_OBJECT",e.INPUT_FIELD_DEFINITION="INPUT_FIELD_DEFINITION"})(he||(he={}));var d;(function(e){e.SOF="<SOF>",e.EOF="<EOF>",e.BANG="!",e.DOLLAR="$",e.AMP="&",e.PAREN_L="(",e.PAREN_R=")",e.SPREAD="...",e.COLON=":",e.EQUALS="=",e.AT="@",e.BRACKET_L="[",e.BRACKET_R="]",e.BRACE_L="{",e.PIPE="|",e.BRACE_R="}",e.NAME="Name",e.INT="Int",e.FLOAT="Float",e.STRING="String",e.BLOCK_STRING="BlockString",e.COMMENT="Comment"})(d||(d={}));class It{constructor(t){const n=new Le(d.SOF,0,0,0,0);this.source=t,this.lastToken=n,this.token=n,this.line=1,this.lineStart=0}get[Symbol.toStringTag](){return"Lexer"}advance(){return this.lastToken=this.token,this.token=this.lookahead()}lookahead(){let t=this.token;if(t.kind!==d.EOF)do if(t.next)t=t.next;else{const n=Tt(this,t.end);t.next=n,n.prev=t,t=n}while(t.kind===d.COMMENT);return t}}function wt(e){return e===d.BANG||e===d.DOLLAR||e===d.AMP||e===d.PAREN_L||e===d.PAREN_R||e===d.SPREAD||e===d.COLON||e===d.EQUALS||e===d.AT||e===d.BRACKET_L||e===d.BRACKET_R||e===d.BRACE_L||e===d.PIPE||e===d.BRACE_R}function G(e){return e>=0&&e<=55295||e>=57344&&e<=1114111}function se(e,t){return Ue(e.charCodeAt(t))&&Ve(e.charCodeAt(t+1))}function Ue(e){return e>=55296&&e<=56319}function Ve(e){return e>=56320&&e<=57343}function B(e,t){const n=e.source.body.codePointAt(t);if(n===void 0)return d.EOF;if(n>=32&&n<=126){const r=String.fromCodePoint(n);return r==='"'?`'"'`:`"${r}"`}return"U+"+n.toString(16).toUpperCase().padStart(4,"0")}function v(e,t,n,r,i){const a=e.line,c=1+n-e.lineStart;return new Le(t,n,r,a,c,i)}function Tt(e,t){const n=e.source.body,r=n.length;let i=t;for(;i<r;){const a=n.charCodeAt(i);switch(a){case 65279:case 9:case 32:case 44:++i;continue;case 10:++i,++e.line,e.lineStart=i;continue;case 13:n.charCodeAt(i+1)===10?i+=2:++i,++e.line,e.lineStart=i;continue;case 35:return At(e,i);case 33:return v(e,d.BANG,i,i+1);case 36:return v(e,d.DOLLAR,i,i+1);case 38:return v(e,d.AMP,i,i+1);case 40:return v(e,d.PAREN_L,i,i+1);case 41:return v(e,d.PAREN_R,i,i+1);case 46:if(n.charCodeAt(i+1)===46&&n.charCodeAt(i+2)===46)return v(e,d.SPREAD,i,i+3);break;case 58:return v(e,d.COLON,i,i+1);case 61:return v(e,d.EQUALS,i,i+1);case 64:return v(e,d.AT,i,i+1);case 91:return v(e,d.BRACKET_L,i,i+1);case 93:return v(e,d.BRACKET_R,i,i+1);case 123:return v(e,d.BRACE_L,i,i+1);case 124:return v(e,d.PIPE,i,i+1);case 125:return v(e,d.BRACE_R,i,i+1);case 34:return n.charCodeAt(i+1)===34&&n.charCodeAt(i+2)===34?qt(e,i):Lt(e,i)}if(ie(a)||a===45)return Ot(e,i,a);if(Re(a))return Dt(e,i);throw N(e.source,i,a===39?`Unexpected single quote character ('), did you mean to use a double quote (")?`:G(a)||se(n,i)?`Unexpected character: ${B(e,i)}.`:`Invalid character: ${B(e,i)}.`)}return v(e,d.EOF,r,r)}function At(e,t){const n=e.source.body,r=n.length;let i=t+1;for(;i<r;){const a=n.charCodeAt(i);if(a===10||a===13)break;if(G(a))++i;else if(se(n,i))i+=2;else break}return v(e,d.COMMENT,t,i,n.slice(t+1,i))}function Ot(e,t,n){const r=e.source.body;let i=t,a=n,c=!1;if(a===45&&(a=r.charCodeAt(++i)),a===48){if(a=r.charCodeAt(++i),ie(a))throw N(e.source,i,`Invalid number, unexpected digit after 0: ${B(e,i)}.`)}else i=le(e,i,a),a=r.charCodeAt(i);if(a===46&&(c=!0,a=r.charCodeAt(++i),i=le(e,i,a),a=r.charCodeAt(i)),(a===69||a===101)&&(c=!0,a=r.charCodeAt(++i),(a===43||a===45)&&(a=r.charCodeAt(++i)),i=le(e,i,a),a=r.charCodeAt(i)),a===46||Re(a))throw N(e.source,i,`Invalid number, expected digit but got: ${B(e,i)}.`);return v(e,c?d.FLOAT:d.INT,t,i,r.slice(t,i))}function le(e,t,n){if(!ie(n))throw N(e.source,t,`Invalid number, expected digit but got: ${B(e,t)}.`);const r=e.source.body;let i=t+1;for(;ie(r.charCodeAt(i));)++i;return i}function Lt(e,t){const n=e.source.body,r=n.length;let i=t+1,a=i,c="";for(;i<r;){const o=n.charCodeAt(i);if(o===34)return c+=n.slice(a,i),v(e,d.STRING,t,i+1,c);if(o===92){c+=n.slice(a,i);const p=n.charCodeAt(i+1)===117?n.charCodeAt(i+2)===123?Rt(e,i):Ft(e,i):Pt(e,i);c+=p.value,i+=p.size,a=i;continue}if(o===10||o===13)break;if(G(o))++i;else if(se(n,i))i+=2;else throw N(e.source,i,`Invalid character within String: ${B(e,i)}.`)}throw N(e.source,i,"Unterminated string.")}function Rt(e,t){const n=e.source.body;let r=0,i=3;for(;i<12;){const a=n.charCodeAt(t+i++);if(a===125){if(i<5||!G(r))break;return{value:String.fromCodePoint(r),size:i}}if(r=r<<4|z(a),r<0)break}throw N(e.source,t,`Invalid Unicode escape sequence: "${n.slice(t,t+i)}".`)}function Ft(e,t){const n=e.source.body,r=Ce(n,t+2);if(G(r))return{value:String.fromCodePoint(r),size:6};if(Ue(r)&&n.charCodeAt(t+6)===92&&n.charCodeAt(t+7)===117){const i=Ce(n,t+8);if(Ve(i))return{value:String.fromCodePoint(r,i),size:12}}throw N(e.source,t,`Invalid Unicode escape sequence: "${n.slice(t,t+6)}".`)}function Ce(e,t){return z(e.charCodeAt(t))<<12|z(e.charCodeAt(t+1))<<8|z(e.charCodeAt(t+2))<<4|z(e.charCodeAt(t+3))}function z(e){return e>=48&&e<=57?e-48:e>=65&&e<=70?e-55:e>=97&&e<=102?e-87:-1}function Pt(e,t){const n=e.source.body;switch(n.charCodeAt(t+1)){case 34:return{value:'"',size:2};case 92:return{value:"\\",size:2};case 47:return{value:"/",size:2};case 98:return{value:"\b",size:2};case 102:return{value:"\f",size:2};case 110:return{value:`
`,size:2};case 114:return{value:"\r",size:2};case 116:return{value:"	",size:2}}throw N(e.source,t,`Invalid character escape sequence: "${n.slice(t,t+2)}".`)}function qt(e,t){const n=e.source.body,r=n.length;let i=e.lineStart,a=t+3,c=a,o="";const p=[];for(;a<r;){const m=n.charCodeAt(a);if(m===34&&n.charCodeAt(a+1)===34&&n.charCodeAt(a+2)===34){o+=n.slice(c,a),p.push(o);const u=v(e,d.BLOCK_STRING,t,a+3,ot(p).join(`
`));return e.line+=p.length-1,e.lineStart=i,u}if(m===92&&n.charCodeAt(a+1)===34&&n.charCodeAt(a+2)===34&&n.charCodeAt(a+3)===34){o+=n.slice(c,a),c=a+1,a+=4;continue}if(m===10||m===13){o+=n.slice(c,a),p.push(o),m===13&&n.charCodeAt(a+1)===10?a+=2:++a,o="",c=a,i=a;continue}if(G(m))++a;else if(se(n,a))a+=2;else throw N(e.source,a,`Invalid character within String: ${B(e,a)}.`)}throw N(e.source,a,"Unterminated string.")}function Dt(e,t){const n=e.source.body,r=n.length;let i=t+1;for(;i<r;){const a=n.charCodeAt(i);if(ct(a))++i;else break}return v(e,d.NAME,t,i,n.slice(t,i))}const Mt=globalThis.process&&!0,Bt=Mt?function(t,n){return t instanceof n}:function(t,n){if(t instanceof n)return!0;if(typeof t=="object"&&t!==null){var r;const i=n.prototype[Symbol.toStringTag],a=Symbol.toStringTag in t?t[Symbol.toStringTag]:(r=t.constructor)===null||r===void 0?void 0:r.name;if(i===a){const c=Fe(t);throw new Error(`Cannot use ${i} "${c}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`)}}return!1};class Ge{constructor(t,n="GraphQL request",r={line:1,column:1}){typeof t=="string"||oe(!1,`Body must be a string. Received: ${Fe(t)}.`),this.body=t,this.name=n,this.locationOffset=r,this.locationOffset.line>0||oe(!1,"line in locationOffset is 1-indexed and must be positive."),this.locationOffset.column>0||oe(!1,"column in locationOffset is 1-indexed and must be positive.")}get[Symbol.toStringTag](){return"Source"}}function $t(e){return Bt(e,Ge)}function Ut(e,t){const n=new Vt(e,t),r=n.parseDocument();return Object.defineProperty(r,"tokenCount",{enumerable:!1,value:n.tokenCount}),r}class Vt{constructor(t,n={}){const r=$t(t)?t:new Ge(t);this._lexer=new It(r),this._options=n,this._tokenCounter=0}get tokenCount(){return this._tokenCounter}parseName(){const t=this.expectToken(d.NAME);return this.node(t,{kind:x.NAME,value:t.value})}parseDocument(){return this.node(this._lexer.token,{kind:x.DOCUMENT,definitions:this.many(d.SOF,this.parseDefinition,d.EOF)})}parseDefinition(){if(this.peek(d.BRACE_L))return this.parseOperationDefinition();const t=this.peekDescription(),n=t?this._lexer.lookahead():this._lexer.token;if(n.kind===d.NAME){switch(n.value){case"schema":return this.parseSchemaDefinition();case"scalar":return this.parseScalarTypeDefinition();case"type":return this.parseObjectTypeDefinition();case"interface":return this.parseInterfaceTypeDefinition();case"union":return this.parseUnionTypeDefinition();case"enum":return this.parseEnumTypeDefinition();case"input":return this.parseInputObjectTypeDefinition();case"directive":return this.parseDirectiveDefinition()}if(t)throw N(this._lexer.source,this._lexer.token.start,"Unexpected description, descriptions are supported only on type definitions.");switch(n.value){case"query":case"mutation":case"subscription":return this.parseOperationDefinition();case"fragment":return this.parseFragmentDefinition();case"extend":return this.parseTypeSystemExtension()}}throw this.unexpected(n)}parseOperationDefinition(){const t=this._lexer.token;if(this.peek(d.BRACE_L))return this.node(t,{kind:x.OPERATION_DEFINITION,operation:Z.QUERY,name:void 0,variableDefinitions:[],directives:[],selectionSet:this.parseSelectionSet()});const n=this.parseOperationType();let r;return this.peek(d.NAME)&&(r=this.parseName()),this.node(t,{kind:x.OPERATION_DEFINITION,operation:n,name:r,variableDefinitions:this.parseVariableDefinitions(),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()})}parseOperationType(){const t=this.expectToken(d.NAME);switch(t.value){case"query":return Z.QUERY;case"mutation":return Z.MUTATION;case"subscription":return Z.SUBSCRIPTION}throw this.unexpected(t)}parseVariableDefinitions(){return this.optionalMany(d.PAREN_L,this.parseVariableDefinition,d.PAREN_R)}parseVariableDefinition(){return this.node(this._lexer.token,{kind:x.VARIABLE_DEFINITION,variable:this.parseVariable(),type:(this.expectToken(d.COLON),this.parseTypeReference()),defaultValue:this.expectOptionalToken(d.EQUALS)?this.parseConstValueLiteral():void 0,directives:this.parseConstDirectives()})}parseVariable(){const t=this._lexer.token;return this.expectToken(d.DOLLAR),this.node(t,{kind:x.VARIABLE,name:this.parseName()})}parseSelectionSet(){return this.node(this._lexer.token,{kind:x.SELECTION_SET,selections:this.many(d.BRACE_L,this.parseSelection,d.BRACE_R)})}parseSelection(){return this.peek(d.SPREAD)?this.parseFragment():this.parseField()}parseField(){const t=this._lexer.token,n=this.parseName();let r,i;return this.expectOptionalToken(d.COLON)?(r=n,i=this.parseName()):i=n,this.node(t,{kind:x.FIELD,alias:r,name:i,arguments:this.parseArguments(!1),directives:this.parseDirectives(!1),selectionSet:this.peek(d.BRACE_L)?this.parseSelectionSet():void 0})}parseArguments(t){const n=t?this.parseConstArgument:this.parseArgument;return this.optionalMany(d.PAREN_L,n,d.PAREN_R)}parseArgument(t=!1){const n=this._lexer.token,r=this.parseName();return this.expectToken(d.COLON),this.node(n,{kind:x.ARGUMENT,name:r,value:this.parseValueLiteral(t)})}parseConstArgument(){return this.parseArgument(!0)}parseFragment(){const t=this._lexer.token;this.expectToken(d.SPREAD);const n=this.expectOptionalKeyword("on");return!n&&this.peek(d.NAME)?this.node(t,{kind:x.FRAGMENT_SPREAD,name:this.parseFragmentName(),directives:this.parseDirectives(!1)}):this.node(t,{kind:x.INLINE_FRAGMENT,typeCondition:n?this.parseNamedType():void 0,directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()})}parseFragmentDefinition(){const t=this._lexer.token;return this.expectKeyword("fragment"),this._options.allowLegacyFragmentVariables===!0?this.node(t,{kind:x.FRAGMENT_DEFINITION,name:this.parseFragmentName(),variableDefinitions:this.parseVariableDefinitions(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()}):this.node(t,{kind:x.FRAGMENT_DEFINITION,name:this.parseFragmentName(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()})}parseFragmentName(){if(this._lexer.token.value==="on")throw this.unexpected();return this.parseName()}parseValueLiteral(t){const n=this._lexer.token;switch(n.kind){case d.BRACKET_L:return this.parseList(t);case d.BRACE_L:return this.parseObject(t);case d.INT:return this.advanceLexer(),this.node(n,{kind:x.INT,value:n.value});case d.FLOAT:return this.advanceLexer(),this.node(n,{kind:x.FLOAT,value:n.value});case d.STRING:case d.BLOCK_STRING:return this.parseStringLiteral();case d.NAME:switch(this.advanceLexer(),n.value){case"true":return this.node(n,{kind:x.BOOLEAN,value:!0});case"false":return this.node(n,{kind:x.BOOLEAN,value:!1});case"null":return this.node(n,{kind:x.NULL});default:return this.node(n,{kind:x.ENUM,value:n.value})}case d.DOLLAR:if(t)if(this.expectToken(d.DOLLAR),this._lexer.token.kind===d.NAME){const r=this._lexer.token.value;throw N(this._lexer.source,n.start,`Unexpected variable "$${r}" in constant value.`)}else throw this.unexpected(n);return this.parseVariable();default:throw this.unexpected()}}parseConstValueLiteral(){return this.parseValueLiteral(!0)}parseStringLiteral(){const t=this._lexer.token;return this.advanceLexer(),this.node(t,{kind:x.STRING,value:t.value,block:t.kind===d.BLOCK_STRING})}parseList(t){const n=()=>this.parseValueLiteral(t);return this.node(this._lexer.token,{kind:x.LIST,values:this.any(d.BRACKET_L,n,d.BRACKET_R)})}parseObject(t){const n=()=>this.parseObjectField(t);return this.node(this._lexer.token,{kind:x.OBJECT,fields:this.any(d.BRACE_L,n,d.BRACE_R)})}parseObjectField(t){const n=this._lexer.token,r=this.parseName();return this.expectToken(d.COLON),this.node(n,{kind:x.OBJECT_FIELD,name:r,value:this.parseValueLiteral(t)})}parseDirectives(t){const n=[];for(;this.peek(d.AT);)n.push(this.parseDirective(t));return n}parseConstDirectives(){return this.parseDirectives(!0)}parseDirective(t){const n=this._lexer.token;return this.expectToken(d.AT),this.node(n,{kind:x.DIRECTIVE,name:this.parseName(),arguments:this.parseArguments(t)})}parseTypeReference(){const t=this._lexer.token;let n;if(this.expectOptionalToken(d.BRACKET_L)){const r=this.parseTypeReference();this.expectToken(d.BRACKET_R),n=this.node(t,{kind:x.LIST_TYPE,type:r})}else n=this.parseNamedType();return this.expectOptionalToken(d.BANG)?this.node(t,{kind:x.NON_NULL_TYPE,type:n}):n}parseNamedType(){return this.node(this._lexer.token,{kind:x.NAMED_TYPE,name:this.parseName()})}peekDescription(){return this.peek(d.STRING)||this.peek(d.BLOCK_STRING)}parseDescription(){if(this.peekDescription())return this.parseStringLiteral()}parseSchemaDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("schema");const r=this.parseConstDirectives(),i=this.many(d.BRACE_L,this.parseOperationTypeDefinition,d.BRACE_R);return this.node(t,{kind:x.SCHEMA_DEFINITION,description:n,directives:r,operationTypes:i})}parseOperationTypeDefinition(){const t=this._lexer.token,n=this.parseOperationType();this.expectToken(d.COLON);const r=this.parseNamedType();return this.node(t,{kind:x.OPERATION_TYPE_DEFINITION,operation:n,type:r})}parseScalarTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("scalar");const r=this.parseName(),i=this.parseConstDirectives();return this.node(t,{kind:x.SCALAR_TYPE_DEFINITION,description:n,name:r,directives:i})}parseObjectTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("type");const r=this.parseName(),i=this.parseImplementsInterfaces(),a=this.parseConstDirectives(),c=this.parseFieldsDefinition();return this.node(t,{kind:x.OBJECT_TYPE_DEFINITION,description:n,name:r,interfaces:i,directives:a,fields:c})}parseImplementsInterfaces(){return this.expectOptionalKeyword("implements")?this.delimitedMany(d.AMP,this.parseNamedType):[]}parseFieldsDefinition(){return this.optionalMany(d.BRACE_L,this.parseFieldDefinition,d.BRACE_R)}parseFieldDefinition(){const t=this._lexer.token,n=this.parseDescription(),r=this.parseName(),i=this.parseArgumentDefs();this.expectToken(d.COLON);const a=this.parseTypeReference(),c=this.parseConstDirectives();return this.node(t,{kind:x.FIELD_DEFINITION,description:n,name:r,arguments:i,type:a,directives:c})}parseArgumentDefs(){return this.optionalMany(d.PAREN_L,this.parseInputValueDef,d.PAREN_R)}parseInputValueDef(){const t=this._lexer.token,n=this.parseDescription(),r=this.parseName();this.expectToken(d.COLON);const i=this.parseTypeReference();let a;this.expectOptionalToken(d.EQUALS)&&(a=this.parseConstValueLiteral());const c=this.parseConstDirectives();return this.node(t,{kind:x.INPUT_VALUE_DEFINITION,description:n,name:r,type:i,defaultValue:a,directives:c})}parseInterfaceTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("interface");const r=this.parseName(),i=this.parseImplementsInterfaces(),a=this.parseConstDirectives(),c=this.parseFieldsDefinition();return this.node(t,{kind:x.INTERFACE_TYPE_DEFINITION,description:n,name:r,interfaces:i,directives:a,fields:c})}parseUnionTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("union");const r=this.parseName(),i=this.parseConstDirectives(),a=this.parseUnionMemberTypes();return this.node(t,{kind:x.UNION_TYPE_DEFINITION,description:n,name:r,directives:i,types:a})}parseUnionMemberTypes(){return this.expectOptionalToken(d.EQUALS)?this.delimitedMany(d.PIPE,this.parseNamedType):[]}parseEnumTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("enum");const r=this.parseName(),i=this.parseConstDirectives(),a=this.parseEnumValuesDefinition();return this.node(t,{kind:x.ENUM_TYPE_DEFINITION,description:n,name:r,directives:i,values:a})}parseEnumValuesDefinition(){return this.optionalMany(d.BRACE_L,this.parseEnumValueDefinition,d.BRACE_R)}parseEnumValueDefinition(){const t=this._lexer.token,n=this.parseDescription(),r=this.parseEnumValueName(),i=this.parseConstDirectives();return this.node(t,{kind:x.ENUM_VALUE_DEFINITION,description:n,name:r,directives:i})}parseEnumValueName(){if(this._lexer.token.value==="true"||this._lexer.token.value==="false"||this._lexer.token.value==="null")throw N(this._lexer.source,this._lexer.token.start,`${ee(this._lexer.token)} is reserved and cannot be used for an enum value.`);return this.parseName()}parseInputObjectTypeDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("input");const r=this.parseName(),i=this.parseConstDirectives(),a=this.parseInputFieldsDefinition();return this.node(t,{kind:x.INPUT_OBJECT_TYPE_DEFINITION,description:n,name:r,directives:i,fields:a})}parseInputFieldsDefinition(){return this.optionalMany(d.BRACE_L,this.parseInputValueDef,d.BRACE_R)}parseTypeSystemExtension(){const t=this._lexer.lookahead();if(t.kind===d.NAME)switch(t.value){case"schema":return this.parseSchemaExtension();case"scalar":return this.parseScalarTypeExtension();case"type":return this.parseObjectTypeExtension();case"interface":return this.parseInterfaceTypeExtension();case"union":return this.parseUnionTypeExtension();case"enum":return this.parseEnumTypeExtension();case"input":return this.parseInputObjectTypeExtension()}throw this.unexpected(t)}parseSchemaExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("schema");const n=this.parseConstDirectives(),r=this.optionalMany(d.BRACE_L,this.parseOperationTypeDefinition,d.BRACE_R);if(n.length===0&&r.length===0)throw this.unexpected();return this.node(t,{kind:x.SCHEMA_EXTENSION,directives:n,operationTypes:r})}parseScalarTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("scalar");const n=this.parseName(),r=this.parseConstDirectives();if(r.length===0)throw this.unexpected();return this.node(t,{kind:x.SCALAR_TYPE_EXTENSION,name:n,directives:r})}parseObjectTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("type");const n=this.parseName(),r=this.parseImplementsInterfaces(),i=this.parseConstDirectives(),a=this.parseFieldsDefinition();if(r.length===0&&i.length===0&&a.length===0)throw this.unexpected();return this.node(t,{kind:x.OBJECT_TYPE_EXTENSION,name:n,interfaces:r,directives:i,fields:a})}parseInterfaceTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("interface");const n=this.parseName(),r=this.parseImplementsInterfaces(),i=this.parseConstDirectives(),a=this.parseFieldsDefinition();if(r.length===0&&i.length===0&&a.length===0)throw this.unexpected();return this.node(t,{kind:x.INTERFACE_TYPE_EXTENSION,name:n,interfaces:r,directives:i,fields:a})}parseUnionTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("union");const n=this.parseName(),r=this.parseConstDirectives(),i=this.parseUnionMemberTypes();if(r.length===0&&i.length===0)throw this.unexpected();return this.node(t,{kind:x.UNION_TYPE_EXTENSION,name:n,directives:r,types:i})}parseEnumTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("enum");const n=this.parseName(),r=this.parseConstDirectives(),i=this.parseEnumValuesDefinition();if(r.length===0&&i.length===0)throw this.unexpected();return this.node(t,{kind:x.ENUM_TYPE_EXTENSION,name:n,directives:r,values:i})}parseInputObjectTypeExtension(){const t=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("input");const n=this.parseName(),r=this.parseConstDirectives(),i=this.parseInputFieldsDefinition();if(r.length===0&&i.length===0)throw this.unexpected();return this.node(t,{kind:x.INPUT_OBJECT_TYPE_EXTENSION,name:n,directives:r,fields:i})}parseDirectiveDefinition(){const t=this._lexer.token,n=this.parseDescription();this.expectKeyword("directive"),this.expectToken(d.AT);const r=this.parseName(),i=this.parseArgumentDefs(),a=this.expectOptionalKeyword("repeatable");this.expectKeyword("on");const c=this.parseDirectiveLocations();return this.node(t,{kind:x.DIRECTIVE_DEFINITION,description:n,name:r,arguments:i,repeatable:a,locations:c})}parseDirectiveLocations(){return this.delimitedMany(d.PIPE,this.parseDirectiveLocation)}parseDirectiveLocation(){const t=this._lexer.token,n=this.parseName();if(Object.prototype.hasOwnProperty.call(he,n.value))return n;throw this.unexpected(t)}node(t,n){return this._options.noLocation!==!0&&(n.loc=new lt(t,this._lexer.lastToken,this._lexer.source)),n}peek(t){return this._lexer.token.kind===t}expectToken(t){const n=this._lexer.token;if(n.kind===t)return this.advanceLexer(),n;throw N(this._lexer.source,n.start,`Expected ${Qe(t)}, found ${ee(n)}.`)}expectOptionalToken(t){return this._lexer.token.kind===t?(this.advanceLexer(),!0):!1}expectKeyword(t){const n=this._lexer.token;if(n.kind===d.NAME&&n.value===t)this.advanceLexer();else throw N(this._lexer.source,n.start,`Expected "${t}", found ${ee(n)}.`)}expectOptionalKeyword(t){const n=this._lexer.token;return n.kind===d.NAME&&n.value===t?(this.advanceLexer(),!0):!1}unexpected(t){const n=t??this._lexer.token;return N(this._lexer.source,n.start,`Unexpected ${ee(n)}.`)}any(t,n,r){this.expectToken(t);const i=[];for(;!this.expectOptionalToken(r);)i.push(n.call(this));return i}optionalMany(t,n,r){if(this.expectOptionalToken(t)){const i=[];do i.push(n.call(this));while(!this.expectOptionalToken(r));return i}return[]}many(t,n,r){this.expectToken(t);const i=[];do i.push(n.call(this));while(!this.expectOptionalToken(r));return i}delimitedMany(t,n){this.expectOptionalToken(t);const r=[];do r.push(n.call(this));while(this.expectOptionalToken(t));return r}advanceLexer(){const{maxTokens:t}=this._options,n=this._lexer.advance();if(n.kind!==d.EOF&&(++this._tokenCounter,t!==void 0&&this._tokenCounter>t))throw N(this._lexer.source,n.start,`Document contains more that ${t} tokens. Parsing aborted.`)}}function ee(e){const t=e.value;return Qe(e.kind)+(t!=null?` "${t}"`:"")}function Qe(e){return wt(e)?`"${e}"`:e}var te=new Map,me=new Map,Ke=!0,re=!1;function ze(e){return e.replace(/[\s,]+/g," ").trim()}function Gt(e){return ze(e.source.body.substring(e.start,e.end))}function Qt(e){var t=new Set,n=[];return e.definitions.forEach(function(r){if(r.kind==="FragmentDefinition"){var i=r.name.value,a=Gt(r.loc),c=me.get(i);c&&!c.has(a)?Ke&&console.warn("Warning: fragment with name "+i+` already exists.
graphql-tag enforces all fragment names across your application to be unique; read more about
this in the docs: http://dev.apollodata.com/core/fragments.html#unique-names`):c||me.set(i,c=new Set),c.add(a),t.has(a)||(t.add(a),n.push(r))}else n.push(r)}),R(R({},e),{definitions:n})}function Kt(e){var t=new Set(e.definitions);t.forEach(function(r){r.loc&&delete r.loc,Object.keys(r).forEach(function(i){var a=r[i];a&&typeof a=="object"&&t.add(a)})});var n=e.loc;return n&&(delete n.startToken,delete n.endToken),e}function zt(e){var t=ze(e);if(!te.has(t)){var n=Ut(e,{experimentalFragmentVariables:re,allowLegacyFragmentVariables:re});if(!n||n.kind!=="Document")throw new Error("Not a valid GraphQL document.");te.set(t,Kt(Qt(n)))}return te.get(t)}function A(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];typeof e=="string"&&(e=[e]);var r=e[0];return t.forEach(function(i,a){i&&i.kind==="Document"?r+=i.loc.source.body:r+=i,r+=e[a+1]}),zt(r)}function Yt(){te.clear(),me.clear()}function Wt(){Ke=!1}function Jt(){re=!0}function Ht(){re=!1}var K={gql:A,resetCaches:Yt,disableFragmentWarnings:Wt,enableExperimentalFragmentVariables:Jt,disableExperimentalFragmentVariables:Ht};(function(e){e.gql=K.gql,e.resetCaches=K.resetCaches,e.disableFragmentWarnings=K.disableFragmentWarnings,e.enableExperimentalFragmentVariables=K.enableExperimentalFragmentVariables,e.disableExperimentalFragmentVariables=K.disableExperimentalFragmentVariables})(A||(A={}));A.default=A;function Ye(e){var t=w.useContext(Pe()),n=e||t.client;return q(!!n,58),n}var Ne=!1,Xt="useSyncExternalStore",Zt=dt[Xt],en=Zt||function(e,t,n){var r=t();globalThis.__DEV__!==!1&&!Ne&&r!==t()&&(Ne=!0,globalThis.__DEV__!==!1&&q.error(68));var i=w.useState({inst:{value:r,getSnapshot:t}}),a=i[0].inst,c=i[1];return ut?w.useLayoutEffect(function(){Object.assign(a,{value:r,getSnapshot:t}),de(a)&&c({inst:a})},[e,r,t]):Object.assign(a,{value:r,getSnapshot:t}),w.useEffect(function(){return de(a)&&c({inst:a}),e(function(){de(a)&&c({inst:a})})},[e]),r};function de(e){var t=e.value,n=e.getSnapshot;try{return t!==n()}catch{return!0}}var F;(function(e){e[e.Query=0]="Query",e[e.Mutation=1]="Mutation",e[e.Subscription=2]="Subscription"})(F||(F={}));var M;function je(e){var t;switch(e){case F.Query:t="Query";break;case F.Mutation:t="Mutation";break;case F.Subscription:t="Subscription";break}return t}function We(e){M||(M=new pt(ht.parser||1e3));var t=M.get(e);if(t)return t;var n,r,i;q(!!e&&!!e.kind,70,e);for(var a=[],c=[],o=[],p=[],m=0,u=e.definitions;m<u.length;m++){var l=u[m];if(l.kind==="FragmentDefinition"){a.push(l);continue}if(l.kind==="OperationDefinition")switch(l.operation){case"query":c.push(l);break;case"mutation":o.push(l);break;case"subscription":p.push(l);break}}q(!a.length||c.length||o.length||p.length,71),q(c.length+o.length+p.length<=1,72,e,c.length,p.length,o.length),r=c.length?F.Query:F.Mutation,!c.length&&!o.length&&(r=F.Subscription);var h=c.length?c:o.length?o:p;q(h.length===1,73,e,h.length);var f=h[0];n=f.variableDefinitions||[],f.name&&f.name.kind==="Name"?i=f.name.value:i="data";var g={name:i,type:r,variables:n};return M.set(e,g),g}We.resetCache=function(){M=void 0};globalThis.__DEV__!==!1&&mt("parser",function(){return M?M.size:0});function tn(e,t){var n=We(e),r=je(t),i=je(n.type);q(n.type===t,74,r,r,i)}var nn=Symbol.for("apollo.hook.wrappers");function rn(e,t,n){var r=n.queryManager,i=r&&r[nn],a=i&&i[e];return a?a(t):t}var sn=Object.prototype.hasOwnProperty;function ke(){}var ne=Symbol();function V(e,t){return t===void 0&&(t=Object.create(null)),rn("useQuery",an,Ye(t&&t.client))(e,t)}function an(e,t){var n=cn(e,t),r=n.result,i=n.obsQueryFields;return w.useMemo(function(){return R(R({},r),i)},[r,i])}function on(e,t,n,r,i){function a(l){var h;tn(t,F.Query);var f={client:e,query:t,observable:r&&r.getSSRObservable(i())||ft.inactiveOnCreation.withValue(!r,function(){return e.watchQuery(Je(void 0,e,n,i()))}),resultData:{previousData:(h=l==null?void 0:l.resultData.current)===null||h===void 0?void 0:h.data}};return f}var c=w.useState(a),o=c[0],p=c[1];function m(l){var h,f;Object.assign(o.observable,(h={},h[ne]=l,h));var g=o.resultData;p(R(R({},o),{query:l.query,resultData:Object.assign(g,{previousData:((f=g.current)===null||f===void 0?void 0:f.data)||g.previousData,current:void 0})}))}if(e!==o.client||t!==o.query){var u=a(o);return p(u),[u,m]}return[o,m]}function cn(e,t){var n=Ye(t.client),r=w.useContext(Pe()).renderPromises,i=!!r,a=n.disableNetworkFetches,c=t.ssr!==!1&&!t.skip,o=t.partialRefetch,p=pn(n,e,t,i),m=on(n,e,t,r,p),u=m[0],l=u.observable,h=u.resultData,f=m[1],g=p(l);un(h,l,n,t,g);var y=w.useMemo(function(){return xn(l)},[l]);dn(l,r,c);var b=ln(h,l,n,t,g,a,o,i,{onCompleted:t.onCompleted||ke,onError:t.onError||ke});return{result:b,obsQueryFields:y,observable:l,resultData:h,client:n,onQueryExecuted:f}}function ln(e,t,n,r,i,a,c,o,p){var m=w.useRef(p);w.useEffect(function(){m.current=p});var u=(o||a)&&r.ssr===!1&&!r.skip?Xe:r.skip||i.fetchPolicy==="standby"?Ze:void 0,l=e.previousData,h=w.useMemo(function(){return u&&He(u,l,t,n)},[n,t,u,l]);return en(w.useCallback(function(f){if(o)return function(){};var g=function(){var j=e.current,_=t.getCurrentResult();j&&j.loading===_.loading&&j.networkStatus===_.networkStatus&&ue(j.data,_.data)||fe(_,e,t,n,c,f,m.current)},y=function(j){if(b.current.unsubscribe(),b.current=t.resubscribeAfterError(g,y),!sn.call(j,"graphQLErrors"))throw j;var _=e.current;(!_||_&&_.loading||!ue(j,_.error))&&fe({data:_&&_.data,error:j,loading:!1,networkStatus:J.error},e,t,n,c,f,m.current)},b={current:t.subscribe(g,y)};return function(){setTimeout(function(){return b.current.unsubscribe()})}},[a,o,t,e,c,n]),function(){return h||Se(e,t,m.current,c,n)},function(){return h||Se(e,t,m.current,c,n)})}function dn(e,t,n){t&&n&&(t.registerSSRObservable(e),e.getCurrentResult().loading&&t.addObservableQueryPromise(e))}function un(e,t,n,r,i){var a;t[ne]&&!ue(t[ne],i)&&(t.reobserve(Je(t,n,r,i)),e.previousData=((a=e.current)===null||a===void 0?void 0:a.data)||e.previousData,e.current=void 0),t[ne]=i}function pn(e,t,n,r){n===void 0&&(n={});var i=n.skip;n.ssr,n.onCompleted,n.onError;var a=n.defaultOptions,c=Oe(n,["skip","ssr","onCompleted","onError","defaultOptions"]);return function(o){var p=Object.assign(c,{query:t});return r&&(p.fetchPolicy==="network-only"||p.fetchPolicy==="cache-and-network")&&(p.fetchPolicy="cache-first"),p.variables||(p.variables={}),i?(p.initialFetchPolicy=p.initialFetchPolicy||p.fetchPolicy||Ie(a,e.defaultOptions),p.fetchPolicy="standby"):p.fetchPolicy||(p.fetchPolicy=(o==null?void 0:o.options.initialFetchPolicy)||Ie(a,e.defaultOptions)),p}}function Je(e,t,n,r){var i=[],a=t.defaultOptions.watchQuery;return a&&i.push(a),n.defaultOptions&&i.push(n.defaultOptions),i.push(xt(e&&e.options,r)),i.reduce(gt)}function fe(e,t,n,r,i,a,c){var o=t.current;o&&o.data&&(t.previousData=o.data),!e.error&&De(e.errors)&&(e.error=new Me({graphQLErrors:e.errors})),t.current=He(fn(e,n,i),t.previousData,n,r),a(),hn(e,o==null?void 0:o.networkStatus,c)}function hn(e,t,n){if(!e.loading){var r=mn(e);Promise.resolve().then(function(){r?n.onError(r):e.data&&t!==e.networkStatus&&e.networkStatus===J.ready&&n.onCompleted(e.data)}).catch(function(i){globalThis.__DEV__!==!1&&q.warn(i)})}}function Se(e,t,n,r,i){return e.current||fe(t.getCurrentResult(),e,t,i,r,function(){},n),e.current}function Ie(e,t){var n;return(e==null?void 0:e.fetchPolicy)||((n=t==null?void 0:t.watchQuery)===null||n===void 0?void 0:n.fetchPolicy)||"cache-first"}function mn(e){return De(e.errors)?new Me({graphQLErrors:e.errors}):e.error}function He(e,t,n,r){var i=e.data;e.partial;var a=Oe(e,["data","partial"]),c=R(R({data:i},a),{client:r,observable:n,variables:n.variables,called:e!==Xe&&e!==Ze,previousData:t});return c}function fn(e,t,n){return e.partial&&n&&!e.loading&&(!e.data||Object.keys(e.data).length===0)&&t.options.fetchPolicy!=="cache-only"?(t.refetch(),R(R({},e),{loading:!0,networkStatus:J.refetch})):e}var Xe=qe({loading:!0,data:void 0,error:void 0,networkStatus:J.loading}),Ze=qe({loading:!1,data:void 0,error:void 0,networkStatus:J.ready});function xn(e){return{refetch:e.refetch.bind(e),reobserve:e.reobserve.bind(e),fetchMore:e.fetchMore.bind(e),updateQuery:e.updateQuery.bind(e),startPolling:e.startPolling.bind(e),stopPolling:e.stopPolling.bind(e),subscribeToMore:e.subscribeToMore.bind(e)}}const we=["dragonborn","dwarf","elf","gnome","half-elf","half-orc","halfling","human","tiefling"],Te=["barbarian","bard","cleric","druid","fighter","monk","paladin","ranger","rogue","sorcerer","warlock","wizard"],gn=A`
  query Class($index: String!) {
    class(index: $index) {
      index
      name
      hit_die
      proficiencies {
        type
        index
        name
      }
      proficiency_choices {
        desc
        choose
        type
        from {
          options {
            option_type
            item {
              ... on Proficiency {
                index
                name
                type
                reference {
                  ... on Equipment {
                    index
                    name
                    desc
                    equipment_category {
                      index
                      name
                    }
                    gear_category {
                      index
                      name
                    }
                    properties {
                      desc
                      index
                      name
                    }
                  }
                }
              }
              ... on ProficiencyChoice {
                choose
                type
                from {
                  options {
                    option_type
                    item {
                      ... on Proficiency {
                        index
                        name
                      }
                    }
                  }
                }
                desc
              }
            }
          }
        }
      }
      starting_equipment {
        quantity
        equipment {
          ... on Armor {
            index
            name
            desc
            equipment_category {
              index
              name
            }
            gear_category {
              index
              name
            }
            properties {
              desc
              index
              name
            }
            armor_category
            armor_class {
              base
              dex_bonus
              max_bonus
            }
            str_minimum
            stealth_disadvantage
          }
        }
      }
      starting_equipment_options {
        choose
        desc
        type
        from {
          ... on EquipmentCategorySet {
            equipment_category {
              index
              name
              equipment {
                ... on Armor {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  armor_category
                  armor_class {
                    base
                    dex_bonus
                    max_bonus
                  }
                  str_minimum
                  stealth_disadvantage
                }
                ... on Weapon {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  weapon_category
                  weapon_range
                  category_range
                  damage {
                    damage_type {
                      desc
                      index
                      name
                    }
                    damage_dice
                  }
                  two_handed_damage {
                    damage_type {
                      desc
                      index
                      name
                    }
                    damage_dice
                  }
                  range {
                    normal
                  }
                  throw_range {
                    normal
                  }
                }
                ... on Tool {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  tool_category
                }
                ... on Gear {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                }
                ... on Pack {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  contents {
                    quantity
                    item {
                      ... on Armor {
                        index
                        name
                      }
                      ... on Weapon {
                        index
                        name
                      }
                      ... on Tool {
                        index
                        name
                      }
                      ... on Gear {
                        index
                        name
                      }
                      ... on Pack {
                        index
                        name
                      }
                      ... on Ammunition {
                        index
                        name
                      }
                      ... on Vehicle {
                        index
                        name
                      }
                    }
                  }
                }
                ... on Ammunition {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  quantity
                }
                ... on Vehicle {
                  index
                  name
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                  vehicle_category
                  speed {
                    quantity
                    unit
                  }
                  capacity
                }
                ... on MagicItem {
                  desc
                  equipment_category {
                    index
                    name
                  }
                  image
                  index
                  name
                  rarity {
                    name
                  }
                  variants {
                    index
                    name
                  }
                  variant
                }
              }
            }
            option_set_type
          }
          ... on EquipmentOptionSet {
            options {
              ... on CountedReferenceOption {
                option_type
                count
                of {
                  index
                  name
                  desc
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    desc
                    index
                    name
                  }
                }
              }
              ... on EquipmentCategoryChoiceOption {
                option_type
                choice {
                  choose
                  desc
                  type
                  from {
                    equipment_category {
                      index
                      name
                    }
                  }
                }
              }
              ... on MultipleItemsOption {
                option_type
                items {
                  ... on CountedReferenceOption {
                    option_type
                    count
                    of {
                      index
                      name
                      desc
                      equipment_category {
                        index
                        name
                      }
                      gear_category {
                        index
                        name
                      }
                      properties {
                        desc
                        index
                        name
                      }
                    }
                  }
                }
              }
            }
            option_set_type
          }
        }
      }
      spells {
        area_of_effect {
          size
          type
        }
        attack_type
        casting_time
        concentration
        damage {
          damage_type {
            index
            name
            desc
          }
          damage_at_character_level {
            level
            value
          }
        }
        dc {
          dc_type {
            index
            name
          }
          dc_success
          desc
        }
        desc
        duration
        heal_at_slot_level {
          level
          value
        }
        higher_level
        index
        level
        name
        range
        ritual
        school {
          desc
          index
          name
        }
      }
      spellcasting {
        info {
          desc
          name
        }
        level
        spellcasting_ability {
          index
          name
        }
      }
      class_levels {
        ability_score_bonuses
        features {
          index
          name
          level
          desc
        }
        spellcasting {
          cantrips_known
          spell_slots_level_1
          spell_slots_level_2
          spell_slots_level_3
          spell_slots_level_4
          spell_slots_level_5
          spell_slots_level_6
          spell_slots_level_7
          spell_slots_level_8
          spell_slots_level_9
          spells_known
        }
        level
      }
    }
  }
`,yn=A`
  query Race($index: String!) {
    race(index: $index) {
      alignment
      index
      name
      size
      speed
      ability_bonuses {
        ability_score {
          index
        }
        bonus
      }
      ability_bonus_options {
        choose
        type
        from {
          option_set_type
          options {
            option_type
            ability_score {
              index
            }
            bonus
          }
        }
        desc
      }
      languages {
        index
        name
      }
      language_options {
        choose
        type
        from {
          option_set_type
          options {
            option_type
            item {
              desc
              index
              name
              type
            }
          }
        }
      }
      traits {
        index
        name
        proficiencies {
          index
          name
        }
        proficiency_choices {
          choose
          type
          from {
            option_set_type
            options {
              option_type
              item {
                ... on Proficiency {
                  index
                  name
                  type
                }
                ... on ProficiencyChoice {
                  choose
                  type
                  from {
                    option_set_type
                    options {
                      option_type
                      item {
                        ... on Proficiency {
                          index
                          name
                        }
                      }
                    }
                  }
                  desc
                }
              }
            }
          }
          desc
        }
        desc
      }
    }
  }
`,_n=A`
  query Skills {
    skills {
      ability_score {
        desc
        full_name
        index
        name
        skills {
          index
          name
        }
      }
      desc
      index
      name
    }
  }
`,et=A`
  query EquipmentInfo($index: String!) {
    equipment(index: $index) {
      ... on Armor {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        armor_category
        armor_class {
          base
          dex_bonus
          max_bonus
        }
        str_minimum
        stealth_disadvantage
        desc
      }
      ... on Weapon {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          index
          name
        }
        weapon_category
        weapon_range
        category_range
        damage {
          damage_type {
            index
            name
          }
          damage_dice
        }
        two_handed_damage {
          damage_type {
            index
            name
          }
          damage_dice
        }
        range {
          normal
        }
        throw_range {
          normal
        }
        desc
      }
      ... on Tool {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        tool_category
        desc
      }
      ... on Gear {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        desc
      }
      ... on Pack {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        contents {
          quantity
          item {
            ... on Armor {
              index
              name
            }
            ... on Weapon {
              index
              name
            }
            ... on Tool {
              index
              name
            }
            ... on Gear {
              index
              name
            }
            ... on Pack {
              index
              name
            }
            ... on Ammunition {
              index
              name
            }
            ... on Vehicle {
              index
              name
            }
          }
        }
        desc
      }
      ... on Ammunition {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        quantity
        desc
      }
      ... on Vehicle {
        index
        name
        equipment_category {
          index
          name
        }
        gear_category {
          index
          name
        }
        properties {
          desc
          index
          name
        }
        vehicle_category
        speed {
          quantity
          unit
        }
        capacity
        desc
      }
    }
  }
`,vn=A`
  query EquipmentCategoryInfo($index: String!) {
    equipmentCategory(index: $index) {
      index
      name
      equipment {
        ... on Armor {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          armor_category
          armor_class {
            base
            dex_bonus
            max_bonus
          }
          str_minimum
          stealth_disadvantage
        }
        ... on Weapon {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            index
            name
          }
          weapon_category
          weapon_range
          category_range
          damage {
            damage_type {
              index
              name
            }
            damage_dice
          }
          two_handed_damage {
            damage_type {
              index
              name
            }
            damage_dice
          }
          range {
            normal
          }
          throw_range {
            normal
          }
        }
        ... on Tool {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          tool_category
        }
        ... on Gear {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
        }
        ... on Pack {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          contents {
            quantity
            item {
              ... on Armor {
                index
                name
              }
              ... on Weapon {
                index
                name
              }
              ... on Tool {
                index
                name
              }
              ... on Gear {
                index
                name
              }
              ... on Pack {
                index
                name
              }
              ... on Ammunition {
                index
                name
              }
              ... on Vehicle {
                index
                name
              }
            }
          }
        }
        ... on Ammunition {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          quantity
        }
        ... on Vehicle {
          index
          name
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
          vehicle_category
          speed {
            quantity
            unit
          }
          capacity
        }
        ... on MagicItem {
          desc
          equipment_category {
            index
            name
          }
          image
          index
          name
          rarity {
            name
          }
          variants {
            index
            name
          }
          variant
        }
      }
    }
  }
`;A`
  query Backgrounds {
    backgrounds {
      index
      name
      starting_proficiencies {
        index
        name
        type
        reference {
          ... on Equipment {
            index
            name
          }
          ... on EquipmentCategory {
            index
            name
          }
          ... on AbilityScore {
            desc
            index
            name
          }
          ... on Skill {
            desc
            index
            name
          }
        }
      }
      starting_equipment {
        equipment {
          index
          name
          desc
          equipment_category {
            index
            name
          }
          gear_category {
            index
            name
          }
          properties {
            desc
            index
            name
          }
        }
        quantity
      }
      feature {
        desc
        name
      }
      flaws {
        choose
        type
        from {
          options {
            string
            option_type
          }
        }
      }
      bonds {
        choose
        type
        from {
          options {
            string
            option_type
          }
        }
      }
      personality_traits {
        choose
        type
        from {
          options {
            string
            option_type
          }
        }
      }
      ideals {
        choose
        type
        from {
          options {
            option_type
            desc
            alignments {
              desc
              index
              name
            }
          }
        }
      }
      language_options {
        choose
        type
        from {
          options {
            option_type
            item {
              desc
              index
              name
            }
          }
        }
      }
      starting_equipment_options {
        choose
        desc
        type
        from {
          ... on EquipmentCategorySet {
            equipment_category {
              index
              name
            }
          }
          ... on EquipmentOptionSet {
            options {
              ... on CountedReferenceOption {
                option_type
                count
                of {
                  index
                  name
                  desc
                  equipment_category {
                    index
                    name
                  }
                  gear_category {
                    index
                    name
                  }
                  properties {
                    index
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;function bn({enteredRace:e}){const t=D(),{loading:n,error:r,data:i}=V(yn,{variables:{index:e}});C.useEffect(()=>{i&&i.race&&t(k.setRace({race:i.race.index,raceData:i.race})),console.log(a)},[i,e]);let a;n&&(a="still loading race data"),r&&(a=`an error occurred when trying to fetch race data 
error message: `+r.message),i&&(a=i.race)}function En({enteredClass:e,enteredLvl:t}){const n=D(),{loading:r,error:i,data:a}=V(gn,{variables:{index:e},errorPolicy:"ignore"});C.useEffect(()=>{a&&a.class&&n(k.setClassAndLvl({class:a.class.index,lvl:parseInt(t),classData:a.class})),console.log(c)},[a,e,t]);let c;r&&(c="still loading class data"),i&&(c="an error occurred when trying to fetch class data"),a&&(c=a.class)}function Cn({ability:e,...t}){const n=D(),r=L(h=>h.characterCreation);let i="bg-white";r.abilityScores[e].proficient&&(i="bg-[#FFF8ED]"),i+=" text-center px-[3vw] py-[3vh] md:px-[2vw] md:py-[2.5vh] rounded-md";let a=r.abilityScores[e].score-r.abilityScores[e].bonus,c=r.abilityScores[e].score,o=r.abilityScores[e].modifier,p=!1;a>=15&&(p=!0);let m=!1;a<=8&&(m=!0);function u(){n(k.incrPoint(e))}function l(){n(k.decrPoint(e))}return s.jsxs("div",{className:i,...t,children:[s.jsx("p",{children:e.toUpperCase()}),s.jsx("p",{children:s.jsx("b",{children:c})}),s.jsxs("p",{children:["(",o>0?"+"+o:o,")"]}),s.jsxs("div",{className:"flex flex-row gap-2 mt-3",children:[s.jsx("button",{type:"button",className:"bg-[#F5F5F5] hover:bg-[#e7e7e7] disabled:bg-[#8d8d8dc0] p-1 px-2 rounded-lg",onClick:l,disabled:m,children:"-"}),s.jsx("button",{type:"button",className:"bg-[#F5F5F5] hover:bg-[#e7e7e7] disabled:bg-[#8d8d8dc0] p-1 px-2 rounded-lg",onClick:u,disabled:p,children:"+"})]})]})}function Nn(){const e=D(),{loading:t,error:n,data:r}=V(_n),i=L(a=>a.characterCreation);return C.useEffect(()=>{r&&r.skills.map(a=>{e(k.updateSkillName({skill:a.index,name:a.name}))})},[r]),s.jsxs("div",{className:"flex flex-col",children:[s.jsx("h2",{children:"Point-Buy System"}),s.jsxs("h3",{children:["Points left to use: ",i.points]}),s.jsx("div",{className:"flex flex-row justify-start xl:justify-center gap-[1vw] mt-3",children:Be.map(a=>s.jsx(Cn,{ability:a},a+"PointBuyBox"))}),s.jsxs("div",{className:"mt-5",children:[s.jsx("h3",{children:"Skills"}),s.jsx("div",{id:"character-skills",className:"grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10",children:yt.map(a=>{let c=i.skills[a].modifier;return s.jsxs("div",{className:"flex flex-row gap-3 items-center",children:[s.jsx("div",{className:i.skills[a].proficient?"w-3 h-3 bg-black rounded-2xl":"w-3 h-3 bg-white rounded-2xl"}),s.jsx("p",{children:i.skills[a].name}),s.jsx("p",{children:`(${c>0?"+"+c:c})`})]},a)})})]})]})}function Y({nameForInputs:e,listOfInputs:t,maxNumInputs:n,purpose:r,...i}){const a=D(),[c,o]=C.useState([]);C.useEffect(()=>{o(Array(t.length).fill(!1))},[t]);function p(m,u,l){if(c.filter(f=>f).length>=n&&l.target.checked)return;const h=c.map((f,g)=>{if(m===g){if(u==="Skills"){let y=l.target.value;a(k.updateSkillProficiency({skill:y,checked:!f}))}else r==="classProficiency"?a(k.updateClassProficiency({index:l.target.value,operation:!f})):r==="raceProficiency"&&a(k.updateRaceProficiency({index:l.target.value,operation:!f}));return!f}return f});o(h)}return s.jsx("fieldset",{className:"grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10",...i,children:t.map((m,u)=>{let l=m.item.name,h=m.item.index;return m.item.type==="Skills"&&(l=Ae(m.item.name),h=Ae(m.item.index)),s.jsxs("div",{children:[s.jsx("input",{type:"checkbox",id:l+"-"+e,name:e,value:h,checked:c[u]||!1,className:"w-[1rem] h-[1rem] mr-2",onChange:()=>p(u,m.item.type,event)}),s.jsx("label",{htmlFor:l+"-"+e,children:l})]},l)})})}function Ae(e){return e.includes(": ")?e.split(": ")[1]:e.includes("-")?e.split("-").toSpliced(0,1).join("-"):e}function jn({enteredClass:e,enteredRace:t}){const n=L(u=>u.characterCreation),[r,i]=C.useState({}),[a,c]=C.useState({});function o(u,l,h){if(h==="class"){let f=n.classProficiencyChoices[u].from.options[l].item;i({...r,[u]:f})}else{let f=n.raceProficiencyChoices[u].from.options[l].item;c({...a,[u]:f})}}let p;p=n.classProficiencyChoices.map((u,l)=>{let h,f=e+"ProficiencyChoiceArray"+l;if(u.from.options&&u.from.options[0].option_type==="choice"){let y=f+l,b=e+"-checkbox-"+l+"-proficiency",j=!1;return h=s.jsxs("div",{children:[s.jsx("h4",{children:ce(u.desc,f)}),s.jsx("select",{name:f+"Select",id:y,className:"bg-white rounded-md p-1 mb-3",defaultValue:r[l],onChange:_=>o(l,_.target.value,"class"),children:u.from.options.map((_,P)=>(console.log("choice array:",_),!(l in r)&&!j&&(i({...r,[l]:_.item}),j=!0),s.jsx("option",{value:P,children:_.item.desc},f+"-"+_.item.desc)))}),r[l]&&s.jsx(Y,{nameForInputs:b,listOfInputs:r[l].from.options,maxNumInputs:r[l].choose,purpose:"classProficiency"},b+"Fieldset")]},f),h}return f=e+"-checkbox-"+l+"-proficiency",s.jsxs("div",{children:[s.jsx("h4",{children:ce(u.desc,f)||s.jsxs("p",{children:["Choose ",s.jsx("b",{children:ve(u.choose)})," from below"]})}),s.jsx(Y,{nameForInputs:f,listOfInputs:u.from.options,maxNumInputs:u.choose,purpose:"classProficiency"},f+"Fieldset")]},f)});let m;return m=n.raceProficiencyChoices.map((u,l)=>{let h,f=t+"ProficiencyChoiceArray"+l;if(u.from.options&&u.from.options[0].option_type==="choice"){let y=f+l,b=t+"-checkbox-"+l+"-proficiency",j=!1;return h=s.jsxs("div",{children:[s.jsx("h4",{children:ce(u.desc,f)}),s.jsx("select",{name:f+"Select",id:y,className:"bg-white rounded-md p-1 mb-3",defaultValue:a[l],onChange:_=>o(l,_.target.value,"race"),children:u.from.options.map((_,P)=>(!(l in a)&&!j&&(c({...a,[l]:_.item}),j=!0),s.jsx("option",{value:P,children:_.choice.desc},f+"-"+_.choice.desc)))}),a[l]&&s.jsx(Y,{nameForInputs:b,listOfInputs:a[l].from.options,maxNumInputs:a[l].choose,purpose:"raceProficiency"},b+"Fieldset")]},f),h}return f=t+"-checkbox-"+l+"-proficiency",s.jsxs("div",{children:[s.jsx("h4",{children:u.desc||s.jsxs("p",{children:["Choose ",s.jsx("b",{children:ve(u.choose)})," from below"]})}),s.jsx(Y,{nameForInputs:f,listOfInputs:u.from.options,maxNumInputs:u.choose,purpose:"raceProficiency"},f+"Fieldset")]},f)}),s.jsxs("div",{children:[s.jsx("h2",{children:"Proficiency Options"}),s.jsxs("div",{id:"character-proficiency-choices",className:"flex flex-col gap-10",children:[p,m]})]})}function ge({nameForInputs:e,listOfInputs:t,purpose:n,optionIndex:r=0,keyAdder:i,...a}){return s.jsx("fieldset",{className:"grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-10",...a,children:t.map((c,o)=>{let p,m,u;return c.item?(p=c.item.name,m=c.item.index,c.item.equipment_category&&(u=c.item.equipment_category.index)):(p=c.name,m=c.index,c.equipment_category&&(u=c.equipment_category.index)),s.jsxs("div",{className:"flex flex-row gap-3 flex-wrap",children:[s.jsx("input",{type:"radio",id:p+"-"+e,name:e,value:[n,"counted_reference",r,u,m,p].join(":"),required:!0}),s.jsx("label",{htmlFor:p+"-"+e,children:p})]},i+o)})})}function kn({index:e,optionType:t}){D();let n,r,i;t==="counted_reference"||t==="multiple"?{loading:n,error:r,data:i}=V(et,{variables:{index:e}}):t==="choice"&&({loading:n,error:r,data:i}=V(vn,{variables:{index:e}}));let a;if(!n)if(r)a=s.jsx("p",{children:"Error"});else if(t==="counted_reference"){let c=i.equipment;c.gear_category&&c.gear_category.index==="equipment-packs"?a=s.jsx("p",{className:"text-[1rem]",children:`Includes:${c.contents.map((o,p)=>p<c.contents.length?` ${o.item.name} (${o.quantity})`:`${o.item.name} (${o.quantity})`)}`}):a=s.jsx(s.Fragment,{children:s.jsx("p",{className:"text-[1rem]",children:c.desc})})}else if(t==="choice"){let c=i.equipmentCategory;a=s.jsx(ge,{nameForInputs:e+"RadioGroup",listOfInputs:c.equipment,purpose:c.equipment[0].equipment_category.index,keyAdder:e+"RadioGroup"})}else t==="multiple"&&i.equipment;return s.jsx("div",{children:a})}function Sn({identifier:e,keyAdder:t,caption:n,options:r,optionIndex:i,...a}){const[c,o]=C.useState([]);let p=!1;function m(u){const l=u.split(":");let h=l[1],f=l[4];o([f,h])}return s.jsxs("div",{className:"flex flex-col gap-3",...a,children:[s.jsxs("div",{className:"flex flex-row gap-x-5 flex-wrap",children:[s.jsx("h4",{children:n}),s.jsx("select",{name:e,id:e,onChange:u=>m(u.target.value),className:"bg-white rounded-md p-1",children:r.map((u,l)=>{let h,f,g,y=1;if(u.option_type==="counted_reference")h=u.of.name,f=u.of.index,y=u.count,g=u.of.equipment_category.index;else if(u.option_type==="choice")h=u.choice.from.equipment_category.name,f=u.choice.from.equipment_category.index,g=u.choice.from.equipment_category.index;else if(u.option_type==="multiple"){if(u.items[0].option_type==="counted_reference")h=u.items[0].of.name,f=u.items[0].of.index,g=u.items[0].of.equipment_category.index;else if(u.items[0].option_type==="choice"){let b=u.items[0].choice.from.equipment_category;h=b.name,f=b.index,g=b.index}}return c===""&&!p&&(o([f,u.option_type]),p=!0),s.jsx("option",{value:["editInventory",u.option_type,i,g,f,h,y].join(":"),children:h},t+n+l)})})]}),c.length==2&&s.jsx(kn,{index:c[0],optionType:c[1]})]})}function In({enteredClass:e}){const t=L(n=>n.characterCreation);return s.jsxs("div",{children:[s.jsx("h2",{children:"Equipment Options"}),s.jsx("div",{id:"class-equipment-choices",className:"flex flex-col gap-10",children:t&&t.classStartingEquipmentChoices&&t.classStartingEquipmentChoices.map((n,r)=>{if(n.from.option_set_type==="options_array")return s.jsx(Sn,{identifier:`${e}-select-${r}-equipment`,keyAdder:e+"EquipmentChoice"+r,caption:n.desc,options:n.from.options,optionIndex:r},e+"EquipmentChoiceSelectKey"+r);if(n.from.option_set_type==="equipment_category")return s.jsxs("div",{children:[s.jsx("h4",{children:n.from.equipment_category.name}),s.jsx(ge,{nameForInputs:`${e}-radio-${r}-equipment`,listOfInputs:n.from.equipment_category.equipment,purpose:"dispatch:addToInventory",optionIndex:r,keyAdder:n.from.equipment_category.index+"RadioGroup"})]},e+"EquipmentChoiceRadioKey"+r)})})]})}function wn({enteredRace:e}){const n=L(i=>i.characterCreation).languageChoices;let r;return n!==null&&(r=n.choose),n&&r&&s.jsxs("div",{children:[s.jsx("h2",{children:"Language Options"}),r===1?s.jsx(ge,{nameForInputs:e+"-radio-language",listOfInputs:n.from.options,purpose:"learnLanguage",keyAdder:e+"LanguagesRadioGroupKey"}):s.jsx(Y,{nameForInputs:e+"-checkbox-language",listOfInputs:n.from.options,maxNumInputs:r,purpose:"learnLanguage",keyAdder:e+"LanguagesCheckboxGroupKey"})]})}function Tn({spellData:e,limit:t,...n}){const r=D(),i=L(y=>y.characterCreation.spellsLearned),[a,c]=C.useState(!1),[o,p]=C.useState(i[e.level].some(y=>y.index===e.index));let m,u;a?(m="w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-t-md cursor-pointer",u="bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md"):(m="w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-md cursor-pointer",u="bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md hidden");function l(y){y.target.localName!=="button"&&c(b=>!b)}function h(){if(!o&&i[e.level].length>=t){console.log("cannot learn this spell. you already know the max amount!");return}r(k.learnSpell({spell:e,operation:!o})),p(y=>!y)}let f=e.name,g=e.area_of_effect||e.attack_type||e.damage||e.dc||e.heal_at_slot_level||e.higher_level;return s.jsxs("div",{...n,children:[s.jsxs("div",{className:m,onClick:y=>l(y),children:[s.jsx("p",{children:f}),s.jsx(T,{type:"button",onClick:h,disabled:i[e.level].length===t&&!o,className:"disabled:bg-[#8d8d8dc0]",children:o?"Remove":"Add"})]}),s.jsxs("div",{className:u,children:[s.jsx("p",{children:`Casting Time: ${e.casting_time}`}),s.jsx("p",{children:`Duration: ${e.duration}`}),s.jsx("p",{children:`Range: ${e.range}`}),s.jsx("p",{children:`Concentration: ${e.concentration}`}),s.jsx("p",{children:`Ritual: ${e.ritual}`}),s.jsx("br",{}),e.area_of_effect&&s.jsx("p",{children:`AOE: ${e.area_of_effect}`}),e.attack_type&&s.jsx("p",{children:`Attack type: ${e.attack_type}`}),e.dc&&s.jsx("p",{children:`DC: ${e.dc.dc_type.name}`}),e.heal_at_slot_level&&s.jsx("p",{children:`Heal at slot level: ${e.heal_at_slot_level}`}),e.higher_level&&s.jsx("p",{children:`Higher level: ${e.higher_level}`}),e.damage&&s.jsxs(s.Fragment,{children:[s.jsx("p",{children:"Damage at Levels"}),e.damage.damage_at_character_level&&e.damage.damage_at_character_level.map(y=>s.jsx("p",{children:`${y.level}: ${y.damage}`},e.name+"Lvl"+y.level+"Dmg"))]}),g&&s.jsx("br",{}),s.jsx("p",{children:e.desc.join(" ")})]})]})}function An({enteredClass:e,enteredLvl:t}){const n=L(l=>l.characterCreation),[r,i]=C.useState("0");let a=s.jsx(s.Fragment,{}),c=n.spellcasting.spellcastingAbility!==null,o,p,m=0;if(c){o=n.spellcasting.spellSlots.filter(l=>l.level===parseInt(t))[0].spellcasting;for(const[l,h]of Object.entries(o))l!=="spells_known"&&l!=="__typename"&&(m+=parseInt(h));p=r==="0"?o.cantrips_known:o["spell_slots_level_"+r],a=n.spellList[r].map((l,h)=>s.jsx(Tn,{spellData:l,limit:p},e+"lvl"+l.level+"Spell"+h))}function u(l,h){l.preventDefault(),i(h)}return c&&s.jsxs("div",{children:[s.jsx("h2",{children:"Spells"}),s.jsx("p",{children:`Spells Learned: ${n.numSpellsLearned}`}),o&&s.jsx("p",{children:`Max Spells: ${m}`}),s.jsxs("div",{className:"flex flex-col gap-3 mt-3",children:[s.jsx("div",{className:"flex flex-row mb-5",children:Object.keys(n.spellList).map(l=>{let h;return l.toString()==="0"?h="rounded-tl-xl rounded-bl-xl":l.toString()==="9"?h="rounded-tr-xl rounded-br-xl":h="",l.toString()===r?s.jsx(T,{type:"button",onClick:f=>u(f,l),selected:!0,bgColor:"bg-[#B91C1C]",selectedColor:"[#B91C1C]",rounded:h,children:l},"spellButtonLvl"+l):s.jsx(T,{type:"button",onClick:f=>u(f,l),selected:!1,selectedColor:"[#B91C1C]",rounded:h,children:l},"spellButtonLvl"+l)})}),s.jsxs("div",{className:"flex flex-row gap-2 justify-around",children:[s.jsxs("p",{children:["Learned: ",n.spellsLearned[r].length]}),o&&s.jsx("p",{children:`Limit: ${p}`})]}),s.jsx("div",{className:"h-[25vh] bg-gray-50 flex flex-col gap-1 overflow-y-scroll rounded-md",children:a})]})]})}function On({featureData:e,...t}){const[n,r]=C.useState(!1);let i,a;n?(i="w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-t-md cursor-pointer",a="bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md"):(i="w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-md cursor-pointer",a="bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md hidden");function c(){r(o=>!o)}return s.jsxs("div",{...t,children:[s.jsx("div",{className:i,onClick:c,children:s.jsx("p",{children:e.name})}),s.jsx("div",{className:a,children:e.desc.map((o,p)=>s.jsxs("div",{children:[s.jsx("p",{children:o}),p<e.desc.length-1&&s.jsx("br",{})]},"feature"+p))})]})}function Ln(){const e=L(t=>t.characterCreation.features);return s.jsxs("div",{children:[s.jsx("h2",{children:"Features"}),s.jsx("div",{className:"max-h-[25vh] bg-gray-50 flex flex-col gap-1 overflow-y-scroll rounded-md",children:e.map((t,n)=>s.jsx(On,{featureData:t},"featureTab"+n))})]})}function Rn({cancelFn:e,submitFn:t}){const[n,r]=C.useState(we[0]),[i,a]=C.useState(Te[0]),[c,o]=C.useState(1);function p(l){let h=l.target.value;h!==n&&r(h)}function m(l){let h=l.target.value;h!==i&&a(h)}function u(l){let h=l.target.value;h!==c&&o(parseInt(h))}return s.jsx(it,{onSubmit:t,children:s.jsxs("div",{className:"flex flex-col gap-25",children:[s.jsxs("div",{className:"flex flex-row justify-between items-center flex-wrap gap-y-3",children:[s.jsx("h1",{children:"Character Creation"}),s.jsx(T,{type:"button",onClick:e,children:"Cancel"})]}),s.jsxs("div",{className:"flex flex-col gap-5",children:[s.jsxs("div",{children:[s.jsx("label",{htmlFor:"name-character",className:"text-black text-[2.5rem] font-[500] mr-10",children:"Character name"}),s.jsx(bt,{id:"name-character",name:"name-character",type:"text",className:"text-[2rem]",required:!0})]}),s.jsxs("div",{className:"flex flex-row flex-wrap justify-between gap-y-3",children:[s.jsxs("div",{children:[s.jsx("label",{htmlFor:"race-character",className:"text-black text-[2.5rem] font-[500] mr-10",children:"Race"}),s.jsx("select",{name:"race-character",id:"race-character",onChange:p,className:"bg-white rounded-md text-[2rem] pl-3 pr-15",defaultValue:n,required:!0,children:we.map(l=>s.jsx("option",{value:l,children:W(l)},l+"Option"))})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"class-character",className:"text-black text-[2.5rem] font-[500] mr-10",children:"Class"}),s.jsx("select",{name:"class-character",id:"class-character",onChange:m,className:"bg-white rounded-md text-[2rem] pl-3 pr-15",defaultValue:i,required:!0,children:Te.map(l=>s.jsx("option",{value:l,children:W(l)},l+"Option"))})]}),s.jsxs("div",{children:[s.jsx("label",{htmlFor:"lvl-character",className:"text-black text-[2.5rem] font-[500] mr-10",children:"Level"}),s.jsx("select",{name:"lvl-character",id:"lvl-character",onChange:u,className:"bg-white rounded-md text-[2rem] pl-3 pr-15",defaultValue:c,required:!0,children:[...Array(20).keys()].map(l=>l+1).map(l=>s.jsx("option",{value:l,children:l},l+"Option"))})]})]}),s.jsx(bn,{enteredRace:n}),s.jsx(En,{enteredClass:i,enteredLvl:c})]}),s.jsx(Ln,{}),s.jsx(Nn,{}),s.jsx(jn,{enteredClass:i,enteredRace:n}),s.jsx(An,{enteredClass:i,enteredLvl:c}),s.jsx(In,{enteredClass:i}),s.jsx(wn,{enteredRace:n}),s.jsxs("div",{children:[s.jsx("h2",{children:"Notes"}),s.jsx("textarea",{id:"notes-character",name:"notes-character",className:"bg-white rounded-md text-[1.5rem] w-full h-50 p-1"})]}),s.jsx(T,{type:"submit",className:"self-end xl:ml-auto",children:"Submit"})]})})}function tt({item:e,...t}){const{loading:n,error:r,data:i}=V(et,{variables:{index:e.index}});let a,c=!1;if(i){const o=i.equipment;o.gear_category&&o.index.includes("-pack")?(c=!0,a=s.jsx("div",{className:"max-h-[25vh] overflow-y-auto flex flex-col text-[1rem] gap-y-3 mt-2",children:o.contents.map((p,m)=>s.jsx(tt,{item:{...p.item,quantity:p.quantity}},t.key+"-packItem-"+m))})):o.equipment_category.index==="armor"?a=s.jsxs("div",{className:"flex flex-col text-[1rem]",children:[s.jsx("p",{children:o.desc}),s.jsx("p",{children:o.armor_category}),s.jsx("p",{children:`AC ${o.armor_class.base}, ${o.armor_class.dex_bonus&&"DEX Bonus"}, ${o.armor_class.max_bonus>0&&`Max Bonus ${o.armor_class.max_bonus}`}`}),o.stealth_disadvantage&&s.jsx("p",{children:"Stealth Disadvantage"})]}):o.equipment_category.index==="weapon"?a=s.jsxs("div",{className:"flex flex-col text-[1rem]",children:[s.jsx("p",{children:o.desc}),s.jsx("p",{children:`${o.category_range}, ${o.range.normal}ft`}),s.jsx("p",{children:`${o.damage.damage_dice} ${o.damage.damage_type.name}`}),o.two_handed_damage&&s.jsx("p",{children:"Two-handed Damage: "})]}):o.equipment_category.index==="tool"||o.equipment_category.index==="gear"||o.equipment_category.index==="pack"||o.equipment_category.index==="ammunition"||o.equipment_category.index}return s.jsxs("div",{className:"flex flex-col",...t,children:[s.jsxs("div",{className:"flex flex-row justify-between",children:[s.jsx("p",{children:e.name}),s.jsx("div",{className:"flex flex-row gap-5",children:s.jsxs("p",{className:"mr-10",children:["x",e.quantity]})})]}),a,!c&&s.jsx("div",{className:"h-[2px] bg-[#4a4a4aad] mt-8"})]})}function Fn({characterID:e,inventory:t}){return s.jsxs("div",{className:"flex flex-col",children:[s.jsx("h2",{children:"Inventory"}),s.jsx("div",{className:"flex flex-col gap-12",children:Object.keys(t).map(n=>s.jsxs("div",{className:"flex flex-col gap-5",children:[s.jsx("h3",{children:W(n)}),t[n].map((r,i)=>s.jsx(tt,{item:r},e+"-inventory-"+n+"-"+i))]},e+"-inventory-"+n))})]})}function Pn({selectedCharacter:e}){return s.jsxs("div",{className:"flex flex-row gap-10 items-center",children:[s.jsx("div",{className:"w-30 h-30 bg-white rounded-2xl"}),s.jsxs("div",{className:"flex flex-col",children:[s.jsx("h1",{children:e.name}),s.jsxs("div",{className:"flex flex-row gap-24",children:[s.jsx("h3",{children:W(e.race)}),s.jsx("h3",{children:`${W(e.characterClass)} ${e.lvl}`})]})]})]})}function qn({ability:e,score:t,modifier:n,proficient:r,...i}){let a=["flex flex-col text-[2rem] px-[3vw] py-[3vh] md:px-[2vw] md:py-[2.5vh] rounded-lg text-center justify-center"];return r?a.push("bg-[#FFF8ED]"):a.push("bg-white"),s.jsxs("div",{className:a.join(" "),...i,children:[s.jsx("p",{className:"mb-4",children:e.toUpperCase()}),s.jsx("p",{className:"font-bold",children:t}),s.jsx("p",{children:`(${n>0?"+"+n:n})`})]})}function Dn({selectedCharacter:e}){return s.jsxs("div",{className:"flex flex-col my-5",children:[s.jsx("h2",{children:"Ability Scores"}),s.jsx("div",{className:"flex flex-row gap-3 md:gap-5 mt-3",children:Be.map(t=>{let n=e.abilitiesAndSkills[t];return s.jsx(qn,{ability:t,score:n.score,modifier:n.modifier,proficient:n.proficient},e.characterID+"-"+t)})})]})}function Mn({selectedCharacter:e}){const t=e.characterID;return s.jsxs("div",{className:"flex flex-col",children:[s.jsx("h2",{children:"Class & Race Features"}),s.jsxs("div",{className:"flex flex-row gap-[40%]",children:[s.jsxs("div",{className:"flex flex-col",children:[s.jsx("h3",{children:"Languages"}),s.jsx("ul",{children:e.languages&&e.languages.map(n=>s.jsx("li",{children:n.name},t+"-language-"+n.index))})]}),s.jsxs("div",{className:"flex flex-col",children:[s.jsx("h3",{children:"Traits"}),s.jsx("ul",{children:e.features&&e.features.map(n=>s.jsx("li",{children:n.name},t+"-feature-"+n.index))})]})]})]})}function Bn({selectedCharacter:e}){return s.jsxs("div",{className:"flex flex-col",children:[s.jsx("h2",{children:"Stats"}),s.jsxs("div",{className:"flex flex-row gap-5 items-center",children:[s.jsx("h3",{children:"Armor Class"}),s.jsx("p",{children:e.armorClass})]}),s.jsxs("div",{className:"flex flex-row gap-5 items-center",children:[s.jsx("h3",{children:"Size"}),s.jsx("p",{children:e.size})]}),s.jsxs("div",{className:"flex flex-row gap-5 items-center",children:[s.jsx("h3",{children:"Proficiency Bonus"}),s.jsx("p",{children:e.proficiencyBonus})]})]})}function $n({spellData:e,...t}){const[n,r]=C.useState(!1);let i,a;n?(i="w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-t-md",a="bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md"):(i="w-full flex flex-row items-center justify-between bg-white text-black px-5 py-3 rounded-md",a="bg-gray-50 text-[1rem] px-5 py-5 rounded-b-md hidden");function c(m){r(u=>!u)}let o=e.name,p=e.area_of_effect||e.attack_type||e.damage||e.dc||e.heal_at_slot_level||e.higher_level;return s.jsxs("div",{...t,children:[s.jsx("div",{className:i,onClick:m=>c(),children:s.jsx("p",{children:o})}),s.jsxs("div",{className:a,children:[s.jsx("p",{children:`Casting Time: ${e.casting_time}`}),s.jsx("p",{children:`Duration: ${e.duration}`}),s.jsx("p",{children:`Range: ${e.range}`}),s.jsx("p",{children:`Concentration: ${e.concentration}`}),s.jsx("p",{children:`Ritual: ${e.ritual}`}),s.jsx("br",{}),e.area_of_effect&&s.jsx("p",{children:`AOE: ${e.area_of_effect}`}),e.attack_type&&s.jsx("p",{children:`Attack type: ${e.attack_type}`}),e.dc&&s.jsx("p",{children:`DC: ${e.dc.dc_type.name}`}),e.heal_at_slot_level&&s.jsx("p",{children:`Heal at slot level: ${e.heal_at_slot_level}`}),e.higher_level&&s.jsx("p",{children:`Higher level: ${e.higher_level}`}),e.damage&&s.jsxs(s.Fragment,{children:[s.jsx("p",{children:"Damage at Levels"}),e.damage.damage_at_character_level&&e.damage.damage_at_character_level.map(m=>s.jsx("p",{children:`${m.level}: ${m.damage}`},e.name+"Lvl"+m.level+"Dmg"))]}),p&&s.jsx("br",{}),s.jsx("p",{children:e.desc.join(" ")})]})]})}function Un({characterID:e,spellsLearned:t}){const[n,r]=C.useState("0"),i=t.length;let a=t[parseInt(n)].map((o,p)=>s.jsx($n,{spellData:o},e+"-lvl-"+o.level+"-spell-"+p));function c(o,p){o.preventDefault(),r(p)}return s.jsxs("div",{children:[s.jsx("h2",{children:"Spells"}),s.jsxs("div",{className:"flex flex-col gap-3 mt-3",children:[s.jsx("div",{className:"flex flex-row mb-5",children:Object.keys(t).map(o=>{let p;return o.toString()==="0"?p="rounded-tl-xl rounded-bl-xl":o===(i-1).toString()?p="rounded-tr-xl rounded-br-xl":p="",o.toString()===n?s.jsx(T,{type:"button",onClick:m=>c(m,o),selected:!0,bgColor:"bg-[#B91C1C]",selectedColor:"[#B91C1C]",rounded:p,children:o},"spellButtonLvl"+o):s.jsx(T,{type:"button",onClick:m=>c(m,o),selected:!1,selectedColor:"[#B91C1C]",rounded:p,children:o},"spellButtonLvl"+o)})}),s.jsx("div",{className:"h-auto max-h-[25vh] bg-gray-50 flex flex-col gap-1 overflow-y-scroll rounded-md",children:a})]})]})}const ti=rt(function(){const[t,n]=C.useState(!1),[r,i]=C.useState(),a=D(),c=L(E=>E.characters.characters),o=L(E=>E.characterCreation),p=at(),u=st().currentUser;let l=null;u&&(l=u.uid);function h(){t||n(!0)}function f(){n(!1),i(void 0)}function g(E){t&&f(),r!==E&&i(E)}function y(E){E.target.localName!=="button"&&(t&&f(),i(void 0))}function b(E){i(void 0);const O="users/users/"+l+"/private";ye(_e(p),{["characters/characters/"+E]:null,"characters/numberOfCharacters":X(-1),[O+"/characters/characterIDs/"+E]:null,[O+"/characters/numberOfCharacters"]:X(-1)}).then(()=>{}).catch($=>{console.log("error deleting the character from the db"),console.log($.message)})}function j(E,O,$){return(ae,H)=>{const U=H();let Q=0;for(const S of Object.values(U.characterCreation.inventory))Q+=S.length;if(Q==O){const S={abilitiesAndSkills:o.abilityScores,armorClass:10+o.abilityScores.dex.modifier,characterClass:Object.keys(o.classAndLvl)[0],characterID:Et(),features:o.features,inGames:[],inventory:structuredClone(U.characterCreation.inventory),languages:structuredClone(U.characterCreation.languages),lvl:Object.values(o.classAndLvl)[0],moveSpeed:o.moveSpeed,name:E,notes:$||null,proficiencies:o.classProficiencies.concat(o.raceProficiencies),proficiencyBonus:Math.ceil(Object.values(o.classAndLvl)[0]/4)+1,race:o.race,size:o.size,spellcasting:structuredClone(o.spellcasting),spellsLearned:structuredClone(o.spellsLearned),userID:l},I="users/users/"+l+"/private";ye(_e(p),{["characters/characters/"+S.characterID]:S,"characters/numberOfCharacters":X(1),[I+"/characters/characterIDs/"+S.characterID]:S.name,[I+"/characters/numberOfCharacters"]:X(1)}).then(()=>{}).catch(nt=>{console.log("error writing the new character into the db"),console.log(nt.message)})}}}function _(E){E.preventDefault();const O=new FormData(E.target),$=Object.fromEntries(O);console.log("submitted data:",$);let ae,H=0,U="";for(const[Q,S]of Object.entries($)){if(Q==="name-character"){a(k.setName(S)),ae=S;continue}if(Q==="notes-character"){a(k.setNotes(S)),U=S;continue}const I=S.split(":");I[0]==="editInventory"?I[1]==="counted_reference"&&(H++,a(k.editInventory({index:I[4],name:I[5],category:I[3],quantity:I[6]}))):I[0]==="learnLanguage"&&a(k.learnLanguage({index:I[4],name:I[5]}))}a(j(ae,H,U)),f()}let P;return t?P=s.jsx(Rn,{cancelFn:f,submitFn:_}):r==null?P=s.jsxs("div",{className:"h-[75vh] text-center content-center",children:[s.jsx("h2",{children:"A character hasn't been selected yet."}),s.jsx("p",{children:"Select a character or create a new one!"})]}):P=s.jsxs(s.Fragment,{children:[s.jsxs("div",{className:"flex flex-row justify-between items-center flex-wrap gap-y-3",children:[s.jsx(Pn,{selectedCharacter:r}),s.jsxs("div",{children:[s.jsx(T,{className:"mr-5 disabled:bg-[#8d8d8dc0]",disabled:!0,children:"Edit"}),s.jsx(T,{onClick:()=>b(r.characterID),children:"Delete"})]})]}),s.jsx(Bn,{selectedCharacter:r}),s.jsx(Dn,{selectedCharacter:r}),s.jsx(Mn,{selectedCharacter:r}),r.spellcasting&&s.jsx(Un,{characterID:r.characterID,spellsLearned:r.spellsLearned}),s.jsx(Fn,{characterID:r.characterID,inventory:r.inventory}),r.notes&&s.jsxs("div",{className:"flex flex-col",children:[s.jsx("h2",{children:"Notes"}),s.jsx("div",{className:"bg-white rounded-xl mt-3 p-3 whitespace-pre-wrap",children:r.notes})]})]}),s.jsxs("section",{id:"user-characters",className:"flex flex-row grow",children:[s.jsxs(_t,{onClick:E=>y(E),children:[s.jsx(T,{onClick:h,children:"+ Create Character"}),s.jsx("ul",{className:"w-full flex flex-col mt-10",children:Object.entries(c).map(([E,O])=>s.jsx(T,{onClick:()=>g(O),children:O.name},O.name))})]}),s.jsx(vt,{gap:"gap-15",children:P})]})});async function ni(){return{title:"Characters"}}export{ni as clientLoader,ti as default};
