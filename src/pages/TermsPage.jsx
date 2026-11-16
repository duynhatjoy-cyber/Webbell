import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class TermsPage extends DCLogic {
  componentDidMount() {
    document.title = 'Điều khoản và bảo mật – Bellhop';
  }

  render() {
    return (
      <div className="bh t">
        <Header active="none" startOpen={false} />

        <main className="doc-wrap">
          <div className="doc-container">
            <h1 className="doc-title">ĐIỀU KHOẢN DỊCH VỤ VÀ BẢO MẬT HỆ THỐNG</h1>
            <p className="doc-sub">(Quy chế sử dụng dịch vụ nền tảng phần mềm quản lý lưu trú Bellhop)</p>

            <div className="doc-body">
              <p>
                Chào mừng Quý khách hàng đến với nền tảng Bellhop. Khi đăng ký tài khoản hoặc sử dụng bất kỳ phân hệ phần mềm nào trong hệ sinh thái Bellhop, Quý khách hàng thừa nhận đã đọc, hiểu rõ và đồng ý tuân thủ các Điều khoản và Chính sách bảo mật dưới đây.
              </p>

              <h3>Điều 1: Định nghĩa và Phạm vi dịch vụ</h3>
              <p>Bellhop là nền tảng công nghệ quản lý toàn diện cho cơ sở lưu trú (khách sạn, homestay, villa, chuỗi lưu trú), bao gồm các phân hệ phần mềm độc lập hoặc kết hợp:</p>
              <p>1. “Bellhop PMS”: Phần mềm quản lý vận hành lễ tân, buồng phòng, kho, F&amp;B và thu chi tại quầy.</p>
              <p>2. “Bellhop Booking Engine”: Công cụ đặt phòng trực tiếp trên website của cơ sở lưu trú.</p>
              <p>3. “Bellhop CMS (Channel Manager)”: Hệ thống quản lý và đồng bộ phòng trống, giá bán với các kênh OTA.</p>
              <p>4. “Bellhop Website”: Giải pháp thiết kế và vận hành website cơ sở lưu trú chuẩn SEO và di động.</p>
              <p>5. “Bellhop Message &amp; AI Concierge”: Hộp thư tập trung đa kênh và trợ lý trí tuệ nhân tạo chăm sóc khách tự động.</p>
              <p>6. “Bellhop Payment &amp; Finance”: Tích hợp thanh toán trực tuyến qua đối tác Kovena và kết nối dữ liệu tài chính sang MISA.</p>

              <h3>Điều 2: Đăng ký và Quản trị tài khoản</h3>
              <p>1. Người sử dụng có trách nhiệm cung cấp thông tin chính xác, đầy đủ và hợp pháp khi đăng ký tài khoản trên hệ thống Bellhop.</p>
              <p>2. Chủ tài khoản có trách nhiệm tự bảo mật thông tin đăng nhập, mật khẩu và chịu trách nhiệm với mọi hoạt động phát sinh dưới tài khoản của mình.</p>
              <p>3. Bellhop có quyền tạm ngưng hoặc chấm dứt tài khoản nếu phát hiện hành vi vi phạm pháp luật, gian lận, phá hoại hệ thống hoặc không tuân thủ các quy định tại điều khoản này.</p>

              <h3>Điều 3: Quyền sở hữu trí tuệ</h3>
              <p>Toàn bộ mã nguồn, cấu trúc phần mềm, giao diện, thiết kế, tài liệu hướng dẫn và thương hiệu Bellhop thuộc quyền sở hữu trí tuệ độc quyền của Công ty TNHH Giải pháp Công nghệ Bellhop. Khách hàng được cấp quyền sử dụng dịch vụ theo gói thuê bao đã đăng ký và không được sao chép, dịch ngược, phân phối lại hoặc chuyển nhượng cho bên thứ ba khi chưa có sự đồng ý bằng văn bản của Bellhop.</p>

              <h3>Điều 4: Cam kết bảo mật hệ thống và an toàn thông tin</h3>
              <p>1. <strong>Bảo mật hạ tầng:</strong> Hệ thống Bellhop được triển khai trên nền tảng đám mây đạt tiêu chuẩn quốc tế, áp dụng chứng chỉ mã hóa SSL/TLS cho mọi luồng truyền dữ liệu.</p>
              <p>2. <strong>Phân quyền truy cập:</strong> Dữ liệu của mỗi cơ sở được cô lập độc lập. Nhân viên từng ca trực chỉ có quyền truy cập đúng phân hệ và tính năng do người quản trị cấp.</p>
              <p>3. <strong>Sao lưu dự phòng:</strong> Dữ liệu đặt phòng và giao dịch được sao lưu định kỳ liên tục, đảm bảo khả năng phục hồi nguyên vẹn khi xảy ra sự cố kỹ thuật.</p>

              <h3>Điều 5: Quyền và nghĩa vụ của người sử dụng</h3>
              <p>1. Được sử dụng đầy đủ các tính năng của phần mềm theo đúng gói dịch vụ đã đăng ký.</p>
              <p>2. Được đội ngũ kỹ thuật của Bellhop hướng dẫn thiết lập, hỗ trợ giải đáp thắc mắc và khắc phục sự cố trong suốt thời gian sử dụng.</p>
              <p>3. Cam kết không sử dụng hệ thống vào các mục đích vi phạm pháp luật, phát tán mã độc hoặc gây cản trở hoạt động của nền tảng.</p>
              <p>4. Thanh toán phí dịch vụ đầy đủ và đúng hạn theo thỏa thuận và biểu phí công bố.</p>

              <h3>Điều 6: Giới hạn trách nhiệm</h3>
              <p>Bellhop luôn nỗ lực tối đa để duy trì sự hoạt động ổn định và liên tục của phần mềm. Tuy nhiên, Bellhop sẽ được miễn trừ trách nhiệm bồi thường trong các trường hợp sự cố phát sinh từ: gián đoạn mạng viễn thông quốc gia, lỗi từ bên thứ ba (OTA, cổng thanh toán ngân hàng), hoặc các sự kiện bất khả kháng theo quy định của pháp luật.</p>

              <h3>Điều 7: Thông tin liên hệ và Điều khoản thi hành</h3>
              <p>Điều khoản này được điều chỉnh và giải thích theo quy định của pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam. Mọi thắc mắc hoặc yêu cầu hỗ trợ xin vui lòng liên hệ:</p>
              <p>
                <strong>CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ BELLHOP</strong><br />
                <strong>Hotline:</strong> <a href="tel:0972096499" style={{ color: '#1f7a84', fontWeight: 600 }}>097.209.6499</a><br />
                <strong>Email:</strong> <a href="mailto:admin@bellhop.vn" style={{ color: '#1f7a84', fontWeight: 600 }}>admin@bellhop.vn</a><br />
                <strong>Website:</strong> <a href="https://bellhop.vn" style={{ color: '#1f7a84', fontWeight: 600 }}>https://bellhop.vn</a>
              </p>

              <div className="doc-sign-block">
                <div className="doc-sign-inner">
                  <p style={{ fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', color: '#101828', marginBottom: '6px' }}>
                    ĐẠI DIỆN KHÁCH HÀNG
                  </p>
                  <p style={{ fontStyle: 'italic', fontSize: '13.5px', color: '#64748b' }}>
                    (Xác nhận khi đăng ký hoặc ký hợp đồng)
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
