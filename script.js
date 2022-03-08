//updated
$(() => {
	let email = (confPassword = password = phone = "");
	const visible = $("#visible");
	const confVisible = $("#conf-visible");
	const emailValidation =
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	const passwordValidation = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;
	const phoneValidation =
		/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
	let togglePasswordV = false;
	let toggleConfPasswordV = false;
	const validateMsg = $(".right-box__validate");
	const URL = "https://613dbc7b94dbd600172ab9bf.mockapi.io/login";

	const toggleVisibility = (item, toggle, password, img) => {
		item.click(() => {
			toggle = toggle ? false : true;
			password.attr("type", toggle ? "text" : "password");
			img.attr(
				"src",
				toggle ? "./img/visibility-on.svg" : "./img/visibility_off.svg"
			);
		});
	};

	const validate = (input, text) => {
		$(input).addClass("required");
		validateMsg.text(text);
		$(input).click(function () {
			$(this).removeClass("required");
			validateMsg.text("");
		});
	};

	$("input").change(() => {
		password = $("#password").val();
		confPassword = $("#conf-password").val();
		email = $("#email").val();
		phone = $("#phone").val();
	});

	$("form#signup").submit((e) => {
		e.preventDefault();

		//  validation --------------
		$("section").removeClass("success");
		if (!email) {
			validate("#email", "Email required");
		} else if (!email.match(emailValidation)) {
			validate("#email", "Email not valid");
		} else if (!password) {
			validate("#password", "Password required");
		} else if (!password.match(passwordValidation)) {
			validate("#password", "Password not valid");
		} else if (password !== confPassword) {
			validate("#conf-password", "Password doesn't match");
		} else {
			$.ajax(URL, {
				type: "POST",
				dataType: "json",
				data: {
					email,
					password,
					phone,
				},
				success: function (data, status, jqXHR) {
					$("section").addClass("success");
					$(".right-box__loged-in h2").text(
						`You are loged in , Welcome ${email.split("@")[0]}`
					);
				},
				error: (jqXHR, status, throwErr) => console.log("fail"),
			});
		}
	});

	toggleVisibility(visible, togglePasswordV, $("#password"), visible);
	toggleVisibility(
		confVisible,
		toggleConfPasswordV,
		$("#conf-password"),
		confVisible
	);

	window.location.pathname == "/index.html" || "/"
		? $("#signup").css("color", "#AB520C")
		: $("#login").css("color", "#AB520C");
});
