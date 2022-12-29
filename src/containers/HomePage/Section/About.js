import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about-header">
          Truyền thông nói về BOOKINGCARE
        </div>
        <div className="section-about-content">
          <div className="content-left">
            <iframe
              width="100%"
              height="400px"
              src="https://www.youtube.com/embed/FyDQljKtWnI"
              title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-right">
            <p>
              BookingCare là nền tảng Đặt Lịch Khám giúp bệnh nhân dễ dàng lựa
              chọn đúng bác sĩ từ mạng lưới bác sĩ chuyên khoa giỏi, với thông
              tin đã xác thực và đặt lịch nhanh chóng. VÌ SAO ĐẶT LỊCH KHÁM VỚI
              BOOKINGCARE 1. Bác sĩ uy tín Bác sĩ chuyên khoa giỏi, thông tin đã
              xác thực, được nhiều bệnh nhân tin tưởng, đồng nghiệp đánh giá
              cao, có uy tín trong ngành. Đã, đang công tác tại các bệnh viện
              hàng đầu tại Hà Nội. 2. Đúng người, đúng bệnh Thông tin và kinh
              nghiệm bác sĩ được xác thực, nội dung bài viết cẩm nang dễ hiểu
              cùng với sự gợi ý từ hệ thống, bệnh nhân đặt khám đúng bác sĩ
              chuyên khoa giỏi phù hợp với vấn đề của mình. 3. Hỗ trợ chu đáo
              Trên cơ sở hợp tác chặt chẽ với các cơ sở y tế, chúng tôi hỗ trợ
              bệnh nhân trước, trong và sau khi đi khám. Qua đó, giúp cho việc
              đi khám hiệu quả hơn và đảm bảo quyền lợi của người bệnh. 4. Đặt
              lịch 24/7 Hệ thống hoạt động liên tục 24 giờ một ngày, 7
              ngày/tuần, và 365 ngày/năm, kể cả ngày nghỉ và ngày lễ. Luôn sẵn
              sàng 24/7 để bệnh nhân đặt lịch trực tuyến.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
