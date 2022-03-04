(()=>{"use strict";function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var t=new(function(){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=e,this._headers=n}var n,r;return n=t,(r=[{key:"getResponseData",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUser",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/users/me"),{headers:this._headers}).then((function(t){return e.getResponseData(t)}))}},{key:"getCards",value:function(){var e=this;return fetch("".concat(this._baseUrl,"/cards"),{headers:this._headers}).then((function(t){return e.getResponseData(t)}))}},{key:"getAppInfo",value:function(){return Promise.all([this.getUser(),this.getCards()])}},{key:"deleteLike",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:this._headers}).then((function(e){return t.getResponseData(e)}))}},{key:"putLike",value:function(e){var t=this;return fetch("".concat(this._baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:this._headers}).then((function(e){return t.getResponseData(e)}))}},{key:"deleteCard",value:function(e){return fetch("".concat(this._baseUrl,"/cards/").concat(e),{method:"DELETE",headers:this._headers})}},{key:"cardRenderServer",value:function(e,t){var n=this;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then((function(e){return n.getResponseData(e)}))}},{key:"sendNewAvatar",value:function(e){return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})})}},{key:"sendProfileData",value:function(e,t){return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})})}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}())("https://nomoreparties.co/v1/plus-cohort-6",{authorization:"64f73e63-60f2-487f-9d1f-1d8ea3c050e0","Content-Type":"application/json"});function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var r=function(){function e(t){var n=t.imageSelector,r=t.nameSelector,o=t.aboutSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._AvatarSrc=document.querySelector(n),this._Name=document.querySelector(r),this._About=document.querySelector(o)}var r,o;return r=e,(o=[{key:"getUserInfo",value:function(){var e=this;return t.getUser().then((function(t){e.id=t._id,e.name=t.name,e.about=t.about,e.avatar=t.avatar,e.cohort=t.cohort}))}},{key:"setUserInfo",value:function(e){this._AvatarSrc.src=e.avatar,this._Name.textContent=e.name,this._About.textContent=e.about}}])&&n(r.prototype,o),Object.defineProperty(r,"prototype",{writable:!1}),e}();function o(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var i=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"clear",value:function(){this._container.innerHTML=""}},{key:"addItem",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e){var t=this;e.reverse().forEach((function(e){t._renderer(e)}))}}])&&o(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,n){e.target.classList.contains("card__button_active")?t.deleteLike(n).then((function(t){return e.target.parentElement.querySelector(".card__likes").textContent=t.likes.length})).then((function(t){return e.target.classList.toggle("card__button_active")})).catch((function(e){console.log(e)})):t.putLike(n).then((function(t){return e.target.parentElement.querySelector(".card__likes").textContent=t.likes.length})).then((function(t){return e.target.classList.toggle("card__button_active")})).catch((function(e){console.log(e)}))}function c(e,n){t.deleteCard(n).then((function(t){return e.target.closest(".card").remove()})).catch((function(e){console.log(e)}))}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(t,n,r){var o=t.data,i=t.handleCardBigClick,a=t.handleCardLikeClick,c=t.handleCardDeleteClick;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._selector=r,this._link=o.link,this._name=o.name,this._likes=o.likes,this._cardId=o._id,this._ownerId=o.owner._id,this._currentUserId=n,this._handleCardBigClick=i,this._handleCardLikeClick=a,this._handleCardDeleteClick=c}var t,n;return t=e,(n=[{key:"_getElement",value:function(){return document.querySelector(this._selector).content.querySelector(".card").cloneNode(!0)}},{key:"generate",value:function(){var e=this;this._element=this._getElement();var t=this._element.querySelector(".card__image");return t.src=this._link,t.alt=this._name,this._element.querySelector(".card__likes").textContent=this._likes.length,this._element.querySelector(".card__title").textContent=this._name,Boolean(this._likes.find((function(t){return t._id===e._currentUserId})))&&this._element.querySelector(".card__button").classList.toggle("card__button_active"),this._ownerId===this._currentUserId||this._element.querySelector(".card__delete").classList.add("card__delete_visibility_hidden"),this._setEventListeners(),this._element}},{key:"_setEventListeners",value:function(){var e=this;this._element.querySelector(".card__image").addEventListener("click",this._handleCardBigClick),this._element.querySelector(".card__delete").addEventListener("click",(function(t){return e._handleCardDeleteClick(t,e._cardId)})),this._element.querySelector(".card__button").addEventListener("click",(function(t){return e._handleCardLikeClick(t,e._cardId)}))}}])&&u(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function s(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p=function(){function e(t,n){var r=this,o=t.formSelector,i=t.inputSelector,a=t.submitButtonSelector,c=t.inactiveButtonClass,u=t.inputErrorClass,l=t.errorClass;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),f(this,"_hasInvalidInput",(function(e){return e.some((function(e){return!e.validity.valid}))})),f(this,"_enableButton",(function(e,t){e.classList.remove(t),e.disabled=!1})),f(this,"_disableButton",(function(e,t){e.classList.add(t),e.disabled=!0})),f(this,"_toggleButtonState",(function(e,t){var n=e.querySelector(r._submitButtonSelector);r._hasInvalidInput(t)?r._disableButton(n,r._inactiveButtonClass):r._enableButton(n,r._inactiveButtonClass)})),f(this,"_showInputError",(function(e,t,n,r,o){e.classList.add(t),n.classList.add(r),n.textContent=o})),f(this,"_hideInputError",(function(e,t,n,r){e.classList.remove(t),n.classList.remove(r),n.textContent=""})),f(this,"_checkInputValidity",(function(e,t,n,o){var i=e.querySelector("#error-".concat(t.id));t.validity.valid?r._hideInputError(t,n,i,o):r._showInputError(t,n,i,o,t.validationMessage)})),f(this,"_setEventListeners",(function(e,t){var n=t.inputSelector,o=t.inputErrorClass,i=t.errorClass,a=t.submitButtonSelector,c=t.inactiveButtonClass,u=Array.from(e.querySelectorAll(n));u.forEach((function(t){t.addEventListener("input",(function(){r._checkInputValidity(e,t,o,i),r._toggleButtonState(e,u,a,c)}))})),r._toggleButtonState(e,u,a,c)})),this._formSelector=o,this._inputSelector=i,this._submitButtonSelector=a,this._inactiveButtonClass=c,this._inputErrorClass=u,this._errorClass=l,this._formSelectorForValidation=n}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){var e=this,t=document.querySelector(this._formSelectorForValidation),n=Array.from(t.querySelectorAll(this._inputSelector));n.forEach((function(r){r.addEventListener("input",(function(){e._checkInputValidity(t,r,e._inputErrorClass,e._errorClass),e._toggleButtonState(t,n)}))})),t.addEventListener("submit",(function(e){e.preventDefault()}))}}])&&s(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function d(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=document.querySelector(t)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popupSelector.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose.bind(this))}},{key:"close",value:function(){this._popupSelector.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose.bind(this))}},{key:"setEventListeners",value:function(){var e=this;this._popupSelector.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&e.close(),t.target.classList.contains("popup__close")&&(e.close(),e._popupSelector.classList.remove("popup_opened"))}))}},{key:"_handleEscClose",value:function(e){"Escape"==e.key&&this.close()}}])&&d(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function h(e){return h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},h(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function v(){return v="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=m(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},v.apply(this,arguments)}function m(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=S(e)););return e}function b(e,t){return b=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},b(e,t)}function g(e,t){if(t&&("object"===h(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function S(e){return S=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},S(e)}var k=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&b(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=S(r);if(o){var n=S(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return g(this,e)});function a(e,t,n){var r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(r=i.call(this,e))._imageSelector=document.querySelector(t),r._nameSelector=document.querySelector(n),r}return t=a,(n=[{key:"open",value:function(e){v(S(a.prototype),"open",this).call(this),this._imageSelector.src=e.target.src,this._imageSelector.alt=e.target.alt,this._nameSelector.textContent=e.target.alt}}])&&y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(_);function C(e){return C="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},C(e)}function w(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function E(){return E="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=L(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},E.apply(this,arguments)}function L(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=j(e)););return e}function O(e,t){return O=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},O(e,t)}function P(e,t){if(t&&("object"===C(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function j(e){return j=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},j(e)}var q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&O(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=j(r);if(o){var n=j(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return P(this,e)});function a(e,t){var n,r=t.handleFormSubmit;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._handleFormSubmit=r,n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList=document.querySelectorAll(".popup__input"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"close",value:function(){E(j(a.prototype),"close",this).call(this),this._popupSelector.querySelector(".popup__form").reset()}},{key:"setEventListeners",value:function(){var e=this;E(j(a.prototype),"setEventListeners",this).call(this),this._popupSelector.addEventListener("submit",(function(t){e._handleFormSubmit(e._getInputValues())}))}}])&&w(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(_);function I(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var B=document.querySelector(".profile__add"),R=document.querySelector(".profile__edit"),A=document.querySelector(".popup__input_type_name"),x=document.querySelector(".popup__input_type_about"),T=document.querySelector(".profile__name"),U=document.querySelector(".profile__about"),D=document.querySelector(".profile__avatar"),V=document.querySelector(".popup_type_avatar").querySelector(".popup__form_type_avatar").querySelector(".popup__button"),N=document.querySelector(".popup__form_type_profile").querySelector(".popup__button"),F=document.querySelector(".popup_type_cards").querySelector(".popup__button"),H=document.querySelector(".profile__image"),J={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},M={nameSelector:".profile__name",aboutSelector:".profile__about",imageSelector:".profile__image"},z=new r(M);z.getUserInfo();var $=new p(J,".popup__form_type_cards");$.enableValidation();var G=new p(J,".popup__container_type_avatar");G.enableValidation(),new p(J,".popup__form_type_profile").enableValidation();var K=new q(".popup_type_cards",{handleFormSubmit:function(e){F.textContent="Сохранение...",t.cardRenderServer(e.formNameCard,e.formLinkCard).then((function(e){Z._renderer(e),$._disableButton(F,J.inactiveButtonClass),K.close()})).catch((function(e){console.log(e)})).finally((function(){F.textContent="Создать"}))}}),Q=new q(".popup_type_avatar",{handleFormSubmit:function(e){V.textContent="Сохранение...",t.sendNewAvatar(e.formLinkAvatar).then((function(){H.src=e.formLinkAvatar,G._disableButton(V,J.inactiveButtonClass),Q.close()})).catch((function(e){alert(e)})).finally((function(){V.textContent="Сохранить"}))}}),W=new q(".popup_type_profile",{handleFormSubmit:function(e){N.textContent="Сохранение...",t.sendProfileData(e.formNameProfile,e.formAboutProfile).then((function(){T.textContent=e.formNameProfile,U.textContent=e.formAboutProfile,W.close()})).catch((function(e){alert(e)})).finally((function(){N.textContent="Сохранить"}))}}),X=new k(".popup_type_image",".popup__image",".popup__name");function Y(e){X.open(e),X.setEventListeners()}B.addEventListener("click",(function(){K.open()})),D.addEventListener("click",(function(){Q.open()})),R.addEventListener("click",(function(){W.open(),A.value=T.textContent,x.value=U.textContent})),K.setEventListeners(),Q.setEventListeners(),W.setEventListeners();var Z=new i({renderer:function(e){var t=new l({data:e,handleCardBigClick:Y,handleCardLikeClick:a,handleCardDeleteClick:c},z.id,"#card-template").generate();Z.addItem(t)}},".cards__list");t.getAppInfo().then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){c=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return I(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?I(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],a=o[1];new r(M).setUserInfo(i),Z.renderItems(a)})).catch((function(e){return console.log(e)}))})();