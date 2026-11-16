import React from 'react';
import { DCLogic } from '../utils/DCLogic';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default class PrivacyPage extends DCLogic {
  componentDidMount() {
    document.title = 'Thỏa thuận chấp thuận bảo vệ và xử lý dữ liệu cá nhân – Bellhop';
  }

  render() {
    return (
      <div className="bh t">
        <Header active="none" startOpen={false} />

        <main className="doc-wrap">
          <div className="doc-container">
            <h1 className="doc-title">THỎA THUẬN CHẤP THUẬN BẢO VỆ VÀ XỬ LÝ DỮ LIỆU CÁ NHÂN</h1>
            <p className="doc-sub">
              (Theo Nghị định số 13/2023/NĐ-CP của chính phủ về Bảo vệ Dữ liệu cá nhân, có hiệu lực từ ngày 01/07/2023)
            </p>

            <div className="doc-body">
              <p>
                Bellhop tôn trọng quyền riêng tư và cam kết bảo vệ dữ liệu cá nhân của khách hàng, đối tác và các cá nhân có thông tin được xử lý thông qua phần mềm. Chính sách này quy định cách Bellhop thu thập, sử dụng, lưu trữ, chia sẻ và bảo vệ dữ liệu cá nhân trong quá trình cung cấp dịch vụ.
              </p>

              <h3>Điều 1: Phạm vi và loại dữ liệu thu thập</h3>
              <p>Trong quá trình sử dụng phần mềm Bellhop, các dữ liệu cá nhân có thể được thu thập bao gồm:</p>
              <p>1. Thông tin tài khoản: Họ tên, số điện thoại, email, chức vụ và thông tin đăng nhập của người sử dụng.</p>
              <p>2. Thông tin khách lưu trú: Họ tên, số điện thoại, email, thông tin giấy tờ tùy thân và các thông tin liên quan đến đặt phòng, lưu trú.</p>
              <p>3. Thông tin giao dịch: Lịch sử đặt phòng, thanh toán và các giao dịch phát sinh trong quá trình sử dụng dịch vụ.</p>
              <p>4. Dữ liệu kỹ thuật: Địa chỉ IP, thiết bị, trình duyệt và lịch sử truy cập hệ thống.</p>

              <h3>Điều 2: Mục đích xử lý dữ liệu cá nhân</h3>
              <p>Bellhop xử lý dữ liệu cá nhân nhằm:</p>
              <p>1. Cung cấp, duy trì và cải thiện các tính năng của phần mềm.</p>
              <p>2. Hỗ trợ khách sạn quản lý đặt phòng, khách lưu trú, thanh toán và hoạt động vận hành.</p>
              <p>3. Hỗ trợ kỹ thuật, xử lý sự cố và giải đáp yêu cầu của khách hàng.</p>
              <p>4. Thực hiện nghĩa vụ theo hợp đồng và các quy định pháp luật có liên quan.</p>
              <p>5. Đảm bảo an toàn hệ thống, phòng ngừa hành vi truy cập hoặc sử dụng trái phép.</p>

              <h3>Điều 3: Chia sẻ và cung cấp dữ liệu</h3>
              <p>1. Bellhop không tùy tiện mua bán hoặc chia sẻ dữ liệu cá nhân cho bên thứ ba. Dữ liệu chỉ được cung cấp trong những trường hợp cần thiết, chẳng hạn:</p>
              <p style={{ paddingLeft: '18px' }}>
                – Cho nhà cung cấp hạ tầng, lưu trữ hoặc dịch vụ kỹ thuật để vận hành phần mềm.<br />
                – Cho đối tác tích hợp khi cần thiết để cung cấp tính năng theo yêu cầu.<br />
                – Cho cơ quan nhà nước có thẩm quyền theo quy định pháp luật.<br />
                – Các trường hợp khác khi có sự đồng ý hợp lệ của chủ thể dữ liệu.
              </p>
              <p>2. Các bên tiếp nhận dữ liệu có trách nhiệm sử dụng thông tin đúng mục đích và thực hiện các biện pháp bảo vệ phù hợp.</p>

              <h3>Điều 4: Lưu trữ và bảo vệ dữ liệu</h3>
              <p>1. Bellhop áp dụng các biện pháp quản lý và kỹ thuật phù hợp nhằm hạn chế nguy cơ mất mát, rò rỉ, truy cập hoặc xử lý dữ liệu trái phép.</p>
              <p>2. Dữ liệu được lưu trữ trong khoảng thời gian cần thiết để phục vụ mục đích xử lý, thực hiện hợp đồng hoặc đáp ứng nghĩa vụ pháp lý. Việc xóa, hủy hoặc tiếp tục lưu trữ dữ liệu được thực hiện theo thỏa thuận với khách hàng và quy định pháp luật hiện hành.</p>

              <h3>Điều 5: Quyền của chủ thể dữ liệu</h3>
              <p>Cá nhân có dữ liệu được xử lý có các quyền theo quy định pháp luật, bao gồm:</p>
              <p>1. Được biết về hoạt động xử lý dữ liệu cá nhân.</p>
              <p>2. Đồng ý hoặc rút lại sự đồng ý trong các trường hợp pháp luật cho phép.</p>
              <p>3. Yêu cầu truy cập, chỉnh sửa hoặc xóa dữ liệu theo quy định.</p>
              <p>4. Yêu cầu hạn chế xử lý hoặc phản đối việc xử lý dữ liệu trong trường hợp phù hợp.</p>
              <p>5. Khiếu nại, tố cáo hoặc yêu cầu bồi thường khi quyền và lợi ích hợp pháp bị xâm phạm.</p>

              <h3>Điều 6: Trách nhiệm của khách hàng</h3>
              <p>1. Khách hàng sử dụng Bellhop có trách nhiệm đảm bảo việc thu thập và cung cấp dữ liệu cá nhân của nhân viên, khách lưu trú hoặc cá nhân khác được thực hiện đúng quy định pháp luật.</p>
              <p>2. Khách hàng cần thông báo cho chủ thể dữ liệu về hoạt động xử lý thông tin khi cần thiết, đồng thời chỉ cung cấp dữ liệu trong phạm vi được phép.</p>

              <h3>Điều 7: Thông tin liên hệ và Điều khoản chung</h3>
              <p>1. Nếu có thắc mắc hoặc yêu cầu liên quan đến việc bảo vệ và xử lý dữ liệu cá nhân, khách hàng có thể liên hệ với Bellhop qua:</p>
              <p style={{ paddingLeft: '18px' }}>
                – Đơn vị phụ trách: CÔNG TY TNHH GIẢI PHÁP CÔNG NGHỆ BELLHOP<br />
                – Email: <a href="mailto:admin@bellhop.vn" style={{ color: '#1f7a84', fontWeight: 600 }}>admin@bellhop.vn</a><br />
                – Hotline: <a href="tel:0972096499" style={{ color: '#1f7a84', fontWeight: 600 }}>097.209.6499</a>
              </p>
              <p>2. Bellhop có thể cập nhật chính sách này khi cần thiết để phù hợp với hoạt động cung cấp dịch vụ và quy định pháp luật hiện hành. Các thay đổi sẽ được thông báo trên website hoặc qua kênh liên hệ phù hợp.</p>
              <p>3. Bản Thỏa thuận này được giải thích và điều chỉnh theo quy định pháp luật Việt Nam. Trường hợp có các tranh chấp phát sinh và/hoặc liên quan đến bản Thỏa thuận này thì các tranh chấp đó sẽ được giải quyết tại Tòa án nhân dân có thẩm quyền.</p>

              <div className="doc-sign-block">
                <div className="doc-sign-inner">
                  <p style={{ fontWeight: 700, fontSize: '15px', textTransform: 'uppercase', color: '#101828', marginBottom: '6px' }}>
                    BÊN CUNG CẤP / KHÁCH HÀNG
                  </p>
                  <p style={{ fontStyle: 'italic', fontSize: '13.5px', color: '#64748b' }}>
                    (Xác nhận điện tử khi đăng ký và sử dụng dịch vụ)
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
