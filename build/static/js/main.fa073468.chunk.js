(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,a){},18:function(e,t,a){},20:function(e,t,a){e.exports=a(47)},26:function(e,t,a){},27:function(e,t,a){},47:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(19),c=a.n(s),l=(a(26),a(2)),r=a(3),o=a(6),m=a(4),u=a(5),d=(a(27),a(8)),p=a(9),h=(a(12),a(7)),v=a.n(h),f=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).updateName=function(e,t){for(var n=a.props.parent.state.cocktails,i=0;i<n.length;++i)if(n[i].index===e){e=i;break}n[e].name=t.target.value,a.props.parent.setState({cocktails:n}),a.setState({name:n[e].name})},a.updateAlcohol=function(e,t){var n=a.props.parent.state.cocktails;console.log(t.target.value);for(var i=0;i<n.length;++i)if(n[i].index===e){e=i;break}n[e].alcohol.name=t.target.value,a.props.parent.setState({cocktails:n}),a.setState({alcohol:n[e].alcohol.name})},a.updateMixer=function(e,t){for(var n=a.props.parent.state.cocktails,i=0;i<n.length;++i)if(n[i].index===e){e=i;break}n[e].mixer.name=t.target.value,a.props.parent.setState({cocktails:n}),a.setState({mixer:n[e].mixer.name})},a.updatePrice=function(e,t){for(var n=a.props.parent.state.cocktails,i=0;i<n.length;++i)if(n[i].index===e){e=i;break}t.target.value>0?n[e].price=parseInt(t.target.value):n[e].price=t.target.value,a.props.parent.setState({cocktails:n}),a.setState({price:n[e].price})},a.handleSubmit=function(e,t){t.preventDefault();var n=a.props.parent.state.cocktails,i=new FormData,s=document.querySelector("#file".concat(a.props.index));i.append("image",s.files[0]),v.a.post("/api/image",i,{headers:{"Content-Type":"multipart/form-data"}}).then(function(t){console.log(t.data);for(var i=0;i<n.length;++i)if(n[i].index===e){e=i;break}n[e].image=t.data,a.props.parent.setState({cocktails:n}),a.setState({image:t.data})}).catch(function(e){alert("Files must be less than 1 MB")})},a.state={pictures:[],name:"",price:"",alcohol:"",mixer:"",error:"",image:"/images/uploads/b98d337e481b663b75c3b348e1ef71cbc614d83e.jpg"},a.onDrop=a.onDrop.bind(Object(p.a)(a)),a.fileInput=i.a.createRef(),a.imageRef=i.a.createRef(),a.submitRef=i.a.createRef(),a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"componentWillMount",value:function(){var e=this.props,t=e.name,a=e.alcohol,n=e.mixer,i=e.price,s=e.image,c=e.parent;t&&this.setState({name:t}),a&&this.setState({alcohol:a}),n&&this.setState({mixer:n}),i&&this.setState({price:i}),s&&this.setState({image:s});for(var l=!1,r=!1,o=1;o<=4;++o)c.state["alc".concat(o)]===a&&(l=!0),c.state["mix".concat(o)]===n&&(r=!0);console.log("alcoholFound: "+l),0==l&&this.setState({alcohol:c.state.alc1}),0==r&&this.setState({mixer:c.state.mix1})}},{key:"onDrop",value:function(e){this.setState({pictures:this.state.pictures.concat(e)})}},{key:"render",value:function(){var e=this,t=this.state,a=t.name,n=t.alcohol,s=t.mixer,c=t.price,l=t.image,r=this.props,o=r.alcArray,m=r.mixArray,u=r.index,d={width:"80%"};return i.a.createElement("div",{className:"container border border-primary rounded mt-5 mb-3",style:{width:"300px"}},i.a.createElement("form",{onSubmit:function(t){return e.handleSubmit(e.props.index,t)},style:{display:"none"}},i.a.createElement("input",{type:"file",name:"img",id:"file".concat(this.props.index),accept:"image/png, image/jpeg",onChange:function(){return e.submitRef.current.click()},ref:this.fileInput}),i.a.createElement("button",{ref:this.submitRef,type:"submit"},"Submit")),i.a.createElement("div",{className:"row justify-content-center mt-3"},i.a.createElement("div",{className:"border justify-content-center text-center",style:{width:"200px",height:"200px"},onClick:function(){return e.fileInput.current.click()}},i.a.createElement("img",{src:l}))),i.a.createElement("div",{className:"row justify-content-center mt-3"},"Cocktail Name:"),i.a.createElement("div",{className:"row justify-content-center"},i.a.createElement("input",{value:a,onChange:function(t){return e.updateName(e.props.index,t)},style:d})),i.a.createElement("div",{className:"row justify-content-center"},"Alcohol:"),i.a.createElement("div",{className:"row justify-content-center"},i.a.createElement("select",{value:n,onChange:function(t){return e.updateAlcohol(u,t)},style:d},i.a.createElement("option",{value:o[0]},o[0]),i.a.createElement("option",{value:o[1]},o[1]),i.a.createElement("option",{value:o[2]},o[2]),i.a.createElement("option",{value:o[3]},o[3]))),i.a.createElement("div",{className:"row justify-content-center"},"Mixer"),i.a.createElement("div",{className:"row justify-content-center"},i.a.createElement("select",{value:s,onChange:function(t){return e.updateMixer(u,t)},style:d},i.a.createElement("option",{value:m[0]},m[0]),i.a.createElement("option",{value:m[1]},m[1]),i.a.createElement("option",{value:m[2]},m[2]),i.a.createElement("option",{value:m[3]},m[3]))),i.a.createElement("div",{className:"row justify-content-center"},"Cocktail Price:"),i.a.createElement("div",{className:"row justify-content-center"},i.a.createElement("input",{className:"input",value:c,onChange:function(t){return e.updatePrice(e.props.index,t)},maxLength:"8",style:d})),i.a.createElement("div",{className:"row justify-content-center mt-3 mb-3"},i.a.createElement("h5",{style:{color:"red",textAlign:"center"}},this.state.error),i.a.createElement("button",{onClick:function(t){return e.props.parent.deleteDrink(e.props.index,t)}},"Remove")))}}]),t}(n.Component),g=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).setMessage=function(e){a.setState({message:e}),setTimeout(function(){a.setState({message:null})},3e3)},a.getMachines=function(){var e=a.props.userToken;v.a.get("/api/machines/".concat(e)).then(function(e){a.setState({machineList:e.data}),console.log(e.data)})},a.generateDrinks=function(){"Select"!==a.state.machine&&(a.setState({isLoaded:!a.state.isLoaded}),v.a.get("/api/cocktails/".concat(a.state.machine)).then(function(e){console.log(e.data);for(var t=e.data,n=[],i=0;i<t.length;i++)for(var s=0;s<t[i].cocktails.length;s++)n.push(t[i].cocktails[s]),a.setState(Object(d.a)({},"time".concat(s+1),t[i].cocktails[s].mixer.time));n.forEach(function(e){e.index=Math.floor(5e5*Math.random())}),a.setState({cocktails:n,drinkList:e.data})}).catch(function(e){console.log(e)}))},a.addDrinkComponent=function(){var e=a.state,t=e.cocktails,n=e.alc1,i=e.mix1;if(t.length>1){var s=[{name:"",price:0,alcohol:{name:n,container:0},mixer:{name:i,container:0,time:0},image:null,index:Math.floor(5e5*Math.random())}];a.setState({cocktails:s.concat(t)})}},a.cancel=function(){a.setState({cocktails:[],isLoaded:!1,time1:"",time2:"",time3:"",time4:""})},a.deleteDrink=function(e){var t=a.state.cocktails;console.log("Deleting: "+e);for(var n=0,i=0;i<t.length;++i)if(t[i].index===e){console.log("Found drink at "+i),n=i;break}t.splice(n,1),a.setState({cocktails:t})},a.saveMachine=function(){var e=a.state,t=e.cocktails,n=e.machine;console.log(t),t.forEach(function(e){delete e.index});for(var i=[],s=function(e){var n={};n.alcohol=a.state["alc".concat(e+1)];var s=[];t.forEach(function(t){t.alcohol.name===n.alcohol&&s.push(t),t.mixer.name===a.state["mix".concat(e+1)]&&(t.mixer.time=a.state["time".concat(e+1)])}),n.cocktails=s,i.push(n)},c=0;c<4;++c)s(c);console.log(i);var l=JSON.stringify(i);v.a.post("/api/cocktails/".concat(n),{cocktails:l}).then(function(e){console.log(e.data),a.cancel(),a.setMessage("Cocktails added")})},a.fieldInput=function(e){var t=a.state.machineList,n=e.target.value;if("Select"===n)a.setState({machine:"Select",alc1:"",alc2:"",alc3:"",alc4:"",mix1:"",mix2:"",mix3:"",mix4:"",time1:"",time2:"",time3:"",time4:""});else{a.setState({machine:n,cocktails:[]});for(var i=0;i<t.length;i++)if(t[i].id===parseInt(n))for(var s=0;s<4;s++){var c;a.setState((c={},Object(d.a)(c,"alc".concat(s+1),t[i].alcohol[s].name),Object(d.a)(c,"mix".concat(s+1),t[i].mixer[s].name),c))}}},a.inputHandler=function(e){a.setState(Object(d.a)({},e.target.name,e.target.value))},a.state={error:null,isLoaded:!1,machine:"Select",alcohols:["","","",""],machineList:[],drinkList:[],alc1:"",alc2:"",alc3:"",alc4:"",mix1:"",mix2:"",mix3:"",mix4:"",time1:"",time2:"",time3:"",time4:"",userToken:null,cocktails:[],message:null},a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"componentDidMount",value:function(){this.getMachines()}},{key:"render",value:function(){var e=this,t=this.state,a=t.machineList,n=t.cocktails,s=i.a.createElement("div",{className:"row mt-4 justify-content-center"},i.a.createElement("button",{onClick:this.cancel,className:" btn btn-primary btn-sm col-sm-1 mr-4"},"Cancel"),i.a.createElement("button",{onClick:this.addDrinkComponent,className:" btn btn-primary btn-sm col-sm-1 mr-4"},"Add Cocktail"),i.a.createElement("button",{onClick:this.saveMachine,className:"btn btn-primary btn-lsm col-sm-1 mr-4"},"Save"));0==n.length&&(s=i.a.createElement("div",{className:"row mt-4 justify-content-center"},i.a.createElement("button",{onClick:this.generateDrinks,className:" btn btn-primary btn-sm col-sm-1 mr-4"},"Apply")));for(var c=[],l=[],r=1;r<=4;++r)c.push(this.state["alc".concat(r)]),l.push(this.state["mix".concat(r)]);var o=n.map(function(t,a){return i.a.createElement("div",{className:"col",key:t.index},i.a.createElement(f,{name:t.name,alcohol:t.alcohol.name,alcArray:c,mixer:t.mixer.name,mixArray:l,price:t.price,image:t.image,parent:e,index:t.index}))});return i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"border-bottom border-top mt-3 border-info pt-4 pb-4"},i.a.createElement("select",{onChange:function(t){e.fieldInput(t)},value:this.state.machine},i.a.createElement("option",{value:"Select"},"Select"),a.map(function(e){return i.a.createElement("option",{key:e.id,value:e.id},"Machine "+e.id)})),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col"},"Alcohol Container 1"),i.a.createElement("div",{className:"col"},"Alcohol Container 2"),i.a.createElement("div",{className:"col"},"Alcohol Container 3"),i.a.createElement("div",{className:"col"},"Alcohol Container 3")),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.alc1,disabled:this.state.isLoaded,name:"alc1",onChange:this.inputHandler})),i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.alc2,disabled:this.state.isLoaded,name:"alc2",onChange:this.inputHandler})),i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.alc3,disabled:this.state.isLoaded,name:"alc3",onChange:this.inputHandler})),i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.alc4,disabled:this.state.isLoaded,name:"alc4",onChange:this.inputHandler}))),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col"},"Mixer Container 1"),i.a.createElement("div",{className:"col"},"Mixer Container 2"),i.a.createElement("div",{className:"col"},"Mixer Container 3"),i.a.createElement("div",{className:"col"},"Mixer Container 3")),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.mix1,disabled:this.state.isLoaded,name:"mix1",onChange:this.inputHandler})),i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.mix2,disabled:this.state.isLoaded,name:"mix2",onChange:this.inputHandler})),i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.mix3,disabled:this.state.isLoaded,name:"mix3",onChange:this.inputHandler})),i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.mix4,disabled:this.state.isLoaded,name:"mix4",onChange:this.inputHandler}))),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col"},"Mixer 1 Pour Time"),i.a.createElement("div",{className:"col"},"Mixer 2 Pour Time"),i.a.createElement("div",{className:"col"},"Mixer 3 Pour Time"),i.a.createElement("div",{className:"col"},"Mixer 4 Pour Time")),i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.time1,disabled:!this.state.isLoaded,name:"time1",onChange:this.inputHandler})),i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.time2,disabled:!this.state.isLoaded,name:"time2",onChange:this.inputHandler})),i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.time3,disabled:!this.state.isLoaded,name:"time3",onChange:this.inputHandler})),i.a.createElement("div",{className:"col"},i.a.createElement("input",{value:this.state.time4,disabled:!this.state.isLoaded,name:"time4",onChange:this.inputHandler}))),i.a.createElement("div",{className:"row mt-3"},i.a.createElement("div",{className:"col h1 text-danger text-center"},this.state.message))),s,i.a.createElement("div",null,i.a.createElement("div",{className:"row"},o)))}}]),t}(n.Component),E=(a(18),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).setMessage=function(e){a.setState({message:e}),setTimeout(function(){a.setState({message:null})},3e3)},a.emailHandler=function(e){a.setState({email:e.target.value})},a.passwordHandler=function(e){a.setState({password:e.target.value})},a.submitHandler=function(e){var t=a.state,n=t.email,i=t.password;v.a.post("/api/users",{email:n,password:i}).then(function(e){a.props.setToken(e.data.token),a.props.setDisplay(parseInt("2"))}).catch(function(e){console.log(e),a.setMessage("Invalid email/password")}),e.preventDefault()},a.state={email:"",password:"",message:null},a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"container mt-5 p-5 border rounded"},i.a.createElement("div",{className:"row"},i.a.createElement("div",{className:"col-sm text-center h2"},"Login")),i.a.createElement("div",{className:"row mt-2"},i.a.createElement("div",{className:"col-sm"},i.a.createElement("div",{className:"input-group mb-3"},i.a.createElement("div",{className:"input-group-prepend"},i.a.createElement("span",{className:"input-group-text",id:"inputGroup-sizing-default"},"Email")),i.a.createElement("input",{type:"text",value:this.state.email,onChange:this.emailHandler,className:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-default"})))),i.a.createElement("div",{className:"row mt-2"},i.a.createElement("div",{className:"col-sm"},i.a.createElement("div",{className:"input-group mb-3"},i.a.createElement("div",{className:"input-group-prepend"},i.a.createElement("span",{className:"input-group-text",id:"inputGroup-sizing-default"},"Password")),i.a.createElement("input",{type:"password",value:this.state.password,onChange:this.passwordHandler,className:"form-control","aria-label":"Sizing example input","aria-describedby":"inputGroup-sizing-default"})))),i.a.createElement("div",{className:"row mt-2"},i.a.createElement("div",{className:"col-sm"},i.a.createElement("button",{type:"submit",onClick:this.submitHandler,className:"btn btn-primary btn-lg float-right"},"Login"))),i.a.createElement("div",{className:"row mt-2"},i.a.createElement("div",{className:"col-sm mt-3 text-danger h2 text-center"},this.state.message)))}}]),t}(n.Component)),b=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).registerUser=function(){var e=a.state,t=e.Password,n=e.ConfirmPswrd,i=e.PswrdError,s=e.Email;t===n?(console.log(t+n),v.a.post("/signup",{params:{email:s,password:t}}).then(function(e){var t=e.data;a.setState({UserId:t})}).catch(function(e){console.log(e)})):(i=!0,console.log("Password do not match "+i))},a.state={Email:"",Password:"",ConfirmPswrd:"",PswrdError:!1,UserId:""},a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("div",{className:"SignUpFrame"},this.state.UserId,"Email",i.a.createElement("span",{style:{display:"block"}},i.a.createElement("input",{value:this.state.Email,onChange:function(t){e.setState({Email:t.target.value})}})),"Password",i.a.createElement("span",{style:{display:"block"}},i.a.createElement("input",{type:"password",value:this.state.Password,onChange:function(t){e.setState({Password:t.target.value})}})),"Confirm Password",i.a.createElement("span",{style:{display:"block"}},i.a.createElement("input",{type:"password",value:this.state.ConfirmPswrd,onChange:function(t){e.setState({ConfirmPswrd:t.target.value})}})),i.a.createElement("button",{onClick:this.registerUser},"Register"))}}]),t}(n.Component),k=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).setUser=function(e){a.setState({user:e})},a.setToken=function(e){console.log("Token from child: "+e),a.setState({token:e})},a.setDisplay=function(e){console.log("Display from child: "+e),a.setState({screen:e})},a.state={token:"",screen:0,user:null},a}return Object(u.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){var e;switch(this.state.screen){case 0:e=i.a.createElement(E,{setToken:this.setToken,setDisplay:this.setDisplay});break;case 1:e=i.a.createElement(b,null);break;case 2:e=i.a.createElement(g,{userToken:this.state.token})}return i.a.createElement("div",null,e)}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[20,1,2]]]);
//# sourceMappingURL=main.fa073468.chunk.js.map