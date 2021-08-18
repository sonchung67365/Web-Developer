// Có 4 nhóm button
// NHÓM 1: Số (bao gồm phím . và +/-)
// NHÓM 2: Phép tính ( + - x / % )
// NHÓM 3: Xóa ( < CE )
// NHÓM 4: =

// Chúng ta có 2 phím đặc biệt: % =

/********** Quy ước cách thao tác ***********
 * QUY ƯỚC NHẬP PHÉP TÍNH 	: Khi bấm + mà ngay sau đó bấm - thì tính là +
 * QUY ƯỚC ƯU TIÊN 			: 1 (nhân chia) 2 (cộng trừ) 
 * QUY ƯỚC CÙNG ƯU TIÊN		: Ưu tiên bên trái trước
 */

/* Nhập: 1 + 15 * 2 + 6 / 3 + 2 * 2
		MẢNG SỐ: 				MẢNG PT:
				0 = 1					0 = +
				1 = 15					1 = *
				2 = 2					2 = +
				3 = 6					3 = /
				4 = 3					4 = +
				5 = 2					5 = *
				6 = 2
	-------------------------------------------------------------
	BƯỚC 1: TÍNH CÁC GIÁ TRỊ CỦA * hoặc / có trong biểu thức
			sau đó lưu lại bên trong 2 mảng

			Tính *
			MẢNG SỐ: 				MẢNG PT:
				0 = 1					0 = +
				1 = 30					1 = +
				2 = 6					2 = /
				3 = 3					3 = +
				4 = 2					4 = *
				5 = 2					
			Tính /
			MẢNG SỐ: 				MẢNG PT:
				0 = 1					0 = +
				1 = 30					1 = +
				2 = 2					2 = +
				3 = 2					3 = *
				4 = 2					
			Tính *
			MẢNG SỐ: 				MẢNG PT:
				0 = 1					0 = +
				1 = 30					1 = +
				2 = 2					2 = +
				3 = 4					
	
	BƯỚC 2: Thực hiện lần lượt từ trái sang		
 */

// số phép tính ưu tiên tìm thấy
var uu_tien = 0;

// mảng ghi nhớ các số hạng
var mang_so = new Array();
var mang_so_index = 0;

// mảng ghi nhớ phép tính
var mang_pt = new Array();
var mang_pt_index = 0;

// obj kết quả
var ketqua = document.getElementById('ketqua');

// đổi dấu
var doi_dau = false;

// vừa bấm phép tính
var doi_phep_tinh = false;

// phím mới
var phim_moi = '';

var str_ketqua = '';

// vừa kết thúc tính phím
var end = false;

/**************************/
// CÀI ĐẶT SỰ KIỆN
/**************************/

function ClickButton(obj) {

	//alert(obj.innerHTML);
	if (end) {
		ketqua.value = '';
		end = false;
	}

	//chuỗi hiện tại của kết quả
	if (str_ketqua == '' && phim_moi == '') {
		str_ketqua = ketqua.value;
	}
	if (str_ketqua == '0') { str_ketqua = '';}
	
	// HTML của phím bấm
	var type = obj.innerHTML; 
	//alert(type);

	

	// Nhóm số
	if (type == '0' || type == '1' || type == '2' || type == '3' || type == '4' || type == '5'
		|| type == '6' || type == '7' || type == '8' || type == '9' || type == '+/-' || type == '.') {
		//end	= false;
		doi_phep_tinh = false;
		//alert("Số");
		//alert("Giá trị đang hiện: " + str_ketqua);
		if (type == '+/-' ) {
			// đổi - thành +
			if (doi_dau) {
				doi_dau = false;
				str_ketqua = str_ketqua.substring(1);
			}
			// đổi + thành -
			else {
				doi_dau = true;
				str_ketqua = '-' + str_ketqua;
				//alert(str_ketqua);
			}
		}
		else {
			if (phim_moi == '0') { phim_moi = type;}
			else { phim_moi += type;}
		}
		ketqua.value = str_ketqua + phim_moi;
	}

	// Nhóm phép tính
	else if (type == '+' || type == '-' || type == 'x' || type == '/') {
		
		// trước đó bấm 1 phép tính
		if (doi_phep_tinh) {
			mang_pt[mang_pt_index - 1] = type;

			//alert(str_ketqua.substring(0, str_ketqua.length - 1) + type);
			ketqua.value = str_ketqua.substring(0, str_ketqua.length - 1) + type;
		}
		// chưa bấm phép tính
		else {
		mang_so[mang_so_index] = parseFloat(phim_moi);
		mang_so_index++;

		mang_pt[mang_pt_index] = type;
		mang_pt_index++;

		ketqua.value = ketqua.value + type;
		}
		doi_phep_tinh = true;
		// đổi giá trị 2 chuỗi cơ bản về rỗng
		str_ketqua = '';
		phim_moi = '';
		console.log(mang_so);
		console.log(mang_pt);
	}

	// Nhóm =
	else if (type == '=' || type == '%') {
		end = true;
		//alert(type);
		if (phim_moi != '') {
			mang_so[mang_so_index] = parseFloat(phim_moi);
			console.log(mang_so);
			console.log(mang_pt);
		}
		// Dấu =
		if (type == '=') {
			GetValue();
		}
		// Dấu %
		else {
			GetPercent();
		}
		// reset
		str_ketqua = '';
		phim_moi = '';
		mang_so = new Array();
		mang_pt = new Array();
		mang_so_index = 0;
		mang_pt_index = 0;
		uu_tien = 0;
	}

	// CE
	else if (type == 'CE') {
		phim_moi = '';
		ketqua.value = str_ketqua + phim_moi;
	}
	// <- phím xóa 1 kí tự
	else {
		if (phim_moi.length > 1) {
			phim_moi = phim_moi.substring(0, phim_moi.length - 1);
		}
		else {
			phim_moi = '0';
		}
		ketqua.value = str_ketqua + phim_moi;
	}
	
}

// Tính %
function GetPercent() {
	mang_pt_index--;
	// kiểm tra mảng số chỉ có 2 phần tử và phần tử thứ 2 khác 0
	if (mang_so_index != 1 && mang_so[1] == 0) {
		ketqua.value = "0";
	}
	// đúng là phép chia
	else if (mang_pt_index != 0) {
		ketqua.value = "0";
	}
	else if (mang_pt[0] != '/') {
		ketqua.value = "0";
	}
	else {
		var _kq = mang_so[0] / mang_so[1] * 100;
		ketqua.value = _kq; 
	}

}

// Tính giá trị thường
function GetValue() {
	mang_pt_index--;
	// Bước 1: phép tính ưu tiên
	for (var i = 0; i < mang_pt.length; i++) {
		if (mang_pt[i] == 'x' || mang_pt[i] == '/') { uu_tien++;}
	console.log("Ưu tiên: " + uu_tien);
	}
	while (uu_tien > 0) {
		for (var i = 0; i <= mang_pt_index; i++) {
			if (mang_pt[i] == 'x' || mang_pt[i] == '/') {
				// lấy 2 số hạng
				var sh1 = mang_so[i];
				var sh2 = mang_so[i+1];
				var kqt = 0;
				// thực hiện tính
				if (mang_pt[i] == 'x') { kqt = sh1 * sh2;}
				else if (sh2 == 0) { ketqua.value = "0";}
				else { kqt = sh1 / sh2;}
				// thay thế số hạng
				mang_so[i] = kqt;
				// dồn số hạng
				for (var j = i+1; j < mang_so_index; j++) {
					mang_so[j] = mang_so[j+1];
				}
				mang_so_index--;
				// xóa bỏ phép tính
				for (var j = i; j < mang_pt_index; j++) {
					mang_pt[j] = mang_pt[j+1];
				}
				mang_pt_index--;

				uu_tien--;
				
				// ngắt vòng lặp
				break;

				//alert(mang_so);
			}
		}
	}
	// Bước 2: phép tính thường
	while (mang_so_index > 0) {
		//alert('msg');
		// lấy 2 số hạng
		var sh1 = mang_so[0];
		var sh2 = mang_so[1];
		//alert(mang_so[0]);
		//alert(mang_so[1]);
		// tính kết quả
		var kqt = 0;
		if (mang_pt[0] == '+') { kqt = sh1 + sh2;}
		else { kqt = sh1 - sh2;}
		// thay thế số hạng
		mang_so[0] = kqt;
		// dồn số hạng
		for (var k = 1; k < mang_so_index; k++) {
			mang_so[k] = mang_so[k+1];
		}
		mang_so_index--;
		// xóa bỏ phép tính
		for (var k = 0; k < mang_pt_index; k++) {
			mang_pt[k] = mang_pt[k+1];
		}
		mang_pt_index--;
		console.log(mang_so);
		console.log(mang_pt);
	}
	// in kết quả
	ketqua.value = mang_so[0];
	//alert(mang_so[0]);
}