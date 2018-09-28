$(function(){
	var submitBtn = $("button#submit");
	submitBtn.click(function(event){
		event.preventDefault();
		$.ajax({
			url:'/login',
			type:'post',
			data:{
				name:$("#name").val(),
				password:$("#password").val()
			},
			success:function(data){
				if(data && data.success){
					sessionStorage.setItem("user",data.user);
				 	window.location.href = data.redirect;
				}
			},
			error:function(data){

			}
		})
	})
})