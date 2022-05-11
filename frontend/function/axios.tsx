import { FC } from "react";
import axios from "axios";

// proxy
// 9080: 기부, 후기 'http://k6c106.p.ssafy.io:9080'
// 9081: 봉사 'http://k6c106.p.ssafy.io:9081'
// 9082: 회원가입, 유저 정보 'http://k6c106.p.ssafy.io:9082'
// 8000: 로그인 'http://k6c106.p.ssafy.io:8000'

// ----------------------- 9080 ------------------------------

// 물품 기부 상세 조회
export const donationDetail = async (id) => {
  return await axios({
    method: "GET",
    url: `/9080/donation/${id}`,
  });
};

// 후기 페이지 - 후기 목록 조회
export const getReviewList = async (params) => {
  return await axios({
    method: "GET",
    url: `/9080/d.confirm`,
    params: params,
  });
};

// ----------------------- 9081 ------------------------------

// 봉사 글 상세 조회
export const volunteerDetail = async (id) => {
  return await axios({
    method: "GET",
    url: `/9081/volunteer/${id}`,
  });
};

// ----------------------- 9082 ------------------------------

// 이메일 중복 체크
export const emailCheck = async (email) => {
  return await axios({
    method: "POST",
    url: "/9082/member/email-check",
    data: {
      email: email,
    },
  });
};

// 이메일 인증 메일 발송
export const emailAuth = async (email) => {
  return await axios({
    method: "POST",
    url: "/9082/member/email-auth",
    data: {
      email: email,
    },
  });
};

// 휴대폰 인증 문자 발송
export const phoneAuth = async (phone) => {
  return await axios({
    method: "POST",
    url: "/9082/member/phone-auth",
    data: {
      number: phone,
    },
  });
};

// 기관 회원가입
export const signupOrg = async (data, img) => {
  //   const data = {
  //     "email": "test5@test.com",
  //     "password": "test1",
  //     "name": "c",
  //     "tel": "01010001000",
  //     "address":"test1",
  //     "info":"a",
  //     "orgZipcode":"aa",
  //     "warnCount":0,
  //     "createDate": new Date()
  // }

  const newForm = new FormData();
  newForm.append(
    "member",
    new Blob([JSON.stringify(data)], { type: "application/json" })
  );
  newForm.append("registration", img);
  // newForm.append("profile",img)

  return await axios({
    url: "/9082/member/org",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: newForm,
  });
};

// 일반 회원가입
export const signupUser = async (data) => {
  //   const data = {
  //     "email": "test123@test.com",
  //     "password": "test1",
  //     "name": "c",
  //     "tel": "01010001000",
  //     "info":"a",
  //     "warnCount":0,
  //     "createDate": new Date()
  // }

  return await axios({
    url: "/9082/member/user",
    method: "POST",
    data: data,
  });
};


// 회원정보 조회
export const userDetail = async (id) => {
  return await axios({
    method: "GET",
    url: `/9082/member/${id}`,
  });
};


// ----------------------- 8000 ------------------------------

// 로그인
export const login = async (email, pw) => {
  return await axios({
    method: "POST",
    url: "/8000/api/member/login",
    data: {
      email: email,
      password: pw,
    },
  });
};

// 마이페이지 정보 조회
export const getMypage = async (token) => {
  return await axios({
    method: "GET",
    url: "/8000/member",
    headers: {
      Authorization: token,
    },
  });
};







// -------------------------관리자페이지-------------------------

// 전체 회원 조회
export const getAllUser = async (token, page) => {
  return await axios({
    method: "GET",
    url: `/8000/member/admin/${page}`,
    headers: {
      Authorization: token,
    },
  });
};

// 회원 경고
export const warning = async (token, id) => {
  return await axios({
    method: "PUT",
    url: '/8000/member/admin/warning',
    headers: {
      Authorization: token,
    },
    data: {
      'memberId': id
    }
  });
};

// 가입 대기 기관 리스트
export const waitingList = async (token, page) => {
  return await axios({
    method: "GET",
    url: `/8000/member/admin/waiting-list/${page}`,
    headers: {
      Authorization: token,
    },
  });
};

// 기관 회원가입 승인
export const approveSignup = async (token, id) => {
  return await axios({
    method: "PUT",
    url: '/8000/member/admin/permission',
    headers: {
      Authorization: token,
    },
    data: {
      "member_id": id,
      "permission": true
    }
  });
};





// ------------------------- 기타 ------------------------------

// ocr
export const OCR = async (url) => {
  let data = {
    version: "V2",
    requestId: "string",
    timestamp: 0,
    lang: "ko",
    images: [
      {
        format: "png",
        name: "test 1",
        url: url,
      },
    ],
  };

  return await axios({
    // url:'https://bec8udp05h.apigw.ntruss.com/custom/v1/15684/b2ab54fd83e5770a4f755bd8d556a8b0815ad072db3cd9bae4a86827b995edee/general',
    url: "/ocr",

    method: "POST",
    headers: {
      Accept: "application/json",
      "X-OCR-SECRET": "ZXB2ZWZJZ3NNTnpTUVhpZlVGa3RuY0JTd0hrWGpnUW8=",
    },
    data: data,
  });
};

// ocr_file
export const OCR_file = async (img) => {
  const data_ = {
    version: "V2",
    requestId: "string",
    timestamp: 0,
    lang: "ko",
    images: [{ format: "png", name: "string" }],
  };

  const newForm = new FormData();
  newForm.append(
    "message",
    new Blob(
      [
        JSON.stringify({
          version: "V2",
          requestId: "string",
          timestamp: 0,
          images: [{ format: "png", name: "string" }],
        }),
      ],
      { type: "application/json" }
    )
  );
  newForm.append("file", img);

  return await axios({
    // url:'https://bec8udp05h.apigw.ntruss.com/custom/v1/15684/b2ab54fd83e5770a4f755bd8d556a8b0815ad072db3cd9bae4a86827b995edee/general',
    url: "/ocr",

    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      // 'Content-Type':'multipart/form-data',
      "X-OCR-SECRET": "ZXB2ZWZJZ3NNTnpTUVhpZlVGa3RuY0JTd0hrWGpnUW8=",
    },
    data: newForm,
  });
};

// ocr_kakao
export const OCR_kakao = async (img) => {
  const newForm = new FormData();
  newForm.append("image", img);

  return await axios({
    url: "https://dapi.kakao.com/v2/vision/text/ocr",

    method: "POST",
    headers: {
      Accept: "multipart/form-data",
      // 'Content-Type':'multipart/form-data',
      Authorization: "KakaoAK 5f6cb439fd56b3078f112ab72cd15263",
    },
    data: newForm,
  });
};

// 택배 조회 api
export const getPostCompany = async () => {
  return await axios({
    method: "GET",
    url: `https://info.sweettracker.co.kr/api/v1/companylist?t_key=${process.env.NEXT_PUBLIC_POST_TRACKER_API_KEY}`,
  });
};
