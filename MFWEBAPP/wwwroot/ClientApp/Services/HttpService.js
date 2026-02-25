var _http = {
	    
	post: function (url, data, success, AuthorizationToken) {

		return jQuery.ajax({
			url: url,
			type: 'POST',
			contentType: 'application/json',
			datatype: 'json',
			traditional: true,
			data: JSON.stringify(data),
			headers: {
				"Authorization": AuthorizationToken
			},
			success: function (resp, textStatus, xhr) {
				if (xhr.status === 200) {
					success(resp);
				}
			},
			error: function (xhr, textStatus, errorThrown) {
				//$('.page-loader-wrapper').hide();
              
				if (xhr.status === 403) {
					swal("", "Your token expired please try after login", "error");

					setTimeout(function () { window.location.href = DOMAIN_URL; }, 6000);
                    
				} else {
					//alert("some error occurred please try again");
					//failure(xhr);
				}
			}
		});
	},
	get: function (url, success, AuthorizationToken) {
		return jQuery.ajax({
			url: url,
			type: 'GET',
			contentType: 'application/json',
			datatype: 'json',
			traditional: true,
			headers: {
				"Authorization": AuthorizationToken
			},
			success: function (resp, textStatus, xhr) {
				if (xhr.status === 200) {
					success(resp);
				}
			},
			error: function (xhr, textStatus, errorThrown) {

				jQuery('.page-loader-wrapper').hide();
              
                if (xhr.status === 403) {
                    
					swal("","Your token expired please try after login","error");
					setTimeout(function () { window.location.href = DOMAIN_URL; }, 6000);
				} else {
					//alert("some error occurred please try again");
					//failure(xhr);
				}
			}
		});
	},
	CustomentPaymentpost: function (url, data, success, AuthorizationToken) {

		return $.ajax({
			url: url,
			type: 'POST',
			contentType: 'application/json',
			datatype: 'json',
			traditional: true,
			data: JSON.stringify(data),
			headers: {
				"Authorization": AuthorizationToken
			},
			success: function (resp, textStatus, xhr) {
				if (xhr.status === 200) {
					success(resp);
				}
			},
			error: function (xhr, textStatus, errorThrown) {
				//$('.page-loader-wrapper').hide();
				
				if (xhr.status === 403) {
					swal("", "Your token expired please try after login", "error");

					setTimeout(function () { window.location.href = DOMAIN_URL; }, 6000);

				} else {
					//alert("some error occurred please try again");
					//failure(xhr);
				}
			}
		});
	},
	postWithHeadersData: function (url, data, success, AuthorizationToken) {

		return $.ajax({
			url: url,
			type: 'POST',
			contentType: 'application/json',
			datatype: 'json',
			traditional: true,
			headers: {
				"Authorization": AuthorizationToken,
				"PropertyData": data
			},
			success: function (resp, textStatus, xhr) {
				
				if (xhr.status === 200) {
					
					success(code.decryptMessage(resp));
				}
			},
			error: function (xhr, textStatus, errorThrown) {
				//$('.page-loader-wrapper').hide();
				
				if (xhr.status === 403) {
					swal("", "Your token expired please try after login", "error");

					setTimeout(function () { window.location.href = DOMAIN_URL; }, 6000);

				} else {
					//alert("some error occurred please try again");
					//failure(xhr);
				}
			}
		});
	},


};
function encryptRSA(publicKeyPem, data) {
	// Load the public key
	const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);

	// Encrypt the data
	const encryptedData = publicKey.encrypt(data, 'RSA-OAEP');
	const encryptedDataBase64 = forge.util.encode64(encryptedData);
	return encryptedDataBase64;
}

function EncryptAes(data) {
	// Generate a random key and IV
	var key = forge.random.getBytesSync(32); // 16 bytes = 128 bits
	var iv = forge.random.getBytesSync(16);

	// Create a cipher
	var cipher = forge.cipher.createCipher('AES-CBC', key);
	cipher.start({ iv: iv });
	cipher.update(forge.util.createBuffer(data));
	cipher.finish();
	var encrypted = cipher.output;
	var keyBase64 = forge.util.encode64(key);
	var ivBase64 = forge.util.encode64(iv);
	return {
		key: keyBase64,
		iv: ivBase64,
		data: forge.util.encode64(encrypted.getBytes())
	}
}
function DecryptAes(text, keyBase64, ivBase64) {
	var key = forge.util.decode64(keyBase64);
	var iv = forge.util.decode64(ivBase64);
	// Decode encrypted data from Base64
	var encryptedBytes = forge.util.decode64(text);
	var encrypted = forge.util.createBuffer(encryptedBytes);
	var decipher = forge.cipher.createDecipher('AES-CBC', key);
	decipher.start({ iv: iv });
	decipher.update(encrypted);
	var success = decipher.finish();

	// Get the decrypted data
	return decipher.output;
}
function arrayBufferToBase64(buffer) {
	var binary = '';
	var bytes = new Uint8Array(buffer);
	var len = bytes.byteLength;
	for (var i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);

}
