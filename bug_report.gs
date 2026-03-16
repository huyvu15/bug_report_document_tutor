function doPost(e) {
  try {
    // Lấy sheet thao tác. (Có thể chỉ định rõ bằng: SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Báo Cáo Lỗi"))
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse JSON data gửi từ client
    var requestData = JSON.parse(e.postData.contents);
    
    // Trích xuất các trường dữ liệu
    var khoi = requestData.khoi || '';
    var chuong = requestData.chuong || '';
    var bai_id = requestData.bai_id || '';
    var ten_bai = requestData.ten_bai || '';
    var nguoi_bao_cao = requestData.nguoi_bao_cao || '';
    var loai_loi = requestData.loai_loi || '';
    var chi_tiet = requestData.chi_tiet || '';
    
    // Lấy thời gian hiện tại
    var timestamp = new Date();
    
    // Nếu sheet trống, khởi tạo tiêu đề (header)
    if (sheet.getLastRow() === 0) {
      var headers = [
        'Thời gian', 
        'Khối / Môn', 
        'Chương',
        'Mã Bài (ID)', 
        'Tên Bài Học', 
        'Người báo cáo', 
        'Loại lỗi', 
        'Chi tiết lỗi'
      ];
      sheet.appendRow(headers);
      
      // Định dạng header: In đậm m, màu nền xám nhạt
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f3f3f3');
    }
    
    // Thêm dòng dữ liệu mới vào bảng
    sheet.appendRow([
      timestamp,
      khoi,
      chuong,
      bai_id,
      ten_bai,
      nguoi_bao_cao,
      loai_loi,
      chi_tiet
    ]);
    
    // Tự động giãn cột để dễ nhìn (Tùy chọn)
    // sheet.autoResizeColumns(1, 7);
    
    // Trả về JSON thông báo thành công
    return ContentService.createTextOutput(JSON.stringify({ 
        'status': 'success', 
        'message': 'Báo cáo lỗi đã được ghi nhận.' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Trả về JSON thông báo lỗi nếu có
    return ContentService.createTextOutput(JSON.stringify({ 
        'status': 'error', 
        'message': error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Hàm xử lý HTTP GET request (Dùng để kiểm tra webhook có hoạt động hay không)
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ 
      'status': 'success', 
      'message': 'API Webhook Báo cáo lỗi HOCMAI đang hoạt động ổn định!' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
