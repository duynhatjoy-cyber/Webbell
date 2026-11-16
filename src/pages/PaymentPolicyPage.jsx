import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class PaymentPolicyPage extends DCLogic {
  componentDidMount() {
    document.title = 'Chính sách thanh toán – Bellhop';
  }

  render() {
    return (
      <div className="bh t">
        <Header active="none" startOpen={false} />

        <main className="doc-wrap">
          <div className="doc-container">
            <h1 className="doc-title">CHÍNH SÁCH VÀ QUY ĐỊNH THANH TOÁN</h1>
            <p className="doc-sub">(Áp dụng cho các giao dịch thuê bao phần mềm Bellhop và dịch vụ thanh toán trực tuyến)</p>

            <div className="doc-body">
              <p>
                Chính sách này quy định các nguyên tắc, phương thức, quy trình thanh toán và chính sách hoàn tiền đối với việc đăng ký sử dụng các gói giải pháp phần mềm Bellhop cũng như các tính năng thanh toán trực tuyến được tích hợp trên hệ thống.
              </p>

              <h3>Điều 1: Các phương thức thanh toán được chấp nhận</h3>
              <p>Quý khách hàng có thể lựa chọn thanh toán phí dịch vụ Bellhop qua các kênh chính thức sau:</p>
              <p>1. <strong>Chuyển khoản ngân hàng (VietQR 24/7):</strong> Quét mã QR thanh toán nhanh qua ứng dụng Mobile Banking của tất cả các ngân hàng Việt Nam.</p>
              <p>2. <strong>Thẻ nội địa (ATM Napas):</strong> Thanh toán trực tuyến qua thẻ ghi nợ nội địa có đăng ký dịch vụ Internet Banking.</p>
              <p>3. <strong>Thẻ quốc tế:</strong> Chấp nhận các loại thẻ tín dụng/ghi nợ quốc tế mang thương hiệu Visa, MasterCard, JCB.</p>
              <p>4. <strong>Cổng thanh toán đối tác (Bellhop Payment &amp; Kovena):</strong> Hỗ trợ khách sạn nhận tiền thanh toán phòng online từ du khách qua cổng thanh toán chuyên ngành lưu trú.</p>

              <h3>Điều 2: Quy trình thanh toán và Kích hoạt dịch vụ</h3>
              <p>1. <strong>Gói miễn phí (Bellhop PMS Free):</strong> Khách hàng được kích hoạt ngay lập tức mà không cần nhập thẻ thanh toán hay chi trả bất kỳ chi phí ban đầu nào.</p>
              <p>2. <strong>Các gói nâng cao &amp; Module bổ sung:</strong> Sau khi xác nhận đơn hàng hoặc hợp đồng dịch vụ, hệ thống sẽ phát hành mã thanh toán/hóa đơn. Dịch vụ sẽ được tự động kích hoạt hoặc gia hạn ngay sau khi hệ thống ghi nhận giao dịch thành công.</p>
              <p>3. <strong>Chu kỳ thanh toán:</strong> Được tính linh hoạt theo tháng, quý hoặc năm tùy thuộc vào gói dịch vụ khách hàng lựa chọn.</p>

              <h3>Điều 3: Quy định về Hóa đơn điện tử</h3>
              <p>Bellhop cung cấp đầy đủ hóa đơn giá trị gia tăng (HĐĐT) hợp pháp theo đúng quy định của Tổng cục Thuế Việt Nam cho tất cả các giao dịch thanh toán dịch vụ phần mềm. Khách hàng vui lòng cung cấp chính xác Tên doanh nghiệp/hộ kinh doanh, Mã số thuế và Email nhận hóa đơn khi thanh toán.</p>

              <h3>Điều 4: Chính sách hoàn tiền, hủy dịch vụ và Đổi gói</h3>
              <p>1. <strong>Dùng thử miễn phí:</strong> Bellhop khuyến khích khách hàng sử dụng bản demo và phân hệ miễn phí để trải nghiệm thực tế trước khi nâng cấp các gói trả phí.</p>
              <p>2. <strong>Hủy dịch vụ:</strong> Khách hàng có quyền chấm dứt sử dụng dịch vụ vào cuối chu kỳ thanh toán đã trả trước mà không phải chịu bất kỳ khoản phí phạt nào.</p>
              <p>3. <strong>Hoàn tiền:</strong> Trường hợp sự cố kỹ thuật nghiêm trọng kéo dài do lỗi từ phía hệ thống Bellhop mà không được khắc phục trong thời gian cam kết, Bellhop sẽ hoàn trả khoản phí thuê bao tương ứng với thời gian dịch vụ bị gián đoạn.</p>

              <h3>Điều 5: Tiêu chuẩn an toàn và Bảo mật giao dịch</h3>
              <p>1. Toàn bộ giao dịch thanh toán trực tuyến được bảo vệ bằng giao thức mã hóa SSL 256-bit chuẩn quốc tế.</p>
              <p>2. Hệ thống Bellhop không lưu trữ các dữ liệu thẻ nhạy cảm của khách hàng (như số thẻ đầy đủ, mã bảo mật CVV/CVC, mật khẩu OTP). Việc xử lý thanh toán thẻ được thực hiện trực tiếp bởi các ngân hàng và cổng thanh toán được Ngân hàng Nhà nước cấp phép (PCI-DSS compliant).</p>

              <h3>Điều 6: Thông tin liên hệ và Hỗ trợ giao dịch</h3>
              <p>Nếu Quý khách hàng cần tra cứu trạng thái thanh toán, yêu cầu xuất hóa đơn hoặc phản ánh sự cố giao dịch, xin vui lòng liên hệ:</p>
              <p>
                <strong>CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ BELLHOP</strong><br />
                <strong>Bộ phận Kế toán &amp; Thanh toán:</strong> <a href="mailto:admin@bellhop.vn" style={{ color: '#1f7a84', fontWeight: 600 }}>admin@bellhop.vn</a><br />
                <strong>Hotline tài chính / hỗ trợ:</strong> <a href="tel:0972096499" style={{ color: '#1f7a84', fontWeight: 600 }}>097.209.6499</a>
              </p>

              <div className="doc-sign-block">
                <div className="doc-sign-inner">
                  <p style={{ fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', color: '#101828', marginBottom: '6px' }}>
                    ĐẠI DIỆN KHÁCH HÀNG
                  </p>
                  <p style={{ fontStyle: 'italic', fontSize: '13.5px', color: '#64748b' }}>
                    (Xác nhận khi thanh toán dịch vụ)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }
}
